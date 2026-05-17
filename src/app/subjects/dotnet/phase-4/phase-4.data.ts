import { Topic } from './phase-4.types';

export const phase4Topics: Topic[] = [
  // ============================================================
  // 1. In-Memory Caching (IMemoryCache)
  // ============================================================
  {
    id: 'memory-cache',
    title: '1. In-Memory Caching (IMemoryCache)',
    whatIsThis: [
      "IMemoryCache is ASP.NET Core's built-in in-process cache. You store key-value pairs in your app's memory with a TTL (time-to-live) and read them back instantly — no network, no DB call.",
      "Simple meaning is — first request hits the DB, the result is saved in RAM. Next request for the same key just returns the cached value. Same DB, hundreds of times less work."
    ],
    whyUseIt: [
      "Most read endpoints serve the same data again and again — product lists, configuration, user roles, dropdown options. Caching them in memory turns a 50 ms DB call into a 0.1 ms RAM lookup.",
      "Built into ASP.NET Core via DI — zero extra packages, zero infrastructure. Perfect for single-server apps and 'hot' lookups within one process."
    ],
    realLifeExample: [
      "On Swiggy's app, the list of restaurant categories rarely changes. Hitting the DB on every screen load is wasteful. Cache it for 10 minutes — 99% of requests return from memory; 1% refresh the cache.",
      "Same with currency rates, GST percentages, country / state lists — small, hot, slow-changing data. Perfect cache candidates."
    ],
    howItWorks: [
      "Register: builder.Services.AddMemoryCache().",
      "Inject IMemoryCache anywhere via constructor.",
      "GetOrCreateAsync(key, factory) — returns the cached value, or runs the factory once and caches the result.",
      "Configure TTL with AbsoluteExpirationRelativeToNow / SlidingExpiration / Size for capped caches.",
      "Cache lives only in this process — restart the app, cache is empty. Multiple servers each have their own copy (use Redis if you need shared cache)."
    ],
    codeExample: `// Program.cs
builder.Services.AddMemoryCache();
builder.Services.AddScoped<CategoryService>();

public class CategoryService
{
    private readonly IMemoryCache _cache;
    private readonly AppDb _db;
    private const string Key = "categories:all";

    public CategoryService(IMemoryCache cache, AppDb db)
    {
        _cache = cache;
        _db = db;
    }

    public Task<List<Category>> GetAllAsync() =>
        _cache.GetOrCreateAsync(Key, async entry =>
        {
            entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(10);
            entry.SlidingExpiration              = TimeSpan.FromMinutes(2);

            return await _db.Categories
                .AsNoTracking()
                .ToListAsync();
        })!;

    // Bust the cache when admin updates categories
    public void Invalidate() => _cache.Remove(Key);
}`,
    codeOutput: `Request 1 (cold)
  → MISS, fetched from DB
  → 10 rows, 47 ms

Request 2 (warm)
  → HIT, served from RAM
  → 10 rows, 0.08 ms

After admin POST /categories (Invalidate called)
  Request 3 → MISS again, refreshed`,
    interviewQuestions: [
      {
        q: "What is IMemoryCache and when do you use it?",
        a: "IMemoryCache is ASP.NET Core's built-in in-process cache. Use it for hot, slow-changing data on a single server (or per-server hot data) — categories, configs, dropdowns, role lookups. It removes repeat DB calls and serves data in microseconds."
      },
      {
        q: "What is the difference between AbsoluteExpiration and SlidingExpiration?",
        a: "AbsoluteExpiration evicts the entry at a fixed time after creation, regardless of usage. SlidingExpiration evicts only after no access for that duration — every read resets the timer. Use both together: SlidingExpiration to evict idle data, AbsoluteExpiration as a hard upper bound to force a refresh."
      },
      {
        q: "What's the disadvantage of IMemoryCache?",
        a: "It lives inside one process. Multiple app servers each have their own copy — invalidating on one doesn't clear the others (cache stampede / inconsistency). Restart the process and it's empty (cold start). For shared cache across servers, use IDistributedCache backed by Redis."
      },
      {
        q: "How do you prevent cache stampede?",
        a: "Stampede = many requests miss the cache simultaneously and all hit the DB. Use GetOrCreateAsync (modern EF Core has request coalescing in memory cache 2.x+), or a SemaphoreSlim per key, or HybridCache (in .NET 9+). The idea: only one request rebuilds; others wait for the result."
      },
      {
        q: "What is HybridCache (introduced in .NET 9)?",
        a: "A new caching API that combines L1 (in-memory) and L2 (distributed like Redis), with built-in stampede protection, tag-based invalidation, and automatic serialization. It's designed to replace ad-hoc IMemoryCache + IDistributedCache combinations in production."
      }
    ],
    followUpQuestions: [
      { q: "Register IMemoryCache?", a: "builder.Services.AddMemoryCache()." },
      { q: "Get or create entry?", a: "GetOrCreateAsync(key, factory)." },
      { q: "Hard expiry?", a: "AbsoluteExpirationRelativeToNow." },
      { q: "Idle expiry?", a: "SlidingExpiration." },
      { q: "Remove entry?", a: "_cache.Remove(key)." },
      { q: "Per-process or shared?", a: "Per-process only." },
      { q: "Multi-server alternative?", a: "IDistributedCache (Redis)." }
    ],
    commonMistakes: [
      "Caching huge entities — memory bloats; cache only what you really need or use Size + SizeLimit.",
      "Forgetting to invalidate on writes — stale data shown for full TTL after an update.",
      "Caching per-user data with a global key — users see each other's data; include userId in the key.",
      "Relying on IMemoryCache across multiple servers — each one has its own copy and updates don't propagate."
    ],
    proTip: "Senior interview line: 'I default to IMemoryCache for hot, single-process lookups with AbsoluteExpiration as a safety net plus invalidation on writes. The moment data needs to be consistent across multiple servers, I switch to Redis via IDistributedCache. Caching without an invalidation strategy is just creating a new bug class.'"
  },

  // ============================================================
  // 2. Distributed Caching (Redis)
  // ============================================================
  {
    id: 'redis-cache',
    title: '2. Distributed Caching (Redis)',
    whatIsThis: [
      "Distributed caching means a cache that sits OUTSIDE your app — usually Redis — so multiple application servers and instances all see the same cache. ASP.NET Core exposes it via the IDistributedCache interface, with the Redis package providing the actual implementation.",
      "Simple meaning is — instead of each server keeping its own RAM cache, they all talk to a shared Redis box. Update the cache once → every server sees the new value instantly."
    ],
    whyUseIt: [
      "When you scale beyond one server (load-balanced apps, microservices, Kubernetes pods), in-process caches diverge — server A returns updated data, server B serves stale data. Redis fixes this with a single source of truth.",
      "Redis is also great for sessions, rate limit counters, leaderboards, pub/sub, distributed locks, queues. It's cheap (single small VM handles huge load), fast (sub-millisecond), and battle-tested."
    ],
    realLifeExample: [
      "On Amazon, dozens of API server pods serve the same product list endpoint. They all read from a Redis cluster — one cache invalidation reaches every pod immediately.",
      "Same Redis also stores user shopping carts (so the cart survives even if a pod dies and the next request lands on a different pod) and rate-limit counters per IP."
    ],
    howItWorks: [
      "Install Microsoft.Extensions.Caching.StackExchangeRedis package.",
      "Register: builder.Services.AddStackExchangeRedisCache(o => o.Configuration = 'localhost:6379').",
      "Inject IDistributedCache and call GetStringAsync / SetStringAsync (with optional DistributedCacheEntryOptions for TTL).",
      "Values are stored as byte arrays — typically you serialize POCOs to JSON and back.",
      "Redis itself is single-threaded per shard but very fast; clusters partition keys across shards for scale."
    ],
    codeExample: `// Program.cs
builder.Services.AddStackExchangeRedisCache(o =>
{
    o.Configuration = builder.Configuration.GetConnectionString("Redis")!;
    o.InstanceName  = "myapp:";
});

public class ProductCache
{
    private readonly IDistributedCache _cache;
    private readonly ProductService _svc;

    public ProductCache(IDistributedCache cache, ProductService svc)
    {
        _cache = cache;
        _svc   = svc;
    }

    public async Task<Product?> GetAsync(int id)
    {
        var key  = $"product:{id}";
        var hit  = await _cache.GetStringAsync(key);
        if (hit is not null)
            return JsonSerializer.Deserialize<Product>(hit);

        var prod = await _svc.GetByIdAsync(id);
        if (prod is null) return null;

        await _cache.SetStringAsync(
            key,
            JsonSerializer.Serialize(prod),
            new DistributedCacheEntryOptions {
                AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(10)
            });

        return prod;
    }
}`,
    codeOutput: `App pod-1: GET /products/42 → MISS → DB → SET myapp:product:42 in Redis
App pod-2: GET /products/42 → HIT  in Redis (set by pod-1)
App pod-3: GET /products/42 → HIT  in Redis

Admin update on pod-1 → DEL myapp:product:42
All pods next request → MISS → re-cache fresh value`,
    interviewQuestions: [
      {
        q: "What is the difference between IMemoryCache and IDistributedCache?",
        a: "IMemoryCache lives inside one process — fast but per-server. IDistributedCache lives outside the app (Redis, SQL Server, NCache) — shared across servers, survives app restarts, but a network hop slower (~1ms vs ~0.1ms). Use Memory for single-server hot lookups; Distributed when you scale out."
      },
      {
        q: "Why is Redis the most popular distributed cache?",
        a: "Sub-millisecond latency, in-memory data store, simple key-value model, supports lists/sets/hashes/streams, single-threaded so no locking bugs, easy to cluster horizontally. Widely supported, cheap to run, plus useful for sessions, rate limits, queues, pub/sub. One tool for many caching needs."
      },
      {
        q: "What's the difference between Redis as a cache and Redis as a database?",
        a: "As cache, you store derived / refreshable data with TTL — losing it just means a slow DB hit next time. As database, you store the source of truth — need persistence (RDB / AOF), backups, replication. Most teams use Redis as a cache; some use it as a primary store for ephemeral data like sessions and leaderboards."
      },
      {
        q: "What is cache invalidation strategy?",
        a: "It's how you keep the cache in sync with the source. Common patterns: (1) TTL — let it expire and refresh on next miss. (2) Write-through — update cache when you update DB. (3) Cache-aside — invalidate on writes. (4) Pub/Sub fan-out — broadcast invalidation to all servers. Pick based on staleness tolerance."
      },
      {
        q: "How do you handle Redis going down?",
        a: "Wrap cache calls in try/catch and fall back to the DB on failure — never let a cache outage take down the API. Use circuit breakers (Polly) to stop hammering a dead Redis. Run Redis with replicas (Sentinel or cluster mode) for high availability. Treat the cache as an optimization, not a hard dependency."
      }
    ],
    followUpQuestions: [
      { q: "Interface in ASP.NET Core?", a: "IDistributedCache." },
      { q: "Most common backend?", a: "Redis." },
      { q: "Latency typical?", a: "Sub-millisecond." },
      { q: "Format stored?", a: "Bytes (often JSON)." },
      { q: "Set with TTL?", a: "DistributedCacheEntryOptions.AbsoluteExpirationRelativeToNow." },
      { q: "Connection string key?", a: "Configuration (e.g. \"localhost:6379\")." },
      { q: "On Redis outage?", a: "Fallback to DB, log, don't crash." }
    ],
    commonMistakes: [
      "Treating Redis like a primary DB — loss of data on restart unless you enable persistence and backups.",
      "Storing huge blobs in Redis — eats memory; cache only what's hot and small.",
      "No fallback when Redis is down — cache outage cascades into a full outage.",
      "Forgetting to set TTL — entries grow forever, eventually evicted unpredictably (LRU pressure)."
    ],
    proTip: "Senior interview line: 'I run Redis in HA mode with TTLs on every key, treat it as an optimization rather than a dependency, and always wrap calls so a Redis blip falls back to the DB cleanly. The day Redis goes down should be a slow day, not an outage.'"
  },

  // ============================================================
  // 3. Background Jobs (Hangfire)
  // ============================================================
  {
    id: 'background-jobs-hangfire',
    title: '3. Background Jobs (Hangfire)',
    whatIsThis: [
      "Background jobs run work outside the request/response cycle — sending emails, generating reports, processing files, retrying failed payments. Hangfire is the most popular .NET library for this: persistent, reliable, with a built-in dashboard.",
      "Simple meaning is — when the user clicks 'Place Order', you don't make them wait while you send the email and SMS. You return 200 OK instantly and queue those tasks for a worker to process in the background."
    ],
    whyUseIt: [
      "Some tasks shouldn't block the HTTP response — they're slow, can fail, need retries, or depend on external systems. Background jobs improve perceived performance and let you build resilient retry logic.",
      "Hangfire persists jobs in SQL Server / PostgreSQL / Redis, so they survive app restarts and crashes. Built-in dashboard shows queues, retries, failures, scheduled jobs."
    ],
    realLifeExample: [
      "On Swiggy: when an order is placed, send-email and update-inventory run as background jobs. Customer gets an instant order confirmation; emails go out within seconds via Hangfire workers.",
      "Recurring billing on a SaaS app: 'every day at 2 AM, charge subscribers'. Hangfire's RecurringJob handles this with a cron expression — no Windows Task Scheduler, no separate console app."
    ],
    howItWorks: [
      "Install Hangfire + Hangfire.SqlServer (or .Redis) packages.",
      "Register: builder.Services.AddHangfire(c => c.UseSqlServerStorage(connectionString)) and AddHangfireServer().",
      "Map dashboard: app.UseHangfireDashboard('/hangfire'). Lock down with auth in production.",
      "Enqueue jobs: BackgroundJob.Enqueue(() => emailService.SendAsync(orderId)) — fire and forget, runs in worker.",
      "Other modes: Schedule (one-off in future), RecurringJob.AddOrUpdate (cron), ContinueWith (after another job)."
    ],
    codeExample: `// Program.cs
builder.Services.AddHangfire(c =>
    c.UseSqlServerStorage(builder.Configuration.GetConnectionString("Default")));
builder.Services.AddHangfireServer();

var app = builder.Build();
app.UseHangfireDashboard("/hangfire");

// 1. Fire-and-forget — runs ASAP in a background worker
app.MapPost("/orders", (OrderDto dto, IOrderService svc) =>
{
    var orderId = svc.Place(dto);

    // Email goes out in the background — user doesn't wait
    BackgroundJob.Enqueue<IEmailService>(e => e.SendOrderConfirmAsync(orderId));

    return Results.Created($"/orders/{orderId}", orderId);
});

// 2. Scheduled — run once at a future time
BackgroundJob.Schedule<IReminderService>(
    r => r.SendDeliveryReminderAsync(orderId),
    TimeSpan.FromHours(2));

// 3. Recurring — every day at 2 AM
RecurringJob.AddOrUpdate<IBillingService>(
    "daily-billing",
    b => b.ChargeSubscriptionsAsync(),
    Cron.Daily(2, 0));`,
    codeOutput: `POST /orders
→ 201 Created (returned in 12 ms)

Hangfire dashboard at /hangfire:
  ┌─ Succeeded
  │   • SendOrderConfirmAsync(123)  — 2026-05-06 10:00:14
  │   • SendOrderConfirmAsync(124)  — 2026-05-06 10:00:21
  ├─ Scheduled
  │   • SendDeliveryReminderAsync(123)  — runs at 12:00
  └─ Recurring
      • daily-billing  — next run 2026-05-07 02:00:00

If a job throws, Hangfire retries with exponential backoff
(default 10 retries) and shows the failure in the dashboard.`,
    interviewQuestions: [
      {
        q: "What is Hangfire and what problem does it solve?",
        a: "Hangfire is a .NET library for running background jobs reliably — fire-and-forget, scheduled, recurring, continuations. It persists jobs to SQL/Redis so they survive restarts, retries failed jobs automatically, and ships with a dashboard for monitoring. Removes the need for Windows Services / cron / custom queue infrastructure."
      },
      {
        q: "What are the four types of jobs in Hangfire?",
        a: "(1) Fire-and-forget — runs ASAP. (2) Delayed — runs once at a specified future time (Schedule). (3) Recurring — runs on a cron schedule. (4) Continuations — runs after a parent job completes. Each type has the same retry/error semantics — Hangfire handles the queue and worker."
      },
      {
        q: "How do you secure the Hangfire dashboard in production?",
        a: "Wrap UseHangfireDashboard with IDashboardAuthorizationFilter — only authorized users (admin role / specific IP / VPN) can see it. By default the dashboard is open to anyone — a security disaster in production. Always require auth."
      },
      {
        q: "What's the difference between IHostedService and Hangfire?",
        a: "IHostedService is a .NET hook for code that runs alongside your app — perfect for long-running loops or polling. It does NOT persist work — restart the app and queued items are lost. Hangfire persists every job, retries failures, distributes work across servers, has a dashboard. Use IHostedService for in-process loops; Hangfire for actual job queues."
      },
      {
        q: "How does Hangfire handle retries?",
        a: "Default policy retries a failed job 10 times with exponential backoff (seconds, then minutes, then hours). Customize via [AutomaticRetry(Attempts = N)] attribute or globally. After exhausting retries, the job moves to Failed state — visible in the dashboard for manual inspection or requeue."
      }
    ],
    followUpQuestions: [
      { q: "Run-now job?", a: "BackgroundJob.Enqueue(...)." },
      { q: "Future one-off?", a: "BackgroundJob.Schedule(...)." },
      { q: "Cron schedule?", a: "RecurringJob.AddOrUpdate(...)." },
      { q: "After parent finishes?", a: "BackgroundJob.ContinueWith(...)." },
      { q: "Storage options?", a: "SQL Server, PostgreSQL, Redis." },
      { q: "Default retry count?", a: "10 with exponential backoff." },
      { q: "Dashboard URL?", a: "Whatever you map (e.g. /hangfire) — protect it!" }
    ],
    commonMistakes: [
      "Leaving the Hangfire dashboard open to the internet — anyone can trigger jobs / see data.",
      "Using fire-and-forget for critical work without monitoring failures — silent breakage.",
      "Capturing scoped DI services in lambdas — Hangfire resolves the type at execution time; pass the interface, not an instance.",
      "Running the Hangfire server on every pod without coordination — duplicate recurring jobs. Use distributed locks or run a dedicated worker pod."
    ],
    proTip: "Senior interview line: 'I queue anything slower than 200ms to Hangfire — emails, file processing, third-party calls. The HTTP response stays fast, retries are automatic, and the dashboard tells me what failed. The dashboard is always behind auth, and recurring jobs run on a single dedicated worker pod to avoid duplication.'"
  },

  // ============================================================
  // 4. API Versioning
  // ============================================================
  {
    id: 'api-versioning',
    title: '4. API Versioning',
    whatIsThis: [
      "API versioning lets you evolve a Web API without breaking existing clients. Same endpoint, multiple versions — /api/v1/orders and /api/v2/orders coexist. Old mobile apps keep using v1; new ones move to v2.",
      "Simple meaning is — once your API is public, you can't just change response shapes. Versioning is the contract that lets the server change while old clients keep working."
    ],
    whyUseIt: [
      "Mobile apps and partner integrations live for years. If you change a response shape, you break thousands of apps you don't control. Versioning lets v1 stay frozen while v2 introduces breaking changes.",
      "It also documents intent — 'this is v2; v1 is deprecated, sunset on date X' — gives consumers time to migrate."
    ],
    realLifeExample: [
      "Razorpay payment API: v1 returns amount as integer (paise), v2 returns amount as a typed object {amount, currency}. v1 still works for old merchants; new merchants integrate against v2.",
      "Without versioning, the day Razorpay changed v1's shape, every connected merchant's checkout would break — unacceptable."
    ],
    howItWorks: [
      "Install Microsoft.AspNetCore.Mvc.Versioning (or the new Asp.Versioning.* packages from .NET 7+).",
      "Register: services.AddApiVersioning(o => { o.DefaultApiVersion = new ApiVersion(1, 0); o.ReportApiVersions = true; o.AssumeDefaultVersionWhenUnspecified = true; }).",
      "Choose strategy: URL segment (/v1/orders), query string (?api-version=1.0), HTTP header (api-version: 1.0), or media type (Accept: application/json;v=1.0).",
      "Decorate controllers/actions with [ApiVersion('1.0')] / [ApiVersion('2.0')] / [MapToApiVersion('2.0')].",
      "ReportApiVersions adds 'api-supported-versions' / 'api-deprecated-versions' headers — clients see the lifecycle."
    ],
    codeExample: `// Program.cs (URL-segment versioning is most common)
builder.Services.AddApiVersioning(o =>
{
    o.DefaultApiVersion = new ApiVersion(1, 0);
    o.AssumeDefaultVersionWhenUnspecified = true;
    o.ReportApiVersions = true;
    o.ApiVersionReader  = new UrlSegmentApiVersionReader();
}).AddMvc();

// Two versions of the same controller
[ApiController]
[Route("api/v{version:apiVersion}/[controller]")]
[ApiVersion("1.0")]
[ApiVersion("2.0")]
public class OrdersController : ControllerBase
{
    [HttpGet, MapToApiVersion("1.0")]
    public IActionResult GetV1() => Ok(new { id = 1, amount = 1500 });

    [HttpGet, MapToApiVersion("2.0")]
    public IActionResult GetV2() => Ok(new
    {
        id = 1,
        amount = new { value = 1500, currency = "INR" }
    });

    [HttpDelete, MapToApiVersion("1.0"), Obsolete("Use v2")]
    public IActionResult Delete() => NoContent();
}`,
    codeOutput: `GET /api/v1/orders
→ 200 { "id":1, "amount":1500 }

GET /api/v2/orders
→ 200 { "id":1, "amount":{"value":1500,"currency":"INR"} }

GET /api/v3/orders
→ 400 { "error":"Unsupported API version '3.0'" }

Response headers (every call):
  api-supported-versions: 1.0, 2.0
  api-deprecated-versions: -`,
    interviewQuestions: [
      {
        q: "Why do we need API versioning?",
        a: "Once an API is public, breaking changes hurt every consumer. Versioning lets the server evolve while old clients keep working — v1 stays frozen, v2 introduces the changes. Mobile apps (which can't be force-updated) and partner integrations especially need this."
      },
      {
        q: "What are the common API versioning strategies?",
        a: "(1) URL segment — /api/v1/orders (most explicit, easy caching). (2) Query string — ?api-version=1.0. (3) HTTP header — api-version: 1.0. (4) Media type — Accept: application/json;v=1.0 (REST-purist). URL is the most popular for clarity and tooling support."
      },
      {
        q: "What does ApiVersion attribute do?",
        a: "[ApiVersion('1.0')] declares which version a controller / action belongs to. With multiple versions on the same controller, [MapToApiVersion('2.0')] picks the action for a specific version. The framework matches the requested version to the right action — others return 400."
      },
      {
        q: "When do you bump major vs minor version?",
        a: "Major (1.0 → 2.0) for breaking changes — removed fields, renamed endpoints, changed shapes. Minor (1.0 → 1.1) for backward-compatible additions — new optional field, new endpoint. SemVer thinking applied to APIs."
      },
      {
        q: "How do you deprecate an old API version?",
        a: "(1) Mark with [ApiVersion('1.0', Deprecated = true)] — adds it to api-deprecated-versions header. (2) Communicate sunset date in docs. (3) Add response header / log warning per call. (4) Eventually remove — return 410 Gone for a while, then strip the controller. Always give consumers months."
      }
    ],
    followUpQuestions: [
      { q: "Most common strategy?", a: "URL segment (/v1/...)." },
      { q: "Attribute on controller?", a: "[ApiVersion(\"1.0\")]." },
      { q: "Pick action per version?", a: "[MapToApiVersion(\"2.0\")]." },
      { q: "Default if not specified?", a: "AssumeDefaultVersionWhenUnspecified." },
      { q: "Header listing versions?", a: "ReportApiVersions = true." },
      { q: "Deprecate flag?", a: "Deprecated = true on attribute." }
    ],
    commonMistakes: [
      "Renaming or removing fields without bumping major version — silent breakage for clients.",
      "Versioning everything from day one — premature; v1 first, version when you actually have a breaking change.",
      "Putting business logic differences in v1 vs v2 inside the same method with if(version) — split into separate actions / services for clarity.",
      "Removing v1 without sunset notice — consumer apps break overnight."
    ],
    proTip: "Senior interview line: 'I default to URL-segment versioning for clarity and CDN-friendliness, bump major only for breaking changes, and always give consumers a deprecation window of 6+ months. ReportApiVersions is on so clients see deprecated versions in headers and can react before the sunset date.'"
  },

  // ============================================================
  // 5. Rate Limiting
  // ============================================================
  {
    id: 'rate-limiting',
    title: '5. Rate Limiting',
    whatIsThis: [
      "Rate limiting caps how many requests a client can make in a window — e.g. 100 requests per minute. Beyond the limit, the server returns 429 Too Many Requests. Built into .NET 7+ via the Microsoft.AspNetCore.RateLimiting package.",
      "Simple meaning is — protect your API from being hammered by one bad client (or a runaway script) so the rest of your users don't suffer."
    ],
    whyUseIt: [
      "Without rate limits, one buggy client / scraper / attacker can saturate your DB, exhaust thread pool, and take down the entire API for everyone. Rate limits are the first line of defense.",
      "They also enforce business plans — free tier 100/min, pro 1000/min, enterprise 10000/min. Same code, different policy per user/key."
    ],
    realLifeExample: [
      "Twitter API famously rate-limits clients — 300 requests per 15 minutes per access token. Hit the limit, get 429, retry-after header tells you when to come back.",
      "On a payments API, rate limiting per merchant prevents one merchant from accidentally DDoS-ing the gateway and impacting other merchants' transactions."
    ],
    howItWorks: [
      "Register: builder.Services.AddRateLimiter(o => { o.AddFixedWindowLimiter('default', opt => { opt.PermitLimit = 100; opt.Window = TimeSpan.FromMinutes(1); }); }).",
      "Apply globally: app.UseRateLimiter() and decorate endpoints with [EnableRateLimiting('default')] or globally via .RequireRateLimiting('default').",
      "Algorithms available: FixedWindow (simple count per period), SlidingWindow (smoother), TokenBucket (allow bursts), Concurrency (max simultaneous calls).",
      "Partition by key — IP address, user ID, API key — so each client gets its own bucket: PartitionedRateLimiter.Create<HttpContext, string>(...).",
      "Returns 429 Too Many Requests with Retry-After header automatically when the limit is breached."
    ],
    codeExample: `// Program.cs — partition by client IP, fixed window 100/min
using System.Threading.RateLimiting;

builder.Services.AddRateLimiter(o =>
{
    o.RejectionStatusCode = StatusCodes.Status429TooManyRequests;

    o.GlobalLimiter = PartitionedRateLimiter.Create<HttpContext, string>(ctx =>
        RateLimitPartition.GetFixedWindowLimiter(
            partitionKey: ctx.Connection.RemoteIpAddress?.ToString() ?? "unknown",
            factory: _ => new FixedWindowRateLimiterOptions
            {
                PermitLimit = 100,
                Window      = TimeSpan.FromMinutes(1),
                QueueLimit  = 0
            }));

    o.AddTokenBucketLimiter("burst", opt =>
    {
        opt.TokenLimit       = 20;
        opt.TokensPerPeriod  = 10;
        opt.ReplenishmentPeriod = TimeSpan.FromSeconds(10);
    });
});

var app = builder.Build();
app.UseRateLimiter();

app.MapGet("/heavy", () => "ok").RequireRateLimiting("burst");
app.MapGet("/normal", () => "ok");   // uses global IP limit

app.Run();`,
    codeOutput: `Client X.X.X.X — first 100 requests within 1 minute
  → 200 OK each

Client X.X.X.X — request #101 in same minute
  → 429 Too Many Requests
     Retry-After: 38

After window resets, counter starts over.

/heavy endpoint uses token bucket — bursts up to 20 allowed,
then drips at 10 tokens / 10 s.`,
    interviewQuestions: [
      {
        q: "Why do we need rate limiting?",
        a: "To protect the API from abuse — a single misbehaving client (bug, scraper, attacker) can saturate threads/DB and bring down the service for everyone. Rate limiting caps requests per client per window, isolates the bad actor, and returns 429 with Retry-After so well-behaved clients can back off."
      },
      {
        q: "What rate-limiting algorithms does ASP.NET Core support?",
        a: "Four: (1) FixedWindow — simple count per fixed time window. (2) SlidingWindow — smoother, splits the window into segments. (3) TokenBucket — allows bursts, refills at a steady rate. (4) Concurrency — limits concurrent requests in flight. Choose based on the desired behaviour."
      },
      {
        q: "What is the difference between FixedWindow and SlidingWindow?",
        a: "FixedWindow counts within a fixed period — e.g. 100 requests per minute starting at :00. Boundary effect: 100 at :59 + 100 at :00 = 200 in 2 seconds. SlidingWindow splits the window into segments and rolls over smoothly — no boundary spike, slightly more memory and CPU."
      },
      {
        q: "How do you rate-limit per user / API key instead of per IP?",
        a: "Use PartitionedRateLimiter with a partition key derived from the request — User identity, API key from header, JWT subject. Each partition has its own bucket. Combined with auth middleware, authenticated users get a fairer per-account limit while anonymous traffic is limited per IP."
      },
      {
        q: "What status code does rate limiting return?",
        a: "429 Too Many Requests, with a Retry-After header indicating when the client may retry. Well-behaved clients respect this and back off. The status code and header are HTTP standards — clients (Polly, Refit, fetch wrappers) handle them automatically."
      }
    ],
    followUpQuestions: [
      { q: "Status code on limit hit?", a: "429 Too Many Requests." },
      { q: "Tells client when to retry?", a: "Retry-After header." },
      { q: "Default algorithm types?", a: "FixedWindow, SlidingWindow, TokenBucket, Concurrency." },
      { q: "Per-IP partition?", a: "PartitionedRateLimiter." },
      { q: "Apply to endpoint?", a: ".RequireRateLimiting(\"name\")." },
      { q: "Apply globally?", a: "GlobalLimiter in options." },
      { q: "Allows short bursts?", a: "TokenBucket." }
    ],
    commonMistakes: [
      "No rate limit on public endpoints — first DoS attack takes the API down.",
      "Limiting by IP only — NAT puts thousands of users behind one IP, fairness suffers.",
      "FixedWindow on busy boundaries — clients hit double the limit at the boundary.",
      "Returning 200 with 'rate limited' message in body instead of 429 — clients can't auto-handle."
    ],
    proTip: "Senior interview line: 'I rate-limit at the gateway AND inside the app — defense in depth. Per-user (authenticated) and per-IP (anonymous) limits, sliding window for smoothness, and 429 + Retry-After so clients with Polly/retry policies just back off automatically. Limits are tuned via load tests, not guessed.'"
  },

  // ============================================================
  // 6. Singleton Pattern
  // ============================================================
  {
    id: 'singleton-pattern',
    title: '6. Singleton Pattern',
    whatIsThis: [
      "Singleton ensures a class has exactly ONE instance shared across the whole app. The 'classic' pattern uses a private constructor and a static GetInstance() method. In modern .NET we usually achieve this via DI: services.AddSingleton<IService, Service>().",
      "Simple meaning is — there's only one of these in the entire app, everyone shares it. Configuration readers, loggers, caches, app-wide registries are typical singletons."
    ],
    whyUseIt: [
      "Some objects are expensive to create or must coordinate state across the app — a DB connection pool, an in-memory cache, a configuration service. Multiple instances would waste resources or cause inconsistencies.",
      "DI singletons are the modern way: testable (you can inject a mock), thread-safety still your responsibility, lifetime managed by the container. The classic Singleton class is rarely written today."
    ],
    realLifeExample: [
      "An app's logger — there should be one logger writing to one file. If every class made its own, the file would be opened 100 times, log lines interleaved randomly. Singleton ensures one writer.",
      "App config service — reads appsettings.json at startup, caches the parsed values, hands them out via getters. Only one parse, one snapshot, shared by everyone."
    ],
    howItWorks: [
      "Modern: builder.Services.AddSingleton<IConfigService, ConfigService>(). The DI container creates one instance and reuses it.",
      "Classic: private constructor + static instance + lazy initialization (Lazy<T> ensures thread safety).",
      "Singleton instance lives for the app's lifetime — created on first resolve, destroyed at shutdown.",
      "Must be thread-safe — many requests may use it simultaneously across threads.",
      "Captive dependency warning: Singleton must NOT capture Scoped or Transient services directly — use IServiceScopeFactory instead."
    ],
    codeExample: `// Modern (preferred) — DI singleton
public interface ICounter { int Increment(); }

public class Counter : ICounter
{
    private int _value = 0;
    public int Increment() => Interlocked.Increment(ref _value);
}

builder.Services.AddSingleton<ICounter, Counter>();

// Inject anywhere — same instance everywhere
public class HitsController(ICounter counter) : ControllerBase
{
    [HttpGet] public IActionResult Get() => Ok(counter.Increment());
}

// Classic singleton (rarely needed in modern code)
public sealed class OldCounter
{
    private static readonly Lazy<OldCounter> _inst = new(() => new OldCounter());
    public static OldCounter Instance => _inst.Value;

    private int _value = 0;
    private OldCounter() { }
    public int Increment() => Interlocked.Increment(ref _value);
}

OldCounter.Instance.Increment();`,
    codeOutput: `Five concurrent requests → all share the SAME ICounter
GET /hits → 1
GET /hits → 2
GET /hits → 3
GET /hits → 4
GET /hits → 5

If Counter were Transient: each request gets a fresh instance,
counts always reset to 1 — broken behaviour.`,
    interviewQuestions: [
      {
        q: "What is the Singleton pattern?",
        a: "A design pattern that ensures a class has exactly one instance, shared across the application. Classically achieved with a private constructor + static GetInstance() method. In modern .NET we use the DI container with services.AddSingleton<T>() — same outcome, much cleaner and testable."
      },
      {
        q: "When should you use Singleton in ASP.NET Core?",
        a: "For stateless utilities, expensive-to-create objects, app-wide caches, configuration readers, single physical resources (DB connection pools, HttpClient via IHttpClientFactory). Anything that must be shared and can be safely accessed by many threads simultaneously."
      },
      {
        q: "What is a captive dependency?",
        a: "When a Singleton service captures (depends on) a Scoped or Transient service. Since Singleton lives forever, the captured service is also kept alive — outliving its intended scope. Solution: inject IServiceScopeFactory into the singleton and create a fresh scope when you need the scoped service."
      },
      {
        q: "Why is the classic Singleton pattern criticized?",
        a: "Hard to test (can't inject a mock — it's a static call). Hidden dependency (the calling class doesn't declare it in its constructor). Thread-safety concerns left to the developer. DI container singletons solve all of these — the modern preference is DI, not the classic pattern."
      },
      {
        q: "Is HttpClient a singleton?",
        a: "Conceptually it's used as one (creating new HttpClient per call exhausts sockets), but the recommended way is IHttpClientFactory — registered as Singleton, hands out short-lived HttpClient instances backed by a pooled HttpMessageHandler. Solves DNS-staleness and socket exhaustion at once."
      }
    ],
    followUpQuestions: [
      { q: "Lifetime in DI?", a: "AddSingleton<T>." },
      { q: "How many instances?", a: "Exactly one for app lifetime." },
      { q: "Thread safety required?", a: "Yes — many threads share it." },
      { q: "Singleton + Scoped?", a: "Captive dependency — anti-pattern." },
      { q: "Modern HttpClient?", a: "IHttpClientFactory (registered Singleton)." },
      { q: "Classic pattern keyword?", a: "Private constructor + static instance." }
    ],
    commonMistakes: [
      "Singleton with mutable state and no synchronization — race conditions under load.",
      "Singleton holding a Scoped service (DbContext) — captive dependency, errors at runtime.",
      "Using classic static Singleton instead of DI — hard to test, hidden dependencies.",
      "Caching per-user data inside a Singleton — leaks user data across requests."
    ],
    proTip: "Senior interview line: 'I never write the classic Singleton class anymore — DI container with AddSingleton gives me the same lifetime guarantee, plus easy mocking in tests. For Singletons that need a Scoped service I inject IServiceScopeFactory and open a scope per operation. Captive dependencies are something I check for in every code review.'"
  },

  // ============================================================
  // 7. Repository Pattern
  // ============================================================
  {
    id: 'repository-pattern',
    title: '7. Repository Pattern',
    whatIsThis: [
      "Repository pattern abstracts data access behind an interface. Instead of services calling DbContext directly, they call IOrderRepository — which has methods like GetByIdAsync, AddAsync, ListAsync. The implementation talks to EF Core / Dapper / external API.",
      "Simple meaning is — the rest of the app doesn't know whether data comes from SQL, Mongo, an API, or a fake. They just call the repository interface."
    ],
    whyUseIt: [
      "Decouples business logic from persistence. Today it's EF Core; tomorrow you swap to Dapper or a different DB — just change the implementation, services keep working.",
      "Testability — services depend on the interface, so unit tests inject a mock repository and verify behaviour without spinning up a real DB."
    ],
    realLifeExample: [
      "Banking app's TransferService talks to IAccountRepository. Today the repo uses EF Core on SQL Server. Tomorrow we add a read replica for queries — only AccountRepository changes; TransferService doesn't notice.",
      "Unit tests for TransferService inject a fake IAccountRepository that returns canned data — tests are fast, no DB required."
    ],
    howItWorks: [
      "Define an interface per aggregate: IOrderRepository with the operations your domain needs (Get, Add, Update, List, Find by criteria).",
      "Implementation wraps DbContext or Dapper: EfOrderRepository implements IOrderRepository.",
      "Register: services.AddScoped<IOrderRepository, EfOrderRepository>().",
      "Services / handlers depend on the interface, not the DbContext.",
      "Important: don't make the repository a thin pass-through to DbSet — that adds no value. Add real domain methods like FindByCustomerLastMonth(customerId)."
    ],
    codeExample: `public interface IOrderRepository
{
    Task<Order?> GetAsync(int id, CancellationToken ct = default);
    Task<List<Order>> ListByCustomerAsync(int customerId, CancellationToken ct = default);
    Task AddAsync(Order order, CancellationToken ct = default);
    Task SaveChangesAsync(CancellationToken ct = default);
}

public class EfOrderRepository : IOrderRepository
{
    private readonly AppDb _db;
    public EfOrderRepository(AppDb db) => _db = db;

    public Task<Order?> GetAsync(int id, CancellationToken ct = default)
        => _db.Orders.AsNoTracking().FirstOrDefaultAsync(o => o.Id == id, ct);

    public Task<List<Order>> ListByCustomerAsync(int customerId, CancellationToken ct = default)
        => _db.Orders.AsNoTracking()
              .Where(o => o.CustomerId == customerId)
              .OrderByDescending(o => o.CreatedAt)
              .ToListAsync(ct);

    public async Task AddAsync(Order order, CancellationToken ct = default)
        => await _db.Orders.AddAsync(order, ct);

    public Task SaveChangesAsync(CancellationToken ct = default)
        => _db.SaveChangesAsync(ct);
}

builder.Services.AddScoped<IOrderRepository, EfOrderRepository>();`,
    codeOutput: `Service code stays clean and testable:

public class OrderService(IOrderRepository repo)
{
    public async Task<int> Place(OrderDto dto)
    {
        var o = new Order { ... };
        await repo.AddAsync(o);
        await repo.SaveChangesAsync();
        return o.Id;
    }
}

In tests, inject a Moq<IOrderRepository> — no DB needed.
Switch from EF to Dapper later — only the implementation changes.`,
    interviewQuestions: [
      {
        q: "What is the Repository pattern and why use it?",
        a: "A pattern where data access logic lives behind an interface (IOrderRepository) instead of being scattered across services calling DbContext directly. Benefits: separates persistence from business logic, makes services unit-testable with mocks, and lets you swap data store implementations without touching callers."
      },
      {
        q: "What is the criticism of the Repository pattern with EF Core?",
        a: "EF Core's DbContext + DbSet ALREADY implement Repository + Unit of Work. Adding a thin Repository on top that just delegates to DbSet is duplication without value. The pattern adds value only when you encapsulate domain queries (FindActiveCustomers) — not when it just wraps GetAll / Add / Update."
      },
      {
        q: "Should every entity have its own Repository?",
        a: "Not necessarily. Repositories should align with aggregates / bounded contexts, not 1-to-1 with tables. For tiny apps or simple CRUD, just use DbContext directly. For larger apps with rich domain logic, repositories per aggregate (Order, Customer) keep the layering clean."
      },
      {
        q: "What is a generic Repository<T> and is it a good idea?",
        a: "A reusable Repository<T> with Add / Update / Delete / GetAll. Saves boilerplate but quickly becomes restrictive — real apps need entity-specific queries (FindByMobile, OrdersInLastMonth) that don't fit a generic interface. Most teams move from generic to specific repositories as the app grows."
      },
      {
        q: "How does Repository pattern improve testability?",
        a: "Services depend on the IRepository interface, not on DbContext. Unit tests inject a mock (Moq, NSubstitute) returning canned data — tests are fast, deterministic, no in-memory DB needed. With direct DbContext usage, you'd need EF Core's InMemory provider or SQLite to stub data access."
      }
    ],
    followUpQuestions: [
      { q: "Repository hides what?", a: "Data access (DbContext / DB)." },
      { q: "Pattern returns what?", a: "Domain entities or DTOs." },
      { q: "Lifetime in DI?", a: "Scoped (matches DbContext)." },
      { q: "EF Core already provides?", a: "DbSet = repository, ctx = unit of work." },
      { q: "Generic repo good or bad?", a: "Useful for trivial CRUD, restrictive otherwise." },
      { q: "Repository per?", a: "Aggregate root, not per table." }
    ],
    commonMistakes: [
      "Thin pass-through repositories that just call DbSet — duplication with no benefit.",
      "Returning IQueryable from repository — leaks EF Core internals to callers, defeats the abstraction.",
      "Creating a repository per table instead of per aggregate root — proliferation of interfaces.",
      "Putting business logic inside the repository — services / domain models are the right place."
    ],
    proTip: "Senior interview line: 'I add Repository pattern only when it gives real value — domain-specific queries that I want to test in isolation. For pure CRUD I'm happy using EF Core's DbContext directly because DbSet is already a Repository and DbContext is already a Unit of Work. Pattern for the sake of pattern is just extra code to maintain.'"
  },

  // ============================================================
  // 8. Unit of Work
  // ============================================================
  {
    id: 'unit-of-work',
    title: '8. Unit of Work (UoW)',
    whatIsThis: [
      "Unit of Work coordinates multiple repository operations into a single transactional unit. You call AddAsync on several repositories, then UoW.SaveChangesAsync commits them all atomically — or rolls everything back if any step fails.",
      "Simple meaning is — group multiple data changes, decide at the end whether to commit or roll back. Like EF Core's DbContext: every Add/Update/Delete is staged, SaveChanges flushes everything in one transaction."
    ],
    whyUseIt: [
      "Real business operations touch multiple entities: placing an order creates an Order, deducts Inventory, charges Payment, writes an AuditLog. All four must succeed or none — UoW provides that atomic boundary.",
      "EF Core's DbContext IS a unit of work — staging changes, calling SaveChanges flushes them inside an implicit transaction. Adding an explicit IUnitOfWork interface helps when you want a cleaner abstraction over multiple repositories."
    ],
    realLifeExample: [
      "PhonePe transfer: debit account A, credit account B, log transaction, send notification. Wrap all four in a single UoW.SaveChangesAsync — either everything happens or nothing happens. No half-states.",
      "Order placement: insert Order, decrement Stock, create Invoice, raise event. UoW ensures partial failure doesn't leave the DB inconsistent."
    ],
    howItWorks: [
      "Define IUnitOfWork with repositories as properties + SaveChangesAsync method.",
      "Implementation wraps a single DbContext shared across all repositories — every Add/Update goes into the same change tracker.",
      "Inject IUnitOfWork into services. Use the repositories, then call uow.SaveChangesAsync once at the end.",
      "All operations commit in one DB transaction (EF Core wraps SaveChanges automatically).",
      "For multi-step operations spanning multiple SaveChanges, use BeginTransactionAsync explicitly."
    ],
    codeExample: `public interface IUnitOfWork : IDisposable
{
    IOrderRepository    Orders    { get; }
    IInventoryRepository Inventory { get; }
    Task<int> SaveChangesAsync(CancellationToken ct = default);
}

public class UnitOfWork : IUnitOfWork
{
    private readonly AppDb _db;
    public IOrderRepository    Orders    { get; }
    public IInventoryRepository Inventory { get; }

    public UnitOfWork(AppDb db)
    {
        _db       = db;
        Orders    = new EfOrderRepository(db);
        Inventory = new EfInventoryRepository(db);
    }

    public Task<int> SaveChangesAsync(CancellationToken ct = default)
        => _db.SaveChangesAsync(ct);

    public void Dispose() => _db.Dispose();
}

builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

// Usage — atomic across two repositories
public class CheckoutService(IUnitOfWork uow)
{
    public async Task<int> Place(OrderDto dto)
    {
        var order = new Order { ... };
        await uow.Orders.AddAsync(order);
        await uow.Inventory.DecrementAsync(dto.ProductId, dto.Qty);

        await uow.SaveChangesAsync();   // both commit together
        return order.Id;
    }
}`,
    codeOutput: `Run Place(...) successfully:
  → INSERT Orders     (staged)
  → UPDATE Inventory  (staged)
  → SaveChanges       → BEGIN TRAN, both writes, COMMIT

If Inventory throws inside DecrementAsync (e.g. out of stock):
  → SaveChanges never runs
  → Both writes discarded; DB unchanged

If SaveChanges throws (DB error):
  → ROLLBACK; partial writes undone`,
    interviewQuestions: [
      {
        q: "What is the Unit of Work pattern?",
        a: "A pattern that groups multiple data operations across repositories into a single transactional unit. You stage changes via repository methods, then call SaveChangesAsync to commit them atomically — or discard everything on error. Ensures consistency across multi-entity operations."
      },
      {
        q: "How is EF Core already a Unit of Work?",
        a: "DbContext tracks changes (Add/Update/Delete) as a single unit. SaveChanges flushes all of them in one DB transaction — atomic by default. Each DbSet acts like a Repository. So 'EF Core = Repository + UoW' out of the box. Adding explicit IUnitOfWork on top is mostly useful for abstraction in tests / multi-store scenarios."
      },
      {
        q: "Why combine Repository and Unit of Work?",
        a: "Repositories handle 'what' to do per entity (Add Order, Update Inventory). Unit of Work handles 'when' to commit them together. Repos give clean abstraction per aggregate; UoW gives transactional boundary across them. Together they keep code testable and consistent."
      },
      {
        q: "When do you NOT need a UoW abstraction?",
        a: "When you're using EF Core directly and DbContext gives you the transactional behaviour for free. Most apps don't need IUnitOfWork — they just inject DbContext (Scoped) into services and call SaveChangesAsync. Add UoW only when you need to abstract multiple repositories or coordinate across data stores."
      },
      {
        q: "How does UoW handle rollbacks?",
        a: "If SaveChanges throws, EF Core's implicit transaction rolls back everything in that batch. For multiple SaveChanges or mixed raw SQL, use ctx.Database.BeginTransactionAsync explicitly — and call CommitAsync on success, RollbackAsync inside catch. The pattern stays the same; UoW just exposes it cleanly."
      }
    ],
    followUpQuestions: [
      { q: "UoW provides what boundary?", a: "Atomic commit across multiple operations." },
      { q: "EF Core's UoW is?", a: "DbContext + SaveChanges." },
      { q: "Lifetime in DI?", a: "Scoped (per request)." },
      { q: "Multi-step explicit transaction?", a: "Database.BeginTransactionAsync." },
      { q: "Pattern fits well with?", a: "Repository pattern." },
      { q: "Without UoW you risk?", a: "Partial updates / inconsistent state." }
    ],
    commonMistakes: [
      "Each repository has its own DbContext — they save separately, no transaction across them.",
      "Forgetting to call SaveChangesAsync — staged changes silently discarded at scope end.",
      "Calling SaveChangesAsync inside repositories — defeats the unit-of-work boundary.",
      "Long-running UoW spanning many requests — DbContext is not thread-safe and bloats memory."
    ],
    proTip: "Senior interview line: 'I lean on EF Core's DbContext as the unit of work — it's already there. I add an IUnitOfWork interface only when I need to coordinate across multiple data stores or want a cleaner test seam. SaveChanges is called once per logical operation, never inside repositories — that's the rule that keeps the boundary intact.'"
  },

  // ============================================================
  // 9. Factory Pattern
  // ============================================================
  {
    id: 'factory-pattern',
    title: '9. Factory Pattern',
    whatIsThis: [
      "Factory pattern centralizes object creation behind a method or class, so callers say 'give me a Payment processor for UPI' instead of writing new UpiPayment(...). Common forms: Simple Factory (static method), Factory Method (overridable in subclasses), Abstract Factory (factory of factories).",
      "Simple meaning is — instead of constructing objects with new everywhere, ask a factory. The factory knows the rules: which subclass, which dependencies, which configuration."
    ],
    whyUseIt: [
      "Real systems have multiple variants of a thing — payment methods (UPI / Card / NetBanking), notification channels (Email / SMS / Push), report types. The factory picks the right implementation at runtime based on input.",
      "Centralizes the 'which type to create' logic so you don't have switch-case scattered across the codebase. Adding a new payment type = update the factory; nothing else changes."
    ],
    realLifeExample: [
      "On Razorpay checkout, user picks UPI. Backend asks PaymentFactory.Create('UPI') → returns a UpiPayment instance configured correctly. Tomorrow, add 'Wallet' — register it in the factory; checkout code unchanged.",
      "Same pattern in shipping: UPS / FedEx / DTDC — ShipperFactory.Create(courier) gives the right shipper with right credentials."
    ],
    howItWorks: [
      "Define a common interface (IPayment with PayAsync method).",
      "Implement variants (UpiPayment, CardPayment, NetBankingPayment).",
      "Factory takes input (string / enum) and returns the right implementation: switch / dictionary / DI keyed services.",
      "Modern .NET 8+ has KeyedServices — services.AddKeyedScoped<IPayment, UpiPayment>('UPI') and inject IServiceProvider.GetRequiredKeyedService<IPayment>('UPI'). No manual factory class needed.",
      "Testability: replace the factory with a mock that returns a fake IPayment."
    ],
    codeExample: `public interface IPayment { Task PayAsync(decimal amount); }

public class UpiPayment        : IPayment { public Task PayAsync(decimal a) { Console.WriteLine($"UPI ₹{a}");        return Task.CompletedTask; } }
public class CardPayment       : IPayment { public Task PayAsync(decimal a) { Console.WriteLine($"Card ₹{a}");       return Task.CompletedTask; } }
public class NetBankingPayment : IPayment { public Task PayAsync(decimal a) { Console.WriteLine($"NetBanking ₹{a}"); return Task.CompletedTask; } }

// Classic Simple Factory
public interface IPaymentFactory { IPayment Create(string method); }

public class PaymentFactory : IPaymentFactory
{
    private readonly IServiceProvider _sp;
    public PaymentFactory(IServiceProvider sp) => _sp = sp;

    public IPayment Create(string method) => method switch
    {
        "UPI"        => _sp.GetRequiredService<UpiPayment>(),
        "Card"       => _sp.GetRequiredService<CardPayment>(),
        "NetBanking" => _sp.GetRequiredService<NetBankingPayment>(),
        _ => throw new ArgumentException($"Unknown method '{method}'")
    };
}

// Modern .NET 8 — Keyed Services (no factory needed!)
builder.Services.AddKeyedScoped<IPayment, UpiPayment>("UPI");
builder.Services.AddKeyedScoped<IPayment, CardPayment>("Card");

// Inject keyed
public class CheckoutController(IServiceProvider sp) : ControllerBase
{
    [HttpPost("{method}")]
    public async Task<IActionResult> Pay(string method, decimal amount)
    {
        var pay = sp.GetRequiredKeyedService<IPayment>(method);
        await pay.PayAsync(amount);
        return Ok();
    }
}`,
    codeOutput: `POST /pay/UPI?amount=500     → "UPI ₹500"
POST /pay/Card?amount=2000   → "Card ₹2000"
POST /pay/NetBanking?amount=750 → "NetBanking ₹750"
POST /pay/Crypto?amount=100  → 400 Unknown method 'Crypto'

Add Wallet payment tomorrow:
  → builder.Services.AddKeyedScoped<IPayment, WalletPayment>("Wallet");
  → CheckoutController code unchanged`,
    interviewQuestions: [
      {
        q: "What is the Factory pattern?",
        a: "A pattern that hides object creation behind a method or class. Instead of newing up specific types, callers ask the factory for an instance. The factory decides which concrete type to create based on input. Three flavours: Simple Factory (static method), Factory Method (subclass overrides), Abstract Factory (factory of factories)."
      },
      {
        q: "What's the difference between Factory and Dependency Injection?",
        a: "DI gives you ONE instance type bound to one interface — same implementation everywhere. Factory picks AMONG multiple implementations based on runtime input (payment method, region, tenant). They complement each other: factory itself is registered in DI; the implementations it returns are also DI-managed."
      },
      {
        q: "When should you use a Factory pattern?",
        a: "When you have multiple implementations of an interface and the caller chooses which one based on input — payment processors, notification channels, file format readers, report exporters. If there's only one implementation, you don't need a factory; plain DI suffices."
      },
      {
        q: "How does .NET 8's Keyed Services replace simple factories?",
        a: "AddKeyedScoped<IPayment, UpiPayment>('UPI') registers an implementation under a key. Inject IServiceProvider and call GetRequiredKeyedService<IPayment>('UPI') to fetch by key. This replaces hand-written factory classes for the common 'pick implementation by string' case — less code, container handles disposal/lifetime."
      },
      {
        q: "What is Abstract Factory?",
        a: "A factory whose products are themselves factories — used for families of related objects. E.g. UI widget set: WindowsFactory creates WindowsButton + WindowsTextbox; MacFactory creates MacButton + MacTextbox. Caller picks the family once, gets a consistent set. Less common in modern DI-driven .NET."
      }
    ],
    followUpQuestions: [
      { q: "Returns what?", a: "An interface, picked at runtime." },
      { q: "Three forms?", a: "Simple, Factory Method, Abstract." },
      { q: ".NET 8 alternative?", a: "Keyed Services." },
      { q: "Pattern complement?", a: "Strategy pattern (interchangeable algorithms)." },
      { q: "Common use?", a: "Multiple implementations of one interface." },
      { q: "Anti-pattern with Factory?", a: "Factory with only one product." }
    ],
    commonMistakes: [
      "Writing a Factory when there's only one implementation — pure ceremony, no value.",
      "Hard-coded switch in factory — reopen the file every time you add a new type. Use registration dictionary or DI keyed services.",
      "Factory creates objects with new instead of resolving from DI — implementations lose their dependencies.",
      "Forgetting to dispose factory-created objects with disposable dependencies — leaks."
    ],
    proTip: "Senior interview line: 'For .NET 8+ I use Keyed Services instead of writing factory classes — same outcome, less code, container manages lifetimes. I keep factories only when the selection logic is non-trivial (config-driven, tenant-aware, fallback chains). Factories with a single product are always a code smell.'"
  },

  // ============================================================
  // 10. CQRS
  // ============================================================
  {
    id: 'cqrs',
    title: '10. CQRS (Command Query Responsibility Segregation)',
    whatIsThis: [
      "CQRS splits read operations (Queries — return data) and write operations (Commands — change state) into separate models, often separate code paths. Queries return DTOs; Commands return success/failure. Frequently used with the MediatR library to dispatch them through handlers.",
      "Simple meaning is — reads and writes have different needs (different shapes, different optimization, different scaling). Stop forcing them into one model and one service."
    ],
    whyUseIt: [
      "Reads and writes diverge naturally — reads need denormalized DTOs for screens, writes need domain rules and validation. Separating them lets each evolve without dragging the other.",
      "Plays well with MediatR's request/response pattern: each Command/Query has its own handler, easy to test in isolation, easy to add cross-cutting behavior (logging, validation, caching) via pipeline behaviors."
    ],
    realLifeExample: [
      "Amazon: 'Place Order' is a Command — runs business rules, talks to inventory, payment, persists. 'Get Order History' is a Query — returns a flat DTO for the screen, no business logic, no writes. Different code paths, different optimization.",
      "At extreme scale you split further: writes go to one DB, reads to a denormalized read store (e.g. Elasticsearch). That's CQRS + read replicas — but most apps stop at the code-level split."
    ],
    howItWorks: [
      "Install MediatR (still very popular though licensing changed in 2025; alternatives include Brighter and hand-rolled dispatchers).",
      "Define commands: PlaceOrderCommand : IRequest<int>. Define queries: GetOrderQuery : IRequest<OrderDto>.",
      "Define handlers: PlaceOrderHandler : IRequestHandler<PlaceOrderCommand, int>. One handler per command/query.",
      "Register: services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(Program).Assembly)).",
      "Controllers / endpoints inject IMediator and call mediator.Send(command) — handler runs, response returned."
    ],
    codeExample: `// Command — write
public record PlaceOrderCommand(int CustomerId, string Item, int Qty) : IRequest<int>;

public class PlaceOrderHandler : IRequestHandler<PlaceOrderCommand, int>
{
    private readonly AppDb _db;
    public PlaceOrderHandler(AppDb db) => _db = db;

    public async Task<int> Handle(PlaceOrderCommand cmd, CancellationToken ct)
    {
        var order = new Order { CustomerId = cmd.CustomerId, Item = cmd.Item, Qty = cmd.Qty };
        _db.Orders.Add(order);
        await _db.SaveChangesAsync(ct);
        return order.Id;
    }
}

// Query — read
public record GetOrderQuery(int Id) : IRequest<OrderDto?>;

public class GetOrderHandler : IRequestHandler<GetOrderQuery, OrderDto?>
{
    private readonly AppDb _db;
    public GetOrderHandler(AppDb db) => _db = db;

    public Task<OrderDto?> Handle(GetOrderQuery q, CancellationToken ct) =>
        _db.Orders.AsNoTracking()
            .Where(o => o.Id == q.Id)
            .Select(o => new OrderDto(o.Id, o.Item, o.Qty))
            .FirstOrDefaultAsync(ct);
}

// Controller stays thin
[ApiController, Route("api/orders")]
public class OrdersController(IMediator mediator) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> Place(PlaceOrderCommand cmd) =>
        Created($"/api/orders/{await mediator.Send(cmd)}", null);

    [HttpGet("{id:int}")]
    public async Task<IActionResult> Get(int id)
    {
        var dto = await mediator.Send(new GetOrderQuery(id));
        return dto is null ? NotFound() : Ok(dto);
    }
}

public record OrderDto(int Id, string Item, int Qty);`,
    codeOutput: `POST /api/orders { "customerId":42, "item":"Pizza", "qty":2 }
  → mediator dispatches → PlaceOrderHandler runs → 201 + Location

GET /api/orders/123
  → mediator dispatches → GetOrderHandler runs → 200 OrderDto

Benefits seen:
  ✓ Controller has zero business logic
  ✓ Each handler unit-testable in isolation
  ✓ Easy to add pipeline behaviors (LoggingBehavior, ValidationBehavior)
  ✓ Reads use AsNoTracking + DTO; writes use full entities`,
    interviewQuestions: [
      {
        q: "What is CQRS?",
        a: "Command Query Responsibility Segregation — splits write operations (Commands) and read operations (Queries) into separate models / code paths / handlers. Commands change state and may return success/id; Queries return DTOs without side effects. Helps each side evolve independently."
      },
      {
        q: "What's the difference between CQRS and traditional CRUD?",
        a: "Traditional CRUD uses one model and one service for both reads and writes — shape compromised between needs. CQRS separates them — Queries return optimized DTOs for screens, Commands run business rules. Each side has its own model, validation, optimization. Costs more code but scales better."
      },
      {
        q: "Do you need MediatR for CQRS?",
        a: "No — CQRS is a pattern; MediatR is one library that helps implement it. You can write your own dispatcher, or just structure code into separate Commands and Queries without any framework. MediatR adds value via pipeline behaviors (logging, validation, caching as decorators)."
      },
      {
        q: "When should you NOT use CQRS?",
        a: "Small CRUD apps where the read and write shapes are essentially the same — adding CQRS is pure ceremony. CQRS shines when reads and writes diverge, when you have complex domain logic on writes, or when you want to add pipeline behaviors. Otherwise, keep it simple."
      },
      {
        q: "What is Event Sourcing and how does it relate to CQRS?",
        a: "Event Sourcing stores all state changes as an append-only log of events; current state is derived by replaying. Often paired with CQRS — Commands produce events, Queries read from a denormalized projection built from those events. CQRS without Event Sourcing is far more common; Event Sourcing without CQRS is rare."
      }
    ],
    followUpQuestions: [
      { q: "What does CQRS stand for?", a: "Command Query Responsibility Segregation." },
      { q: "Common library?", a: "MediatR." },
      { q: "Command returns?", a: "Success/id (changes state)." },
      { q: "Query returns?", a: "DTO (no side effects)." },
      { q: "Handler interface?", a: "IRequestHandler<TRequest, TResponse>." },
      { q: "Pipeline behaviors used for?", a: "Cross-cutting (logging, validation, caching)." },
      { q: "CQRS + separate read DB?", a: "Read replica / search index pattern." }
    ],
    commonMistakes: [
      "Adding CQRS to a small CRUD app — pure ceremony, more code, no benefit.",
      "Using the same entity for Command and Query results — defeats the separation.",
      "Putting business logic in controllers and using MediatR as a thin pass-through — handler should own logic.",
      "Sharing handlers between Commands and Queries — each should have its own focused handler."
    ],
    proTip: "Senior interview line: 'I use CQRS when reads and writes meaningfully diverge — different shapes, different validation, different optimization. With MediatR I get pipeline behaviors for free (logging, validation, caching). For small CRUD I skip it. The mistake I look for in code reviews is CQRS-shaped code that doesn't actually separate anything.'"
  },

  // ============================================================
  // 11. Monolith vs Microservices
  // ============================================================
  {
    id: 'monolith-vs-microservices',
    title: '11. Monolith vs Microservices',
    whatIsThis: [
      "Monolith = one codebase, one deployable, one DB. All features (orders, payments, users, inventory) live in one app and share resources. Microservices = each business capability is a small independent service with its own codebase, DB, and deployment.",
      "Simple meaning is — monolith is one big house with rooms. Microservices is a society of small independent houses, each owned by a small team, talking via roads (APIs)."
    ],
    whyUseIt: [
      "Monolith is the right starting point — fast to build, simple to deploy, single DB transaction across features. Most successful products start as monoliths.",
      "Microservices help when teams or scale grow — independent deployment, technology choice per service, scale individual services hot. Cost: distributed system complexity (network failures, eventual consistency, observability)."
    ],
    realLifeExample: [
      "Early Flipkart: a monolithic Java app. As traffic grew and teams grew, painful deployments and one failing module took everything down. Migrated to microservices — Catalog, Cart, Orders, Payments became separate services with their own DBs.",
      "Today Flipkart runs hundreds of services. Each team owns a service end-to-end — code, DB, deploy, on-call. Trade-off: huge investment in DevOps, observability, contract management."
    ],
    howItWorks: [
      "Monolith: single ASP.NET Core app, one DbContext, one DB, one CI/CD pipeline. All modules linked at compile time.",
      "Microservices: each service is its own ASP.NET Core / Node / Go app with its own DB. They communicate via HTTP / gRPC (sync) or message brokers like RabbitMQ / Kafka (async).",
      "Service discovery (Consul, Kubernetes DNS), API Gateway (YARP / Ocelot / Kong) for the front door, central observability (OpenTelemetry → Grafana / DataDog).",
      "Each service has its own team, deploy cadence, tech stack, and DB schema. Cross-service data needs API calls or replicated read models.",
      "Cross-service transactions become Sagas (compensating actions) — you can't span DBs anymore."
    ],
    codeExample: `// Monolith (one app handles everything)
[ApiController, Route("api/checkout")]
public class CheckoutController : ControllerBase
{
    private readonly AppDb _db;       // single DB
    public CheckoutController(AppDb db) => _db = db;

    [HttpPost]
    public async Task<IActionResult> Place(OrderDto dto)
    {
        // All in one transaction — same DB
        var order = new Order { ... };
        _db.Orders.Add(order);
        _db.Inventory.First(i => i.Id == dto.ProductId).Qty -= dto.Qty;
        _db.Payments.Add(new Payment { ... });
        await _db.SaveChangesAsync();    // atomic across 3 tables
        return Ok();
    }
}

// Microservices (one service per capability)
[ApiController, Route("api/orders")]
public class OrdersController(HttpClient inventory, HttpClient payments, OrdersDb db)
    : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> Place(OrderDto dto)
    {
        // No shared DB — must coordinate via HTTP / events
        await inventory.PostAsJsonAsync("/reserve", new { dto.ProductId, dto.Qty });
        await payments.PostAsJsonAsync("/charge",  new { dto.Amount });

        var order = new Order { ... };
        db.Orders.Add(order);
        await db.SaveChangesAsync();

        // What if payments succeeds but Orders save fails?
        // Need a Saga / compensating action. Distributed = harder.
        return Ok();
    }
}`,
    codeOutput: `Monolith
  ✓ One codebase, one deploy, one DB
  ✓ Cross-table transactions are easy (one SaveChanges)
  ✗ One bug can take down everything
  ✗ Big-bang deploys, slower team scaling

Microservices
  ✓ Independent deploys per team
  ✓ Scale hot services independently
  ✓ Tech-stack choice per service
  ✗ Distributed transactions need Sagas
  ✗ Network failures, eventual consistency
  ✗ Observability cost (tracing across services)
  ✗ DevOps cost (per-service CI/CD, infra)`,
    interviewQuestions: [
      {
        q: "What is the difference between Monolith and Microservices?",
        a: "Monolith: one codebase, one deploy, one shared DB — everything tightly coupled at compile/deploy time. Microservices: each business capability is a separately-deployed service with its own DB, communicating via HTTP/gRPC/messaging. Monolith is simpler; microservices give independent scaling and deployment at the cost of distributed-system complexity."
      },
      {
        q: "When should you choose monolith over microservices?",
        a: "Almost always at the start. Small teams, unclear domain boundaries, no scale problem yet — monolith wins on velocity. Move to microservices only when you have proven boundaries, teams large enough to own independent services, and the operational maturity (CI/CD, observability, DevOps) to handle them."
      },
      {
        q: "What are the main challenges of microservices?",
        a: "Distributed transactions (no single SaveChanges across services — need Sagas / outbox pattern). Network failures (services must handle timeouts, retries, circuit breakers). Observability (tracing requests across many services). Data consistency (eventual, not immediate). Operational overhead (CI/CD per service, monitoring, on-call)."
      },
      {
        q: "What is a Saga in microservices?",
        a: "A pattern for managing transactions that span multiple services. Each step has a corresponding compensating action — if step 3 fails, you run undo for steps 1 and 2. Two flavours: orchestration (a coordinator service drives steps) or choreography (each service reacts to events). Saga replaces the missing 'BEGIN TRANSACTION' across services."
      },
      {
        q: "What is a Modular Monolith?",
        a: "A monolith where the code is strictly organized into independent modules with clear boundaries (each with its own DbContext / namespace / domain). All in one deploy, but the boundaries are enforced — making future split into microservices possible if needed. Best of both worlds for many teams."
      }
    ],
    followUpQuestions: [
      { q: "Default starting point?", a: "Monolith." },
      { q: "Single DB?", a: "Monolith." },
      { q: "Independent deploy?", a: "Microservices." },
      { q: "Distributed transaction pattern?", a: "Saga / outbox." },
      { q: "Inter-service sync comm?", a: "HTTP / gRPC." },
      { q: "Inter-service async comm?", a: "RabbitMQ / Kafka." },
      { q: "Front door for clients?", a: "API Gateway." },
      { q: "Halfway design?", a: "Modular Monolith." }
    ],
    commonMistakes: [
      "Starting with microservices on a small / unclear-domain project — premature complexity that burns the team out.",
      "Microservices that share a DB — you've gained complexity without independence ('distributed monolith').",
      "Synchronous chains across many services (A → B → C → D) — one slow service slows the whole call.",
      "No observability investment — production incidents become unsolvable mysteries."
    ],
    proTip: "Senior interview line: 'I always start with a well-modularized monolith. Microservices come later when team size and clear domain boundaries justify the operational cost. The biggest mistake teams make is choosing microservices for the resume — and then ending up with a distributed monolith that is harder to operate than what they replaced.'"
  },

  // ============================================================
  // 12. API Gateway
  // ============================================================
  {
    id: 'api-gateway',
    title: '12. API Gateway',
    whatIsThis: [
      "An API Gateway is a single entry point that sits in front of your backend services. It handles routing, authentication, rate limiting, request aggregation, response shaping, and SSL termination — so your microservices don't each implement these concerns.",
      "Simple meaning is — clients talk to ONE address (api.myapp.com); the gateway figures out which internal service to forward each call to. Cross-cutting concerns happen in one place."
    ],
    whyUseIt: [
      "Without a gateway, mobile / SPA clients need to know URLs of every microservice — fragile and a security risk. The gateway centralizes that map and exposes a clean public API.",
      "It also lets you handle authentication, rate limiting, logging, request transformation, response aggregation, version routing in one component — instead of duplicating across every service."
    ],
    realLifeExample: [
      "Netflix Zuul (now a YARP/Spring Cloud Gateway successor) is the famous API gateway example. One mobile request to Netflix homepage hits the gateway, which fans out to many internal services (catalog, recommendations, watch history) and returns a single combined response.",
      "On Indian fintech: PhonePe app talks to gateway.phonepe.com; gateway routes to /accounts, /payments, /rewards services internally. Mobile never sees those URLs."
    ],
    howItWorks: [
      ".NET options: YARP (Yet Another Reverse Proxy) — Microsoft's official, fast, configurable. Ocelot — older but popular. Outside .NET: Kong, NGINX, Envoy, AWS API Gateway, Azure API Management.",
      "Configure routes: incoming pattern → cluster (target service URL). YARP reads JSON config (appsettings.json) or code-based.",
      "Add policies: authentication (JWT validation upstream), rate limiting per route/user, request/response transforms, retry, load balancing across cluster nodes.",
      "Observability hooks: emit per-route metrics + traces.",
      "Deployment: gateway runs as its own service, scaled horizontally behind a load balancer (yes, gateway in front, LB in front of gateway)."
    ],
    codeExample: `// Program.cs — YARP-based API Gateway
using Yarp.ReverseProxy;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddReverseProxy()
    .LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"));

builder.Services.AddRateLimiter(o => { /* ... */ });
builder.Services.AddAuthentication("Bearer").AddJwtBearer();

var app = builder.Build();
app.UseAuthentication();
app.UseAuthorization();
app.UseRateLimiter();
app.MapReverseProxy();

app.Run();

// appsettings.json — routes + clusters
// {
//   "ReverseProxy": {
//     "Routes": {
//       "orders":   { "ClusterId": "orders-cluster",   "Match": { "Path": "/api/orders/{**catch-all}" } },
//       "payments": { "ClusterId": "payments-cluster", "Match": { "Path": "/api/payments/{**catch-all}" } }
//     },
//     "Clusters": {
//       "orders-cluster":   { "Destinations": { "d1": { "Address": "http://orders-svc:5001/" } } },
//       "payments-cluster": { "Destinations": { "d1": { "Address": "http://payments-svc:5002/" } },
//                             "LoadBalancingPolicy": "RoundRobin" }
//     }
//   }
// }`,
    codeOutput: `Client → https://api.myapp.com/api/orders/42
  Gateway:
    1. Validate JWT      (Authentication middleware)
    2. Check rate limit  (UseRateLimiter)
    3. Match route       → orders-cluster
    4. Forward to        http://orders-svc:5001/api/orders/42
    5. Return response   to client (with metrics + tracing)

Client doesn't know about orders-svc, payments-svc, or service discovery.
Add a new service tomorrow → update config, no client change.`,
    interviewQuestions: [
      {
        q: "What is an API Gateway and why do we need it?",
        a: "It's a single entry point in front of microservices. Handles routing, auth, rate limiting, SSL termination, request aggregation, observability — so each service doesn't have to. Clients see one stable URL; gateway maps it to internal services. Without it, every service exposes itself directly — fragile, insecure, and hard to evolve."
      },
      {
        q: "What's the difference between an API Gateway and a Load Balancer?",
        a: "Load Balancer (L4 or L7) distributes traffic across instances of one service. API Gateway routes among MULTIPLE services AND adds cross-cutting concerns (auth, rate limit, transformation). They complement each other — gateway in front of services; LB often sits in front of the gateway too."
      },
      {
        q: "What .NET options exist for an API Gateway?",
        a: "YARP (Yet Another Reverse Proxy) — Microsoft's official, modern, fast, config-driven, replaces Ocelot in new projects. Ocelot — older library, still in use. For non-.NET environments: Kong, NGINX/Envoy, AWS API Gateway, Azure API Management. Pick based on team and platform."
      },
      {
        q: "What is BFF (Backend for Frontend)?",
        a: "A specialized API gateway tailored to one client type (mobile, web, partner). Each frontend gets its own BFF that aggregates calls and shapes responses for that client's needs. Avoids one-size-fits-all gateway responses. Common when mobile and web have very different data needs."
      },
      {
        q: "How do you secure an API Gateway?",
        a: "Validate JWT/auth at the gateway so downstream services trust the user. Apply rate limiting per IP/user. SSL termination on the gateway. Allow only the gateway IP to reach internal services (network policies / service mesh). Rotate keys, log every request, alert on anomalies."
      }
    ],
    followUpQuestions: [
      { q: ".NET official gateway?", a: "YARP." },
      { q: "Older popular library?", a: "Ocelot." },
      { q: "Single client URL?", a: "api.myapp.com → gateway." },
      { q: "Per-client gateway pattern?", a: "BFF — Backend For Frontend." },
      { q: "Aggregation use case?", a: "Combine multiple service calls into one response." },
      { q: "Gateway vs LB?", a: "Gateway = routing + concerns; LB = distribute traffic." }
    ],
    commonMistakes: [
      "Putting heavy business logic in the gateway — it should route + cross-cutting only, not domain logic.",
      "Gateway becomes a single point of failure with no replication — scale it horizontally.",
      "Skipping JWT validation at the gateway — every backend has to revalidate, wasted CPU.",
      "Hard-coding service URLs in mobile apps instead of going through the gateway — locked into specific microservice topology."
    ],
    proTip: "Senior interview line: 'I put a YARP-based gateway in front of every microservice deployment. Auth and rate limiting happen at the gateway so backend services trust the user and stay focused on business logic. The gateway is itself horizontally scaled — single instance is a single point of failure.'"
  },

  // ============================================================
  // 13. Load Balancing
  // ============================================================
  {
    id: 'load-balancing',
    title: '13. Load Balancing',
    whatIsThis: [
      "Load balancing distributes incoming requests across multiple server instances so no single server gets overwhelmed. Done at L4 (TCP — fast, simple) or L7 (HTTP — can route by URL/header). Common implementations: NGINX, HAProxy, AWS ALB / NLB, Azure Front Door, Kubernetes Service.",
      "Simple meaning is — ten copies of your API are running. The load balancer picks one for each request, so they share the load and one going down doesn't take everyone down."
    ],
    whyUseIt: [
      "Single server = single point of failure + scale ceiling. Load balancer + multiple instances = horizontal scalability + high availability. Add more boxes when traffic grows; one crash leaves the rest serving.",
      "Also enables zero-downtime deploys — drain one instance, deploy, bring back, repeat. Users see no outage."
    ],
    realLifeExample: [
      "Netflix runs thousands of API instances behind L7 load balancers. A single user's session may hit different instances on each request — that's why services must be stateless.",
      "On Diwali, Flipkart spins up 10x the normal instance count behind the same load balancer URL. Traffic auto-distributes; no client config change."
    ],
    howItWorks: [
      "Algorithm picks which server gets the next request. Common: Round Robin, Least Connections, Random, Weighted, Sticky (session affinity), IP-Hash.",
      "Health checks — LB pings each server (e.g. /health every 5s). Unhealthy server is removed from rotation until it recovers.",
      "L4 (Layer 4 — TCP/UDP): fast, simple, doesn't see HTTP headers. Used by AWS NLB.",
      "L7 (Layer 7 — HTTP/HTTPS): can route by path, headers, cookies. SSL termination, sticky sessions, request tracing. Used by NGINX, AWS ALB.",
      "Modern cloud: managed LBs (AWS ALB, Azure Front Door, GCP Load Balancing) handle all this with auto-scaling and global distribution."
    ],
    codeExample: `// Your ASP.NET Core app needs to be stateless and aware it's behind an LB.

// Program.cs — minimal config for load-balancer-friendly app
var builder = WebApplication.CreateBuilder(args);

// 1. Read forwarded headers from LB (real client IP, original scheme)
builder.Services.Configure<ForwardedHeadersOptions>(o =>
{
    o.ForwardedHeaders =
        ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
});

// 2. Health-check endpoint the LB will probe
builder.Services.AddHealthChecks()
    .AddDbContextCheck<AppDb>();

var app = builder.Build();

app.UseForwardedHeaders();   // before everything else
app.MapHealthChecks("/health");
app.MapGet("/", () => $"Served by {Environment.MachineName}");

app.Run();

// NGINX example config (in front of 3 ASP.NET Core instances)
// upstream api {
//   least_conn;
//   server api1:5000 max_fails=3 fail_timeout=10s;
//   server api2:5000 max_fails=3 fail_timeout=10s;
//   server api3:5000 max_fails=3 fail_timeout=10s;
// }
// server {
//   listen 443 ssl;
//   location / { proxy_pass http://api; }
// }`,
    codeOutput: `Client requests over an hour:

GET / → "Served by api1"
GET / → "Served by api2"
GET / → "Served by api3"
GET / → "Served by api1"
...

If api2 fails health check (5 consecutive 500s):
  → LB stops sending traffic to api2
  → Remaining requests split between api1 and api3
  → When api2 recovers, it rejoins rotation

Effect:
  ✓ No client downtime
  ✓ Bad instance auto-isolated
  ✓ Easy to add api4, api5, ... by updating LB config`,
    interviewQuestions: [
      {
        q: "What is load balancing and why do we need it?",
        a: "Distribution of incoming requests across multiple server instances. Needed for two reasons: high availability (one server crashing doesn't take the system down) and horizontal scalability (add more boxes to handle more traffic). Without an LB, you're capped by one machine's capacity and have a single point of failure."
      },
      {
        q: "What are common load-balancing algorithms?",
        a: "Round Robin (simple cycle through servers). Least Connections (send to server with fewest active connections). Weighted (favor stronger servers). Random. IP-Hash / Sticky (same client always lands on same server — needed for stateful apps). Pick based on workload uniformity and statefulness."
      },
      {
        q: "What's the difference between L4 and L7 load balancing?",
        a: "L4 (Layer 4 — TCP/UDP): operates on transport layer, doesn't inspect HTTP, very fast. Good for raw throughput. L7 (Layer 7 — HTTP/HTTPS): inspects the request, can route by URL / header / cookie, supports SSL termination and sticky sessions. Most app load balancers (ALB, NGINX) are L7."
      },
      {
        q: "What is a sticky session and when is it bad?",
        a: "Sticky (or session affinity) routes the same client to the same backend server, usually via cookie. Useful when state lives on the server (in-process session, in-memory cache). Bad because: uneven load (one server gets a heavy user), poor failover (sticky server dies → user loses session). Better fix: make the app stateless and put session in Redis."
      },
      {
        q: "What is a health check?",
        a: "A periodic probe (HTTP GET /health) that the LB sends to each server. Healthy responses keep the server in rotation; failures (timeouts, 5xx) take it out. ASP.NET Core has builder.Services.AddHealthChecks() — exposes a configurable endpoint that can verify DB, Redis, downstream services."
      }
    ],
    followUpQuestions: [
      { q: "L4 LB inspects?", a: "TCP/UDP only, not HTTP." },
      { q: "L7 LB inspects?", a: "HTTP — URL, headers, cookies." },
      { q: "Default algorithm?", a: "Round Robin." },
      { q: "Even balance for varying load?", a: "Least Connections." },
      { q: "Sticky session means?", a: "Same client → same server (cookie / IP-hash)." },
      { q: "ASP.NET Core health check?", a: "AddHealthChecks + MapHealthChecks." },
      { q: "Behind LB, get real IP?", a: "Read X-Forwarded-For via UseForwardedHeaders." }
    ],
    commonMistakes: [
      "Stateful app behind LB without sticky sessions — random failures as session lands on a server that doesn't know the user.",
      "No health checks — LB happily sends requests to dead servers.",
      "Reading Request.Connection.RemoteIpAddress without UseForwardedHeaders — sees the LB's IP, not the client.",
      "Single LB instance — single point of failure. Production needs LB cluster / managed service."
    ],
    proTip: "Senior interview line: 'I always design apps to be stateless behind the LB — sessions in Redis, no in-process caches that diverge between instances. Health checks are non-negotiable, and I read X-Forwarded-For via UseForwardedHeaders so my logs show the real client IP. Sticky sessions are a smell — usually a sign the app needs to be made stateless.'"
  },

  // ============================================================
  // 14. Scalability
  // ============================================================
  {
    id: 'scalability',
    title: '14. Scalability — Vertical, Horizontal, Stateless Design',
    whatIsThis: [
      "Scalability is the ability to handle more load — more users, more requests, more data — without redesigning. Two axes: vertical (bigger box: more CPU / RAM) and horizontal (more boxes: add instances). Modern apps mostly scale horizontally because clouds make it cheap.",
      "Simple meaning is — when traffic grows 10x, can you handle it by adding servers without rewriting the app? If yes, the app is scalable. If no, you have a redesign on your hands."
    ],
    whyUseIt: [
      "Real apps don't have steady traffic — they have launches, sales, viral moments, daytime peaks. Scalable design lets you ride those waves instead of crashing.",
      "It also controls cost — scale up during peak, scale down during quiet hours. Rigid single-box apps pay for peak capacity 24/7."
    ],
    realLifeExample: [
      "On Diwali, Amazon traffic is 10x normal. The infra auto-scales: more API pods, more DB read replicas, larger Redis cluster, more queue workers. After the sale, scale shrinks back. Same code base, no developer intervention.",
      "Compare to a poorly-designed monolith on one box — Diwali day and the whole site crashes; users move to competitors."
    ],
    howItWorks: [
      "Stateless services — no in-process session, no in-memory cache that other instances need to see. Sessions go to Redis; cache goes to Redis; uploads go to S3 / blob. This lets ANY instance handle ANY request.",
      "Horizontal scale — run more replicas behind a load balancer. Auto-scaling rules (CPU > 70% → add pod) make it automatic.",
      "Database scaling — read replicas for read-heavy workloads, partitioning / sharding for write-heavy. Caching takes 80% of read traffic off the DB.",
      "Async processing — slow work goes to background queues (Hangfire, RabbitMQ, Service Bus) so request latency stays low.",
      "Observability — metrics + logs + traces tell you which layer is the bottleneck (DB, network, CPU) so scaling decisions are data-driven."
    ],
    codeExample: `// Scalable ASP.NET Core service — checklist applied
var builder = WebApplication.CreateBuilder(args);

// 1. Stateless — sessions in Redis, not in-memory
builder.Services.AddStackExchangeRedisCache(o =>
    o.Configuration = builder.Configuration.GetConnectionString("Redis"));

builder.Services.AddSession(o =>
{
    o.IdleTimeout = TimeSpan.FromMinutes(30);
});

// 2. Read-heavy → cache aggressively
builder.Services.AddSingleton<ProductCache>();

// 3. Slow work → background queue
builder.Services.AddHangfire(c =>
    c.UseSqlServerStorage(builder.Configuration.GetConnectionString("Default")));

// 4. EF Core with NoTracking by default for read paths
builder.Services.AddDbContext<AppDb>(o =>
{
    o.UseSqlServer(builder.Configuration.GetConnectionString("Default"));
    o.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
});

// 5. Health checks for the LB / k8s
builder.Services.AddHealthChecks()
    .AddSqlServer(builder.Configuration.GetConnectionString("Default")!)
    .AddRedis(builder.Configuration.GetConnectionString("Redis")!);

var app = builder.Build();
app.UseForwardedHeaders();
app.MapHealthChecks("/health");
app.MapControllers();
app.Run();

// Now: kubectl scale deployment myapp --replicas=20`,
    codeOutput: `Stateless app, 1 replica baseline:
  → 800 RPS, p95 = 120 ms, CPU = 65%

Scale to 5 replicas behind LB:
  → 4000 RPS, p95 = 110 ms, CPU = 62% per pod

Scale to 20 replicas during sale:
  → 16,000 RPS, p95 = 130 ms, CPU = 70% per pod

DB becomes the bottleneck around 10k RPS:
  → Add 2 read replicas → reads divert → main DB load drops 60%
  → Cache hit ratio rises to 92% → DB load drops further

Same code, just config + infra → 20× capacity.`,
    interviewQuestions: [
      {
        q: "What is the difference between vertical and horizontal scaling?",
        a: "Vertical (scale up): add more CPU/RAM/SSD to one box. Limited by hardware ceiling, single point of failure, downtime to upgrade. Horizontal (scale out): add more boxes behind a load balancer. Near-unlimited, fault-tolerant, no downtime to scale. Modern cloud apps prefer horizontal."
      },
      {
        q: "What does stateless mean and why is it important for scaling?",
        a: "Stateless = the server keeps no per-client state between requests; everything needed comes in the request (token, IDs, payload). Important because any server instance can handle any request, enabling horizontal scaling without sticky sessions and zero-downtime deploys. State goes to external stores (Redis, DB, S3)."
      },
      {
        q: "How do you scale a database?",
        a: "Cache hot reads to take 80% off the DB (Redis). Add read replicas for read-heavy workloads (route reads to replicas, writes to primary). Partition / shard data by tenant or hash for write-heavy. Move analytics to a separate warehouse. Redesign queries — proper indexes, projection DTOs. Vertical scale the DB box as last resort (expensive)."
      },
      {
        q: "What is auto-scaling?",
        a: "Infrastructure automatically adjusts the number of running instances based on metrics (CPU > 70% → add a pod, < 30% → remove). Cloud providers (AWS, Azure, GCP, Kubernetes HPA) all support it. Combined with stateless services + load balancer, this gives elastic capacity without human intervention."
      },
      {
        q: "What are the bottlenecks you usually hit when scaling?",
        a: "(1) DB connections / writes — usually the first wall. (2) External API rate limits. (3) Single-instance dependencies (one Redis, one queue) — scale or shard them. (4) Synchronous chains of calls — convert to async. (5) Hot keys — cache stampede or partition skew. (6) Network / NAT exhaustion. Profiling tells you which one is biting."
      }
    ],
    followUpQuestions: [
      { q: "Vertical scaling means?", a: "Bigger machine (CPU/RAM)." },
      { q: "Horizontal scaling means?", a: "More machines (replicas)." },
      { q: "Stateless requires?", a: "External session/cache/storage." },
      { q: "Auto-scaling triggers on?", a: "Metrics like CPU / queue length." },
      { q: "First DB scaling step?", a: "Caching hot reads." },
      { q: "Read-heavy DB scaling?", a: "Read replicas." },
      { q: "Write-heavy DB scaling?", a: "Sharding / partitioning." },
      { q: "Async work via?", a: "Background queues (Hangfire, RabbitMQ)." }
    ],
    commonMistakes: [
      "In-process session / cache — breaks the moment you add a second replica.",
      "Synchronous chains spanning many services — one slow link tanks the whole call latency.",
      "Scaling the app servers but not the DB — bottleneck just moves to the DB.",
      "No metrics / tracing — scaling decisions based on hunches rather than data."
    ],
    proTip: "Senior interview line: 'Scalability starts with statelessness. Once the app holds nothing per-client in memory, horizontal scaling is just a config change. The first thing I attack on a scaling problem is the DB load — caching hot reads pays for itself in days. And every scale decision is driven by metrics, not gut feel.'"
  }
];
