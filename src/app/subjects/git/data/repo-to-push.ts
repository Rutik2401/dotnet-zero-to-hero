import { GitLesson } from '../topic.types';

const lesson: GitLesson = {
  id: 'repo-to-push',
  title: 'From Repo Creation to First Push — Every Step',
  tldr: 'Push a new project in 7 steps: init → add → commit → make an empty GitHub repo → remote add → branch -M main → push -u. Almost every "can’t push" error is a remote, branch-name, or auth problem.',
  whatIsThis: [
    'This is the complete "happy path" every developer does when starting a project: turn a folder into a Git repo, make your first commit, create a matching repo on GitHub, connect the two, and push your code online.',
    'It is the exact sequence interviewers ask juniors to recite, and the one that trips people up at the connect-and-push step.'
  ],
  whyItMatters: [
    'This flow is your daily entry point to collaboration. If you can do it confidently you can start any project, push to any remote and unblock yourself when the first push fails (which it often does for auth or remote reasons).',
    'Most "I can’t push" problems come from one of three things: no remote set, wrong branch name, or authentication. Knowing the full path tells you exactly which step broke.'
  ],
  realLifeExample: [
    'Imagine you wrote a document on your laptop (local repo) and now you want it in a shared Google Drive folder (GitHub). First you finish a draft and save a checkpoint (commit). Then you create the empty Drive folder (new GitHub repo), tell your laptop where that folder lives (`git remote add origin`), and upload (`git push`).',
    'The empty GitHub repo is just a destination — it does nothing until your local commits are pushed into it.'
  ],
  howItWorks: [
    'Initialise the repo in your project folder: `git init`.',
    'Stage your files: `git add .` (after you have a `.gitignore`!).',
    'Make the first commit: `git commit -m "Initial commit"`.',
    'On GitHub, create a NEW EMPTY repository (do not add a README/license — that creates a conflicting commit).',
    'Connect your local repo to it: `git remote add origin <url>`.',
    'Make sure your branch is named main: `git branch -M main`.',
    'Push and set the upstream so future pushes are just `git push`: `git push -u origin main`.'
  ],
  codeExample: `# 1-3: local repo + first commit
git init
git add .
git commit -m "Initial commit"

# 4: create an EMPTY repo on github.com first, copy its URL

# 5-7: connect and push
git remote add origin https://github.com/you/my-app.git
git branch -M main
git push -u origin main

# from now on, just:
git push`,
  codeOutput: `Enumerating objects: 5, done.
Writing objects: 100% (5/5), 612 bytes, done.
To https://github.com/you/my-app.git
 * [new branch]      main -> main
branch 'main' set up to track 'origin/main'.`,
  mistakeFixes: [
    {
      mistake: 'Creating the GitHub repo WITH a README/license, then pushing — and getting "Updates were rejected because the remote contains work that you do not have locally".',
      badCommand: 'git push -u origin main\n! [rejected] main -> main (fetch first)',
      fix: 'Either create the GitHub repo empty, or pull the remote first with `git pull --rebase origin main`, then push.',
      fixCommand: 'git pull --rebase origin main\ngit push -u origin main',
      why: 'Initialising the GitHub repo with files creates a commit that your local repo has never seen, so the histories diverge. Pulling with `--rebase` replays your local commit on top, then the push fast-forwards cleanly.'
    },
    {
      mistake: 'Adding the wrong remote URL, or adding origin twice, then seeing "remote origin already exists".',
      badCommand: 'git remote add origin <url>\nerror: remote origin already exists.',
      fix: 'Update the existing remote instead of adding a new one. Verify with `git remote -v`.',
      fixCommand: 'git remote set-url origin https://github.com/you/my-app.git\ngit remote -v',
      why: 'A repo can only have one remote called `origin`. `git remote add` fails if it exists; `set-url` changes the address of the one you already have. `git remote -v` shows you the truth.'
    },
    {
      mistake: 'Trying to push with an https URL and a password — GitHub rejects it because password auth over https was removed.',
      fix: 'Use a Personal Access Token (PAT) as the password, or switch to SSH keys. Set the upstream once with `-u`.',
      fixCommand: '# https: paste a PAT when prompted for password\n# or use SSH:\ngit remote set-url origin git@github.com:you/my-app.git',
      why: 'GitHub disabled account-password auth on the command line for security. A PAT or SSH key is the supported credential. This is the single most common "why won’t it push" issue for beginners.'
    },
    {
      mistake: 'Branch is called `master` locally but GitHub expects `main`, leaving an empty-looking repo.',
      fix: 'Rename your branch to main before pushing.',
      fixCommand: 'git branch -M main\ngit push -u origin main',
      why: 'GitHub’s default branch is now `main`. If you push `master`, your code is there but not on the branch people look at by default, so the repo looks empty. `-M` renames (force) the current branch.'
    }
  ],
  cheatsheet: [
    { cmd: 'git init', what: 'Start tracking the project locally.' },
    { cmd: 'git add .', what: 'Stage everything (after adding a .gitignore).' },
    { cmd: 'git commit -m "Initial commit"', what: 'Create the first snapshot.' },
    { cmd: 'git remote add origin <url>', what: 'Connect your local repo to the GitHub repo.' },
    { cmd: 'git branch -M main', what: 'Rename the current branch to main.' },
    { cmd: 'git push -u origin main', what: 'Push and remember the upstream so later pushes are just "git push".' },
    { cmd: 'git remote -v', what: 'Show the connected remote URLs.' },
    { cmd: 'git remote set-url origin <url>', what: 'Fix a wrong remote URL.' }
  ],
  interviewQuestions: [
    {
      q: 'Walk me through pushing a brand-new project to GitHub.',
      a: '`git init` → `git add .` → `git commit -m "Initial commit"` → create an empty repo on GitHub → `git remote add origin <url>` → `git branch -M main` → `git push -u origin main`. After that, plain `git push` works because `-u` set the upstream.'
    },
    {
      q: 'What does the `-u` flag in `git push -u origin main` do?',
      a: 'It sets the upstream (tracking) relationship between your local `main` and `origin/main`. After setting it once, you can run just `git push` and `git pull` without naming the remote and branch every time.'
    },
    {
      q: 'What is "origin" in Git?',
      a: 'Origin is just the default name (a convention, not a keyword) for the remote repository you cloned from or first connected to. You can rename it or have multiple remotes; "origin" is simply the conventional label for the main one.'
    },
    {
      q: 'Your push is rejected with "non-fast-forward" / "fetch first". What do you do?',
      a: 'The remote has commits you do not have locally. Run `git pull --rebase origin main` to bring them in and replay your work on top, resolve any conflicts, then `git push`. Never force-push to a shared branch to "fix" this.'
    }
  ],
  proTip: 'Create the GitHub repo EMPTY (no README, no .gitignore, no license) when you already have local commits. It avoids the diverged-history rejection entirely and makes your first push a clean fast-forward.'
};

export default lesson;
