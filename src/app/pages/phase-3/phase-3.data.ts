import { Topic } from './phase-3.types';

export const phase3Topics: Topic[] = [
  // ============================================================
  // 1. SQL Joins
  // ============================================================
  {
    id: 'sql-joins',
    title: '1. SQL Joins (Inner, Left, Right, Full, Cross)',
    whatIsThis: [
      "A JOIN combines rows from two or more tables based on a related column. INNER JOIN keeps only matching rows. LEFT JOIN keeps all rows from the left table (and NULLs from the right when no match). RIGHT JOIN does the opposite. FULL JOIN keeps everything from both. CROSS JOIN gives the Cartesian product (every left row × every right row).",
      "Simple meaning is — JOIN is how we 'glue' two tables together using a common key, so we can fetch related data in one query instead of multiple round trips."
    ],
    whyUseIt: [
      "Real data is split across many tables for normalization (Customers, Orders, Products, Categories). To answer 'what did Rohit buy last month?' we must join Customers and Orders. Joins do this in one query, on the database side, much faster than fetching everything and merging in C#.",
      "Knowing which JOIN to use decides whether your report shows 'every customer with their orders, even if they have none' (LEFT) vs 'only customers who actually ordered' (INNER). Same query, different intent — totally different result."
    ],
    realLifeExample: [
      "On Swiggy: Customers table has customer info, Orders table has each order, Restaurants table has restaurant info. Showing 'My order history' uses an INNER JOIN of Orders × Restaurants — only rows with both sides exist.",
      "Showing 'All restaurants with their orders count, including those with zero orders' needs a LEFT JOIN — restaurants stay even if no order. Wrong join here = empty restaurants disappear from the dashboard."
    ],
    howItWorks: [
      "FROM tableA a INNER JOIN tableB b ON a.id = b.aId — keeps rows where the ON condition is true on both sides.",
      "LEFT JOIN keeps every row from tableA and pads with NULL where tableB has no match.",
      "RIGHT JOIN is the mirror — every row from tableB, NULL on left when no match.",
      "FULL OUTER JOIN keeps rows from both sides, NULL where the other side has no match.",
      "CROSS JOIN has no ON clause — pairs every row from A with every row from B (rarely useful, very large result)."
    ],
    codeExample: `// EF Core LINQ joins (translated to SQL on the database side)
using var ctx = new AppDb();

// 1. INNER JOIN — only customers WITH orders
var withOrders =
    from c in ctx.Customers
    join o in ctx.Orders on c.Id equals o.CustomerId
    select new { c.Name, o.Item, o.Amount };

// 2. LEFT JOIN — every customer, orders may be empty
var leftJoin =
    from c in ctx.Customers
    join o in ctx.Orders on c.Id equals o.CustomerId into grp
    from o in grp.DefaultIfEmpty()                       // ← LEFT
    select new { c.Name, Item = o != null ? o.Item : "(none)" };

// Equivalent raw SQL:
//   SELECT c.Name, o.Item, o.Amount
//   FROM Customers c
//   INNER JOIN Orders o ON o.CustomerId = c.Id;
//
//   SELECT c.Name, ISNULL(o.Item, '(none)')
//   FROM Customers c
//   LEFT JOIN  Orders o ON o.CustomerId = c.Id;`,
    codeOutput: `Customers          Orders
Id  Name           Id  CustomerId  Item   Amount
1   Rohit          1   1           Pizza  450
2   Aman           2   1           Coke    99
3   Priya          (no row)

INNER JOIN result:
  Rohit | Pizza | 450
  Rohit | Coke  | 99

LEFT JOIN result:
  Rohit | Pizza
  Rohit | Coke
  Aman  | (none)
  Priya | (none)`,
    interviewQuestions: [
      {
        q: "What is the difference between INNER JOIN and LEFT JOIN?",
        a: "INNER JOIN returns rows where the ON condition matches on BOTH tables. LEFT JOIN returns ALL rows from the left table; for left-rows with no match on the right, the right-side columns come back as NULL. INNER drops unmatched rows; LEFT keeps them with NULLs."
      },
      {
        q: "When would you use a FULL OUTER JOIN?",
        a: "When you need every row from both tables, matched where possible. Useful for reconciliation reports — e.g. find customers without orders AND orders without customers (data mismatch detection). MySQL doesn't support FULL JOIN directly; you simulate it with LEFT JOIN UNION RIGHT JOIN."
      },
      {
        q: "What is a CROSS JOIN and when is it useful?",
        a: "CROSS JOIN produces the Cartesian product — every row of A paired with every row of B (no ON clause). Useful for generating combinations: e.g. all sizes × all colours of a product, calendar × stores for sparse data fill. Be careful — N rows × M rows = N×M, can explode quickly."
      },
      {
        q: "What is a self-join?",
        a: "A JOIN where a table is joined to itself — typically using two aliases. Common use: an Employees table where each row has a ManagerId pointing to another row in the same table. SELECT e.Name, m.Name AS Manager FROM Employees e LEFT JOIN Employees m ON e.ManagerId = m.Id."
      },
      {
        q: "Difference between WHERE and ON clause in a JOIN?",
        a: "ON describes how the two tables are related (the join condition). WHERE filters the joined result. For INNER JOIN they're often interchangeable; for LEFT JOIN they're different — adding 'WHERE right.col = X' converts LEFT to effectively INNER (NULLs from unmatched left rows fail the filter). Always put filters on the right table inside ON for LEFT JOIN."
      }
    ],
    followUpQuestions: [
      { q: "Default JOIN type?", a: "INNER JOIN." },
      { q: "Keep all left rows?", a: "LEFT JOIN." },
      { q: "Cartesian product?", a: "CROSS JOIN." },
      { q: "Self join means?", a: "Joining a table to itself." },
      { q: "Many-to-many joins via?", a: "Junction (linking) table." },
      { q: "EF Core LEFT JOIN keyword?", a: "DefaultIfEmpty." },
      { q: "Right join keeps?", a: "All rows from right table." }
    ],
    commonMistakes: [
      "Using WHERE on a LEFT JOIN's right table — silently turns it into an INNER JOIN, dropping rows.",
      "Forgetting the ON clause — query becomes a CROSS JOIN by accident, returns N×M rows.",
      "Joining on non-indexed columns — query slows from milliseconds to seconds on big tables.",
      "Using SELECT * in joins — returns duplicate columns, breaks ORM mapping, slower over the network."
    ],
    proTip: "Senior interview line: 'I always pick INNER for 'must match', LEFT for 'optional related data'. The mistake I look for in code reviews is putting filters on the right table in WHERE after a LEFT JOIN — it silently kills the LEFT semantics. Move it inside the ON clause and the report is correct again.'"
  },

  // ============================================================
  // 2. Indexes
  // ============================================================
  {
    id: 'indexes',
    title: '2. Indexes',
    whatIsThis: [
      "An index is a separate, sorted data structure (usually a B-tree) that the database keeps for one or more columns of a table. It lets the database find rows quickly — like an index at the back of a book — instead of scanning every row.",
      "Simple meaning is — without index, finding a row in a 10 lakh row table is like reading the whole book to find one word. With an index, the database jumps directly to the right page."
    ],
    whyUseIt: [
      "Indexes turn slow O(n) table scans into fast O(log n) lookups for SELECT, JOIN, WHERE, and ORDER BY. On large tables this is the difference between a 5 ms query and a 5 second one.",
      "But indexes have a cost — every INSERT / UPDATE / DELETE has to update them too, and they take disk space. So we don't index everything; we index the columns that show up in WHERE clauses, JOIN conditions, and ORDER BY of frequent queries."
    ],
    realLifeExample: [
      "On Amazon, the Orders table has crores of rows. Searching 'orders by customerId 12345' without an index = full scan, painfully slow. With an index on customerId, the DB jumps straight to that customer's orders in milliseconds.",
      "But adding an index on every column kills write performance — every new order has to update 10 indexes. So Amazon picks indexes carefully based on query patterns."
    ],
    howItWorks: [
      "Database creates a B-tree (or hash) structure for the indexed column(s), sorted by the key.",
      "On WHERE / JOIN / ORDER BY, query planner can do a quick tree lookup instead of scanning the whole table.",
      "Clustered index defines the physical order of rows in the table — only one per table; the primary key usually becomes it.",
      "Non-clustered indexes are separate structures that point to the actual row — many allowed per table.",
      "On INSERT / UPDATE / DELETE the database also updates every relevant index — this is the cost."
    ],
    codeExample: `// EF Core (Fluent API in OnModelCreating) — declare indexes
public class AppDb : DbContext
{
    public DbSet<Order> Orders => Set<Order>();

    protected override void OnModelCreating(ModelBuilder mb)
    {
        // Single-column index
        mb.Entity<Order>()
          .HasIndex(o => o.CustomerId);

        // Composite index — order matters!
        mb.Entity<Order>()
          .HasIndex(o => new { o.CustomerId, o.CreatedAt });

        // Unique index
        mb.Entity<Order>()
          .HasIndex(o => o.OrderNo)
          .IsUnique();
    }
}

// Equivalent SQL produced by migration:
//   CREATE INDEX IX_Orders_CustomerId ON Orders (CustomerId);
//   CREATE INDEX IX_Orders_CustomerId_CreatedAt
//          ON Orders (CustomerId, CreatedAt);
//   CREATE UNIQUE INDEX IX_Orders_OrderNo ON Orders (OrderNo);`,
    codeOutput: `Without index — SELECT * FROM Orders WHERE CustomerId = 12345
  → table scan, 10,000,000 rows read, ~3.2s

With IX_Orders_CustomerId
  → index seek, 23 rows read, ~2ms

Insert cost
  → with 0 indexes: 1 write
  → with 4 indexes: 5 writes (table + 4 index updates)`,
    interviewQuestions: [
      {
        q: "What is an index in SQL and why do we use it?",
        a: "An index is a separate sorted data structure (B-tree) the database maintains for one or more columns. It speeds up SELECT, JOIN, WHERE, and ORDER BY by turning a full table scan into a quick lookup. Trade-off: writes become slower because every INSERT / UPDATE has to update the index too."
      },
      {
        q: "Difference between clustered and non-clustered index?",
        a: "Clustered index defines the physical order of rows in the table — only ONE per table, usually the primary key. Non-clustered is a separate structure with pointers back to rows — MANY allowed per table. Lookup via clustered = direct read; lookup via non-clustered = index hit + key lookup (extra step)."
      },
      {
        q: "When should you NOT add an index?",
        a: "On small tables (under a few thousand rows — full scan is fast anyway). On columns rarely used in WHERE / JOIN. On columns with very few distinct values (boolean, status flags) — selectivity is poor, index doesn't help. On write-heavy tables where extra index updates would dominate."
      },
      {
        q: "What is a composite index and why does column order matter?",
        a: "A composite index covers multiple columns in a specific order — e.g. (CustomerId, CreatedAt). The database can use it for queries filtering on the leading column(s): WHERE CustomerId=... or WHERE CustomerId=... AND CreatedAt>... but NOT for WHERE CreatedAt>... alone. Always put the most-selective and most-used filter column first."
      },
      {
        q: "What is an execution plan and how do you read it?",
        a: "Execution plan is the database's chosen strategy to run a query — index seek, table scan, hash join, nested loop, etc. In SQL Server use SET SHOWPLAN_TEXT ON or 'Display Estimated Plan'. In EF Core enable .LogTo() with sensitive data. Look for table scans and missing index suggestions on slow queries."
      }
    ],
    followUpQuestions: [
      { q: "Default index data structure?", a: "B-tree." },
      { q: "How many clustered indexes per table?", a: "Only one." },
      { q: "Primary key creates which index?", a: "Clustered (by default)." },
      { q: "Composite index column order matters?", a: "Yes — leftmost prefix rule." },
      { q: "Unique index purpose?", a: "Enforce uniqueness + speed up lookup." },
      { q: "Index slows down what?", a: "Inserts / updates / deletes." },
      { q: "EF Core fluent for index?", a: "HasIndex." }
    ],
    commonMistakes: [
      "Indexing every column 'just in case' — kills write performance and bloats disk.",
      "Composite index with wrong column order — the query can't use it.",
      "Using SELECT * with covering index expectations — DB still has to do a key lookup for missing columns.",
      "Not maintaining indexes — fragmentation builds up over time, hurting performance even for indexed queries."
    ],
    proTip: "Senior line: 'Indexes are not free — every index is a tax on every INSERT / UPDATE. I add an index only after profiling shows the query is slow on that filter, and I review the actual execution plan to confirm the new index is being used. \"More indexes\" is rarely the answer; \"the right index\" is.'"
  },

  // ============================================================
  // 3. Normalization
  // ============================================================
  {
    id: 'normalization',
    title: '3. Normalization (1NF, 2NF, 3NF)',
    whatIsThis: [
      "Normalization is the process of organizing tables and columns to eliminate duplicate data and update anomalies. We progress through normal forms: 1NF (atomic columns, no repeating groups), 2NF (no partial dependency on composite keys), 3NF (no transitive dependency — non-key columns depend only on the key).",
      "Simple meaning is — split your one giant 'all-in-one' table into smaller related tables so the same fact isn't stored twice and updates don't go out of sync."
    ],
    whyUseIt: [
      "Without normalization, the same address might be stored in 10 customer rows. Customer moves house → you have to update 10 places. Miss one → data is inconsistent forever. Normalization eliminates this duplication and makes updates safe.",
      "It also reduces storage, makes joins predictable, and gives a clean schema. The trade-off is more JOINs at read time — for which we use indexes and, sometimes, denormalization for read-heavy reports."
    ],
    realLifeExample: [
      "Bad table: Orders(OrderId, CustomerName, CustomerEmail, CustomerAddress, Item, Price). Customer 'Rohit' places 10 orders → his name and address are stored 10 times. He changes his address → 10 updates needed.",
      "Normalized: Customers(Id, Name, Email, Address) and Orders(Id, CustomerId, Item, Price). Address stored once. Update once, applies everywhere via CustomerId join."
    ],
    howItWorks: [
      "1NF: every column holds a single atomic value (no comma-separated lists), each row is unique.",
      "2NF: 1NF + no column depends on only PART of a composite primary key. Move partial dependencies to a new table.",
      "3NF: 2NF + no non-key column depends on another non-key column (transitive dependency). Move dependent columns to their own table.",
      "BCNF / 4NF / 5NF exist but for 99% of business apps 3NF is the practical sweet spot.",
      "Sometimes we deliberately DEnormalize a 3NF schema (duplicate data) for read performance — common in reporting / OLAP tables, never in transactional core."
    ],
    codeExample: `// Bad — denormalized
public class OrderDenorm
{
    public int    OrderId;
    public string CustomerName;       // duplicated across orders
    public string CustomerEmail;      // duplicated
    public string CustomerAddress;    // duplicated
    public string Item;
    public decimal Price;
}

// Normalized (3NF) — separate Customers and Orders
public class Customer
{
    public int     Id;
    public string  Name = "";
    public string  Email = "";
    public string  Address = "";
}

public class Order
{
    public int     Id;
    public int     CustomerId;        // FK → Customer.Id
    public string  Item = "";
    public decimal Price;

    public Customer? Customer { get; set; }
}

// EF Core Fluent
mb.Entity<Order>()
  .HasOne(o => o.Customer)
  .WithMany()
  .HasForeignKey(o => o.CustomerId);`,
    codeOutput: `Before (denormalized):
OrderId  CustomerName  CustomerAddress  Item   Price
1        Rohit         Pune             Pizza  450
2        Rohit         Pune             Coke    99
3        Rohit         Pune             Burger 200
   ↑ 'Rohit | Pune' stored 3 times

After (3NF):
Customers
  1 | Rohit | Pune
Orders
  1 | 1 | Pizza  | 450
  2 | 1 | Coke   |  99
  3 | 1 | Burger | 200
   ↑ Rohit's data stored ONCE`,
    interviewQuestions: [
      {
        q: "What is normalization?",
        a: "Normalization is the process of organizing data to reduce redundancy and avoid update anomalies. We split a wide 'all-in-one' table into smaller related tables connected by foreign keys, progressing through normal forms (1NF, 2NF, 3NF). Goal: store each fact in exactly one place."
      },
      {
        q: "What are 1NF, 2NF, 3NF in simple words?",
        a: "1NF — every cell holds a single atomic value, no repeating groups. 2NF — 1NF plus every non-key column depends on the WHOLE primary key (relevant when the PK is composite). 3NF — 2NF plus non-key columns don't depend on other non-key columns (no transitive dependency). Most business apps stop at 3NF."
      },
      {
        q: "What is denormalization and when is it useful?",
        a: "Denormalization is intentionally duplicating data to speed up reads — like adding CustomerName onto an Orders table so reports don't need a JOIN. Useful for analytics / reporting tables and read-heavy paths. Never the default — start with 3NF, denormalize when profiling shows you need to."
      },
      {
        q: "What problems does normalization solve?",
        a: "Update anomalies (changing one fact in many places), insertion anomalies (can't insert a customer without an order), deletion anomalies (deleting last order loses customer info). It also reduces storage and keeps the schema logically clean — every fact in one place."
      },
      {
        q: "What is the trade-off of higher normal forms?",
        a: "More tables and more JOINs at read time. For OLTP (transactional) systems this is fine — JOIN is fast on indexed FKs. For OLAP (reporting / analytics) systems, joins on huge fact tables can be slow, so we deliberately denormalize into star/snowflake schemas. Different shape for different load."
      }
    ],
    followUpQuestions: [
      { q: "Goal of normalization?", a: "Eliminate redundancy and update anomalies." },
      { q: "1NF means?", a: "Atomic columns, unique rows." },
      { q: "2NF means?", a: "No partial dependency on composite key." },
      { q: "3NF means?", a: "No transitive dependency between non-key columns." },
      { q: "Most apps stop at?", a: "3NF." },
      { q: "Opposite of normalization?", a: "Denormalization." },
      { q: "Reporting schemas use?", a: "Often denormalized (star schema)." }
    ],
    commonMistakes: [
      "Storing comma-separated values in a single column (violates 1NF) — looks easy but breaks searches and joins.",
      "Confusing 'too many tables' with bad design — proper joins on indexed FKs are fast.",
      "Skipping normalization in an OLTP DB to 'avoid joins' — leads to data drift and bugs.",
      "Over-normalizing reporting tables — joins of 8 tables for one report kills performance, denormalize instead."
    ],
    proTip: "Senior interview line: 'For transactional databases I default to 3NF — every fact in one place, FK joins are cheap with proper indexes. For reporting tables I deliberately denormalize into star schemas so dashboards don't pay the join cost. Both shapes for the right job — never one schema for everything.'"
  },

  // ============================================================
  // 4. Stored Procedures
  // ============================================================
  {
    id: 'stored-procedures',
    title: '4. Stored Procedures',
    whatIsThis: [
      "A stored procedure (SP) is a precompiled block of SQL code stored inside the database with a name and parameters. Applications call it like a function — exec sp_GetOrders 12345 — and the DB runs the prepared logic, returning results.",
      "Simple meaning is — instead of sending raw SQL from the app every time, you store the query inside the database once and just call it by name. Like a saved recipe: you don't dictate every step, you say 'make recipe #4'."
    ],
    whyUseIt: [
      "SPs centralize SQL logic in the database. Multiple apps (web, mobile, batch jobs) can call the same SP and get consistent behaviour. They are also precompiled — execution plan cached — and reduce network traffic since you send one call instead of a long SQL string.",
      "They give DBAs a single place to optimise queries, manage permissions, and audit. They also wrap multi-step logic into a single transactional call, reducing chances of partial updates."
    ],
    realLifeExample: [
      "Banking 'Transfer Money' is a classic SP — debit one account, credit another, log the transaction, all in one transaction. Frontend doesn't need to know SQL; it just calls sp_TransferMoney @from, @to, @amount.",
      "Updating logic? Update the SP once. Every app (mobile, web, branch terminal) immediately uses the new logic — no app redeployment needed."
    ],
    howItWorks: [
      "Developer / DBA creates the SP with CREATE PROCEDURE name @param1 ..., AS BEGIN ... END.",
      "DB compiles it once, caches the execution plan, stores it in system tables (sys.procedures).",
      "App calls it via EXEC sp_name @p1=..., @p2=... (or via parameterized command in C#).",
      "DB runs the cached plan, returns result set / output params / return code.",
      "Subsequent calls reuse the same plan — saving compile time. Plan can be invalidated and recompiled when stats change."
    ],
    codeExample: `// SQL — define the SP (run once on the DB)
//   CREATE PROCEDURE sp_GetOrdersByCustomer
//       @CustomerId INT
//   AS
//   BEGIN
//       SELECT Id, Item, Amount, CreatedAt
//       FROM   Orders
//       WHERE  CustomerId = @CustomerId
//       ORDER  BY CreatedAt DESC;
//   END

// EF Core call — read result set
using var ctx = new AppDb();

var orders = await ctx.Orders
    .FromSqlRaw("EXEC sp_GetOrdersByCustomer @p0", customerId: 42)
    .ToListAsync();

// EF Core — non-query SP (returns affected rows)
int rows = await ctx.Database
    .ExecuteSqlRawAsync(
        "EXEC sp_TransferMoney @p0, @p1, @p2",
        fromAccount, toAccount, amount);

// ADO.NET style with parameters
using var conn = new SqlConnection(cs);
using var cmd  = new SqlCommand("sp_GetOrdersByCustomer", conn) {
    CommandType = CommandType.StoredProcedure
};
cmd.Parameters.AddWithValue("@CustomerId", 42);
await conn.OpenAsync();
using var reader = await cmd.ExecuteReaderAsync();`,
    codeOutput: `EXEC sp_GetOrdersByCustomer @CustomerId = 42
→ result set:
   Id   Item    Amount   CreatedAt
   123  Pizza   450      2026-05-05
   118  Coke     99      2026-05-04
   115  Burger  200      2026-04-28

ExecuteSqlRaw returned: 3 rows affected
(for sp_TransferMoney: typically 3 — debit, credit, log)`,
    interviewQuestions: [
      {
        q: "What is a stored procedure?",
        a: "A stored procedure is a precompiled block of SQL stored inside the database with a name and optional parameters. Apps call it like a function. Benefits: centralized logic, cached execution plan, less network traffic, easier permission control, transactional safety for multi-step operations."
      },
      {
        q: "What are the advantages of stored procedures over inline SQL?",
        a: "Better performance (cached plan), reduced network traffic (one call vs long SQL), centralized logic (one place to fix), reduced SQL injection risk (parameters are typed), easier permission management (grant EXEC on SP without granting table access). Multi-step logic stays atomic."
      },
      {
        q: "What is the disadvantage of stored procedures?",
        a: "Business logic ends up split between the app and the DB — harder to version-control, test, and refactor. SPs are tied to a specific DB engine (T-SQL vs PL/pgSQL), reducing portability. Modern teams prefer keeping logic in the app and using SPs only for DB-heavy operations or legacy systems."
      },
      {
        q: "How do you call a stored procedure from EF Core?",
        a: "For result sets — ctx.Entity.FromSqlRaw(\"EXEC sp_Name @p0\", arg). For non-query (INSERT/UPDATE/DELETE-style SPs) — ctx.Database.ExecuteSqlRawAsync(\"EXEC sp_Name @p0, @p1\", a, b). Always use parameters (@p0) — never string concatenation — to avoid SQL injection."
      },
      {
        q: "What's the difference between a stored procedure and a function in SQL?",
        a: "Function returns a value (scalar or table) and can be used inside SELECT / WHERE. Procedure can return result sets and output parameters but can't be used inline in SQL. Functions can't change DB state in some flavours; procedures can do anything (INSERT, UPDATE, DELETE, transactions). Use function for pure calculations, procedure for actions."
      }
    ],
    followUpQuestions: [
      { q: "SP precompiled?", a: "Yes, plan cached after first run." },
      { q: "Call SP in EF Core?", a: "FromSqlRaw / ExecuteSqlRawAsync." },
      { q: "Avoid SQL injection in SP?", a: "Always use parameters." },
      { q: "Prevents EF tracking?", a: "FromSqlRaw + AsNoTracking()." },
      { q: "SP returns multiple sets?", a: "Yes, but harder to consume in EF." },
      { q: "Function vs SP?", a: "Function returns value, SP can act / return sets." }
    ],
    commonMistakes: [
      "Building SP body with string concatenation of user input — opens SQL injection inside the procedure.",
      "Putting all business logic in SPs — makes the codebase hard to test and version-control.",
      "Calling SPs via FromSqlRaw with string concatenation in C# — same SQL injection risk; always parameterise.",
      "Not handling result-set schema changes — adding a column to the SP breaks ORM mapping silently."
    ],
    proTip: "Senior interview line: 'I keep business logic in the app code where it can be unit tested and version-controlled. SPs I use only for DB-heavy work — bulk operations, complex set logic, or multi-statement transactions where round-trip cost matters. Either way, every parameter is typed and parameterised — never string concatenation.'"
  },

  // ============================================================
  // 5. Transactions
  // ============================================================
  {
    id: 'transactions',
    title: '5. Transactions (ACID)',
    whatIsThis: [
      "A transaction is a group of database operations treated as ONE unit of work. Either all succeed and commit, or any failure rolls back everything to the state before. The classic guarantee is ACID — Atomicity, Consistency, Isolation, Durability.",
      "Simple meaning is — if you're transferring money: debit AND credit must both succeed, or neither happens. No middle state where money disappears."
    ],
    whyUseIt: [
      "Real-world business operations involve multiple steps that must succeed or fail together — bank transfers, order placement (deduct stock + create order + take payment), seat booking (reserve + charge). Without transactions, partial failures leave the data in an invalid state.",
      "Transactions also handle concurrency — isolation levels decide what each transaction can see while another is in progress, preventing dirty reads, lost updates, and phantoms."
    ],
    realLifeExample: [
      "Money transfer on PhonePe: ₹500 deducted from your account, ₹500 added to your friend's account, transaction logged in the audit table. All three steps are wrapped in a transaction.",
      "If the network dies after the debit but before the credit, the transaction rolls back — your money is restored. Without that, ₹500 vanishes from the system. ACID is what makes that disaster impossible."
    ],
    howItWorks: [
      "BEGIN TRANSACTION (or in EF Core: ctx.Database.BeginTransaction()).",
      "Run all queries / updates as part of this transaction — DB holds locks / writes them to a private 'shadow' state.",
      "If everything succeeds → COMMIT — changes become permanent and visible to others.",
      "If anything fails → ROLLBACK — all changes are undone as if they never happened.",
      "Isolation level (Read Uncommitted, Read Committed, Repeatable Read, Serializable, Snapshot) decides what other concurrent transactions can see while yours is in progress."
    ],
    codeExample: `using var ctx = new AppDb();
using var tx  = await ctx.Database.BeginTransactionAsync();

try
{
    // Step 1 — debit
    var from = await ctx.Accounts.FirstAsync(a => a.Id == fromId);
    from.Balance -= amount;

    // Step 2 — credit
    var to = await ctx.Accounts.FirstAsync(a => a.Id == toId);
    to.Balance   += amount;

    // Step 3 — audit log
    ctx.Transfers.Add(new Transfer {
        FromId = fromId, ToId = toId,
        Amount = amount, At = DateTime.UtcNow
    });

    await ctx.SaveChangesAsync();
    await tx.CommitAsync();
}
catch
{
    await tx.RollbackAsync();   // any failure → undo all 3 steps
    throw;
}

// EF Core 6+ shortcut for one SaveChanges:
//   await ctx.SaveChangesAsync();    // wrapped in implicit transaction
// Use explicit transaction only when SaveChanges runs more than once.`,
    codeOutput: `Initial:
  Account A: ₹1000   Account B: ₹500

Run TransferMoney(A → B, 300):
  Debit A      → A.Balance = 700
  Credit B     → B.Balance = 800
  Insert audit → Transfer row added
  COMMIT       → all 3 changes permanent

If Step 2 throws (network blip):
  ROLLBACK → A.Balance = 1000, B.Balance = 500, no audit row
  (state restored exactly as before)`,
    interviewQuestions: [
      {
        q: "What is a transaction in SQL?",
        a: "A transaction is a logical unit of work consisting of one or more SQL statements. It must satisfy ACID properties: Atomicity (all or nothing), Consistency (DB stays in valid state), Isolation (concurrent transactions don't interfere), Durability (committed changes survive crashes). Started with BEGIN TRANSACTION, ended with COMMIT or ROLLBACK."
      },
      {
        q: "What is ACID?",
        a: "Atomicity — all operations succeed together or none do. Consistency — transaction takes the DB from one valid state to another (constraints respected). Isolation — concurrent transactions appear to run one at a time. Durability — once committed, the change persists even if the server crashes immediately after."
      },
      {
        q: "What are isolation levels?",
        a: "They decide what other transactions can see while yours is mid-flight. Read Uncommitted — sees uncommitted changes (dirty read). Read Committed — sees only committed (default in SQL Server). Repeatable Read — same row reads the same value within the transaction. Serializable — full isolation, slowest. Snapshot — uses row versions, no locks. Pick based on consistency vs concurrency need."
      },
      {
        q: "How do you handle a transaction in EF Core?",
        a: "By default each SaveChangesAsync runs in its own transaction automatically. For multiple SaveChanges or mixing raw SQL, use ctx.Database.BeginTransactionAsync() — call CommitAsync on success, RollbackAsync inside catch. Wrap in try/catch and ALWAYS rollback on error to avoid leaving the DB locked."
      },
      {
        q: "What is a deadlock and how do you handle it?",
        a: "A deadlock happens when two transactions each hold a lock the other needs. The DB kills one (the 'victim') and rolls it back. To minimize: keep transactions short, access tables in the same order across transactions, use lower isolation levels where consistency allows, and add retry-on-deadlock logic in the app for safe operations."
      }
    ],
    followUpQuestions: [
      { q: "Full form ACID?", a: "Atomicity, Consistency, Isolation, Durability." },
      { q: "Default isolation level (SQL Server)?", a: "Read Committed." },
      { q: "Allows dirty reads?", a: "Read Uncommitted." },
      { q: "EF Core start a transaction?", a: "Database.BeginTransactionAsync." },
      { q: "Commit method?", a: "tx.CommitAsync()." },
      { q: "Rollback on error?", a: "tx.RollbackAsync() inside catch." },
      { q: "Single SaveChanges needs explicit tx?", a: "No, EF wraps it automatically." }
    ],
    commonMistakes: [
      "Forgetting to ROLLBACK on exception — transaction stays open, holding locks, blocking other queries.",
      "Long-running transactions — hold locks for too long, cause blocking and deadlocks.",
      "Wrapping single SaveChanges in an explicit transaction unnecessarily — EF Core does that automatically.",
      "Choosing Serializable everywhere 'just to be safe' — kills concurrency; pick the lowest isolation level that satisfies the use case."
    ],
    proTip: "Senior interview line: 'I use explicit transactions only when one logical operation needs multiple SaveChanges or mixes raw SQL with EF. I keep transactions short, always rollback in catch, and add a small retry on deadlock victim errors. Long transactions are the silent cause of most production blocking I've seen.'"
  },

  // ============================================================
  // 6. EF Core — Code First vs DB First
  // ============================================================
  {
    id: 'code-first-vs-db-first',
    title: '6. EF Core — Code First vs DB First',
    whatIsThis: [
      "Code First means you write C# entity classes first, then EF Core generates the database schema from them (via migrations). DB First means the database already exists, and you scaffold C# entity classes from it using a CLI command (dotnet ef dbcontext scaffold).",
      "Simple meaning is — Code First: code is the source of truth, DB follows. DB First: DB is the source of truth, code follows."
    ],
    whyUseIt: [
      "Code First is the default for new projects — schema lives in source control as migrations, code review catches schema changes, and the workflow stays in C#. Most modern .NET teams use it.",
      "DB First is right when you join an existing system — legacy DB, DBA-controlled schema, or shared DB across multiple apps. You scaffold once and update when the DB changes."
    ],
    realLifeExample: [
      "New startup building a fresh app: Code First. Developer adds a Customer class, runs Add-Migration, runs Update-Database, schema appears. Schema diffs visible in git PRs.",
      "Old enterprise with a 200-table SQL DB controlled by the DBA team: DB First. Developer scaffolds entities once, regenerates when DBA notifies of schema changes. Code never changes the DB."
    ],
    howItWorks: [
      "Code First: define POCO entity classes + DbContext. Run 'dotnet ef migrations add Init' → EF generates a migration file. Run 'dotnet ef database update' → EF applies it to the DB.",
      "Schema changes: tweak the entity / Fluent API → add another migration → update DB. The migration history table (__EFMigrationsHistory) tracks what's applied.",
      "DB First: run 'dotnet ef dbcontext scaffold \"<conn>\" Microsoft.EntityFrameworkCore.SqlServer' → EF reads the schema, generates entity classes and DbContext.",
      "Re-scaffold with --force when DB schema changes; manual edits get overwritten unless excluded.",
      "Both styles use the same DbContext / DbSet / LINQ at runtime — the difference is purely 'who owns the schema'."
    ],
    codeExample: `// ───────── Code First ─────────
public class Customer
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public List<Order> Orders { get; set; } = new();
}

public class AppDb : DbContext
{
    public DbSet<Customer> Customers => Set<Customer>();
    public DbSet<Order>    Orders    => Set<Order>();

    protected override void OnConfiguring(DbContextOptionsBuilder o)
        => o.UseSqlServer("Server=.;Database=AppDb;Trusted_Connection=true");
}

// CLI:
//   dotnet ef migrations add InitCreate
//   dotnet ef database update

// ───────── DB First ─────────
// CLI (one-time scaffold):
//   dotnet ef dbcontext scaffold
//     "Server=.;Database=LegacyDb;Trusted_Connection=true"
//     Microsoft.EntityFrameworkCore.SqlServer
//     -o Models  -c LegacyDbContext --force`,
    codeOutput: `Code First flow:
  1. Edit Customer.cs   ← add property "Email"
  2. dotnet ef migrations add AddCustomerEmail
       → /Migrations/20260506_AddCustomerEmail.cs created
  3. dotnet ef database update
       → ALTER TABLE Customers ADD Email NVARCHAR(MAX) NULL;

DB First flow:
  1. DBA: ALTER TABLE Customers ADD Email NVARCHAR(MAX) NULL;
  2. Developer: dotnet ef dbcontext scaffold ... --force
       → Customer.cs regenerated with new Email property
  3. Update calling code to use Email`,
    interviewQuestions: [
      {
        q: "What is the difference between Code First and DB First?",
        a: "In Code First, you write C# entities first, EF Core generates and updates the schema via migrations. In DB First, the database already exists; EF Core scaffolds C# entities from it. Code First — code drives schema. DB First — schema drives code. Default for new projects is Code First."
      },
      {
        q: "How do migrations work in Code First?",
        a: "When you change an entity, you run 'dotnet ef migrations add MigrationName'. EF compares your model to a snapshot and generates an Up()/Down() migration class. Running 'dotnet ef database update' applies pending migrations to the DB and records them in __EFMigrationsHistory."
      },
      {
        q: "How do you add a new column in DB First?",
        a: "Add the column on the database (DBA / SQL script). Then re-scaffold the entity classes with 'dotnet ef dbcontext scaffold ... --force'. Or, manually add the property + Fluent / data annotation mapping if you don't want to regenerate everything."
      },
      {
        q: "Can you mix Code First and DB First?",
        a: "Yes — sometimes called 'Database-first with manual maintenance'. Scaffold once, then maintain entities by hand and manage schema changes with hand-written migrations. Useful when you start from an existing DB but want full code control going forward. Just don't re-scaffold over hand-edited files."
      },
      {
        q: "What is the __EFMigrationsHistory table?",
        a: "It's a small table EF Core creates in your database to track which migrations have been applied. Each row stores the migration ID and the EF Core product version. EF reads this on update to know which migrations are pending and which already ran."
      }
    ],
    followUpQuestions: [
      { q: "Default for new projects?", a: "Code First." },
      { q: "DB First scaffold command?", a: "dotnet ef dbcontext scaffold." },
      { q: "Add a migration?", a: "dotnet ef migrations add Name." },
      { q: "Apply migrations?", a: "dotnet ef database update." },
      { q: "Migration history table?", a: "__EFMigrationsHistory." },
      { q: "Roll back last migration?", a: "dotnet ef migrations remove (if not applied)." }
    ],
    commonMistakes: [
      "Editing scaffolded files in DB First and then re-running scaffold with --force — your edits get overwritten.",
      "Running migrations on production without reviewing the generated SQL — destructive changes (column drops) can ship by accident.",
      "Forgetting to include the migration files in source control — other devs and pipelines can't apply them.",
      "Mixing 'dotnet ef database update' on one branch and migrations on another — produces conflicting __EFMigrationsHistory states."
    ],
    proTip: "Senior interview line: 'I use Code First by default — schema lives in git, every PR shows the migration. For legacy DBs I scaffold once with DB First and then maintain manually with hand-written migrations. I always review the generated SQL of every migration before running update on staging or prod — EF can drop columns silently if you rename them carelessly.'"
  },

  // ============================================================
  // 7. Migrations
  // ============================================================
  {
    id: 'migrations',
    title: '7. EF Core Migrations',
    whatIsThis: [
      "A migration is a versioned C# class that describes a schema change — Up() applies it (CREATE TABLE, ADD COLUMN, etc.) and Down() rolls it back. Each migration has a timestamped name and is checked into source control alongside your code.",
      "Simple meaning is — migrations are git-style versioning for your database schema. Every change is a recorded step that can be applied forward or rolled back."
    ],
    whyUseIt: [
      "Without migrations, schema changes are hand-written SQL scripts emailed around — easy to lose, easy to apply in wrong order, easy to forget on a new dev's machine. Migrations give us deterministic, repeatable, version-controlled schema evolution.",
      "On a new environment (laptop, CI, staging) you just run 'dotnet ef database update' and the DB is brought up to the latest version. Same flow in dev, staging, and prod — no surprises."
    ],
    realLifeExample: [
      "A team of 6 .NET devs share a feature branch. Dev A adds a Customers table (migration 001). Dev B adds an Orders table (migration 002). Both push migrations to git.",
      "Dev C pulls latest, runs 'dotnet ef database update' on his laptop — migrations 001 and 002 apply in order. No emails, no confusion. Same command runs on the CI build server and on production deploy."
    ],
    howItWorks: [
      "Edit your DbContext / entities → run 'dotnet ef migrations add MigrationName'.",
      "EF Core compares the current model to its snapshot file → generates a migration class with Up() and Down() methods.",
      "Review the generated SQL with 'dotnet ef migrations script <from> <to>'.",
      "Apply with 'dotnet ef database update' (latest) or 'dotnet ef database update MigrationName' (a specific point).",
      "Migration metadata is tracked in __EFMigrationsHistory inside the database — EF knows what's pending vs applied."
    ],
    codeExample: `// 1. Change entity
public class Customer
{
    public int    Id    { get; set; }
    public string Name  { get; set; } = "";
    public string Email { get; set; } = "";   // ← new column
}

// 2. Generate migration
//    dotnet ef migrations add AddCustomerEmail

// 3. Generated migration class (auto-created)
public partial class AddCustomerEmail : Migration
{
    protected override void Up(MigrationBuilder mb)
    {
        mb.AddColumn<string>(
            name: "Email",
            table: "Customers",
            nullable: false,
            defaultValue: "");
    }

    protected override void Down(MigrationBuilder mb)
    {
        mb.DropColumn(name: "Email", table: "Customers");
    }
}

// 4. Apply
//    dotnet ef database update
//    → ALTER TABLE Customers ADD Email NVARCHAR(MAX) NOT NULL DEFAULT '';

// 5. Generate idempotent SQL script for prod deploy
//    dotnet ef migrations script --idempotent
//    → safe to run on a DB at any state, applies only what's missing`,
    codeOutput: `Workflow on shared branch:

dev$ dotnet ef migrations add AddCustomerEmail
  → Migrations/20260506_AddCustomerEmail.cs created
  → ModelSnapshot.cs updated
  → committed to git

dev$ dotnet ef database update
  Build started...
  Build succeeded.
  Applying migration '20260506_AddCustomerEmail'.
  Done.

prod-deploy$ dotnet ef migrations script --idempotent > deploy.sql
  → DBA reviews and applies deploy.sql on production`,
    interviewQuestions: [
      {
        q: "What is an EF Core migration?",
        a: "A migration is a versioned C# class with Up() (apply) and Down() (rollback) methods that describes a database schema change. EF Core generates it by comparing your current model to a snapshot. Migrations are checked into source control, applied via 'dotnet ef database update', and tracked inside the DB in __EFMigrationsHistory."
      },
      {
        q: "How do you create a migration?",
        a: "Make changes to your entities or DbContext, then run 'dotnet ef migrations add MigrationName' from the project folder. EF Core scaffolds a Migrations/Timestamp_Name.cs file plus updates ModelSnapshot.cs. Review the generated code before applying."
      },
      {
        q: "How do you roll back a migration?",
        a: "Two options. If migration was already applied: run 'dotnet ef database update <PreviousMigrationName>' — EF runs the Down() methods. If not applied yet, just 'dotnet ef migrations remove' deletes the migration file. Never edit a migration that's already in production — add a new corrective migration instead."
      },
      {
        q: "What is the difference between 'database update' and a SQL script?",
        a: "'dotnet ef database update' applies migrations directly to the DB — fine for dev. For staging / prod, generate a SQL script with 'dotnet ef migrations script --idempotent' and have DBAs review and run it. Idempotent scripts can be run safely at any state — they apply only what's missing."
      },
      {
        q: "What problems can migrations cause and how do you avoid them?",
        a: "Renaming a property → EF generates DropColumn + AddColumn (data lost) instead of RenameColumn — must edit migration manually. Conflicting migrations from parallel branches — resolve before merging by re-creating one branch's migration. Always run 'migrations script' and review SQL before applying to production."
      }
    ],
    followUpQuestions: [
      { q: "Add migration command?", a: "dotnet ef migrations add Name." },
      { q: "Apply latest?", a: "dotnet ef database update." },
      { q: "Apply a specific one?", a: "dotnet ef database update MigrationName." },
      { q: "Remove unapplied migration?", a: "dotnet ef migrations remove." },
      { q: "History table?", a: "__EFMigrationsHistory." },
      { q: "SQL script for prod?", a: "dotnet ef migrations script --idempotent." },
      { q: "Up vs Down?", a: "Apply vs rollback." }
    ],
    commonMistakes: [
      "Not committing the Migrations/ folder + ModelSnapshot.cs — other devs and pipelines can't apply changes.",
      "Renaming a property and accepting EF's drop+add (data loss) — manually edit to use RenameColumn.",
      "Editing an applied migration in place — production state and code drift; always add a corrective migration.",
      "Running 'database update' directly on production — bypasses DBA review; always use 'migrations script' for prod."
    ],
    proTip: "Senior interview line: 'In dev I use database update; for staging and prod I generate an idempotent script with migrations script --idempotent and have it reviewed and run as part of the deploy pipeline. I never edit a migration that's already shipped — only forward-only corrective migrations. Lost too much sleep over silent column drops to ever skip the review step.'"
  },

  // ============================================================
  // 8. Relationships
  // ============================================================
  {
    id: 'ef-relationships',
    title: '8. EF Core Relationships (1-1, 1-many, many-many)',
    whatIsThis: [
      "Relationships in EF Core describe how entities connect. One-to-one (1:1) — one Customer has one Profile. One-to-many (1:N) — one Customer has many Orders. Many-to-many (N:N) — Students take Courses, each on either side. EF Core maps these via foreign keys (and join tables for N:N) automatically.",
      "Simple meaning is — relationships are how the C# object graph mirrors the database FK structure, so you can write customer.Orders or order.Customer and EF Core figures out the joins."
    ],
    whyUseIt: [
      "Almost every business entity has relationships — a customer has orders, an order has line items, a product belongs to categories. Modelling them in EF Core gives navigation properties (order.Customer.Name) and clean LINQ joins.",
      "EF Core also enforces referential integrity at the DB level (FK constraints) and lets you cascade or restrict deletes — making the schema correct by design."
    ],
    realLifeExample: [
      "Amazon: Customer → Address (1-1), Customer → Orders (1-N), Order → Products through OrderItems (N-N). Three different relationship types, all in one shopping flow.",
      "With EF Core navigation properties, fetching 'all orders of customer 42 with their products' is a 5-line LINQ query — no manual JOINs in the calling code."
    ],
    howItWorks: [
      "1:1 — both entities have a navigation property, one side has the FK. Use HasOne().WithOne().HasForeignKey<T>(...).",
      "1:N — parent has a List<Child>, child has a Parent navigation + FK. EF infers it by convention if FK is named ParentId.",
      "N:N — define a List<TOther> on both sides. EF Core 5+ auto-creates the join table; or define a join entity manually for extra columns.",
      "Cascade behaviour set via OnDelete: Cascade (delete children too), Restrict (block delete if children exist), SetNull (set FK to null).",
      "Required vs Optional decided by FK nullability — int CustomerId = required, int? = optional."
    ],
    codeExample: `// 1-to-1: Customer ↔ Profile
public class Customer
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public Profile? Profile { get; set; }            // navigation
}
public class Profile
{
    public int Id { get; set; }
    public int CustomerId { get; set; }              // FK + key
    public string AvatarUrl { get; set; } = "";
}

// 1-to-many: Customer → Orders
public class Order
{
    public int Id { get; set; }
    public int CustomerId { get; set; }              // FK
    public Customer? Customer { get; set; }
    public decimal Amount { get; set; }
}
class CustomerExtras { public List<Order> Orders { get; set; } = new(); }

// many-to-many: Student ↔ Course (auto join table in EF Core 5+)
public class Student { public int Id; public List<Course> Courses { get; set; } = new(); }
public class Course  { public int Id; public List<Student> Students { get; set; } = new(); }

// Fluent (in OnModelCreating)
mb.Entity<Profile>()
  .HasOne<Customer>().WithOne(c => c.Profile)
  .HasForeignKey<Profile>(p => p.CustomerId);

mb.Entity<Order>()
  .HasOne(o => o.Customer).WithMany(c => c.Orders)
  .HasForeignKey(o => o.CustomerId)
  .OnDelete(DeleteBehavior.Restrict);`,
    codeOutput: `Schema generated:

Customers (Id PK, Name)
Profiles  (Id PK, CustomerId FK UNIQUE, AvatarUrl)        ← 1:1
Orders    (Id PK, CustomerId FK, Amount)                   ← 1:N
Students  (Id PK)                                           ┐
Courses   (Id PK)                                           ├ N:N
CourseStudent (CoursesId FK, StudentsId FK)  ← auto join   ┘`,
    interviewQuestions: [
      {
        q: "How are relationships defined in EF Core?",
        a: "Through navigation properties on entities and foreign-key columns. EF Core can infer relationships by convention (matching names) or you can define them explicitly with Fluent API: HasOne / HasMany / WithOne / WithMany / HasForeignKey. The DB ends up with FK constraints enforcing referential integrity."
      },
      {
        q: "How does many-to-many work in EF Core 5+?",
        a: "Just declare a List<OtherEntity> on both sides — EF Core auto-creates a hidden join table (e.g. CourseStudent). You can also define an explicit join entity if you need extra columns on the relationship (like 'EnrolledOn'). Querying is natural via the navigation property."
      },
      {
        q: "What is cascade delete and how do you control it?",
        a: "Cascade delete means deleting the parent automatically deletes all children. Configure with OnDelete(DeleteBehavior.Cascade / Restrict / SetNull / NoAction). Restrict throws if children exist; Cascade removes them; SetNull nulls the FK if it's optional. Pick based on business rules — never blind cascade."
      },
      {
        q: "Required vs optional relationship — how do you tell EF Core?",
        a: "Through nullability of the FK property. int CustomerId means required (NOT NULL FK in SQL). int? CustomerId means optional (nullable FK). Or use Fluent: .IsRequired() / .IsRequired(false). Required relationships also default to Cascade delete; optional default to Restrict."
      },
      {
        q: "What is the difference between Reference and Collection navigation?",
        a: "Reference navigation is a single related entity — order.Customer (1:1 or many-side of 1:N). Collection navigation is a list of related entities — customer.Orders (one-side of 1:N or any side of N:N). EF Core uses Include() to load reference, Include().ThenInclude() for chains, both for collections."
      }
    ],
    followUpQuestions: [
      { q: "1:1 attribute pattern?", a: "HasOne / WithOne / HasForeignKey<T>." },
      { q: "1:N attribute pattern?", a: "HasOne / WithMany / HasForeignKey." },
      { q: "N:N needs?", a: "Lists on both sides (auto join table)." },
      { q: "Cascade delete enum?", a: "DeleteBehavior.Cascade." },
      { q: "Block delete if children exist?", a: "DeleteBehavior.Restrict." },
      { q: "FK nullable means?", a: "Optional relationship." },
      { q: "Where to configure?", a: "OnModelCreating Fluent API." }
    ],
    commonMistakes: [
      "Defining navigation properties without FKs — EF Core creates shadow properties and queries become harder to debug.",
      "Using Cascade delete everywhere — accidentally wipes out related data on soft scenarios.",
      "Many-to-many with extra columns but no explicit join entity — can't store the extra data.",
      "Circular references in navigation properties without [JsonIgnore] — JSON serializers throw."
    ],
    proTip: "Senior interview line: 'I always declare FK properties explicitly (CustomerId int) — never let EF use shadow FKs because they make debugging painful. Cascade delete is configured deliberately, not by default — losing related rows silently is a far worse bug than a delete that fails.'"
  },

  // ============================================================
  // 9. Lazy vs Eager Loading
  // ============================================================
  {
    id: 'lazy-vs-eager-loading',
    title: '9. Lazy vs Eager Loading',
    whatIsThis: [
      "Eager Loading — fetch the main entity AND its related data in one query, using Include(). Lazy Loading — fetch the main entity now, fetch related data automatically when accessed (one extra query per navigation). Explicit Loading — fetch related data on demand using ctx.Entry(...).Collection(...).LoadAsync().",
      "Simple meaning is — Eager: bring everything I might need together. Lazy: bring only what I asked, fetch the rest if and when I touch it. Explicit: I'll tell you exactly when to fetch."
    ],
    whyUseIt: [
      "Eager Loading is predictable — one query, all data, no surprises. Best when you know you'll use the related data (rendering an order with its items in one screen).",
      "Lazy Loading is convenient but dangerous — looks innocent in code but fires hidden queries. Famous source of N+1 problems in production. Use it only when you know the access pattern is rare."
    ],
    realLifeExample: [
      "Eager: showing a Swiggy 'Order details' page → ctx.Orders.Include(o => o.Items).Include(o => o.Restaurant) — one trip, full data.",
      "Lazy: an admin dashboard listing 1000 orders, your code does foreach(var o in orders) print(o.Customer.Name) — silently hits the DB 1000 times. Switch to Eager (.Include(o => o.Customer)) and it becomes one query."
    ],
    howItWorks: [
      "Eager: ctx.Orders.Include(o => o.Items).ThenInclude(i => i.Product) — translates to a JOIN (or split query) on the DB.",
      "Lazy: enable via .UseLazyLoadingProxies() and mark navigation properties as virtual. EF Core injects a proxy that fetches related data when the property is touched.",
      "Explicit: call ctx.Entry(order).Collection(o => o.Items).LoadAsync() at the moment you need the children.",
      "EF Core 5+ supports split queries (.AsSplitQuery()) — Include with multiple collections runs as several queries instead of one giant cartesian-blown JOIN.",
      "Choose Eager by default; Lazy only for rare-access scenarios; Explicit for conditional loads."
    ],
    codeExample: `using var ctx = new AppDb();

// 1. Eager Loading — one query with JOIN
var order = await ctx.Orders
    .Include(o => o.Customer)
    .Include(o => o.Items)
        .ThenInclude(i => i.Product)
    .FirstAsync(o => o.Id == 42);

// 2. Lazy Loading — needs UseLazyLoadingProxies + virtual navs
public class Order
{
    public int Id { get; set; }
    public virtual Customer? Customer { get; set; }   // virtual
    public virtual List<Item> Items   { get; set; } = new();
}

// builder.Services.AddDbContext<AppDb>(o =>
//   o.UseLazyLoadingProxies()
//    .UseSqlServer(cs));

var orders = await ctx.Orders.ToListAsync();
foreach (var o in orders)
    Console.WriteLine(o.Customer!.Name);   // ← extra query each iteration

// 3. Explicit Loading — manual control
var orderOnly = await ctx.Orders.FirstAsync(o => o.Id == 42);
await ctx.Entry(orderOnly).Collection(o => o.Items).LoadAsync();`,
    codeOutput: `Eager (1 round trip):
  SELECT o.*, c.*, i.*, p.*
  FROM Orders o
  INNER JOIN Customers c ...
  LEFT  JOIN Items i ...
  LEFT  JOIN Products p ...
  WHERE o.Id = 42

Lazy (N+1 round trips for 100 orders):
  SELECT * FROM Orders             ← 1 query
  SELECT * FROM Customers WHERE Id=1  ← +1 each loop
  SELECT * FROM Customers WHERE Id=2
  ...
  ← 100 extra queries silently

Explicit (2 round trips, on demand):
  SELECT * FROM Orders WHERE Id = 42
  SELECT * FROM Items  WHERE OrderId = 42`,
    interviewQuestions: [
      {
        q: "What is the difference between eager and lazy loading?",
        a: "Eager loading uses Include() to fetch related data in the same query — one round trip to the DB. Lazy loading fetches the main entity now and silently fires extra queries when navigation properties are accessed — convenient but easy to misuse, leading to N+1 problems. Eager is predictable; Lazy is hidden cost."
      },
      {
        q: "How do you enable lazy loading in EF Core?",
        a: "Two requirements. Install Microsoft.EntityFrameworkCore.Proxies, call .UseLazyLoadingProxies() on the DbContext options, AND mark every navigation property as virtual. Without virtual, the proxy can't intercept access. It's off by default in EF Core for safety."
      },
      {
        q: "What is the N+1 problem and how does it relate to lazy loading?",
        a: "N+1 = one query for the main list (1) plus one extra query per item (N). Classic with lazy loading: fetch 100 orders, foreach to access order.Customer, lazy fires 100 extra queries. Solve by switching to eager loading with .Include(o => o.Customer) — turns N+1 queries into 1."
      },
      {
        q: "What is explicit loading and when do you use it?",
        a: "Explicit loading manually triggers fetching of related data via ctx.Entry(entity).Reference(...).LoadAsync() or .Collection(...).LoadAsync(). Useful when the related data is needed only conditionally, after some logic — gives you full control without the magic of lazy or the upfront cost of eager."
      },
      {
        q: "What is AsSplitQuery in EF Core?",
        a: "When Include pulls multiple collections, the JOIN can blow up into a cartesian explosion. AsSplitQuery() tells EF to run the main query first, then a separate query per collection. More round trips but smaller data over the wire and no duplicated rows. Use for queries with multiple Includes on collections."
      }
    ],
    followUpQuestions: [
      { q: "Default loading?", a: "Eager via Include." },
      { q: "Lazy needs?", a: "Proxies package + virtual navigations." },
      { q: "Explicit method?", a: "Entry(...).Collection / Reference." },
      { q: "N+1 fix?", a: "Use Include." },
      { q: "Multiple Include collections?", a: "Use AsSplitQuery." },
      { q: "Recommended in modern EF?", a: "Eager + AsNoTracking for reads." }
    ],
    commonMistakes: [
      "Enabling lazy loading 'just in case' — silently turns clean code into N+1 disasters in production.",
      "Forgetting virtual on a navigation property when lazy is enabled — that one nav stays unloaded silently.",
      "Using eager loading with too many Includes on collections — cartesian blow-up; switch to AsSplitQuery.",
      "Eagerly loading data you'll never use — wastes DB and network for nothing."
    ],
    proTip: "Senior interview line: 'I default to eager loading with explicit Includes — predictable queries, no hidden round trips. Lazy I avoid in real projects because it makes performance bugs invisible in code review. For queries with multiple collection Includes I use AsSplitQuery to dodge the cartesian explosion.'"
  },

  // ============================================================
  // 10. LINQ to Entities
  // ============================================================
  {
    id: 'linq-to-entities',
    title: '10. LINQ to Entities',
    whatIsThis: [
      "LINQ to Entities is EF Core's LINQ provider — when you write a LINQ query against a DbSet (IQueryable), EF Core translates it into SQL and runs it on the database. The result rows are then materialized back into your entity objects.",
      "Simple meaning is — same LINQ syntax you use on List<T>, but on the DB side. .Where, .Select, .OrderBy all become SQL clauses. The DB does the heavy lifting; your code just handles the results."
    ],
    whyUseIt: [
      "LINQ to Entities lets us write database queries in C# with full IntelliSense, type safety, and refactor support. Compared to raw SQL strings, you catch typos and column rename issues at compile time.",
      "It also unifies the developer experience — same LINQ for in-memory lists and DB queries. Combined with Include() and AsNoTracking(), you can express complex DB logic clearly and concisely."
    ],
    realLifeExample: [
      "Showing 'Top 5 Pune restaurants by rating, with at least 100 orders, sorted by avg delivery time' — one chained LINQ in C#, EF Core translates it into one SQL query running on the DB indexes. No raw SQL needed.",
      "If the column 'Rating' is renamed to 'AvgRating', the LINQ query fails to compile — instant feedback. With raw SQL strings, you'd find out at runtime in production."
    ],
    howItWorks: [
      "DbSet<T> implements IQueryable<T>. Each .Where / .OrderBy / .Select call appends to an Expression Tree, not real code.",
      "When the query is enumerated (ToListAsync, FirstAsync, foreach), EF Core walks the expression tree and the LINQ provider translates it into SQL.",
      "DB executes the SQL → returns rows. EF Core materialises rows into entity instances and (by default) attaches them to the change tracker.",
      "Methods that EF Core can't translate (custom C# methods, reflection) throw at runtime — switch to client evaluation by calling AsEnumerable() first.",
      "Use AsNoTracking() for read-only queries to skip the change tracker — faster and less memory."
    ],
    codeExample: `using var ctx = new AppDb();

// Read-only top 5 restaurants, eager-loaded with category
var top = await ctx.Restaurants
    .AsNoTracking()                                  // skip tracking
    .Where(r => r.City == "Pune" && r.OrdersCount >= 100)
    .OrderByDescending(r => r.AvgRating)
    .Take(5)
    .Include(r => r.Category)
    .Select(r => new
    {
        r.Name,
        Category = r.Category.Name,
        r.AvgRating,
        r.AvgDeliveryMins
    })
    .ToListAsync();

// Generated SQL (roughly):
//   SELECT TOP 5 r.Name, c.Name AS Category, r.AvgRating, r.AvgDeliveryMins
//   FROM   Restaurants r
//   INNER JOIN Categories c ON c.Id = r.CategoryId
//   WHERE  r.City = 'Pune' AND r.OrdersCount >= 100
//   ORDER  BY r.AvgRating DESC;

foreach (var row in top)
    Console.WriteLine($"{row.Name} | {row.Category} | {row.AvgRating}");`,
    codeOutput: `top 5 Pune restaurants:
  Punjabi Tadka  | North Indian | 4.7
  Wok In Wok     | Chinese      | 4.6
  Royal Biryani  | Mughlai      | 4.6
  Dosa Express   | South Indian | 4.5
  Pasta Point    | Italian      | 4.4

Behind the scenes:
  → 1 SQL query
  → No tracking — entity instances are throwaway
  → Anonymous projection, only 4 columns over the wire`,
    interviewQuestions: [
      {
        q: "What is LINQ to Entities?",
        a: "LINQ to Entities is the LINQ provider that translates IQueryable<T> chains on EF Core DbSets into SQL queries that run on the database. You write LINQ in C#; EF Core builds an expression tree and converts it to SQL when the query is enumerated. Result rows materialise into entity instances."
      },
      {
        q: "What is the difference between LINQ to Objects and LINQ to Entities?",
        a: "LINQ to Objects works on IEnumerable<T> in memory — the lambda runs as compiled C#. LINQ to Entities works on IQueryable<T> — the lambda is captured as an expression tree and translated to SQL by the EF Core provider, then runs on the database. Different execution model, mostly identical syntax."
      },
      {
        q: "What is AsNoTracking and when do you use it?",
        a: "AsNoTracking() tells EF Core not to track the entities returned — they won't show up in the change tracker, so SaveChanges won't see them. Use for read-only queries (reports, lists). Faster, lower memory, no accidental update side effects. For data you'll modify, leave tracking on."
      },
      {
        q: "What happens if a LINQ query can't be translated to SQL?",
        a: "Modern EF Core throws InvalidOperationException at the point of enumeration. Older EF would silently switch to client evaluation, which often pulled the whole table into memory. Fix by rewriting the unsupported part using SQL-friendly methods, or call AsEnumerable() before the unsupported call to do that part in memory."
      },
      {
        q: "How do you project only specific columns instead of full entities?",
        a: "Use .Select(...) to project to an anonymous type or DTO — EF Core then SELECTs only those columns from the DB. Saves bandwidth, memory, and avoids tracking unnecessary fields. Best practice for read endpoints / reports where you don't need the full entity."
      }
    ],
    followUpQuestions: [
      { q: "DbSet implements?", a: "IQueryable<T>." },
      { q: "Skip change tracker?", a: "AsNoTracking()." },
      { q: "Run query async?", a: "ToListAsync, FirstAsync etc." },
      { q: "Eager-load related?", a: "Include / ThenInclude." },
      { q: "Project specific columns?", a: ".Select(new {...})." },
      { q: "Untranslatable method behaviour?", a: "Throws at enumeration." },
      { q: "Multiple includes split query?", a: "AsSplitQuery." }
    ],
    commonMistakes: [
      "Calling ToList() too early — pulls whole table into memory, then filters in C#.",
      "Using custom C# methods inside LINQ to Entities — translation fails at runtime.",
      "Skipping AsNoTracking on read-only queries — wastes memory and risks accidental SaveChanges.",
      "Returning full entities to the API instead of DTOs — over-fetches columns and risks circular JSON serialisation."
    ],
    proTip: "Senior interview line: 'I keep the query as IQueryable until the very last call — that way the entire chain becomes one SQL statement on the DB. Read-only queries always go .AsNoTracking() and project via .Select to a DTO. Pulling whole entities by default is the most common cause of slow EF endpoints I see in code review.'"
  },

  // ============================================================
  // 11. Query Optimization
  // ============================================================
  {
    id: 'query-optimization',
    title: '11. Query Optimization',
    whatIsThis: [
      "Query optimization is the practice of making your DB queries fast and lean — using indexes, projecting only needed columns, avoiding N+1, paging large result sets, choosing the right isolation level, and reading the execution plan to confirm what's actually happening.",
      "Simple meaning is — instead of 'just write the LINQ and hope it's fast', actively design queries that touch the right indexes, return only required data, and round-trip the DB the minimum number of times."
    ],
    whyUseIt: [
      "DB queries are usually the slowest part of a web request. A well-tuned query takes 5 ms; a sloppy one on the same data takes 5 seconds. Multiply by 1000 concurrent users — that's the difference between a healthy server and a 503.",
      "Optimization also reduces cost — fewer CPU cycles on the DB, less network bandwidth, smaller cloud bills. Same business outcome, fraction of the resources."
    ],
    realLifeExample: [
      "Swiggy 'My Orders' page initially: SELECT * FROM Orders, then for each order another SELECT for restaurant, then another for items. 100 orders → 201 queries, 4 seconds.",
      "After optimization: one .Include(o => o.Restaurant).Include(o => o.Items).Select(...).AsNoTracking() with index on (CustomerId, CreatedAt). Same 100 orders → 1 query, 40 ms. Same UI, same code style — just better LINQ choices."
    ],
    howItWorks: [
      "Project only the columns you need with .Select(new {...}) — narrow rows = faster transfer + less memory.",
      "Index the columns used in WHERE / JOIN / ORDER BY of frequent queries.",
      "Avoid N+1 — use Include() / ThenInclude() (or AsSplitQuery for many collections).",
      "Page large result sets with .Skip(n).Take(m) instead of returning everything.",
      "Use AsNoTracking() for read-only paths to skip the change tracker overhead.",
      "Always profile — log generated SQL via ctx.LogTo(Console.WriteLine), inspect execution plans, watch for table scans / missing indexes."
    ],
    codeExample: `// ❌ Slow — pulls everything, no projection, no paging, with tracking
var bad = ctx.Orders
    .Include(o => o.Customer)
    .Include(o => o.Items)
    .ToList();
// → SELECT all columns, all rows, all related, marks every entity as tracked.

// ✅ Optimized
var page = 2;
var size = 20;

var good = await ctx.Orders
    .AsNoTracking()
    .Where(o => o.CustomerId == 42)
    .OrderByDescending(o => o.CreatedAt)
    .Skip((page - 1) * size).Take(size)
    .Select(o => new OrderListDto
    {
        Id          = o.Id,
        Total       = o.Amount,
        ItemCount   = o.Items.Count,
        Restaurant  = o.Restaurant.Name,
        CreatedAt   = o.CreatedAt
    })
    .ToListAsync();

// Required indexes:
//   CREATE INDEX IX_Orders_CustomerId_CreatedAt
//          ON Orders (CustomerId, CreatedAt DESC);

// Inspect generated SQL while developing:
//   options.LogTo(Console.WriteLine, LogLevel.Information);`,
    codeOutput: `❌ Slow query: 4.2s, 12 MB returned, full row scan on Orders
   → 201 queries (1 + 100 + 100), most data unused

✅ Optimized:
   SELECT TOP 20 o.Id, o.Amount, (SELECT COUNT(*) FROM Items WHERE OrderId=o.Id),
          r.Name, o.CreatedAt
   FROM   Orders o
   INNER  JOIN Restaurants r ON r.Id = o.RestaurantId
   WHERE  o.CustomerId = 42
   ORDER  BY o.CreatedAt DESC
   OFFSET 20 ROWS FETCH NEXT 20 ROWS ONLY

   → 1 query, 40 ms, 24 KB returned, index seek on
     IX_Orders_CustomerId_CreatedAt`,
    interviewQuestions: [
      {
        q: "What are the most common ways to optimize EF Core queries?",
        a: "Project only required columns via .Select to a DTO. Use .AsNoTracking() for read-only paths. Eager-load with .Include / .ThenInclude (or .AsSplitQuery for multiple collections) to avoid N+1. Page big result sets with .Skip / .Take. Make sure WHERE / JOIN / ORDER BY columns are indexed. Always inspect the generated SQL."
      },
      {
        q: "How do you find slow queries in EF Core?",
        a: "Enable query logging with options.LogTo(Console.WriteLine, LogLevel.Information) or .EnableSensitiveDataLogging() in dev. Check the SQL produced. On the DB side, use SQL Profiler / Extended Events / Application Insights / pgBadger. Look for queries with high duration, full table scans, or missing-index warnings."
      },
      {
        q: "What is an execution plan and how does it help?",
        a: "Execution plan shows the database's strategy — which indexes are used, what JOIN algorithms (nested loop, hash, merge), and where the cost is. Slow queries usually show table scans, missing index hints, or expensive sorts. Fix by adding the right index, rewriting the LINQ, or providing better stats."
      },
      {
        q: "When would you use raw SQL instead of LINQ in EF Core?",
        a: "When LINQ produces inefficient SQL the DB can't optimise (e.g. complex window functions, recursive CTEs, hints), or when you need to call a stored procedure / function. Use FromSqlRaw / ExecuteSqlRawAsync — always with parameters, never string concatenation. Stay in LINQ for everything else for type safety."
      },
      {
        q: "What is a covering index?",
        a: "An index that contains every column the query needs (key columns + INCLUDE columns), so the DB can satisfy the query from the index alone — no key lookup back to the table. Massive speed-up for hot read queries. Add covering indexes only after profiling — they cost write performance and disk."
      }
    ],
    followUpQuestions: [
      { q: "Read-only path optimisation?", a: "AsNoTracking + Select DTO." },
      { q: "Avoid N+1?", a: "Include / ThenInclude (or AsSplitQuery)." },
      { q: "Page large results?", a: "Skip(n).Take(m)." },
      { q: "Index for WHERE column?", a: "Yes, almost always." },
      { q: "See generated SQL?", a: "options.LogTo + EnableSensitiveDataLogging." },
      { q: "Raw SQL helper?", a: "FromSqlRaw / ExecuteSqlRawAsync." },
      { q: "Index that covers all columns?", a: "Covering index." }
    ],
    commonMistakes: [
      "Returning full entities when DTO with 4 columns would do — pulls 50 columns over the wire for nothing.",
      "Forgetting to page list endpoints — works fine for 50 rows, dies at 50,000.",
      "Treating EF Core like a black box — never inspecting the generated SQL until prod is on fire.",
      "Adding indexes blindly without checking whether the query plan actually uses them."
    ],
    proTip: "Senior interview line: 'For every list / read endpoint I review the generated SQL during development. Three things I always check — projecting only required columns via Select DTO, no N+1 (Include or AsSplitQuery), and pagination on anything that can grow. Indexes I add only after the execution plan confirms a scan is happening on a hot path.'"
  },

  // ============================================================
  // 12. N+1 Problem
  // ============================================================
  {
    id: 'n-plus-1-problem',
    title: '12. The N+1 Query Problem',
    whatIsThis: [
      "N+1 means: one query to load N parent rows, then N additional queries to load the related data of each one — totalling N+1 round trips to the database. A classic performance trap that hides behind innocent-looking foreach loops.",
      "Simple meaning is — your code looks like 'fetch list, then for each item read its detail' — and the DB ends up running hundreds of queries instead of one or two."
    ],
    whyUseIt: [
      "Understanding N+1 is critical because it's the #1 silent performance killer in ORM-based code. The code looks correct, tests pass, dev DB is fast — then on prod with real volume it falls apart.",
      "Fix is usually one line — add .Include(...) for eager loading, or rewrite as a Select that joins on the DB side. Awareness saves hours of post-launch debugging."
    ],
    realLifeExample: [
      "Amazon admin dashboard: list 1000 orders, for each show 'Customer name'. Naive code does ctx.Orders.ToList(), then loop and access o.Customer.Name. With lazy loading on, that's 1 + 1000 = 1001 queries.",
      "Rewrite: ctx.Orders.Include(o => o.Customer).Select(o => new { o.Id, o.Customer.Name }).ToList() → 1 single SQL query with a JOIN. Same screen, 1000× faster."
    ],
    howItWorks: [
      "Step 1 — main query loads N rows (e.g. all Orders).",
      "Step 2 — your code accesses a navigation property in a loop (o.Customer / o.Items).",
      "If lazy loading is on, EF Core fires a separate query each iteration to load the related row.",
      "Even without lazy loading, accessing a not-loaded navigation returns null or empty — also a bug, just a different one.",
      "Fix: include the related data upfront with .Include() or project required fields via .Select() so the DB returns it in one query."
    ],
    codeExample: `// ❌ Classic N+1 with lazy loading
var orders = await ctx.Orders.ToListAsync();          // 1 query
foreach (var o in orders)
    Console.WriteLine(o.Customer!.Name);              // +1 query each
// → 1 + N queries (101 for 100 orders)

// ✅ Fix 1 — Eager loading
var ordersEager = await ctx.Orders
    .Include(o => o.Customer)
    .ToListAsync();                                   // 1 query (JOIN)
foreach (var o in ordersEager)
    Console.WriteLine(o.Customer!.Name);              // already loaded

// ✅ Fix 2 — Projection (best for list endpoints)
var dto = await ctx.Orders
    .Select(o => new { o.Id, CustomerName = o.Customer!.Name })
    .ToListAsync();                                   // 1 query, narrow

// ✅ Fix 3 — AsSplitQuery for multiple collection includes
var withItems = await ctx.Orders
    .Include(o => o.Customer)
    .Include(o => o.Items).ThenInclude(i => i.Product)
    .AsSplitQuery()
    .ToListAsync();`,
    codeOutput: `❌ Naive run with 100 orders, lazy loading on:
   SELECT * FROM Orders                          (1)
   SELECT * FROM Customers WHERE Id = 1          (2)
   SELECT * FROM Customers WHERE Id = 2          (3)
   ...
   SELECT * FROM Customers WHERE Id = 100      (101)
   Total: 101 round trips, ~3.4 s

✅ Eager (Include) — 1 query, ~40 ms:
   SELECT o.*, c.* FROM Orders o
   INNER JOIN Customers c ON c.Id = o.CustomerId

✅ Projection — 1 query, ~25 ms:
   SELECT o.Id, c.Name FROM Orders o
   INNER JOIN Customers c ON c.Id = o.CustomerId`,
    interviewQuestions: [
      {
        q: "What is the N+1 query problem?",
        a: "It's the situation where loading a parent collection of N items triggers one initial query plus N additional queries for related data — one per parent. Classic with ORM lazy loading. Looks innocent in code, scales terribly. Fix with eager loading (.Include) or projection (.Select)."
      },
      {
        q: "How do you detect N+1 in an ASP.NET Core / EF Core app?",
        a: "Enable query logging via options.LogTo(Console.WriteLine, LogLevel.Information) or watch SQL Profiler / Application Insights. If a single endpoint fires 100+ similar SELECT statements, that's N+1. Tools like MiniProfiler also show 'duplicate query' warnings clearly."
      },
      {
        q: "What's the difference between Include and Select for fixing N+1?",
        a: "Include() loads the full related entity — useful when you need the whole object graph and full entity behaviour. Select() projects only the columns you need — typically faster and cheaper for list endpoints / DTOs. Both fix N+1; Select is usually the better choice for read endpoints."
      },
      {
        q: "Can N+1 happen even without lazy loading?",
        a: "Yes — manually fetching a child inside a loop has the same effect: foreach(var o in orders) ctx.Customers.Find(o.CustomerId). The pattern is the trap, not the lazy proxy. Treat 'queries inside a loop' as a code smell during reviews."
      },
      {
        q: "What is AsSplitQuery and when does it help?",
        a: "When Include pulls multiple collections, the SQL JOIN can produce a cartesian explosion (parent × children1 × children2). AsSplitQuery() splits this into one main query + one query per collection — fewer rows duplicated, faster. Trade-off: more round trips. Use when Include of multiple collections is heavy."
      }
    ],
    followUpQuestions: [
      { q: "N+1 means?", a: "1 main query + N child queries." },
      { q: "Main cause?", a: "Lazy loading or fetch-in-loop." },
      { q: "Fix with Eager?", a: "Include / ThenInclude." },
      { q: "Fix with Projection?", a: "Select to DTO." },
      { q: "Multiple includes blowing up?", a: "AsSplitQuery." },
      { q: "How to spot in dev?", a: "Log SQL or use MiniProfiler." }
    ],
    commonMistakes: [
      "Looping over a list and dereferencing a navigation property without Include — silent N+1.",
      "Returning lazy-loaded entities directly to JSON serializer — triggers extra queries during serialization.",
      "Using Include + Include of two big collections without AsSplitQuery — cartesian blow-up worse than the original problem.",
      "Fixing one N+1 visually then ignoring others on the same page — review the entire endpoint, not just one line."
    ],
    proTip: "Senior line: 'I treat any DB call inside a loop as a smell — it's almost always an N+1 about to happen at scale. In code review I scroll through endpoint code looking for foreach over EF results that touches navigation properties; nine times out of ten it needs a Select projection or an Include.'"
  },

  // ============================================================
  // 13. Tracking vs No-Tracking
  // ============================================================
  {
    id: 'tracking-vs-no-tracking',
    title: '13. Change Tracking vs AsNoTracking',
    whatIsThis: [
      "By default EF Core 'tracks' every entity returned from a query — it remembers their original values and watches for changes, so SaveChanges() can generate UPDATE statements. AsNoTracking() turns this off — entities are returned as plain objects with no change tracker entry.",
      "Simple meaning is — Tracking = EF watches your entities for edits. NoTracking = EF gives you the data and forgets about it."
    ],
    whyUseIt: [
      "Tracking is what makes EF Core's 'edit and SaveChanges' workflow possible. But it has cost — extra memory, extra setup time per row, more GC pressure. For purely read-only queries (lists, reports, GET endpoints), tracking is wasted work.",
      "AsNoTracking() makes read queries faster (often 20-40%) and uses less memory. Standard practice in modern EF Core: tracking ON for write paths, OFF for read paths."
    ],
    realLifeExample: [
      "GET /orders endpoint — pure read, just returns JSON. Use AsNoTracking() — faster, less memory, no risk of accidental SaveChanges side effects.",
      "PUT /orders/{id} endpoint — fetch the order, modify a field, SaveChanges. Tracking ON (default) — EF detects what changed and writes the right UPDATE."
    ],
    howItWorks: [
      "When tracking is on, the DbContext maintains a ChangeTracker that snapshots each loaded entity's state.",
      "On modification, EF compares current vs original values when SaveChanges runs and generates UPDATE / INSERT / DELETE accordingly.",
      "AsNoTracking() skips the snapshot — saves memory and CPU per row, but the entity won't trigger any DB writes.",
      "AsNoTrackingWithIdentityResolution() is a middle ground — no full tracking, but de-duplicates entities so the same row referenced twice in a query becomes one .NET instance.",
      "Set as default for the whole context with options.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking) and opt-in with .AsTracking() where needed."
    ],
    codeExample: `// ❌ Read-only list endpoint, but tracking is on by default
var orders = await ctx.Orders
    .Where(o => o.CustomerId == 42)
    .ToListAsync();              // each entity is added to the tracker

// ✅ AsNoTracking — fast, lean, no side effects
var ordersFast = await ctx.Orders
    .AsNoTracking()
    .Where(o => o.CustomerId == 42)
    .ToListAsync();

// ✅ Default for the whole context — opt-in to tracking when needed
builder.Services.AddDbContext<AppDb>(o =>
{
    o.UseSqlServer(cs);
    o.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
});

var trackedForEdit = await ctx.Orders
    .AsTracking()                            // explicit opt-in
    .FirstAsync(o => o.Id == 42);
trackedForEdit.Status = "Cancelled";
await ctx.SaveChangesAsync();                // UPDATE generated`,
    codeOutput: `Performance comparison (10,000 rows):

Tracking (default)          : 480 ms,  72 MB
NoTracking                  : 290 ms,  21 MB
NoTrackingWithIdentityRes.  : 320 ms,  28 MB

Side effect:
  Tracked entity edited but no SaveChanges call → still uses memory
  until the DbContext is disposed.
  NoTracking entity edited → nothing happens. Edit is invisible to EF.`,
    interviewQuestions: [
      {
        q: "What is change tracking in EF Core?",
        a: "Change tracking is the mechanism by which the DbContext remembers each loaded entity and watches for changes to its properties. When SaveChanges runs, EF Core compares current vs original values and generates the appropriate INSERT / UPDATE / DELETE SQL. This is what enables the 'load → edit → SaveChanges' pattern."
      },
      {
        q: "What does AsNoTracking do and when do you use it?",
        a: "AsNoTracking() returns entities without adding them to the change tracker — no snapshot, no monitoring. Use for read-only queries (list endpoints, reports, dashboards). Faster, lower memory, no risk of accidental SaveChanges side effects. Don't use it for entities you intend to update."
      },
      {
        q: "How do you make NoTracking the default for the whole context?",
        a: "In Program.cs / OnConfiguring: options.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking). All queries are now untracked by default. For write paths, opt back in with .AsTracking() per query. Many production teams adopt this as the safer default."
      },
      {
        q: "What is AsNoTrackingWithIdentityResolution?",
        a: "A middle ground between tracking and no-tracking. EF Core still de-duplicates entities — if the same row appears multiple times in a query result (via includes), you get one .NET instance — but doesn't watch for changes. Useful for read queries with complex joins where you don't want duplicate entity instances."
      },
      {
        q: "Can you modify an AsNoTracking entity and save it?",
        a: "Not directly — EF Core has no record of it. You can manually attach it via ctx.Update(entity) which sets state to Modified, then SaveChanges generates an UPDATE for all fields. Used in disconnected scenarios (web APIs editing detached entities)."
      }
    ],
    followUpQuestions: [
      { q: "Default behaviour?", a: "Tracking ON." },
      { q: "Skip tracking?", a: "AsNoTracking()." },
      { q: "Opt back in?", a: "AsTracking()." },
      { q: "Set context default to NoTracking?", a: "UseQueryTrackingBehavior." },
      { q: "Best for read-only?", a: "AsNoTracking." },
      { q: "Update detached entity?", a: "ctx.Update(entity) + SaveChanges." }
    ],
    commonMistakes: [
      "Forgetting AsNoTracking on hot read endpoints — wastes memory and CPU at scale.",
      "Using AsNoTracking and then editing the entity expecting SaveChanges to detect the change — it won't.",
      "Holding a long-lived DbContext with lots of tracked entities — memory keeps growing; use scoped lifetime per request.",
      "Mixing tracked and no-tracked entities of the same row in one query — two different .NET instances representing the same row."
    ],
    proTip: "Senior line: 'I set the context's default behaviour to NoTracking and opt in with .AsTracking() only on the few write paths. Read endpoints become 30-40% faster, memory drops, and there's zero risk of accidental updates from a stale tracked entity. Best small change you can make to almost any EF Core codebase.'"
  },

  // ============================================================
  // 14. EF Core vs Dapper
  // ============================================================
  {
    id: 'ef-vs-dapper',
    title: '14. EF Core vs Dapper',
    whatIsThis: [
      "EF Core is a full ORM — it maps C# entities to DB tables, generates SQL from LINQ, manages change tracking, migrations, and relationships. Dapper is a micro-ORM — a thin wrapper over ADO.NET that maps result rows to C# objects. You write the SQL; Dapper hydrates the objects.",
      "Simple meaning is — EF Core gives you the whole car (engine, GPS, comfort). Dapper gives you a fast bike — you steer manually but you go faster on straight roads."
    ],
    whyUseIt: [
      "EF Core saves time on CRUD-heavy apps — entities, migrations, change tracking, navigation properties — all built-in. Best when the schema and domain are tightly modelled in C#.",
      "Dapper wins on raw read performance and complex SQL — reports, dashboards, hand-tuned queries. Many real apps use both: EF Core for write paths and main domain, Dapper for hot read endpoints and reports."
    ],
    realLifeExample: [
      "Banking app: customer profile, accounts, transactions are managed via EF Core — entities, relationships, migrations. Clean and maintainable.",
      "Same app's 'Generate monthly statement' report runs a 200-line SQL with CTEs, window functions, and joins across 8 tables. That goes through Dapper — the SQL is hand-written for performance, Dapper just turns rows into C# DTOs."
    ],
    howItWorks: [
      "EF Core: map entities → write LINQ → EF translates to SQL → executes → materialises entities → tracks changes.",
      "Dapper: open SqlConnection → call connection.QueryAsync<T>(sql, params) → Dapper runs SQL → maps each row to T using property names → returns IEnumerable<T>.",
      "Dapper has no migrations, no change tracking, no LINQ. Just SQL in, objects out.",
      "Both support parameters (always use them — never string concatenation).",
      "Both work side-by-side on the same DB and even the same connection — no conflict."
    ],
    codeExample: `// EF Core — LINQ, with change tracking + entity object
using var ctx = new AppDb();
var orderEf = await ctx.Orders
    .Include(o => o.Items)
    .FirstAsync(o => o.Id == 42);

orderEf.Status = "Shipped";
await ctx.SaveChangesAsync();

// Dapper — raw SQL, fast read, tiny code
using var conn = new SqlConnection(cs);
const string sql = """
    SELECT o.Id, o.Item, o.Amount, c.Name AS CustomerName
    FROM   Orders o
    INNER JOIN Customers c ON c.Id = o.CustomerId
    WHERE  o.Id = @id
    """;

var orderDto = await conn.QuerySingleAsync<OrderDto>(sql, new { id = 42 });

// Both can coexist — EF for writes & main domain, Dapper for hot reads
public record OrderDto(int Id, string Item, decimal Amount, string CustomerName);`,
    codeOutput: `Benchmark — fetch 10,000 simple rows

EF Core (tracked)        : 220 ms,  48 MB
EF Core (AsNoTracking)   : 130 ms,  18 MB
Dapper                   :  90 ms,  12 MB
Raw ADO.NET              :  80 ms,  10 MB

Verdict:
  - For writes / CRUD entity workflows → EF Core wins on clarity
  - For hot read endpoints / reports   → Dapper wins on speed
  - Real apps usually use both`,
    interviewQuestions: [
      {
        q: "What is the difference between EF Core and Dapper?",
        a: "EF Core is a full ORM — entity mapping, LINQ-to-SQL, change tracking, migrations, relationships. Dapper is a micro-ORM — you write SQL by hand, Dapper just maps result rows to C# objects. EF gives you productivity; Dapper gives you raw speed and full SQL control. Different trade-offs for different jobs."
      },
      {
        q: "When would you choose Dapper over EF Core?",
        a: "Read-heavy or report-heavy paths where you need maximum speed and full control over the SQL. Complex queries with CTEs, window functions, hints, or unusual joins that LINQ struggles to express cleanly. Legacy DBs where the schema doesn't fit a modern domain model. Many teams use Dapper for hot reads and EF Core for writes."
      },
      {
        q: "Can EF Core and Dapper be used in the same project?",
        a: "Absolutely — and very commonly. Both can use the same connection string or even the same SqlConnection. Use EF Core for the main domain and write paths; drop into Dapper for hot read endpoints and reports. They don't conflict — they just serve different needs."
      },
      {
        q: "What are the disadvantages of Dapper?",
        a: "No migrations (manage schema yourself or via tool like FluentMigrator). No change tracking (must write UPDATE SQL by hand). No LINQ (raw SQL strings, easy to mistype, slower refactors). No relationship navigation (you join in SQL and assemble manually). Simplicity is its strength but also its limit."
      },
      {
        q: "Is EF Core slower than Dapper?",
        a: "Yes, generally — Dapper has less overhead per row (no tracker, no entity hydration with relationships). The gap shrinks dramatically when you use AsNoTracking and project to DTOs — EF Core can be within ~30% of Dapper for typical queries. For most CRUD apps the productivity gain of EF Core outweighs the perf cost."
      }
    ],
    followUpQuestions: [
      { q: "EF Core type?", a: "Full ORM." },
      { q: "Dapper type?", a: "Micro-ORM." },
      { q: "Faster for raw reads?", a: "Dapper." },
      { q: "Has change tracking?", a: "EF Core." },
      { q: "Has migrations?", a: "EF Core." },
      { q: "Run raw SQL in EF?", a: "FromSqlRaw / ExecuteSqlRawAsync." },
      { q: "Use both together?", a: "Yes, very common." }
    ],
    commonMistakes: [
      "Picking Dapper for a CRUD app and ending up reinventing migrations, mapping, and tracking by hand.",
      "Picking EF Core for a hot reporting endpoint when raw SQL via Dapper would be 3× faster.",
      "Concatenating SQL strings with user input in Dapper — SQL injection. Always use parameters (new { id = 42 }).",
      "Assuming Dapper is always faster — well-tuned EF Core (.AsNoTracking + projection) closes most of the gap."
    ],
    proTip: "Senior interview line: 'I default to EF Core for the main domain — entities, relationships, migrations, write paths. For hot reads and complex reports I drop into Dapper because hand-written SQL plus a thin mapper outruns ORM-generated SQL on those paths. Same connection string, two tools, right job for each.'"
  }
];
