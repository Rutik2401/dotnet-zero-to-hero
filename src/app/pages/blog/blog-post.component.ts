import { AfterViewInit, Component, ElementRef, computed, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs/operators';

import { LandingNavComponent } from '../../shared/landing-nav/landing-nav.component';
import { LandingFooterComponent } from '../../shared/landing-footer/landing-footer.component';
import { loadMultiHighlighter, loadTypeScriptHighlighter } from '../../shared/highlight/code-highlighter';
import { adjacentPosts, postBySlug } from './blog-data';

/**
 * Renders ONE blog post. Every /blog/<slug> route loads this same component;
 * it resolves which post to show from the URL, then renders the post's
 * build-time-generated HTML body (from Sanity) inside the site's design.
 *
 * Because the body is already baked into static HTML at build time, there is
 * NO runtime call to Sanity — great for SEO and for keeping the free tier idle.
 */
@Component({
  selector: 'app-blog-post',
  imports: [RouterLink, DatePipe, LandingNavComponent, LandingFooterComponent],
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.css'
})
export class BlogPostComponent implements AfterViewInit {
  private readonly host = inject(ElementRef);
  private readonly router = inject(Router);
  private readonly sanitizer = inject(DomSanitizer);

  /** Current /blog/<slug> segment, recomputed on navigation. */
  private readonly slug = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map(e => e.urlAfterRedirects),
      startWith(this.router.url),
      map(url => url.split('#')[0].split('?')[0].split('/').filter(Boolean)),
      map(parts => (parts[0] === 'blog' ? parts[1] ?? '' : ''))
    ),
    { initialValue: this.router.url.split('/').filter(Boolean)[1] ?? '' }
  );

  readonly post = computed(() => postBySlug(this.slug()));
  private readonly adjacent = computed(() => adjacentPosts(this.slug()));
  readonly newer = computed(() => this.adjacent().newer);
  readonly older = computed(() => this.adjacent().older);

  /** The post's HTML body, marked safe (content comes from OUR own CMS). */
  readonly bodyHtml = computed<SafeHtml>(() =>
    this.sanitizer.bypassSecurityTrustHtml(this.post()?.bodyHtml ?? '')
  );

  ngAfterViewInit(): void {
    // Defer one microtask so the [innerHTML] body is in the DOM first.
    queueMicrotask(() => void this.enhanceCodeBlocks());
  }

  /** Syntax-highlight code blocks + add a copy button (matches the site). */
  private async enhanceCodeBlocks(): Promise<void> {
    if (typeof document === 'undefined') return; // skip during SSG prerender
    const [hljs] = await Promise.all([loadMultiHighlighter(), loadTypeScriptHighlighter()]);
    const root: HTMLElement = this.host.nativeElement;

    root.querySelectorAll<HTMLElement>('.post-body pre code').forEach(block => {
      if (block.dataset['highlighted'] === 'yes') return;
      hljs.highlightElement(block);
    });

    root.querySelectorAll<HTMLElement>('.post-body pre').forEach(pre => {
      if (pre.querySelector('.btn-copy')) return;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'btn-copy';
      btn.textContent = 'Copy';
      btn.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(pre.querySelector('code')?.textContent ?? '');
          btn.textContent = 'Copied';
          btn.classList.add('copied');
          setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 1500);
        } catch { /* clipboard unavailable */ }
      });
      pre.appendChild(btn);
    });
  }
}
