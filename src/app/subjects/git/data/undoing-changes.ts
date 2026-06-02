import { GitLesson } from '../topic.types';

const lesson: GitLesson = {
  id: 'undoing-changes',
  title: 'Undoing Things in Git — reset, revert, restore & reflog',
  whatIsThis: [
    'This lesson is your "oops" toolkit: how to delete the last commit, throw away changes, unstage a file, and — most importantly — recover work you thought you destroyed.',
    'The four commands that cover almost every undo: `git restore` (discard/unstage file changes), `git reset` (move the branch pointer / undo commits locally), `git revert` (undo a commit by making a new one), and `git reflog` (the safety log that lets you get lost commits back).'
  ],
  whyItMatters: [
    'Knowing how to undo safely is what separates calm developers from panicked ones. The wrong undo command can erase a day of work; the right one fixes the mistake in seconds.',
    'The single most-asked Git interview question is "how do you delete the last commit?" — and the senior answer is "it depends whether it was pushed", which this lesson makes obvious.'
  ],
  realLifeExample: [
    'Reset is like tearing the last page out of your notebook — the history looks as if it never happened. Revert is like adding a new page that says "ignore the previous page" — the original stays, but its effect is cancelled.',
    'Reflog is the notebook’s hidden carbon-copy: even after you tear a page out, Git kept a record of where it was, so you can tape it back in — for about 90 days.'
  ],
  howItWorks: [
    'To undo the last commit but KEEP the changes staged: `git reset --soft HEAD~1`.',
    'To undo the last commit and UNSTAGE the changes (keep them in your files): `git reset --mixed HEAD~1` (this is the default).',
    'To undo the last commit and DISCARD the changes entirely: `git reset --hard HEAD~1` (dangerous).',
    'To undo a commit that is already pushed/shared: `git revert <commit>` — it creates a new commit that cancels it, without rewriting history.',
    'If you reset --hard and lost work: `git reflog` to find the commit’s SHA, then `git reset --hard <sha>` to get it back.'
  ],
  codeExample: `# Undo last commit, keep changes staged
git reset --soft HEAD~1

# Undo last commit, keep changes in working dir (default)
git reset HEAD~1

# Undo last commit AND discard changes (careful!)
git reset --hard HEAD~1

# Safely undo a PUSHED commit
git revert HEAD

# Recover after a bad hard reset
git reflog                 # find the lost SHA, e.g. e4f8c1a
git reset --hard e4f8c1a   # you're back`,
  codeOutput: `# git reflog output
9a1c2f3 (HEAD -> main) HEAD@{0}: reset: moving to HEAD~1
e4f8c1a HEAD@{1}: commit: Add checkout feature
7b2d4e8 HEAD@{2}: commit: Add cart page`,
  mistakeFixes: [
    {
      mistake: 'Using `git reset --hard` to "undo" and permanently losing uncommitted work and recent commits.',
      badCommand: 'git reset --hard HEAD~3',
      fix: 'Before any hard reset, know that `git reflog` can recover commits. To get them back, find the SHA in reflog and reset to it.',
      fixCommand: 'git reflog\ngit reset --hard e4f8c1a',
      why: '`--hard` discards your working directory and staging area, but committed snapshots are still reachable via the reflog for ~90 days. Reflog records every move of HEAD, so it is your undo-the-undo. (Truly uncommitted changes that were never staged are NOT recoverable — commit early.)'
    },
    {
      mistake: 'Running `git reset --hard` on a commit that was already pushed and shared, then force-pushing — breaking everyone else’s history.',
      badCommand: 'git reset --hard HEAD~1\ngit push --force',
      fix: 'For anything already pushed, use `git revert` instead. It cancels the change with a NEW commit and is safe to push normally.',
      fixCommand: 'git revert HEAD\ngit push',
      why: 'Reset rewrites history. If teammates already pulled that commit, force-pushing the rewritten history causes conflicts and lost work for them. Revert preserves history, so collaboration stays intact.'
    },
    {
      mistake: 'Confusing `git reset` and `git revert` and using reset on a public branch.',
      fix: 'Remember: reset = local/private cleanup (rewrites history); revert = public/shared undo (adds history). Choose by whether the commit has been shared.',
      why: 'They solve the same goal ("undo a commit") with opposite mechanics. Picking the wrong one is the difference between a clean fix and a team-wide mess.'
    },
    {
      mistake: 'Wanting to discard changes to a single file but using a big scary reset and nuking everything.',
      fix: 'Use the targeted `git restore` for files: discard working-dir changes or unstage without touching commits.',
      fixCommand: '# discard changes to one file\ngit restore src/app.ts\n# unstage a file (keep the edits)\ngit restore --staged src/app.ts',
      why: '`git restore` is the modern, file-scoped tool. It avoids the all-or-nothing risk of `reset --hard` and makes your intent (this file, this state) explicit.'
    }
  ],
  interviewQuestions: [
    {
      q: 'How do you delete the last commit?',
      a: 'It depends if it was pushed. Not pushed and you want to keep the changes: `git reset --soft HEAD~1`. Not pushed and discard changes: `git reset --hard HEAD~1`. Already pushed/shared: `git revert HEAD`, which adds a new commit that undoes it without rewriting shared history.'
    },
    {
      q: 'What is the difference between git reset and git revert?',
      a: 'Reset moves the branch pointer to an earlier commit and rewrites history — good for local, unpushed mistakes. Revert creates a NEW commit that undoes a previous commit’s changes, preserving history — the safe choice for commits already shared with others.'
    },
    {
      q: 'Explain the three modes of git reset: soft, mixed, hard.',
      a: 'Soft: moves HEAD back, keeps changes STAGED. Mixed (default): moves HEAD back, unstages changes but keeps them in the working directory. Hard: moves HEAD back and DISCARDS staged and working-directory changes. Soft → mixed → hard removes progressively more.'
    },
    {
      q: 'You ran `git reset --hard` and lost commits. Can you recover them?',
      a: 'Usually yes, with `git reflog`. It logs every change to HEAD, so you can find the SHA of the lost commit and run `git reset --hard <sha>` to restore it. Commits stay reachable for about 90 days. Changes that were never committed at all cannot be recovered this way.'
    },
    {
      q: 'What does `git restore` do and how is it different from reset?',
      a: '`git restore` operates on files: `git restore <file>` discards working-directory changes, and `git restore --staged <file>` unstages without losing edits. It is file-scoped and does not move the branch pointer, whereas `git reset` operates on commits/branch history.'
    }
  ],
  proTip: 'Make a habit: if a commit has left your machine, never `reset` it — `revert` it. "Reset what is private, revert what is public" keeps you from ever rewriting a teammate’s history.'
};

export default lesson;
