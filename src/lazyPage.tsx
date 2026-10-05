import { use, type ComponentType, type ReactNode } from 'react';
import type { Params } from 'react-router-dom';

// Route-level code splitting that survives prerendering.
//
// React.lazy always suspends on its first render, and renderToString cannot
// wait, so a lazy page would prerender as an empty fallback. lazyPage keeps the
// loaded component in a module cache and renders it directly once present:
//   - build (src/prerender-entry.tsx) preloads every page before rendering, so
//     each route's HTML still contains the full page body;
//   - browser (src/main.tsx) preloads the chunk for the current URL before the
//     first render, so the prerendered markup is replaced without a fallback
//     flash, and links preload their target on hover/focus/touch
//     (src/intentPreload.ts);
//   - a navigation to a page that is not loaded yet suspends at the <Suspense>
//     in Layout and, because router state updates are transitions, the old
//     page stays on screen until the new chunk is ready.

type PageLoader<P> = () => Promise<{ default: ComponentType<P> }>;
// Optional per-route data needed before the first render (e.g. a story body).
type DataPreloader<P> = (route: { params: Params; props: P }) => Promise<unknown>;

export interface LazyPage<P extends object> {
  (props: P): ReactNode;
  preload: () => Promise<void>;
  preloadData?: DataPreloader<P>;
}

const registry = new Set<LazyPage<never>>();

export function lazyPage<P extends object = object>(
  loader: PageLoader<P>,
  preloadData?: DataPreloader<P>,
): LazyPage<P> {
  let Page: ComponentType<P> | undefined;
  let loading: Promise<void> | undefined;

  const preload = () =>
    (loading ??= loader().then(
      (module) => {
        Page = module.default;
      },
      (error: unknown) => {
        loading = undefined; // allow a retry after a network failure
        throw error;
      },
    ));

  const LazyPage = ((props: P) => {
    if (!Page) use(preload());
    const Loaded = Page as ComponentType<P>;
    return <Loaded {...props} />;
  }) as LazyPage<P>;
  LazyPage.preload = preload;
  LazyPage.preloadData = preloadData;
  registry.add(LazyPage as LazyPage<never>);
  return LazyPage;
}

export function isLazyPage(type: unknown): type is LazyPage<object> {
  return typeof type === 'function' && registry.has(type as LazyPage<never>);
}

export function preloadAllLazyPages(): Promise<unknown> {
  return Promise.all([...registry].map((page) => page.preload()));
}
