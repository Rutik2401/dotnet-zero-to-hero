import { Topic } from './phase-1.types';

export const phase1Topics: Topic[] = [
  // ============================================================
  // 1. CLR, CTS, CLS
  // ============================================================
  {
    id: 'clr-cts-cls',
    title: '1. CLR, CTS, CLS',
    whatIsThis: [
      "CLR (Common Language Runtime) is the engine that actually runs our .NET code. When we write C#, the compiler does not directly make machine code — it makes IL (Intermediate Language). CLR takes that IL at runtime and converts it into machine code using JIT compiler, then runs it.",
      "CTS (Common Type System) is the rulebook that says how every data type should look (int, string, class, struct etc.). CLS (Common Language Specification) is a smaller rulebook on top of CTS, listing only those features that all .NET languages (C#, VB.NET, F#) must support, so they can talk to each other.",
      "Simple meaning is — CLR runs the program, CTS defines the types, CLS makes sure all .NET languages stay friendly with each other."
    ],
    whyUseIt: [
      "Because of CLR, C# code becomes platform independent inside the .NET world. Same compiled DLL can run on Windows, Linux, Mac (with .NET Core / .NET 8). The CLR also gives us free services like garbage collection, exception handling, and security — we don't need to write that code ourselves.",
      "CTS is why an int in C# and an Integer in VB.NET both map to System.Int32 — so we can use a class written in VB.NET inside our C# project without any problem. CLS is the reason a library author writes 'CLS-compliant' code, so any .NET language can consume it."
    ],
    realLifeExample: [
      "Think of CLR like the petrol engine of a car — every car company (C#, VB.NET, F#) makes a different car body, but they all use the same engine. We write code in our favourite language; the engine (CLR) is common.",
      "CTS is like the RTO rulebook — every car must have 4 wheels, 1 steering, 1 horn. CLS is like the highway rule — even smaller list, but if you follow it, your car can drive on every road (i.e. work with every .NET language)."
    ],
    howItWorks: [
      "We write C# code in Program.cs.",
      "C# compiler (Roslyn) compiles it into IL code + metadata, packaged inside a .dll or .exe (called assembly).",
      "When we run the assembly, CLR loads it.",
      "JIT (Just-In-Time) compiler inside CLR converts IL to native machine code for the current OS / CPU.",
      "CLR then executes the native code, while also handling garbage collection, type safety checks and exceptions in the background."
    ],
    codeExample: `using System;

class Program
{
    static void Main()
    {
        // 'int' is a C# alias for System.Int32 (defined by CTS)
        int a = 10;
        Console.WriteLine($"Type of a: {a.GetType()}");

        // string is a CTS reference type
        string name = "Rutik";
        Console.WriteLine($"Type of name: {name.GetType()}");

        // CLR gives us metadata via reflection — proof that types are common
        Console.WriteLine($"Assembly: {typeof(int).Assembly.GetName().Name}");
    }
}`,
    codeOutput: `Type of a: System.Int32
Type of name: System.String
Assembly: System.Private.CoreLib`,
    interviewQuestions: [
      {
        q: "What is CLR and why is it called managed runtime?",
        a: "CLR is the runtime engine of .NET. It loads our IL code, JIT-compiles it to machine code, and executes it. It is called 'managed' because the runtime manages memory (GC), security, exception handling, and type safety for us. Code that runs under CLR is called managed code; code that runs outside (like C++ DLL) is unmanaged code."
      },
      {
        q: "Difference between CTS and CLS?",
        a: "CTS (Common Type System) defines all data types that .NET supports — int, long, string, class, struct etc. CLS (Common Language Specification) is a subset of CTS — only the features common to all .NET languages. If we write a public API following CLS, any .NET language (C#, VB.NET, F#) can use it without problem. uint, for example, is in CTS but not in CLS, because VB.NET doesn't support unsigned int."
      },
      {
        q: "What is IL (Intermediate Language)?",
        a: "When C# code is compiled, it does not become machine code directly. It becomes IL — a CPU-independent low-level language. This IL is stored inside the .dll or .exe. At runtime, JIT compiler inside CLR converts IL to actual machine code for the current OS and CPU. This 2-step approach is what makes .NET cross-language and cross-platform."
      },
      {
        q: "What is JIT compilation?",
        a: "JIT (Just-In-Time) is the compiler inside CLR that converts IL into native machine code at runtime — only when the method is actually called for the first time. After that the native code is cached, so the next call is fast. There are also Tiered JIT and AOT (Ahead-of-Time) compilation in modern .NET for better startup performance."
      },
      {
        q: "What is the difference between managed and unmanaged code?",
        a: "Managed code runs under CLR — memory, GC, type safety are handled by .NET. Unmanaged code (like a C++ DLL or Win32 API) runs directly on the OS. To call unmanaged code from C# we use P/Invoke or DllImport. Mixing both is sometimes needed for performance or to call legacy APIs."
      }
    ],
    followUpQuestions: [
      { q: "Full form of CLR?", a: "Common Language Runtime." },
      { q: "Full form of CTS?", a: "Common Type System." },
      { q: "Full form of CLS?", a: "Common Language Specification." },
      { q: "What does JIT do?", a: "Converts IL to native machine code at runtime." },
      { q: "Where does IL sit?", a: "Inside the .dll / .exe assembly." },
      { q: "Is CLR same in .NET Framework and .NET Core?", a: "No, .NET Core uses CoreCLR — cross-platform version." }
    ],
    commonMistakes: [
      "Confusing CLR with .NET Framework — CLR is just the runtime engine, .NET Framework is the whole package (CLR + BCL + libraries).",
      "Thinking C# compiles directly into machine code — actually it compiles to IL first.",
      "Saying 'CTS = CLS' in interview — they are different. CTS is the full type system, CLS is the smaller cross-language subset.",
      "Forgetting that CLR also handles exceptions, security and threading — not just garbage collection."
    ],
    proTip: "In an interview, casually say: 'C# code first compiles into IL, sits inside the assembly, and CLR's JIT compiles it to native code only when a method is hit for the first time — that's why first call is slow and the second call is fast.' This single line shows you understand the actual execution flow, not just the buzzwords."
  },

  // ============================================================
  // 2. Value vs Reference Types
  // ============================================================
  {
    id: 'value-vs-reference-types',
    title: '2. Value Types vs Reference Types',
    whatIsThis: [
      "In C#, every type is either a Value Type or a Reference Type. Value types (int, double, bool, struct, enum) hold the actual data inside the variable itself. Reference types (class, string, array, delegate, interface) hold a reference (address) that points to the actual data sitting on the heap.",
      "Simple meaning is — value type variable is the dabba with the value inside; reference type variable is the dabba with the address slip telling where the value is kept."
    ],
    whyUseIt: [
      "Value types are fast and stored on the stack — good for small, fixed-size data like numbers, dates, coordinates. They get copied when passed around, so changes in one copy don't affect the other.",
      "Reference types live on the heap — good for objects with many fields, like a Customer or Order object. Multiple variables can point to the same object, so passing them is cheap (only the address travels)."
    ],
    realLifeExample: [
      "Value type is like writing your phone number on two separate paper slips. If your friend changes the number on his slip, your slip is unaffected — both are independent copies.",
      "Reference type is like sharing the same Google Doc link. You and your friend open the same doc; if your friend edits it, you see the change. Both variables point to the same object in memory."
    ],
    howItWorks: [
      "When you create a value type, memory is allocated on the stack (or inside the parent object).",
      "When you assign one value type to another, the value is copied bit by bit — two independent boxes.",
      "When you create a reference type, the object goes on the heap, and the variable on the stack just stores its address.",
      "When you assign one reference type to another, only the address is copied — both variables point to the same heap object.",
      "This is also why passing a class to a method can mutate the original, but passing a struct cannot (unless you use ref)."
    ],
    codeExample: `// Value type — copy by value
int a = 10;
int b = a;
b = 99;
Console.WriteLine($"a = {a}, b = {b}");  // a unchanged

// Reference type — copy by reference
int[] arr1 = { 1, 2, 3 };
int[] arr2 = arr1;
arr2[0] = 999;
Console.WriteLine($"arr1[0] = {arr1[0]}, arr2[0] = {arr2[0]}");

// struct vs class
struct PointS { public int X, Y; }
class   PointC { public int X, Y; }

var s1 = new PointS { X = 1 }; var s2 = s1; s2.X = 50;
var c1 = new PointC { X = 1 }; var c2 = c1; c2.X = 50;

Console.WriteLine($"struct: s1.X = {s1.X}, s2.X = {s2.X}");
Console.WriteLine($"class : c1.X = {c1.X}, c2.X = {c2.X}");`,
    codeOutput: `a = 10, b = 99
arr1[0] = 999, arr2[0] = 999
struct: s1.X = 1, s2.X = 50
class : c1.X = 50, c2.X = 50`,
    interviewQuestions: [
      {
        q: "What is the difference between value type and reference type?",
        a: "Value types store the actual value inside the variable, on the stack (mostly). Reference types store a pointer to the object, which lives on the heap. Assigning a value type creates an independent copy; assigning a reference type just copies the pointer, so both variables share the same object."
      },
      {
        q: "Is string a value type or reference type?",
        a: "string is a reference type — it lives on the heap. But it behaves 'like' a value type in two ways: == compares content not reference (overloaded), and strings are immutable (every change creates a new string). This is why most beginners confuse it."
      },
      {
        q: "What is the difference between struct and class?",
        a: "struct is a value type — stack allocated, copied on assignment, no inheritance (only interfaces). class is a reference type — heap allocated, supports inheritance. Use struct only for small, immutable, short-lived data (like a Point or Money). Use class for everything else."
      },
      {
        q: "What happens when you pass a class object to a method?",
        a: "The reference (address) is copied to the parameter. So inside the method, if you change the object's properties, the original object outside also changes — because both variables point to the same heap object. But if you reassign the parameter to a new object, the outside variable is not affected (unless you use ref)."
      },
      {
        q: "Where are local variables stored?",
        a: "Local variables of value type are on the stack. Local variables of reference type — the variable (the pointer) is on the stack, but the object it points to is on the heap. The stack is fast and auto-cleaned when the method exits; the heap is managed by GC."
      }
    ],
    followUpQuestions: [
      { q: "Is int a value type?", a: "Yes." },
      { q: "Is class a value type?", a: "No, reference type." },
      { q: "Is struct a value type?", a: "Yes." },
      { q: "Is string a value type?", a: "No, reference type (but behaves like value)." },
      { q: "Where is value type stored?", a: "Stack (mostly)." },
      { q: "Where is reference type stored?", a: "Heap; pointer is on stack." },
      { q: "Default value of int?", a: "0." },
      { q: "Default value of reference type?", a: "null." }
    ],
    commonMistakes: [
      "Treating string as a normal reference type and using ReferenceEquals to compare — for strings always use == or .Equals().",
      "Using struct for big objects with many fields — every assignment copies all the fields, which kills performance.",
      "Forgetting that passing a class to a method can mutate the original — this is a very common bug for beginners.",
      "Thinking that ref / out is needed for class objects to mutate them — not needed; class objects are already passed by reference."
    ],
    proTip: "In interview, say this line: 'Struct is value type, class is reference type. I pick struct only when the object is small (like a Point), short-lived, and naturally immutable. For everything else I use class — because struct copies on every assignment and that copy cost can hurt performance silently.'"
  },

  // ============================================================
  // 3. Boxing / Unboxing
  // ============================================================
  {
    id: 'boxing-unboxing',
    title: '3. Boxing & Unboxing',
    whatIsThis: [
      "Boxing means converting a value type (like int) into a reference type (object) by wrapping it inside an object on the heap. Unboxing is the reverse — taking that object back and extracting the original value type from it.",
      "Simple meaning is — boxing is putting your int inside a gift box (object) and storing it on the heap; unboxing is opening that box and taking the int out."
    ],
    whyUseIt: [
      "Sometimes we have an API that accepts object (like the old ArrayList, or Console.WriteLine(object)). When we pass an int to it, the runtime automatically boxes it. Unboxing happens when we cast it back to int.",
      "Modern code avoids this using generics (List<int>) — but in interviews this is a favourite question because boxing has a hidden performance cost (heap allocation + GC pressure)."
    ],
    realLifeExample: [
      "Imagine you have a 10-rupee coin (value type). To send it by courier (object API), you must put it inside a small box (boxing) — that box now sits in a warehouse (heap).",
      "When the courier reaches the destination, someone opens the box and takes out the coin again (unboxing). The coin itself is unchanged, but extra time and box material was used. Doing this 1 million times in a loop = serious performance loss."
    ],
    howItWorks: [
      "You assign an int to an object variable: object o = 10;",
      "CLR allocates a new object on the heap, copies the int 10 inside it. This is boxing.",
      "Now o is a reference pointing to that boxed int on the heap.",
      "When you do int x = (int)o; CLR checks the type, then copies the int value back from the heap into x. This is unboxing.",
      "If you cast to the wrong type (long instead of int), unboxing throws InvalidCastException."
    ],
    codeExample: `int num = 42;

// Boxing — value type wrapped into an object on the heap
object boxed = num;

// Unboxing — extract the int back from the object
int unboxed = (int)boxed;

Console.WriteLine($"num     = {num}");
Console.WriteLine($"boxed   = {boxed}");
Console.WriteLine($"unboxed = {unboxed}");

// Wrong unboxing — runtime crash
try
{
    long wrong = (long)boxed;   // boxed is int, not long
}
catch (InvalidCastException ex)
{
    Console.WriteLine($"Error: {ex.Message}");
}`,
    codeOutput: `num     = 42
boxed   = 42
unboxed = 42
Error: Specified cast is not valid.`,
    interviewQuestions: [
      {
        q: "What is boxing and unboxing in C#?",
        a: "Boxing is converting a value type (like int) into a reference type (object) — this allocates a new object on the heap and copies the value into it. Unboxing is the reverse — extracting the value type back from the object using a cast. Boxing is implicit, unboxing is explicit."
      },
      {
        q: "Why is boxing considered bad for performance?",
        a: "Because each boxing creates a new heap object, and the GC later has to clean it up. In a loop of millions of items this means millions of heap allocations and lots of GC pressure. That's why we use generics (List<int>) instead of non-generic ArrayList — generics avoid boxing completely."
      },
      {
        q: "Can boxing throw an exception?",
        a: "Boxing itself does not throw — it always succeeds (you can box any value type). Unboxing can throw InvalidCastException if the target type doesn't match exactly. For example, boxing an int and unboxing as long will fail at runtime."
      },
      {
        q: "How do generics solve the boxing problem?",
        a: "Generic collections like List<int> are strongly typed at compile time. The runtime creates a specialized List<int> internally, so the int values are stored directly without being wrapped into objects. No boxing, no GC pressure, type safety at compile time — three wins at once."
      },
      {
        q: "Does string concatenation cause boxing?",
        a: "It can. When you do $\"value = {someInt}\" the int is converted to string. In .NET Core 3+ this uses ISpanFormattable to avoid boxing for primitives. In older code, string.Format used to box. Always good to mention this 'avoiding boxing in modern .NET' point in interviews."
      }
    ],
    followUpQuestions: [
      { q: "Is boxing implicit or explicit?", a: "Implicit." },
      { q: "Is unboxing implicit or explicit?", a: "Explicit (needs cast)." },
      { q: "Where does the boxed value live?", a: "Heap." },
      { q: "Can unboxing throw?", a: "Yes, InvalidCastException." },
      { q: "Does List<int> cause boxing?", a: "No, generics avoid it." },
      { q: "Does ArrayList cause boxing?", a: "Yes, every int gets boxed." }
    ],
    commonMistakes: [
      "Using ArrayList instead of List<T> in modern code — silently boxes every value type.",
      "Unboxing to a different numeric type (like (long)boxedInt) — gives runtime InvalidCastException, even though both are numbers.",
      "Calling .ToString() on a struct via an object reference and not realising it caused boxing.",
      "Adding lots of value types to a non-generic Hashtable / ArrayList in a hot loop — slow and GC-heavy."
    ],
    proTip: "In an interview, say: 'I avoid boxing in hot paths by using generics like List<T> and Dictionary<TKey,TValue> instead of ArrayList or Hashtable. For very hot loops I also watch out for accidental boxing in interface calls on structs.' This shows you actually think about performance, not just syntax."
  },

  // ============================================================
  // 4. Garbage Collection
  // ============================================================
  {
    id: 'garbage-collection',
    title: '4. Garbage Collection (GC)',
    whatIsThis: [
      "Garbage Collection is .NET's automatic memory management. When you create objects with 'new', they go on the heap. When no part of your program is using them anymore, GC finds them and frees that memory. You don't write delete or free yourself — CLR does it.",
      "Simple meaning is — GC is the automatic safai-wala (cleaner) of your program. As soon as an object is unused, GC collects it and gives the memory back to the system."
    ],
    whyUseIt: [
      "In old languages like C/C++, the developer had to manually free memory using free() or delete. If you forget, you get memory leaks; if you free twice, you get a crash. GC removes this whole class of bugs by tracking object usage automatically.",
      "GC also organizes memory into Gen 0, Gen 1, Gen 2 — short-lived objects are cleaned faster than long-lived ones. This generational design makes GC fast and efficient."
    ],
    realLifeExample: [
      "Imagine your house. After every meal, dirty plates pile up. If you (developer) had to wash them every time, you'd waste time and forget some.",
      "GC is like a kaamwali bai who automatically comes when sink is full, washes only the plates nobody is using, and keeps the house clean. You just focus on cooking (your business logic)."
    ],
    howItWorks: [
      "Every new object is allocated in Generation 0 (Gen 0) — small and short-lived.",
      "When Gen 0 fills up, GC runs and collects unused Gen 0 objects. Surviving objects get promoted to Gen 1.",
      "Same for Gen 1 → Gen 2. Gen 2 holds long-lived objects (caches, singletons). Gen 2 collections are slower but rarer.",
      "GC uses a mark-and-sweep approach — it walks the object graph from 'roots' (static fields, locals, CPU registers), marks all reachable objects as live, then sweeps the rest.",
      "Large objects (>85,000 bytes) go directly into the LOH (Large Object Heap), which is managed differently."
    ],
    codeExample: `using System;

class Customer
{
    public string Name { get; set; } = "";
    ~Customer()  // finalizer — called by GC before destroying
    {
        Console.WriteLine($"GC destroyed: {Name}");
    }
}

class Program
{
    static void Main()
    {
        for (int i = 0; i < 3; i++)
            new Customer { Name = $"Customer-{i}" };

        // Force GC for demo (don't do this in real code)
        GC.Collect();
        GC.WaitForPendingFinalizers();

        Console.WriteLine($"Gen 0 collections: {GC.CollectionCount(0)}");
        Console.WriteLine($"Total memory     : {GC.GetTotalMemory(false)} bytes");
    }
}`,
    codeOutput: `GC destroyed: Customer-0
GC destroyed: Customer-1
GC destroyed: Customer-2
Gen 0 collections: 1
Total memory     : 88416 bytes`,
    interviewQuestions: [
      {
        q: "What is Garbage Collection in .NET?",
        a: "GC is CLR's automatic memory manager. It tracks all heap objects, finds the ones no longer reachable from any root (static field, local variable, CPU register), and reclaims their memory. The developer never writes 'free' or 'delete' — GC does it in the background."
      },
      {
        q: "What are the generations in GC?",
        a: "There are 3 generations: Gen 0 (newly created, short-lived), Gen 1 (survived one GC, medium-lived), Gen 2 (long-lived, like singletons and caches). GC runs Gen 0 most often (cheap), Gen 2 rarely (expensive). Plus there is LOH (Large Object Heap) for objects > 85 KB."
      },
      {
        q: "What is the difference between Dispose and Finalize?",
        a: "Finalize (~ClassName) is called by GC before destroying an object — it is non-deterministic, you don't know when. Dispose() is a method we call manually (or via using statement) to release unmanaged resources immediately. Always prefer Dispose for files, sockets, DB connections; finalize is just a safety net."
      },
      {
        q: "What is the IDisposable pattern?",
        a: "It's the standard pattern where a class implements IDisposable so the user can call Dispose() to release unmanaged resources (file handles, DB connections, sockets). Combined with the 'using' statement, it guarantees Dispose is called even if an exception happens. Example: using var conn = new SqlConnection(cs);"
      },
      {
        q: "Should we call GC.Collect() manually?",
        a: "Almost never. GC is highly optimized and knows the right time to run. Calling GC.Collect() yourself can hurt performance because you force expensive collections. Only valid use is in benchmarks, tests, or after a known huge memory release in long-running batch jobs."
      }
    ],
    followUpQuestions: [
      { q: "How many GC generations?", a: "3 — Gen 0, Gen 1, Gen 2." },
      { q: "Which Gen runs most often?", a: "Gen 0." },
      { q: "What is LOH?", a: "Large Object Heap, for objects > 85 KB." },
      { q: "Should we call GC.Collect()?", a: "No, almost never." },
      { q: "Difference between Dispose and Finalize?", a: "Dispose = manual + immediate, Finalize = automatic + later." },
      { q: "What does 'using' statement do?", a: "Calls Dispose() automatically at end of block." },
      { q: "Is GC deterministic?", a: "No, it runs when CLR decides." }
    ],
    commonMistakes: [
      "Calling GC.Collect() in normal code — it usually makes things slower, not faster.",
      "Forgetting to Dispose unmanaged resources (DB connections, file streams) and relying on finalizer — this delays cleanup and can leak handles.",
      "Holding references in static fields or event handlers without unsubscribing — these prevent GC from collecting the object (a common memory leak source).",
      "Thinking finalizer always runs — it does not run reliably during process shutdown."
    ],
    proTip: "In interview, drop this: 'GC handles managed memory automatically, but unmanaged resources like DB connections and file streams must be released explicitly via Dispose / using statement. The biggest source of memory leaks I see in real .NET projects is event handlers and static caches holding references they shouldn't.'"
  },

  // ============================================================
  // 5. Delegates
  // ============================================================
  {
    id: 'delegates',
    title: '5. Delegates',
    whatIsThis: [
      "A delegate is a type-safe pointer to a method. Instead of calling a method directly, you store the method reference inside a delegate variable, and call it later (or pass it to another method as a parameter).",
      "Simple meaning is — delegate is like saving someone's phone number. You can call them later, pass the number to your friend, or even store many numbers and call all of them one by one."
    ],
    whyUseIt: [
      "Delegates let us treat methods as data. We can pass behaviour into another method (callback), build event systems, write plugin-style architecture. Without delegates, LINQ, events, async callbacks would not exist in C#.",
      "They are the backbone of every 'event-driven' design — UI button clicks, async completions, observer patterns. Lambda and LINQ all sit on top of delegates."
    ],
    realLifeExample: [
      "Swiggy delivery — when food is ready, the restaurant doesn't know exactly which delivery boy will pick it. They just register a callback: 'whoever is free, take this order'. That callback is the delegate.",
      "When order is delivered, Swiggy app calls the registered callback to update the customer. Same delegate idea — you don't know exactly who will run, but you know what should happen when."
    ],
    howItWorks: [
      "Declare a delegate type — public delegate int Calc(int a, int b);",
      "Create a method matching that signature — int Add(int a, int b) => a + b;",
      "Assign the method to a delegate variable — Calc op = Add;",
      "Invoke the delegate — int result = op(2, 3);",
      "You can also use built-in delegates: Func<T,...,TResult> for return value, Action<T,...> for void, Predicate<T> for bool checks. Most modern code prefers these over custom delegates."
    ],
    codeExample: `// Custom delegate
delegate int Calc(int a, int b);

class Program
{
    static int Add(int a, int b) => a + b;
    static int Mul(int a, int b) => a * b;

    static void Main()
    {
        Calc op = Add;
        Console.WriteLine($"Add: {op(5, 3)}");

        op = Mul;
        Console.WriteLine($"Mul: {op(5, 3)}");

        // Multicast — chain multiple methods
        Action<string> notify = msg => Console.WriteLine($"SMS: {msg}");
        notify        += msg => Console.WriteLine($"Email: {msg}");
        notify("Order placed");

        // Built-in Func
        Func<int, int, int> sub = (x, y) => x - y;
        Console.WriteLine($"Sub: {sub(10, 4)}");
    }
}`,
    codeOutput: `Add: 8
Mul: 15
SMS: Order placed
Email: Order placed
Sub: 6`,
    interviewQuestions: [
      {
        q: "What is a delegate in C#?",
        a: "A delegate is a type-safe function pointer. It defines the signature of a method, and any method matching that signature can be assigned to a delegate variable and invoked through it. Delegates allow methods to be passed as parameters and stored in variables, which is the foundation for events, callbacks, and LINQ."
      },
      {
        q: "What is a multicast delegate?",
        a: "A multicast delegate holds references to multiple methods. When invoked, it calls all of them in the order they were added. We use += to add and -= to remove. Action and Func are multicast by default. This is exactly how events work under the hood."
      },
      {
        q: "Difference between Func, Action and Predicate?",
        a: "All three are built-in delegates. Func<...,TResult> takes input(s) and returns a value. Action<...> takes input(s) but returns void. Predicate<T> takes one input and returns bool. Most LINQ methods use Func internally; Action is for fire-and-forget operations like logging."
      },
      {
        q: "How are delegates and events related?",
        a: "An event is just a delegate field with restricted access — outside code can only += or -= subscribe / unsubscribe, but cannot directly invoke or reassign it. So events are 'safer delegates' designed for the publisher / subscriber pattern."
      },
      {
        q: "Can we use a lambda with a delegate?",
        a: "Yes, that's the most common usage today. Instead of writing a separate named method, we directly assign a lambda: Func<int,int> sq = x => x * x; The compiler turns the lambda into a method behind the scenes and assigns it to the delegate."
      }
    ],
    followUpQuestions: [
      { q: "Is delegate type-safe?", a: "Yes, signature must match." },
      { q: "Func vs Action?", a: "Func returns value, Action returns void." },
      { q: "Can a delegate hold many methods?", a: "Yes, multicast." },
      { q: "Operator to add a method?", a: "+=" },
      { q: "Operator to remove a method?", a: "-=" },
      { q: "Are events built on delegates?", a: "Yes." },
      { q: "Can a lambda be assigned to delegate?", a: "Yes." }
    ],
    commonMistakes: [
      "Forgetting to unsubscribe (-=) from event delegates — the publisher keeps holding the subscriber, causing memory leaks.",
      "Writing custom delegates when Func / Action / Predicate would do the job perfectly.",
      "Calling a multicast delegate that returns a value — only the last return value is captured, others are lost.",
      "Assuming delegate invocation is async — by default it is synchronous and blocks the caller."
    ],
    proTip: "In interview, mention: 'In modern C# I rarely declare custom delegates — Func, Action and Predicate cover 95% of cases. I use custom delegates only when ref / out parameters are needed or when the signature deserves a meaningful name in the API.'"
  },

  // ============================================================
  // 6. Events
  // ============================================================
  {
    id: 'events',
    title: '6. Events',
    whatIsThis: [
      "An event in C# is a special kind of delegate field that other classes can subscribe to (using +=) and unsubscribe from (using -=), but cannot directly fire or overwrite. The class that owns the event is called the publisher; the classes listening are called subscribers.",
      "Simple meaning is — event is like a WhatsApp broadcast list. Many people can join (subscribe), the admin sends the message (raises the event), and everyone joined gets it. Members cannot send broadcasts themselves."
    ],
    whyUseIt: [
      "Events let one class notify many other classes when something happens — without the publisher knowing who exactly is listening. This is the publisher-subscriber pattern, the heart of any UI framework or messaging system.",
      "They keep code loosely coupled. An OrderService can raise OrderPlaced event; EmailService and SmsService both subscribe. Tomorrow we add InvoiceService — no change in OrderService."
    ],
    realLifeExample: [
      "When you place an order on Amazon, multiple things happen automatically — confirmation email, SMS, payment processing, inventory update, dispatch alert. Amazon backend doesn't write a giant if/else; it raises an OrderPlaced event and many handlers respond.",
      "Tomorrow they add a 'loyalty points awarded' service — they just subscribe a new handler to the same event. No core code change — that's the power of events."
    ],
    howItWorks: [
      "Publisher class declares a delegate (or uses EventHandler) and an event field of that delegate type.",
      "Subscriber classes attach handler methods using +=.",
      "When the event happens, publisher 'raises' it by invoking the event field.",
      "All subscribed handlers run, one by one, in the order they were added.",
      "When a subscriber no longer wants to listen, it calls -= to detach. Forgetting this is a common cause of memory leaks."
    ],
    codeExample: `using System;

class OrderService
{
    public event Action<string>? OrderPlaced;

    public void PlaceOrder(string item)
    {
        Console.WriteLine($"Order received: {item}");
        OrderPlaced?.Invoke(item);
    }
}

class Program
{
    static void Main()
    {
        var service = new OrderService();

        service.OrderPlaced += item => Console.WriteLine($"Email sent for {item}");
        service.OrderPlaced += item => Console.WriteLine($"SMS sent for {item}");
        service.OrderPlaced += item => Console.WriteLine($"Inventory updated for {item}");

        service.PlaceOrder("iPhone 16");
    }
}`,
    codeOutput: `Order received: iPhone 16
Email sent for iPhone 16
SMS sent for iPhone 16
Inventory updated for iPhone 16`,
    interviewQuestions: [
      {
        q: "What is the difference between a delegate and an event?",
        a: "A delegate is a method reference type. An event is a wrapper on top of a delegate that restricts access — outside code can only += / -= subscribe, it cannot invoke the event or overwrite it. So an event is a 'safe delegate' meant for the publisher-subscriber pattern."
      },
      {
        q: "What is the publisher-subscriber pattern?",
        a: "The class that defines and raises the event is the publisher. Other classes that attach handlers using += are subscribers. The publisher does not know or care who the subscribers are. This decouples code: we can add or remove subscribers without changing the publisher."
      },
      {
        q: "Why can event handlers cause memory leaks?",
        a: "Because the publisher's event field keeps a reference to every subscribed handler. If a short-lived object subscribes to a long-lived publisher and forgets to unsubscribe, the publisher keeps it alive, and GC cannot collect it. Always unsubscribe in Dispose or when the object is no longer needed."
      },
      {
        q: "What is EventHandler<T>?",
        a: "EventHandler<TEventArgs> is a built-in delegate with signature (object sender, TEventArgs args). It is the standard convention for events in .NET — first parameter is the publisher, second carries the event data. Use it instead of custom delegates when possible."
      },
      {
        q: "Can an event have a return value?",
        a: "Technically yes if the underlying delegate returns a value, but it's a bad idea — when there are multiple subscribers, only the last return value is kept. Events should be void / Action so all handlers run cleanly."
      }
    ],
    followUpQuestions: [
      { q: "Operator to subscribe?", a: "+=" },
      { q: "Operator to unsubscribe?", a: "-=" },
      { q: "Can an outsider invoke an event?", a: "No, only the declaring class." },
      { q: "Standard event delegate?", a: "EventHandler<T>." },
      { q: "Events leak when?", a: "When subscribers don't unsubscribe." },
      { q: "Are events synchronous?", a: "Yes, by default." }
    ],
    commonMistakes: [
      "Not unsubscribing — keeps the subscriber alive and causes memory leaks.",
      "Raising an event without null check — if no one subscribed, invoking null delegate crashes. Use eventName?.Invoke(...).",
      "Using events when a simple method call or async callback would do.",
      "Mutating shared state inside event handlers without thread safety — events can be raised on any thread."
    ],
    proTip: "Senior line for interview: 'I always raise events using the null-conditional ?.Invoke pattern, and in any class that subscribes to a long-lived publisher, I unsubscribe in Dispose. Forgetting to unsubscribe is the silent killer in long-running .NET apps.'"
  },

  // ============================================================
  // 7. Lambda Expressions
  // ============================================================
  {
    id: 'lambda-expressions',
    title: '7. Lambda Expressions',
    whatIsThis: [
      "A lambda expression is a short, inline, anonymous function — written using the => syntax. Instead of writing a full method with name and curly braces, we write the logic in one line and pass it directly where a delegate or expression tree is expected.",
      "Simple meaning is — lambda is a chhota function without a name. Useful when you want to write small logic on the spot, like inside LINQ or event handlers."
    ],
    whyUseIt: [
      "Lambdas make code shorter and more readable. Instead of declaring a separate method just to filter a list, you write list.Where(x => x.Age > 18) right there.",
      "They are the standard way to use LINQ, Func / Action delegates, async callbacks, and event handlers. Without lambdas, modern C# would feel like Java 1.4."
    ],
    realLifeExample: [
      "Imagine you ask your friend: 'Filter all customers above 18'. You don't write a 10-line procedure — you just say one short rule. That short rule is the lambda.",
      "On Swiggy app, when you tap 'Sort by rating', behind the scenes a lambda like restaurants.OrderByDescending(r => r.Rating) runs. One line — clear intent."
    ],
    howItWorks: [
      "Compiler sees x => x * 2 and automatically infers — input type, return type, and a delegate type.",
      "It generates a hidden method behind the scenes containing your lambda body.",
      "If the lambda uses a variable from the surrounding scope, the compiler creates a closure (a small class) to capture that variable.",
      "The lambda is then assigned to a delegate (Func<int,int>) and invoked like a normal method.",
      "If used inside Expression<Func<...>> (LINQ to SQL / EF), the lambda becomes an expression tree instead of code — used to build SQL queries."
    ],
    codeExample: `using System;
using System.Linq;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        // Lambda with Func
        Func<int, int> square = x => x * x;
        Console.WriteLine(square(5));

        // Lambda with Action
        Action<string> greet = name => Console.WriteLine($"Hi {name}");
        greet("Rutik");

        // Lambda inside LINQ
        var nums = new List<int> { 1, 2, 3, 4, 5, 6 };
        var evens = nums.Where(n => n % 2 == 0).Select(n => n * 10);
        Console.WriteLine(string.Join(", ", evens));

        // Closure — captures outer variable
        int factor = 3;
        Func<int, int> times = n => n * factor;
        Console.WriteLine(times(10));
    }
}`,
    codeOutput: `25
Hi Rutik
20, 40, 60
30`,
    interviewQuestions: [
      {
        q: "What is a lambda expression?",
        a: "A lambda is a short anonymous function written with the => syntax. The left side is the input parameters; the right side is the body. It is used where a delegate is expected — most commonly with LINQ, Func / Action, and event handlers. The compiler infers types and generates the actual method behind the scenes."
      },
      {
        q: "What is a closure in C#?",
        a: "A closure is when a lambda captures a variable from the surrounding scope and uses it inside its body. The compiler creates a hidden class that holds that variable, so the lambda can use it even after the outer method has returned. This is powerful but can also surprise you in loops if you capture the loop variable incorrectly."
      },
      {
        q: "Difference between Func and lambda?",
        a: "They are different things. Func is a built-in delegate type that defines the signature of a method that takes inputs and returns a value. A lambda is a way to write a method body inline. We assign a lambda to a Func — the lambda is the value, Func is the type."
      },
      {
        q: "Can we use multiple statements inside a lambda?",
        a: "Yes — use curly braces. Example: x => { Console.WriteLine(x); return x * 2; }. But for readability, multi-statement lambdas are usually a sign you should extract them into a normal method."
      },
      {
        q: "What is an expression tree?",
        a: "When a lambda is assigned to Expression<Func<...>> instead of Func<...>, the compiler doesn't compile it into code — it creates a tree representation. EF Core / LINQ to SQL use this tree to translate the lambda into SQL at runtime. That's why some lambdas work in LINQ to Objects but fail in EF Core."
      }
    ],
    commonMistakes: [
      "Capturing a loop variable in a lambda inside a for loop and getting all results pointing to the same final value — fix by copying into a local variable inside the loop.",
      "Writing huge multi-line lambdas — kills readability; better to extract a named method.",
      "Confusing Expression<Func<...>> with Func<...> — first builds a tree (used by EF), second is real code.",
      "Believing lambdas are 'free' — closures allocate a hidden object on the heap, which can matter in tight loops."
    ],
    proTip: "Drop this in interview: 'I keep lambdas one-liners. The moment a lambda crosses 2-3 lines, I extract it into a named method — both for readability and for easier debugging, because stack traces inside lambdas are harder to read.'"
  },

  // ============================================================
  // 8. LINQ
  // ============================================================
  {
    id: 'linq',
    title: '8. LINQ (Language Integrated Query)',
    whatIsThis: [
      "LINQ is a feature in C# that lets us query and transform data using a clean, readable, SQL-like syntax — but written directly inside C# code. The same query works on collections, XML, and databases (via providers like EF Core).",
      "Simple meaning is — LINQ is a data ka filter, sort, group toolkit. Whether the data sits in a List, a SQL table, or an XML file, LINQ lets us write the query the same way."
    ],
    whyUseIt: [
      "Without LINQ we write loops and if/else to filter, sort, group data. With LINQ all that becomes one chain of methods like .Where(...).OrderBy(...).Select(...). Less code, fewer bugs, easier to read.",
      "LINQ also gives us deferred execution — the query is not run until we actually iterate or call ToList(). This means we can build queries piece by piece and the database (in EF Core) sees the final optimized SQL."
    ],
    realLifeExample: [
      "Swiggy: show only restaurants in my area, that are open right now, sort by rating, and pick top 10. In old style we'd write a big foreach loop with multiple if conditions.",
      "With LINQ: restaurants.Where(r => r.City == 'Pune' && r.IsOpen).OrderByDescending(r => r.Rating).Take(10). One line, clear intent, easy to maintain."
    ],
    howItWorks: [
      "LINQ exposes extension methods on IEnumerable<T> (Where, Select, OrderBy, GroupBy, Join, etc.) defined in System.Linq.",
      "Each method takes a lambda as its filter / projection / key selector.",
      "Methods return a new IEnumerable (or IQueryable for EF) — they do NOT modify the original collection.",
      "Queries are deferred — they run only when iterated (foreach, ToList, ToArray, First, Count).",
      "On EF Core, LINQ is translated into SQL using expression trees, so filters and joins run on the database, not in memory."
    ],
    codeExample: `using System;
using System.Linq;
using System.Collections.Generic;

record Order(string Customer, string City, decimal Amount);

class Program
{
    static void Main()
    {
        var orders = new List<Order>
        {
            new("Rutik", "Pune", 1200),
            new("Aman",  "Pune", 800),
            new("Priya", "Mumbai", 2500),
            new("Vikas", "Pune", 400),
            new("Neha",  "Mumbai", 1500),
        };

        // Where + OrderBy + Select
        var puneBigOrders = orders
            .Where(o => o.City == "Pune" && o.Amount > 500)
            .OrderByDescending(o => o.Amount)
            .Select(o => $"{o.Customer} - ₹{o.Amount}");

        Console.WriteLine("Pune big orders:");
        foreach (var line in puneBigOrders) Console.WriteLine("  " + line);

        // GroupBy with aggregate
        var byCity = orders
            .GroupBy(o => o.City)
            .Select(g => new { City = g.Key, Total = g.Sum(o => o.Amount) });

        Console.WriteLine("\nCity totals:");
        foreach (var row in byCity) Console.WriteLine($"  {row.City} = ₹{row.Total}");
    }
}`,
    codeOutput: `Pune big orders:
  Rutik - ₹1200
  Aman - ₹800

City totals:
  Pune = ₹2400
  Mumbai = ₹4000`,
    interviewQuestions: [
      {
        q: "What is LINQ?",
        a: "LINQ (Language Integrated Query) is a set of features in C# that let us query collections, databases, XML, and other data sources using a uniform, SQL-like syntax. It uses extension methods on IEnumerable<T> / IQueryable<T> and lambdas to express filters, projections, joins, grouping, etc."
      },
      {
        q: "What is deferred execution in LINQ?",
        a: "LINQ queries are not executed when defined — they only run when the result is enumerated (foreach, ToList, ToArray, Count, First). This allows multiple queries to be chained efficiently, and in EF Core the entire chain is translated into one SQL query at the end."
      },
      {
        q: "Difference between Select and SelectMany?",
        a: "Select projects each element into a single new shape — list of N gives list of N. SelectMany flattens — if each element returns its own list, SelectMany combines them all into one flat list. Use SelectMany when you have nested collections (Customer → Orders) and want a single flat list of orders."
      },
      {
        q: "Difference between First, FirstOrDefault, Single, SingleOrDefault?",
        a: "First returns the first match, throws if none. FirstOrDefault returns the first or default (null / 0) if none. Single returns exactly one match, throws if zero or many. SingleOrDefault returns one or default, throws if many. Use Single when business logic guarantees uniqueness — it acts as a safety check."
      },
      {
        q: "Difference between IEnumerable and IQueryable in LINQ?",
        a: "IEnumerable<T> works in memory — LINQ to Objects. IQueryable<T> represents a query against a remote source (EF Core / SQL) — the query is built as an expression tree and translated to SQL on execution. Use IQueryable while building DB queries; switch to IEnumerable only after data is loaded."
      }
    ],
    followUpQuestions: [
      { q: "What is LINQ?", a: "Query syntax integrated into C# for collections / DB / XML." },
      { q: "Where filter operator?", a: ".Where(x => ...)." },
      { q: "Sort operator?", a: ".OrderBy / .OrderByDescending." },
      { q: "Group operator?", a: ".GroupBy(x => x.Key)." },
      { q: "First with default?", a: "FirstOrDefault." },
      { q: "How to materialize?", a: "ToList() / ToArray() / ToDictionary()." },
      { q: "Is LINQ deferred?", a: "Yes, until enumerated." },
      { q: "Does LINQ modify the source?", a: "No, returns a new sequence." }
    ],
    commonMistakes: [
      "Iterating the same LINQ query multiple times — it re-runs every time. Call ToList() once if you need the results repeatedly.",
      "Using Single when First was intended — Single throws if there are 2+ matches, breaking unrelated requests.",
      "Calling ToList() too early in EF Core — pulls everything into memory and kills DB-side filtering.",
      "Mixing LINQ method syntax and query syntax randomly — pick one style per query for readability."
    ],
    proTip: "Senior line: 'In EF Core I keep my queries as IQueryable till the very end so the filtering happens in SQL — calling ToList() too early loads the whole table into memory and is a performance trap I check for in every code review.'"
  },

  // ============================================================
  // 9. Async / Await
  // ============================================================
  {
    id: 'async-await',
    title: '9. Async / Await',
    whatIsThis: [
      "async / await is C#'s way of writing non-blocking asynchronous code that still looks like normal step-by-step code. We mark a method async, return Task or Task<T>, and use await on any operation that takes time (DB call, HTTP call, file read).",
      "Simple meaning is — async/await lets your code 'wait without blocking'. While one operation is in flight (DB / API), the thread is freed up to do other work, and your code resumes when the result is ready."
    ],
    whyUseIt: [
      "In a web API, every request uses a thread from the thread pool. If the request blocks waiting on a DB call, that thread is wasted. With async/await, the thread is released back to the pool while waiting — so the same server can handle many more concurrent requests.",
      "In UI apps, blocking the UI thread freezes the screen. async/await lets long operations run without freezing. Net result — better scalability on the backend, smoother UX on the frontend."
    ],
    realLifeExample: [
      "Imagine ordering coffee at Starbucks. Old way (synchronous) — barista takes your order, makes it, hands it over, only then takes the next person's order. Whole queue is blocked.",
      "New way (async) — barista takes your order, starts the machine, immediately takes the next order. When your coffee is ready they hand it to you. Same barista (thread) handles many customers (requests) at once — no one is blocked unnecessarily."
    ],
    howItWorks: [
      "You mark the method with async and return Task / Task<T> / ValueTask.",
      "Inside, you use await someAsyncCall(). Compiler splits the method into a state machine at every await.",
      "When await is hit, if the awaited Task is not yet complete, the method returns control to the caller — the thread is freed.",
      "When the Task completes, the runtime resumes the method (often on a thread-pool thread) from where it left off.",
      "Final result is wrapped back into a Task<T> and returned to the original caller."
    ],
    codeExample: `using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.Diagnostics;

class Program
{
    static async Task Main()
    {
        var sw = Stopwatch.StartNew();

        // Run two slow operations in parallel
        Task<string> t1 = FetchAsync("Order");
        Task<string> t2 = FetchAsync("Payment");

        string[] results = await Task.WhenAll(t1, t2);
        Console.WriteLine(results[0]);
        Console.WriteLine(results[1]);

        Console.WriteLine($"Total: {sw.ElapsedMilliseconds} ms");
    }

    static async Task<string> FetchAsync(string name)
    {
        await Task.Delay(1000); // pretend DB / API call
        return $"{name} fetched";
    }
}`,
    codeOutput: `Order fetched
Payment fetched
Total: 1015 ms`,
    interviewQuestions: [
      {
        q: "What is async / await in C#?",
        a: "async / await is C#'s native syntax for asynchronous programming. async marks a method as asynchronous and changes its return type to Task / Task<T>. await pauses the method at that point without blocking the thread, and resumes when the awaited Task completes. The compiler rewrites the method into a state machine to make this work."
      },
      {
        q: "What is the difference between Task and Thread?",
        a: "A Thread is an OS-level thread — heavy, expensive to create. A Task is a higher-level abstraction representing 'a unit of work that may complete in the future'. Tasks are scheduled onto threads from the thread pool, so many Tasks share few threads. Async code creates Tasks, not Threads."
      },
      {
        q: "What is the difference between async and parallel?",
        a: "Async is about not blocking on I/O — one thread can handle many in-flight operations. Parallel is about doing CPU-bound work on multiple threads at the same time. Web APIs benefit from async (lots of waiting). CPU-heavy code benefits from parallel (lots of crunching). They solve different problems."
      },
      {
        q: "What does ConfigureAwait(false) do?",
        a: "By default, after await the method resumes on the original SynchronizationContext (UI thread, ASP.NET request context). ConfigureAwait(false) tells the runtime: 'don't bother resuming on the original context, any thread is fine.' This is recommended in library code to avoid deadlocks and improve performance. Not needed in ASP.NET Core (no SynchronizationContext)."
      },
      {
        q: "What is the deadlock scenario with async code?",
        a: "Calling .Result or .Wait() on an async method from the UI / old-ASP.NET context can deadlock. The blocking call holds the thread, but the awaited Task tries to resume on that same thread → deadlock. Solution: use await all the way down (no .Result, no .Wait), or use ConfigureAwait(false)."
      }
    ],
    followUpQuestions: [
      { q: "Return type of async method?", a: "Task / Task<T> / ValueTask / void (avoid void)." },
      { q: "Does async create a new thread?", a: "No, by itself it does not." },
      { q: "What does await do?", a: "Pauses without blocking, resumes when Task completes." },
      { q: "What runs many Tasks parallel?", a: "Task.WhenAll / Task.WhenAny." },
      { q: "Is async good for CPU-bound work?", a: "No, use Task.Run / Parallel for that." },
      { q: "Can constructor be async?", a: "No." },
      { q: "Avoid async void because?", a: "Exceptions can crash the process." }
    ],
    commonMistakes: [
      "Calling .Result or .Wait() on an async method — can deadlock and definitely blocks the thread.",
      "Marking a method async but never awaiting anything — gives compiler warning and runs synchronously.",
      "Using async void anywhere except event handlers — exceptions are unhandled and can crash the app.",
      "Not using Task.WhenAll for independent calls — running them sequentially when they could run in parallel."
    ],
    proTip: "Drop in interview: 'In ASP.NET Core I use async all the way — no .Result or .Wait. For independent calls I use Task.WhenAll so they run in parallel and total latency drops to the slowest one. async void is reserved only for event handlers — anywhere else it silently swallows exceptions.'"
  },

  // ============================================================
  // 10. Exception Handling
  // ============================================================
  {
    id: 'exception-handling',
    title: '10. Exception Handling',
    whatIsThis: [
      "Exception handling is how we catch and respond to errors in our program — instead of letting it crash. We wrap risky code in a try block, catch specific exceptions in catch blocks, and use finally for cleanup that must run no matter what.",
      "Simple meaning is — try/catch is a safety net. If something goes wrong (DB down, file missing, bad input), we catch it gracefully and decide what to do — log it, show a message, retry, or rethrow."
    ],
    whyUseIt: [
      "Without exception handling, a single error crashes the whole program. With it, we can log the issue, show a friendly message to the user, and keep the app running.",
      "Different exceptions need different handling — a network timeout may need a retry, a validation error needs to go back to the user, an unknown error should be logged and surfaced. try/catch lets us split logic by type."
    ],
    realLifeExample: [
      "On IRCTC, when payment fails, the app doesn't crash. It catches the failure, shows 'Payment failed, please try again', and lets you retry. That graceful handling is exception handling at work.",
      "Same on ATM — if card is damaged or PIN is wrong, machine doesn't shut down; it shows an error and ejects the card. The error is caught, handled, and the system continues to serve next user."
    ],
    howItWorks: [
      "When an exception is thrown, CLR walks up the call stack looking for a matching catch block.",
      "If found, control jumps into that catch block. Variables and stack between throw and catch are unwound.",
      "If no matching catch is found, the exception bubbles all the way up — the program (or thread) crashes.",
      "finally block always runs — whether exception was thrown or not, whether it was caught or not — used for cleanup like closing files / DB connections.",
      "We can rethrow with throw; (preserves the stack trace) — never use throw ex; as it resets the stack trace and loses debug info."
    ],
    codeExample: `using System;

class Program
{
    static void Main()
    {
        try
        {
            int[] nums = { 1, 2, 3 };
            Console.WriteLine(nums[5]);   // out of range
        }
        catch (IndexOutOfRangeException ex)
        {
            Console.WriteLine($"Index error: {ex.Message}");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Other error: {ex.Message}");
        }
        finally
        {
            Console.WriteLine("Cleanup always runs");
        }

        // Custom exception
        try { Withdraw(5000, balance: 1000); }
        catch (InvalidOperationException ex) { Console.WriteLine(ex.Message); }
    }

    static void Withdraw(decimal amount, decimal balance)
    {
        if (amount > balance)
            throw new InvalidOperationException("Insufficient balance");
    }
}`,
    codeOutput: `Index error: Index was outside the bounds of the array.
Cleanup always runs
Insufficient balance`,
    interviewQuestions: [
      {
        q: "What is the difference between throw and throw ex?",
        a: "throw; rethrows the original exception preserving the original stack trace. throw ex; rethrows but resets the stack trace to the current line, hiding where the error actually happened. Always use throw; when rethrowing — never throw ex;."
      },
      {
        q: "What is the order of try / catch / finally?",
        a: "try comes first with the risky code. catch blocks come after — most specific exception type first, then more general. finally comes last and always runs, used for cleanup. Catch order matters: if you put catch (Exception) first, no other catch will ever run — it would catch everything."
      },
      {
        q: "What is the difference between Exception and Error in .NET?",
        a: ".NET only has Exception; there is no separate Error class like Java. All exceptions derive from System.Exception. Some are 'runtime' (NullReferenceException, IndexOutOfRangeException) and some are 'business / I/O' (FileNotFoundException, SqlException). We catch the specific ones we can handle."
      },
      {
        q: "What is a finally block, and is it guaranteed to run?",
        a: "finally runs after try (and catch if any) — whether or not an exception happened. It is used for cleanup like closing files, DB connections, releasing locks. It runs in almost all cases except a hard process kill (Environment.FailFast, power off, OOM in some cases)."
      },
      {
        q: "What is a custom exception and when do we create one?",
        a: "A custom exception is a class that inherits from Exception (or a more specific built-in). We create one when we have a domain-specific error that needs to be caught separately — like InsufficientBalanceException, OrderAlreadyShippedException. Helps callers handle business errors without parsing strings."
      }
    ],
    followUpQuestions: [
      { q: "Base class of all exceptions?", a: "System.Exception." },
      { q: "throw vs throw ex?", a: "throw preserves stack, throw ex resets it." },
      { q: "Is finally always called?", a: "Almost always, except FailFast / power off." },
      { q: "Can we have multiple catch blocks?", a: "Yes, specific to general." },
      { q: "Can we have try without catch?", a: "Yes, with finally." },
      { q: "What is exception filter (when keyword)?", a: "Catch only when condition true." },
      { q: "Custom exception inherits from?", a: "Exception (or subclass)." }
    ],
    commonMistakes: [
      "Using throw ex; instead of throw; — destroys the original stack trace, makes debugging painful.",
      "Catching Exception (base class) everywhere — hides bugs and swallows errors silently.",
      "Empty catch blocks — code keeps running with broken state, very dangerous.",
      "Using exceptions for normal control flow (if/else replacement) — exceptions are slow and meant for exceptional cases."
    ],
    proTip: "Senior interviewer hook: 'I never write throw ex — I use throw; to preserve the original stack trace. I also never catch Exception except at the very top of the request pipeline; below that, I catch only specific exceptions I know how to handle. Anything I can't handle, I let bubble up to the global error handler.'"
  },

  // ============================================================
  // 11. Collections — List, Dictionary, HashSet
  // ============================================================
  {
    id: 'collections',
    title: '11. Collections — List, Dictionary, HashSet',
    whatIsThis: [
      "Collections are containers that hold groups of objects. The three most common are List<T> (ordered, indexed list), Dictionary<TKey, TValue> (key-value pairs with fast lookup), and HashSet<T> (unique values, no duplicates).",
      "Simple meaning is — List is like a notebook (ordered entries), Dictionary is like a phone book (name → number), HashSet is like a guest list (each name only once)."
    ],
    whyUseIt: [
      "Different data shapes need different containers. List is perfect when order matters and we access by index. Dictionary shines when we need to find a value by a known key (O(1) lookup). HashSet is the right choice when we only care about uniqueness and want fast 'is this present?' checks.",
      "Picking the right collection makes code faster and clearer. Wrong choice (like searching in a List with millions of items every time) leads to slow code and ugly loops."
    ],
    realLifeExample: [
      "Swiggy cart items — order matters, can have duplicates of same dish → List<Item>.",
      "Customer profile lookup by mobile number → Dictionary<string, Customer>. Instant find without scanning everyone.",
      "Coupon codes already used by a customer → HashSet<string>. Each code only once; checking 'has this user used this coupon?' is O(1)."
    ],
    howItWorks: [
      "List<T> is a dynamic array — internally an array that grows when capacity is exceeded. Index access is O(1), insert at end is O(1) amortised, search is O(n).",
      "Dictionary<TKey,TValue> is a hash table — uses GetHashCode() of the key to bucket entries. Lookup, add, remove are O(1) average.",
      "HashSet<T> is also a hash table but stores only the value. Add, Contains, Remove are O(1) average.",
      "All three are generic — strongly typed at compile time, no boxing for value types.",
      "Dictionary keys must implement GetHashCode and Equals correctly — for custom classes, override these or you'll get bugs."
    ],
    codeExample: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        // List — ordered, allows duplicates
        var cart = new List<string> { "Pizza", "Coke", "Pizza" };
        cart.Add("Burger");
        Console.WriteLine($"Cart count: {cart.Count}, first: {cart[0]}");

        // Dictionary — key → value, fast lookup
        var phone = new Dictionary<string, string>
        {
            ["Rutik"] = "9999",
            ["Aman"]  = "8888"
        };
        phone["Priya"] = "7777";
        if (phone.TryGetValue("Aman", out var num))
            Console.WriteLine($"Aman's number: {num}");

        // HashSet — unique values, fast Contains
        var usedCoupons = new HashSet<string>();
        usedCoupons.Add("FIRST50");
        bool added = usedCoupons.Add("FIRST50");      // duplicate
        Console.WriteLine($"Added again? {added}, count: {usedCoupons.Count}");
    }
}`,
    codeOutput: `Cart count: 4, first: Pizza
