import { Topic } from './phase-2.types';

export const phase2Topics: Topic[] = [
  // ============================================================
  // 1. What is .NET Core?
  // ============================================================
  {
    id: 'what-is-dotnet-core',
    title: '1. What is .NET Core?',
    whatIsThis: [
      ".NET Core is an open-source, cross-platform, high-performance framework from Microsoft for building modern apps — web APIs, desktop, cloud services, microservices. From .NET 5 onwards it is just called '.NET' (no more 'Core' suffix), but in interviews everyone still says .NET Core.",
      "Simple meaning is — .NET Core is the new, lightweight, cross-platform version of .NET. Same C# language, but the runtime can run on Windows, Linux, Mac and inside Docker."
    ],
    whyUseIt: [
      "Old .NET Framework was Windows-only, heavy, and tightly tied to IIS. .NET Core is cross-platform, modular (only the packages you need), much faster, and easy to deploy as a self-contained app or a Docker container. That's why almost every new project uses it.",
      "It also has a unified hosting model — same code runs as a console app, web API, gRPC service, Azure function, even a background worker. One framework, many shapes."
    ],
    realLifeExample: [
      "Before .NET Core: a banking app written in .NET Framework could only run on Windows servers with IIS. Deploying to a Linux server or Docker was almost impossible.",
      "After .NET Core: same banking team writes the API in .NET Core, builds a Docker image, deploys on Linux Kubernetes pods on AWS. Costs lesser, scales faster, and works anywhere."
    ],
    howItWorks: [
      "You write C# code targeting a TFM (Target Framework Moniker) like net8.0.",
      "dotnet build compiles it into IL inside a DLL.",
      "dotnet run hosts the app using Kestrel (the cross-platform web server built into .NET).",
      "Kestrel listens on a port and serves HTTP requests directly — no IIS required, though IIS / Nginx can sit in front as a reverse proxy.",
      "The same DLL can be deployed on Windows, Linux, Mac, or wrapped inside a Docker container — runtime decides at startup."
    ],
    codeExample: `// Minimal .NET 8 Web API — Program.cs
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello from .NET 8!");
app.MapGet("/health", () => new { status = "OK", time = DateTime.UtcNow });

app.Run();

// Run with:  dotnet run
// Hosted by Kestrel on http://localhost:5000`,
    codeOutput: `info: Microsoft.Hosting.Lifetime[14]
      Now listening on: http://localhost:5000
info: Microsoft.Hosting.Lifetime[0]
      Application started. Press Ctrl+C to shut down.

GET /        → Hello from .NET 8!
GET /health  → { "status": "OK", "time": "2026-05-06T10:00:00Z" }`,
    interviewQuestions: [
      {
        q: "What is .NET Core?",
        a: ".NET Core is the open-source, cross-platform, modular successor to .NET Framework. From .NET 5 it is simply called .NET. It runs on Windows, Linux, and Mac, supports modern hosting (Docker, Kubernetes), and is much faster and more modular than the old .NET Framework."
      },
      {
        q: "Why was .NET Core created when .NET Framework already existed?",
        a: "Three main reasons: (1) Cross-platform — old Framework only ran on Windows. (2) Performance — Core is significantly faster (Kestrel, lean pipeline). (3) Modular and open-source — you ship only the packages you need, and the source is on GitHub. Cloud-native and microservice workloads needed all of this."
      },
      {
        q: "What is Kestrel?",
        a: "Kestrel is the cross-platform web server built into .NET. It is fast, async, and handles HTTP / HTTP/2 / HTTP/3 directly. In production it is typically placed behind a reverse proxy like IIS, Nginx, or YARP for SSL termination and security, but it can also be exposed directly."
      },
      {
        q: "What is the TFM (Target Framework Moniker)?",
        a: "TFM identifies the target runtime — like net8.0, net6.0, netstandard2.0. It tells the compiler and tooling which runtime APIs are available. You see it inside the .csproj <TargetFramework> tag. Libraries often target netstandard2.0 to be reusable across both old Framework and new .NET."
      },
      {
        q: "What is the difference between SDK and Runtime?",
        a: "SDK contains tools to build, test, and run .NET apps (compiler, dotnet CLI, templates). Runtime contains only what's needed to execute a built app. Developers install SDK; servers / users only need the Runtime. SDK = build + run, Runtime = run only."
      }
    ],
    followUpQuestions: [
      { q: "Is .NET Core open-source?", a: "Yes, on GitHub." },
      { q: "Is it cross-platform?", a: "Yes — Windows, Linux, Mac." },
      { q: "Default web server?", a: "Kestrel." },
      { q: "Does it need IIS?", a: "No, IIS is optional reverse proxy." },
      { q: "Latest LTS version (2026)?", a: ".NET 8." },
      { q: "Why is it called just .NET now?", a: "Since .NET 5, Core suffix dropped — unified platform." }
    ],
    commonMistakes: [
      "Confusing .NET Core with .NET Framework — they are different runtimes, packages and APIs partly differ.",
      "Forgetting that NuGet package versions tied to old .NET Framework may not work on .NET Core.",
      "Trying to use System.Web (WebForms / classic ASP.NET) APIs in .NET Core — they don't exist there.",
      "Confusing SDK with Runtime — installing only Runtime on a build server and then wondering why dotnet build fails."
    ],
    proTip: "Quick interview line: 'For any new project I always pick the latest LTS .NET (currently .NET 8) — it's cross-platform, fast, has long-term support and works perfectly with Docker and Kubernetes. .NET Framework I touch only for legacy maintenance.'"
  },

  // ============================================================
  // 2. .NET Framework vs .NET Core vs .NET 6/7/8
  // ============================================================
  {
    id: 'framework-vs-core-vs-net8',
    title: '2. .NET Framework vs .NET Core vs .NET 6/7/8',
    whatIsThis: [
      ".NET Framework is the old, Windows-only platform (last version 4.8). .NET Core is the cross-platform rewrite (1.0 → 3.1). From .NET 5 onwards Microsoft merged everything into a single, unified product simply called .NET — and bumped the version each year (.NET 5, 6, 7, 8…).",
      "Simple meaning is — Framework was Windows-only and old; Core was cross-platform but called Core; from .NET 5 it's just .NET, with a new release every November."
    ],
    whyUseIt: [
      "You'll work with all three in real projects — legacy systems on Framework, transition projects on Core 3.1, new projects on .NET 6/7/8. Knowing the difference helps you pick the right tool and migrate without breaking things.",
      "Interviewers love this question because it tests whether you actually understand .NET history or just memorised one version."
    ],
    realLifeExample: [
      "An old SBI internal portal might still run on .NET Framework 4.8 with IIS on Windows Server 2012 — works, but no innovation, hard to scale.",
      "Their new mobile banking API is on .NET 8, deployed as Docker containers on Linux nodes inside Azure Kubernetes — modern, cross-platform, fast. Same company, same C# language — different runtimes."
    ],
    howItWorks: [
      ".NET Framework: Windows-only, ships with Windows, one big install — uses old CLR.",
      ".NET Core 1.0–3.1: side-by-side install on Windows / Linux / Mac, modular NuGet packages, uses CoreCLR.",
      ".NET 5 (Nov 2020): renamed from Core to just '.NET'. Unified runtime — Web, Desktop, Mobile, Cloud all one product.",
      ".NET 6 (LTS, Nov 2021): minimal hosting model (Program.cs only, no Startup.cs needed).",
      ".NET 7 (STS, Nov 2022): performance improvements, rate limiting, output caching.",
      ".NET 8 (LTS, Nov 2023): Native AOT, Blazor unified, even faster — current LTS as of 2026."
    ],
    codeExample: `// Same simple controller — works the same on .NET 6, 7, 8
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class HealthController : ControllerBase
{
    [HttpGet]
    public IActionResult Get() => Ok(new
    {
        framework = System.Runtime.InteropServices.RuntimeInformation.FrameworkDescription,
        os        = System.Runtime.InteropServices.RuntimeInformation.OSDescription
    });
}`,
    codeOutput: `GET /api/health
{
  "framework": ".NET 8.0.0",
  "os": "Linux 6.5.0-21-generic"
}`,
    interviewQuestions: [
      {
        q: "What is the difference between .NET Framework and .NET Core?",
        a: ".NET Framework is Windows-only, monolithic, tied to IIS, and is in maintenance mode. .NET Core (now just .NET) is cross-platform, modular, much faster, open-source, and supports modern hosting like Docker and Kubernetes. New projects should always use the latest .NET, not Framework."
      },
      {
        q: "Why did Microsoft drop the 'Core' name from .NET 5?",
        a: "To unify the brand. Earlier there was .NET Framework 4.x, .NET Core 3.1, Xamarin, Mono — too confusing. From .NET 5 onwards, all of these were merged into one unified platform simply called '.NET'. They skipped version 4 to avoid confusion with .NET Framework 4.x."
      },
      {
        q: "What is the difference between LTS and STS releases?",
        a: "LTS (Long Term Support) releases are supported for 3 years (.NET 6, .NET 8). STS (Standard Term Support, earlier 'Current') are supported for 18 months (.NET 5, 7). Production services should use LTS. STS is for teams wanting the latest features and willing to upgrade more often."
      },
      {
        q: "What is the minimal hosting model introduced in .NET 6?",
        a: "Earlier ASP.NET Core had two files — Program.cs (host setup) and Startup.cs (services + middleware). From .NET 6, both are merged into a single Program.cs using top-level statements. Less ceremony, easier for beginners, same power. WebApplication.CreateBuilder is the entry point."
      },
      {
        q: "Can the same library work on both .NET Framework and .NET Core?",
        a: "Yes, by targeting .NET Standard 2.0 — which both runtimes support. Useful for shared libraries (validation, DTOs, helpers). For new projects, target net8.0 directly to access modern APIs and best performance."
      }
    ],
    followUpQuestions: [
      { q: "Is .NET Framework cross-platform?", a: "No, Windows only." },
      { q: "Is .NET Core cross-platform?", a: "Yes." },
      { q: "What replaced 'Core' name?", a: "Just '.NET' from .NET 5." },
      { q: "Why no .NET 4?", a: "To avoid clash with .NET Framework 4.x." },
      { q: "Current LTS in 2026?", a: ".NET 8." },
      { q: "Frequency of .NET releases?", a: "Every November." },
      { q: ".NET Standard purpose?", a: "Shared API for both Framework and Core." }
    ],
    commonMistakes: [
      "Mixing NuGet packages across Framework and Core — many old packages don't run on Core.",
      "Choosing an STS release (.NET 7) for a long-running production service that you don't want to upgrade often.",
      "Forgetting that legacy WebForms / WCF server / Web Pages do not exist on .NET Core.",
      "Saying '.NET Core 5' in interviews — it's '.NET 5', no Core suffix."
    ],
    proTip: "In interview, drop this clean line: 'For new services I default to the latest LTS — .NET 8 right now. Framework 4.8 is purely maintenance for me. The minimal hosting model from .NET 6 keeps the startup file tiny, and migrating from Core 3.1 → 6 → 8 has been mostly NuGet bumps with very little code change.'"
  },

  // ============================================================
  // 3. Project Structure
  // ============================================================
  {
    id: 'project-structure',
    title: '3. ASP.NET Core Project Structure',
    whatIsThis: [
      "An ASP.NET Core Web API project has a small, predictable layout — Program.cs (entry point), appsettings.json (config), Controllers folder (endpoints), and the .csproj (build settings). No Web.config, no Startup.cs (since .NET 6), no Global.asax.",
      "Simple meaning is — open any modern ASP.NET Core project, you immediately know where things are. The structure is consistent across teams and projects."
    ],
    whyUseIt: [
      "A predictable structure means new developers can be productive on day one. There's no hunting for 'where do I register a service' or 'where do I read config' — every project follows the same convention.",
      "It also keeps separation of concerns clean: configuration in appsettings, code in Controllers / Services, build settings in .csproj, secrets outside source control. Easier to maintain, easier to test."
    ],
    realLifeExample: [
      "Imagine joining a Swiggy backend team. You clone the repo, open VS Code, and within 2 minutes you know — Program.cs is the boot file, Controllers/OrderController.cs is the endpoint, appsettings.json has the DB connection, and Services/OrderService.cs has the business logic.",
      "You don't need a 30-minute walkthrough — that's the value of a standard project structure across the .NET community."
    ],
    howItWorks: [
      "Program.cs runs first — creates the WebApplication builder, registers services in DI, configures middleware, then calls app.Run().",
      "appsettings.json (and appsettings.Development.json) hold all configuration — connection strings, API keys, log levels. ENVIRONMENT picks the right file.",
      "Controllers/ folder holds REST endpoint classes (HomeController, OrderController). The framework auto-discovers them.",
      "Services/, Models/, DTOs/ folders are conventions you create for clean separation — not enforced by the framework but recommended.",
      ".csproj is the build file — lists target framework, NuGet packages, build flags. It's XML but tiny and human-friendly in modern .NET."
    ],
    codeExample: `// ───────── Program.cs (minimal hosting, .NET 8) ─────────
var builder = WebApplication.CreateBuilder(args);

// 1. Register services in DI
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IOrderService, OrderService>();

var app = builder.Build();

// 2. Configure middleware pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();

// ───────── appsettings.json ─────────
// {
//   "ConnectionStrings": { "Default": "Server=...;Database=...;" },
//   "Jwt":  { "Issuer": "myapp", "Key": "*****" },
//   "Logging": { "LogLevel": { "Default": "Information" } }
// }`,
    codeOutput: `Project layout:
MyApp/
├── Program.cs              ← entry point + DI + middleware
├── appsettings.json        ← config (env-overridable)
├── appsettings.Development.json
├── MyApp.csproj            ← build + NuGet refs
├── Controllers/
│   ├── OrderController.cs
│   └── ProductController.cs
├── Services/
│   ├── IOrderService.cs
│   └── OrderService.cs
└── Models/
    └── Order.cs`,
    interviewQuestions: [
      {
        q: "What is the role of Program.cs in ASP.NET Core?",
        a: "Program.cs is the entry point. It creates the WebApplication builder, registers services in the DI container, configures the middleware pipeline, and finally runs the app on Kestrel. Since .NET 6 it uses the minimal hosting model — no Startup.cs needed."
      },
      {
        q: "What is appsettings.json and how is it loaded?",
        a: "appsettings.json is the default configuration file. It's loaded automatically by the host. appsettings.{Environment}.json overrides it (e.g. appsettings.Development.json), and environment variables and command-line args override that. The IConfiguration service exposes the merged result."
      },
      {
        q: "What replaced Web.config in ASP.NET Core?",
        a: "appsettings.json replaced Web.config for application config. Hosting / launch settings live in launchSettings.json (development only). For IIS hosting, a small web.config is still generated to bridge IIS → Kestrel — but you don't write it manually."
      },
      {
        q: "What is launchSettings.json?",
        a: "launchSettings.json (under Properties/) defines local development profiles — environment variables, ports, browser launch URL. It is not deployed to production; it only affects 'dotnet run' and IDE Run/Debug. Things like ASPNETCORE_ENVIRONMENT=Development sit here."
      },
      {
        q: "What is the difference between Startup.cs and the new minimal hosting?",
        a: "Pre-.NET 6, Startup.cs had ConfigureServices and Configure methods to register DI and middleware. From .NET 6+, this all moves into Program.cs using top-level statements — fewer files, less ceremony. The same building blocks (services, middleware) are still there, just in one file."
      }
    ],
    followUpQuestions: [
      { q: "Entry point file?", a: "Program.cs." },
      { q: "Main config file?", a: "appsettings.json." },
      { q: "Local-only settings file?", a: "launchSettings.json." },
      { q: "Where to register services?", a: "builder.Services in Program.cs." },
      { q: "Where to add middleware?", a: "After builder.Build() — app.Use***." },
      { q: "Folder for endpoints?", a: "Controllers/." },
      { q: "Replaces Web.config?", a: "appsettings.json (mostly)." }
    ],
    commonMistakes: [
      "Putting secrets (API keys, DB passwords) directly into appsettings.json — should use User Secrets in dev and Azure Key Vault / env vars in prod.",
      "Adding middleware after app.Run() — won't take effect; pipeline is already built.",
      "Order of UseAuthentication / UseAuthorization wrong — must be UseAuthentication BEFORE UseAuthorization.",
      "Mixing minimal API endpoints and Controllers without realising — both work but pick one style per project for clarity."
    ],
    proTip: "Senior interview line: 'I keep Program.cs lean — only DI registration and middleware order. All configuration lives in appsettings.{Env}.json with secrets in User Secrets / Key Vault. Business logic lives in Services, never in Controllers — controllers are just thin HTTP adapters.'"
  },

  // ============================================================
  // 4. Middleware
  // ============================================================
  {
    id: 'middleware',
    title: '4. Middleware',
    whatIsThis: [
      "Middleware is software that sits in the HTTP request/response pipeline. Each middleware can inspect the incoming request, do its job (auth, logging, compression), pass it to the next middleware, then inspect the response on the way back.",
      "Simple meaning is — middleware is like a security check at the airport. Every request passes through one gate after another (auth → logging → routing → controller), and each gate can stop or modify the request before letting it continue."
    ],
    whyUseIt: [
      "Middleware lets us cleanly add cross-cutting concerns (logging, exception handling, authentication, CORS, rate limiting) without polluting controllers. Each middleware does one job, in one place, for every request.",
      "The order of middleware decides behaviour — for example, UseAuthentication must come before UseAuthorization. ASP.NET Core's pipeline is built up step by step in Program.cs, very explicit and easy to reason about."
    ],
    realLifeExample: [
      "On Amazon, when you tap 'Buy Now', the request goes through many checks before reaching the order code: SSL termination, rate limiting, JWT auth, role check, request logging, compression. Each check is one middleware.",
      "If JWT auth fails, the pipeline stops right there — no other middleware or controller runs. That short-circuit ability is what makes middleware so powerful."
    ],
    howItWorks: [
      "Pipeline is built in Program.cs using app.Use***() calls — order matters.",
      "When a request comes in, it flows through middleware top to bottom.",
      "Each middleware can do work, then call await next() to pass control to the next.",
      "After the inner middleware completes, control returns back up the stack — so middleware can also modify the response on the way out.",
      "Any middleware can short-circuit — not call next() — which stops the pipeline (used by auth failure, caching hit etc)."
    ],
    codeExample: `var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// 1) Custom inline middleware — runs for every request
app.Use(async (ctx, next) =>
{
    Console.WriteLine($"[IN ] {ctx.Request.Method} {ctx.Request.Path}");
    await next();                                  // pass to next middleware
    Console.WriteLine($"[OUT] {ctx.Response.StatusCode}");
});

// 2) Built-in middleware — order matters
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

// 3) Endpoint
app.MapGet("/order/{id:int}", (int id) => $"Order #{id}");

app.Run();`,
    codeOutput: `Request:  GET /order/42
Console:
  [IN ] GET /order/42
  [OUT] 200

Response body:
  Order #42`,
    interviewQuestions: [
      {
        q: "What is middleware in ASP.NET Core?",
        a: "Middleware is a piece of code that sits in the HTTP request/response pipeline. Each middleware processes the request, optionally calls the next middleware, and can also process the response on the way back. Common middleware: authentication, authorization, routing, exception handling, CORS, logging."
      },
      {
        q: "Why does middleware order matter?",
        a: "Because each middleware sees the request only after the ones before it. UseAuthentication must come before UseAuthorization — otherwise authorize doesn't know who the user is. UseExceptionHandler should be at the very top so it catches errors from all the others. Wrong order = silent bugs."
      },
      {
        q: "Difference between Use, Run and Map?",
        a: "Use adds middleware that can call next() and continue the pipeline. Run is terminal — it ends the pipeline (no next call). Map branches the pipeline based on the URL path — useful for hosting two pipelines on different paths (e.g. /admin vs /api)."
      },
      {
        q: "How do you create a custom middleware?",
        a: "Either inline using app.Use(async (ctx, next) => { ... await next(); ... }), or as a class with InvokeAsync(HttpContext) method registered via app.UseMiddleware<MyMiddleware>(). Class-based is cleaner for anything beyond a few lines and supports DI."
      },
      {
        q: "What is short-circuiting in middleware?",
        a: "When a middleware does NOT call next(), it stops the pipeline — no further middleware or endpoint runs. Authentication middleware short-circuits with 401 when token is missing. Caching middleware short-circuits with the cached response. This is how middleware controls the request flow."
      }
    ],
    followUpQuestions: [
      { q: "Where is pipeline built?", a: "Program.cs (after builder.Build())." },
      { q: "Use vs Run?", a: "Use can pass on, Run is terminal." },
      { q: "What does Map do?", a: "Branches pipeline based on path." },
      { q: "Order of Auth middleware?", a: "Authentication BEFORE Authorization." },
      { q: "How to short-circuit?", a: "Don't call next()." },
      { q: "Custom middleware with DI?", a: "Class with InvokeAsync method." }
    ],
    commonMistakes: [
      "Putting UseAuthorization before UseAuthentication — authorization runs without identity, blocks every request.",
      "Forgetting to call next() in custom middleware — silently stops every request.",
      "Adding middleware after MapControllers / MapGet — won't run, pipeline already terminated.",
      "Using Run when Use was meant — pipeline terminates and downstream middleware never runs."
    ],
    proTip: "Drop in interview: 'I treat the middleware order in Program.cs like a checklist — Exception → HTTPS → CORS → Authentication → Authorization → Routing → Endpoints. One wrong order has bitten me in production before, where Authorization ran before Authentication and the user was always anonymous.'"
  },

  // ============================================================
  // 5. Dependency Injection
  // ============================================================
  {
    id: 'dependency-injection',
    title: '5. Dependency Injection (DI)',
    whatIsThis: [
      "Dependency Injection is a design pattern where a class does not create its dependencies — they are 'injected' from outside (via constructor mostly). ASP.NET Core has DI built in — you register services in Program.cs and the framework gives them to whoever asks via constructor.",
      "Simple meaning is — your class says 'I need an IOrderService' in the constructor. The framework reads its DI container, finds the registered implementation, and hands it over. You never write 'new OrderService()' yourself."
    ],
    whyUseIt: [
      "DI is the foundation of testable, loosely coupled code. Today OrderService talks to SQL; tomorrow you switch to MongoDB. With DI you change one line in Program.cs — every controller using IOrderService picks up the new implementation. Without DI you'd hunt and replace 'new ...' everywhere.",
      "It also makes unit testing painless — in tests, inject a mock IOrderService, assert behaviour. ASP.NET Core, EF Core, Logging, HttpClientFactory — everything is built around the DI container."
    ],
    realLifeExample: [
      "Think of DI like a coffee machine in office. You walk up and say 'I need coffee'. You don't grow beans, roast them, grind them yourself. The machine (DI container) gives you a ready cup.",
      "Tomorrow the coffee brand changes. The interface (cup of coffee) is same; the implementation (Nescafe → Lavazza) is swapped at the machine level. Every employee gets the new coffee without changing how they ask for it."
    ],
    howItWorks: [
      "In Program.cs, register: builder.Services.AddScoped<IOrderService, OrderService>().",
      "Controller declares constructor parameter: public OrderController(IOrderService svc).",
      "When a request hits the controller, framework asks the DI container for an IOrderService.",
      "Container creates / fetches an OrderService instance respecting the lifetime (Singleton / Scoped / Transient) and injects it into the constructor.",
      "Inside the controller, _svc is ready to use — no 'new OrderService()' anywhere."
    ],
    codeExample: `// 1) Define abstraction
public interface IOrderService
{
    string Place(string item);
}

// 2) Implementation
public class OrderService : IOrderService
{
    public string Place(string item) => $"Order placed: {item}";
}

// 3) Register in DI (Program.cs)
builder.Services.AddScoped<IOrderService, OrderService>();

// 4) Inject into controller
[ApiController, Route("api/[controller]")]
public class OrderController : ControllerBase
{
    private readonly IOrderService _svc;
    public OrderController(IOrderService svc) => _svc = svc;

    [HttpPost("{item}")]
    public IActionResult Place(string item) => Ok(_svc.Place(item));
}`,
    codeOutput: `POST /api/order/Pizza
Status: 200 OK
Body  : "Order placed: Pizza"

Behind the scenes:
  → Container resolves IOrderService
  → New OrderService created (Scoped — once per request)
  → Injected into OrderController constructor`,
    interviewQuestions: [
      {
        q: "What is Dependency Injection and why is it useful?",
        a: "DI is a pattern where a class receives its dependencies from outside instead of creating them. It results in loose coupling, easier testing (inject mocks), and easier swapping of implementations. ASP.NET Core has it built in via the IServiceCollection / IServiceProvider container."
      },
      {
        q: "What are the three service lifetimes in ASP.NET Core?",
        a: "Singleton — one instance for the whole app, shared across all requests. Scoped — one instance per HTTP request, shared within that request. Transient — a new instance every time it's asked for. Choose Singleton for stateless utilities, Scoped for per-request services like DbContext, Transient for lightweight throwaway objects."
      },
      {
        q: "What is the difference between Scoped and Singleton?",
        a: "Singleton lives for the entire app lifetime — same instance everywhere, must be thread-safe. Scoped lives for one HTTP request — fresh instance per request, no thread-safety required across requests. DbContext should be Scoped because it isn't thread-safe; a logger or config service can be Singleton."
      },
      {
        q: "What is constructor injection?",
        a: "It's the standard DI style in ASP.NET Core — dependencies are declared as parameters in the constructor, and the framework supplies them. You assign them to readonly fields. This makes the dependencies explicit and the class easy to test."
      },
      {
        q: "Can you inject a Scoped service into a Singleton?",
        a: "No, not directly — it would 'capture' the scoped service and outlive the request. The framework throws or warns about this 'captive dependency' anti-pattern. Solution: inject IServiceScopeFactory or IServiceProvider into the singleton and create a scope when you need the scoped service."
      }
    ],
    followUpQuestions: [
      { q: "Three lifetimes?", a: "Singleton, Scoped, Transient." },
      { q: "Per-request lifetime?", a: "Scoped." },
      { q: "Per app lifetime?", a: "Singleton." },
      { q: "New each time?", a: "Transient." },
      { q: "Where to register services?", a: "builder.Services in Program.cs." },
      { q: "Captive dependency means?", a: "Scoped/Transient captured by Singleton — anti-pattern." },
      { q: "DbContext lifetime?", a: "Scoped." }
    ],
    commonMistakes: [
      "Registering DbContext as Singleton — causes thread-safety bugs, EF expects per-request.",
      "Injecting concrete classes everywhere — defeats the purpose of DI; inject interfaces or abstractions.",
      "Captive dependency — Singleton holding a Scoped service. Compiler warns; fix using IServiceScopeFactory.",
      "Creating service inside controller via 'new ...' — bypasses DI, breaks testing and configuration."
    ],
    proTip: "Senior interview line: 'I default to Scoped for anything tied to a request (services, DbContext), Singleton for stateless utilities (config wrappers, caches), and Transient only for very lightweight throwaway objects. Singleton holding Scoped is a captive dependency I always check for in code reviews.'"
  },

  // ============================================================
  // 6. Configuration (appsettings.json + IConfiguration + Options)
  // ============================================================
  {
    id: 'configuration',
    title: '6. Configuration (appsettings + IConfiguration + Options)',
    whatIsThis: [
      "Configuration in ASP.NET Core is a layered, key-value system. By default it reads from appsettings.json, then appsettings.{Env}.json, then environment variables, then command-line args — each layer overriding the previous. You access it via IConfiguration or, more cleanly, via the IOptions<T> pattern.",
      "Simple meaning is — same setting (like DB connection string) can be defined in multiple sources, and the most specific one wins. Developers don't hard-code anything; the host picks the right value at runtime."
    ],
    whyUseIt: [
      "It cleanly separates 'what the app does' (code) from 'how it's configured' (settings). Same DLL deploys to dev, staging, prod — only the config changes. Connection strings, API keys, feature flags, log levels all live outside the code.",
      "The Options pattern (IOptions<T>) takes it further — you bind a config section to a strongly typed class and inject it. No magic strings, no manual parsing, full IntelliSense."
    ],
    realLifeExample: [
      "On IRCTC, the same booking API runs in dev (test DB, test payment gateway), staging (real-like DB, sandbox gateway), and prod (live DB, real gateway). Code is identical. Only appsettings.{Env}.json changes per environment.",
      "The release pipeline copies the right appsettings or sets env vars at deploy time — the app picks them up automatically without recompiling anything."
    ],
    howItWorks: [
      "Host loads appsettings.json first, then appsettings.{ASPNETCORE_ENVIRONMENT}.json (e.g. Development).",
      "Environment variables override JSON values (use __ as separator for nested keys).",
      "Command-line args (--Jwt:Issuer=...) override env vars.",
      "Result is exposed as IConfiguration — flat key-value lookup with sections like 'ConnectionStrings:Default'.",
      "For typed access, define a class, call builder.Services.Configure<JwtOptions>(builder.Configuration.GetSection(\"Jwt\")), and inject IOptions<JwtOptions>."
    ],
    codeExample: `// appsettings.json
// {
//   "ConnectionStrings": { "Default": "Server=.;Database=AppDb;" },
//   "Jwt": { "Issuer": "myapp", "ExpiryMinutes": 60 }
// }

// 1) Strongly-typed options class
public class JwtOptions
{
    public string Issuer { get; set; } = "";
    public int ExpiryMinutes { get; set; }
}

// 2) Bind in Program.cs
builder.Services.Configure<JwtOptions>(builder.Configuration.GetSection("Jwt"));

// 3) Inject anywhere via IOptions<T>
public class TokenService
{
    private readonly JwtOptions _opt;
    public TokenService(IOptions<JwtOptions> opt) => _opt = opt.Value;

    public string Info() =>
        $"Issuer={_opt.Issuer}, ExpiresIn={_opt.ExpiryMinutes}m";
}

// 4) Or read raw via IConfiguration
public class DbHealth
{
    private readonly string _cs;
    public DbHealth(IConfiguration cfg) =>
        _cs = cfg.GetConnectionString("Default")!;
}`,
    codeOutput: `tokenService.Info()
→ "Issuer=myapp, ExpiresIn=60m"

dbHealth._cs
→ "Server=.;Database=AppDb;"`,
    interviewQuestions: [
      {
        q: "What is the configuration source order in ASP.NET Core?",
        a: "Default order (later overrides earlier): appsettings.json → appsettings.{Environment}.json → User Secrets (in dev) → Environment variables → Command-line arguments. So a value set via env var beats appsettings.json — useful for production secrets."
      },
      {
        q: "How do you read a config value in ASP.NET Core?",
        a: "Inject IConfiguration and use _config[\"Jwt:Issuer\"] or _config.GetSection(\"Jwt\").Get<JwtOptions>(). Cleaner approach: use the Options pattern — define a typed class, bind it via Services.Configure<T>(...), and inject IOptions<T>."
      },
      {
        q: "What is the Options pattern (IOptions<T>)?",
        a: "It binds a configuration section to a strongly typed class so you can inject IOptions<T> into your services and get type-safe access. Three flavours: IOptions<T> (singleton, never reloads), IOptionsSnapshot<T> (per request, reloads), IOptionsMonitor<T> (singleton with change notifications)."
      },
      {
        q: "Where should secrets like passwords and API keys live?",
        a: "Never in appsettings.json (which is committed). In dev — User Secrets (dotnet user-secrets). In production — environment variables, Azure Key Vault, AWS Secrets Manager, or other secret stores. The configuration system reads them transparently via providers."
      },
      {
        q: "What is the difference between IOptions, IOptionsSnapshot and IOptionsMonitor?",
        a: "IOptions<T> — Singleton, value cached at startup, doesn't reload. IOptionsSnapshot<T> — Scoped, fresh value per request, picks up appsettings reloads. IOptionsMonitor<T> — Singleton with .OnChange callback, used in long-lived components like background services."
      }
    ],
    followUpQuestions: [
      { q: "Default config file?", a: "appsettings.json." },
      { q: "Env-specific override?", a: "appsettings.{Env}.json." },
      { q: "Highest priority source?", a: "Command-line args." },
      { q: "Where to keep dev secrets?", a: "User Secrets (dotnet user-secrets)." },
      { q: "Strongly typed config?", a: "Options pattern + IOptions<T>." },
      { q: "Reloadable per request?", a: "IOptionsSnapshot<T>." },
      { q: "How to read connection string?", a: "Configuration.GetConnectionString(\"Default\")." }
    ],
    commonMistakes: [
      "Storing real secrets in appsettings.json and committing them to git.",
      "Using IOptions<T> in long-running background services — won't see config changes; should use IOptionsMonitor.",
      "Reading config repeatedly via _config[\"...\"] — use Options pattern for type safety.",
      "Mixing camelCase and PascalCase in JSON keys — config binding is case-insensitive but inconsistency confuses readers."
    ],
    proTip: "Senior interview line: 'I never put secrets in appsettings — User Secrets in dev, Key Vault / env vars in prod. For typed config I use IOptionsSnapshot<T> in services and IOptionsMonitor<T> in singletons / hosted services so config changes are picked up without restart.'"
  },

  // ============================================================
  // 7. Logging
  // ============================================================
  {
    id: 'logging',
    title: '7. Logging',
    whatIsThis: [
      "ASP.NET Core has built-in logging via the ILogger<T> interface. You inject it into any class and call _logger.LogInformation / LogWarning / LogError. The framework writes to multiple sinks (Console, Debug, EventLog, and any external provider like Serilog, NLog, Seq, Application Insights).",
      "Simple meaning is — logging is the program's diary. Every important event (request, error, decision) gets written so we can later debug what happened in production."
    ],
    whyUseIt: [
      "In production, you can't attach a debugger. Logs are how you find out why an order failed at 3 AM. Good logs save hours; bad / missing logs cost days.",
      "Built-in logging is structured, filterable by category and level, and pluggable. You can pipe everything to Application Insights / ELK / Seq with two lines of config."
    ],
    realLifeExample: [
      "Imagine a Swiggy order that failed yesterday. The customer complains. Without logs you have no clue. With logs you search by orderId and see — payment gateway timed out at 22:14, retry failed at 22:14:05, refund initiated at 22:14:10.",
      "That entire trace is one log query away — only if the developer added the right log lines at the right severity level."
    ],
    howItWorks: [
      "Inject ILogger<MyClass> in the constructor — framework provides it from DI.",
      "Call appropriate level — Trace, Debug, Information, Warning, Error, Critical. Higher level = more important, less frequent.",
      "Log providers (Console, Debug, EventLog, Serilog, etc.) are registered in Program.cs and decide where the message goes.",
      "Log levels can be filtered per category in appsettings.json (e.g. only Warning+ for Microsoft.*).",
      "Use structured logging — pass values as named placeholders ({OrderId}) instead of string interpolation, so log systems can index them."
    ],
    codeExample: `public class OrderController : ControllerBase
{
    private readonly ILogger<OrderController> _logger;
    public OrderController(ILogger<OrderController> logger) => _logger = logger;

    [HttpPost("{id}")]
    public IActionResult Place(int id)
    {
        _logger.LogInformation("Placing order {OrderId}", id);

        try
        {
            if (id <= 0) throw new ArgumentException("Bad id");
            return Ok($"Order {id} placed");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to place order {OrderId}", id);
            return StatusCode(500);
        }
    }
}

// appsettings.json
// "Logging": {
//   "LogLevel": {
//     "Default": "Information",
//     "Microsoft.AspNetCore": "Warning"
//   }
// }`,
    codeOutput: `POST /api/order/0

info: OrderController[0]
      Placing order 0
fail: OrderController[0]
      Failed to place order 0
      System.ArgumentException: Bad id
         at OrderController.Place(Int32 id)`,
    interviewQuestions: [
      {
        q: "How does logging work in ASP.NET Core?",
        a: "Logging is built into the DI container. You inject ILogger<T> (T is your class). Call methods like LogInformation, LogWarning, LogError. The message goes to all registered providers (Console, Debug, Serilog, etc.). Filtering by category and level is configured in appsettings.json."
      },
      {
        q: "What are the log levels in ASP.NET Core?",
        a: "Trace (most verbose), Debug, Information, Warning, Error, Critical (most severe), and None. Default in production is Information. Trace and Debug are usually off in prod due to noise. Critical is for unrecoverable errors that need immediate attention."
      },
      {
        q: "What is structured logging and why is it important?",
        a: "Structured logging means logging with named placeholders, like LogInformation(\"User {UserId} placed order {OrderId}\", userId, orderId). The values are stored as separate fields (not concatenated into a string), so log systems like Seq / ELK / App Insights can search and filter on them — orderId=42 returns every related log."
      },
      {
        q: "How do you replace the default logger with Serilog?",
        a: "Install Serilog.AspNetCore, then in Program.cs call builder.Host.UseSerilog((ctx, lc) => lc.ReadFrom.Configuration(ctx.Configuration).WriteTo.Console().WriteTo.Seq(...)). All your existing ILogger<T> calls now go through Serilog — no code change needed in the rest of the app."
      },
      {
        q: "How do you control log levels per namespace?",
        a: "Inside appsettings.json under Logging:LogLevel, you set the minimum level per category. Default sets the global minimum; specific keys like 'Microsoft.AspNetCore' or 'EFCore' override it. This is how you suppress framework chatter while keeping your own app logs verbose."
      }
    ],
    followUpQuestions: [
      { q: "How to inject logger?", a: "Constructor: ILogger<MyClass> logger." },
      { q: "Highest log level?", a: "Critical." },
      { q: "Lowest log level?", a: "Trace." },
      { q: "Production default level?", a: "Information." },
      { q: "Structured logging looks like?", a: "{OrderId} as placeholder." },
      { q: "Popular external sink?", a: "Serilog → Seq / Console / ELK." },
      { q: "Where to set log level per namespace?", a: "appsettings.json under Logging:LogLevel." }
    ],
    commonMistakes: [
      "Using string interpolation: $\"{orderId}\" inside log calls — kills structured logging; use named placeholders.",
      "Logging at Trace / Debug in production — log volume explodes, costs go up.",
      "Logging sensitive data (passwords, card numbers) — security violation; mask or skip them.",
      "Catching exceptions and logging only ex.Message — missing the stack trace; pass the whole exception object as first arg."
    ],
    proTip: "Senior line: 'Logs are non-negotiable in production. I always log structured (named placeholders), include a correlation ID per request, and pipe everything to Seq / App Insights. The day I have to debug a 3 AM incident, my logs are the only thing standing between me and the user.'"
  },

  // ============================================================
  // 8. REST API Principles
  // ============================================================
  {
    id: 'rest-api-principles',
    title: '8. REST API Principles',
    whatIsThis: [
      "REST (Representational State Transfer) is a style for designing web APIs. It uses standard HTTP verbs (GET, POST, PUT, PATCH, DELETE), resource-based URLs (/orders/42), proper status codes (200, 201, 404, 500), and is stateless — each request carries everything it needs.",
      "Simple meaning is — REST is a clean, predictable contract. URL = resource, verb = action, response status = result. Anyone reading your URL can guess what it does without docs."
    ],
    whyUseIt: [
      "REST is universally understood. Frontend devs, mobile devs, partner integrations — everyone speaks HTTP. Following REST conventions means new consumers don't need a 50-page manual to use your API.",
      "Statelessness makes REST easy to scale — any server can handle any request, so you can put a load balancer in front and add nodes freely. This is why REST is the default style for modern web APIs."
    ],
    realLifeExample: [
      "On Amazon: GET /products/123 fetches product 123. POST /orders creates an order. PUT /orders/45 updates order 45. DELETE /cart/items/9 removes a cart item. Anyone reading the URL knows what's happening — that's REST clarity.",
      "Compare to /doStuff?action=updateOrder&id=45 — works but no convention, hard to document, hard to cache, hard to rate-limit by URL pattern."
    ],
    howItWorks: [
      "Resource = noun in URL — /orders, /products, /users. No verbs in the URL.",
      "Action = HTTP verb — GET (read), POST (create), PUT (full update), PATCH (partial update), DELETE (remove).",
      "Response = HTTP status code — 200 OK, 201 Created, 204 No Content, 400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Server Error.",
      "Stateless — no server-side session for the request; the client sends the auth token / context with every call.",
      "Body uses JSON (mostly), Content-Type / Accept headers tell the format."
    ],
    codeExample: `[ApiController]
[Route("api/[controller]")]   // → /api/orders
public class OrdersController : ControllerBase
{
    [HttpGet]                                  // GET /api/orders
    public IActionResult GetAll() => Ok(new[] { 1, 2, 3 });

    [HttpGet("{id:int}")]                      // GET /api/orders/42
    public IActionResult Get(int id) =>
        id > 0 ? Ok(new { id, item = "Pizza" }) : NotFound();

    [HttpPost]                                 // POST /api/orders
    public IActionResult Create([FromBody] Order o) =>
        CreatedAtAction(nameof(Get), new { id = 99 }, o);

    [HttpPut("{id:int}")]                      // PUT /api/orders/42
    public IActionResult Update(int id, [FromBody] Order o) => NoContent();

    [HttpDelete("{id:int}")]                   // DELETE /api/orders/42
    public IActionResult Remove(int id) => NoContent();
}

public record Order(string Item, int Qty);`,
    codeOutput: `GET    /api/orders         → 200 [1,2,3]
GET    /api/orders/42      → 200 { "id":42, "item":"Pizza" }
GET    /api/orders/0       → 404
POST   /api/orders         → 201 + Location: /api/orders/99
PUT    /api/orders/42      → 204
DELETE /api/orders/42      → 204`,
    interviewQuestions: [
      {
        q: "What is REST?",
        a: "REST (Representational State Transfer) is an architectural style for web APIs. Key principles: resource-based URLs (nouns), standard HTTP verbs (GET/POST/PUT/PATCH/DELETE), proper status codes, stateless requests, JSON / XML representations. The goal is a uniform, predictable, scalable interface."
      },
      {
        q: "What is the difference between PUT and PATCH?",
        a: "PUT replaces the entire resource — you send the full updated object. PATCH applies a partial update — you send only the changed fields. PUT is idempotent (same call, same result). PATCH is also typically idempotent but depends on the patch document type (like JSON Patch RFC 6902)."
      },
      {
        q: "What status code should POST return?",
        a: "POST that creates a new resource should return 201 Created with a Location header pointing to the new URL. If creation fails validation, 400 Bad Request. If duplicate, 409 Conflict. If purely an action (login, sendEmail) without creating a resource, 200 OK or 202 Accepted is fine."
      },
      {
        q: "What does it mean that REST is stateless?",
        a: "The server keeps no session for the client. Every request must carry all the context it needs — auth token, identifiers, payload. This makes REST easy to scale horizontally (any server handles any request) and easy to cache and load balance. Sessions, if needed, live in Redis / DB, not in app memory."
      },
      {
        q: "What is idempotency in REST?",
        a: "An idempotent operation produces the same result whether you call it once or multiple times. GET, PUT, DELETE are idempotent. POST is not. This matters for retries — clients can safely retry idempotent calls on network error. Use idempotency keys for POSTs that must not double-create (like payments)."
      }
    ],
    followUpQuestions: [
      { q: "POST is for?", a: "Create." },
      { q: "PUT is for?", a: "Full update." },
      { q: "PATCH is for?", a: "Partial update." },
      { q: "DELETE returns?", a: "204 No Content typically." },
      { q: "Created resource code?", a: "201 Created." },
      { q: "Bad input code?", a: "400 Bad Request." },
      { q: "Unauthorized code?", a: "401." },
      { q: "Forbidden code?", a: "403." },
      { q: "Not found code?", a: "404." },
      { q: "Server error code?", a: "500." }
    ],
    commonMistakes: [
      "Putting verbs in URLs — /createOrder instead of POST /orders.",
      "Returning 200 with an error message in the body — losing the value of HTTP status codes.",
      "Using GET for actions that change state — breaks caching and triggers from crawlers can mutate data.",
      "Mixing query params and route params arbitrarily — agree on a convention per project."
    ],
    proTip: "Senior interview line: 'I follow REST strictly — nouns in URL, verbs as HTTP methods, real status codes (201 with Location, 404 for missing, 422 for validation). For non-CRUD actions like /orders/42/cancel I use POST and document it as an action — REST isn't a religion, but consistency is.'"
  },

  // ============================================================
  // 9. Controllers & Routing
  // ============================================================
  {
    id: 'controllers-routing',
    title: '9. Controllers & Routing',
    whatIsThis: [
      "A Controller is a C# class that groups related API endpoints. Each public method (action) inside the controller maps to a URL + HTTP verb via attributes like [HttpGet], [HttpPost], [Route]. ASP.NET Core's routing engine reads these attributes and dispatches incoming requests to the matching action.",
      "Simple meaning is — controller is a folder of related endpoints. Routing is the GPS that takes 'GET /api/orders/42' and points to OrdersController.Get(42)."
    ],
    whyUseIt: [
      "Controllers keep related endpoints grouped logically — all order endpoints in OrderController, product endpoints in ProductController. Easy to read, easy to find, easy to test.",
      "Attribute routing lets us define clean URLs right next to the action — no separate routing config file. Route templates support tokens, constraints, and parameters, giving us full REST control."
    ],
    realLifeExample: [
      "On Amazon backend: OrdersController has GET /api/orders, GET /api/orders/{id}, POST /api/orders, PUT /api/orders/{id}, DELETE /api/orders/{id}. All in one class — easy to maintain.",
      "Routing also enforces constraints: /orders/{id:int} only matches integer ids. Hit /orders/abc and the framework returns 404 before your code even runs — saving you from manual parsing and validation."
    ],
    howItWorks: [
      "Controller class inherits from ControllerBase (API) or Controller (MVC views). Add [ApiController] attribute for API conventions.",
      "[Route(\"api/[controller]\")] at class level — [controller] token replaced by class name without 'Controller' suffix.",
      "Each action gets [HttpGet], [HttpPost], etc. Optionally with a sub-template like [HttpGet(\"{id:int}\")].",
      "Route constraints (:int, :guid, :alpha, :length) restrict matching — non-matching requests get 404 automatically.",
      "MapControllers() in Program.cs registers the whole controller pipeline with the routing system."
    ],
    codeExample: `[ApiController]
[Route("api/[controller]")]                 // → /api/products
public class ProductsController : ControllerBase
{
    [HttpGet]                                // GET /api/products
    public IActionResult List()
        => Ok(new[] { "Pizza", "Burger" });

    [HttpGet("{id:int}")]                    // GET /api/products/5
    public IActionResult Get(int id)
        => Ok(new { id, name = "Pizza" });

    [HttpGet("search")]                      // GET /api/products/search?q=pi
    public IActionResult Search([FromQuery] string q)
        => Ok($"Searching for {q}");

    [HttpPost]                               // POST /api/products
    public IActionResult Create([FromBody] string name)
        => CreatedAtAction(nameof(Get), new { id = 99 }, name);
}`,
    codeOutput: `GET  /api/products              → 200 ["Pizza","Burger"]
GET  /api/products/5            → 200 {"id":5,"name":"Pizza"}
GET  /api/products/search?q=pi  → 200 "Searching for pi"
GET  /api/products/abc          → 404 (constraint :int failed)
POST /api/products              → 201 + Location: /api/products/99`,
    interviewQuestions: [
      {
        q: "What is the difference between Controller and ControllerBase?",
        a: "ControllerBase is a lighter base class — no view support, used for Web APIs. Controller inherits from ControllerBase and adds View() helpers, used for MVC apps that return HTML. For pure JSON APIs, always use ControllerBase."
      },
      {
        q: "What does the [ApiController] attribute do?",
        a: "It enables API-specific conventions: automatic 400 response for invalid models, [FromBody] inferred for complex types, [FromQuery] for primitives, and ProblemDetails error format. Saves a lot of boilerplate. Always add it on Web API controllers."
      },
      {
        q: "What is attribute routing vs conventional routing?",
        a: "Attribute routing puts the URL template directly on the action: [HttpGet(\"products/{id}\")]. Conventional routing maps URLs via patterns in Program.cs (MapControllerRoute). For Web APIs, attribute routing is the standard — explicit, local, easy to read."
      },
      {
        q: "What are route constraints?",
        a: "Constraints restrict what values a route parameter accepts — like {id:int} (integer only), {code:length(6)}, {date:datetime}, {token:guid}. The framework rejects non-matching requests with 404 automatically, before the action runs. Reduces validation code in actions."
      },
      {
        q: "What is the difference between [FromBody], [FromQuery], [FromRoute]?",
        a: "They tell ASP.NET Core where to bind the parameter from. [FromBody] reads the request body (JSON). [FromQuery] reads from ?key=value. [FromRoute] reads from the URL template like /api/orders/{id}. With [ApiController], complex types default to [FromBody] and simple types to [FromQuery] — you mostly don't need to specify."
      }
    ],
    followUpQuestions: [
      { q: "Web API base class?", a: "ControllerBase." },
      { q: "MVC view base class?", a: "Controller." },
      { q: "API conventions attribute?", a: "[ApiController]." },
      { q: "Where to put route?", a: "Class & action attributes." },
      { q: "Match int only?", a: "{id:int} constraint." },
      { q: "Body bind attribute?", a: "[FromBody]." },
      { q: "Query bind attribute?", a: "[FromQuery]." },
      { q: "Register controllers?", a: "AddControllers + MapControllers." }
    ],
    commonMistakes: [
      "Forgetting [ApiController] — losing automatic 400 on invalid models and other API conveniences.",
      "Verb mismatch — using [HttpGet] for an action that mutates data, breaking REST and caching.",
      "Conflicting routes (two actions with same template) — gives ambiguous match exception.",
      "Inheriting from Controller in pure JSON API — drags in MVC view machinery you don't need."
    ],
    proTip: "Drop in interview: 'I always inherit from ControllerBase for APIs and decorate the class with [ApiController]. Routes go on attributes right next to the action — no centralized route table. With route constraints like {id:int} the framework rejects garbage URLs with 404 before my code runs, saving validation noise inside actions.'"
  },

  // ============================================================
  // 10. Model Binding
  // ============================================================
  {
    id: 'model-binding',
    title: '10. Model Binding',
    whatIsThis: [
      "Model binding is how ASP.NET Core converts incoming HTTP request data (route values, query string, headers, JSON body, form fields) into the parameters of your action method. You don't parse strings or read streams — the framework does it for you.",
      "Simple meaning is — write your action with strongly-typed parameters (int id, OrderDto dto), and the framework fills them automatically from the request. Magic but not magic — driven by attributes and conventions."
    ],
    whyUseIt: [
      "Without model binding you'd have to read Request.Query / Request.Body manually and convert types yourself for every action. Model binding wipes out that boilerplate — your action just takes parameters and starts the actual work.",
      "It also runs validation right there — combined with DataAnnotations / FluentValidation, invalid input results in an automatic 400 response (with [ApiController]). Less code, fewer bugs, consistent behaviour."
    ],
    realLifeExample: [
      "When you send POST /api/orders with JSON body { item: 'Pizza', qty: 2 }, ASP.NET Core deserializes it into your OrderDto class and passes it to your action.",
      "Same with GET /api/orders/42?expand=items — the framework binds id=42 from the route, expand='items' from the query string, both into your method parameters. Zero parsing in your code."
    ],
    howItWorks: [
      "Framework looks at each action parameter and decides the source — route, query, body, header, form.",
      "With [ApiController], simple types (int, string) default to query / route, complex types default to body.",
      "JSON body is deserialized using System.Text.Json (default) into the parameter type.",
      "Validation attributes ([Required], [Range], [EmailAddress]) on the model are evaluated; if invalid, ModelState.IsValid is false.",
      "With [ApiController], invalid ModelState automatically returns 400 with a ProblemDetails JSON listing the errors."
    ],
    codeExample: `public class OrderDto
{
    [Required, MinLength(2)]
    public string Item { get; set; } = "";

    [Range(1, 100)]
    public int Qty { get; set; }
}

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    // Mixed binding — id from route, expand from query, body from JSON
    [HttpPost("{id:int}")]
    public IActionResult Save(
        int id,                           // [FromRoute]
        [FromQuery] string? expand,        // ?expand=items
        [FromBody]  OrderDto dto)          // JSON body
    {
        return Ok(new { id, expand, dto.Item, dto.Qty });
    }
}`,
    codeOutput: `POST /api/orders/42?expand=items
Body: { "item":"Pizza", "qty":2 }
→ 200 { "id":42, "expand":"items", "item":"Pizza", "qty":2 }

POST /api/orders/42
Body: { "item":"P", "qty":0 }
→ 400 ProblemDetails:
  {
    "errors": {
      "Item": ["minimum length 2"],
      "Qty":  ["must be 1–100"]
    }
  }`,
    interviewQuestions: [
      {
        q: "What is model binding?",
        a: "Model binding is the process by which ASP.NET Core takes raw HTTP request data (URL, query string, body, form, headers) and maps it to action method parameters with the correct types. It removes the need to manually parse Request.Query / Request.Body."
      },
      {
        q: "What sources does model binding read from by default?",
        a: "Route values, query string, JSON request body, form fields, and headers. The default order with [ApiController]: complex types from body (JSON), simple types (int, string, bool) from route or query. You override with attributes like [FromBody], [FromQuery], [FromHeader], [FromForm], [FromServices]."
      },
      {
        q: "How does model binding handle validation?",
        a: "After binding, the framework runs DataAnnotation validation on the model. If invalid, ModelState.IsValid becomes false. With [ApiController] this automatically returns 400 with a ProblemDetails body listing the errors. Without [ApiController] you must check ModelState.IsValid manually in each action."
      },
      {
        q: "What is [FromBody] and when do you need it?",
        a: "[FromBody] tells the binder to deserialize the parameter from the request body (usually JSON). With [ApiController] it's inferred automatically for complex types — you only specify it for clarity or when binding multiple sources to the same action."
      },
      {
        q: "Can you bind to a primitive type from the body?",
        a: "Yes, with [FromBody] string text — the body must be a JSON string like \"hello\". By default complex types come from body and primitives from query / route. For raw text bodies (non-JSON), read Request.Body manually or use [FromBody] with a custom InputFormatter."
      }
    ],
    followUpQuestions: [
      { q: "Default body format?", a: "JSON (System.Text.Json)." },
      { q: "Bind from URL?", a: "[FromRoute]." },
      { q: "Bind from ?query?", a: "[FromQuery]." },
      { q: "Bind from header?", a: "[FromHeader]." },
      { q: "Bind from DI?", a: "[FromServices]." },
      { q: "Auto 400 on bad model?", a: "Yes, with [ApiController]." },
      { q: "Validate fields how?", a: "DataAnnotations or FluentValidation." }
    ],
    commonMistakes: [
      "Forgetting [ApiController] and then wondering why bad models reach the action with stale data.",
      "Putting [FromBody] on a primitive without realising body must be a JSON string ('\"hello\"', not hello).",
      "Two action parameters with [FromBody] — only one is allowed per action (one body per request).",
      "Binding directly to entity types (Entity Framework models) — opens up over-posting attacks; always use DTOs."
    ],
    proTip: "Senior line: 'I never bind directly to EF entities — always to DTOs. It prevents over-posting (where a malicious user injects unexpected fields like IsAdmin=true) and decouples the API contract from the database schema. With [ApiController] + DataAnnotations the framework returns clean 400s for me — zero validation boilerplate inside actions.'"
  },

  // ============================================================
  // 11. Validation
  // ============================================================
  {
    id: 'validation',
    title: '11. Validation',
    whatIsThis: [
      "Validation is the step where we check that the incoming data is sane — required fields present, lengths in range, formats valid (email, phone), business rules satisfied. ASP.NET Core supports DataAnnotations (attribute-based) out of the box and FluentValidation for richer rules.",
      "Simple meaning is — never trust client input. Validation is the gatekeeper that returns 400 to the user if the input is bad, before any business logic or DB call runs."
    ],
    whyUseIt: [
      "Bad input is the #1 source of bugs and security holes. Validation catches it at the boundary, returns a clear error message, and protects the rest of the system.",
      "It also decouples 'request shape' from 'business logic'. Controllers and services trust that the input they receive is already valid, so they can focus on real work."
    ],
    realLifeExample: [
      "On IRCTC, when you book a ticket, the form checks — passenger name not empty, age between 1 and 120, mobile number 10 digits, email valid format. Without these checks, the booking system would crash on bad input or, worse, save garbage data.",
      "Validation runs on both client (instant feedback) and server (security). Server-side is mandatory because anyone can send a custom request bypassing the form."
    ],
    howItWorks: [
      "Decorate model properties with attributes — [Required], [StringLength(50)], [Range(1, 100)], [EmailAddress], [RegularExpression(...)].",
      "When a request comes in, ASP.NET Core binds the body to the model and runs all validation attributes.",
      "Errors collect into ModelState. If any error and [ApiController] is on, framework auto-returns 400 with a ProblemDetails JSON.",
      "For complex / cross-field rules, use FluentValidation — define a rule set in a separate class, register it in DI, framework picks it up automatically.",
      "Custom validation: implement IValidatableObject on the model or write a custom ValidationAttribute."
    ],
    codeExample: `public class CustomerDto
{
    [Required, StringLength(50, MinimumLength = 2)]
    public string Name { get; set; } = "";

    [Required, EmailAddress]
    public string Email { get; set; } = "";

    [Range(18, 120)]
    public int Age { get; set; }

    [RegularExpression(@"^\\d{10}$", ErrorMessage = "Mobile must be 10 digits")]
    public string Mobile { get; set; } = "";
}

[ApiController]
[Route("api/customers")]
public class CustomersController : ControllerBase
{
    [HttpPost]
    public IActionResult Create([FromBody] CustomerDto dto) =>
        Ok($"Customer {dto.Name} added");
}`,
    codeOutput: `POST /api/customers
{ "name":"R", "email":"bad", "age":15, "mobile":"123" }

→ 400 Bad Request
{
  "errors": {
    "Name":   ["minimum length 2"],
    "Email":  ["The Email field is not a valid e-mail address."],
    "Age":    ["must be between 18 and 120"],
    "Mobile": ["Mobile must be 10 digits"]
  }
}`,
    interviewQuestions: [
      {
        q: "What is model validation in ASP.NET Core?",
        a: "Model validation is the framework feature that checks request data against rules defined on the model — required fields, lengths, ranges, formats. With [ApiController] enabled, invalid models automatically return 400 with a ProblemDetails JSON listing every error, before the action runs."
      },
      {
        q: "What are DataAnnotations?",
        a: "DataAnnotations are validation attributes you place on model properties — [Required], [StringLength], [Range], [EmailAddress], [RegularExpression], [Compare], [Url], [Phone]. The framework evaluates them during model binding. Simple, declarative, no extra setup."
      },
      {
        q: "When would you use FluentValidation instead of DataAnnotations?",
        a: "When rules are complex or cross-field — like 'EndDate must be after StartDate', 'if PaymentMode=Card then CardNumber required'. FluentValidation lets you express these clearly in a separate class, supports conditional rules, and keeps the DTO clean. For simple [Required] / [Range] type rules, DataAnnotations are enough."
      },
      {
        q: "What is ProblemDetails?",
        a: "ProblemDetails is the standard JSON format (RFC 7807) for HTTP error responses. ASP.NET Core uses it automatically with [ApiController] — fields like type, title, status, detail, plus a per-field 'errors' dictionary. Consistent error shape across your API, easy for clients to handle."
      },
      {
        q: "How do you write a custom validation attribute?",
        a: "Inherit from ValidationAttribute and override IsValid(object?, ValidationContext). Return ValidationResult.Success or new ValidationResult(\"error message\"). Decorate properties with your attribute. Useful for domain-specific rules like [PinCodeIndia] or [Pan]."
      }
    ],
    followUpQuestions: [
      { q: "Required field attribute?", a: "[Required]." },
      { q: "Length range attribute?", a: "[StringLength(max, MinimumLength = min)]." },
      { q: "Numeric range?", a: "[Range(min, max)]." },
      { q: "Email format?", a: "[EmailAddress]." },
      { q: "Regex check?", a: "[RegularExpression(pattern)]." },
      { q: "Auto 400 needs?", a: "[ApiController] attribute." },
      { q: "Cross-field complex rules?", a: "FluentValidation." },
      { q: "Standard error format?", a: "ProblemDetails (RFC 7807)." }
    ],
    commonMistakes: [
      "Forgetting [ApiController] — invalid models reach the action and you must check ModelState.IsValid manually everywhere.",
      "Validating only on the client (JS) — anyone can bypass; server-side validation is mandatory.",
      "Validating in both controller and service redundantly — pick one layer (boundary = controller) and trust below it.",
      "Returning custom error format instead of ProblemDetails — clients get inconsistent shapes per endpoint."
    ],
    proTip: "Senior line: 'I validate at the boundary using DataAnnotations for simple rules and FluentValidation for cross-field / business rules. With [ApiController] the framework returns ProblemDetails 400s automatically — clients always see the same error shape, and my controllers and services can trust the input is clean.'"
  },

  // ============================================================
  // 12. Filters
  // ============================================================
  {
    id: 'filters',
    title: '12. Filters',
    whatIsThis: [
      "Filters in ASP.NET Core are pieces of code that run at specific stages of the request pipeline — but only for actions handled by MVC / Web API (not for non-MVC middleware). Common types: Authorization, Resource, Action, Exception, Result. They're like middleware but scoped to controllers and actions.",
      "Simple meaning is — filters are hooks. 'Run this before / after every controller action'. Used for cross-cutting concerns at the MVC level, like authorization checks, logging only for actions, exception handling per controller."
    ],
    whyUseIt: [
      "Filters let us add behavior that's specific to controllers/actions without writing a full middleware. They have access to the action context (action name, args, ModelState) — middleware doesn't have any of that.",
      "Different filter types fire at different stages, so you can pick the perfect hook for the job — Authorization filters before everything else, Action filters around the action, Exception filters when actions throw, Result filters around result execution."
    ],
    realLifeExample: [
      "Imagine on Amazon, every controller action that creates / modifies data needs an audit log: who did it, when, with what payload. Instead of adding logging code to every action, add an ActionFilter — runs once per action, logs everything.",
      "Same with role checks. Instead of if(user.Role!='Admin') in every action, add an [Authorize(Roles='Admin')] — that's an Authorization filter under the hood. One line, every protected action covered."
    ],
    howItWorks: [
      "Create a class implementing the right filter interface (IActionFilter, IExceptionFilter, IAuthorizationFilter, IResultFilter, IResourceFilter), or inherit from the *Attribute base.",
      "Override OnActionExecuting / OnActionExecuted (or async variants) for the desired stage.",
      "Apply it via attribute on action / controller, or globally in Program.cs (services.AddControllers(o => o.Filters.Add<MyFilter>())).",
      "Filters can short-circuit by setting context.Result — the rest of the pipeline (action, other filters) is skipped.",
      "Filters can use DI by inheriting from TypeFilterAttribute or using ServiceFilterAttribute."
    ],
    codeExample: `public class LogActionFilter : IActionFilter
{
    private readonly ILogger<LogActionFilter> _logger;
    public LogActionFilter(ILogger<LogActionFilter> logger) => _logger = logger;

    public void OnActionExecuting(ActionExecutingContext ctx)
        => _logger.LogInformation("→ {Action}", ctx.ActionDescriptor.DisplayName);

    public void OnActionExecuted(ActionExecutedContext ctx)
        => _logger.LogInformation("← {Status}", ctx.HttpContext.Response.StatusCode);
}

// Register globally
builder.Services.AddControllers(o => o.Filters.Add<LogActionFilter>());
builder.Services.AddScoped<LogActionFilter>();

// Or per-controller / per-action
[ServiceFilter(typeof(LogActionFilter))]
public class OrdersController : ControllerBase
{
    [HttpGet("ping")] public IActionResult Ping() => Ok("pong");
}`,
    codeOutput: `GET /orders/ping

info: LogActionFilter[0]
      → OrdersController.Ping (MyApp)
info: LogActionFilter[0]
      ← 200`,
    interviewQuestions: [
      {
        q: "What are filters in ASP.NET Core?",
        a: "Filters are MVC-pipeline hooks that run at specific stages of action execution — Authorization, Resource, Action, Exception, Result. They're used for cross-cutting concerns scoped to MVC: authorization, action logging, exception handling, output formatting. Unlike middleware, they have access to action context."
      },
      {
        q: "What is the difference between middleware and filters?",
        a: "Middleware runs in the entire request pipeline, before MVC even kicks in. Filters run inside MVC, only for controller actions, and have access to action arguments, ModelState, action result. Use middleware for app-wide concerns (logging, CORS, compression). Use filters for action-specific concerns (model validation, auth, action audit)."
      },
      {
        q: "What are the types of filters and their order?",
        a: "Order: Authorization → Resource → Model Binding → Action → Result → Exception (Exception fires whenever something throws). Authorization is first to short-circuit unauthorized calls. Result wraps result execution. Exception filters convert exceptions into responses."
      },
      {
        q: "How do you apply a filter globally?",
        a: "In Program.cs: builder.Services.AddControllers(opt => opt.Filters.Add<LogActionFilter>()). Or by type: opt.Filters.Add(typeof(LogActionFilter)). For per-controller / action use [ServiceFilter(typeof(...))] or [TypeFilter(typeof(...))] attributes — these support DI, unlike plain attribute filters."
      },
      {
        q: "What is the difference between ServiceFilter and TypeFilter?",
        a: "Both let attributes use DI. ServiceFilter requires the filter type to be registered in DI — it just resolves it. TypeFilter creates the filter on the fly using the DI container, even if not registered. ServiceFilter is preferred when the filter is registered; TypeFilter is for one-off filters with constructor args."
      }
    ],
    followUpQuestions: [
      { q: "Stage that runs first?", a: "Authorization filter." },
      { q: "Filter for unhandled errors?", a: "Exception filter." },
      { q: "Wraps result execution?", a: "Result filter." },
      { q: "Around the action method?", a: "Action filter." },
      { q: "Filter with DI on attribute?", a: "[ServiceFilter] / [TypeFilter]." },
      { q: "Apply globally in?", a: "Program.cs (Filters.Add)." },
      { q: "Short-circuit how?", a: "Set context.Result." }
    ],
    commonMistakes: [
      "Using filter for app-wide concerns that should be middleware (CORS, compression).",
      "Filter constructor needs DI but used as plain [MyFilter] — won't resolve dependencies; use [ServiceFilter] / [TypeFilter].",
      "Forgetting that exception filters only see exceptions thrown from action / result execution — not those thrown from middleware.",
      "Heavy logic inside filters — slows down every action; keep filters lean."
    ],
    proTip: "Senior interview line: 'For app-wide things like logging or CORS I use middleware. For MVC-specific things — auditing actions, normalizing API errors, custom auth checks — I use filters because they have action context. Filters that need DI I always wire up via [ServiceFilter] so the lifetimes line up correctly.'"
  },

  // ============================================================
  // 13. JWT Authentication
  // ============================================================
  {
    id: 'jwt-authentication',
    title: '13. JWT Authentication',
    whatIsThis: [
      "JWT (JSON Web Token) is a compact, URL-safe token that carries claims (user id, role, expiry) in three base64-encoded parts: Header.Payload.Signature. The server signs it on login and validates the signature on every request — no server-side session needed.",
      "Simple meaning is — once you log in, server gives you a long string (JWT). You attach it as Authorization: Bearer <token> on every API call. Server checks signature + expiry and trusts the claims inside."
    ],
    whyUseIt: [
      "JWT is stateless — the server doesn't store sessions. This makes scaling trivial: any node behind the load balancer can validate any token using just the signing key. Perfect for microservices and APIs serving mobile / SPA clients.",
      "The claims travel inside the token, so the API doesn't even need to call the user DB on every request — id, role, tenant are all in the JWT. Less DB load, faster response."
    ],
    realLifeExample: [
      "Login to Swiggy app → backend returns a JWT. Your phone stores it. Every order, every cart update, every search hits the backend with that token in the header. Backend validates and reads userId / role straight from the token.",
      "After 24 hours, token expires → app silently calls /refresh with a refresh token to get a new JWT. User never logs in again unless explicitly logged out."
    ],
    howItWorks: [
      "User posts username + password to /login. Server validates against DB.",
      "Server generates a JWT — Header (alg=HS256), Payload (sub, role, exp claims), Signature (HMAC of Header+Payload using a secret key).",
      "Server returns JWT to client. Client stores it (cookie / localStorage / mobile keychain).",
      "On every API call, client sends Authorization: Bearer <jwt>.",
      "Server middleware (UseAuthentication) reads the header, verifies signature with the same secret key, checks expiry, populates HttpContext.User. Authorization middleware then enforces [Authorize] / role checks."
    ],
    codeExample: `// Program.cs — register JWT auth
builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(opt =>
    {
        opt.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer           = true,
            ValidateAudience         = true,
            ValidateLifetime         = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer   = "myapp",
            ValidAudience = "myapp-users",
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes("super_secret_key_min_32_chars!!!"))
        };
    });
builder.Services.AddAuthorization();

var app = builder.Build();
app.UseAuthentication();   // ← order matters
app.UseAuthorization();

app.MapPost("/login", () => { /* generate JWT */ });
app.MapGet("/orders", [Authorize] () => "secret data");

app.Run();`,
    codeOutput: `POST /login
→ 200 { "token": "eyJhbGciOi...payload...signature" }

GET /orders        (no header)        → 401 Unauthorized
GET /orders        (Bearer expired)   → 401 Unauthorized
GET /orders        (Bearer valid)     → 200 "secret data"`,
    interviewQuestions: [
      {
        q: "What is JWT and what does it contain?",
        a: "JWT (JSON Web Token) is a compact, signed token with three parts separated by dots: Header (algorithm), Payload (claims like userId, role, exp), Signature (HMAC of header+payload using a secret). Server signs it on login; clients send it back with every request. Stateless authentication — no server-side session needed."
      },
      {
        q: "How is JWT validated on the server?",
        a: "ASP.NET Core's JwtBearer middleware reads the Authorization: Bearer header, decodes the token, recomputes the signature using the configured signing key, and compares. It also checks issuer, audience, and expiry. If any fails → 401. If valid, claims are loaded into HttpContext.User."
      },
      {
        q: "Where should the JWT be stored on the client?",
        a: "On a Single Page App, prefer HttpOnly + Secure cookies — protected from JavaScript / XSS. localStorage is convenient but vulnerable to XSS. Mobile apps store in OS keychain / secure storage. Never in plain JS variables that survive across pages."
      },
      {
        q: "What is a refresh token and why do we need it?",
        a: "JWTs are short-lived (15-60 min) for safety. When the JWT expires, the client uses a longer-lived refresh token (sent securely, often as HttpOnly cookie) to get a new JWT without forcing the user to log in again. Refresh tokens are stored server-side and can be revoked, unlike pure JWTs."
      },
      {
        q: "How do you log a user out with JWT?",
        a: "JWTs are stateless — the server doesn't 'remember' them, so logout has to be handled differently. Options: delete the token on the client (simplest), maintain a token blacklist in Redis (heavier), keep tokens very short-lived and rely on refresh-token revocation (best balance). Pick based on security needs."
      }
    ],
    followUpQuestions: [
      { q: "Full form?", a: "JSON Web Token." },
      { q: "Three parts?", a: "Header, Payload, Signature." },
      { q: "Header carries it as?", a: "Authorization: Bearer <jwt>." },
      { q: "Default scheme constant?", a: "JwtBearerDefaults.AuthenticationScheme." },
      { q: "Expiry claim?", a: "exp." },
      { q: "Subject claim?", a: "sub." },
      { q: "Recommended token lifetime?", a: "Short — 15-60 minutes." },
      { q: "Refresh token purpose?", a: "Get new JWT without login." }
    ],
    commonMistakes: [
      "Storing the JWT in localStorage in a SPA — vulnerable to XSS. Prefer HttpOnly cookies.",
      "Using a weak / hard-coded signing key in code — must be 32+ random bytes from secret store.",
      "Forgetting to validate Issuer / Audience — anyone with the key can mint valid tokens for your API.",
      "UseAuthentication after UseAuthorization in Program.cs — Authorization runs without identity, blocks every request."
    ],
    proTip: "Senior line: 'For SPAs I keep JWT in HttpOnly + Secure cookies, with short access-token lifetime (15 min) and a longer refresh token. Signing key always lives in Key Vault or env vars, never in appsettings. Validate Issuer, Audience, and Lifetime — without those, your JWT is just a fancy plaintext.'"
  },

  // ============================================================
  // 14. Role-based Authorization
  // ============================================================
  {
    id: 'role-based-authorization',
    title: '14. Role-based Authorization',
    whatIsThis: [
      "After authentication tells us 'who you are', authorization tells us 'what you can do'. Role-based authorization grants access based on a role claim in the user's identity — e.g. only users with role 'Admin' can hit DELETE /users/{id}. ASP.NET Core enforces it via [Authorize(Roles = \"Admin\")] or via richer policy-based rules.",
      "Simple meaning is — every endpoint can require a role. If the JWT / cookie doesn't have that role claim, framework returns 403 Forbidden before your code runs."
    ],
    whyUseIt: [
      "Almost every business app has different user types — Admin, Manager, Employee, Customer. Without authorization, every authenticated user could access every endpoint. Roles let us restrict at the URL level cleanly.",
      "Combined with Policy-based authorization, it scales — instead of [Authorize(Roles=\"X,Y,Z\")] sprinkled everywhere, you define a policy once ('CanApproveOrders') and apply it. Easier to audit and change."
    ],
    realLifeExample: [
      "On HDFC net banking — a regular customer can transfer money, but only an internal Admin can reset another user's password. Both are logged in with JWT, but the role claim differs.",
      "On Amazon Seller Central — Catalog Manager can add products; Finance role can see invoices; only Account Owner can change bank details. Role-based authorization makes this trivial: each endpoint checks for the right role."
    ],
    howItWorks: [
      "JWT (or cookie) carries a 'role' claim per user (e.g. role: 'Admin').",
      "UseAuthentication middleware loads the claims into HttpContext.User.",
      "Decorate the action / controller with [Authorize(Roles = \"Admin\")] or define a policy via AddAuthorization.",
      "On request, Authorization middleware checks if any role in the user's identity matches. If not → 403.",
      "Multiple roles: [Authorize(Roles = \"Admin,Manager\")] (any of them). For 'all of them', combine with policies."
    ],
    codeExample: `// Program.cs
builder.Services.AddAuthorization(opt =>
{
    opt.AddPolicy("CanApproveOrders", p =>
        p.RequireRole("Admin", "Manager")
         .RequireClaim("Department", "Finance"));
});

// Controllers
[Authorize]                                    // any logged-in user
public class OrdersController : ControllerBase
{
    [HttpGet]   public IActionResult List() => Ok(new[] { 1, 2 });

    [HttpDelete("{id:int}")]
    [Authorize(Roles = "Admin")]                // role check
    public IActionResult Remove(int id) => NoContent();

    [HttpPost("{id:int}/approve")]
    [Authorize(Policy = "CanApproveOrders")]    // richer policy
    public IActionResult Approve(int id) => Ok();
}`,
    codeOutput: `GET /orders                     (no token)        → 401
GET /orders                     (Bearer valid)    → 200
DELETE /orders/5                (role=User)       → 403 Forbidden
DELETE /orders/5                (role=Admin)      → 204
POST  /orders/5/approve         (role=Admin,
                                 dept=Finance)    → 200
POST  /orders/5/approve         (role=Admin,
                                 dept=HR)         → 403`,
    interviewQuestions: [
      {
        q: "What is the difference between authentication and authorization?",
        a: "Authentication answers 'who are you?' — verifying identity (login, JWT validation). Authorization answers 'what are you allowed to do?' — checking roles, policies, or permissions for the requested resource. Authentication runs first; authorization runs after."
      },
      {
        q: "How does role-based authorization work in ASP.NET Core?",
        a: "User's identity carries a 'role' claim (loaded from JWT / cookie). [Authorize(Roles = \"Admin\")] on a controller / action tells the framework to allow only users with that role. Multiple roles separated by comma mean 'any of these'. Failing the check returns 403 Forbidden."
      },
      {
        q: "What is policy-based authorization and when do you use it?",
        a: "Policy-based is a more flexible model — you define a named policy in Program.cs that combines roles, claims, custom requirements, then apply [Authorize(Policy = \"PolicyName\")]. Use it when a single role isn't enough — e.g. 'must be Manager AND in Finance department AND have approver claim'."
      },
      {
        q: "What's the difference between 401 and 403?",
        a: "401 Unauthorized = you're not authenticated (no token / invalid token). 403 Forbidden = you're authenticated but not allowed to access this resource (role / policy fails). Different statuses help clients react correctly — 401 means 'log in', 403 means 'ask admin for access'."
      },
      {
        q: "How do you implement custom authorization logic?",
        a: "Implement IAuthorizationRequirement (just a marker class) plus an AuthorizationHandler<TReq> that checks the rule asynchronously. Register both in DI, add the requirement to a policy. Useful for rules like 'user can edit only their own orders' — context-dependent checks beyond claims."
      }
    ],
    followUpQuestions: [
      { q: "Status code for not logged in?", a: "401." },
      { q: "Status code for forbidden?", a: "403." },
      { q: "Restrict by role?", a: "[Authorize(Roles = \"Admin\")]." },
      { q: "Multiple roles (any)?", a: "Comma-separated in attribute." },
      { q: "Define policy in?", a: "Program.cs (AddAuthorization)." },
      { q: "Custom logic via?", a: "AuthorizationHandler + Requirement." },
      { q: "Order of middleware?", a: "Authentication then Authorization." }
    ],
    commonMistakes: [
      "Using only [Authorize] but no role / policy → any logged-in user can access — sometimes intended, often a bug.",
      "Hardcoding role strings like \"Admin\" everywhere — typo means silent permission gap. Prefer constants or policies.",
      "Mixing Authentication / Authorization order in Program.cs — the latter runs without identity if reversed.",
      "Trying to do 'owner-only' checks via roles — that's data-level authorization; needs a custom handler with resource context."
    ],
    proTip: "Senior interview line: 'For simple cases I use [Authorize(Roles = ...)]; for anything richer (multiple conditions, ownership, tenant) I switch to policies and AuthorizationHandlers. Hard-coded role strings are a smell — I keep them as constants. And UseAuthentication before UseAuthorization — that ordering bug has cost me hours in the past.'"
  }
];
