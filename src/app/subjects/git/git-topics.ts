import { GitLesson } from './topic.types';

/**
 * SINGLE SOURCE OF TRUTH for the Git & GitHub course.
 *
 * Every topic's URL, sidebar entry, home card, prev/next link, SEO tags and
 * sitemap row is derived from this one array. To add a lesson:
 *
 *   1. Create the data file (e.g. `data/branching.ts`, default-exporting a GitLesson).
 *   2. Add ONE entry below with its slug + metadata + `loadData`.
 *
 * Routes, sidebar, home cards and the sitemap pick it up automatically.
 * Topics WITHOUT `loadData` render as a "coming soon" page.
 */
export interface GitTopic {
  /** SEO-friendly URL segment → /git/<slug> */
  slug: string;
  /** Display order (also drives prev/next). */
  order: number;
  /** Whether content exists yet (false → "coming soon"). */
  ready: boolean;

  /** Short label for the sidebar. */
  navLabel: string;

  // ── SEO ────────────────────────────────────────────────────────────────
  title: string;
  metaDescription: string;
  keywords: string;

  // ── Home card ────────────────────────────────────────────────────────────
  vol: string;
  tag: string;
  cardTitle: string;
  cardDesc: string;
  lessons: number;
  minutes: string;
  level: string;
  coverIcon: string;
  coverGradient: string;

  /** Lazy loader for the lesson content. Omitted → coming-soon page. */
  loadData?: () => Promise<GitLesson>;
}

