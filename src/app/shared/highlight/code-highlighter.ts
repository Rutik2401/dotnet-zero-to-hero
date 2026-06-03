/**
 * Lazy-load highlight.js + only the grammars we need.
 *
 * Each loader caches its promise so repeat callers across phase pages
 * share the same module instance (no second download, no double-register).
 */

import type { HLJSApi } from 'highlight.js';

let csharpPromise:     Promise<HLJSApi> | null = null;
let typescriptPromise: Promise<HLJSApi> | null = null;
let multiPromise:      Promise<HLJSApi> | null = null;

/** hljs core + C# grammar — used by phase-0..phase-4 (C# only). */
export function loadCSharpHighlighter(): Promise<HLJSApi> {
  if (!csharpPromise) {
    csharpPromise = Promise.all([
      import('highlight.js/lib/core'),
      import('highlight.js/lib/languages/csharp')
    ]).then(([hljsMod, csharpMod]) => {
      const hljs = hljsMod.default;
      hljs.registerLanguage('csharp', csharpMod.default);
      return hljs;
    });
  }
  return csharpPromise;
}

/** hljs core + TypeScript + HTML (xml) — used by phase-5 (Modern Angular). */
export function loadTypeScriptHighlighter(): Promise<HLJSApi> {
  if (!typescriptPromise) {
    typescriptPromise = Promise.all([
      import('highlight.js/lib/core'),
      import('highlight.js/lib/languages/typescript'),
      import('highlight.js/lib/languages/xml')
    ]).then(([hljsMod, tsMod, xmlMod]) => {
      const hljs = hljsMod.default;
      hljs.registerLanguage('typescript', tsMod.default);
      hljs.registerLanguage('html',       xmlMod.default);
      return hljs;
    });
  }
  return typescriptPromise;
}

/** hljs core + bash/yaml/dockerfile/json/csharp/xml — used by phase-6 (DevOps mixes languages). */
export function loadMultiHighlighter(): Promise<HLJSApi> {
  if (!multiPromise) {
    multiPromise = Promise.all([
      import('highlight.js/lib/core'),
      import('highlight.js/lib/languages/bash'),
      import('highlight.js/lib/languages/yaml'),
      import('highlight.js/lib/languages/dockerfile'),
      import('highlight.js/lib/languages/json'),
      import('highlight.js/lib/languages/csharp'),
      import('highlight.js/lib/languages/xml')
    ]).then(([hljsMod, bash, yaml, dockerfile, json, csharp, xml]) => {
      const hljs = hljsMod.default;
      hljs.registerLanguage('bash',       bash.default);
      hljs.registerLanguage('shell',      bash.default);
      hljs.registerLanguage('yaml',       yaml.default);
      hljs.registerLanguage('dockerfile', dockerfile.default);
      hljs.registerLanguage('json',       json.default);
      hljs.registerLanguage('csharp',     csharp.default);
      hljs.registerLanguage('xml',        xml.default);
      return hljs;
    });
  }
  return multiPromise;
}
