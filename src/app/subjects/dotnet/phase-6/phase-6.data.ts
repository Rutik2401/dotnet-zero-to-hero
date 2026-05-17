import { Topic } from './phase-6.types';

export const phase6Topics: Topic[] = [
  // ============================================================
  // 1. Git Fundamentals
  // ============================================================
  {
    id: 'git-fundamentals',
    title: '1. Git Fundamentals',
    whatIsThis: [
      "Git is a distributed version control system. It tracks every change to your code so you can go back in time, work with a team without overwriting each other, and never lose work. The 'distributed' part means every developer has the full history on their machine — no central single point of failure.",
      "Simple meaning is — Git is the 'undo + history + share' button for your code. Every save (commit) is a snapshot you can return to. GitHub is just a hosted Git server (like Google Drive for repos)."
    ],
    whyUseIt: [
      "Without Git, two devs editing app.cs at the same time will overwrite each other's work. Without Git, if you delete a file by mistake, it is gone forever. Without Git, you cannot try a risky change in a separate branch and throw it away if it doesn't work.",
      "Every company uses Git, every interview asks Git questions, every CI/CD pipeline starts from a Git push. Even if you write code alone, Git is non-negotiable."
    ],
    realLifeExample: [
      "Your team is building an e-commerce backend. Rohit is adding the cart API, Sneha is fixing the login bug. Both work on their own branches, push to GitHub, raise a Pull Request, get reviewed, and merge into main. Nobody overwrites the other person's code.",
      "Tomorrow if a bug ships to production, the lead can run 'git log' and see exactly which commit caused it, and 'git revert' that commit in 10 seconds. Without Git, you'd be hunting through emails and chats."
    ],
    howItWorks: [
      "Working directory — your local files where you edit code.",
      "Staging area (index) — where you put files you want to commit (git add).",
      "Local repository — where commits live on your machine (git commit).",
      "Remote repository — GitHub/GitLab/Bitbucket, where the team's commits live (git push / git pull).",
      "Each commit has a unique SHA hash and a parent commit — together they form the history graph."
    ],
    codeLabel: 'Terminal',
    codeExample: `# 1. First-time setup (do once per machine)
git config --global user.name "Rutik Pimpale"
git config --global user.email "rohit@example.com"

# 2. Start a new repo locally
git init                          # creates .git folder
git status                        # what's changed?

# 3. Or clone an existing one from GitHub
git clone https://github.com/user/dotnet-api.git
cd dotnet-api

# 4. Daily workflow — make changes, commit, push
git status                        # see modified files
git diff                          # see line-by-line changes

git add Program.cs                # stage one file
git add .                         # stage everything (careful in big repos)

git commit -m "feat: add /products endpoint"

git log --oneline -5              # last 5 commits
git push origin main              # send to GitHub

# 5. Pull latest changes from team
git pull origin main

# 6. Undo / inspect
git restore Program.cs            # discard local changes
git restore --staged Program.cs   # un-stage but keep changes
git revert <sha>                  # create a new commit that undoes <sha>
git reset --hard <sha>            # ⚠️ destructive — moves branch back, loses work`,
    codeOutput: `On branch main
Your branch is up to date with 'origin/main'.

Changes not staged for commit:
  modified:   Program.cs

(after git add + commit + push)
[main 8a3f1c2] feat: add /products endpoint
 1 file changed, 14 insertions(+), 0 deletions(-)

Counting objects: 4, done.
Writing objects: 100% (3/3), 432 bytes
To https://github.com/user/dotnet-api.git
   2b9d4e1..8a3f1c2  main -> main`,
    interviewQuestions: [
      {
        q: "What is the difference between git pull and git fetch?",
        a: "git fetch downloads changes from the remote into your local refs but does not modify your working files. git pull is fetch + merge — it downloads AND merges into your current branch. fetch is safer when you want to inspect what changed before merging; pull is the quick daily-use command."
      },
      {
        q: "What is the difference between git revert and git reset?",
        a: "git revert creates a NEW commit that undoes a previous commit — history is preserved, safe to use on shared branches. git reset moves the branch pointer back, optionally throwing away commits — rewrites history, dangerous on shared branches because teammates already have those commits. On main/shared branches, always use revert."
      },
      {
        q: "What is the staging area in Git?",
        a: "The staging area (also called the index) is the middle layer between your working directory and the local repository. git add moves changes from working directory to staging. git commit moves them from staging to the local repo. The staging area lets you commit only some changes (not all) — useful when you fixed two unrelated things in one session."
      },
      {
        q: "What is .gitignore and why is it important?",
        a: ".gitignore is a file that tells Git which files/folders to ignore — bin/, obj/, node_modules/, .env, secrets.json. Without it, you'll accidentally commit massive folders or sensitive secrets to the repo. Every project should have one, and you should write it on day one. For .NET, the default Visual Studio .gitignore covers everything."
      },
      {
        q: "What are commits and why are good commit messages important?",
        a: "A commit is a snapshot of your code at a moment in time, with a SHA, an author, a date, and a message. Good messages (like 'fix: handle null user in login flow') make 'git log' readable — your future self and team can understand history in seconds. Bad messages ('changes', 'wip', 'asdf') make debugging hell. Use conventional commits — feat:, fix:, refactor:, docs:."
      }
    ],
    followUpQuestions: [
      { q: "What is HEAD in git?", a: "HEAD is a pointer to the current commit (usually the tip of the current branch)." },
      { q: "How to see the last commit's content?", a: "git show HEAD." },
      { q: "How to discard all local uncommitted changes?", a: "git restore . (or git checkout . in older git)." },
      { q: "Where does git store history?", a: "In the .git folder at repo root." },
      { q: "Difference between local and remote branch?", a: "Local lives on your machine, remote lives on GitHub. They are linked but separate." }
    ],
    commonMistakes: [
      "Committing bin/, obj/, .vs/, secrets — forgetting to add a .gitignore on day one.",
      "Doing 'git add .' in a huge repo without checking — accidentally commits IDE caches or large binaries.",
      "Force-pushing on shared branches like main — overwrites teammates' commits.",
      "Writing one-word commit messages like 'fix' — useless when you need to debug 6 months later."
    ],
    proTip: "On day one of any project, do three things — git init, write a .gitignore, and make the first commit before writing any code. Most 'oops I committed my .env' incidents happen because the .gitignore was added later. Better safe than sorry."
  },

  // ============================================================
  // 2. Git Branching & Merge Conflicts
  // ============================================================
  {
    id: 'git-branching-conflicts',
    title: '2. Git Branching & Merge Conflicts',
    whatIsThis: [
      "A branch in Git is just a movable pointer to a commit. When you create a branch, you create a separate line of work — you can edit, commit, and experiment without affecting main. Once your work is reviewed, you merge it back.",
      "A merge conflict happens when two branches change the same line of the same file in different ways, and Git cannot decide which one to keep. Simple meaning is — Git asks 'two people changed this line, you tell me which one to keep'."
    ],
    whyUseIt: [
      "Branches let multiple people work in parallel without stepping on each other. Feature branches keep main always working — main never has half-broken code. If a feature is bad, just delete the branch.",
      "Merge conflicts are not a bug, they are Git's way of asking for your decision. Knowing how to resolve them calmly is a basic team skill — interviewers love asking this."
    ],
    realLifeExample: [
      "Sneha is working on the 'add Razorpay payment' feature on a branch feature/razorpay-payment. Rohit is working on 'fix discount bug' on bugfix/discount-rounding. Both touch CartService.cs. When Sneha merges first, her changes go in fine. When Rohit tries to merge, Git says 'CartService.cs line 42 conflicts'. He opens the file, sees both versions, picks the right one, commits.",
      "If they had not branched, they would have overwritten each other on main directly — one of them would have lost work."
    ],
    howItWorks: [
      "git branch <name> creates a branch; git switch <name> (or git checkout) moves to it.",
      "git switch -c <name> creates and moves in one step.",
      "Make commits on the branch — only that branch moves forward.",
      "When ready, merge with git merge <branch> (creates a merge commit) or git rebase <branch> (replays commits on top of base — cleaner history).",
      "If two changes overlap, Git stops with conflict markers (<<<<<<< HEAD ... ======= ... >>>>>>> branch) — you edit the file to resolve, then git add + git commit."
    ],
    codeLabel: 'Terminal',
    codeExample: `# Create a feature branch
git switch -c feature/razorpay-payment

# Work, commit, push
echo "// payment logic" >> PaymentService.cs
git add PaymentService.cs
git commit -m "feat: add Razorpay integration"
git push -u origin feature/razorpay-payment   # -u sets upstream

# Update main and rebase your branch on top of it
git switch main
git pull
git switch feature/razorpay-payment
git rebase main                # cleaner than git merge main

# CONFLICT! File looks like this:
#
# <<<<<<< HEAD
# var price = item.Price * 1.18m;       // your version
# =======
# var price = item.Price * 1.05m;       // their version
# >>>>>>> main
#
# 1. Open the file, pick the right line, delete the markers
# 2. Stage and continue:
git add PaymentService.cs
git rebase --continue          # if you were rebasing
# or
git commit                     # if you were merging

# To bail out of a bad rebase
git rebase --abort

# Delete a branch after merge
git branch -d feature/razorpay-payment        # safe delete
git branch -D feature/razorpay-payment        # force delete
git push origin --delete feature/razorpay-payment   # delete on remote`,
    codeOutput: `Switched to a new branch 'feature/razorpay-payment'

[feature/razorpay-payment 4f8a2c1] feat: add Razorpay integration

(after rebase)
First, rewinding head to replay your work on top of it...
Auto-merging PaymentService.cs
CONFLICT (content): Merge conflict in PaymentService.cs
error: could not apply 4f8a2c1... feat: add Razorpay integration

(after fixing and continuing)
Successfully rebased and updated refs/heads/feature/razorpay-payment.`,
    interviewQuestions: [
      {
        q: "What is the difference between git merge and git rebase?",
        a: "merge creates a new merge commit that ties two histories together — preserves the actual order of commits. rebase replays your commits on top of the target branch — gives a linear, clean history but rewrites commit SHAs. Rule of thumb: rebase your local branch onto main before merging, then merge with --no-ff. Never rebase commits that have already been pushed and pulled by others."
      },
      {
        q: "How do you resolve a merge conflict?",
        a: "Open the conflicted file, you'll see <<<<<<< HEAD, =======, >>>>>>> markers. Decide which version to keep (or combine both), delete the markers, save the file, then git add the file and continue with git commit (for merge) or git rebase --continue (for rebase). VS Code and Visual Studio have visual conflict editors that make this much easier."
      },
      {
        q: "What is git stash and when do you use it?",
        a: "git stash temporarily saves your uncommitted changes and gives you a clean working directory. Use it when you need to switch branches urgently but your changes aren't ready to commit. Recover with git stash pop. Useful when manager asks 'quickly check the bug on main' while you have half-done work on your feature branch."
      },
      {
        q: "What is GitFlow vs trunk-based development?",
        a: "GitFlow uses many long-lived branches — main, develop, feature/*, release/*, hotfix/*. Heavy, suits projects with formal release cycles. Trunk-based uses a single main branch with short-lived feature branches that merge in fast (within a day or two) — lighter, suits CI/CD with frequent deploys. Most modern teams use trunk-based."
      },
      {
        q: "What is a fast-forward merge?",
        a: "If the target branch (main) has not moved since your branch started, Git can simply move the main pointer forward to your branch's tip — no merge commit needed. This is a fast-forward merge. Use --no-ff to force a merge commit anyway, which keeps the feature branch visible in history. Many teams prefer --no-ff for traceability."
      }
    ],
    followUpQuestions: [
      { q: "Modern git command to switch branch?", a: "git switch <name> (or git switch -c for create + switch)." },
      { q: "How to see all branches?", a: "git branch -a (a = all, including remote)." },
      { q: "Save work without committing?", a: "git stash → switch branch → git stash pop." },
      { q: "What does git pull --rebase do?", a: "Fetch + rebase your local commits on top of remote — avoids merge commits." },
      { q: "How to bail out of a rebase?", a: "git rebase --abort." }
    ],
    commonMistakes: [
      "Working directly on main without branching — leads to merge headaches and risky pushes.",
      "Long-lived branches that drift far from main — merge conflicts pile up. Rebase or merge main daily.",
      "Force-pushing a shared branch — destroys teammates' commits. Only force-push your own personal feature branch.",
      "Ignoring conflict markers and committing them in — produces broken code. Always run a build after resolving."
    ],
    proTip: "Before raising a PR, I always do 'git switch main && git pull && git switch my-branch && git rebase main && run tests'. This catches conflicts on my machine, not on the reviewer's plate. A clean rebased branch with passing tests gets merged twice as fast."
  },

  // ============================================================
  // 3. GitHub Pull Request Workflow
  // ============================================================
  {
    id: 'github-pr-workflow',
    title: '3. GitHub Pull Request Workflow',
    whatIsThis: [
      "A Pull Request (PR) is a request to merge your branch into another branch (usually main). It opens a discussion page on GitHub where teammates review your code, leave comments, run CI checks, and approve before merge.",
      "Simple meaning is — PR is the formal door through which code enters main. No PR = no merge. The team reviews your work, you fix feedback, CI runs tests, then it gets merged. This is how every real team works."
    ],
    whyUseIt: [
      "Code review catches bugs before they reach production. Two pairs of eyes spot 'you forgot to await this async call' or 'this query has SQL injection' that the author missed.",
      "PRs also create a paper trail — six months later, anyone can see why a change was made, who reviewed it, what tests ran. This history is gold during incidents and audits."
    ],
    realLifeExample: [
      "Rohit finishes the cart-discount feature on his branch. He pushes and opens a PR titled 'feat(cart): apply percentage discount on subtotal'. CI runs unit tests automatically (passes). Senior dev Sneha reviews — leaves 3 comments asking for null checks and a unit test. Rohit pushes more commits to the same branch — PR auto-updates. Sneha approves. Rohit clicks 'Squash and merge'. Branch deletes itself. Cart feature is in main.",
      "Total time: half a day for a 50-line change. But it caught two real bugs and the entire team now knows about the cart discount logic."
    ],
    howItWorks: [
      "Push your feature branch to GitHub: git push -u origin feature/cart-discount.",
      "Open GitHub → click 'Compare & pull request' button or use 'gh pr create' from terminal.",
      "Write a clear title (feat: ..., fix: ...) and a description with context (why, what, how to test).",
      "Reviewers leave comments inline on the diff. You push more commits to address feedback — PR auto-updates.",
      "CI checks run automatically (build, test, lint). All checks must pass.",
      "Once approved, click 'Squash and merge' (combines all commits into one) or 'Merge pull request' (keeps all commits)."
    ],
    codeLabel: 'Terminal / GitHub CLI',
    codeExample: `# 1. Push your branch
git switch -c feature/cart-discount
# ... make changes, commit ...
git push -u origin feature/cart-discount

# 2. Open a PR with GitHub CLI (gh)
gh pr create \\
  --title "feat(cart): apply percentage discount on subtotal" \\
  --body "$(cat <<'EOF'
## Summary
- Adds DiscountService that applies a % discount to cart subtotal
- New endpoint: POST /api/cart/{id}/apply-discount

## Test plan
- [x] Unit tests for DiscountService
- [x] Manually tested with 10% and 20% codes
- [x] CI green

Closes #123
EOF
)"

# 3. Common day-to-day commands
gh pr list                                  # list open PRs
gh pr view 42                               # view PR #42
gh pr checkout 42                           # check out PR #42 locally
gh pr review 42 --approve                   # approve a PR
gh pr review 42 --comment -b "Looks good!"  # leave a comment
gh pr review 42 --request-changes -b "Add null check on line 23"

# 4. After review, push fixes to the SAME branch
git add CartController.cs
git commit -m "fix: add null check on cartId"
git push                                    # PR auto-updates

# 5. Merge from CLI
gh pr merge 42 --squash --delete-branch     # squash merge + delete branch

# 6. Resolve conflicts when GitHub flags them
git switch main && git pull
git switch feature/cart-discount
git rebase main
# ...resolve conflicts...
git push --force-with-lease                 # safer than --force`,
    codeOutput: `https://github.com/myorg/dotnet-api/pull/42

(after CI runs)
✓ build       passed in 1m 32s
✓ tests       passed in 2m 04s
✓ lint        passed in 23s

(after merge)
✔ Squash and merged pull request #42
✔ Deleted branch feature/cart-discount`,
    interviewQuestions: [
      {
        q: "What is the difference between Squash, Merge Commit, and Rebase Merge in GitHub?",
        a: "Squash merge combines all PR commits into one single commit on main — clean history, easy to revert. Merge commit keeps all individual PR commits and adds a merge commit — preserves detailed history. Rebase merge replays each commit on top of main without a merge commit — linear history but multiple commits. Most modern teams use Squash for clean main history."
      },
      {
        q: "Why is code review important?",
        a: "Code review catches bugs early (cheaper than fixing in production), spreads knowledge across the team (no single point of failure), enforces team coding standards, and creates a documented history of decisions. It also makes the reviewer think — explaining your code forces clearer thinking. Skipping reviews is how production incidents happen."
      },
      {
        q: "What goes into a good PR description?",
        a: "Three things — Why (the problem or feature), What changed (high-level summary, not a diff replay), and How to test (steps for reviewer to verify). Link the issue/ticket. Add screenshots for UI changes. Keep it short — if the description needs an essay, the PR is probably too big."
      },
      {
        q: "What is a CODEOWNERS file?",
        a: "A file at the repo root that maps file patterns to GitHub users/teams. When a PR touches those files, the matching reviewers are auto-requested. Useful for enforcing 'database migrations need DBA approval' or 'auth code needs security team review'. GitHub also blocks merge until required code-owners approve."
      },
      {
        q: "What does 'squash and merge' do?",
        a: "It combines all commits in the PR into a single commit on the target branch. Pros: clean linear history on main, easy to revert one feature with one commit. Cons: lose individual commit granularity. Most teams choose squash for main and rely on the PR page itself as history of the smaller commits."
      }
    ],
    followUpQuestions: [
      { q: "How to open a PR from terminal?", a: "gh pr create (after pushing the branch)." },
      { q: "Can a draft PR be merged?", a: "No — convert to ready-for-review first." },
      { q: "How to update a PR after review?", a: "Push more commits to the same branch — PR auto-updates." },
      { q: "Best merge strategy for clean main history?", a: "Squash and merge." },
      { q: "What is a CODEOWNERS file?", a: "Auto-assigns reviewers based on file paths." }
    ],
    commonMistakes: [
      "Huge PRs with 50+ files — reviewers skim and miss bugs. Keep PRs focused: one logical change.",
      "Empty PR description — 'fixes the thing' tells the reviewer nothing.",
      "Force-pushing without --force-with-lease — can overwrite teammates' commits if they were also working on the branch.",
      "Marking conversations as resolved without addressing them — reviewers will reject again."
    ],
    proTip: "I aim for PRs under 300 lines whenever possible. Reviewers actually read small PRs carefully, miss things in big ones. If a feature is naturally bigger, I split it into 3–4 small PRs that build on each other — reviewers stay sharp, and merging happens faster."
  },

  // ============================================================
  // 4. CI/CD Concepts
  // ============================================================
  {
    id: 'cicd-concepts',
    title: '4. CI/CD Concepts (Continuous Integration / Continuous Delivery)',
    whatIsThis: [
      "CI (Continuous Integration) = every push automatically builds the code and runs tests, so problems are caught in minutes, not days. CD (Continuous Delivery / Deployment) = every successful build is automatically packaged and deployed to a test (or production) environment.",
      "Simple meaning is — CI/CD is a robot that watches your repo. The moment you push, it builds, tests, and deploys for you. No manual 'right-click → publish' from someone's laptop on a Friday evening."
    ],
    whyUseIt: [
      "Without CI, two devs merge code that compiles individually but breaks together — the whole team finds out only when someone runs the app locally hours later. With CI, the build fails on the PR within minutes.",
      "Without CD, deployments are manual, error-prone, and only one person knows how to do it. With CD, deploying to staging/prod is one click (or zero clicks for fully automated). Releases happen 10x more often, with 10x less stress."
    ],
    realLifeExample: [
      "Imagine the team is building a Swiggy clone. Every time someone pushes to main: GitHub Actions runs → restore packages → build → run unit tests → run integration tests → publish artifact → deploy to dev environment automatically. If anything fails, the whole team gets a Slack alert.",
      "On Friday, no one is afraid to merge — because if it breaks, the pipeline fails fast and main rolls back. Releases that used to take 2 hours and 3 people now take 10 minutes and zero people."
    ],
    howItWorks: [
      "Trigger — a Git push or PR open fires the pipeline.",
      "Build stage — restore dependencies (dotnet restore), compile (dotnet build).",
      "Test stage — run unit tests (dotnet test), then integration tests. Fail fast on red.",
      "Package stage — produce a deployable artifact (zip, Docker image, NuGet package).",
      "Deploy stage — push the artifact to dev/staging/prod (Azure App Service, Kubernetes, IIS server).",
      "Notify — success/failure to Slack, Teams, or email so the team knows."
    ],
    codeLabel: 'Pipeline Flow',
    codeExample: `┌─────────────────────────────────────────────────────────────┐
│                  CI/CD PIPELINE FOR .NET API                │
└─────────────────────────────────────────────────────────────┘

  Developer pushes code to GitHub
        │
        ▼
  ┌─────────────────┐
  │  TRIGGER        │ on push to main / on pull_request
  └────────┬────────┘
           ▼
  ┌─────────────────┐
  │  CHECKOUT CODE  │ git clone the repo
  └────────┬────────┘
           ▼
  ┌─────────────────┐
  │  RESTORE        │ dotnet restore
  └────────┬────────┘
           ▼
  ┌─────────────────┐
  │  BUILD          │ dotnet build --no-restore -c Release
  └────────┬────────┘
           ▼
  ┌─────────────────┐
  │  TEST           │ dotnet test (fail fast if any test fails)
  └────────┬────────┘
           ▼
  ┌─────────────────┐
  │  PUBLISH        │ dotnet publish -o ./out
  └────────┬────────┘
           ▼
  ┌─────────────────┐
  │  PACKAGE        │ zip ./out  (or build Docker image)
  └────────┬────────┘
           ▼
  ┌─────────────────┐
  │  DEPLOY (DEV)   │ az webapp deploy --src-path ./out.zip
  └────────┬────────┘
           ▼
  ┌─────────────────┐
  │  SMOKE TEST     │ curl /health → 200 OK
  └────────┬────────┘
           ▼
  ┌─────────────────┐
  │  PROMOTE TO QA  │ manual approval gate
  └────────┬────────┘
           ▼
  ┌─────────────────┐
  │  DEPLOY (PROD)  │ blue/green or slot swap
  └────────┬────────┘
           ▼
       NOTIFY  ✅ Slack: "v2.4.1 live in prod"`,
    codeOutput: `[CI] Triggered by push to main (commit 8a3f1c2)
[CI] Restore...     ✅ 4s
[CI] Build...       ✅ 18s
[CI] Test (78)...   ✅ 32s
[CI] Publish...     ✅ 6s
[CD] Deploy DEV...  ✅ 22s
[CD] Smoke test...  ✅ 3s
[CD] Promote? Yes   (manual approval by lead)
[CD] Deploy PROD... ✅ 28s
[Slack] v2.4.1 deployed to prod by GitHub Actions in 2m 13s`,
    interviewQuestions: [
      {
        q: "What is the difference between CI and CD?",
        a: "CI (Continuous Integration) automatically builds and tests every code push. CD has two flavours — Continuous Delivery means the build is always deployable but deploy is manual approval; Continuous Deployment means every passing build auto-deploys to production. Most teams use CI + Continuous Delivery (auto deploy to staging, manual to prod)."
      },
      {
        q: "What is a build artifact?",
        a: "An artifact is the deployable output of a build — a zip of compiled binaries, a NuGet package, or a Docker image. CI produces artifacts; CD takes those artifacts and deploys them. The same artifact is promoted across environments (dev → staging → prod) — so you deploy the EXACT thing you tested, not a fresh build per environment."
      },
      {
        q: "Why is 'build once, deploy many times' important?",
        a: "If you build separately for each environment, the prod build can differ from the staging build (different machine, different cache, different dependency versions). Tests passed in staging won't guarantee prod works. Build once, produce one artifact, deploy that artifact to all environments — guarantees consistency."
      },
      {
        q: "What is a deployment slot in Azure App Service?",
        a: "A slot is a separate copy of your App Service (with its own URL) where you can deploy and test before swapping to production. Common pattern — deploy to 'staging' slot, run smoke tests, then 'swap' staging and prod. Swap is instant and reversible. Zero downtime, instant rollback."
      },
      {
        q: "What are common CI tools?",
        a: "GitHub Actions (most popular for GitHub repos), Azure DevOps Pipelines (great for .NET + Azure), Jenkins (old guard, on-prem), GitLab CI (built into GitLab), CircleCI, TeamCity. For interview context — GitHub Actions and Azure DevOps are the two you absolutely should know in the .NET world."
      }
    ],
    followUpQuestions: [
      { q: "CI stands for?", a: "Continuous Integration — auto build + test on every push." },
      { q: "CD stands for?", a: "Continuous Delivery (manual deploy step) or Continuous Deployment (fully automatic)." },
      { q: "Most popular CI tool for GitHub?", a: "GitHub Actions." },
      { q: "Most popular for Azure ecosystem?", a: "Azure DevOps Pipelines." },
      { q: "Why one artifact for all environments?", a: "Guarantees what was tested is what ships to prod." }
    ],
    commonMistakes: [
      "Tests in CI that pass locally but fail in CI because of environment differences (timezone, DB, env vars).",
      "Skipping CI on 'small fixes' — that one untested fix breaks prod at 9 PM Friday.",
      "Building separately for each environment — different binaries reach prod than were tested.",
      "Long-running pipelines (>10 mins) — devs stop waiting and merge before checking. Optimise for speed."
    ],
    proTip: "On any new project, the first PR I open is 'add CI pipeline' — even before any feature work. A repo without CI rots fast: builds break, tests rot, no one notices. With CI in place from day one, the team has a safety net for everything they ship after."
  },

  // ============================================================
  // 5. GitHub Actions for .NET
  // ============================================================
  {
    id: 'github-actions-dotnet',
    title: '5. GitHub Actions for .NET',
    whatIsThis: [
      "GitHub Actions is GitHub's built-in CI/CD platform. You write YAML files inside .github/workflows/ and GitHub runs them automatically on triggers (push, pull_request, schedule, manual). It is free for public repos and has a generous free tier for private repos too.",
      "Simple meaning is — GitHub Actions = a YAML file that says 'when X happens, run Y commands on a fresh VM'. No extra server, no Jenkins setup, no agents to manage. Code lives next to your repo."
    ],
    whyUseIt: [
      "Setup is zero — push the workflow file, it just runs. No 'install Jenkins, set up agent, configure credentials' nightmare. For .NET projects on GitHub, Actions is the easiest possible CI.",
      "It also has a huge marketplace of pre-built actions — checkout code, set up .NET, login to Azure, deploy to App Service. Most workflows are 80% glue between existing actions, not custom scripts."
    ],
    realLifeExample: [
      "Your .NET API repo has a workflow that runs on every push to main. It restores, builds, runs tests, publishes the binaries, packages a zip, and deploys to Azure App Service — all in 3 minutes. The dev who pushed gets a green tick on their commit before they finish their next chai.",
      "Tomorrow when a new dev joins, they don't need to know any pipeline magic — they push, the bot deploys. Onboarding takes minutes, not days."
    ],
    howItWorks: [
      "Create a file at .github/workflows/dotnet.yml (any name with .yml extension).",
      "Define triggers (on:), jobs (jobs:), and steps inside each job.",
      "Each job runs on a fresh VM (runs-on: ubuntu-latest or windows-latest).",
      "Steps use either commands (run:) or pre-built actions (uses: actions/setup-dotnet@v4).",
      "Secrets (API keys, Azure credentials) live in repo settings → Secrets → Actions, accessed via \${{ secrets.NAME }}.",
      "Artifacts (build output) can be uploaded with actions/upload-artifact and downloaded by later jobs."
    ],
    codeLabel: '.github/workflows/dotnet.yml',
    codeExample: `name: Build, Test & Deploy .NET API

# Triggers
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
  workflow_dispatch:        # also allow manual run

env:
  DOTNET_VERSION: '8.0.x'
  PROJECT_PATH: './src/MyApi/MyApi.csproj'
  AZURE_WEBAPP: 'my-dotnet-api'

jobs:
  # ─── Job 1: Build & Test ──────────────────────────────
  build-test:
    name: Build & Test
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup .NET \${{ env.DOTNET_VERSION }}
        uses: actions/setup-dotnet@v4
        with:
          dotnet-version: \${{ env.DOTNET_VERSION }}

      - name: Restore
        run: dotnet restore

      - name: Build
        run: dotnet build --no-restore -c Release

      - name: Test
        run: dotnet test --no-build -c Release --logger "trx;LogFileName=test-results.trx"

      - name: Publish
        run: dotnet publish \${{ env.PROJECT_PATH }} -c Release -o ./publish --no-build

      - name: Upload artifact
        uses: actions/upload-artifact@v4
        with:
          name: dotnet-app
          path: ./publish

  # ─── Job 2: Deploy to Azure (only on main) ────────────
  deploy:
    name: Deploy to Azure
    needs: build-test
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    runs-on: ubuntu-latest
    environment: production    # requires manual approval
    steps:
      - name: Download artifact
        uses: actions/download-artifact@v4
        with:
          name: dotnet-app
          path: ./publish

      - name: Login to Azure
        uses: azure/login@v2
        with:
          creds: \${{ secrets.AZURE_CREDENTIALS }}

      - name: Deploy to App Service
        uses: azure/webapps-deploy@v3
        with:
          app-name: \${{ env.AZURE_WEBAPP }}
          slot-name: staging        # deploy to slot first
          package: ./publish

      - name: Swap staging → production
        run: |
          az webapp deployment slot swap \\
            --resource-group my-rg \\
            --name \${{ env.AZURE_WEBAPP }} \\
            --slot staging`,
    codeOutput: `Workflow run #128 — feat: add /products endpoint
✓ Build & Test       2m 04s
  ✓ Checkout code             3s
  ✓ Setup .NET                8s
  ✓ Restore                   12s
  ✓ Build                     22s
  ✓ Test (78 passed)          54s
  ✓ Publish                   8s
  ✓ Upload artifact           5s
✓ Deploy to Azure    1m 46s
  ✓ Download artifact         4s
  ✓ Login to Azure            6s
  ✓ Deploy to staging slot    52s
  ✓ Swap staging → prod       38s
✅ Total: 3m 50s — deployed to https://my-dotnet-api.azurewebsites.net`,
    interviewQuestions: [
      {
        q: "What is a GitHub Actions workflow?",
        a: "A YAML file in .github/workflows/ that defines triggers (when to run) and jobs (what to do). Each job runs on a fresh runner (VM) and contains a list of steps. Steps can be shell commands or pre-built actions from the marketplace. The whole config lives in the repo, versioned like any other file."
      },
      {
        q: "What is the difference between job and step?",
        a: "A workflow has multiple jobs. Each job runs on its own runner (fresh VM) and runs in parallel by default unless you use 'needs:' to chain them. A job has multiple steps that run sequentially on the same runner — they share the file system. So jobs = independent units, steps = sequential commands inside one unit."
      },
      {
        q: "How do you store and use secrets in GitHub Actions?",
        a: "Repo Settings → Secrets and variables → Actions → New repository secret. Then access in the workflow via \${{ secrets.MY_SECRET }}. Secrets are encrypted at rest, masked in logs, and never exposed to PR runs from forks. For production deploys, use Environments + protected secrets that require approval to access."
      },
      {
        q: "What is a self-hosted runner and when do you use it?",
        a: "A self-hosted runner is your own machine (on-prem or cloud VM) registered with GitHub Actions to run jobs. Use it when you need access to internal networks (private DBs, on-prem servers), special hardware (GPU), or to avoid GitHub's runner minute charges. For most teams, GitHub-hosted runners are simpler and good enough."
      },
      {
        q: "How do you deploy a .NET app to Azure with GitHub Actions?",
        a: "Three steps — (1) build/test/publish in CI, (2) login with azure/login@v2 using a service principal stored as secret AZURE_CREDENTIALS, (3) deploy with azure/webapps-deploy@v3 pointing at your App Service. For zero-downtime, deploy to a 'staging' slot first, run smoke tests, then swap to production with az webapp deployment slot swap."
      }
    ],
    followUpQuestions: [
      { q: "Where does the workflow file live?", a: ".github/workflows/<name>.yml." },
      { q: "How to access a secret in YAML?", a: "\${{ secrets.NAME }}." },
      { q: "Default Linux runner image?", a: "ubuntu-latest." },
      { q: "How to chain jobs?", a: "Use 'needs: <job-name>' on the dependent job." },
      { q: "How to run workflow manually?", a: "Add 'workflow_dispatch:' under 'on:' triggers." }
    ],
    commonMistakes: [
      "Hardcoding tokens in YAML — push the secret to GitHub Secrets, not the repo.",
      "Re-building inside deploy job — always download the same artifact built in the test job.",
      "Long workflows on every push — gate expensive jobs behind 'if: github.ref == refs/heads/main' to skip on PRs.",
      "Not pinning action versions — using 'actions/checkout@main' breaks when the action updates. Use 'actions/checkout@v4'."
    ],
    proTip: "Always pin actions to a major version like @v4, never @main. Major versions are stable; following @main means a breaking change in the action will break your pipeline overnight without you changing anything. Pin your actions just like you pin NuGet versions."
  },

  // ============================================================
  // 6. Docker Basics
  // ============================================================
  {
    id: 'docker-basics',
    title: '6. Docker Basics (Image, Container, Dockerfile)',
    whatIsThis: [
      "Docker is a tool that packages an application + its dependencies into a single unit called a container. The container runs the same way on your laptop, your colleague's laptop, the CI server, and production — solving the classic 'works on my machine' problem.",
      "Image = blueprint (read-only, like a class). Container = running instance of an image (like an object). Dockerfile = recipe that tells Docker how to build the image. Simple meaning is — image is a frozen snapshot, container is when you press 'play' on that snapshot."
    ],
    whyUseIt: [
      "Without Docker, deploying a .NET app needs the right .NET runtime, right OS libs, right config. Each environment has its own quirks. With Docker, you ship a self-contained container that already has everything baked in.",
      "It also makes scaling easy — start 10 containers from the same image to handle more load. Microservices, Kubernetes, cloud-native — all of it builds on Docker."
    ],
    realLifeExample: [
      "Your team is shipping a .NET 8 API. You build a Docker image once, push to a container registry. Dev, QA, and prod all pull the same image. No 'we forgot to install version X on prod' incidents. New laptop on day one? docker pull, docker run — app is up in 30 seconds, no SDK install needed.",
      "On a microservice setup like Swiggy — order service, restaurant service, payment service — each has its own image. Containers can be killed and restarted in seconds. Deploys become routine."
    ],
    howItWorks: [
      "Write a Dockerfile — a text recipe with FROM, COPY, RUN, EXPOSE, CMD instructions.",
      "docker build -t myapp:1.0 . — builds an image from the Dockerfile. Tags it 'myapp:1.0'.",
      "docker run -p 8080:80 myapp:1.0 — starts a container, maps host port 8080 → container port 80.",
      "docker ps — lists running containers. docker logs <id> — streams logs. docker stop <id> — kills it.",
      "Push to a registry: docker tag myapp:1.0 myregistry.azurecr.io/myapp:1.0 → docker push.",
      "Pull on another machine: docker pull myregistry.azurecr.io/myapp:1.0 → docker run."
    ],
    codeLabel: 'Terminal',
    codeExample: `# 1. Pull and run a public image (Hello World)
docker pull mcr.microsoft.com/dotnet/samples:aspnetapp
docker run -d -p 8080:8080 --name sample mcr.microsoft.com/dotnet/samples:aspnetapp

# Open http://localhost:8080 — sample ASP.NET app is live!

# 2. Common day-to-day commands
docker ps                       # running containers
docker ps -a                    # all (including stopped)
docker images                   # local images
docker logs sample              # logs of 'sample' container
docker logs -f sample           # follow (tail -f style)
docker exec -it sample bash     # shell inside the container
docker stop sample              # stop
docker rm sample                # remove stopped container
docker rmi <image-id>           # remove image

# 3. Inspect what's inside
docker inspect sample           # JSON config of container
docker stats                    # live CPU/RAM usage

# 4. Volumes — persist data outside the container
docker run -d -p 5432:5432 \\
  -e POSTGRES_PASSWORD=secret \\
  -v pgdata:/var/lib/postgresql/data \\
  --name pg postgres:16

# 5. Networks — let containers talk to each other
docker network create app-net
docker run -d --network app-net --name api myapp:1.0
docker run -d --network app-net --name db postgres:16
# now 'api' can reach 'db' by hostname 'db'

# 6. Clean up everything
docker container prune          # remove all stopped containers
docker image prune -a           # remove unused images
docker system prune -a --volumes  # nuke everything (careful!)`,
    codeOutput: `CONTAINER ID   IMAGE                                          COMMAND                  PORTS                    NAMES
8d4f29e7c1a2   mcr.microsoft.com/dotnet/samples:aspnetapp     "./aspnetapp"            0.0.0.0:8080->8080/tcp   sample

(docker logs sample)
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: http://[::]:8080
info: Microsoft.Hosting.Lifetime[0]
      Application started.

(docker stats)
CONTAINER   CPU %    MEM USAGE / LIMIT     MEM %
sample      0.12%    52.3MiB / 1.94GiB     2.63%`,
    interviewQuestions: [
      {
        q: "What is the difference between a Docker image and a container?",
        a: "An image is a read-only template (the 'blueprint') containing the OS layers, runtime, app code, and dependencies. A container is a running instance of an image — has its own filesystem, network, and process space, but shares the host kernel. Think class vs object. One image can spawn many containers."
      },
      {
        q: "What is a Dockerfile?",
        a: "A text file with instructions Docker uses to build an image. Common instructions: FROM (base image), COPY (add files), RUN (run a build command), EXPOSE (declare port), ENTRYPOINT/CMD (what runs when container starts). It is checked into the repo so the team can reproduce the same image anywhere."
      },
      {
        q: "What is the difference between Docker volume and bind mount?",
        a: "Volume — Docker-managed storage on the host (docker volume create); portable, recommended for prod. Bind mount — maps a specific host path into the container; useful in dev for hot-reloading source code. For databases and persistent data, always use volumes — they survive container deletes."
      },
      {
        q: "What does docker exec -it do?",
        a: "exec runs a new command inside a running container. -i = interactive (stdin open), -t = pseudo-TTY (so you get a real shell). Common usage: 'docker exec -it api bash' to get a shell inside the running 'api' container — debug from inside without restarting it."
      },
      {
        q: "Why does Docker use layers?",
        a: "Each Dockerfile instruction (FROM, COPY, RUN) creates a layer. Layers are cached and reused — so changing one line of code doesn't rebuild the entire image, just the layers below the changed one. This makes builds 10x faster after the first run. Order Dockerfile lines so things that change least are at the top."
      }
    ],
    commonMistakes: [
      "Forgetting -p host:container — container runs but you cannot reach it from your browser.",
      "Storing data inside the container's filesystem — wiped on container delete. Always use volumes for persistent data.",
      "Building bloated images (using full SDK as runtime) — multi-GB images, slow deploys. Use multi-stage builds.",
      "Running containers as root — security risk. Add a non-root USER in the Dockerfile."
    ],
    proTip: "Memorise this one-liner — 'docker run -d -p 8080:80 --name myapp myimage:tag'. It does 90% of what you'll do in real work. -d for detached, -p for port mapping, --name for an easy-to-remember name. Almost every Docker task is some variation of this command."
  },

  // ============================================================
  // 7. Dockerizing a .NET API
  // ============================================================
  {
    id: 'dockerize-dotnet-api',
    title: '7. Dockerizing a .NET API (Multi-stage Dockerfile)',
    whatIsThis: [
      "Dockerizing means writing a Dockerfile that packages your .NET API into a Docker image. The standard pattern is a multi-stage build — one stage builds the app using the heavy SDK image, the next stage copies only the published binaries into a small runtime image. Result: tiny final image, secure, fast to deploy.",
      "Simple meaning is — build with the full kitchen, ship only the cooked food. Build stage uses .NET SDK (~700 MB), runtime stage uses .NET ASP.NET runtime (~200 MB) or even smaller alpine variants."
    ],
    whyUseIt: [
      "Single-stage Dockerfiles include the SDK in the final image — bloated, slow to push/pull, more attack surface. Multi-stage gives small runtime images that boot fast and are safer.",
      "It also gives reproducible builds — anyone with Docker can build the exact same image. No more 'works with .NET 8.0.4 but not 8.0.6' issues."
    ],
    realLifeExample: [
      "Your e-commerce API used to ship as a 1.2 GB image with full SDK + tools. After multi-stage Dockerfile, the image dropped to 220 MB — pulls 5x faster, scales 5x faster on Kubernetes, costs less in registry storage, and removes 800 MB of unused tooling from production servers.",
      "Same Dockerfile is used in CI to build, in dev to run locally with docker-compose, and in prod to deploy. One file rules them all."
    ],
    howItWorks: [
      "Stage 1 (build): Use mcr.microsoft.com/dotnet/sdk image. Copy csproj first (for layer caching), restore, copy rest of source, build, publish.",
      "Stage 2 (runtime): Use mcr.microsoft.com/dotnet/aspnet image (no SDK). Copy ONLY the published output from stage 1.",
      "EXPOSE 8080 — declare the port (informational; you still need -p in docker run).",
      "ENTRYPOINT [\"dotnet\", \"MyApi.dll\"] — what runs when the container starts.",
      "Use a non-root USER for security. Add HEALTHCHECK so orchestrators can detect unhealthy containers.",
      "docker-compose.yml ties together API + DB + Redis for local dev — one 'docker compose up' starts everything."
    ],
    codeLabel: 'Dockerfile',
    codeExample: `# syntax=docker/dockerfile:1

# ─── Stage 1: BUILD ─────────────────────────────────────
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy csproj files first — better layer caching
# (changes to source won't invalidate the restore layer)
COPY ["src/MyApi/MyApi.csproj", "MyApi/"]
COPY ["src/MyApi.Tests/MyApi.Tests.csproj", "MyApi.Tests/"]
RUN dotnet restore "MyApi/MyApi.csproj"

# Now copy the rest of the source and build
COPY src/ .
WORKDIR /src/MyApi
RUN dotnet build "MyApi.csproj" -c Release -o /app/build --no-restore

# Run tests as part of the image build (optional)
WORKDIR /src/MyApi.Tests
RUN dotnet test --no-restore --logger "console;verbosity=minimal"

WORKDIR /src/MyApi
RUN dotnet publish "MyApi.csproj" -c Release -o /app/publish --no-build /p:UseAppHost=false

# ─── Stage 2: RUNTIME ───────────────────────────────────
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

# Add a non-root user (security best practice)
RUN groupadd -r appgroup && useradd -r -g appgroup appuser

# Copy ONLY the published binaries from build stage
COPY --from=build /app/publish .

# Optional health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s \\
  CMD curl --fail http://localhost:8080/health || exit 1

USER appuser
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080
ENTRYPOINT ["dotnet", "MyApi.dll"]

# ─── Build & run ─────────────────────────────────────
# docker build -t myapi:1.0 .
# docker run -d -p 8080:8080 --name api myapi:1.0
# curl http://localhost:8080/health

# ─── docker-compose.yml — local dev with API + DB ────
# version: "3.9"
# services:
#   api:
#     build: .
#     ports: ["8080:8080"]
#     environment:
#       - ConnectionStrings__Default=Server=db;Database=shop;User=sa;Password=Pass@123
#     depends_on: [ db ]
#   db:
#     image: mcr.microsoft.com/mssql/server:2022-latest
#     environment:
#       - SA_PASSWORD=Pass@123
#       - ACCEPT_EULA=Y
#     ports: ["1433:1433"]
#     volumes: [ "sqldata:/var/opt/mssql" ]
# volumes:
#   sqldata:`,
    codeOutput: `[+] Building 142.3s (18/18) FINISHED
 => [build 1/8] FROM mcr.microsoft.com/dotnet/sdk:8.0       0.0s
 => [build 2/8] WORKDIR /src                                 0.1s
 => [build 3/8] COPY MyApi.csproj MyApi/                     0.1s
 => [build 4/8] RUN dotnet restore                          18.4s
 => [build 5/8] COPY src/ .                                  0.2s
 => [build 6/8] RUN dotnet build -c Release                 22.7s
 => [build 7/8] RUN dotnet test                             54.1s
 => [build 8/8] RUN dotnet publish                          12.3s
 => [final 1/4] FROM mcr.microsoft.com/dotnet/aspnet:8.0     0.0s
 => [final 2/4] WORKDIR /app                                 0.1s
 => [final 3/4] COPY --from=build /app/publish .             0.4s
 => [final 4/4] USER appuser                                 0.1s

myapi:1.0 — final image size: 218 MB

(docker run + curl /health)
{
  "status": "Healthy",
  "totalDuration": "00:00:00.0042"
}`,
    interviewQuestions: [
      {
        q: "What is a multi-stage Docker build and why use it?",
        a: "A Dockerfile with multiple FROM lines, where later stages copy only what they need from earlier stages. The build stage has the full SDK; the final stage has only the runtime + published binaries. Benefits: dramatically smaller final image (~200 MB vs ~1 GB), no SDK/secrets leaked in production, faster deploys, smaller attack surface. Always use multi-stage for production."
      },
      {
        q: "Why copy the .csproj before the rest of the source?",
        a: "Docker caches each layer. If you copy the .csproj first and run dotnet restore, that layer is cached. When you change a .cs file, only the layers AFTER the COPY of source code are rebuilt — restore is reused from cache. This makes incremental builds 5–10x faster. Order Dockerfile commands by 'how often does this change' — least frequent on top."
      },
      {
        q: "What is the difference between ENTRYPOINT and CMD?",
        a: "ENTRYPOINT defines the executable that always runs when the container starts. CMD defines default arguments to that executable, which the user can override at docker run. Common pattern — ENTRYPOINT [\"dotnet\", \"MyApi.dll\"] + CMD [] (no extra args). For most .NET apps, just use ENTRYPOINT."
      },
      {
        q: "Why run as a non-root user?",
        a: "By default Docker runs containers as root. If an attacker exploits a bug in your app and escapes the app boundary, they have root inside the container — and from there sometimes on the host. Adding 'USER appuser' (a non-root user with limited rights) is a basic hardening step every production Dockerfile should have."
      },
      {
        q: "What is docker-compose and when do you use it?",
        a: "docker-compose is a tool that runs multi-container apps from a single docker-compose.yml file. Useful in dev to spin up your API + database + Redis + queue with one command (docker compose up). For production, prefer Kubernetes/ECS, but compose is the simplest way to get a dev environment running locally."
      }
    ],
    followUpQuestions: [
      { q: "Smallest .NET runtime image variant?", a: "mcr.microsoft.com/dotnet/aspnet:8.0-alpine — even smaller." },
      { q: "Where to put EXPOSE?", a: "In the final runtime stage, before ENTRYPOINT." },
      { q: "How to override ENTRYPOINT at run time?", a: "docker run --entrypoint=bash myimage." },
      { q: "How to copy from previous build stage?", a: "COPY --from=build <path> <dest>." },
      { q: "How to start API + DB locally?", a: "docker compose up — needs docker-compose.yml." }
    ],
    commonMistakes: [
      "Not using multi-stage — shipping a 1 GB image with full SDK to production.",
      "Copying everything before restore — restore re-runs every time any file changes, kills cache.",
      "Hardcoding connection strings inside the Dockerfile — pass them via environment variables (env vars or secrets).",
      "Not using .dockerignore — bin/, obj/, .git/ are copied into the build context, slowing builds and bloating layers."
    ],
    proTip: "I always pair the Dockerfile with a .dockerignore file (similar to .gitignore but for Docker context). It excludes bin/, obj/, .git/, *.user files. The build context drops from hundreds of MB to a few MB — builds become noticeably faster and you don't accidentally bake test DBs or local secrets into the image."
  },

  // ============================================================
  // 8. IIS Hosting
  // ============================================================
  {
    id: 'iis-hosting',
    title: '8. IIS Hosting (ASP.NET Core on Windows Server)',
    whatIsThis: [
      "IIS (Internet Information Services) is Microsoft's web server that ships with Windows Server. Many enterprise .NET apps still run on IIS — especially in companies with on-prem servers or older infrastructure. ASP.NET Core uses the ASP.NET Core Module to integrate with IIS as a reverse proxy.",
      "Simple meaning is — IIS sits in front of Kestrel (the ASP.NET Core web server). Browser → IIS → Kestrel → your app. IIS handles SSL, gzip, static files, and forwards dynamic requests to Kestrel."
    ],
    whyUseIt: [
      "Many companies have years of investment in Windows Server, IIS, Active Directory integration, and on-prem hosting. Cloud-native is great, but real .NET interviews ask about IIS because half the production .NET fleet still runs on it.",
      "IIS gives you battle-tested features — Windows authentication, application pools (process isolation), URL rewrite, automatic restart on failure. Setting it up is a basic skill for any .NET dev."
    ],
    realLifeExample: [
      "A bank's internal HRMS portal runs ASP.NET Core 8 on a Windows Server 2022 with IIS. Users hit https://hrms.bank.local — IIS terminates SSL, authenticates via Windows AD, and forwards to the dotnet.exe process running the HRMS app. The app pool restarts the process if it crashes.",
      "Deployments are still 'publish folder + copy to server' because the bank's policy doesn't allow Docker on production servers. IIS hosting is unavoidable."
    ],
    howItWorks: [
      "Install IIS (Server Manager → Roles → Web Server) and the .NET Hosting Bundle on the server (one MSI from Microsoft).",
      "Publish the app — dotnet publish -c Release -o ./publish — gives a folder ready to deploy.",
      "Create a new Site in IIS pointing to the publish folder. Set its App Pool to 'No Managed Code' (because ASP.NET Core runs out-of-process via dotnet.exe, not via .NET Framework's CLR inside IIS).",
      "web.config inside the publish folder tells IIS how to start dotnet.exe.",
      "IIS receives request → ASP.NET Core Module forwards to Kestrel → app handles it.",
      "Iisreset, restart app pool, recycle worker process — common troubleshooting steps."
    ],
    codeLabel: 'Terminal / web.config',
    codeExample: `# 1. Publish the app
dotnet publish -c Release -o C:\\inetpub\\sites\\myapi --no-restore

# 2. Install IIS + .NET Hosting Bundle on the server
# (Hosting Bundle adds the ASP.NET Core Module — required)
# Download: https://dotnet.microsoft.com/download/dotnet/8.0

# 3. PowerShell — create App Pool and Site
Import-Module WebAdministration

# App Pool — "No Managed Code" because .NET Core runs out-of-process
New-WebAppPool -Name "MyApiPool"
Set-ItemProperty IIS:\\AppPools\\MyApiPool -Name managedRuntimeVersion -Value ""
Set-ItemProperty IIS:\\AppPools\\MyApiPool -Name processModel.identityType -Value 4

# Site
New-Website -Name "MyApi" \`
            -PhysicalPath "C:\\inetpub\\sites\\myapi" \`
            -Port 80 \`
            -ApplicationPool "MyApiPool"

# 4. web.config inside publish folder (auto-generated by dotnet publish)
# (This is what tells IIS how to launch dotnet.exe)

<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <location path="." inheritInChildApplications="false">
    <system.webServer>
      <handlers>
        <add name="aspNetCore"
             path="*"
             verb="*"
             modules="AspNetCoreModuleV2"
             resourceType="Unspecified" />
      </handlers>
      <aspNetCore processPath="dotnet"
                  arguments=".\\MyApi.dll"
                  stdoutLogEnabled="true"
                  stdoutLogFile=".\\logs\\stdout"
                  hostingModel="inprocess">
        <environmentVariables>
          <environmentVariable name="ASPNETCORE_ENVIRONMENT" value="Production" />
        </environmentVariables>
      </aspNetCore>
    </system.webServer>
  </location>
</configuration>

# 5. Common troubleshooting commands
iisreset                                        # restart entire IIS
Restart-WebAppPool -Name "MyApiPool"            # restart just the app pool
Get-WebAppPoolState -Name "MyApiPool"           # is it running?

# View IIS logs (HTTP requests)
Get-Content "C:\\inetpub\\logs\\LogFiles\\W3SVC1\\u_ex*.log" -Tail 50

# View ASP.NET Core stdout logs (your app's logs)
Get-Content "C:\\inetpub\\sites\\myapi\\logs\\stdout_*.log" -Tail 50`,
    codeOutput: `Name              State    Applications
----              -----    ------------
MyApiPool         Started  {MyApi}

(curl http://localhost/health)
{"status":"Healthy"}

(stdout log)
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: http://127.0.0.1:5000
info: Microsoft.Hosting.Lifetime[0]
      Application started. Press Ctrl+C to shut down.
info: Microsoft.Hosting.Lifetime[0]
      Hosting environment: Production`,
    interviewQuestions: [
      {
        q: "How does ASP.NET Core integrate with IIS?",
        a: "Through the ASP.NET Core Module (ANCM). IIS receives the request, ANCM forwards it to the dotnet.exe process running Kestrel, which serves the app. There are two hosting models — InProcess (ANCM hosts CoreCLR inside IIS, faster) and OutOfProcess (ANCM proxies to a separate dotnet.exe). InProcess is the default and recommended."
      },
      {
        q: "Why is the IIS App Pool set to 'No Managed Code' for ASP.NET Core?",
        a: "Because ASP.NET Core does NOT run inside IIS's .NET Framework CLR. It runs as its own dotnet.exe process. Setting App Pool to 'No Managed Code' tells IIS not to try to load the .NET Framework runtime — the ASP.NET Core Module handles everything externally."
      },
      {
        q: "What is the difference between InProcess and OutOfProcess hosting?",
        a: "InProcess: dotnet runs inside the IIS worker process (w3wp.exe), no extra hop, faster. OutOfProcess: ANCM forwards requests to an external dotnet.exe via HTTP — slower but isolates the app from IIS. Most apps use InProcess; OutOfProcess is rare today, used when you need IIS-level isolation."
      },
      {
        q: "What is web.config in an ASP.NET Core app on IIS?",
        a: "It tells IIS how to launch the app — which exe (dotnet), what arguments (.\\MyApi.dll), the hosting model (inprocess), environment variables, and stdout logging. dotnet publish auto-generates it. You only edit it for special cases like setting environment-specific env vars."
      },
      {
        q: "How do you deploy a new version of an ASP.NET Core app to IIS?",
        a: "Three steps — (1) dotnet publish to a folder, (2) stop the app pool (or use 'app_offline.htm' for graceful shutdown), (3) copy files to the IIS site folder, restart app pool. Common pattern is to use Web Deploy or msdeploy.exe to automate this. CI/CD typically uses 'IIS Web App Deploy' task in Azure DevOps."
      }
    ],
    followUpQuestions: [
      { q: "Module that bridges IIS and ASP.NET Core?", a: "ASP.NET Core Module (ANCM)." },
      { q: "Default hosting model?", a: "InProcess (faster than OutOfProcess)." },
      { q: "App Pool managed runtime for ASP.NET Core?", a: "'No Managed Code'." },
      { q: "Where to find IIS request logs?", a: "C:\\inetpub\\logs\\LogFiles\\W3SVC1\\." },
      { q: "Graceful app shutdown trick?", a: "Drop app_offline.htm in the site root." }
    ],
    commonMistakes: [
      "Forgetting to install the .NET Hosting Bundle on the server — site shows HTTP 502.5.",
      "Setting App Pool to '.NET CLR Version v4.0' instead of 'No Managed Code' — ASP.NET Core won't start.",
      "Not enabling stdout logs in web.config — debugging startup failures becomes impossible.",
      "Copying files while app pool is running — file lock errors. Stop pool or use app_offline.htm first."
    ],
    proTip: "Whenever an IIS-hosted ASP.NET Core site shows HTTP 500 / 502.5, the first thing I check is the stdout log (set stdoutLogEnabled='true' in web.config). 90% of the time the answer is in there — missing connection string, missing env var, missing dependency. IIS itself rarely lies; it's almost always a startup error from the .NET app."
  },

  // ============================================================
  // 9. Azure App Service Deployment
  // ============================================================
  {
    id: 'azure-app-service',
    title: '9. Azure App Service Deployment',
    whatIsThis: [
      "Azure App Service is Microsoft's PaaS (Platform as a Service) for hosting web apps and APIs. You upload your published code, Azure runs it on managed Linux/Windows servers — no OS patching, no IIS config, no scaling scripts needed. It is the easiest way to deploy a .NET API to the cloud.",
      "Simple meaning is — App Service = 'I write the code, Azure handles the server'. Built-in HTTPS, custom domains, auto-scaling, deployment slots, monitoring — all included."
    ],
    whyUseIt: [
      "On a Windows Server with IIS, you handle patches, security, scaling, backups yourself. On App Service, Microsoft handles all of that. You focus on the code.",
      "Built-in CI/CD integration with GitHub Actions / Azure DevOps. Built-in Application Insights for monitoring. Deployment slots for zero-downtime deploys with one-click rollback. For 90% of .NET APIs, App Service is enough — no need to jump to Kubernetes."
    ],
    realLifeExample: [
      "A startup builds a .NET 8 API for a food delivery app. They deploy to App Service (Linux, B1 tier ~₹1,000/month). Every push to main triggers a GitHub Actions workflow that publishes to a 'staging' slot. They test on staging.api.foodapp.com, then click 'Swap' — production cuts over instantly.",
      "When traffic spikes during dinner time, they scale up to 3 instances with autoscale rules. After dinner, scaled back to 1 — pay only for what they used."
    ],
    howItWorks: [
      "Create an App Service Plan (the underlying VM tier — F1 free, B1 basic, P1v3 production).",
      "Create an App Service inside the plan (the actual app host) — pick runtime stack (.NET 8 on Linux/Windows).",
      "Configure app settings (env vars, connection strings) in Configuration blade — these become env vars in your container/process.",
      "Deploy via az webapp deploy, GitHub Actions, Azure DevOps, FTP, or VS Code Azure extension.",
      "Use Deployment Slots — staging slot gets the new code, smoke test it, then 'swap' with production. Rollback = swap again.",
      "Use Application Insights for telemetry — request rates, errors, slow queries, custom logs."
    ],
    codeLabel: 'Azure CLI',
    codeExample: `# 1. Login and pick subscription
az login
az account set --subscription "MyCompany-Prod"

# 2. Create resource group
az group create --name rg-shop --location centralindia

# 3. Create an App Service Plan (B1 = basic, ~₹1k/mo)
az appservice plan create \\
  --name plan-shop \\
  --resource-group rg-shop \\
  --location centralindia \\
  --sku B1 \\
  --is-linux

# 4. Create the Web App with .NET 8 runtime
az webapp create \\
  --name shop-api-prod \\
  --resource-group rg-shop \\
  --plan plan-shop \\
  --runtime "DOTNETCORE:8.0"
# URL: https://shop-api-prod.azurewebsites.net

# 5. Set app settings (env vars + connection strings)
az webapp config appsettings set \\
  --name shop-api-prod \\
  --resource-group rg-shop \\
  --settings \\
    ASPNETCORE_ENVIRONMENT=Production \\
    Logging__LogLevel__Default=Information

az webapp config connection-string set \\
  --name shop-api-prod \\
  --resource-group rg-shop \\
  --connection-string-type SQLAzure \\
  --settings DefaultConnection="Server=tcp:shop.database.windows.net,1433;Database=shop;User ID=admin;Password=Pass@123;Encrypt=true"

# 6. Build and deploy from local machine
dotnet publish -c Release -o ./publish
cd publish && zip -r ../publish.zip . && cd ..

az webapp deploy \\
  --name shop-api-prod \\
  --resource-group rg-shop \\
  --src-path ./publish.zip \\
  --type zip

# 7. Create a staging slot for zero-downtime deploys
az webapp deployment slot create \\
  --name shop-api-prod \\
  --resource-group rg-shop \\
  --slot staging

# Deploy to staging slot, smoke test, then swap
az webapp deploy --name shop-api-prod --slot staging --src-path ./publish.zip --type zip
curl https://shop-api-prod-staging.azurewebsites.net/health
az webapp deployment slot swap \\
  --name shop-api-prod \\
  --resource-group rg-shop \\
  --slot staging \\
  --target-slot production

# 8. Stream logs (live tail)
az webapp log tail --name shop-api-prod --resource-group rg-shop

# 9. Restart, scale up, scale out
az webapp restart --name shop-api-prod --resource-group rg-shop
az appservice plan update --name plan-shop --sku P1v3            # scale up (bigger VM)
az appservice plan update --name plan-shop --number-of-workers 3  # scale out (3 instances)`,
    codeOutput: `(after az webapp create)
{
  "defaultHostName": "shop-api-prod.azurewebsites.net",
  "state": "Running",
  "kind": "app,linux"
}

(after az webapp deploy)
Deploying to App Service...
Operation completed successfully. Visit your app at:
https://shop-api-prod.azurewebsites.net

(curl /health)
{"status":"Healthy","environment":"Production"}

(az webapp log tail)
2026-05-04T10:32:14 [Information] Now listening on: http://0.0.0.0:8080
2026-05-04T10:32:14 [Information] Application started.
2026-05-04T10:33:01 [Information] HTTP GET /api/products responded 200 in 87 ms`,
    interviewQuestions: [
      {
        q: "What is the difference between App Service Plan and Web App?",
        a: "App Service Plan is the underlying compute (the VM tier — F1, B1, P1v3) that you pay for. Web App is the application running inside the plan. One plan can host multiple apps that share its CPU/memory. Plan = the rented VM, Apps = the websites running on that VM."
      },
      {
        q: "What are deployment slots and why are they useful?",
        a: "Slots are separate copies of your App Service with their own URL, settings, and code (e.g., shop-api-staging.azurewebsites.net). Deploy new version to staging slot, run smoke tests, then 'swap' — production traffic moves to the staging code with zero downtime. If something breaks, swap back instantly. Built-in blue-green deploy."
      },
      {
        q: "How do you store secrets in App Service?",
        a: "Two options. (1) App Settings (Configuration blade) — env vars, encrypted at rest, simple but visible to anyone with portal access. (2) Azure Key Vault — for production-grade secret rotation, managed identity to read secrets, full audit trail. Reference Key Vault from app settings via @Microsoft.KeyVault(...) syntax."
      },
      {
        q: "How do you scale an App Service?",
        a: "Scale UP — change to a bigger plan tier (B1 → P1v3), more CPU/RAM per instance. Scale OUT — increase instance count (1 → 3 instances), Azure load balances between them. Autoscale rules can trigger scale-out based on CPU%, request count, or schedule (more instances at 7pm, fewer at 3am)."
      },
      {
        q: "What is Application Insights?",
        a: "Azure's APM (Application Performance Monitoring) tool. It collects request rates, response times, exceptions, dependency calls (DB, HTTP), custom telemetry. Integrates with App Service via a one-line config. Critical for production — without it, you find out from customers that prod is broken."
      }
    ],
    followUpQuestions: [
      { q: "Free tier of App Service Plan?", a: "F1 — limited, no SLA, good for demos." },
      { q: "Default URL pattern?", a: "<appname>.azurewebsites.net." },
      { q: "How to deploy a zip?", a: "az webapp deploy --src-path file.zip --type zip." },
      { q: "Built-in zero-downtime deploy mechanism?", a: "Deployment Slots + Swap." },
      { q: "Where to set env vars?", a: "Configuration → Application Settings." }
    ],
    commonMistakes: [
      "Hardcoding connection strings in appsettings.json and pushing them to GitHub — leak. Use App Settings.",
      "Deploying directly to production slot — no rollback if it breaks. Always swap from staging.",
      "Picking a Windows plan when your Docker image is Linux — Linux plan is needed.",
      "Forgetting Application Insights — once prod is live, you'll regret not having metrics."
    ],
    proTip: "I always ship with Application Insights wired in from day one. Even on a tiny startup app, the moment a slow query or 500 error happens in prod, App Insights tells you exactly which endpoint, which user, which line. Adding it later means flying blind for the first painful incident."
  },

  // ============================================================
  // 10. Configuration & Secrets in Production
  // ============================================================
  {
    id: 'config-secrets',
    title: '10. Configuration & Secrets (appsettings, env vars, User Secrets, Key Vault)',
    whatIsThis: [
      "Configuration is anything that changes between environments — connection strings, API keys, feature flags, log levels. ASP.NET Core has a layered config system that reads from JSON files, environment variables, command line args, User Secrets (dev), and Azure Key Vault (prod).",
      "Simple meaning is — config is everything you don't want to hardcode. The same compiled code should run in dev, QA, and prod by switching only the config layer."
    ],
    whyUseIt: [
      "If connection strings are hardcoded in C#, you can't change them without recompiling. Worse, secrets in code → secrets in Git → leak. Config separation makes apps portable and secure.",
      "ASP.NET Core's layered config (later layers override earlier ones) means dev uses User Secrets locally, prod uses Key Vault, QA uses env vars — all without a single code change. Same binary, different config — that is the whole point of 'build once, deploy many'."
    ],
    realLifeExample: [
      "Your shop API uses Stripe for payments. The Stripe secret key is different per environment — test key in dev, live key in prod. In dev you store it in User Secrets (encrypted on your machine). In prod, it lives in Azure Key Vault. App Service has Managed Identity to read from Key Vault. Nobody sees the live key, ever — not in Git, not in App Settings, not in logs.",
      "When the key rotates, you update Key Vault. Next request picks up the new key. Zero deploys, zero downtime."
    ],
    howItWorks: [
      "appsettings.json — base config, checked into Git (no secrets here).",
      "appsettings.Production.json / appsettings.Development.json — environment-specific overrides, ASPNETCORE_ENVIRONMENT picks which one loads.",
      "Environment variables — override anything (Logging__LogLevel__Default uses double underscore for nested keys).",
      "User Secrets — local dev only, stored at %APPDATA%\\Microsoft\\UserSecrets\\<id>\\secrets.json — never in Git.",
      "Azure Key Vault — prod secrets store. App reads via Managed Identity (no key needed). Best practice.",
      "Bind to strongly-typed POCOs with Configure<T> + IOptions<T> — clean, testable, no string keys scattered everywhere."
    ],
    codeLabel: 'appsettings.json + Program.cs',
    codeExample: `// 1. appsettings.json — base config (in Git)
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "ConnectionStrings": {
    "Default": "Server=localhost;Database=shopdev;Trusted_Connection=True;TrustServerCertificate=True"
  },
  "Stripe": {
    "PublishableKey": "pk_test_xxx",
    "WebhookEndpoint": "/api/payments/webhook"
  }
  // ⚠️ NO SecretKey here — that goes in User Secrets / Key Vault
}

// 2. appsettings.Production.json — overrides (in Git, no secrets)
{
  "Logging": { "LogLevel": { "Default": "Warning" } }
}

// 3. User Secrets for local dev — set via CLI
//    dotnet user-secrets init
//    dotnet user-secrets set "Stripe:SecretKey" "sk_test_xxx"
//    Stored at %APPDATA%\\Microsoft\\UserSecrets\\<id>\\secrets.json (NEVER in git)

// 4. Strongly-typed config — Program.cs
using Azure.Identity;
using Azure.Extensions.AspNetCore.Configuration.Secrets;

public class StripeOptions
{
    public string PublishableKey { get; set; } = "";
    public string SecretKey      { get; set; } = "";   // from secrets, never appsettings
    public string WebhookEndpoint { get; set; } = "";
}

var builder = WebApplication.CreateBuilder(args);

// In Production: also load from Azure Key Vault via Managed Identity
if (builder.Environment.IsProduction())
{
    var kvUri = new Uri(builder.Configuration["KeyVault:Uri"]!);
    builder.Configuration.AddAzureKeyVault(kvUri, new DefaultAzureCredential());
}

// Bind config section to POCO
builder.Services.Configure<StripeOptions>(
    builder.Configuration.GetSection("Stripe"));

builder.Services.AddDbContext<ShopDbContext>(opts =>
    opts.UseSqlServer(builder.Configuration.GetConnectionString("Default")));

var app = builder.Build();

// 5. Inject IOptions<StripeOptions> in any controller/service
public class PaymentService
{
    private readonly StripeOptions _stripe;

    public PaymentService(IOptions<StripeOptions> opts)
    {
        _stripe = opts.Value;   // strongly typed, IDE-autocompleted
    }

    public string Charge() =>
        $"Charging via Stripe (key starts with {_stripe.SecretKey[..7]}...)";
}

// 6. Override anything via env var (highest priority)
//    Linux: export Stripe__SecretKey=sk_live_xxx
//    Windows: $env:Stripe__SecretKey = "sk_live_xxx"
//    Note: __ (double underscore) maps to nested JSON keys

// Config sources in priority order (later wins):
//   1. appsettings.json
//   2. appsettings.{Environment}.json
//   3. User Secrets (dev only)
//   4. Environment variables
//   5. Command-line args
//   6. Azure Key Vault (added explicitly)`,
    codeOutput: `(local dev — User Secrets active)
Stripe key loaded: sk_test_xxx (length 24)
Connection: Server=localhost;Database=shopdev;...

(prod App Service — Key Vault active)
[INFO] Loaded 3 secrets from Azure Key Vault
Stripe key loaded: sk_live_xxx (length 24)
Connection: Server=tcp:shop.database.windows.net,1433;...

(env var override)
$env:Stripe__SecretKey = "sk_test_override"
Stripe key loaded: sk_test_override`,
    interviewQuestions: [
      {
        q: "How does ASP.NET Core's configuration system work?",
        a: "It's a layered system. Sources are added in order, later sources override earlier ones. Default order: appsettings.json → appsettings.{Environment}.json → User Secrets (dev only) → environment variables → command-line args. You can add custom sources (Key Vault, AWS Parameter Store). The IConfiguration service exposes the merged result."
      },
      {
        q: "Where do you store secrets in development vs production?",
        a: "Dev: User Secrets — encrypted JSON file outside the repo (%APPDATA%\\Microsoft\\UserSecrets\\). Set via 'dotnet user-secrets set'. Prod: Azure Key Vault — production-grade secret store with rotation, audit, and Managed Identity access. Never put secrets in appsettings.json or commit them to Git."
      },
      {
        q: "What is Managed Identity in Azure?",
        a: "It's an Azure-managed service principal automatically attached to resources like App Service, Functions, VMs. Your app authenticates to Key Vault, SQL DB, Storage with no passwords or connection strings — Azure handles the auth handshake invisibly. Setup: enable Managed Identity on App Service → grant access on Key Vault → done. Best practice for cloud-hosted apps."
      },
      {
        q: "How do environment variables override appsettings.json?",
        a: "ASP.NET Core reads env vars after appsettings.json by default — env vars win on conflict. To set a nested JSON key like 'Logging:LogLevel:Default' via env var, use double underscore: Logging__LogLevel__Default=Warning. This works the same on Windows and Linux. App Service 'Application Settings' are surfaced as env vars."
      },
      {
        q: "What is IOptions<T> and why use it?",
        a: "It's a strongly-typed wrapper around config sections. Bind a section to a POCO: services.Configure<StripeOptions>(config.GetSection(\"Stripe\")). Inject IOptions<StripeOptions> anywhere. Benefits: typed access (no magic strings), IDE autocomplete, easy unit testing (just pass a mock options object). Use IOptionsSnapshot<T> for per-request reload, IOptionsMonitor<T> for live reload."
      }
    ],
    followUpQuestions: [
      { q: "Where does User Secrets store its file?", a: "%APPDATA%\\Microsoft\\UserSecrets\\<id>\\secrets.json (Windows). Never in Git." },
      { q: "Env var separator for nested keys?", a: "__ (double underscore)." },
      { q: "Best place for prod secrets in Azure?", a: "Azure Key Vault + Managed Identity." },
      { q: "Strongly-typed config interface?", a: "IOptions<T>, IOptionsSnapshot<T>, IOptionsMonitor<T>." },
      { q: "Variable that picks env-specific appsettings?", a: "ASPNETCORE_ENVIRONMENT (Development / Staging / Production)." }
    ],
    commonMistakes: [
      "Committing connection strings or API keys to Git — biggest production secret leak source.",
      "Using a single appsettings.json for all environments — leads to 'works in dev, breaks in prod'.",
      "Not adding User Secrets to .gitignore (the actual secrets.json file lives outside repo, but if you copy it in, .gitignore matters).",
      "Mixing config string keys all over the code — typo-prone. Always bind to a POCO via IOptions<T>."
    ],
    proTip: "On any new project I follow this rule: 'If a value differs between environments, it goes in config. If it's secret, it goes in User Secrets (dev) or Key Vault (prod).' I never let a single secret live in appsettings.json. Combined with Managed Identity for Azure resources, my apps have zero secrets in source control — and no 'OMG we leaked our API key' incidents."
  }
];