Aman's number: 8888
Added again? False, count: 1`,
    interviewQuestions: [
      {
        q: "What is the difference between List, Dictionary and HashSet?",
        a: "List<T> is an ordered, indexed collection that allows duplicates — best for sequences. Dictionary<TKey, TValue> stores key-value pairs with O(1) lookup by key. HashSet<T> stores only unique values with O(1) Contains. List is for order, Dictionary is for lookup by key, HashSet is for uniqueness."
      },
      {
        q: "What is the time complexity of Dictionary lookup?",
        a: "O(1) on average — because it uses a hash table. Worst case O(n) when many keys collide (poor GetHashCode), but in practice it stays close to O(1). This is why Dictionary is ideal for frequent lookups by key."
      },
      {
        q: "Why does Dictionary need GetHashCode and Equals?",
        a: "Dictionary uses GetHashCode() of the key to decide which bucket the entry goes into. When checking if a key exists, it computes the hash, finds the bucket, then uses Equals() to compare keys exactly. If a custom class doesn't override these correctly, equal keys may go into different buckets and lookup fails silently."
      },
      {
        q: "What is the difference between IEnumerable and ICollection and IList?",
        a: "IEnumerable<T> only allows iteration (foreach). ICollection<T> adds Count, Add, Remove, Contains. IList<T> adds index access ([i]) and Insert at index. List<T> implements all three. Use the smallest interface needed in method signatures — easier to mock and substitute later."
      },
      {
        q: "When would you use HashSet over List?",
        a: "When uniqueness matters and you frequently check 'does this exist?'. HashSet.Contains is O(1), List.Contains is O(n). Example: tracking which user IDs have voted, which coupons are used, which products are in a wishlist. If order doesn't matter, HashSet wins."
      }
    ],
    followUpQuestions: [
      { q: "List allows duplicates?", a: "Yes." },
      { q: "HashSet allows duplicates?", a: "No." },
      { q: "Dictionary lookup complexity?", a: "O(1) average." },
      { q: "Dictionary key duplicate?", a: "Throws ArgumentException." },
      { q: "Use List when?", a: "Order matters, index access needed." },
      { q: "Use Dictionary when?", a: "Need fast lookup by key." },
      { q: "Use HashSet when?", a: "Need uniqueness and fast Contains." },
      { q: "Generic vs non-generic?", a: "Generic is type-safe and avoids boxing." }
    ],
    commonMistakes: [
      "Using List.Contains in a tight loop on huge data — should be HashSet for O(1) check.",
      "Adding to a Dictionary with a duplicate key — throws. Use TryAdd or check ContainsKey first.",
      "Forgetting to override GetHashCode and Equals on custom Dictionary keys — silent bugs.",
      "Using non-generic ArrayList / Hashtable in modern code — slower, type-unsafe, and causes boxing for value types."
    ],
    proTip: "Senior line: 'When I see Contains() inside a loop on a List, I almost always replace it with a HashSet — it changes the algorithm from O(n²) to O(n) and is a one-line fix that has saved me real production hot paths more than once.'"
  },

  // ============================================================
  // 12. IEnumerable vs IQueryable
  // ============================================================
  {
    id: 'ienumerable-vs-iqueryable',
    title: '12. IEnumerable vs IQueryable',
    whatIsThis: [
      "IEnumerable<T> represents a sequence of items in memory — it can be iterated with foreach. IQueryable<T> represents a query against a remote data source (like a database via EF Core) — it builds an expression tree that gets translated into SQL.",
      "Simple meaning is — IEnumerable works on data already loaded in memory. IQueryable works on data that lives somewhere else (DB), and tries to push the filtering work to that source."
    ],
    whyUseIt: [
      "Picking the right one decides whether your app loads 10 rows or 10 million rows. IEnumerable filters happen in C# memory after data is loaded. IQueryable filters happen on the database side — only the matching rows come over the wire.",
      "In EF Core, keeping queries as IQueryable until the very end lets the database do the heavy lifting (Where, Join, OrderBy, paging). Switching to IEnumerable / List too early kills DB-side optimisation."
    ],
    realLifeExample: [
      "IEnumerable is like getting all 10 lakh customers from SBI server to your laptop, then filtering 'Pune customers' on your laptop. Network is choked, RAM is full.",
      "IQueryable is like asking SBI server: 'Send me only Pune customers'. Server runs the filter, you receive only the relevant ones. Same business need, but smarter."
    ],
    howItWorks: [
      "IEnumerable<T> exposes GetEnumerator() — pulls items one by one from an in-memory source.",
      "When you chain LINQ on IEnumerable, each method returns another IEnumerable, but all execution happens in memory after the source is fully loaded.",
      "IQueryable<T> exposes Provider and Expression — lambdas are stored as expression trees, not executable code.",
      "When you finally call ToList() / ToArray() / Count(), the LINQ provider (e.g. EF Core) walks the expression tree and translates it into SQL.",
      "Database runs that SQL and returns only the result rows — minimum data transfer, maximum DB optimisation."
    ],
    codeExample: `using System;
