import { GitLesson } from '../topic.types';

const lesson: GitLesson = {
  id: 'advanced-git',
  title: 'Advanced Git — Stash, Cherry-pick, Bisect, Hooks & Secrets',
  whatIsThis: [
    'The power tools you reach for once the basics are second nature: `stash` to shelve work, `cherry-pick` to copy a single commit, `bisect` to binary-search for the commit that introduced a bug, hooks to automate checks, and submodules to nest one repo inside another.',
    'And the high-stakes one every developer eventually faces: removing a secret (password, API key, `.env`) that was committed and pushed — which requires rewriting history, not just deleting the file.'
  ],
  whyItMatters: [
    'These commands turn "I’m stuck / I broke something" moments into quick, confident fixes. `git bisect` alone can find a regression in minutes that would take hours of manual checking.',
    'The leaked-secret scenario is a genuine security incident. Knowing the correct response — rotate first, then scrub history — separates someone who contains the damage from someone who makes it worse.'
  ],
  realLifeExample: [
    'Cherry-pick is like photocopying one good paragraph from a draft and pasting it into another document, without bringing the rest of the draft. Bisect is the "guess the number" game: Git keeps halving the range of commits, you say "bug present" or "not", and it pinpoints the exact culprit in log(n) steps.',
    'Removing a committed secret is like discovering a confidential note got printed into every past edition of a newspaper. Pulling today’s copy off the shelf is not enough — the note is in all the archives, so you must reprint the back-issues (rewrite history) AND change the lock the note revealed (rotate the secret).'
  ],
  howItWorks: [
    'Shelve work to switch context: `git stash`, then later `git stash pop`. Name multiple with `git stash list`.',
    'Copy one commit onto your current branch: `git cherry-pick <sha>` (e.g. to pull a hotfix from another branch).',
    'Hunt a regression: `git bisect start`, mark `git bisect bad` (now) and `git bisect good <old-sha>`; test each checkout and mark good/bad until Git names the culprit; then `git bisect reset`.',
    'Automate checks: add a script in `.git/hooks/` (e.g. `pre-commit`) or use a tool like Husky to run linters/tests before commits.',
    'Remove a leaked secret: rotate/revoke it immediately, then rewrite history with `git filter-repo` (or BFG) to purge the file, force-push, and add it to `.gitignore`.'
  ],
  codeExample: `# Stash work to switch branches
git stash
git switch hotfix
git stash pop

# Copy a single commit here
git cherry-pick 9a1c2f3

# Find the commit that introduced a bug
git bisect start
git bisect bad                 # current is broken
git bisect good v1.4.0         # this old tag worked
# ...test, then 'git bisect good' or 'bad' each step...
git bisect reset

# Purge a leaked secret from ALL history
git filter-repo --path .env --invert-paths
git push --force-with-lease --all`,
  codeOutput: `Saved working directory and index state WIP on main
[main 4f2a1c9] cherry-pick: Fix rounding in totals
Bisecting: 6 revisions left to test after this (roughly 3 steps)
9a1c2f3a8b7c6d5e is the first bad commit
    Add discount logic`,
  mistakeFixes: [
    {
      mistake: 'Committing a secret (API key, password, `.env`), then "fixing" it by deleting the file in a new commit and pushing.',
      badCommand: 'git rm .env\ngit commit -m "remove env"\ngit push',
      fix: 'Treat it as compromised: rotate/revoke the secret FIRST. Then rewrite history to remove the file from every commit, force-push, and gitignore it.',
      fixCommand: '# 1. rotate the key at the provider (most important)\n# 2. scrub from all history:\ngit filter-repo --path .env --invert-paths\necho ".env" >> .gitignore\ngit push --force-with-lease --all',
      why: 'Deleting the file in a new commit leaves the secret readable in every earlier commit — and anyone who cloned/forked already has it. The secret must be rotated (assume it leaked) and physically removed from history; the deletion-commit alone does neither.'
    },
    {
      mistake: 'Losing in-progress work because you stashed repeatedly and forgot which stash held what, or dropped the wrong one.',
      fix: 'List and inspect stashes before applying, and prefer committing to a WIP branch for anything you care about.',
      fixCommand: 'git stash list\ngit stash show -p stash@{1}\ngit stash apply stash@{1}   # apply without dropping',
      why: 'Stashes are an anonymous stack — easy to lose track of. `apply` (vs `pop`) keeps the stash until you are sure, and a quick WIP commit on a branch is far harder to lose than a stash entry.'
    },
    {
      mistake: 'Cherry-picking many commits one by one to "move" work between branches, creating duplicates and confusion.',
      fix: 'Cherry-pick is for one or a few specific commits. To move a whole branch’s worth of work, use rebase or merge instead.',
      fixCommand: '# a range, only when truly needed:\ngit cherry-pick A^..B\n# usually better:\ngit rebase --onto main old-base feature',
      why: 'Each cherry-pick creates a NEW commit (different SHA) with the same changes, so the commit exists in two places. For bulk movement that means duplicate history and later merge conflicts; rebase/merge are designed for moving whole lines of work.'
    },
    {
      mistake: 'Adding a submodule without understanding it, then teammates get empty folders and broken builds.',
      fix: 'When cloning a repo with submodules, initialise them; when adding one, document the extra step. Consider whether a package/monorepo is simpler.',
      fixCommand: 'git clone --recurse-submodules <url>\n# or after a normal clone:\ngit submodule update --init --recursive',
      why: 'A submodule is a pointer to another repo at a specific commit; a plain clone does not fetch its contents, leaving empty directories. The `--recurse-submodules` / `update --init` step is required, and forgetting it is a classic "works on my machine" trap.'
    }
  ],
  interviewQuestions: [
    {
      q: 'What does git stash do, and how do you get your work back?',
      a: 'It shelves your uncommitted changes (staged and unstaged) and returns the working directory to a clean state so you can switch branches or pull. Restore with `git stash pop` (apply and remove from the stack) or `git stash apply` (apply but keep it). `git stash list` shows all stashes.'
    },
    {
      q: 'What is git cherry-pick used for?',
      a: 'Applying a specific commit from one branch onto your current branch — e.g. pulling a single bug-fix commit into a release branch without merging the whole feature branch. It creates a new commit with the same changes but a different SHA.'
    },
    {
      q: 'How does git bisect help find a bug?',
      a: 'It binary-searches your history. You mark a known-bad commit and a known-good one; Git checks out the midpoint, you test and mark it good or bad, and it repeats — halving the range each time. In about log2(n) steps it identifies the exact commit that introduced the bug. Finish with `git bisect reset`.'
    },
    {
      q: 'You accidentally committed and pushed a password. What do you do?',
      a: 'First, rotate/revoke the secret immediately — assume it is already compromised since it is in history and possibly cloned. Then rewrite history to remove it from every commit using `git filter-repo` (or BFG Repo-Cleaner), force-push the cleaned history, and add the file to `.gitignore`. Deleting it in a new commit is not enough.'
    },
    {
      q: 'What are Git hooks?',
      a: 'Scripts Git runs automatically at certain points in its lifecycle — e.g. `pre-commit` (lint/test before a commit is created), `commit-msg` (validate the message format), or `pre-push`. They live in `.git/hooks/`; tools like Husky make them shareable across a team via the repo.'
    },
    {
      q: 'What is a Git submodule?',
      a: 'A way to embed one Git repository inside another at a specific commit, tracked as a pointer rather than copied files. Useful for shared libraries, but it adds workflow complexity (must init/update separately), so teams often prefer package managers or monorepos instead.'
    }
  ],
  proTip: 'The instant you suspect a secret was committed, rotate it before touching Git at all. History rewriting removes the evidence, but a key that was ever pushed should be considered public — rotation is the fix that actually closes the hole.'
};

export default lesson;
