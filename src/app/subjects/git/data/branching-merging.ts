import { GitLesson } from '../topic.types';

const lesson: GitLesson = {
  id: 'branching-merging',
  title: 'Git Branching & Merging — Feature Branches Without the Fear',
  tldr: 'A branch is just a movable pointer to a commit, so branching is instant and cheap. Merge ties two histories together; a fast-forward simply slides the pointer. Keep main releasable — never build directly on it.',
  whatIsThis: [
    'A branch is a lightweight, movable pointer to a commit. When you create a branch you get an independent line of work, so you can build a feature without touching the stable code on main. Switching branches just moves which line you are working on.',
    'Merging takes the work from one branch and combines it into another. If the target branch has not moved, Git can simply "fast-forward" the pointer; if both branches have new commits, Git creates a merge commit that ties the two histories together.'
  ],
  whyItMatters: [
    'Branches are how every team works in parallel without overwriting each other. One person builds login on a branch, another builds checkout on theirs, and main stays releasable the whole time.',
    'Understanding fast-forward vs merge commit explains the two shapes your history can take — and why "I merged but there’s an extra commit" or "my branch vanished into main with no trace" both happen. Knowing the model means your history stays readable instead of becoming spaghetti.'
  ],
  realLifeExample: [
    'Think of the main branch as the published edition of a book. A feature branch is a working draft you copy off to one side. You can scribble, rewrite and experiment in the draft without changing the published copy.',
    'When the draft is good, you "merge" it back — folding your edits into the published edition. If nobody else changed the book meanwhile, it is a clean swap (fast-forward); if the editor also made changes, you reconcile both sets of edits into one new printing (merge commit).'
  ],
  howItWorks: [
    'Create and switch to a branch in one step: `git switch -c feature/login` (older syntax: `git checkout -b feature/login`).',
    'Make commits on the branch as normal — they live only on this branch, main is untouched.',
    'Switch back to the target branch when ready: `git switch main`.',
    'Pull the latest main first so you merge into up-to-date code: `git pull`.',
    'Merge your feature in: `git merge feature/login`. Fast-forward if main has not moved; otherwise a merge commit is created.',
    'Delete the merged branch to keep things tidy: `git branch -d feature/login`.'
  ],
  codeExample: `# Start a feature branch
git switch -c feature/login      # create + switch
git add .
git commit -m "Add login form"

# Bring it into main
git switch main
git pull                          # get latest first
git merge feature/login          # fast-forward or merge commit

# Clean up
git branch -d feature/login      # delete the merged branch
git branch                        # list remaining branches`,
  codeOutput: `Switched to a new branch 'feature/login'
[feature/login a1b2c3d] Add login form
Switched to branch 'main'
Updating 7c1f9a2..a1b2c3d
Fast-forward
 login.html | 24 ++++++++++++++++++++++++
Deleted branch feature/login (was a1b2c3d).
* main`,
  mistakeFixes: [
    {
      mistake: 'Committing straight to main instead of branching, so every experiment lands in the stable, shared branch.',
      badCommand: 'git switch main\ngit commit -m "try new idea"',
      fix: 'Always branch for new work. If you already committed to main by accident, move the commits onto a branch and reset main back.',
      fixCommand: 'git switch -c feature/idea   # branch keeps your commits\ngit switch main\ngit reset --hard origin/main  # only if main was unpushed',
      why: 'Main should always be releasable. Committing directly makes it hard to review, revert or release cleanly. A branch isolates risk and is the unit a pull request reviews.'
    },
    {
      mistake: 'Running `git branch -D feature/x` (capital D) on a branch whose work was never merged, permanently dropping those commits.',
      badCommand: 'git branch -D feature/x',
      fix: 'Use lowercase `-d`, which REFUSES to delete unmerged work. Only force with `-D` when you are certain the commits are unwanted.',
      fixCommand: 'git branch -d feature/x   # safe: blocks if unmerged\n# recover a force-deleted branch:\ngit reflog\ngit switch -c feature/x <sha>',
      why: '`-d` is a safety net — it errors if the branch has commits not in your current branch. `-D` skips that check. If you already lost it, the commits are still in the reflog for ~90 days, so you can recreate the branch from the SHA.'
    },
    {
      mistake: 'Creating a branch off a stale main, then being surprised by a huge, conflict-heavy merge later.',
      fix: 'Update main before branching, and regularly bring main into a long-running branch to keep it current.',
      fixCommand: 'git switch main\ngit pull\ngit switch -c feature/x\n# later, keep it fresh:\ngit merge main   # or: git rebase main',
      why: 'The further your branch drifts from main, the more the two histories diverge and the bigger the eventual conflict. Branching off fresh main and syncing often keeps merges small and painless.'
    },
    {
      mistake: 'Switching branches with uncommitted changes and either losing track of them or being blocked by Git.',
      badCommand: 'git switch other-branch\n# error: local changes would be overwritten',
      fix: 'Commit your work, or stash it before switching, then restore it after.',
      fixCommand: 'git stash            # shelve changes\ngit switch other-branch\ngit switch -          # back to previous branch\ngit stash pop         # restore changes',
      why: 'Git protects you from silently overwriting unsaved edits. `git stash` cleanly shelves work-in-progress so you can move between branches, then `pop` brings it back exactly where you left off.'
    }
  ],
  cheatsheet: [
    { cmd: 'git switch -c feature/x', what: 'Create and switch to a new branch.' },
    { cmd: 'git switch main', what: 'Switch back to the main branch.' },
    { cmd: 'git merge feature/x', what: 'Merge a branch into the current one.' },
    { cmd: 'git branch', what: 'List your local branches.' },
    { cmd: 'git branch -d feature/x', what: 'Safely delete a merged branch (-D forces).' },
    { cmd: 'git merge --no-ff feature/x', what: 'Force a merge commit so the feature stays visible as a unit.' },
    { cmd: 'git stash', what: 'Shelve uncommitted changes before switching branches.' }
  ],
  interviewQuestions: [
    {
      q: 'What is a branch in Git, really?',
      a: 'A branch is just a lightweight, movable pointer to a commit (a 41-byte file containing a commit SHA). Creating a branch does not copy files — it only adds a new pointer. That is why branching in Git is instant and cheap compared to older VCS that copied whole directories.'
    },
    {
      q: 'What is the difference between a fast-forward merge and a merge commit?',
      a: 'A fast-forward happens when the target branch has no new commits since the feature branched — Git just moves the branch pointer forward, producing a linear history with no extra commit. A merge commit (a "true"/3-way merge) happens when both branches advanced — Git creates a new commit with two parents to tie the histories together.'
    },
    {
      q: 'What is the difference between `git switch` and `git checkout`?',
      a: '`git switch` is the newer, focused command for changing branches (`git switch -c x` creates and switches). `git checkout` is older and overloaded — it switches branches AND restores files, which caused confusion, so Git split it into `git switch` (branches) and `git restore` (files). They coexist; switch/restore are preferred for clarity.'
    },
    {
      q: 'How do you delete a branch, and what is the difference between -d and -D?',
      a: '`git branch -d <name>` deletes a branch but refuses if it has commits not yet merged into your current branch (a safety check). `git branch -D <name>` force-deletes regardless. To delete a remote branch: `git push origin --delete <name>`.'
    },
    {
      q: 'What does `git merge --no-ff` do and why use it?',
      a: 'It forces a merge commit even when a fast-forward was possible, so the feature branch’s existence is preserved as an explicit merge point in history. Teams use it to keep features grouped and easy to revert as a unit, at the cost of a less-linear log.'
    }
  ],
  proTip: 'Adopt a naming convention like `feature/`, `bugfix/`, `hotfix/` prefixes (e.g. `feature/cart-discount`). It makes `git branch` self-documenting, plays nicely with branch-protection rules, and instantly tells reviewers what a branch is for.'
};

export default lesson;
