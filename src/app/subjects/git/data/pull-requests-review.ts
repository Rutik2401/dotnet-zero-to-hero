import { GitLesson } from '../topic.types';

const lesson: GitLesson = {
  id: 'pull-requests-review',
  title: 'Pull Requests & Code Review — Protected Branches Done Right',
  whatIsThis: [
    'A pull request (PR) is a GitHub feature — not a Git command — that proposes merging one branch into another and opens it for discussion, review and automated checks before it is merged. It is the gate every change passes through on a healthy team.',
    'Protected branches are rules on a branch (usually main) that enforce that gate: require reviews, require passing CI, and block direct or force pushes. Together, PRs and protection are how teams keep main always-releasable.'
  ],
  whyItMatters: [
    'The way you open and review PRs is the most visible signal of seniority on a team. Small, focused PRs get reviewed fast and merged safely; giant ones hide bugs and stall. Reviewers and interviewers both notice immediately.',
    'Branch protection is what prevents the "someone pushed broken code straight to main on Friday" disaster. Knowing how it works shows you understand team safety, not just commands.'
  ],
  realLifeExample: [
    'Think of a PR like submitting an article to an editor instead of publishing straight to the front page. The editor (reviewer) reads it, suggests changes, and automated spell-check (CI) runs. Only when it passes does it go live (merge to main).',
    'A 30-line PR is a tidy one-page article the editor reviews over coffee. A 2,000-line PR is a whole book dropped on their desk — it sits for days and mistakes slip through. Smaller is genuinely safer, not just politer.'
  ],
  howItWorks: [
    'Branch, commit, and push your feature branch: `git push -u origin feature/x`.',
    'Open a PR on GitHub from `feature/x` into `main`, with a clear title and a description of WHAT and WHY (link the issue).',
    'CI runs automatically; reviewers comment. Address feedback by pushing more commits to the same branch — the PR updates itself.',
    'Once approved and green, merge. Choose a strategy: a squash merge collapses the branch into one clean commit on main (common default).',
    'Delete the branch after merge, and `git pull` on main locally to get the merged result.'
  ],
  codeExample: `# Push the branch, then open the PR on GitHub
git switch -c feature/coupon
git push -u origin feature/coupon

# (Optional) open the PR from the CLI with GitHub CLI:
gh pr create --base main --head feature/coupon \\
  --title "Add coupon codes" \\
  --body "Implements #142. Adds validation + tests."

# After approval, GitHub merges it. Then locally:
git switch main
git pull
git branch -d feature/coupon`,
  codeOutput: `branch 'feature/coupon' set up to track 'origin/feature/coupon'.
https://github.com/you/app/pull/57
✓ Pull request #57 created
# after merge + pull:
Updating 7c1f9a2..b8e3d04
Fast-forward
Deleted branch feature/coupon (was 9a1c2f3).`,
  mistakeFixes: [
    {
      mistake: 'Opening a massive PR with 40 files and 2,000 changed lines that mixes a feature, a refactor and a formatting pass.',
      fix: 'Keep PRs small and single-purpose. Split unrelated work into separate PRs; do formatting/refactor in their own PRs so the feature diff is reviewable.',
      fixCommand: '# stack work into focused branches\ngit switch -c refactor/extract-service   # PR 1\ngit switch -c feature/coupon             # PR 2, built on top',
      why: 'Review quality drops sharply with size — reviewers skim huge PRs and bugs slip through. Small, focused PRs get faster, deeper review and are far easier to revert if something breaks.'
    },
    {
      mistake: 'Letting everyone push directly to main with no protection, so unreviewed or breaking code lands in production.',
      fix: 'Turn on branch protection for main: require PRs, require at least one approval, require status checks to pass, and block force-pushes.',
      fixCommand: '# GitHub → Settings → Branches → Add rule for "main":\n# ✓ Require a pull request before merging\n# ✓ Require approvals (1+)\n# ✓ Require status checks to pass',
      why: 'Without protection, a single careless `git push origin main` can break the build for everyone or ship a bug. Protection forces every change through review + CI, which is the whole point of using PRs.'
    },
    {
      mistake: 'Force-pushing to a PR branch after others have reviewed or pulled it, scrambling the review history.',
      badCommand: 'git rebase main\ngit push --force',
      fix: 'Prefer adding new commits while a PR is under active review. If you must rebase/clean up, use `--force-with-lease` and let reviewers know.',
      fixCommand: 'git push --force-with-lease',
      why: 'Reviewers track a PR by its commits and comments; rewriting them mid-review loses that context and can drop a teammate’s pushed change. `--force-with-lease` at least refuses to overwrite work you have not fetched.'
    },
    {
      mistake: 'Treating "Approve" as a rubber stamp and merging your own PR with no real review.',
      fix: 'Require review from someone else, and as a reviewer actually run/read the change. Use "Request changes" when needed, not just "Approve".',
      why: 'Self-review misses the bugs you are blind to — that is exactly why review exists. A genuine second set of eyes catches logic errors, edge cases and security issues before they reach main.'
    }
  ],
  interviewQuestions: [
    {
      q: 'What is a pull request? Is it a Git feature?',
      a: 'A pull request is a feature of hosting platforms like GitHub/GitLab (where it is called a merge request), NOT a core Git command. It proposes merging one branch into another and provides a place for review, discussion and automated checks before the merge happens.'
    },
    {
      q: 'What are protected branches and why use them?',
      a: 'Rules applied to a branch (typically main) that enforce safety: require a PR before merging, require approvals, require passing CI status checks, and block direct/force pushes. They keep main stable and ensure every change is reviewed and tested.'
    },
    {
      q: 'What is the difference between a merge commit, squash merge, and rebase merge on a PR?',
      a: 'Merge commit: keeps all branch commits plus a merge commit (full history). Squash merge: collapses the whole branch into one new commit on main (clean, one-commit-per-feature). Rebase merge: replays the branch’s commits onto main with no merge commit (linear, keeps individual commits). Squash is a common default for tidy history.'
    },
    {
      q: 'How do you make a large change reviewable?',
      a: 'Split it into small, single-purpose PRs (separate refactor, feature and formatting), write a clear description of what and why, link the issue, keep the diff focused, and stack dependent branches. Smaller PRs get faster, higher-quality review.'
    },
    {
      q: 'What makes a good code review as the reviewer?',
      a: 'Actually read and, where useful, run the change; focus on correctness, edge cases, readability and security rather than style nitpicks (let linters do those); leave specific, kind, actionable comments; and use "Request changes" vs "Approve" honestly instead of rubber-stamping.'
    }
  ],
  proTip: 'Write the PR description for the reviewer, not for yourself: one line on WHAT changed, one on WHY, and how you tested it. A 20-second description routinely saves 20 minutes of back-and-forth and gets your PR merged sooner.'
};

export default lesson;
