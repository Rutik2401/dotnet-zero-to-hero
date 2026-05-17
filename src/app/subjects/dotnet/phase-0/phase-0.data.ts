import { Topic } from './phase-0.types';

export const phase0Topics: Topic[] = [
  // ============================================================
  // 1. Variables & Data Types
  // ============================================================
  {
    id: 'variables-data-types',
    title: '1. Variables & Data Types',
    whatIsThis: [
      "A variable is just a name we give to a memory box where we keep some value. Data type tells what kind of thing will sit inside that box — like number, text, true/false etc.",
      "Simple meaning is — variable is the name of the dabba, and data type is the kind of thing that fits in that dabba. The compiler uses the type to decide how much memory to give and what operations are allowed."
    ],
    whyUseIt: [
      "In any program we need to remember things — user name, age, price, total amount, login status. We cannot keep writing the same value again and again at every place. So we store it once in a variable, give it a name, and use that name everywhere.",
      "Without variables, programs cannot remember anything. They will become like a calculator that forgets the answer the moment you press equals."
    ],
    realLifeExample: [
      "Think of a Swiggy order — customerName is 'Rohit' (text), orderAmount is 450 (number), isDelivered is false (true/false). Each thing is a different type of data, so we keep it in a different type of variable.",
      "Later we use these variables to show on screen, save in database, send in SMS, and apply discount. The same value travels through the whole system using its variable name."
    ],
    howItWorks: [
      "We declare a variable — example: int age;",
      "We assign a value — example: age = 25;",
      "We use it — example: Console.WriteLine(age);",
      "Compiler checks the type — if the value matches the type it allows it, otherwise it gives an error before the program even runs.",
      "At runtime, the value sits in memory (stack for value types, heap for reference types) and the variable name points to it."
    ],
    codeExample: `// Common data types in C#
int age = 25;                  // whole number
double price = 199.99;         // decimal number (not for money!)
decimal salary = 75000m;       // exact decimal — use for money
string name = "Rohit";
bool isActive = true;
char grade = 'A';

Console.WriteLine($"{name}, age {age}");
Console.WriteLine($"price = {price}, salary = {salary:N2}");
Console.WriteLine($"active = {isActive}, grade = {grade}");

// var = compiler decides type from the value
var city = "Pune";
Console.WriteLine($"city = {city}");
// city = 10;        // ❌ ERROR — type cannot change`,
    codeOutput: `Rohit, age 25
price = 199.99, salary = 75,000.00
active = True, grade = A
city = Pune`,
    interviewQuestions: [
      {
        q: "What is the difference between int and Int32?",
        a: "Both are exactly the same. int is just a C# alias for System.Int32. The compiler treats them as equal. Convention is to use lowercase int in normal code, and Int32 only when you want to be explicit (for example with reflection)."
      },
      {
        q: "What is the default value of int, bool, and string in C#?",
        a: "int default is 0. bool default is false. string is a reference type so its default is null. For any reference type the default is null, for any value type the default is its 'zero' form."
      },
      {
        q: "Difference between var, dynamic, and object?",
        a: "var: type is decided at compile time and cannot change later — it is just shorthand. dynamic: type is decided at runtime, no compile-time type checking, so it is slower and risky. object: base type of everything in C#, but to use it we usually need casting or boxing/unboxing."
      },
      {
        q: "Can we change the value of a const variable?",
        a: "No. const is fixed at compile time, baked into the IL. If we want a fixed value but decided at runtime (like reading from config once), we use readonly instead. readonly can be assigned only in the constructor."
      },
      {
        q: "Why should we never use double for money?",
        a: "double uses binary floating-point, which cannot exactly represent decimal values like 0.1. So 0.1 + 0.2 may give 0.30000000000000004. For money we need exact answers, so we use decimal which is base-10 and gives exact decimal arithmetic."
      }
    ],
    commonMistakes: [
      "Using int when value can grow very large (over ~2.1 billion) — should use long.",
      "Using double or float for money — causes rounding errors. Always use decimal for money and financial data.",
      "Forgetting that string is a reference type, so comparing two strings with == compares the value (C# overloads it), but comparing two arbitrary objects with == compares references.",
      "Declaring a variable but never assigning, then trying to use it — compiler gives 'use of unassigned local variable' error."
    ],
    proTip: "When the interviewer asks about data types, casually drop this: 'For any money or financial data I always use decimal because double and float use binary floating point which gives precision errors. decimal is base-10 so it gives exact answers.' This single line shows real project experience, not just textbook knowledge."
  },

  // ============================================================
  // 2. Operators
  // ============================================================
  {
    id: 'operators',
    title: '2. Operators',
    whatIsThis: [
      "Operators are the small symbols that tell the compiler 'do this action'. Plus (+), minus (-), equals (==), less than (<), AND (&&) — all of these are operators.",
      "Simple meaning is — operators are the verbs of programming. Variables hold the values, operators do the work on those values."
    ],
    whyUseIt: [
      "Every real program needs to do calculations, comparisons, and decisions. Calculate total = price * quantity. Check if age >= 18. Combine two conditions with &&. Without operators we cannot express any logic at all.",
      "They also help us write less code. Instead of writing 'multiply price by 1.18' we just write price * 1.18 — short, clean, fast."
    ],
    realLifeExample: [
      "On Amazon checkout — finalAmount = (cartTotal - discount) + gst. That single line uses two arithmetic operators. Then 'if (finalAmount > walletBalance)' — that uses a comparison operator. Then 'show error AND disable button' — that uses a logical operator.",
      "So even a simple checkout button silently uses 5–6 operators in the background."
    ],
    howItWorks: [
      "Compiler reads the expression left to right but follows operator precedence (BODMAS-like rules).",
      "Example: 2 + 3 * 4 — multiplication runs first (precedence higher), so answer is 14, not 20.",
      "Brackets () always run first — so write 2 + 3 to get 20 use (2 + 3) * 4.",
      "Logical operators short-circuit — in a && b, if a is false then b is not even evaluated. Same for ||, if a is true b is skipped.",
      "Result of an operator is again a value, which can feed into another operator — that's how big expressions are built."
    ],
    codeExample: `int price = 1000, qty = 3;
int total = price * qty;                // arithmetic

bool isPremium = total > 2000;          // comparison
bool canCheckout = isPremium && qty > 0;// logical AND

total += 100;                           // 3000 + 100

string status = total > 5000 ? "Big order" : "Normal"; // ternary

string? name = null;
string display = name ?? "Guest";       // null-coalescing
int? len = name?.Length;                // null-conditional

Console.WriteLine($"total = {total}");
Console.WriteLine($"isPremium = {isPremium}, canCheckout = {canCheckout}");
Console.WriteLine($"status = {status}");
Console.WriteLine($"display = {display}, len = {(len?.ToString() ?? "null")}");`,
    codeOutput: `total = 3100
isPremium = True, canCheckout = True
status = Normal
display = Guest, len = null`,
    interviewQuestions: [
      {
        q: "What is the difference between == and Equals() in C#?",
        a: "For value types, == compares values directly. For reference types, by default == compares references (same memory address). Equals() can be overridden by the class to compare actual content. string overrides both, so for strings they behave the same. For custom classes you should override Equals() if you want value-based equality."
      },
      {
        q: "What is short-circuit evaluation?",
        a: "In a && b, if a is false, the result is already false so b is not evaluated. In a || b, if a is true, the result is already true so b is skipped. This is useful for null checks: if (user != null && user.IsActive) — if user is null, the second part never runs and we don't get a NullReferenceException."
      },
      {
        q: "Difference between & and &&?",
        a: "&& is short-circuit logical AND — second operand may not be evaluated. & is bitwise AND for ints, but for bools it works as logical AND without short-circuit (always evaluates both sides). Use && for normal conditions, use & only when you really need both sides to run."
      },
      {
        q: "What does ?? do in C#?",
        a: "?? is the null-coalescing operator. a ?? b means: if a is not null, use a; otherwise use b. ??= is the assignment version: name ??= 'Guest' assigns 'Guest' to name only if name is currently null."
      },
      {
        q: "Why does 1 / 2 give 0 in C# but 1.0 / 2 gives 0.5?",
        a: "Because integer division truncates the decimal part. When both operands are int, C# does integer division and gives int result. The moment any operand is double or decimal, it does floating-point division. So always cast one side: (double)1 / 2 or 1.0 / 2."
      }
    ],
    commonMistakes: [
      "Confusing = (assignment) with == (comparison) inside if conditions.",
      "Forgetting precedence — writing total = price + tax * qty when you actually wanted (price + tax) * qty.",
      "Using == to compare two custom objects expecting value equality, when actually it compares references.",
      "Using & instead of && in conditions — both run even when first is false, which can crash on null check."
    ],
    proTip: "When you write a null check, always pair it with && in the same condition — like 'if (user != null && user.IsActive)'. Many candidates write two separate ifs for this, which works but looks junior. Using short-circuit && shows you understand evaluation order."
  },

  // ============================================================
  // 3. Control Flow (if/else, switch)
  // ============================================================
  {
    id: 'control-flow',
    title: '3. Control Flow — if/else and switch',
    whatIsThis: [
      "Control flow means controlling which code runs and which code does not run, based on some condition. if/else and switch are the basic tools for this.",
      "Simple meaning is — control flow is the traffic signal of your program. It decides which road the program will take."
    ],
    whyUseIt: [
      "Real applications are full of decisions. If user is admin, show admin menu. If amount > 50000, ask for OTP. If country is India, show INR. Without control flow, every program will just run top-to-bottom doing the same thing for every user.",
      "It also helps us validate input — if email is invalid, stop and show error; otherwise continue. This protects the rest of the code from bad data."
    ],
    realLifeExample: [
      "Login flow on any banking app — if username and password are correct, go to home screen; else show 'Invalid credentials'. If the user fails 3 times, lock the account.",
      "Or food delivery — if pincode is serviceable, show menu; else show 'We don't deliver here yet'. Each branch is one control flow decision."
    ],
    howItWorks: [
      "if (condition) — condition is evaluated; if true, the if-block runs.",
      "else if (other) — checked only when previous if was false. We can chain many of these.",
      "else — runs only when none of the above matched. It is optional but useful as a 'default'.",
      "switch — better when we are checking the same variable against many fixed values. C# also supports pattern matching in switch since C# 8.",
      "Always think 'happy path vs error path'. Use early return / guard clauses to keep the code flat instead of deeply nested ifs."
    ],
    codeExample: `int age = 19;

if (age < 13)
    Console.WriteLine("Kid");
else if (age < 18)
    Console.WriteLine("Teen");
else
    Console.WriteLine("Adult");

// Guard clause style — preferred in real projects
string GetDiscount(string? coupon)
{
    if (string.IsNullOrWhiteSpace(coupon)) return "No discount";
    if (coupon == "FIRST50") return "50% off";
    if (coupon == "FLAT100") return "100 rs off";
    return "Invalid coupon";
}

// Modern switch expression (C# 8+)
string GetGrade(int marks) => marks switch
{
    >= 90 => "A+",
    >= 75 => "A",
    >= 60 => "B",
    >= 40 => "C",
    _     => "Fail"
};

Console.WriteLine(GetDiscount("FIRST50"));
Console.WriteLine(GetDiscount(null));
Console.WriteLine(GetGrade(82));
Console.WriteLine(GetGrade(35));`,
    codeOutput: `Adult
50% off
No discount
A
Fail`,
    interviewQuestions: [
      {
        q: "Difference between if-else and switch?",
        a: "if-else can check any expression including ranges, multiple variables, complex conditions. switch is for matching one variable against many fixed values, and it is usually cleaner and faster (compiler can build a jump table). Use if-else when conditions are different, switch when comparing the same value."
      },
      {
        q: "What is a guard clause and why is it preferred?",
        a: "A guard clause is an if at the top of a method that checks for invalid input and returns immediately. It avoids deeply nested if-else (also called arrow code). It makes the main logic flat and easy to read. In real projects, code reviewers love guard clauses."
      },
      {
        q: "Can we use switch on a string in C#?",
        a: "Yes. Since the early days, C# allows switch on int, char, string, enum, and from C# 7 onwards on any type using pattern matching. Java only allowed string switch from Java 7."
      },
      {
        q: "What is a switch expression in C# 8?",
        a: "A short, expression-based form of switch that returns a value. Example: var grade = marks switch { >= 90 => 'A+', _ => 'F' }; — no break, no case keyword, much cleaner. Used a lot in real .NET 6/7/8 code."
      },
      {
        q: "Why do we need the break in classic switch?",
        a: "C# does not allow fall-through between cases (unlike C/C++). So break (or return / throw) is required to tell the compiler the case is done. If you skip break, you get a compile error. This is a safety design from C#."
      }
    ],
    commonMistakes: [
      "Writing if (a = 5) instead of if (a == 5) — assignment instead of comparison. C# blocks this for bool but it bites in C/C++ habits.",
      "Long if-else-if chains where a switch or dictionary lookup would be cleaner.",
      "Deeply nested if inside if inside if — should be replaced with guard clauses.",
      "Forgetting the default / _ case in switch and missing edge cases like negative marks or null."
    ],
    proTip: "When interviewer asks 'how would you check 10 conditions', don't just say 'I'll write 10 ifs'. Say: 'For sequential range checks I'd use if-else if. For matching one value against many fixed values I'd use switch expression. For dynamic mappings I'd use Dictionary lookup.' Three-tool answer = senior thinking."
  },

  // ============================================================
  // 4. Loops
  // ============================================================
  {
    id: 'loops',
    title: '4. Loops',
    whatIsThis: [
      "A loop is a way to run the same block of code again and again, without writing it ten times. C# gives us for, while, do-while, and foreach.",
      "Simple meaning is — loop is the 'repeat' button of programming. Tell it the rule of repeat, and it will do it for you."
    ],
    whyUseIt: [
      "Most real-world data is a list — list of users, list of products, list of orders. To do something on each item we need to loop. Without loops, processing 1000 records means writing 1000 lines.",
      "Loops also help us retry, paginate, and process streams of data — almost every backend job uses loops in some form."
    ],
    realLifeExample: [
      "On Flipkart product page — for each product in the search results, show name, price, image. That for-each is a loop.",
      "On a billing system — for each item in cart, add item.price * item.qty to total. Then a separate loop sends one SMS to each customer with their bill. Loops everywhere."
    ],
    howItWorks: [
      "for — used when we know the count: for (int i = 0; i < 10; i++).",
      "while — used when we don't know the count, only the condition: while (queue.HasItems).",
      "do-while — runs the block at least once, then checks condition.",
      "foreach — used to walk through every item in a collection (List, array, Dictionary). Cleanest and most common in real .NET code.",
      "We can break out early with break, or skip current iteration with continue."
    ],
    codeExample: `for (int i = 1; i <= 3; i++)
    Console.WriteLine($"Item {i}");

var products = new List<string> { "Laptop", "Mouse", "Keyboard" };
foreach (var p in products)
    Console.WriteLine(p);

int retries = 0;
while (retries < 2)
{
    Console.WriteLine($"Retry {retries + 1}");
    retries++;
}

foreach (var num in new[] { 1, 2, 3, 4, 5 })
{
    if (num == 3) continue;
    if (num == 5) break;
    Console.WriteLine($"num = {num}");
}`,
    codeOutput: `Item 1
Item 2
Item 3
Laptop
Mouse
Keyboard
Retry 1
Retry 2
num = 1
num = 2
num = 4`,
    interviewQuestions: [
      {
        q: "Difference between for, foreach, while, and do-while?",
        a: "for: when you know exactly how many times. foreach: walking through every element of a collection (read-only iteration). while: condition-based, may run zero times. do-while: runs at least once because the condition is checked at the bottom."
      },
      {
        q: "Can we modify a collection while using foreach?",
        a: "No. If you add or remove items from the collection inside foreach, you get InvalidOperationException — 'Collection was modified'. To modify, either use a normal for loop with index, or collect changes in a separate list and apply after."
      },
      {
        q: "What is the difference between break and continue?",
        a: "break stops the loop completely and jumps out. continue stops the current iteration and goes to the next iteration. break = full stop, continue = skip this one."
      },
      {
        q: "Which is faster — for or foreach?",
        a: "For arrays and List<T>, both are very close — JIT optimises foreach almost the same as for. For LINQ queries, foreach is the natural choice. In normal code, prefer foreach for readability and use for only when you need the index."
      },
      {
        q: "What is an infinite loop and how to avoid it?",
        a: "A loop where the exit condition never becomes false — for example while (true) without break, or while (i < 10) where i is never incremented. Avoid by always making sure the condition will eventually become false, and add a max-retries safety in real code."
      }
    ],
    commonMistakes: [
      "Off-by-one errors — writing i <= length instead of i < length and going out of bounds.",
      "Modifying the collection inside foreach — throws runtime exception.",
      "Not breaking out of a search loop after finding the item — wastes time on the rest of the list.",
      "Using a for loop with index when foreach would be cleaner and less error-prone."
    ],
    proTip: "In code review, senior devs prefer foreach over for whenever you only need the items, not the index. Mention this in interview: 'I default to foreach for readability and switch to for only when I really need the index, for example when modifying items by position.' Shows code-quality thinking."
  },

  // ============================================================
  // 5. Functions / Methods
  // ============================================================
  {
    id: 'methods',
    title: '5. Functions / Methods',
    whatIsThis: [
      "A method (also called function) is a named block of code that does one specific job. We give it some inputs (parameters), it does the work, and gives back a result (return value).",
      "Simple meaning is — a method is like a small machine. You put input, it does its work, you get output. Same machine can be reused 100 times."
    ],
    whyUseIt: [
      "Without methods our entire program will be one giant blob of code. Methods let us split work into small, named pieces — easier to read, easier to test, easier to reuse.",
      "They also avoid repetition. If we calculate GST in 10 places, we write the formula 10 times. With a method, we write it once and call it 10 times. If GST rule changes tomorrow, we change one place only."
    ],
    realLifeExample: [
      "Login feature — we have a CheckPassword() method, a GenerateToken() method, a SendWelcomeMail() method. Each one has a clear job. The login controller just calls them in order.",
      "Tomorrow if password rule changes, only CheckPassword() is updated — login controller does not change at all."
    ],
    howItWorks: [
      "Define the method — give it a name, parameters, return type, and a body.",
      "Call the method from somewhere — pass the actual values for the parameters.",
      "Inside the method, parameters are local variables holding those values.",
      "When return is hit, control jumps back to the caller with the result.",
      "Method overloading — same name, different parameter list. Compiler picks the right one based on what you pass."
    ],
    codeExample: `int Add(int a, int b) => a + b;
int Square(int x) => x * x;

string Greet(string name, string greeting = "Hello")
    => $"{greeting}, {name}!";

int Multiply(int a, int b) => a * b;
double Multiply(double a, double b) => a * b;

Console.WriteLine(Add(5, 3));
Console.WriteLine(Square(6));
Console.WriteLine(Greet("Rohit"));
Console.WriteLine(Greet("Rohit", "Namaste"));
Console.WriteLine(Greet(greeting: "Hi", name: "Aman"));
Console.WriteLine(Multiply(2, 3));
Console.WriteLine(Multiply(2.5, 4.0));`,
    codeOutput: `8
36
Hello, Rohit!
Namaste, Rohit!
Hi, Aman!
6
10`,
    interviewQuestions: [
      {
        q: "What is method overloading?",
        a: "Two or more methods in the same class with the same name but different parameters (different number, types, or order). Compiler picks the right one based on the call. Example: Console.WriteLine has 19 overloads — for int, double, string, object etc."
      },
      {
        q: "Difference between ref, out, and in parameters?",
        a: "ref: variable must be initialised before passing, method can read and modify. out: variable need not be initialised, but method MUST assign before returning. in: passes by reference but read-only — used for performance with big structs. Default is pass-by-value (copy)."
      },
      {
        q: "What is method overriding?",
        a: "When a derived class provides its own implementation of a method that already exists in the base class. Base method must be marked virtual or abstract. Override is part of inheritance, overloading is not."
      },
      {
        q: "What is an expression-bodied method?",
        a: "Short syntax for methods that have a single expression. Instead of { return x * 2; } we write => x * 2. Cleaner, very common in modern C# code, especially for properties and small methods."
      },
      {
        q: "Can a method return multiple values in C#?",
        a: "Yes, in three ways: (1) return a tuple — (int, string) GetUser(); (2) use out parameters — bool TryParse(string s, out int result); (3) return a custom class or record. Tuples and records are most modern."
      }
    ],
    commonMistakes: [
      "Writing 200-line methods that do many things at once — should be split into smaller named methods.",
      "Method names that don't describe the job clearly — like DoStuff() or Process(). Use names like CalculateGst(), SendWelcomeEmail().",
      "Using static methods for everything when an instance method would be more appropriate (and testable).",
      "Forgetting that out requires assigning the variable inside the method, otherwise compile error."
    ],
    proTip: "In interview say: 'I follow the Single Responsibility Principle for methods too — one method, one reason to change. If I find myself writing AND in the method name (LoginAndSendEmail), it's a sign to split it.' Sounds professional and is genuinely good practice."
  },

  // ============================================================
  // 6. Recursion
  // ============================================================
  {
    id: 'recursion',
    title: '6. Recursion',
    whatIsThis: [
      "Recursion means a method that calls itself. We solve a big problem by saying 'do a smaller version of the same problem, until you reach the base case'.",
      "Simple meaning is — like opening a Russian doll. Each doll contains a smaller doll. You keep opening until you find the smallest one (base case), then you stop."
    ],
    whyUseIt: [
      "Some problems are naturally recursive — tree traversal, factorial, Fibonacci, folder structure walking, JSON parsing. Writing these with loops is possible but ugly. Recursion makes the code match the shape of the problem.",
      "It is also a favourite interview topic to test whether you understand call stack and base cases."
    ],
    realLifeExample: [
      "File explorer in Windows — to list everything inside a folder, you list the files in this folder, then for every sub-folder you call the same logic again. That repeated 'do the same thing on the smaller part' is recursion.",
      "Or family tree — to find total descendants of a person, you count their children plus all descendants of each child. Same problem, smaller input."
    ],
    howItWorks: [
      "Every recursive method must have a BASE CASE — the simplest input where it returns directly without calling itself. Without this, you get StackOverflowException.",
      "Then the RECURSIVE STEP — calling the same method with a smaller / simpler input.",
      "Each call goes onto the call stack. When base case returns, the stack 'unwinds' and previous calls finish.",
      "If the input does not get smaller each time, the recursion never ends — that's a bug.",
      "For very deep recursion, we may need to convert to a loop with explicit stack to avoid stack overflow."
    ],
    codeExample: `int Factorial(int n)
{
    if (n <= 1) return 1;          // base case
    return n * Factorial(n - 1);   // recursive step
}

int Sum(int[] arr, int index)
{
    if (index >= arr.Length) return 0;
    return arr[index] + Sum(arr, index + 1);
}

int Fib(int n)
{
    if (n <= 1) return n;
    return Fib(n - 1) + Fib(n - 2);
}

Console.WriteLine(Factorial(5));
Console.WriteLine(Sum(new[] { 1, 2, 3, 4 }, 0));
Console.WriteLine(Fib(7));`,
    codeOutput: `120
10
13`,
    interviewQuestions: [
      {
        q: "What is the base case in recursion and why is it important?",
        a: "The base case is the smallest input where the function returns directly without calling itself. It stops the recursion. Without a base case, the function calls itself forever and the call stack overflows, giving StackOverflowException."
      },
      {
        q: "What is the difference between recursion and iteration (loop)?",
        a: "Iteration uses a loop and a counter, no extra method calls — fast and memory-light. Recursion uses the call stack, more memory, but cleaner code for naturally recursive problems like trees. Any recursion can be converted to iteration using an explicit stack."
      },
      {
        q: "What is tail recursion?",
        a: "Recursion where the recursive call is the very last thing the method does. Some languages (F#, Scala) optimise this to a loop and avoid stack growth. C# does NOT guarantee tail-call optimisation, so deep recursion can still overflow the stack in C#."
      },
      {
        q: "How does the call stack work in recursion?",
        a: "Every method call pushes a stack frame containing parameters and local variables. Recursive calls keep pushing more frames. When base case returns, frames pop one by one, each previous call resumes and finishes. Default stack size in .NET is around 1 MB."
      },
      {
        q: "When should we NOT use recursion?",
        a: "When input can be very large and depth can grow beyond a few thousand — stack overflow risk. When a simple loop is enough — recursion adds overhead and is harder to debug. For performance-critical code, loops are usually better."
      }
    ],
    commonMistakes: [
      "Forgetting the base case — leads to infinite recursion and StackOverflowException.",
      "Base case never reachable — input is not actually getting smaller. Classic bug.",
      "Re-computing the same sub-problem many times — like naive Fibonacci. Solution is memoisation / dynamic programming.",
      "Using recursion for very deep structures without considering stack size — file system with 10,000 nested folders can crash."
    ],
    proTip: "In interview, after writing a recursive solution, immediately follow with: 'This works but for large input the call stack can blow up. The iterative version using an explicit Stack<T> is safer in production.' Showing both solutions and choosing for the right reason — that's senior level."
  },

  // ============================================================
  // 7. Arrays
  // ============================================================
  {
    id: 'arrays',
    title: '7. Arrays',
    whatIsThis: [
      "An array is a fixed-size collection of items of the same type, stored together in memory. Each item has a position called its index, starting from 0.",
      "Simple meaning is — array is like a row of pigeon-holes in a post office. Numbered 0, 1, 2, 3 ... — each hole holds one letter of the same kind."
    ],
    whyUseIt: [
      "When we have a fixed number of similar items — 12 months, 7 days of week, scores of 50 students — array is the simplest, fastest container. Access by index is O(1).",
      "It is also the building block for almost every other data structure — List, Stack, Queue, Hash table — all use arrays internally."
    ],
    realLifeExample: [
      "Cricket scoreboard — runs scored by 11 players. Index 0 to 10. We can quickly look up player 5's score using scores[5].",
      "Or a temperature reading every hour for a day — int[24] readings. Simple, predictable, fast."
    ],
    howItWorks: [
      "We declare with a fixed size: int[] arr = new int[5];",
      "Or initialise with values directly: int[] arr = { 1, 2, 3, 4, 5 };",
      "Access by index: arr[0] is first, arr[arr.Length - 1] is last.",
      "Indexing out of range gives IndexOutOfRangeException at runtime.",
      "Once size is fixed, it cannot be changed — to grow, we copy into a bigger array. That's why for dynamic sizing, we use List<T> instead."
    ],
    codeExample: `int[] cities = { 10, 20, 30, 40 };

Console.WriteLine($"first = {cities[0]}");
Console.WriteLine($"length = {cities.Length}");

for (int i = 0; i < cities.Length; i++)
    Console.WriteLine($"i={i} v={cities[i]}");

Array.Reverse(cities);
Console.WriteLine($"after reverse: {string.Join(",", cities)}");

Array.Sort(cities);
Console.WriteLine($"after sort:    {string.Join(",", cities)}");

int idx = Array.IndexOf(cities, 30);
Console.WriteLine($"index of 30 = {idx}");`,
    codeOutput: `first = 10
length = 4
i=0 v=10
i=1 v=20
i=2 v=30
i=3 v=40
after reverse: 40,30,20,10
after sort:    10,20,30,40
index of 30 = 2`,
    interviewQuestions: [
      {
        q: "Difference between Array and List<T>?",
        a: "Array has fixed size — once created you cannot resize. List<T> is dynamic — it grows automatically by allocating a bigger internal array when needed. Array access is slightly faster but List<T> is far more flexible. In real .NET code we use List<T> 95% of the time."
      },
      {
        q: "Time complexity of array operations?",
        a: "Access by index: O(1) — direct memory jump. Search by value: O(n). Insert at end (if space): O(1), but resizing if needed: O(n). Insert/delete in middle: O(n) because items must shift. That's why we use List<T> or LinkedList<T> based on access pattern."
      },
      {
        q: "What is the difference between int[] and int[,] and int[][]?",
        a: "int[] — single dimension array. int[,] — rectangular 2D array, all rows same length, stored as one block. int[][] — jagged array, an array of arrays, each inner array can have different length. Jagged is more flexible, rectangular is faster for fixed grids."
      },
      {
        q: "Are arrays value type or reference type in C#?",
        a: "Arrays are reference types. Even an int[] (with int elements) is itself a reference — the variable points to a heap-allocated array object. So passing an array to a method passes a reference, and changes inside the method are visible outside."
      },
      {
        q: "What is IndexOutOfRangeException?",
        a: "Runtime exception thrown when you access an index < 0 or >= Length. Example: arr[5] when arr has only 5 elements (valid indexes are 0–4). Always check arr.Length before indexing dynamic positions."
      }
    ],
    commonMistakes: [
      "Off-by-one — using <= Length instead of < Length and going one step beyond.",
      "Trying to resize an array — you can't. You have to allocate a new bigger array and copy.",
      "Comparing two arrays with == — that compares references, not contents. Use SequenceEqual from LINQ for content comparison.",
      "Using array when the size is dynamic — use List<T> instead, it handles growth for you."
    ],
    proTip: "In interview: 'I use array only when size is truly fixed and known up front — like 7 days of week or 12 months. Otherwise I use List<T>. For very large fixed buffers in performance-critical code (like image pixels) array is still preferred.' This shows you choose data structures by purpose, not by habit."
  },

  // ============================================================
  // 8. Strings
  // ============================================================
  {
    id: 'strings',
    title: '8. Strings',
    whatIsThis: [
      "A string is a sequence of characters — like a word or sentence. In C#, string is actually a class (System.String), but it behaves a lot like a value type because of immutability.",
      "Simple meaning is — string is text, kept inside double quotes. \"Hello\", \"Rohit Sharma\", \"₹450.00\" — all are strings."
    ],
    whyUseIt: [
      "Almost every real app deals with text — names, emails, addresses, JSON, log messages, SQL queries, error messages. Without strings nothing meaningful can be displayed or stored.",
      "C# gives strings a lot of helper methods (Trim, Split, Replace, IndexOf, Substring) that save a ton of manual work."
    ],
    realLifeExample: [
      "When user enters '   rohit@gmail.com  ' in a form, we Trim the spaces, ToLower it, then validate. That's three string operations in one signup field.",
      "When showing a bill — string.Format or interpolation joins amount, date and name into one readable line."
    ],
    howItWorks: [
      "Strings in C# are IMMUTABLE — once created they cannot be changed. Any 'modification' actually creates a new string.",
      "So name + ' ' + city creates a new string each time. That's why doing this 1000 times in a loop is slow.",
      "For heavy concatenation (in loops), we use StringBuilder which is mutable and efficient.",
      "Strings are stored in the heap, but small literal strings get interned — same literal in two places shares the same memory.",
      "$\"...\" is interpolation, much cleaner than concatenation."
    ],
    codeExample: `string name = "Rohit Sharma";

Console.WriteLine(name.Length);
Console.WriteLine(name.ToUpper());
Console.WriteLine(name.Replace("Rohit", "Virat"));
Console.WriteLine(name.Substring(0, 5));
Console.WriteLine(name.Contains("Sharma"));

string csv = "apple,banana,grape";
string[] parts = csv.Split(',');
string back = string.Join(" | ", parts);
Console.WriteLine(back);

var sb = new System.Text.StringBuilder();
for (int i = 1; i <= 3; i++) sb.Append(i).Append(",");
Console.WriteLine(sb.ToString());`,
    codeOutput: `12
ROHIT SHARMA
Virat Sharma
Rohit
True
apple | banana | grape
1,2,3,`,
    interviewQuestions: [
      {
        q: "Why are strings immutable in C#?",
        a: "Immutability gives us thread safety (no one can change a string while another thread reads it), security (e.g., passwords passed to APIs cannot be silently altered), and allows interning (same literal shared in memory). The cost is that 'modifying' creates a new string — so heavy concatenation is slow."
      },
      {
        q: "Difference between String and StringBuilder?",
        a: "String is immutable — every change creates a new object. StringBuilder is mutable — appending modifies the same internal buffer. For 5–10 concatenations use string. For loops with many appends (hundreds or more), StringBuilder is much faster and uses less memory."
      },
      {
        q: "Difference between string.Empty, \"\" and null?",
        a: "string.Empty and \"\" are the same — an empty string with Length = 0. null means no string at all (no object). Calling .Length on null throws NullReferenceException. Use string.IsNullOrEmpty() or string.IsNullOrWhiteSpace() to safely check."
      },
      {
        q: "What is string interning?",
        a: "C# stores all string literals in a special pool. Two identical literals share the same memory reference. So \"hello\" == \"hello\" comparing references is also true. Strings created at runtime are NOT interned by default, but you can call string.Intern() to add them."
      },
      {
        q: "Difference between Equals(), == and ReferenceEquals() for strings?",
        a: "For strings, == and Equals() both compare values (string overrides ==). ReferenceEquals() compares memory references — only true if both variables point to the same object. For interned literals, ReferenceEquals can also be true even though we didn't expect it."
      }
    ],
    commonMistakes: [
      "Using + in a long loop to build a string — very slow because every + creates a new string. Use StringBuilder.",
      "Comparing strings with == without considering case — 'India' == 'india' is false. Use string.Equals(a, b, StringComparison.OrdinalIgnoreCase) for case-insensitive.",
      "Calling .Length or any method on a null string — NullReferenceException. Use string.IsNullOrEmpty() first.",
      "Doing string comparison for sensitive data like passwords without using a constant-time compare — opens to timing attacks."
    ],
    proTip: "When interviewer asks 'how would you concatenate 1000 strings?', say: 'For a small fixed number I'd use string interpolation. For a loop or unknown count I'd use StringBuilder because string is immutable and each + creates a new heap allocation.' This one line covers immutability, performance, and memory awareness in one shot."
  },

  // ============================================================
  // 9. Classes & Objects (IMPORTANT — has follow-ups)
  // ============================================================
  {
    id: 'classes-objects',
    title: '9. Classes & Objects',
    whatIsThis: [
      "A class is a blueprint or a template. It defines what data (fields/properties) and what behavior (methods) a thing has. An object is an actual instance created from that blueprint, sitting in memory and holding real values.",
      "Simple meaning is — class is the architectural drawing of a house, object is the actual house built from that drawing. From one drawing you can build many houses."
    ],
    whyUseIt: [
      "Classes let us model real-world things in code — Customer, Order, Product, Invoice. Each has its own data and operations bundled together. Without classes, code becomes a flat soup of variables and functions.",
      "They are the foundation of OOP. Encapsulation, inheritance, polymorphism — none of it exists without classes."
    ],
    realLifeExample: [
      "On Amazon — there is one Product class with fields like Name, Price, Stock and methods like ApplyDiscount(), AddReview(). One million products on the site = one million Product objects, all from the same class.",
      "Or a banking app — one Account class. Lakhs of customers means lakhs of Account objects, each with their own balance and transaction history."
    ],
    howItWorks: [
      "We define the class with the class keyword, list its fields/properties and methods.",
      "We create an object using new — example: var p = new Product();",
      "Each object has its own copy of fields. Changing p1.Price does not affect p2.Price.",
      "Constructor is a special method that runs when the object is created — used to set initial values.",
      "Objects live on the heap. The variable holds a reference (pointer) to that heap memory."
    ],
    codeExample: `public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public decimal Price { get; set; }

    public Product(int id, string name, decimal price)
    {
        Id = id; Name = name; Price = price;
    }

    public decimal ApplyDiscount(decimal percent)
        => Price - (Price * percent / 100);
}

var p1 = new Product(1, "Laptop", 60000);
var p2 = new Product(2, "Mouse",   500);

Console.WriteLine($"{p1.Name} after 10% off = {p1.ApplyDiscount(10)}");
Console.WriteLine($"{p2.Name} after 5%  off = {p2.ApplyDiscount(5)}");`,
    codeOutput: `Laptop after 10% off = 54000
Mouse after 5%  off = 475`,
    interviewQuestions: [
      {
        q: "Difference between class and object?",
        a: "Class is a blueprint or template — it does not occupy memory until you create an object from it. Object is an instance of the class, occupies memory, holds actual values. One class can have many objects, each independent of the other."
      },
      {
        q: "Difference between class and struct in C#?",
        a: "class is a reference type — stored on heap, default value is null, passed by reference. struct is a value type — stored on stack (or inline in containing object), passed by copy. Use struct only for small, immutable, value-like data (Point, Money). Default to class otherwise."
      },
      {
        q: "What is a constructor and types of constructors?",
        a: "A constructor is a special method that runs when an object is created and initialises its fields. Types: default (no args), parameterised, copy (takes another instance), static (runs once for the class), and private (used in singleton). C# auto-generates a default constructor only if you write none."
      },
      {
        q: "What is 'this' keyword?",
        a: "'this' refers to the current object. Used to disambiguate parameter names from field names (this.name = name), to call another constructor (: this(...)), to pass current object to another method, and inside extension methods to point to the value being extended."
      },
      {
        q: "Can a class be empty? Can a C# file have multiple classes?",
        a: "Yes, an empty class compiles fine — it's just a blueprint with no members. And yes, a single .cs file can have many classes (and even nested classes). But convention is one public class per file, named the same as the file, for easy navigation."
      }
    ],
    followUpQuestions: [
      { q: "Can a class exist without an object?", a: "Yes. A class is just a blueprint — it lives in code. Object is needed only when we want to USE it." },
      { q: "Can an object exist without a class?", a: "No. Every object must be created from some class (or struct). No blueprint, no object." },
      { q: "Is class a value type or reference type?", a: "Reference type. The variable holds a pointer to heap memory." },
      { q: "Default access modifier of a class?", a: "internal — visible only inside the same assembly (project)." },
      { q: "Can we have multiple constructors in one class?", a: "Yes, that's called constructor overloading — different parameter lists." },
      { q: "What is a static class?", a: "A class that cannot be instantiated. All members must be static. Used for utility methods (e.g. Math, Console)." }
    ],
    commonMistakes: [
      "Using public fields directly instead of properties — breaks encapsulation, hard to change later.",
      "Forgetting that object variable holds a reference — modifying through one variable changes what others see.",
      "Creating constructors that take 8–10 parameters — code smell, too many responsibilities. Refactor into smaller classes or use builder/object initialiser.",
      "Creating a new object every time when you could reuse — leads to GC pressure in hot paths."
    ],
    proTip: "Always tell interviewer: 'I prefer auto-properties over public fields, even for simple data. It costs nothing today and gives me a hook for validation, logging, or computed logic later — without changing any caller.' Shows you think about future-proofing."
  },

  // ============================================================
  // 10. Encapsulation (IMPORTANT — has follow-ups)
  // ============================================================
  {
    id: 'encapsulation',
    title: '10. Encapsulation',
    whatIsThis: [
      "Encapsulation means hiding the internal details of a class and exposing only what is necessary. We do this with access modifiers (public, private, protected, internal) and properties.",
      "Simple meaning is — like a TV remote. You only see buttons (public). You don't see the circuit (private). You can use the TV without knowing how it works inside."
    ],
    whyUseIt: [
      "It protects the internal state of an object from being changed in wrong ways. If anyone could directly set Account.Balance to -1 crore, the whole banking system breaks. Encapsulation lets us add validation in one place.",
      "It also lets us change internal implementation without breaking outside code. We can change how balance is stored or calculated, as long as the public Balance property still works the same."
    ],
    realLifeExample: [
      "Bank account — Balance is private, you cannot directly assign 5,00,000 to it. You must call Deposit(5_00_000) which checks rules (KYC done? account not frozen?). The check sits inside the class, not scattered across 100 callers.",
      "ATM machine — you can press buttons and use the slot, but the cash drawer and electronics are hidden behind the screen. Same principle."
    ],
    howItWorks: [
      "Make fields private (or use private setters on properties).",
      "Expose only what callers need through public properties or methods.",
      "Add validation inside setters or methods — single place for rules.",
      "Use 'readonly' or 'init' for values that should not change after construction.",
      "Choose the right access modifier: public (everyone), private (this class only), protected (this class + subclasses), internal (this assembly only), file (this file only — C# 11+)."
    ],
    codeExample: `public class BankAccount
{
    private decimal _balance;
    private readonly string _ownerName;

    public BankAccount(string ownerName, decimal openingBalance)
    {
        if (openingBalance < 0)
            throw new ArgumentException("Opening balance cannot be negative.");
        _ownerName = ownerName;
        _balance = openingBalance;
    }

    public decimal Balance => _balance;
    public string  Owner   => _ownerName;

    public void Deposit(decimal amount)
    {
        if (amount <= 0) throw new ArgumentException("Amount must be > 0");
        _balance += amount;
    }

    public void Withdraw(decimal amount)
    {
        if (amount <= 0) throw new ArgumentException("Amount must be > 0");
        if (amount > _balance) throw new InvalidOperationException("Insufficient funds");
        _balance -= amount;
    }
}

var acc = new BankAccount("Rohit", 1000);
acc.Deposit(500);
acc.Withdraw(200);
Console.WriteLine($"{acc.Owner}'s balance = {acc.Balance}");

try { acc.Withdraw(10000); }
catch (InvalidOperationException ex) { Console.WriteLine($"Error: {ex.Message}"); }`,
    codeOutput: `Rohit's balance = 1300
Error: Insufficient funds`,
    interviewQuestions: [
      {
        q: "What is encapsulation?",
        a: "Encapsulation is the OOP principle of bundling data and methods together inside a class, and hiding internal details using access modifiers. The class controls how its data is read and modified. It is the very first pillar of OOP."
      },
      {
        q: "Difference between private, protected, internal, and public?",
        a: "private — accessible only inside the same class. protected — same class + derived classes. internal — same assembly (project). protected internal — same assembly OR derived class anywhere. public — everywhere. private protected — same assembly AND derived class. Default for class members is private."
      },
      {
        q: "What is the difference between a field and a property?",
        a: "A field is a raw variable inside the class. A property looks like a field from outside but actually has get/set methods, so it can have validation, logging, or computed logic. Best practice: never expose public fields, always use properties."
      },
      {
        q: "What is the difference between readonly, const, and init?",
        a: "const: compile-time constant, must be primitive, baked into IL. readonly: assigned in declaration or constructor only. init: a property setter that can be set only during object initialisation, not later — gives immutability with object initialiser syntax (C# 9+)."
      },
      {
        q: "Why should we avoid public fields?",
        a: "Public fields break encapsulation — anyone can set any value, no validation. Also, you cannot later add logic without breaking the binary contract (consumers compiled against the field break). Properties give the same syntax to callers but allow you to add logic anytime."
      }
    ],
    followUpQuestions: [
      { q: "Default access modifier of a class member?", a: "private." },
      { q: "Default access modifier of a top-level class?", a: "internal." },
      { q: "Can I have a private constructor?", a: "Yes — used in singleton pattern to stop new from outside." },
      { q: "Can I read a private field from outside?", a: "No, only inside the same class. Reflection can break this but it's a hack." },
      { q: "Can a property have a private setter?", a: "Yes — public get, private set is a very common pattern." },
      { q: "Is encapsulation same as data hiding?", a: "Data hiding is the goal. Encapsulation is the technique that achieves it." }
    ],
    commonMistakes: [
      "Making everything public 'just in case' — breaks encapsulation and ties your hands for future changes.",
      "Putting validation in the controller / API layer instead of the entity — same rule then has to be repeated everywhere.",
      "Exposing collections like public List<Order> Orders { get; set; } — outsiders can replace or modify the list. Use IReadOnlyList<Order> or expose only Add/Remove methods.",
      "Confusing 'private' (class-level) with 'protected' (class + children) and using the wrong one for inheritance scenarios."
    ],
    proTip: "Tell interviewer: 'My rule of thumb is start with the smallest access modifier possible — private by default, raise it only when actually needed by another class. This stops accidental coupling and keeps the public surface small.' Senior engineers say exactly this in code reviews."
  },

  // ============================================================
  // 11. Inheritance (IMPORTANT — has follow-ups)
  // ============================================================
  {
    id: 'inheritance',
    title: '11. Inheritance',
    whatIsThis: [
      "Inheritance means one class (child / derived) can take the fields and methods of another class (parent / base) and add or override its own. It models 'is-a' relationships — Dog is an Animal, Manager is an Employee.",
      "Simple meaning is — like genes from parents. Child gets parent's features for free, and can also have its own."
    ],
    whyUseIt: [
      "It avoids code duplication. If Animal class has Eat() and Sleep(), then Dog and Cat need not write them again — they inherit.",
      "It lets us write generic code that works on the parent type, but actually runs on any child type. This is the foundation for polymorphism."
    ],
    realLifeExample: [
      "Employee management system — base Employee class has Name, Salary, JoinDate. Manager extends Employee adding TeamSize, Bonus. Intern extends Employee adding Stipend, Duration. Common stuff written once in Employee.",
      "Or vehicle — base Vehicle class with Wheels, Speed. Car, Bike, Truck all extend Vehicle. Common methods like Start() and Stop() come for free."
    ],
    howItWorks: [
      "Use : ParentClass in the child class declaration — example: class Dog : Animal.",
      "Child can call base members directly (if accessible) and can use 'base' keyword to call parent's version of a method.",
      "C# supports SINGLE inheritance for classes — a class can inherit from only one base class. But it can implement many interfaces.",
      "Mark members 'virtual' in base if you want children to be able to override them. Use 'override' in child.",
      "Use 'sealed' to prevent further inheritance or further overriding."
    ],
    codeExample: `public class Employee
{
    public string Name { get; set; } = "";
    public decimal Salary { get; set; }
    public virtual decimal CalculatePay() => Salary;
    public void Print() => Console.WriteLine($"{Name} earns {CalculatePay()}");
}

public class Manager : Employee
{
    public decimal Bonus { get; set; }
    public override decimal CalculatePay() => Salary + Bonus;
}

public class Intern : Employee
{
    public override decimal CalculatePay() => Salary * 0.5m;
}

Employee e1 = new Manager { Name = "Riya", Salary = 80000, Bonus = 20000 };
Employee e2 = new Intern  { Name = "Aman", Salary = 20000 };
Employee e3 = new Employee{ Name = "Geet", Salary = 50000 };

e1.Print();
e2.Print();
e3.Print();`,
    codeOutput: `Riya earns 100000
Aman earns 10000
Geet earns 50000`,
    interviewQuestions: [
      {
        q: "What is inheritance and why do we use it?",
        a: "Inheritance lets a child class reuse the fields, properties and methods of a parent class. It models 'is-a' relationships. We use it to avoid code duplication and enable polymorphism. It is the second pillar of OOP."
      },
      {
        q: "Why does C# not support multiple class inheritance?",
        a: "To avoid the 'diamond problem' — if class C inherits from both A and B which both define a method M, which one does C use? It creates ambiguity. C# avoids this by allowing only single class inheritance, but multiple INTERFACE implementation, since interfaces had no implementation (until default interface methods in C# 8)."
      },
      {
        q: "Difference between virtual, override, new and abstract?",
        a: "virtual: base method that can be overridden. override: child overrides a virtual / abstract method. new: child HIDES a base method (not real polymorphism). abstract: method has no body in base, child MUST implement it. virtual is opt-in override; abstract is forced override."
      },
      {
        q: "What is the use of 'base' keyword?",
        a: "'base' refers to the parent class. We use it to call base constructor (: base(...)), to call base version of an overridden method (base.CalculatePay()), or to access base members shadowed by 'new'."
      },
      {
        q: "What is sealed class and sealed method?",
        a: "sealed class: cannot be inherited from. Useful for security, performance, or when class is not designed to be extended (string is sealed). sealed override method: a method that overrides a virtual one but cannot be overridden further down the chain."
      }
    ],
    followUpQuestions: [
      { q: "Can we inherit a sealed class?", a: "No, it gives a compile-time error." },
      { q: "Can sealed class have constructor?", a: "Yes." },
      { q: "Can sealed class have methods?", a: "Yes, normal methods." },
      { q: "Does C# support multiple inheritance of classes?", a: "No, only single class inheritance. But multiple interfaces are allowed." },
      { q: "Can we override a non-virtual method?", a: "No. The base method must be virtual or abstract." },
      { q: "Can private members be inherited?", a: "They are technically inherited but not accessible from the child class." },
      { q: "Does the base constructor run automatically?", a: "Yes — the parent constructor runs first, then the child's." }
    ],
    commonMistakes: [
      "Using inheritance for code reuse when the relationship is not really 'is-a' — should use composition instead.",
      "Building deep inheritance chains (5–6 levels) — fragile, hard to understand, breaks easily.",
      "Forgetting virtual on base methods you actually want to be polymorphic — child cannot override.",
      "Using 'new' to hide a base method when 'override' was intended — silent bug, calls wrong version through base reference."
    ],
    proTip: "Drop this in interview: 'I follow the principle Favor Composition over Inheritance. I use inheritance only when there is a real is-a relationship and I expect polymorphic behaviour. For just reusing code, I prefer composing smaller objects — it's more flexible and avoids fragile base classes.' Direct GoF wisdom, very respected."
  },

  // ============================================================
  // 12. Polymorphism (IMPORTANT — has follow-ups)
  // ============================================================
  {
    id: 'polymorphism',
    title: '12. Polymorphism',
    whatIsThis: [
      "Polymorphism means 'many forms'. The same method name can behave differently depending on which class is calling it. C# gives us two flavours: compile-time (overloading) and runtime (overriding).",
      "Simple meaning is — same button, different action depending on context. Press 'Play' on YouTube it plays video, on Spotify it plays music, on a game it starts the game. Same word, different behaviour."
    ],
    whyUseIt: [
      "It lets us write generic code that works on the base type but does the right thing for each child. We don't write if-else for every possible type. The right method automatically runs based on actual object.",
      "This is what makes frameworks like ASP.NET, EF Core, and most design patterns possible — they call methods on a base interface, and the right concrete implementation kicks in at runtime."
    ],
    realLifeExample: [
      "Payment system — base PaymentProcessor with method Pay(). Subclasses CreditCardProcessor, UpiProcessor, NetBankingProcessor each override Pay() with their own steps. The order service just calls processor.Pay(amount) — it does not care which type.",
      "Or notifications — base Notification with Send(). Email, SMS, Push, WhatsApp each override Send() differently. Caller just loops over a list of notifications and calls Send()."
    ],
    howItWorks: [
      "Compile-time polymorphism: method overloading and operator overloading — compiler picks the right method based on argument types.",
      "Runtime polymorphism: method overriding via virtual / abstract / override — actual object type at runtime decides which method runs.",
      "The base reference variable can hold any child object: Animal a = new Dog();",
      "When we call a.Speak(), the runtime looks at the actual object (Dog) and runs Dog's Speak() — even though variable type is Animal.",
      "This is also called dynamic dispatch — happens through the v-table (virtual method table)."
    ],
    codeExample: `public abstract class Notification
{
    public string To { get; set; } = "";
    public abstract void Send(string message);
}

public class EmailNotification : Notification
{
    public override void Send(string message)
        => Console.WriteLine($"Email -> {To}: {message}");
}

public class SmsNotification : Notification
{
    public override void Send(string message)
        => Console.WriteLine($"SMS   -> {To}: {message}");
}

public class PushNotification : Notification
{
    public override void Send(string message)
        => Console.WriteLine($"Push  -> {To}: {message}");
}

var alerts = new List<Notification>
{
    new EmailNotification { To = "rohit@x.com" },
    new SmsNotification   { To = "9999999999"  },
    new PushNotification  { To = "device-001"  }
};

foreach (var n in alerts)
    n.Send("Your order is shipped!");`,
    codeOutput: `Email -> rohit@x.com: Your order is shipped!
SMS   -> 9999999999: Your order is shipped!
Push  -> device-001: Your order is shipped!`,
    interviewQuestions: [
      {
        q: "What is polymorphism and what are its types in C#?",
        a: "Polymorphism means same name, different behaviour. C# has two types: (1) compile-time / static — method and operator overloading, decided at compile time. (2) runtime / dynamic — method overriding using virtual/override or abstract, decided at runtime based on actual object type."
      },
      {
        q: "Difference between method overloading and method overriding?",
        a: "Overloading: same method name, different parameter list, in the SAME class. Resolved at compile time. Overriding: same method signature, defined in DERIVED class, replaces base implementation. Resolved at runtime based on actual object type."
      },
      {
        q: "How does runtime polymorphism work internally?",
        a: "Each class with virtual methods has a v-table (virtual method table) — an array of method pointers. Each object header has a pointer to its class's v-table. When you call a virtual method, runtime looks up the actual v-table and jumps to the right method. This is called dynamic dispatch."
      },
      {
        q: "Difference between abstract class and interface?",
        a: "Abstract class: can have fields, constructors, mixed implemented and unimplemented methods. A class can inherit only one. Use when you have shared base behaviour. Interface: only signatures (and from C# 8, default methods). A class can implement many. Use to define a contract / capability."
      },
      {
        q: "Can we override a static method in C#?",
        a: "No. Static methods belong to the class, not the object — there is no v-table for them. We can only HIDE them in a derived class using 'new', but that is not real polymorphism. To get polymorphic behaviour, the method must be instance-level and virtual."
      }
    ],
    followUpQuestions: [
      { q: "Compile-time polymorphism is achieved by?", a: "Method overloading and operator overloading." },
      { q: "Runtime polymorphism is achieved by?", a: "Method overriding using virtual / abstract / override." },
      { q: "Can we overload constructors?", a: "Yes — multiple constructors with different parameter lists." },
      { q: "Can we overload methods that differ only in return type?", a: "No — return type is not part of the signature for overloading." },
      { q: "Can we override a non-virtual method?", a: "No — must be virtual, abstract or override in base." },
      { q: "Is polymorphism possible without inheritance?", a: "Yes, via interfaces — the base 'type' is the interface, concrete classes implement it." }
    ],
    commonMistakes: [
      "Trying to override a non-virtual method — compiler error. Add virtual to base or use new (which is just hiding, not polymorphism).",
      "Using long if-else / switch on type — like 'if (n is Email) sendEmail; else if (n is Sms) sendSms;' — defeats the purpose. Should use polymorphism or strategy pattern.",
      "Calling virtual methods inside a base class constructor — at that moment the derived class is not yet fully initialised. Unsafe and well-known anti-pattern.",
      "Mixing 'override' and 'new' — creates inconsistent behaviour depending on whether you call through base or derived reference."
    ],
    proTip: "When a senior dev sees a long if-else by type, they immediately think 'this should be polymorphism'. So in interview say: 'Whenever I see a switch on type or repeated isinstance checks, I refactor to polymorphism — it removes the switch and makes adding new types a one-class change.' That is the Open-Closed Principle in action."
  },

  // ============================================================
  // 13. Abstraction (IMPORTANT — has follow-ups)
  // ============================================================
  {
    id: 'abstraction',
    title: '13. Abstraction',
    whatIsThis: [
      "Abstraction means showing only the necessary details and hiding the unnecessary complexity. We focus on WHAT an object does, not HOW it does it.",
      "Simple meaning is — like driving a car. You use steering, accelerator, brake. You don't care about engine internals, fuel injection, gear ratios. The car gives you a simple interface, hides the complex machinery."
    ],
    whyUseIt: [
      "Real systems are huge — payment gateways, databases, message queues, file systems. If every caller had to know all internal details, no one could use them. Abstraction gives a clean, simple surface to use them by.",
      "It also lets us swap implementations without changing the callers. Today we use SMTP for email, tomorrow SendGrid — as long as the IEmailSender contract is the same, callers don't change."
    ],
    realLifeExample: [
      "ATM — you press 'Withdraw 5000', insert card, take cash. You don't see the network calls to bank, the security checks, the cash dispenser motor. The ATM abstracts all that into 4 steps.",
      "Or Entity Framework — you write users.Where(u => u.Age > 18).ToList(). EF translates it to SQL, opens connection, runs query, maps rows to objects. You see one line. That is abstraction."
    ],
    howItWorks: [
      "We define a contract using an interface or an abstract class — only signatures, no internal logic.",
      "Concrete classes implement that contract with the actual logic.",
      "Callers depend on the interface, not the concrete class.",
      "When we want to change implementation, we just register a different concrete class — usually via Dependency Injection.",
      "This is the foundation of clean architecture and testable code (we can mock interfaces in unit tests)."
    ],
    codeExample: `public interface IEmailSender
{
    void Send(string to, string subject, string body);
}

public class SmtpEmailSender : IEmailSender
{
    public void Send(string to, string subject, string body)
        => Console.WriteLine($"[SMTP]     -> {to} : {subject}");
}

public class SendGridEmailSender : IEmailSender
{
    public void Send(string to, string subject, string body)
        => Console.WriteLine($"[SendGrid] -> {to} : {subject}");
}

public class WelcomeService
{
    private readonly IEmailSender _email;
    public WelcomeService(IEmailSender email) => _email = email;

    public void Greet(string user, string emailId)
        => _email.Send(emailId, "Welcome!", $"Hi {user}");
}

// Today — SMTP
new WelcomeService(new SmtpEmailSender())
    .Greet("Rohit", "rohit@x.com");

// Tomorrow — switch to SendGrid, callers don't change
new WelcomeService(new SendGridEmailSender())
    .Greet("Aman", "aman@x.com");`,
    codeOutput: `[SMTP]     -> rohit@x.com : Welcome!
[SendGrid] -> aman@x.com : Welcome!`,
    interviewQuestions: [
      {
        q: "What is abstraction? How is it different from encapsulation?",
        a: "Abstraction is about hiding complexity by exposing only essentials — focuses on WHAT, not HOW. Encapsulation is about bundling data + methods and protecting state through access modifiers. Abstraction is the design view, encapsulation is the implementation view. They work together but solve different problems."
      },
      {
        q: "How do we achieve abstraction in C#?",
        a: "Mainly through interfaces and abstract classes. Interfaces define a pure contract. Abstract classes can have partial implementation but cannot be instantiated. Concrete classes implement these and provide the actual logic. Callers depend on the abstraction, not the concrete class."
      },
      {
        q: "Difference between abstract class and interface?",
        a: "Abstract class: 0 or more implemented members + can have fields, constructors, state. Single inheritance. Use when there's common base logic. Interface: only signatures (plus default methods from C# 8). Multiple inheritance. Use to define capabilities / contracts. Rule of thumb: prefer interface unless you really need shared state."
      },
      {
        q: "Why is abstraction important for testability?",
        a: "If our service depends on a concrete class (like SmtpEmailSender), we cannot test it without actually sending email. If it depends on the interface IEmailSender, we can pass a fake / mock implementation in tests. So abstraction = mockable = testable."
      },
      {
        q: "Can an abstract class have a constructor?",
        a: "Yes. We cannot 'new' an abstract class directly, but its constructor still runs when a derived concrete class is created (called via base()). We use it to initialise common base state for all derived classes."
      }
    ],
    followUpQuestions: [
      { q: "Can we instantiate an abstract class?", a: "No — but its constructor runs when a derived class is created." },
      { q: "Can an abstract class have implemented methods?", a: "Yes — it can mix abstract and concrete members." },
      { q: "Can an interface have fields?", a: "No. Only properties, methods, events. From C# 8, also default-implemented methods." },
      { q: "Can an interface have a constructor?", a: "No." },
      { q: "Can a class implement multiple interfaces?", a: "Yes — that's how C# works around no multiple class inheritance." },
      { q: "When should you choose interface over abstract class?", a: "When you only need a contract and no shared state. Default to interface unless you really need base behaviour." }
    ],
    commonMistakes: [
      "Creating an interface for every class even when there's only ever one implementation — adds noise without benefit.",
      "Putting too much in the interface — many methods nobody uses. Violates Interface Segregation Principle.",
      "Using abstract class where interface would do — limits to single inheritance for nothing.",
      "Leaking implementation details through the abstraction (e.g., method named SaveToMongo on a generic IRepository — ties the abstraction to one DB)."
    ],
    proTip: "Strong line for interview: 'I follow the Dependency Inversion Principle — high-level modules depend on abstractions, not on concrete classes. Combined with DI, this makes my services swappable, testable, and easier to refactor.' This single line touches abstraction, SOLID, DI, and testing — interview gold."
  },

  // ============================================================
  // 14. SOLID Principles (IMPORTANT — has follow-ups)
  // ============================================================
  {
    id: 'solid',
    title: '14. SOLID Principles',
    whatIsThis: [
      "SOLID is a set of 5 design principles given by Uncle Bob (Robert C. Martin). They guide us to write clean, flexible, maintainable object-oriented code. Almost every interview asks at least 1–2 of these.",
      "S — Single Responsibility, O — Open/Closed, L — Liskov Substitution, I — Interface Segregation, D — Dependency Inversion."
    ],
    whyUseIt: [
      "Without SOLID, code becomes a tangled mess — one change breaks ten things, classes do too much, tests are impossible. With SOLID, code stays modular, easy to extend, easy to test, easy to onboard new devs.",
      "These principles are the foundation of every clean architecture, microservice design, and design pattern. If interviewer asks one OOP question, this is usually it."
    ],
    realLifeExample: [
      "S — In an e-commerce app, OrderService should only manage orders. Sending email, generating invoice PDF, updating inventory — each is a separate class. One class, one reason to change.",
      "O — Adding a new payment type (UPI) should not require editing existing payment classes. We just add a new class implementing IPaymentProcessor.",
      "L — A child class should be usable wherever the parent is, without surprises. A Square that breaks Rectangle's invariants violates LSP.",
      "I — Better to have small focused interfaces (IReader, IWriter) than one giant IFile interface that forces everyone to implement read AND write.",
      "D — Our OrderService should depend on IEmailSender, not directly on SmtpEmailSender. Concrete is plugged in by DI container."
    ],
    howItWorks: [
      "Single Responsibility — A class should have only ONE reason to change. If your class is named XAndY, split it. Print methods, save methods, and validate methods belong to different classes.",
      "Open/Closed — Code should be OPEN for extension but CLOSED for modification. Use polymorphism: add a new subclass / strategy instead of editing existing classes.",
      "Liskov Substitution — Anywhere parent is expected, child should work without breaking behaviour. If a method on the child throws NotSupportedException, you've violated LSP.",
      "Interface Segregation — Don't force a class to implement methods it doesn't need. Many small interfaces beat one fat interface.",
      "Dependency Inversion — Depend on abstractions, not concretions. High-level modules and low-level modules both depend on interfaces. This is what enables DI in ASP.NET Core."
    ],
    codeExample: `public interface IPaymentProcessor
{
    void Pay(decimal amount);
}

public class UpiPayment : IPaymentProcessor
{
    public void Pay(decimal amount) => Console.WriteLine($"UPI paid {amount}");
}

public class CreditCardPayment : IPaymentProcessor
{
    public void Pay(decimal amount) => Console.WriteLine($"Credit Card paid {amount}");
}

public class NetBankingPayment : IPaymentProcessor
{
    public void Pay(decimal amount) => Console.WriteLine($"NetBanking paid {amount}");
}

// OCP in action — adding NetBanking did NOT touch existing payment classes
var processors = new List<IPaymentProcessor>
{
    new UpiPayment(),
    new CreditCardPayment(),
    new NetBankingPayment()
};

foreach (var p in processors)
    p.Pay(500);`,
    codeOutput: `UPI paid 500
Credit Card paid 500
NetBanking paid 500`,
    interviewQuestions: [
      {
        q: "What does SOLID stand for?",
        a: "S — Single Responsibility Principle: one class, one reason to change. O — Open/Closed: open for extension, closed for modification. L — Liskov Substitution: child must be usable where parent is. I — Interface Segregation: many small interfaces over one fat one. D — Dependency Inversion: depend on abstractions, not concretions."
      },
      {
        q: "Give a real example of Single Responsibility violation?",
        a: "A UserService that creates user, sends welcome email, AND generates a PDF report. Three reasons to change (DB, SMTP, PDF library). Split into UserService + IEmailSender + IReportGenerator. Each can be tested, replaced, and changed independently."
      },
      {
        q: "How does Open/Closed Principle work in real .NET code?",
        a: "Define an interface like IDiscountStrategy. Every type of discount (FlatDiscount, PercentDiscount, FestiveDiscount) is its own class implementing this interface. To add a new discount, we add a new class — we don't edit any existing class. The system is extended without modification."
      },
      {
        q: "What is the Liskov Substitution Principle? Give an example of violation.",
        a: "Subclass should be substitutable for its base class without breaking expected behaviour. Classic violation: Square inheriting from Rectangle. Setting Rectangle's width and height independently works fine, but Square overrides setters to keep them equal — breaks the parent's contract. This is why composition over inheritance often wins."
      },
      {
        q: "How is Dependency Inversion related to Dependency Injection?",
        a: "DIP is the design principle — high-level modules depend on abstractions. DI is the technique that implements it — the framework or container creates the concrete object and 'injects' it through constructor / property. ASP.NET Core's built-in DI container (services.AddScoped, AddSingleton) is the practical realisation of DIP."
      }
    ],
    followUpQuestions: [
      { q: "S in SOLID stands for?", a: "Single Responsibility Principle." },
      { q: "O in SOLID stands for?", a: "Open/Closed Principle." },
      { q: "L in SOLID stands for?", a: "Liskov Substitution Principle." },
      { q: "I in SOLID stands for?", a: "Interface Segregation Principle." },
      { q: "D in SOLID stands for?", a: "Dependency Inversion Principle." },
      { q: "Who introduced SOLID?", a: "Robert C. Martin (Uncle Bob)." },
      { q: "Which principle pushes you toward small interfaces?", a: "Interface Segregation Principle." },
      { q: "Which principle pushes you toward dependency injection?", a: "Dependency Inversion Principle." }
    ],
    commonMistakes: [
      "Creating an interface for every class blindly to 'follow SOLID' — adds noise, violates YAGNI.",
      "Calling SRP done because file is short — SRP is about reasons to change, not lines of code. A 30-line class can still violate SRP.",
      "Confusing OCP with 'never edit existing code' — you do edit when fixing bugs. OCP is about adding features without modifying existing tested code.",
      "Mixing up Liskov violation with simple compile error — LSP violations are runtime/behaviour issues, not compile issues."
    ],
    proTip: "Most candidates only memorise SOLID names. To stand out, give a TINY real example for each — one line each: 'SRP — separate email sending from order saving. OCP — new payment type as new class, not edit. LSP — Square/Rectangle classic. ISP — printer/scanner/fax. DIP — depend on IRepository, not SqlRepository.' Five lines, full marks."
  }
];
