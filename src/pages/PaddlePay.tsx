import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { ArrowRight, Loader2, ShieldCheck } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { SITE_ROUTES } from '../seo/routes';
import { breadcrumbSchema, webPageSchema } from '../seo/schema';
import { useI18n } from '../i18n';

type CheckoutStatus = 'idle' | 'loading' | 'ready' | 'missing-token' | 'missing-transaction' | 'error';

type PaddleCheckout = {
  open: (options: {
    transactionId: string;
    settings?: {
      displayMode?: 'overlay' | 'inline';
      locale?: string;
      successUrl?: string;
      theme?: 'light' | 'dark';
    };
  }) => void;
};

type PaddleGlobal = {
  Initialize: (options: {
    token: string;
    checkout?: {
      settings?: {
        displayMode?: 'overlay' | 'inline';
        locale?: string;
        successUrl?: string;
        theme?: 'light' | 'dark';
      };
    };
  }) => void;
  Checkout: PaddleCheckout;
};

declare global {
  interface Window {
    Paddle?: PaddleGlobal;
  }
}

const paddleScriptURL = 'https://cdn.paddle.com/paddle/v2/paddle.js';
const defaultSuccessURL = 'https://portal.hotelbyte.com/billing/subscription/success';
const allowedRedirectHosts = new Set([
  'portal.hotelbyte.com',
  'portal-test.hotelbyte.com',
  'localhost',
  '127.0.0.1',
]);

let paddleScriptPromise: Promise<void> | undefined;

function loadPaddleScript(): Promise<void> {
  if (window.Paddle) {
    return Promise.resolve();
  }
  if (paddleScriptPromise) {
    return paddleScriptPromise;
  }

  paddleScriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${paddleScriptURL}"]`);
    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true });
      existing.addEventListener('error', () => reject(new Error('Paddle.js failed to load')), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = paddleScriptURL;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Paddle.js failed to load'));
    document.head.appendChild(script);
  });

  return paddleScriptPromise;
}