using System.Linq;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        var customers = new List<string> { "Rutik", "Aman", "Priya", "Vikas" };

        // IEnumerable — runs in memory
        IEnumerable<string> startsWithR = customers.Where(c => c.StartsWith("R"));
        Console.WriteLine($"In-memory: {string.Join(", ", startsWithR)}");

        // IQueryable simulation — same syntax, but in EF Core this becomes SQL
        IQueryable<string> q = customers.AsQueryable();
        IQueryable<string> longNames = q.Where(c => c.Length > 4);
        Console.WriteLine($"Queryable: {string.Join(", ", longNames)}");

        // EF Core equivalent (commented — would be):
        // var puneOrders = db.Orders.Where(o => o.City == "Pune").ToList();
        //   → DB runs:  SELECT * FROM Orders WHERE City = 'Pune'
    }
}`,
    codeOutput: `In-memory: Rutik
Queryable: Rutik, Priya, Vikas`,
    interviewQuestions: [
      {
        q: "What is the difference between IEnumerable and IQueryable?",
        a: "IEnumerable<T> is for in-memory collections — the LINQ runs in C# after data is loaded. IQueryable<T> is for remote sources (DB) — LINQ is stored as an expression tree and translated into SQL by the provider (EF Core). IQueryable can push filters to the database; IEnumerable cannot."
      },
      {
        q: "When should I use IQueryable in EF Core?",
        a: "Use IQueryable while you are still building the query — chaining Where, OrderBy, Select. Only call ToList() / ToArray() / FirstOrDefault() at the very end when you actually need the data. This way the entire chain becomes one optimized SQL query, not multiple round trips."
      },
      {
        q: "What is an expression tree?",
        a: "An expression tree is a data structure that represents code as a tree of objects. When a lambda is assigned to Expression<Func<...>>, the compiler builds this tree instead of compiling code. EF Core walks this tree and translates each node into SQL fragments — that's how LINQ-to-SQL works."
      },
      {
        q: "What happens if I do .ToList() too early in EF Core?",
        a: "All data from that point gets pulled into memory. Any further LINQ on it runs in C# (IEnumerable) — meaning Where, OrderBy run on your app server, not the DB. For large tables, this is slow, memory-heavy, and a major performance bug."
      },
      {
        q: "Can every C# method be used inside an IQueryable LINQ?",
        a: "No. Only methods the provider knows how to translate to SQL. Custom C# methods, complex string operations, or anything specific to .NET will throw a 'cannot translate' error in EF Core. For unsupported logic, materialize first with ToList(), then continue in memory."
      }
    ],
    followUpQuestions: [
      { q: "Default for in-memory data?", a: "IEnumerable<T>." },
      { q: "Default for DB queries?", a: "IQueryable<T>." },
      { q: "Where does IQueryable run filters?", a: "On the database (server side)." },
      { q: "Where does IEnumerable run filters?", a: "In memory (client side)." },
      { q: "What does AsEnumerable() do?", a: "Switches from IQueryable to IEnumerable — rest runs in memory." },
      { q: "Is IQueryable deferred?", a: "Yes." },
      { q: "Provider for SQL translation?", a: "EF Core / LINQ to SQL." }
    ],
    commonMistakes: [
      "Calling ToList() at the start of an EF Core query and then filtering — pulls the whole table into memory.",
      "Using AsEnumerable() too early — same effect, drops back to client-side filtering.",
      "Trying to use a custom C# method inside an IQueryable Where — EF Core can't translate it, runtime exception.",
      "Returning IQueryable from a repository — caller can keep modifying the query, sometimes intentional, often dangerous (no control over what hits the DB)."
    ],
    proTip: "In an interview, drop this: 'In repositories I deliberately return IEnumerable or List, not IQueryable — so the data layer fully owns what query runs against the database. IQueryable leaking out of the data layer means callers can accidentally pull whole tables into memory or build queries the DB indexes don't support.'"
  }
];
