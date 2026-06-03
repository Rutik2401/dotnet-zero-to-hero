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

    this.setJsonLd({ title, description, canonical, path });
  }

  /** Course sections that get a schema.org Course node + breadcrumb trail. */
  private static readonly COURSES: Record<string, string> = {
    dotnet: '.NET Roadmap',
    git: 'Git & GitHub'
  };

  /**
   * Inject schema.org JSON-LD into a single managed <script> in the head,
   * replaced (not duplicated) on every navigation — so it bakes into the
   * prerendered HTML exactly like the meta tags above.
   */
  private setJsonLd(opts: { title: string; description: string; canonical: string; path: string }): void {
    const { title, description, canonical, path } = opts;

    const graph: Record<string, unknown>[] = [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: DEFAULT_OG_IMAGE
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        name: SITE_NAME,
        url: SITE_URL,
        publisher: { '@id': `${SITE_URL}/#organization` }
      }
    ];

    const segments = path.split('/').filter(Boolean);
    const courseSlug = segments[0];
    const courseName = courseSlug ? SeoService.COURSES[courseSlug] : undefined;
    const courseUrl = courseName ? `${SITE_URL}/${courseSlug}` : undefined;

    if (courseName && courseUrl) {
      graph.push({
        '@type': 'Course',
        name: courseName,
        description,
        url: courseUrl,
        provider: { '@id': `${SITE_URL}/#organization` }
      });
    }

    // BreadcrumbList: Home → [Course] → current page.
    const crumbs: { name: string; item: string }[] = [{ name: 'Home', item: SITE_URL }];
    if (courseName && courseUrl && canonical !== courseUrl) {
      crumbs.push({ name: courseName, item: courseUrl });
    }
    if (canonical !== SITE_URL) {
      crumbs.push({ name: title.split('—')[0].split('|')[0].trim(), item: canonical });
    }
    if (crumbs.length > 1) {
      graph.push({
        '@type': 'BreadcrumbList',
        itemListElement: crumbs.map((c, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: c.name,
          item: c.item
        }))
      });
    }

    const json = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
    let script = this.doc.head.querySelector<HTMLScriptElement>('script[data-seo-jsonld]');
    if (!script) {
      script = this.doc.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.setAttribute('data-seo-jsonld', '');
      this.doc.head.appendChild(script);
    }
    script.textContent = json;
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