function safeSuccessURL(raw: string | null): string {
  if (!raw) {
    return defaultSuccessURL;
  }
  try {
    const parsed = new URL(raw);
    if ((parsed.protocol === 'https:' || parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1') && allowedRedirectHosts.has(parsed.hostname)) {
      return parsed.toString();
    }
  } catch {
    return defaultSuccessURL;
  }
  return defaultSuccessURL;
}

export default function PaddlePay() {
  const { locale } = useI18n();
  const isEn = locale === 'en';
  const location = useLocation();
  const [status, setStatus] = useState<CheckoutStatus>('idle');
  const [message, setMessage] = useState('');
  const route = SITE_ROUTES.paddlePay;
  const params = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const transactionID = params.get('_ptxn') ?? params.get('transaction_id') ?? '';
  const successURL = safeSuccessURL(params.get('redirect_url'));
  const clientToken = import.meta.env.VITE_PADDLE_CLIENT_TOKEN as string | undefined;
  const effectiveStatus = !transactionID ? 'missing-transaction' : !clientToken ? 'missing-token' : status;

  useEffect(() => {
    const token = clientToken;
    if (!transactionID || !token) {
      return;
    }
    const paddleToken: string = token;

    let cancelled = false;

    async function openCheckout() {
      setStatus('loading');
      try {
        await loadPaddleScript();
        if (cancelled) {
          return;
        }
        if (!window.Paddle) {
          throw new Error('Paddle.js is unavailable');
        }
        window.Paddle.Initialize({
          token: paddleToken,
          checkout: {
            settings: {
              displayMode: 'overlay',
              locale: isEn ? 'en' : 'zh-Hans',
              successUrl: successURL,
              theme: 'light',
            },
          },
        });
        window.Paddle.Checkout.open({
          transactionId: transactionID,
          settings: {
            displayMode: 'overlay',
            locale: isEn ? 'en' : 'zh-Hans',
            successUrl: successURL,
            theme: 'light',
          },
        });
        setStatus('ready');
      } catch (err) {
        setStatus('error');
        setMessage(err instanceof Error ? err.message : 'Checkout failed to open');
      }
    }

    void openCheckout();

    return () => {
      cancelled = true;
    };
  }, [clientToken, isEn, successURL, transactionID]);

  const title = isEn ? route.title : route.titleZh;
  const description = isEn ? route.description : route.descriptionZh;

  return (
    <>
      <Seo
        path={route.path}
        title={title}
        description={description}
        keywords={route.keywords}
        locale={isEn ? 'en' : 'zh-CN'}
        noindex
        jsonLd={[
          webPageSchema(route.path, title, description, isEn ? 'en' : 'zh-CN'),
          breadcrumbSchema([
            { name: isEn ? 'Home' : '首页', path: '/' },
            { name: isEn ? 'Payment' : '支付', path: '/pay' },
          ]),
        ]}
      />
      <section className="min-h-[calc(100vh-4rem)] px-6 py-20 lg:px-8">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_0.82fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-glow/20 bg-cyan-glow/10 px-3 py-1 text-xs font-medium text-cyan-glow">
              <ShieldCheck className="h-4 w-4" />
              {isEn ? 'Secure Paddle checkout' : '安全 Paddle 结账'}
            </div>
            <h1 className="mb-6 max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight lg:text-6xl">
              {isEn ? 'Complete your HotelByte subscription' : '完成 HotelByte 订阅支付'}
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-white/60">
              {isEn
                ? 'This page opens the Paddle-hosted checkout for a transaction created from the HotelByte portal. Paddle acts as merchant of record and confirms tax, billing interval, and payment method before payment.'
                : '此页面用于打开从 HotelByte Portal 创建的 Paddle 托管结账。Paddle 作为 Merchant of Record，会在付款前确认税费、账期和支付方式。'}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl shadow-black/20">
            <div className="mb-6 text-sm font-medium uppercase tracking-[0.22em] text-white/40">
              {isEn ? 'Payment status' : '支付状态'}
            </div>
            <div className="space-y-4">
              {effectiveStatus === 'loading' || effectiveStatus === 'idle' ? (
                <StatusLine icon={<Loader2 className="h-5 w-5 animate-spin" />} title={isEn ? 'Opening checkout' : '正在打开结账'} body={isEn ? 'The secure Paddle checkout should appear in a moment.' : '安全的 Paddle 结账窗口即将打开。'} />
              ) : null}
              {effectiveStatus === 'ready' ? (
                <StatusLine icon={<ShieldCheck className="h-5 w-5" />} title={isEn ? 'Checkout opened' : '结账已打开'} body={isEn ? 'Finish payment in the Paddle checkout. You will return to the portal after completion.' : '请在 Paddle 结账窗口完成付款，完成后会回到 Portal。'} />
              ) : null}
              {effectiveStatus === 'missing-transaction' ? (
                <StatusLine title={isEn ? 'No transaction found' : '未找到交易'} body={isEn ? 'Start from the HotelByte portal so we can create a checkout for your organization.' : '请从 HotelByte Portal 发起订阅，以便为你的组织创建结账交易。'} />
              ) : null}
              {effectiveStatus === 'missing-token' ? (
                <StatusLine title={isEn ? 'Checkout is not configured' : '结账尚未配置'} body={isEn ? 'The Paddle client token is missing from this deployment.' : '当前部署缺少 Paddle client token。'} />
              ) : null}
              {effectiveStatus === 'error' ? (
                <StatusLine title={isEn ? 'Checkout could not open' : '结账未能打开'} body={message || (isEn ? 'Please try again from the portal.' : '请从 Portal 重新发起。')} />
              ) : null}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="https://portal.hotelbyte.com/settings/subscriptions" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-abyss-blue transition-colors hover:bg-cyan-glow">
                {isEn ? 'Open portal billing' : '打开 Portal 订阅'}
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link to="/#subscriptions" className="inline-flex items-center justify-center rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white/70 transition-colors hover:border-white/30 hover:text-white">
                {isEn ? 'View plans' : '查看方案'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function StatusLine({ icon, title, body }: { icon?: ReactNode; title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
      <div className="mb-2 flex items-center gap-3 text-base font-semibold text-white">
        {icon ? <span className="text-cyan-glow">{icon}</span> : null}
        <span>{title}</span>
      </div>
      <p className="text-sm leading-relaxed text-white/55">{body}</p>
    </div>
  );
}
