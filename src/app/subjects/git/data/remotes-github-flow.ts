import { GitLesson } from '../topic.types';

const lesson: GitLesson = {
  id: 'remotes-github-flow',
  title: 'Remotes, Pull/Fetch & GitHub Flow — Collaborate Safely',
  tldr: 'A remote is a hosted copy of your repo; origin is just its default name. fetch downloads without touching your files, pull downloads and merges. Branch → push → PR → merge is the GitHub flow — and you never force-push a shared branch.',
  whatIsThis: [
    'A remote is a version of your repository hosted somewhere else — usually on GitHub. `origin` is the default name for the remote you cloned from. Your local branches and the remote’s branches are separate; commands like push, fetch and pull move commits between them.',
    'GitHub flow is the lightweight team workflow built on this: branch off main, push the branch, open a pull request, get it reviewed, merge to main, deploy. main is always deployable; all work happens on short-lived branches.'
  ],
  whyItMatters: [
    'Almost every "it works on my machine but not on GitHub" or "I lost my teammate’s changes" problem is really a misunderstanding of remotes. Knowing the difference between fetch and pull, and what a tracking branch is, makes collaboration predictable instead of scary.',
    'GitHub flow is the workflow most product teams actually use. Following it keeps main stable and your changes reviewable, which is exactly what an interviewer means by "do you know how to work on a team".'
  ],
  realLifeExample: [
    'Picture a shared Dropbox folder (the remote) and your local copy. `git fetch` is like checking what changed in Dropbox without downloading anything into your working files — you just see "3 new files exist". `git pull` actually downloads those changes and merges them into the documents you are editing right now.',
    'A tracking branch is the link that says "my local main mirrors the Dropbox main", so you can just say "sync" instead of spelling out the source and destination every time.'
  ],
  howItWorks: [
    'See your remotes: `git remote -v`. Add one: `git remote add origin <url>`.',
    'Send your commits up: `git push`. The first time on a new branch, set the upstream: `git push -u origin <branch>`.',
    'Check for upstream changes WITHOUT touching your files: `git fetch`. Then inspect with `git log origin/main`.',
    'Download AND integrate upstream changes into your current branch: `git pull` (which is `fetch` + `merge`, or `fetch` + `rebase` with `--rebase`).',
    'GitHub flow: `git switch -c feature/x` → commit → `git push -u origin feature/x` → open a Pull Request → review → merge → `git pull` on main to get the merged result.'
  ],
  codeExample: `# Inspect remotes
git remote -v

# Push a new branch and start tracking it
git switch -c feature/search
git push -u origin feature/search

# See what's new upstream WITHOUT changing your files
git fetch
git log --oneline origin/main

# Bring upstream changes into your branch
git pull --rebase`,
  codeOutput: `origin  https://github.com/you/app.git (fetch)
origin  https://github.com/you/app.git (push)
branch 'feature/search' set up to track 'origin/feature/search'.
From https://github.com/you/app
   7c1f9a2..a3d9e10  main -> origin/main`,
  mistakeFixes: [
    {
      mistake: 'Force-pushing to a shared branch (like main or develop) to "fix" a rejected push, erasing teammates’ commits.',
      badCommand: 'git push --force origin main',
      fix: 'Never force-push a shared branch. Integrate the remote work first with `git pull --rebase`, resolve conflicts, then push normally. Protect main on GitHub so force-push is blocked outright.',
      fixCommand: 'git pull --rebase origin main\n# resolve conflicts, then:\ngit push',
      why: 'Force-push overwrites the remote’s history with yours, discarding any commits you do not have locally — including a colleague’s work pushed minutes ago. Branch protection rules on GitHub can forbid force-pushes to main entirely, which is the real safeguard.'
    },
    {
      mistake: 'Confusing `git fetch` and `git pull`, then being surprised when files change (or do not).',
      fix: 'Remember: fetch = download only (safe, look first); pull = download + merge into your working branch. Use fetch to inspect, pull to integrate.',
      fixCommand: 'git fetch            # nothing in your files changes\ngit log origin/main  # review first\ngit pull             # now integrate',
      why: '`fetch` updates your remote-tracking branches (`origin/main`) but leaves your working files alone, so you can review before integrating. `pull` immediately merges, which can introduce conflicts you were not ready for.'
    },
    {
      mistake: 'Working for days on a long-lived branch and never syncing main, so the eventual merge is a conflict nightmare.',
      fix: 'Sync regularly: bring main into your branch (or rebase onto it) every day or two so divergence stays small.',
      fixCommand: 'git fetch origin\ngit merge origin/main      # or: git rebase origin/main',
      why: 'The longer a branch lives without integrating main, the more the two diverge, and the harder the final merge. Frequent small syncs turn one giant painful conflict into several trivial ones.'
    },
    {
      mistake: 'A teammate deleted a branch on GitHub, but it still shows in your `git branch -a` forever.',
      fix: 'Prune stale remote-tracking branches when you fetch.',
      fixCommand: 'git fetch --prune\n# or set it as default:\ngit config --global fetch.prune true',
      why: 'Deleting a branch on the remote does not automatically remove your local `origin/<branch>` reference. `--prune` cleans up tracking branches that no longer exist upstream, keeping your branch list honest.'
    }
  ],
  cheatsheet: [
    { cmd: 'git remote -v', what: 'List the configured remotes and their URLs.' },
    { cmd: 'git push -u origin <branch>', what: 'Push a new branch and start tracking it.' },
    { cmd: 'git fetch', what: 'Download upstream changes without touching your files.' },
    { cmd: 'git pull --rebase', what: 'Integrate upstream changes and keep history linear.' },
    { cmd: 'git log --oneline origin/main', what: 'Inspect remote commits before merging.' },
    { cmd: 'git fetch --prune', what: 'Drop tracking branches that were deleted upstream.' },
    { cmd: 'git config --global pull.rebase true', what: 'Make rebase the default for every pull.' }
  ],
  interviewQuestions: [
    {
      q: 'What is the difference between git fetch and git pull?',
      a: '`git fetch` downloads new commits and updates your remote-tracking branches (like `origin/main`) but does NOT modify your working files. `git pull` is `fetch` followed by `merge` (or `rebase`) — it downloads AND integrates the changes into your current branch. Fetch is the safe "look first"; pull applies.'
    },
    {
      q: 'What is "origin" and is it special?',
      a: 'Origin is just the conventional default name for the remote you cloned from or first added — not a keyword. A repo can have multiple remotes with any names (e.g. `origin` and `upstream` in a fork workflow). You can rename it with `git remote rename`.'
    },
    {
      q: 'What is a tracking (upstream) branch?',
      a: 'A local branch configured to correspond to a specific remote branch. Once set (e.g. via `git push -u`), `git push`/`git pull` know the source and destination without you naming them, and `git status` shows "ahead/behind" counts relative to it.'
    },
    {
      q: 'Describe the GitHub flow.',
      a: 'Create a short-lived branch off main, commit work, push it, open a pull request, get review and pass CI, merge into main, then deploy. The core principles: main is always deployable, all changes go through reviewed PRs, and branches are small and short-lived.'
    },
    {
      q: 'Why is force-pushing to a shared branch dangerous?',
      a: 'It overwrites the remote history with your local version, discarding any commits others pushed that you do not have — causing lost work and divergent histories for the whole team. On shared branches, integrate with pull/rebase instead, and use branch protection to block force-pushes.'
    }
  ],
  proTip: 'Set `git config --global pull.rebase true` and `fetch.prune true` once. You get clean linear pulls and an automatically tidy branch list — two senior-feeling habits with zero ongoing effort.'
};

export default lesson;
