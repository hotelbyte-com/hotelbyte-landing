import { motion } from 'framer-motion';
import { Plug, Network, ShieldCheck, Terminal, KeyRound, Fingerprint, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { SITE_ROUTES } from '../seo/routes';
import { softwareApplicationSchema, breadcrumbSchema, faqSchema } from '../seo/schema';
import { getProductBySlug } from '../data/products';
import ProductEvaluation from '../components/ProductEvaluation';
import { useI18n } from '../i18n';

export default function AiDistribution() {
  const { locale } = useI18n();
  const isEn = locale !== 'zh'; // tier-2 locales render the English body
  const product = getProductBySlug('ai-distribution')!;
  const route = SITE_ROUTES.aiDistribution;

  const faq = faqSchema(
    isEn
      ? [
          { q: 'What is the AI Distribution Interface?', a: product.descriptionEn },
          { q: 'Which MCP clients are supported?', a: 'Any MCP client: Claude Code / Claude web connectors, Codex, Cursor, ChatGPT connectors, or your own agent. The surface is standard MCP over streamable-http, with three onboarding paths (local gateway, static key, OAuth 2.1).' },
          { q: 'Can an AI agent place a real booking by accident?', a: 'No. order.book is two-phase and requires an explicit confirm=true after the user consents to the exact price, dates, and cancellation policy. Unconfirmed calls are rejected by design before any order flow starts, and customerReferenceNo makes retries idempotent.' },
          { q: 'How is this different from supplier MCPs like Dida or Tourmind?', a: 'A supplier MCP sells one inventory. HotelByte is the aggregation layer: 27+ supplier connectors behind one tool surface, plus quotes that carry their own evidence envelope and pricing rules you can configure.' }
        ]
      : [
          { q: 'AI 分销接口是什么?', a: product.description },
          { q: '支持哪些 MCP 客户端?', a: '任意 MCP 客户端:Claude Code / Claude 网页连接器、Codex、Cursor、ChatGPT 连接器或你自研的 Agent。标准 MCP over streamable-http,三条接入路(本地网关/静态 key/OAuth 2.1)。' },
          { q: 'AI Agent 会不会误下单?', a: '不会。order.book 是两段式的,必须在用户对确切价格、日期与取消政策点头后携带 confirm=true 才会执行;未确认的调用在订单流程启动前就被服务端拒绝,customerReferenceNo 保证重试幂等。' },
          { q: '和 Dida、Tourmind 这类供应商 MCP 有什么不同?', a: '供应商 MCP 只卖自家库存。HotelByte 是聚合层:27+ 供应商连接器在同一个工具面后面,报价自带证据信封,价格规则可配置。' }
        ]
  );
  const jsonLd = [
    softwareApplicationSchema(product, route.path, isEn ? 'en' : 'zh'),
    breadcrumbSchema([
      { name: isEn ? 'Home' : '首页', path: '/' },
      { name: isEn ? 'Products' : '产品', path: '/products' },
      { name: isEn ? product.nameEn : product.name, path: route.path }
    ]),
    faq
  ];

  const tools: { name: string; mode: 'ro' | 'rw'; note: string; noteEn: string }[] = [
    { name: 'hotel.list', mode: 'ro', note: '搜索酒店,返回 sessionId 贯穿全流程', noteEn: 'Search hotels; returns the sessionId used across the flow' },
    { name: 'hotel.rates', mode: 'ro', note: '房型与实时报价,含退款政策与取消费', noteEn: 'Room types and live rates, with refundability and cancel fees' },
    { name: 'hotel.check_avail', mode: 'ro', note: '两段式第一段:下单前复核库存与价格', noteEn: 'Phase 1 of two: re-verify inventory and price before booking' },
    { name: 'order.query', mode: 'ro', note: '订单状态与确认号回查', noteEn: 'Order status and confirmation lookups' },
    { name: 'order.book', mode: 'rw', note: '需 confirm=true;customerReferenceNo 即幂等键', noteEn: 'Requires confirm=true; customerReferenceNo is the idempotency key' },
    { name: 'order.cancel', mode: 'rw', note: '需 confirm=true;取消可能收费且不可逆', noteEn: 'Requires confirm=true; cancellation may be charged and irreversible' },
  ];

  const paths = [
    {
      icon: Terminal,
      title: '本地网关',
      titleEn: 'Local gateway',
      desc: '装得上软件的机器(Claude Code / Cursor / Codex):hbcli 起一个本地 stdio 网关,密钥留在本机凭据库,agent 配置里零秘密。',
      descEn: 'Machines you control (Claude Code / Cursor / Codex): hbcli runs a local stdio gateway; the key stays in the local credential store and agent configs carry zero secrets.',
      code: '{ "mcpServers": { "hotelbyte":\n  { "command": "hbcli", "args": ["mcp", "serve"] } } }'
    },
    {
      icon: KeyRound,
      title: '静态钥匙',
      titleEn: 'Static key',
      desc: '托管平台与 CI:一键换取长空闲钥匙(30 天无调用才失效,绝对寿命服务端封顶 365 天),直接写进配置。',
      descEn: 'Hosted platforms and CI: mint a long-idle static key (dies only after 30 idle days; absolute lifetime server-capped at 365 days) and put it straight into the config.',
      code: '$ hbcli mcp token\n{ "type": "http", "url": "https://…/mcp",\n  "headers": { "Authorization": "Bearer <token>" } }'
    },
    {
      icon: Fingerprint,
      title: 'OAuth 2.1 平台连接器',
      titleEn: 'OAuth 2.1 platform connectors',
      desc: 'Claude 网页版 / ChatGPT 连接器:标准 RFC 9728/8414 发现 + 动态注册 + PKCE,同意页托管在我们侧,令牌即平台 JWT。',
      descEn: 'Claude web / ChatGPT connectors: standard RFC 9728/8414 discovery, dynamic registration, and PKCE. The consent page is hosted on our side; the token is a platform JWT.',
      code: 'GET /.well-known/oauth-protected-resource\n→ 401 WWW-Authenticate: resource_metadata=…'
    },
  ];

  return (
    <div className="pt-12 pb-24 px-6 lg:px-8 max-w-7xl mx-auto">
      <Seo
        path={route.path}
        title={isEn ? route.title : route.titleZh}
        description={isEn ? route.description : route.descriptionZh}
        locale={isEn ? 'en' : 'zh-CN'}
        jsonLd={jsonLd}
      />

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center max-w-3xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-paper-raised border border-ink/25 text-xs font-medium text-ink mb-6">
          <Plug className="w-3.5 h-3.5" />
          MCP · Model Context Protocol
        </div>
        <h1 className="text-4xl lg:text-6xl font-display mb-6 leading-tight">
          {isEn ? <>One MCP integration.<br /><span className="text-ink">Every supplier.</span></> : <>一次 MCP 集成,<br /><span className="text-ink">接完全部供应商。</span></>}
        </h1>
        <p className="text-lg text-ink/60 font-light">
          {isEn
            ? 'The unified distribution interface for AI agents: search, live rates, and two-phase confirmed booking — with quotes that carry their own evidence and pricing rules you configure.'
            : '面向 AI Agent 的统一分销接口:搜索、实时报价与两段式确认预订——报价自带证据,价格规则由你配置。'}
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link to="/demo" className="inline-flex items-center gap-2 px-5 py-2.5 bg-ink text-paper text-sm font-medium rounded-sm hover:bg-ink/85 transition-colors">
            {isEn ? 'Request access' : '申请接入'}
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a href="https://github.com/hotelbyte-com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 border border-ink/25 text-ink text-sm font-medium rounded-sm hover:border-ink/50 transition-colors">
            GitHub
          </a>
        </div>
      </motion.div>

      {/* Why now */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-24 grid md:grid-cols-2 gap-8 items-stretch"
      >
        <div className="p-8 rounded-sm border border-line bg-paper-raised">
          <h3 className="text-xl font-bold text-ink mb-4">{isEn ? 'The new integration tax' : '新的集成税'}</h3>
          <p className="text-sm text-ink/60 leading-relaxed">
            {isEn
              ? 'Hotel suppliers are each shipping their own MCP. Every integration means another account, another ID space, another pricing black box — your agent rebuilds the same plumbing per supplier, forever.'
              : '酒店供应商正在各自推出 MCP。每接一家就是新的账号体系、新的 ID 空间、新的价格黑箱——你的 Agent 要为每一家供应商重造一遍同样的管道,永远接不完。'}
          </p>
          <div className="mt-6 space-y-2 font-mono text-xs text-ink/45">
            <div>supplier-MCP × N → N × (auth + ids + pricing + ops)</div>
          </div>
        </div>
        <div className="p-8 rounded-sm border border-ink/40 bg-paper-raised relative">
          <div className="absolute -top-3 left-6 px-2 py-0.5 bg-ink text-paper text-[10px] font-medium tracking-wider uppercase rounded-sm">
            {isEn ? 'HotelByte' : 'HotelByte'}
          </div>
          <h3 className="text-xl font-bold text-ink mb-4">{isEn ? 'Aggregate once' : '聚合一次'}</h3>
          <p className="text-sm text-ink/60 leading-relaxed">
            {isEn
              ? '27+ supplier connectors (Dida, Tourmind, Yalago, Hotelbeds, ...) live behind one MCP tool surface. When a supplier ships their own MCP tomorrow, it becomes one more upstream lane for us — not one more integration for you.'
              : '27+ 供应商连接器(Dida、Tourmind、Yalago、Hotelbeds 等)在同一个 MCP 工具面后面。供应商明天再出新 MCP,只是我们的又一条上游通道——不是你的又一次集成。'}
          </p>
          <div className="mt-6 font-mono text-xs text-ink/45">
            your-agent → /mcp → {isEn ? 'all suppliers' : '全部供应商'}
          </div>
        </div>
      </motion.div>

      {/* Three onboarding paths */}
      <div className="mb-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl lg:text-4xl font-display mb-4">{isEn ? 'Three ways in' : '三条接入路'}</h2>
          <p className="text-ink/60">
            {isEn ? 'Same tool surface, same contract — pick the path that matches where your agent runs.' : '同一工具面、同一契约——按 Agent 的运行环境选路。'}
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {paths.map((p, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-6 rounded-sm border border-line bg-paper-raised flex flex-col"
            >
              <p.icon className="w-6 h-6 text-ink mb-4" />
              <h3 className="text-lg font-bold text-ink mb-2">{isEn ? p.titleEn : p.title}</h3>
              <p className="text-sm text-ink/60 leading-relaxed mb-4 flex-1">{isEn ? p.descEn : p.desc}</p>
              <pre className="text-[11px] leading-relaxed font-mono bg-ink/5 border border-line rounded-sm p-3 overflow-x-auto text-ink/75 whitespace-pre">{p.code}</pre>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tool surface */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-24"
      >
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl lg:text-4xl font-display mb-4">{isEn ? 'The tool surface' : '工具面'}</h2>
          <p className="text-ink/60">
            {isEn
              ? 'Six tools cover the whole transaction. Write tools exist only when a deployment enables them — and never execute without explicit confirmation.'
              : '六个工具覆盖完整交易。写工具仅在部署显式开启时存在——且没有显式确认绝不执行。'}
          </p>
        </div>
        <div className="rounded-sm border border-line bg-paper-raised overflow-hidden">
          {tools.map((t, idx) => (
            <div key={t.name} className={`flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 px-6 py-4 ${idx > 0 ? 'border-t border-line' : ''}`}>
              <code className="font-mono text-sm text-ink font-semibold min-w-[10.5rem]">{t.name}</code>
              <span className={`text-[10px] font-medium tracking-wider uppercase px-2 py-0.5 rounded-sm w-fit ${t.mode === 'rw' ? 'bg-seal/15 text-seal' : 'bg-ink/8 text-ink/55'}`}>
                {t.mode === 'rw' ? (isEn ? 'write · confirm' : '写 · 需确认') : isEn ? 'read' : '读'}
              </span>
              <span className="text-sm text-ink/60">{isEn ? t.noteEn : t.note}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Evidence envelope + booking discipline */}
      <div className="mb-24 grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 rounded-sm border border-line bg-paper-raised"
        >
          <Network className="w-6 h-6 text-ink mb-4" />
          <h3 className="text-xl font-bold text-ink mb-3">{isEn ? 'Quotes that carry evidence' : '报价自带证据'}</h3>
          <p className="text-sm text-ink/60 leading-relaxed mb-4">
            {isEn
              ? 'Every tool result returns { response, evidence }. The response mirrors the HTTP API; the evidence envelope makes each quote citable and traceable — hand the traceId to support and they can reconstruct that exact quote.'
              : '每个工具结果返回 { response, evidence }。response 与 HTTP API 同构;证据信封让每条报价可引用、可追溯——把 traceId 交给服务方即可还原那一次报价的完整链路。'}
          </p>
          <pre className="text-[11px] leading-relaxed font-mono bg-ink/5 border border-line rounded-sm p-3 overflow-x-auto text-ink/75 whitespace-pre">{`{
  "response": { "list": [ … ] },
  "evidence": {
    "tool": "hotel.list",
    "traceId": "20261003…",
    "sessionId": "S-2026…",
    "currency": "USD"
  }
}`}</pre>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="p-8 rounded-sm border border-line bg-paper-raised"
        >
          <ShieldCheck className="w-6 h-6 text-ink mb-4" />
          <h3 className="text-xl font-bold text-ink mb-3">{isEn ? 'Bookings with a hard confirmation boundary' : '预订的硬确认边界'}</h3>
          <ol className="text-sm text-ink/60 leading-relaxed list-decimal list-inside space-y-2">
            <li>{isEn ? 'hotel.rates — present price, refundability and cancel fees to the user.' : 'hotel.rates — 把价格、退款政策与取消费展示给用户。'}</li>
            <li>{isEn ? 'hotel.check_avail — re-verify the exact rate; live prices can move.' : 'hotel.check_avail — 复核确切报价;实时价格会变。'}</li>
            <li>{isEn ? 'order.book with confirm=true — only after the user consents. Anything less is rejected server-side before the order flow starts.' : 'order.book 携带 confirm=true — 仅在用户点头之后。差一点都会在订单流程启动前被服务端拒绝。'}</li>
            <li>{isEn ? 'Retries reuse customerReferenceNo — idempotent by key, duplicates surface as a soft warning you must confirm.' : '重试复用 customerReferenceNo — 按键幂等,重复下单以软警告形式出现、必须显式确认。'}</li>
          </ol>
        </motion.div>
      </div>

      {/* Sandbox playground */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-24 p-8 rounded-sm border border-line bg-paper-raised"
      >
        <div className="flex items-center gap-3 mb-4">
          <h3 className="text-xl font-bold text-ink">{isEn ? 'Try the sandbox now' : '现在就试沙箱'}</h3>
          <span className="text-[10px] font-medium tracking-wider uppercase px-2 py-0.5 rounded-sm bg-ink/8 text-ink/55">UAT · no SLA</span>
        </div>
        <p className="text-sm text-ink/60 mb-4">
          {isEn
            ? 'The sandbox endpoint is publicly reachable. Any MCP client can initialize against it with a valid ticket:'
            : '沙箱端点公开可达。任意 MCP 客户端持有效 ticket 即可初始化:'}
        </p>
        <pre className="text-[11px] leading-relaxed font-mono bg-ink/5 border border-line rounded-sm p-3 overflow-x-auto text-ink/75 whitespace-pre">{`curl -X POST https://api-test.hotelbyte.com/mcp \\
  -H "Authorization: Bearer <ticket>" \\
  -H "Accept: application/json, text/event-stream" \\
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'`}</pre>
      </motion.div>

      {/* Procurement evaluation */}
      <ProductEvaluation
        rows={product.evaluation}
        rowsEn={product.evaluationEn}
        eyebrow="采购视角"
        eyebrowEn="Procurement view"
        title={isEn ? 'What to check when evaluating an AI distribution interface' : '评估 AI 分销接口时看什么'}
        titleEn="What to check when evaluating an AI distribution interface"
        lead={isEn
          ? 'Vendor-neutral. Three questions separate an aggregation layer from another single-inventory MCP — and how to prove each on the spot.'
          : '不点名任何厂商。三个问题区分「聚合层」与「又一家单库存 MCP」——且每一条都可以当场验证。'}
        leadEn="Vendor-neutral. Three questions separate an aggregation layer from another single-inventory MCP — and how to prove each on the spot."
      />
    </div>
  );
}
