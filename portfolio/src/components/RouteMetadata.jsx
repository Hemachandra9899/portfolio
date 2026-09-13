import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { projects } from '../data/portfolio';

export function RouteMetadata() {
  const { pathname } = useLocation();
  useEffect(() => {
    const canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) return;
    const origin = new URL(canonical.href).origin;
    const ask = pathname === '/ask';
    const project = projects.find(item => pathname === `/projects/${item.slug}`);
    canonical.href = `${origin}${pathname === '/' ? '/' : pathname}`;
    document.title = ask
      ? 'Ask Hemachandra’s AI Assistant — Hemachandra Reddy Pottingari'
      : project
        ? `${project.title} — AI Project by Hemachandra Reddy`
        : 'Hemachandra Reddy — AI & Data Engineer Portfolio in Hyderabad';
    const robots = document.querySelector('meta[name="robots"]');
    if (!robots.dataset.original) robots.dataset.original = robots.dataset.indexPolicy || robots.content;
    robots.content = ask ? 'noindex,follow' : robots.dataset.original;
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonical.href);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', document.title);
    const description = project
      ? `${project.description} Read this AI engineering project case study by Hemachandra Reddy in Hyderabad.`
      : 'AI & Data Engineer portfolio in Hyderabad. Explore Hemachandra Reddy’s AI agents, RAG systems, data engineering, FastAPI, Python, and React projects.';
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
  }, [pathname]);
  return null;
}
