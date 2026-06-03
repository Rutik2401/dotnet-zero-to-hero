/** A single interview-style question and answer. */
export interface QA {
  q: string;
  a: string;
}

/**
 * The signature "where devs actually make mistakes" card.
 * Renders as ❌ Mistake → ✅ Fix → 💡 Why.
 */
export interface MistakeFix {
  /** ❌ What developers commonly do wrong. */
  mistake: string;
  /** Optional command that causes / relates to the mistake. */
  badCommand?: string;
  /** ✅ The correct approach. */
  fix: string;
  /** Optional command(s) for the fix. */
  fixCommand?: string;
  /** 💡 The reasoning so it sticks. */
  why: string;
}

/** One row of the quick command cheatsheet: a copyable command + what it does. */
export interface CmdRef {
  /** The command (single or multi-line). */
  cmd: string;
  /** A short plain-English description of what it does. */
  what: string;
}

/**
 * One lesson's full content. Lives in its own lazy-loaded data file so each
 * topic ships as a separate JS chunk (per-topic lazy loading).
 */
export interface GitLesson {
  id: string;
  title: string;
  /** One-sentence "the big idea" — shown as a TL;DR callout under the title. */
  tldr: string;
  /** Plain-language "what is this". */
  whatIsThis: string[];
  /** Why it matters in real work. */
  whyItMatters: string[];
  /** Relatable analogy / real-life example. */
  realLifeExample: string[];
  /** Step-by-step how it works. */
  howItWorks: string[];
  /** A runnable command block. */
  codeExample: string;
  /** Expected terminal output (optional). */
  codeOutput?: string;
  /** The mistake → fix → why cards (the course's differentiator). */
  mistakeFixes: MistakeFix[];
  /** Quick, copyable command reference for this lesson. */
  cheatsheet: CmdRef[];
  /** Interview questions for this topic. */
  interviewQuestions: QA[];
  /** One memorable pro tip. */
  proTip: string;
}
