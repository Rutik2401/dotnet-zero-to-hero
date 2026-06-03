import { GitLesson } from '../topic.types';

const lesson: GitLesson = {
  id: 'git-fundamentals',
  title: 'Git Fundamentals — What Git Really Is (and isn’t GitHub)',
  tldr: 'Git is a local tool that snapshots your code; GitHub is just a website that hosts those snapshots. Once the working-directory → staging → commit flow clicks, every other command makes sense.',
  whatIsThis: [
    'Git is a version control system. It is a tool that runs on your own computer and records snapshots of your project over time, so you can see what changed, go back to any earlier version, and work without fear of breaking things.',
    'GitHub is not Git. GitHub is a website that hosts your Git repositories online so you can back them up and collaborate. Git is the tool; GitHub is one place to keep what the tool produces. You can use Git with zero internet, and you can host on GitLab, Bitbucket or your own server instead.'
  ],
  whyItMatters: [
    'Every real software team uses Git. Before you write a single feature, the team expects you to clone a repo, branch, commit and push. Getting the mental model right on day one saves you from the scary mistakes later (lost work, force-pushing over teammates, committing secrets).',
    'Understanding the three states — working directory, staging area, and the committed history — is the single idea that makes every other Git command make sense.'
  ],
  realLifeExample: [
    'Think of writing an essay. The working directory is the page you are editing right now. The staging area is the pile of pages you have decided are "ready to save". A commit is photocopying that pile and filing it with a dated note — a permanent checkpoint you can always return to.',
    'GitHub, in this analogy, is the shared filing cabinet in the office where everyone keeps a copy of their checkpoints so the whole team can read and build on each other’s work.'
  ],
  howItWorks: [
    'You change files in your working directory (just normal editing).',
    'You run `git add` to move the changes you want to keep into the staging area.',
    'You run `git commit` to record a permanent snapshot of the staged changes, with a message describing what you did.',
    'The snapshot is now in your local history — `git log` shows it. Nothing has left your computer yet.',
    'Later, `git push` sends those commits to a remote like GitHub so others can see them.'
  ],
  codeExample: `# Set who you are (once per machine)
git config --global user.name "Your Name"
git config --global user.email "you@example.com"

# Start tracking a project
git init
git status            # see what's changed and what's staged

# Stage and snapshot
git add README.md
git commit -m "Add project readme"

git log --oneline     # see your history`,
  codeOutput: `Initialized empty Git repository in /my-app/.git/
On branch main
Changes to be committed:
  new file:   README.md
[main (root-commit) 9f3a1c2] Add project readme
 1 file changed, 1 insertion(+)
9f3a1c2 Add project readme`,
  mistakeFixes: [
    {
      mistake: 'Thinking "Git" and "GitHub" are the same thing, and assuming you need a GitHub account to use Git at all.',
      fix: 'Use Git locally first. You can `git init`, commit and view history with no account and no internet. Add GitHub later only when you want to back up or share.',
      why: 'Git is a local, distributed tool. GitHub is just a popular host. Keeping them separate in your head stops a lot of confusion (e.g. "why is my commit not on GitHub?" — because committing and pushing are two different steps).'
    },
    {
      mistake: 'Running `git add .` blindly and committing everything, including `node_modules`, build output, and `.env` secret files.',
      badCommand: 'git add .\ngit commit -m "stuff"',
      fix: 'Add a `.gitignore` BEFORE your first commit, then stage intentionally and read `git status` before committing.',
      fixCommand: 'echo "node_modules/\\n.env\\ndist/" > .gitignore\ngit add .gitignore\ngit status',
      why: 'Once a file is committed it lives in history forever, even if you delete it later. A leaked `.env` or a 200MB `node_modules` bloats the repo and can expose secrets. `.gitignore` must exist before the file is first tracked.'
    },
    {
      mistake: 'Writing useless commit messages like "fix", "update", "asdf" or "final final v2".',
      badCommand: 'git commit -m "fix"',
      fix: 'Write a short imperative summary of WHAT changed and WHY: `git commit -m "Fix null check on empty cart"`.',
      why: 'Six months later (or during a `git bisect` to find a bug) the message is the only clue to what a commit did. Good messages are a gift to future-you and to reviewers.'
    },
    {
      mistake: 'Skipping `git config` for name/email, so commits are authored by "unknown" or get rejected.',
      fix: 'Set your identity once globally right after installing Git.',
      fixCommand: 'git config --global user.name "Your Name"\ngit config --global user.email "you@example.com"',
      why: 'Every commit is stamped with an author. Without it, your contribution graph is wrong and some servers reject the push entirely.'
    }
  ],
  cheatsheet: [
    { cmd: 'git config --global user.name "Your Name"', what: 'Set your commit author name (once per machine).' },
    { cmd: 'git init', what: 'Turn the current folder into a Git repository.' },
    { cmd: 'git status', what: 'See what is changed, staged, or untracked.' },
    { cmd: 'git add <file>', what: 'Stage a file for the next commit.' },
    { cmd: 'git commit -m "message"', what: 'Save a snapshot of the staged changes.' },
    { cmd: 'git log --oneline', what: 'View the commit history, one line per commit.' }
  ],
  interviewQuestions: [
    {
      q: 'What is the difference between Git and GitHub?',
      a: 'Git is a distributed version control system — a command-line tool installed locally that tracks changes to files and works fully offline. GitHub is a web-based hosting service for Git repositories that adds collaboration features (pull requests, issues, Actions). Git is the technology; GitHub is one of several places (alongside GitLab, Bitbucket) to host Git repos.'
    },
    {
      q: 'What are the three areas / states in Git?',
      a: 'The working directory (your actual files being edited), the staging area / index (changes marked to go into the next commit, via `git add`), and the repository / committed history (permanent snapshots created by `git commit`). A change moves working dir → staging → history.'
    },
    {
      q: 'What does `git add` do versus `git commit`?',
      a: '`git add` stages changes — it tells Git "include these in the next snapshot". `git commit` actually records the staged changes as a permanent commit in history with a message. Adding without committing changes nothing permanent; committing without adding records nothing.'
    },
    {
      q: 'Why do we use a .gitignore file?',
      a: 'To tell Git which files NOT to track — build artifacts (`dist/`), dependencies (`node_modules/`), secrets (`.env`), and OS/editor junk. It keeps the repo small, clean and free of secrets. It must exist before a file is first committed, otherwise the file is already tracked.'
    }
  ],
  proTip: 'Run `git status` constantly — before adding, before committing, before pushing. It is the cheapest way to never be surprised by what Git is about to do, and seniors run it almost reflexively.'
};

export default lesson;
