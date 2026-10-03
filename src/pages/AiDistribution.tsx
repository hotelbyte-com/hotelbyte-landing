import { useState } from 'react';
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
  const { t, locale } = useI18n();
  const isEn = locale !== 'zh'; // tier-2 locales without a dictionary entry fall back to English via t()
  const product = getProductBySlug('ai-distribution')!;
  const route = SITE_ROUTES.aiDistribution;
  const loc = route.localized?.[locale];
  // Full Arabic body (see fullBodyRoutes in i18n/locale.ts): FAQ and the
  // evaluation table come from the dictionary instead of product data.
  const isAr = locale === 'ar';
  const L = (key: string, en: string, zh: string) => t(key, isEn ? en : zh);

  const faq = faqSchema(
    isAr ? [
      { q: t('aidist.faq.q1'), a: t('aidist.faq.a1') },
      { q: t('aidist.faq.q2'), a: t('aidist.faq.a2') },
      { q: t('aidist.faq.q3'), a: t('aidist.faq.a3') },
      { q: t('aidist.faq.q4'), a: t('aidist.faq.a4') },
    ]
    : isEn
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
    softwareApplicationSchema(isAr ? { ...product, nameEn: L('aidist.hero.title1', 'One MCP integration.', '一次 MCP 集成'), taglineEn: L('aidist.paths.lead', 'Same tool surface, same contract — pick the path that matches where your agent runs.', '同一工具面、同一契约——按 Agent 的运行环境选路。') } : product, route.path, locale === 'zh' ? 'zh' : locale),
    breadcrumbSchema([
      { name: isEn ? 'Home' : '首页', path: '/' },
      { name: t('nav.group.products', isEn ? 'Products' : '产品'), path: '/products' },
      { name: isAr ? L('aidist.hero.title1', 'One MCP integration.', '一次 MCP 集成') : (isEn ? product.nameEn : product.name), path: route.path }
    ]),
    faq
  ];

  const tools: { name: string; mode: 'ro' | 'rw'; noteKey: string; note: string; noteEn: string }[] = [
    { name: 'hotel.list', mode: 'ro', noteKey: 'aidist.tool.hotelList', note: '搜索酒店,返回 sessionId 贯穿全流程', noteEn: 'Search hotels; returns the sessionId used across the flow' },
    { name: 'hotel.rates', mode: 'ro', noteKey: 'aidist.tool.hotelRates', note: '房型与实时报价,含退款政策与取消费', noteEn: 'Room types and live rates, with refundability and cancel fees' },
    { name: 'hotel.check_avail', mode: 'ro', noteKey: 'aidist.tool.checkAvail', note: '两段式第一段:下单前复核库存与价格', noteEn: 'Phase 1 of two: re-verify inventory and price before booking' },
    { name: 'order.query', mode: 'ro', noteKey: 'aidist.tool.query', note: '订单状态与确认号回查', noteEn: 'Order status and confirmation lookups' },
    { name: 'order.book', mode: 'rw', noteKey: 'aidist.tool.book', note: '需 confirm=true;customerReferenceNo 即幂等键', noteEn: 'Requires confirm=true; customerReferenceNo is the idempotency key' },
    { name: 'order.cancel', mode: 'rw', noteKey: 'aidist.tool.cancel', note: '需 confirm=true;取消可能收费且不可逆', noteEn: 'Requires confirm=true; cancellation may be charged and irreversible' },
  ];

  const paths = [
    {
      icon: Terminal,
      titleKey: 'aidist.path1.title',
      descKey: 'aidist.path1.desc',
      title: '本地网关',
      titleEn: 'Local gateway',
      desc: '装得上软件的机器(Claude Code / Cursor / Codex):hbcli 起一个本地 stdio 网关,密钥留在本机凭据库,agent 配置里零秘密。',
      descEn: 'Machines you control (Claude Code / Cursor / Codex): hbcli runs a local stdio gateway; the key stays in the local credential store and agent configs carry zero secrets.',
      code: '{ "mcpServers": { "hotelbyte":\n  { "command": "hbcli", "args": ["mcp", "serve"] } } }'
    },
    {
      icon: KeyRound,
      titleKey: 'aidist.path2.title',
      descKey: 'aidist.path2.desc',
      title: '静态钥匙',
      titleEn: 'Static key',
      desc: '托管平台与 CI:一键换取长空闲钥匙(30 天无调用才失效,绝对寿命服务端封顶 365 天),直接写进配置。',
      descEn: 'Hosted platforms and CI: mint a long-idle static key (dies only after 30 idle days; absolute lifetime server-capped at 365 days) and put it straight into the config.',
      code: '$ hbcli mcp token\n{ "type": "http", "url": "https://…/mcp",\n  "headers": { "Authorization": "Bearer <token>" } }'
    },
    {
      icon: Fingerprint,
      titleKey: 'aidist.path3.title',
      descKey: 'aidist.path3.desc',
      title: 'OAuth 2.1 平台连接器',
      titleEn: 'OAuth 2.1 platform connectors',
      desc: 'Claude 网页版 / ChatGPT 连接器:标准 RFC 9728/8414 发现 + 动态注册 + PKCE,同意页托管在我们侧,令牌即平台 JWT。',
      descEn: 'Claude web / ChatGPT connectors: standard RFC 9728/8414 discovery, dynamic registration, and PKCE. The consent page is hosted on our side; the token is a platform JWT.',
      code: 'GET /.well-known/oauth-protected-resource\n→ 401 WWW-Authenticate: resource_metadata=…'
    },
  ];

  const evalRowsAr = [
    { check: t('aidist.eval.r1.check'), ours: t('aidist.eval.r1.ours'), verify: t('aidist.eval.r1.verify') },
    { check: t('aidist.eval.r2.check'), ours: t('aidist.eval.r2.ours'), verify: t('aidist.eval.r2.verify') },
    { check: t('aidist.eval.r3.check'), ours: t('aidist.eval.r3.ours'), verify: t('aidist.eval.r3.verify') },
  ];

  // Per-agent quickstarts: same /mcp endpoint, one snippet per client.
  // Sandbox endpoint shown until the production gateway opens.
  const clients = [    {
      name: 'Claude Code',
      tag: 'CLI',
      descKey: 'aidist.clients.claudeCode',
      desc: 'One-liner remote HTTP; or the local stdio gateway to keep keys off the wire.',
      descZh: '一行接入远程 HTTP;或用本地 stdio 网关让密钥不出本机。',
      code: 'hbcli mcp setup claude-code\n# runs: claude mcp add hotelbyte --scope user -- hbcli mcp serve\n# (no claude on PATH? prints a paste-ready snippet instead)',
    },
    {
      name: 'Cursor',
      tag: 'IDE',
      descKey: 'aidist.clients.cursor',
      desc: 'Global ~/.cursor/mcp.json, or per-project .cursor/mcp.json.',
      descZh: '全局 ~/.cursor/mcp.json 或项目内 .cursor/mcp.json。',
      code: 'hbcli mcp setup cursor\n# merges hotelbyte into ~/.cursor/mcp.json\n# (your other MCP servers are preserved)',
    },
    {
      name: 'ChatGPT',
      tag: 'Connector',
      descKey: 'aidist.clients.chatgpt',
      desc: 'Custom plugin (developer mode): MCP URL + API-key auth — pick API key, not OAuth, or creation fails at the probe.',
      descZh: '自定义插件(开发者模式):MCP URL + API key 认证——选 API key 而不是 OAuth,否则创建探测直接失败。',
      code: 'hbcli mcp setup chatgpt\n# prints your token + the exact form fields:\n#   Server URL:     https://api-test.hotelbyte.com/mcp\n#   Authentication: API key   ← NOT OAuth\n#   Header: Authorization · Value: Bearer <token>',
    },
    {
      name: 'Grok',
      tag: 'Connector · xAI',
      descKey: 'aidist.clients.grok',
      desc: 'Grok connectors — custom MCP server on grok.com, web and mobile.',
      descZh: 'Grok 连接器——在 grok.com 添加自定义 MCP server,网页与手机 App 通用。',
      code: 'hbcli mcp setup grok\n# writes [mcp_servers.hotelbyte] into ~/.grok/config.toml\n# web/mobile connectors instead: grok.com/connectors → Custom\n#   (hbcli mcp setup generic prints a token for it)',
    },
    {
      name: 'Codex',
      tag: 'CLI',
      descKey: 'aidist.clients.codex',
      desc: '~/.codex/config.toml — the stdio gateway.',
      descZh: '~/.codex/config.toml — stdio 网关。',
      code: 'hbcli mcp setup codex\n# appends [mcp_servers.hotelbyte] to ~/.codex/config.toml',
    },
    {
      name: 'Antigravity',
      tag: 'IDE · Google',
      descKey: 'aidist.clients.antigravity',
      desc: "Google's agent-first IDE (2.0 at I/O 2026) — native MCP, browser control, agent manager.",
      descZh: '谷歌 agent-first IDE（I/O 2026 升至 2.0）——原生 MCP、浏览器操控、Agent 管理器。',
      code: 'hbcli mcp setup generic   # token + fields, then paste into mcp_config.json\n{ "mcpServers": { "hotelbyte":\n  { "command": "hbcli", "args": ["mcp", "serve"] } } }\n# note: no "type" field in Antigravity configs',
    },
    {
      name: 'Devin Desktop',
      tag: 'Agent · Cognition',
      descKey: 'aidist.clients.devin',
      desc: "Cognition's autonomous agent desktop — formerly Windsurf (June 2026).",
      descZh: 'Cognition 自主 Agent 桌面端——前 Windsurf（2026 年 6 月并入）。',
      code: 'hbcli mcp setup generic   # token + URL\n# Devin → Settings → MCP Marketplace → Add Your Own → paste\n# (needs the Manage MCP Servers permission)',
    },
    {
      name: 'Claude Desktop · Web',
      tag: 'Connectors',
      descKey: 'aidist.clients.claudeConnect',
      desc: 'Settings → Extensions / Connectors → Add custom connector: paste the endpoint URL, auth = Bearer. Directory-style platform connectors use the OAuth 2.1 discovery flow above.',
      descZh: '设置 → 扩展/连接器 → 添加自定义连接器:粘贴端点 URL,认证选 Bearer。平台目录式连接器走上面的 OAuth 2.1 发现流。',
      code: 'hbcli mcp setup claude-connectors\n# prints your token, then:\n#   Add custom connector → paste URL → auth: Bearer <token>\n# order.book / order.cancel always require confirm=true',
    },
    {
      name: 'VS Code · Copilot',
      tag: 'IDE',
      descKey: 'aidist.clients.vscode',
      desc: 'Workspace .vscode/mcp.json (stdio type).',
      descZh: '工作区 .vscode/mcp.json(stdio 型)。',
      code: 'hbcli mcp setup vscode\n# writes .vscode/mcp.json in the current folder (servers key)',
    },
  ];
  const chinaClients = [
    {
      name: '豆包 · Doubao',
      tag: 'Work agent · ByteDance',
      descKey: 'aidist.clients.doubao',
      desc: 'Doubao desktop (work mode) — custom MCP connectors in 技能·连接器: URL + token, or a local command.',
      descZh: '豆包电脑版(工作模式)——「技能·连接器」支持自定义 MCP:URL+token 直填,或本地命令方式。',
      code: 'hbcli mcp setup doubao\n# prints your token, then 豆包电脑版 → 技能·连接器:\n#   新建 → 自定义连接器 → URL + token\n#   URL: https://api-test.hotelbyte.com/mcp\n#   token: Bearer <token>\n# or command mode: hbcli mcp serve',
    },
    {
      name: 'WorkBuddy',
      tag: 'Workbench · Tencent',
      descKey: 'aidist.clients.workbuddy',
      desc: "Tencent's all-scene AI work bench — its open platform (Sep 2026) takes MCP connectors: preset or your own server.",
      descZh: '腾讯全场景 AI 办公工作台——开放平台（2026 年 9 月上线）支持 MCP 连接器：预置或自定义 Server。',
      code: 'hbcli mcp setup workbuddy\n# prints your token, then WorkBuddy → MCP 连接器 → 自定义 Server:\n#   URL: https://api-test.hotelbyte.com/mcp\n#   Header: Authorization · Value: Bearer <token>',
    },
    {
      name: 'Trae',
      tag: 'IDE · ByteDance',
      descKey: 'aidist.clients.trae',
      desc: "ByteDance's AI IDE — MCP panel or .trae/mcp.json.",
      descZh: '字节 AI IDE——MCP 面板或 .trae/mcp.json。',
      code: 'hbcli mcp setup trae\n# writes [mcp_servers.hotelbyte] into ~/.trae/traecli.toml\n# (read by both Traex.app and the trae CLI)',
    },
    {
      name: 'Coze · 扣子',
      tag: 'Agent platform · ByteDance',
      descKey: 'aidist.clients.coze',
      desc: 'ByteDance agent platform — attach MCP extensions to any bot or workflow.',
      descZh: '字节 Agent 平台——智能体/工作流挂 MCP 扩展。',
      code: 'hbcli mcp setup coze\n# prints your token, then Bot/工作流 → 扩展 → MCP:\n#   Type: Streamable HTTP\n#   URL: https://api-test.hotelbyte.com/mcp\n#   Header: Authorization · Value: Bearer <token>',
    },
    {
      name: 'Qoder',
      tag: 'IDE · Alibaba',
      descKey: 'aidist.clients.qoder',
      desc: "Alibaba's agentic coding platform — add MCP in settings.",
      descZh: '阿里 Agentic 编程平台——在设置中添加 MCP。',
      code: 'hbcli mcp setup generic   # token + fields\n{ "mcpServers": { "hotelbyte":\n  { "command": "hbcli", "args": ["mcp", "serve"] } } }\n# MCP settings → paste JSON (stdio) or remote URL',
    },
    {
      name: 'CodeBuddy',
      tag: 'IDE · Tencent',
      descKey: 'aidist.clients.codebuddy',
      desc: 'Tencent AI coding assistant — add MCP in its MCP settings.',
      descZh: '腾讯 AI 编程助手——在 MCP 设置中添加。',
      code: 'hbcli mcp setup generic   # token + fields\n{ "mcpServers": { "hotelbyte":\n  { "command": "hbcli", "args": ["mcp", "serve"] } } }\n# MCP settings → import or paste',
    },
    {
      name: 'Cherry Studio',
      tag: 'Desktop · open source',
      descKey: 'aidist.clients.cherry',
      desc: 'Open-source desktop AI client — Settings → MCP Servers, stdio or streamable HTTP.',
      descZh: '开源桌面 AI 客户端——设置 → MCP 服务器,支持 stdio 与 Streamable HTTP。',
      code: 'hbcli mcp setup cherry\n# prints your token, then 设置 → MCP 服务器 → 添加:\n#   Type: Streamable HTTP · URL: .../mcp\n#   Header: Authorization · Value: Bearer <token>',
    },
  ];

  const openClients = [
    {
      name: 'OpenClaw',
      tag: 'Open source · 2026',
      descKey: 'aidist.clients.openclaw',
      desc: "2026's breakout open-source agent — workflow-driven tool orchestration, speaks MCP.",
      descZh: '2026 年爆红的开源 Agent——工作流式工具编排,原生 MCP。',
      code: 'hbcli mcp setup generic   # token + fields\n# register hotelbyte as an MCP tool source:\ntransport: stdio   command: hbcli mcp serve',
    },
    {
      name: 'Hermes',
      tag: 'Open source · 2026',
      descKey: 'aidist.clients.hermes',
      desc: 'Autonomous open-source agent with long-term memory — MCP-compatible tool calls.',
      descZh: '自主型开源 Agent,长期记忆——工具调用走 MCP。',
      code: 'hbcli mcp setup generic   # token + fields\nType: Streamable HTTP\nURL: https://api-test.hotelbyte.com/mcp\nHeader: Authorization: Bearer <token>',
    },
    {
      name: 'Cline',
      tag: 'VS Code agent',
      descKey: 'aidist.clients.cline',
      desc: 'Open-source VS Code agent — MCP Servers panel → Configure.',
      descZh: '开源 VS Code Agent——MCP Servers 面板配置。',
      code: 'hbcli mcp setup cline\n# merges hotelbyte into cline_mcp_settings.json',
    },
    {
      name: 'Roo Code',
      tag: 'VS Code agent',
      descKey: 'aidist.clients.roo',
      desc: 'Open-source VS Code agent (Cline family) — MCP settings.',
      descZh: '开源 VS Code Agent(Cline 系)——MCP 设置。',
      code: 'hbcli mcp setup generic   # token + fields\n# Roo Code → MCP Servers → Edit JSON → paste the snippet',
    },
    {
      name: 'Open WebUI',
      tag: 'Self-hosted chat',
      descKey: 'aidist.clients.openwebui',
      desc: 'Self-hosted chat UI — bridge any MCP server via mcpo, then add it as a tool.',
      descZh: '自托管对话界面——用 mcpo 把 MCP 桥成工具接入。',
      code: 'hbcli mcp setup generic   # token + fields\nuvx mcpo --port 8010 -- hbcli mcp serve\n# Open WebUI → Settings → Tools → http://localhost:8010',
    },
    {
      name: 'LangChain · LangGraph',
      tag: 'Framework',
      descKey: 'aidist.clients.langchain',
      desc: 'Python agent frameworks — langchain-mcp-adapters exposes the six tools directly.',
      descZh: 'Python Agent 框架——langchain-mcp-adapters 直接暴露六个工具。',
      code: 'hbcli mcp setup generic   # get the token first\nfrom langchain_mcp_adapters.client import MultiServerMCPClient\n\nclient = MultiServerMCPClient({"hotelbyte": {\n  "url": "https://api-test.hotelbyte.com/mcp",\n  "transport": "streamable_http",\n  "headers": {"Authorization": "Bearer <token>"}}})\ntools = await client.get_tools()',
    },
    {
      name: 'CrewAI',
      tag: 'Framework',
      descKey: 'aidist.clients.crewai',
      desc: 'Multi-agent orchestration — MCPServerAdapter turns the endpoint into crew tools.',
      descZh: '多 Agent 编排——MCPServerAdapter 把端点变成 crew 工具。',
      code: 'hbcli mcp setup generic   # get the token first\nfrom crewai_tools import MCPServerAdapter\n\nadapter = MCPServerAdapter({"hotelbyte": {\n  "url": "https://api-test.hotelbyte.com/mcp",\n  "headers": {"Authorization": "Bearer <token>"}}})\ntools = adapter.tools()',
    },
  ];

  const personalClients = [
    {
      name: 'Dots · ChatGPT',
      tag: 'DevDay · 2026-09',
      descKey: 'aidist.clients.dots',
      desc: "OpenAI's always-on agents (DevDay 2026, Sep 29) — each dot runs on its own cloud computer; wire hotel supply in as a plugin.",
      descZh: 'OpenAI 常驻 Agent（DevDay 2026·9-29）——每个 dot 跑在自己的云电脑上,以插件接入酒店供应。',
      code: 'hbcli mcp setup generic   # token + fields\n1. Settings → Security and login → Developer mode: ON\n2. chatgpt.com/plugins → “+” → add MCP server (Bearer <token>)\n3. Dot profile → Customize → Plugins → enable hotelbyte',
    },
    {
      name: 'Instinct',
      tag: 'Personal · 2026-08',
      descKey: 'aidist.clients.instinct',
      desc: 'The viral message-first personal agent (books flights and hotels over iMessage/WhatsApp) — hosted, so supply lands platform-side.',
      descZh: '爆火的消息式个人 Agent（在 iMessage/WhatsApp 里替你订机票酒店）——托管形态,供应由平台侧接入。',
      code: 'Hosted agent — no client-side config.\nIts platform team integrates the unified API / MCP\nbehind the scenes: one contract, all suppliers.\n→ Partner integration: sales@hotelbyte.com',
    },
    {
      name: 'Karpo',
      tag: 'Personal · 2026',
      descKey: 'aidist.clients.karpo',
      desc: "MachinePulse's city sidekick living inside iMessage — proactive plans, restaurants, stays. Platform-side supply.",
      descZh: 'MachinePulse 的城市搭子（iMessage 内）——行程、餐厅、住宿;供应走平台侧对接。',
      code: 'Hosted agent — no client-side config.\nCity-plan tools call the unified API / MCP\nbehind the scenes: one contract, all suppliers.\n→ Partner integration: sales@hotelbyte.com',
    },
  ];

  const clientTabs = [
    { key: 'global', label: L('aidist.clients.global', 'Global clients', '全球主流'), items: clients },
    { key: 'china', label: L('aidist.clients.china', 'China ecosystem', '国产生态'), items: chinaClients },
    { key: 'opensource', label: L('aidist.clients.opensource', 'Open source', '开源系列'), items: openClients },
    { key: 'personal', label: L('aidist.clients.personal', 'Personal agents · the 2026 wave', '个人智能体 · 2026 浪潮'), items: personalClients },
  ];
  const [activeClientTab, setActiveClientTab] = useState(0);

  const renderClientCard = (c: { name: string; tag: string; descKey: string; desc: string; descZh: string; code: string }) => (
    <div key={c.name} className="p-6 rounded-sm border border-line bg-paper-raised flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <code className="font-mono text-sm text-ink font-semibold">{c.name}</code>
        <span className="text-[10px] font-medium tracking-wider uppercase px-2 py-0.5 rounded-sm bg-ink/8 text-ink/55">{c.tag}</span>
      </div>
      <p className="text-sm text-ink/60 leading-relaxed mb-4 flex-1">{t(c.descKey, isEn ? c.desc : c.descZh)}</p>
      <pre className="text-[11px] leading-relaxed font-mono bg-ink/5 border border-line rounded-sm p-3 overflow-x-auto text-ink/75 whitespace-pre">{c.code}</pre>
    </div>
  );

  return (
    <div className="pt-12 pb-24 px-6 lg:px-8 max-w-7xl mx-auto">
      <Seo
        path={route.path}
        title={loc?.title ?? (isEn ? route.title : route.titleZh)}
        description={loc?.description ?? (isEn ? route.description : route.descriptionZh)}
        locale={locale === 'zh' ? 'zh-CN' : locale}
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
          {L('aidist.hero.title1', 'One MCP integration.', '一次 MCP 集成,')}<br /><span className="text-ink">{L('aidist.hero.title2', 'Every supplier.', '接完全部供应商。')}</span>
        </h1>
        <p className="text-lg text-ink/60 font-light">
          {L('aidist.hero.subtitle',
            'The unified distribution interface for AI agents: search, live rates, and two-phase confirmed booking — with quotes that carry their own evidence and pricing rules you configure.',
            '面向 AI Agent 的统一分销接口:搜索、实时报价与两段式确认预订——报价自带证据,价格规则由你配置。')}
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link to="/demo" className="inline-flex items-center gap-2 px-5 py-2.5 bg-ink text-paper text-sm font-medium rounded-sm hover:bg-ink/85 transition-colors">
            {L('aidist.hero.cta', 'Request access', '申请接入')}
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
          <h3 className="text-xl font-bold text-ink mb-4">{L('aidist.why1.title', 'The new integration tax', '新的集成税')}</h3>
          <p className="text-sm text-ink/60 leading-relaxed">
            {L('aidist.why1.body',
              'Hotel suppliers are each shipping their own MCP. Every integration means another account, another ID space, another pricing black box — your agent rebuilds the same plumbing per supplier, forever.',
              '酒店供应商正在各自推出 MCP。每接一家就是新的账号体系、新的 ID 空间、新的价格黑箱——你的 Agent 要为每一家供应商重造一遍同样的管道,永远接不完。')}
          </p>
          <div className="mt-6 space-y-2 font-mono text-xs text-ink/45">
            <div>supplier-MCP × N → N × (auth + ids + pricing + ops)</div>
          </div>
        </div>
        <div className="p-8 rounded-sm border border-ink/40 bg-paper-raised relative">
          <div className="absolute -top-3 left-6 px-2 py-0.5 bg-ink text-paper text-[10px] font-medium tracking-wider uppercase rounded-sm">
            HotelByte
          </div>
          <h3 className="text-xl font-bold text-ink mb-4">{L('aidist.why2.title', 'Aggregate once', '聚合一次')}</h3>
          <p className="text-sm text-ink/60 leading-relaxed">
            {L('aidist.why2.body',
              '27+ supplier connectors (Dida, Tourmind, Yalago, Hotelbeds, ...) live behind one MCP tool surface. When a supplier ships their own MCP tomorrow, it becomes one more upstream lane for us — not one more integration for you.',
              '27+ 供应商连接器(Dida、Tourmind、Yalago、Hotelbeds 等)在同一个 MCP 工具面后面。供应商明天再出新 MCP,只是我们的又一条上游通道——不是你的又一次集成。')}
          </p>
          <div className="mt-6 font-mono text-xs text-ink/45">
            your-agent → /mcp → {L('aidist.why2.all', 'all suppliers', '全部供应商')}
          </div>
        </div>
      </motion.div>

      {/* Three onboarding paths */}
      <div className="mb-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl lg:text-4xl font-display mb-4">{L('aidist.paths.title', 'Three ways in', '三条接入路')}</h2>
          <p className="text-ink/60">
            {L('aidist.paths.lead', 'Same tool surface, same contract — pick the path that matches where your agent runs.', '同一工具面、同一契约——按 Agent 的运行环境选路。')}
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
              <h3 className="text-lg font-bold text-ink mb-2">{t(p.titleKey, isEn ? p.titleEn : p.title)}</h3>
              <p className="text-sm text-ink/60 leading-relaxed mb-4 flex-1">{t(p.descKey, isEn ? p.descEn : p.desc)}</p>
              <pre className="text-[11px] leading-relaxed font-mono bg-ink/5 border border-line rounded-sm p-3 overflow-x-auto text-ink/75 whitespace-pre">{p.code}</pre>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Per-agent quickstarts */}
      <div className="mb-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl lg:text-4xl font-display mb-4">{L('aidist.clients.title', 'Connect your agent in one minute', '一分钟接入你的 Agent')}</h2>
          <p className="text-ink/60">
            {L('aidist.clients.lead',
              'Every card starts with one command — hbcli mcp setup <client> — which writes the config (or prints your token + the exact fields to paste) and verifies the connection. Write tools still require explicit confirmation.',
              '每张卡都从一条命令开始——hbcli mcp setup <客户端>:自动写好配置(或打印 token 与逐字段填法)并验证连通。写工具依旧必须显式确认。')}
          </p>
        </div>
        <div className="mb-6 grid sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-sm border border-brass/30 bg-brass/5">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brass mb-2">{L('aidist.paths.try.eyebrow', 'Zero signup — try now', '零门槛 · 先玩起来')}</p>
            <p className="text-sm text-ink/70 leading-relaxed">{L('aidist.paths.try.body',
              'hbcli mcp setup <client> --demo connects with the shared sandbox identity — no account needed. Demo credentials ship with hotel-be#32386; until then the command prints the two-step own-tenant path.',
              'hbcli mcp setup <客户端> --demo 用公共沙箱身份直连——无需注册。演示凭据随 hotel-be#32386 发放;当前该命令会打印自有租户的两步配置路径。')}</p>
          </div>
          <div className="p-5 rounded-sm border border-line bg-paper-raised">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/45 mb-2">{L('aidist.paths.own.eyebrow', 'Bring your own tenant', '接入你自己的租户')}</p>
            <p className="text-sm text-ink/70 leading-relaxed">{L('aidist.paths.own.body',
              'Register on the portal, issue API credentials, then hbcli auth set-credentials && hbcli mcp setup — your supplier rules, your markup, your customers. One user can hold both identities.',
              '门户注册 → 发放 API 凭据 → hbcli auth set-credentials && hbcli mcp setup——你的供应商规则、你的加价、你的客户。一个用户可同时持有两层身份。')}</p>
          </div>
        </div>
        <div role="tablist" aria-label={L('aidist.clients.title', 'Connect your agent in one minute', '一分钟接入你的 Agent')}
          className="flex flex-wrap gap-x-1 gap-y-2 border-b border-line mb-8">
          {clientTabs.map((tab, i) => (
            <button key={tab.key} type="button" role="tab" aria-selected={activeClientTab === i}
              onClick={() => setActiveClientTab(i)}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors focus-visible:outline-2 focus-visible:outline-brass ${activeClientTab === i ? 'border-brass text-ink' : 'border-transparent text-ink/55 hover:text-ink'}`}>
              {tab.label} <span className="text-xs text-ink/40">{tab.items.length}</span>
            </button>
          ))}
        </div>
        {clientTabs.map((tab, i) => (
          <div key={tab.key} role="tabpanel" hidden={activeClientTab !== i} className="grid md:grid-cols-2 gap-6">
            {tab.items.map(renderClientCard)}
          </div>
        ))}

        {/* Universal protocol guide — any language, any self-built agent */}
        <div className="mt-6 p-6 rounded-sm border border-ink/25 bg-paper-raised">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <code className="font-mono text-sm text-ink font-semibold">{L('aidist.clients.guide.name', 'Any agent · self-built', '通用 Agent · 自研')}</code>
            <span className="text-[10px] font-medium tracking-wider uppercase px-2 py-0.5 rounded-sm bg-ink/8 text-ink/55">JSON-RPC</span>
          </div>
          <p className="text-sm text-ink/60 leading-relaxed mb-4">
            {L('aidist.clients.guide.desc',
              'No SDK required: MCP over streamable-http is three JSON-RPC calls. Works from any language, framework, or runtime — including agents you build yourself. Official SDKs (Python mcp, TypeScript @modelcontextprotocol/sdk) point at the same URL.',
              '无需 SDK:MCP over streamable-http 就是三次 JSON-RPC 调用。任何语言、框架、运行时都适用——包括你自研的 Agent。官方 SDK(Python mcp、TypeScript @modelcontextprotocol/sdk)指向同一 URL 即可。')}
          </p>
          <pre className="text-[11px] leading-relaxed font-mono bg-ink/5 border border-line rounded-sm p-3 overflow-x-auto text-ink/75 whitespace-pre">{`POST https://api-test.hotelbyte.com/mcp
Authorization: Bearer <token> · Accept: application/json, text/event-stream

# 1) initialize — protocol version + client info
{"jsonrpc":"2.0","id":1,"method":"initialize","params":{
  "protocolVersion":"2025-06-18","capabilities":{},
  "clientInfo":{"name":"my-agent","version":"1.0"}}}

# 2) tools/list — discover the six tools and their schemas
{"jsonrpc":"2.0","id":2,"method":"tools/list"}

# 3) tools/call — search hotels in Dubai for two adults
{"jsonrpc":"2.0","id":3,"method":"tools/call","params":{
  "name":"hotel.list","arguments":{
    "destinationName":"Dubai","checkIn":"2026-11-20","checkOut":"2026-11-22",
    "rooms":[{"adultCount":2}]}}}`}</pre>
          <p className="text-xs text-ink/45 mt-3">
            {L('aidist.clients.guide.footnote',
              'Every result returns { response, evidence } — keep the traceId for reconciliation. order.book needs check_avail first and confirm=true; retries reuse customerReferenceNo.',
              '每个结果都返回 { response, evidence }——保留 traceId 以便对账。order.book 需先 check_avail 且携带 confirm=true;重试复用 customerReferenceNo。')}
          </p>
        </div>

        <p className="text-center text-xs text-ink/45 mt-6">
          {L('aidist.clients.note',
            'Token source: hbcli mcp token (static key, dies after 30 idle days) or any portal-issued ticket. Never paste supplier credentials here — the token is your HotelByte identity.',
            'Token 来源:hbcli mcp token(静态钥匙,闲置 30 天失效)或门户签发的 ticket。这里绝不放供应商凭据——它就是你的 HotelByte 身份。')}
        </p>
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
          <h2 className="text-3xl lg:text-4xl font-display mb-4">{L('aidist.tools.title', 'The tool surface', '工具面')}</h2>
          <p className="text-ink/60">
            {L('aidist.tools.lead',
              'Six tools cover the whole transaction. Write tools exist only when a deployment enables them — and never execute without explicit confirmation.',
              '六个工具覆盖完整交易。写工具仅在部署显式开启时存在——且没有显式确认绝不执行。')}
          </p>
        </div>
        <div className="rounded-sm border border-line bg-paper-raised overflow-hidden">
          {tools.map((tool, idx) => (
            <div key={tool.name} className={`flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 px-6 py-4 ${idx > 0 ? 'border-t border-line' : ''}`}>
              <code className="font-mono text-sm text-ink font-semibold min-w-[10.5rem]">{tool.name}</code>
              <span className={`text-[10px] font-medium tracking-wider uppercase px-2 py-0.5 rounded-sm w-fit ${tool.mode === 'rw' ? 'bg-seal/15 text-seal' : 'bg-ink/8 text-ink/55'}`}>
                {tool.mode === 'rw' ? L('aidist.tools.write', 'write · confirm', '写 · 需确认') : L('aidist.tools.read', 'read', '读')}
              </span>
              <span className="text-sm text-ink/60">{t(tool.noteKey, isEn ? tool.noteEn : tool.note)}</span>
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
          <h3 className="text-xl font-bold text-ink mb-3">{L('aidist.evidence.title', 'Quotes that carry evidence', '报价自带证据')}</h3>
          <p className="text-sm text-ink/60 leading-relaxed mb-4">
            {L('aidist.evidence.body',
              'Every tool result returns { response, evidence }. The response mirrors the HTTP API; the evidence envelope makes each quote citable and traceable — hand the traceId to support and they can reconstruct that exact quote.',
              '每个工具结果返回 { response, evidence }。response 与 HTTP API 同构;证据信封让每条报价可引用、可追溯——把 traceId 交给服务方即可还原那一次报价的完整链路。')}
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
          <h3 className="text-xl font-bold text-ink mb-3">{L('aidist.book.title', 'Bookings with a hard confirmation boundary', '预订的硬确认边界')}</h3>
          <ol className="text-sm text-ink/60 leading-relaxed list-decimal list-inside space-y-2">
            <li>{L('aidist.book.s1', 'hotel.rates — present price, refundability and cancel fees to the user.', 'hotel.rates — 把价格、退款政策与取消费展示给用户。')}</li>
            <li>{L('aidist.book.s2', 'hotel.check_avail — re-verify the exact rate; live prices can move.', 'hotel.check_avail — 复核确切报价;实时价格会变。')}</li>
            <li>{L('aidist.book.s3', 'order.book with confirm=true — only after the user consents. Anything less is rejected server-side before the order flow starts.', 'order.book 携带 confirm=true — 仅在用户点头之后。差一点都会在订单流程启动前被服务端拒绝。')}</li>
            <li>{L('aidist.book.s4', 'Retries reuse customerReferenceNo — idempotent by key, duplicates surface as a soft warning you must confirm.', '重试复用 customerReferenceNo — 按键幂等,重复下单以软警告形式出现、必须显式确认。')}</li>
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
          <h3 className="text-xl font-bold text-ink">{L('aidist.sandbox.title', 'Try the sandbox now', '现在就试沙箱')}</h3>
          <span className="text-[10px] font-medium tracking-wider uppercase px-2 py-0.5 rounded-sm bg-ink/8 text-ink/55">UAT · no SLA</span>
        </div>
        <p className="text-sm text-ink/60 mb-4">
          {L('aidist.sandbox.lead',
            'The sandbox endpoint is publicly reachable. Any MCP client can initialize against it with a valid ticket:',
            '沙箱端点公开可达。任意 MCP 客户端持有效 ticket 即可初始化:')}
        </p>
        <pre className="text-[11px] leading-relaxed font-mono bg-ink/5 border border-line rounded-sm p-3 overflow-x-auto text-ink/75 whitespace-pre">{`curl -X POST https://api-test.hotelbyte.com/mcp \\
  -H "Authorization: Bearer <ticket>" \\
  -H "Accept: application/json, text/event-stream" \\
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'`}</pre>
      </motion.div>

      {/* Procurement evaluation */}
      <ProductEvaluation
        rows={isAr ? evalRowsAr : product.evaluation}
        rowsEn={isAr ? evalRowsAr : product.evaluationEn}
        eyebrow={t('aidist.eval.eyebrow', '采购视角')}
        eyebrowEn={t('aidist.eval.eyebrow', 'Procurement view')}
        title={t('aidist.eval.title', isEn ? 'What to check when evaluating an AI distribution interface' : '评估 AI 分销接口时看什么')}
        titleEn={t('aidist.eval.title', 'What to check when evaluating an AI distribution interface')}
        lead={t('aidist.eval.lead', isEn
          ? 'Vendor-neutral. Three questions separate an aggregation layer from another single-inventory MCP — and how to prove each on the spot.'
          : '不点名任何厂商。三个问题区分「聚合层」与「又一家单库存 MCP」——且每一条都可以当场验证。')}
        leadEn={t('aidist.eval.lead', 'Vendor-neutral. Three questions separate an aggregation layer from another single-inventory MCP — and how to prove each on the spot.')}
      />
    </div>
  );
}
