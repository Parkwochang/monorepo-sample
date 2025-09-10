'use client';

import type { UrlObject } from 'url';
import type { ParsedUrlQueryInput } from 'querystring';
import type {
  AppRouterInstance,
  NavigateOptions,
  PrefetchOptions,
} from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

// ----------------------------------------------------------------------

interface Href extends Pick<UrlObject, 'pathname' | 'query'> {
  query?: ParsedUrlQueryInput;
}
type Url = Href | string;

type Push = AppRouterInstance['push'];
type Replace = AppRouterInstance['replace'];
type Prefetch = AppRouterInstance['prefetch'];
type CustomMethod = Push | Replace | Prefetch;

type Options<T extends CustomMethod> = T extends Prefetch ? PrefetchOptions : NavigateOptions;

type Method<T extends CustomMethod> = (href: string, options?: Options<T>) => void;

const qs = (url: URL, params?: Href['query']) => {
  if (!params) return null;

  for (const key in params) {
    if (params[key] === null || typeof params[key] === 'undefined') return;
    if (params[key]?.constructor === Object) {
      throw new Error(`객체는 올 수 없습니다.`);
    }
    if (Array.isArray(params[key])) {
      // const uniqueValue = Array.from(new Set(params[key] as any[]));
      params[key] = (params[key] as string[]).join('|');
    }
    url.searchParams.set(key, params[key]!.toString());
  }
};

const customRouter = <T extends CustomMethod>(href: Url, method: Method<T>, options?: Options<T>): void => {
  if (typeof href === 'string') return method(href);
  else if (!href.pathname) throw new Error('pathname이 없습니다.');
  else if (href.pathname && !href.query) return method(href.pathname);
  else if (href.query?.constructor !== Object) {
    throw new Error('query는 객체여야 합니다.');
  }
  const new_url = new URL(location.origin + href.pathname);
  qs(new_url, href.query);

  return method(new_url.toString(), options);
};

export function useCustomRouter() {
  const {
    prefetch: navigationPrefetch,
    push: navigationPush,
    replace: navigationReplace,
    ...router
  }: AppRouterInstance = useRouter();

  const pathname = usePathname();
  const query: Record<string, string | string[]> = {};

  useSearchParams().forEach((value, key) => {
    if (!value) return;
    if (value.includes(',')) {
      return (query[key] = value.split(','));
    }
    query[key] = value;
  });

  const push = (href: Url, options?: NavigateOptions): void => {
    customRouter(href, navigationPush as Method<Push>, options);
  };
  const replace = (href: Url, options?: NavigateOptions): void => {
    customRouter(href, navigationReplace as Method<Replace>, options);
  };
  const prefetch = (href: Url, options?: PrefetchOptions): void => {
    customRouter(href, navigationPrefetch as Method<Prefetch>, options);
  };

  return { push, replace, prefetch, pathname, query, ...router };
}
