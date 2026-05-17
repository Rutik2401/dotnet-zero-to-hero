export interface QA {
  q: string;
  a: string;
}

export interface Topic {
  id: string;
  title: string;
  whatIsThis: string[];
  whyUseIt: string[];
  realLifeExample: string[];
  howItWorks: string[];
  /** Optional file/terminal label for the code window header (e.g. "Dockerfile", "Terminal"). */
  codeLabel?: string;
  codeExample: string;
  codeOutput: string;
  interviewQuestions: QA[];
  /** Optional rapid-fire follow-up Q&A (only for important topics). */
  followUpQuestions?: QA[];
  commonMistakes: string[];
  proTip: string;
}