export const GIT_TOPICS: GitTopic[] = [
  {
    slug: 'git-fundamentals',
    order: 0,
    ready: true,
    navLabel: 'Git Fundamentals',
    title: 'Git Fundamentals — What Git Really Is (and Isn’t GitHub)',
    metaDescription:
      'Start Git the right way: what Git actually is vs GitHub, the working dir / staging / commit model, your first repo, and the mistakes beginners make on day one.',
    keywords: 'git basics, git vs github, what is git, git init, staging area, git for beginners',
    vol: '00', tag: 'FUNDAMENTALS', cardTitle: 'Git Fundamentals',
    cardDesc: 'What Git really is vs GitHub, the 3-state model, your first repo, and the day-one mistakes everyone makes.',
    lessons: 6, minutes: '25', level: 'BEGINNER', coverIcon: 'git',
    coverGradient: 'linear-gradient(135deg, #7f1d1d 0%, #b91c1c 65%, #f97316 100%)',
    loadData: () => import('./data/git-fundamentals').then(m => m.default)
  },
  {
    slug: 'repo-to-push',
    order: 1,
    ready: true,
    navLabel: 'Repo Creation → Push',
    title: 'From Repo Creation to First Push — Every Step (GitHub)',
    metaDescription:
      'The complete happy path: git init, add, commit, create a GitHub repo, add the remote, set the branch and push. Plus the auth and remote mistakes that block your first push.',
    keywords: 'git push, git remote add origin, create github repo, git init add commit push, first push github',
    vol: '01', tag: 'REPO → PUSH', cardTitle: 'Repo → First Push',
    cardDesc: 'init → add → commit → remote → push, step by step. The exact flow plus the auth/remote errors that trip beginners.',
    lessons: 7, minutes: '20', level: 'BEGINNER', coverIcon: '↑',
    coverGradient: 'linear-gradient(135deg, #1e1b4b 0%, #4f46e5 70%, #8b5cf6 100%)',
    loadData: () => import('./data/repo-to-push').then(m => m.default)
  },
  {
    slug: 'branching-merging',
    order: 2,
    ready: true,
    navLabel: 'Branching & Merging',
    title: 'Git Branching & Merging — Feature Branches Without the Fear',
    metaDescription:
      'Branches, merge, fast-forward vs merge commits, and how to stop working on main. The branching mistakes that cause lost work and messy history.',
    keywords: 'git branch, git merge, fast forward, feature branch, git checkout, merge commit',
    vol: '02', tag: 'BRANCHING', cardTitle: 'Branching & Merging',
    cardDesc: 'Branches, merge vs fast-forward, and how to stop committing to main. With the history-mess mistakes to avoid.',
    lessons: 6, minutes: '22', level: 'BEGINNER', coverIcon: '⎇',
    coverGradient: 'linear-gradient(135deg, #064e3b 0%, #0d9488 70%, #14b8a6 100%)',
    loadData: () => import('./data/branching-merging').then(m => m.default)
  },
  {
    slug: 'undoing-changes',
    order: 3,
    ready: true,
    navLabel: 'Undo: reset, revert, reflog',
    title: 'Undoing Things in Git — reset, revert, restore & reflog',
    metaDescription:
      'How to delete the last commit, unstage, discard, and recover lost work. reset vs revert vs restore explained, and the reflog trick that saves you after reset --hard.',
    keywords: 'git reset, git revert, delete last commit, git reflog, undo git commit, git restore',
    vol: '03', tag: 'UNDO', cardTitle: 'Undoing Changes',
    cardDesc: 'Delete the last commit safely, reset vs revert vs restore, and recovering work with reflog after a hard reset.',
    lessons: 7, minutes: '24', level: 'INTERMEDIATE', coverIcon: '↺',
    coverGradient: 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 60%, #c026d3 100%)',
    loadData: () => import('./data/undoing-changes').then(m => m.default)
  },
  {
    slug: 'merge-vs-rebase',
    order: 4,
    ready: true,
    navLabel: 'Merge vs Rebase',
    title: 'Git Merge vs Rebase — When to Use Which (and Conflicts)',
    metaDescription:
      'Merge vs rebase explained simply, resolving conflicts step by step, and the golden rule of rebase that keeps you from rewriting shared history.',
    keywords: 'git merge vs rebase, git rebase, merge conflict, interactive rebase, golden rule of rebase',
    vol: '04', tag: 'MERGE / REBASE', cardTitle: 'Merge vs Rebase',
    cardDesc: 'When to merge, when to rebase, resolving conflicts, and the golden rule that stops you breaking shared history.',
    lessons: 6, minutes: '26', level: 'INTERMEDIATE', coverIcon: '⇄',
    coverGradient: 'linear-gradient(135deg, #0c4a6e 0%, #0891b2 70%, #06b6d4 100%)',
    loadData: () => import('./data/merge-vs-rebase').then(m => m.default)
  },
  {
    slug: 'remotes-github-flow',
    order: 5,
    ready: true,
    navLabel: 'Remotes & GitHub Flow',
    title: 'Remotes, Pull/Fetch & GitHub Flow — Collaborate Safely',
    metaDescription:
      'Push, pull vs fetch, tracking branches and the GitHub flow. Why force-pushing a shared branch is dangerous and what to do instead.',
    keywords: 'git remote, git pull vs fetch, github flow, git push force, tracking branch, origin',
    vol: '05', tag: 'REMOTES', cardTitle: 'Remotes & GitHub Flow',
    cardDesc: 'Push, pull vs fetch, tracking branches, and collaborating without force-pushing over your teammates.',
    lessons: 6, minutes: '20', level: 'INTERMEDIATE', coverIcon: '☁',
    coverGradient: 'linear-gradient(135deg, #312e81 0%, #6d28d9 60%, #a21caf 100%)',
    loadData: () => import('./data/remotes-github-flow').then(m => m.default)
  },
  {
    slug: 'pull-requests-review',
    order: 6,
    ready: true,
    navLabel: 'PRs & Code Review',
    title: 'Pull Requests & Code Review — Protected Branches Done Right',
    metaDescription:
      'Open clean pull requests, review effectively, use protected branches and squash merges. The PR mistakes (giant diffs, no protection) seniors notice immediately.',
    keywords: 'github pull request, code review, protected branches, squash merge, pr best practices',
    vol: '06', tag: 'PULL REQUESTS', cardTitle: 'PRs & Code Review',
    cardDesc: 'Clean PRs, effective review, protected branches and squash merges. The PR habits that mark a senior.',
    lessons: 6, minutes: '22', level: 'ADVANCED', coverIcon: '⚑',
    coverGradient: 'linear-gradient(135deg, #1e293b 0%, #312e81 70%, #4338ca 100%)',
    loadData: () => import('./data/pull-requests-review').then(m => m.default)
  },
  {
    slug: 'advanced-git',
    order: 7,
    ready: true,
    navLabel: 'Advanced Git',
    title: 'Advanced Git — Stash, Cherry-pick, Bisect, Hooks & Secrets',
    metaDescription:
      'Stash, cherry-pick, bisect, hooks and submodules. Plus the big one: how to remove a leaked secret from your entire Git history (and why .gitignore is too late).',
    keywords: 'git stash, git cherry-pick, git bisect, git hooks, remove secret from git history, git filter-repo',
    vol: '07', tag: 'ADVANCED', cardTitle: 'Advanced Git',
    cardDesc: 'Stash, cherry-pick, bisect, hooks, submodules — and scrubbing a leaked secret from your whole history.',
    lessons: 7, minutes: '28', level: 'ADVANCED', coverIcon: '◆',
    coverGradient: 'linear-gradient(135deg, #1f2937 0%, #374151 70%, #4b5563 100%)',
    loadData: () => import('./data/advanced-git').then(m => m.default)
  },
  {
    slug: 'interview-questions',
    order: 8,
    ready: true,
    navLabel: 'Interview Q&A + Scenarios',
    title: 'Git & GitHub Interview Questions + Real-World Scenarios',
    metaDescription:
      'The Git interview questions everyone gets asked — Git vs GitHub, delete the last commit, reset vs revert — plus "what do you do when…" scenarios juniors panic over.',
    keywords: 'git interview questions, github interview questions, git vs github, delete last commit, reset vs revert, git scenarios',
    vol: '08', tag: 'INTERVIEW', cardTitle: 'Interview Q&A + Scenarios',
    cardDesc: 'Git vs GitHub, delete the last commit, reset vs revert, and the real "what do you do when…" scenarios, solved.',
    lessons: 20, minutes: '30', level: 'ALL LEVELS', coverIcon: '★',
    coverGradient: 'linear-gradient(135deg, #7c2d12 0%, #ea580c 70%, #f59e0b 100%)',
    loadData: () => import('./data/interview-questions').then(m => m.default)
  }
];

/** All topics in display order. */
export const GIT_TOPICS_IN_ORDER = [...GIT_TOPICS].sort((a, b) => a.order - b.order);

/** Look up a topic by slug. */
export function gitTopicBySlug(slug: string): GitTopic | undefined {
  return GIT_TOPICS.find(t => t.slug === slug);
}

/** Previous / next ready topics for the prev-next footer nav. */
export function adjacentGitTopics(slug: string): { prev?: GitTopic; next?: GitTopic } {
  const ready = GIT_TOPICS_IN_ORDER.filter(t => t.ready);
  const i = ready.findIndex(t => t.slug === slug);
  if (i === -1) return {};
  return { prev: ready[i - 1], next: ready[i + 1] };
}
