import { GitLesson } from '../topic.types';

const lesson: GitLesson = {
  id: 'merge-vs-rebase',
  title: 'Git Merge vs Rebase — When to Use Which (and Conflicts)',
  tldr: 'Merge keeps the true, branching history; rebase rewrites your commits into one clean line. The golden rule: never rebase commits you have already pushed. Reset/rebase what is private, never rewrite what is public.',
  whatIsThis: [
    'Merge and rebase both integrate changes from one branch into another — they reach the same destination by different routes. Merge ties two histories together with a new merge commit, keeping the exact record of what happened. Rebase replays your commits one by one on top of another branch, producing a single straight line of history.',
    'The trade-off is honesty vs tidiness. Merge keeps a truthful, branching record. Rebase rewrites your commits (new SHAs) to make the log read as if you had worked sequentially. Neither is "better" — they fit different situations.'
  ],
  whyItMatters: [
    'This is one of the most common senior-level Git interview questions, and the wrong choice on a real team causes pain: rebasing shared commits forces teammates into messy recovery, while never rebasing can leave a log so tangled nobody can read it.',
    'Knowing when to use each — and the one golden rule that keeps rebase safe — is what lets you keep history clean without breaking collaboration.'
  ],
  realLifeExample: [
    'Imagine you and a colleague both edit a shared document. A merge is like keeping both of your tracked-changes histories and adding a note: "combined Priya’s and Sam’s edits here" — the full story is preserved, including that you worked in parallel.',
    'A rebase is like taking your edits, setting them aside, applying your colleague’s changes first, then re-applying yours on top — so the final document reads as one clean sequence of edits, as if you had gone second on purpose. Tidy, but the original parallel timeline is rewritten.'
  ],
  howItWorks: [
    'To MERGE a feature into main: switch to main, pull latest, then `git merge feature`. Git creates a merge commit if both branches advanced.',
    'To REBASE a feature onto the latest main: while on the feature branch, run `git rebase main`. Git replays each feature commit on top of main’s tip.',
    'If a rebase hits a conflict: fix the conflicted files, `git add` them, then `git rebase --continue`. Repeat until done — or `git rebase --abort` to bail out entirely.',
    'A common clean workflow: rebase your feature onto main to tidy it (`git rebase main`), then merge it into main with a merge commit (`git merge --no-ff feature`) so the feature is still visible as a unit.',
    'The golden rule: only rebase commits that live ONLY on your machine. Never rebase commits already pushed and shared.'
  ],
  codeExample: `# --- MERGE: combine, keep history ---
git switch main
git pull
git merge feature/cart          # may create a merge commit

# --- REBASE: replay your work on top of main ---
git switch feature/cart
git rebase main                 # linear history, new commit SHAs
# conflict? fix files, then:
git add <file>
git rebase --continue
# or give up:
git rebase --abort`,
  codeOutput: `# during a rebase with a conflict:
Auto-merging cart.js
CONFLICT (content): Merge conflict in cart.js
error: could not apply 9a1c2f3... Add discount logic
Resolve all conflicts manually, then run "git rebase --continue".`,
  mistakeFixes: [
    {
      mistake: 'Rebasing commits that were already pushed and shared, then force-pushing — rewriting history out from under teammates.',
      badCommand: 'git rebase main        # on already-pushed commits\ngit push --force',
      fix: 'Never rebase shared history. If others have it, integrate with `git merge` instead. If you MUST force-push your own branch, use `--force-with-lease` so you do not clobber commits you have not seen.',
      fixCommand: 'git merge main                 # safe for shared work\n# or, for your OWN feature branch only:\ngit push --force-with-lease',
      why: 'Rebase creates new commits with new SHAs. Anyone who already pulled the old commits now has a divergent history, leading to duplicated commits and ugly conflicts. `--force-with-lease` refuses to overwrite if the remote moved since you last fetched — a critical safety net over plain `--force`.'
    },
    {
      mistake: 'Panicking during a rebase conflict and running `git merge --abort` (wrong command) or repeatedly committing, making it worse.',
      fix: 'During a rebase, the commands are `git rebase --continue` (after staging fixes) or `git rebase --abort` (to undo the whole rebase). Do not create new commits to "fix" a rebase.',
      fixCommand: '# after editing conflicted files:\ngit add .\ngit rebase --continue\n# to safely undo the entire rebase:\ngit rebase --abort',
      why: 'A rebase is a sequence of replays paused on a conflict. `--continue` resumes it; `--abort` rewinds to exactly where you started. Committing manually mid-rebase breaks that flow and tangles the history.'
    },
    {
      mistake: 'Believing rebase "avoids conflicts". It does not — and you may resolve the SAME conflict on several commits.',
      fix: 'Expect conflicts with both merge and rebase. Rebase resolves them commit-by-commit (possibly repeatedly); merge resolves them once. Enable rerere to remember resolutions.',
      fixCommand: 'git config --global rerere.enabled true\n# git now reuses your recorded conflict resolutions',
      why: 'Conflicts come from changing the same lines, regardless of integration method. Because rebase replays each commit, the same overlapping change can conflict on multiple commits. `rerere` ("reuse recorded resolution") remembers how you solved a conflict and re-applies it automatically.'
    },
    {
      mistake: 'Using `git pull` on a shared branch and getting noisy, pointless merge commits cluttering history.',
      badCommand: 'git pull        # creates a merge commit every time',
      fix: 'Pull with rebase to keep a linear history when bringing in upstream changes to your local branch, and set it as the default.',
      fixCommand: 'git pull --rebase\n# make it the default:\ngit config --global pull.rebase true',
      why: 'A plain `git pull` is fetch + merge, so every sync can add a "Merge branch main" commit. `--rebase` replays your local commits on top instead, keeping the log clean. This is safe because it only rebases YOUR local, unpushed commits.'
    }
  ],
  cheatsheet: [
    { cmd: 'git merge main', what: 'Combine main into your branch (safe for shared work).' },
    { cmd: 'git rebase main', what: 'Replay your commits on top of main for a linear history.' },
    { cmd: 'git rebase --continue', what: 'Resume a rebase after staging conflict fixes.' },
    { cmd: 'git rebase --abort', what: 'Cancel the entire rebase and return to the start.' },
    { cmd: 'git pull --rebase', what: 'Pull upstream changes without noisy merge commits.' },
    { cmd: 'git push --force-with-lease', what: 'Force-push your branch without clobbering others’ work.' },
    { cmd: 'git config --global rerere.enabled true', what: 'Remember and reuse conflict resolutions.' }
  ],
  interviewQuestions: [
    {
      q: 'What is the difference between git merge and git rebase?',
      a: 'Merge combines two branches and records a merge commit, preserving the true, branching history (non-linear). Rebase moves your commits to replay on top of another branch, creating a clean linear history but rewriting commit SHAs. Merge preserves context; rebase prioritises a tidy log.'
    },
    {
      q: 'What is the golden rule of rebasing?',
      a: 'Never rebase commits that have been pushed/shared with others. Rebase rewrites history (new SHAs); if teammates already have the old commits, rebasing and force-pushing creates divergent histories and painful conflicts. Rebase only local, private commits.'
    },
    {
      q: 'When would you prefer rebase over merge, and vice versa?',
      a: 'Prefer rebase to clean up your own local feature branch before sharing — e.g. `git rebase main` or `git pull --rebase` for a linear, readable history. Prefer merge to integrate shared branches and to preserve the real record of how work came together, especially on main/release branches.'
    },
    {
      q: 'How do you resolve a conflict during a rebase?',
      a: 'Git pauses at the conflicting commit. Edit the files to resolve the markers, `git add` them, then `git rebase --continue` to proceed to the next commit. Repeat until finished, or run `git rebase --abort` to undo the entire rebase and return to the starting state.'
    },
    {
      q: 'What is the difference between `git push --force` and `--force-with-lease`?',
      a: '`--force` overwrites the remote branch unconditionally, which can erase commits a teammate pushed since you last fetched. `--force-with-lease` only forces if the remote is still where you last saw it, refusing if someone else pushed in the meantime. Always prefer `--force-with-lease` when a force push is unavoidable.'
    },
    {
      q: 'What does git rerere do?',
      a: '"Reuse recorded resolution" — when enabled, Git records how you resolved a conflict and automatically re-applies that resolution if the same conflict appears again. It is especially useful during rebases and long-running branches where the same conflict can recur.'
    }
  ],
  proTip: 'A clean team workflow: `git pull --rebase` to stay linear day-to-day, rebase your feature branch to tidy it before review, then merge into main with `--no-ff` so each feature stays visible as one revertible unit. Rebase locally, merge publicly.'
};

export default lesson;
