import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from '../site.config';

/** Per-route SEO data, attached via the route's `data: { seo: {...} }`. */
export interface RouteSeo {
  description?: string;
  keywords?: string;
  image?: string;
  /** og:type — 'article' for tutorials, 'website' for landing pages. */
  type?: 'website' | 'article';
}

/**
 * Centralised SEO/meta manager. On every navigation it sets the canonical
 * link and the Open Graph / Twitter tags from the active route's `seo` data.
 *
 * Because the site is prerendered (SSG), these tags are baked into the static
 * HTML — so they work for Google AND for social scrapers that don't run JS.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly router = inject(Router);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly doc = inject(DOCUMENT);

  /** Call once (from AppComponent) to start reacting to navigation. */
  init(): void {
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(e => this.update(e.urlAfterRedirects));
  }

  private update(url: string): void {
    // Strip query/fragment for a clean canonical URL.
    const path = url.split('#')[0].split('?')[0];
    const canonical = SITE_URL + (path === '/' ? '' : path);

    // Walk to the deepest activated route, tracking the last declared title
    // (mirrors Angular's TitleStrategy) and the most specific `seo` data.
    // Reading the snapshot title directly avoids a race with the title being
    // applied to document.title later in the same navigation tick.
    let route = this.router.routerState.snapshot.root;
    let resolvedTitle = route.title;
    while (route.firstChild) {
      route = route.firstChild;
      if (route.title != null) resolvedTitle = route.title;
    }
    const seo: RouteSeo = route.data?.['seo'] ?? {};

    const title = resolvedTitle ?? this.title.getTitle();
    const description = seo.description ??
      'Phase-by-phase, interview-focused roadmaps for .NET, Angular and React.';
    const image = seo.image ?? DEFAULT_OG_IMAGE;

    this.setMeta('description', description);
    if (seo.keywords) this.setMeta('keywords', seo.keywords);

    this.setCanonical(canonical);

    // Open Graph
    this.setProp('og:title', title);
    this.setProp('og:description', description);
    this.setProp('og:url', canonical);
    this.setProp('og:type', seo.type ?? 'website');
    this.setProp('og:site_name', SITE_NAME);
    this.setProp('og:image', image);

    // Twitter
    this.setMeta('twitter:card', 'summary_large_image');
    this.setMeta('twitter:title', title);
    this.setMeta('twitter:description', description);
    this.setMeta('twitter:image', image);
  }

  private setMeta(name: string, content: string): void {
    this.meta.updateTag({ name, content });
  }

  private setProp(property: string, content: string): void {
    this.meta.updateTag({ property, content });
  }

  private setCanonical(href: string): void {
    let link = this.doc.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', href);
  }
}
