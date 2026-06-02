import { GitLesson } from '../topic.types';

const lesson: GitLesson = {
  id: 'interview-questions',
  title: 'Git & GitHub Interview Questions + Real-World Scenarios',
  whatIsThis: [
    'A focused finale: the Git and GitHub questions juniors actually get asked in interviews, plus the "what do you do when…" scenarios that you will hit on a real team in your first month.',
    'Treat the mistake/fix cards below as a rescue manual — each is a situation a developer panics in, with the calm, correct way out.'
  ],
  whyItMatters: [
    'Interviewers use Git questions to check that you have actually collaborated, not just memorised commands. The answers that win are the ones with the "it depends" judgement (e.g. pushed vs not pushed).',
    'On the job, the scenarios here decide whether a small mistake is a 30-second fix or a panicked Slack message to the senior dev.'
  ],
  realLifeExample: [
    'Picture your first week: you commit to the wrong branch, your pull gets rejected, and you accidentally commit a `.env` file. None of these are disasters — each has a clean, well-known fix. Knowing them is what makes you look senior fast.'
  ],
  howItWorks: [
    'Read the core Q&A first — Git vs GitHub, delete-last-commit, reset vs revert are near-guaranteed in interviews.',
    'Then walk the scenario cards: each is "the mistake → the fix → why", mirroring real on-the-job panics.',
    'Practise saying the answers out loud — interviews reward a clear spoken explanation more than perfect command recall.'
  ],
  codeExample: `# The one-liners worth memorising:

git reset --soft HEAD~1     # undo last commit, keep changes
git revert HEAD             # safely undo a PUSHED commit
git reflog                  # find lost commits after a bad reset
git switch -c feature/x     # create + switch to a new branch
git stash                   # shelve changes to switch context
git rm -r --cached node_modules  # untrack already-committed files`,
  codeOutput: `# git revert opens an editor, then:
[main 1f2e3d4] Revert "Add broken checkout"
 1 file changed, 12 deletions(-)`,
  mistakeFixes: [
    {
      mistake: 'Scenario: You made several commits on `main`, but they should have been on a feature branch.',
      fix: 'Create a branch at the current point (it brings your commits along), then reset main back to where it should be.',
      fixCommand: 'git branch feature/my-work\ngit reset --hard origin/main   # only if main was unpushed/local\ngit switch feature/my-work',
      why: 'Branches are just pointers to commits. Making a new branch first "saves" your commits onto it; resetting main then rewinds only main. Do the hard reset on main only if those commits were never pushed.'
    },
    {
      mistake: 'Scenario: You committed a password or a `.env` file and pushed it.',
      badCommand: 'git add .\ngit commit -m "config"\ngit push',
      fix: 'Rotate/revoke the secret immediately (assume it is compromised), then remove the file from history with git filter-repo (or BFG) and force-push, and add it to `.gitignore`.',
      fixCommand: 'git rm --cached .env\necho ".env" >> .gitignore\n# scrub from ALL history:\ngit filter-repo --path .env --invert-paths',
      why: 'Deleting the file in a new commit is NOT enough — the secret still sits in earlier history for anyone to read. The only real fixes are rotating the secret and rewriting history to remove it entirely.'
    },
    {
      mistake: 'Scenario: `git push` is rejected with "non-fast-forward" because a teammate pushed first.',
      badCommand: '! [rejected] main -> main (non-fast-forward)',
      fix: 'Bring their work in and replay yours on top, resolve any conflicts, then push. Do not force-push.',
      fixCommand: 'git pull --rebase origin main\n# fix conflicts if any, then:\ngit push',
      why: 'The remote moved ahead of you. `--rebase` puts your commits cleanly on top of theirs so the push fast-forwards. Force-pushing would erase their commit.'
    },
    {
      mistake: 'Scenario: A pull triggered a merge conflict and you don’t know what to do.',
      fix: 'Open the conflicted files, edit between the `<<<<<<<`, `=======`, `>>>>>>>` markers to the desired result, then stage and commit (or continue the rebase). If overwhelmed, `git merge --abort` returns to safety.',
      fixCommand: '# after editing the conflicted files:\ngit add <file>\ngit commit            # or: git rebase --continue\n# or bail out entirely:\ngit merge --abort',
      why: 'Conflicts just mean two people changed the same lines; Git needs you to choose. The markers show both versions. `--abort` is always there to undo the attempt and let you regroup.'
    },
    {
      mistake: 'Scenario: You accidentally committed `node_modules/` and the repo is now huge.',
      fix: 'Add it to `.gitignore`, then untrack it (keeping it on disk) and commit.',
      fixCommand: 'echo "node_modules/" >> .gitignore\ngit rm -r --cached node_modules\ngit commit -m "Stop tracking node_modules"',
      why: '`.gitignore` only stops NEW files from being tracked; it does nothing for files already committed. `git rm --cached` removes them from Git’s tracking while leaving your local copy intact.'
    },
    {
      mistake: 'Scenario: `git status` says "HEAD detached at <sha>" and you’re scared to touch anything.',
      fix: 'You are just viewing an old commit, not on a branch. To keep any work here, make a branch; to leave, switch back to main.',
      fixCommand: '# keep work made here:\ngit switch -c fix/from-detached\n# or just go back:\ngit switch main',
      why: 'Detached HEAD means you checked out a specific commit instead of a branch. Commits made there are not on any branch and can be lost — making a branch attaches them so they are safe.'
    }
  ],
  interviewQuestions: [
    {
      q: 'What is the difference between Git and GitHub?',
      a: 'Git is a distributed version control system — a local command-line tool that tracks file changes and works offline. GitHub is a web platform that hosts Git repositories and adds collaboration (pull requests, issues, code review, Actions). Git is the tool; GitHub is a host for what the tool produces. Alternatives to GitHub include GitLab and Bitbucket.'
    },
    {
      q: 'How do you delete the last commit?',
      a: 'Depends if it is pushed. Unpushed, keep changes: `git reset --soft HEAD~1`. Unpushed, discard changes: `git reset --hard HEAD~1`. Already pushed/shared: `git revert HEAD` to add a new commit that undoes it without rewriting shared history.'
    },
    {
      q: 'What is the difference between git fetch and git pull?',
      a: '`git fetch` downloads new commits from the remote but does NOT change your working files — it just updates your remote-tracking branches so you can inspect what changed. `git pull` is `fetch` + `merge` (or `rebase`): it downloads AND integrates the changes into your current branch. Fetch is the safe "look first"; pull applies it.'
    },
    {
      q: 'What is the difference between merge and rebase?',
      a: 'Merge combines two branches and creates a merge commit, preserving the exact history (non-linear). Rebase moves your commits to replay on top of another branch, producing a clean linear history but rewriting commit hashes. Golden rule: never rebase commits that have been pushed/shared.'
    },
    {
      q: 'What does git stash do?',
      a: 'It shelves your uncommitted changes (staged and unstaged) and reverts your working directory to a clean state, so you can switch branches or pull without committing half-done work. Restore them later with `git stash pop` (apply and remove) or `git stash apply` (apply and keep).'
    },
    {
      q: 'What is a pull request?',
      a: 'A pull request (PR) is a GitHub feature, not a Git command. It proposes merging one branch into another and opens it for review and discussion. Reviewers comment, CI runs, and once approved it is merged. PRs are how teams keep `main` protected and reviewed.'
    },
    {
      q: 'What is the difference between HEAD, working directory and staging area?',
      a: 'HEAD is a pointer to the current commit/branch tip (the last committed snapshot). The working directory is your actual files as they are now. The staging area (index) holds the changes marked with `git add` to go into the next commit. Flow: working dir → (add) → staging → (commit) → HEAD.'
    },
    {
      q: 'How do you create and switch to a new branch?',
      a: 'Modern: `git switch -c feature/x` (or older `git checkout -b feature/x`) creates and switches in one step. `git branch feature/x` only creates it; `git switch feature/x` switches to it.'
    },
    {
      q: 'What is the difference between git revert and git reset?',
      a: 'Reset moves the branch pointer to an earlier commit and rewrites history — safe only for local, unpushed work. Revert creates a new commit that undoes a previous one while keeping history intact — the correct choice for commits already shared. "Reset what is private, revert what is public."'
    },
    {
      q: 'Why might git push fail with "non-fast-forward"?',
      a: 'The remote branch has commits you do not have locally — someone pushed before you. Resolve by `git pull --rebase` (or merge), fix any conflicts, then push. Avoid `git push --force` on shared branches, as it overwrites others’ commits.'
    }
  ],
  proTip: 'In interviews, answer "delete the last commit" and "reset vs revert" with the pushed-vs-not-pushed distinction up front. That one sentence signals you have actually collaborated on a team, which is exactly what the question is testing.'
};

export default lesson;
