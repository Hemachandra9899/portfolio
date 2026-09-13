import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function RouteMetadata() {
  const { pathname } = useLocation();
  useEffect(() => {
    const canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) return;
    const origin = new URL(canonical.href).origin;
    const ask = pathname === '/ask';
    canonical.href = `${origin}/${ask ? 'ask' : ''}`;
    document.title = ask ? 'Ask Hemachandra’s AI Assistant — Hemachandra Reddy Pottingari' : 'Hemachandra Reddy Pottingari — Software Engineer & AI Projects';
    const robots = document.querySelector('meta[name="robots"]');
    if (!robots.dataset.original) robots.dataset.original = robots.dataset.indexPolicy || robots.content;
    robots.content = ask ? 'noindex,follow' : robots.dataset.original;
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonical.href);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', document.title);
  }, [pathname]);
  return null;
}
