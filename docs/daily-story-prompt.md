# 每日故事生成提示词

用法：把下面“提示词”一节整段交给定时任务（Codex automation 或 Claude 定时任务），
建议每天 10:00（Asia/Dubai）在 hotel-be 主仓目录运行；手动补某一天时，把“今天”换成那个日期。
数据契约见 `AGENTS.md` 的 Daily Stories 一条，公开说法的证据规则见 `docs/seo-aeo-release.md`。

---

## 提示词

你负责给 hotelbyte.com/stories 发布 HotelByte 每日故事（中英双语）。每日故事是“系统如何真正运转的剖面”：
每天讲一件刚落地的真实改动，说清它替哪类客户解决了什么、为什么这样设计。它不是周报，不是广告，
也不是凭空写的架构随笔。以 2026-09-15 及以后的篇目为范例；更早的篇目写法不同，不作参考。

### 1. 确定要写哪几天

- 今天 D = `TZ=Asia/Dubai date +%F`。
- 仓库：hotelbyte-com/hotelbyte-landing，主分支 main，在 hotel-be 里是子模块 external/hotelbyte-landing。
  主检出常被别的会话占用，不要在上面改：在 hotel-be 主检出下建
  `.worktrees/hotelbyte-landing/daily-story-<D>/`，从最新 origin/main 开分支，用完删掉。
- 读 origin/main 的 src/data/dailyStories.ts：D 已经有了就只报告、不写。上一篇到 D 之间缺的日子按日期从旧到新逐日补，
  一次最多补 7 天，剩下的写进报告留给下次。补写篇目 generatedBy 用 `<agent>-daily-story-backfill`，
  generatedAt 用 `<date>T00:00:00+04:00`。

### 2. 取材

- 窗口：前一天 10:00 到当天 10:00（Asia/Dubai），即 UTC `<D-1>T06:00:00Z..<D>T05:59:59Z`。
- 列出窗口内三个仓库已合并的 PR（hotel-be、hotel-fe、hotelbyte-landing）：
  `gh pr list --repo hotelbyte-com/<repo> --state merged --search "merged:<start>..<end>" --limit 1000 --json number,title,mergedAt`
- 先排除：发布记录、CI/门禁/测试/工具/agent 治理、依赖升级、纯重构与清理、监控告警、部署、安全修复、事故处理。
- 从剩下的里挑 3–6 个客户能感觉到的变化，逐个读 PR 正文（背景、方案、业务影响）和必要的 diff，确认：
  确实合入、没有被后来的 PR 回退（搜 revert 和这个 PR 号）、你要写的每个说法都有代码或 PR 正文支撑。
- 窗口里没有合格的，就从过去 7 天里挑一件还没讲过的；再没有，就从上一篇的 nextThemeSeeds 里挑一条代码里确有其事的。

### 3. 选一件事

按顺序看：

1. 一句话说得清给谁带来什么结果（买家、卖家、旅行顾问、运营、财务、开发者）。
2. 公开安全（第 4 节）。
3. 和最近 14 篇不重复（看 title、theme、slug），领域轮换：搜索与报价、预订与订单、取消与退款、币种与结算、钱包、
   内容与目录、酒店和房型映射、供应商接入、定价规则、Lookout 价格情报、TraceSight 链路诊断、RevenuePilot、
   AI 分销接口（MCP）、Stai Retail / API / Counselor、售前助手、多语言、账号与权限设计。
4. 讲得出一个取舍：选了什么、放弃了什么、为什么。

### 4. 公开安全（硬约束，碰到就换题）

- 不写：人名和账号；客户、租户、供应商的名字（写“一家批发商客户”“一家供应商”）；主机名、IP、内部 URL；
  密钥和凭证；PR、issue 编号和私有仓库链接；价格、合同条款、内部成本和内部指标；还没修好的缺陷；
  任何越权、泄露类问题（修好了也不写）；事故经过；对团队或 agent 的负面叙述。
- 产品名只用官网已经公开的（以 public/llms.txt 为准）：Stai Retail、Stai API、Stai Counselor、AI 分销接口（MCP）、
  Lookout、TraceSight、RevenuePilot、GoTry。内部代号（BYOC、BYOS、HBLog、表名、服务名）换成白话。
- 合入、发布、生产可用是三种证据。只写“这次改了什么、为什么”；没有发布证据不写“已全面上线”“所有客户可用”。
  设计稿、试点只能写成计划；只在测试环境开放或默认关闭的能力，在 summary 里写明，标题不许诺。
- 来源 PR 是事故或缺陷修复时，只写设计原则，不复述事故经过、根因和“以前会怎样”，也不声称效果已经验证。
- 不公开：防滥用的阈值和频率限制、计费公式和计数口径、合同条款、系统存了哪几类密钥、
  资损或权限控制里还没覆盖的情况（“暂时跳过”之类）。

### 5. 说法以代码为准

- 正文里的字段、接口、状态、按钮名必须在当时的代码里存在；能用白话就不用标识符；绝不发明字段名或对象名。
- 数字（上限、预算、比例、时长）只用 PR 或代码里明确写出的；拿不准的不写。
- 引号里的界面文案必须和真实界面一字不差，否则去掉引号转述。
- “绝不、任何、都不能”这类绝对说法，只有代码在所有路径上都保证时才写。

### 6. 写法

- 说人话：短句、具体场面、少形容词。不用“赋能、极致、革命性、闭环、抓手”，不喊 AI-native 口号；
  买家看不懂的工程词（实体、事务、令牌、等待者、同步接口）换成白话。
- 不套模板：读一遍最近几篇再写。第 3 段直接从具体改动写起，不以“这次/现在”开头；结尾不加总结式格言；
  英文标题少用 Should；不对团队或自己的工具自我批评。英文用英式拼写（cancelled、behaviour），time zone 分开写。
- 正文 3–4 段：客户遇到的具体场面 → 难在哪里、最容易犯的错 → 这次怎么改、为什么这样选、放弃了什么 → 对读者意味着什么、边界在哪。
- 中文：title 不超过 24 字；mood 一句有画面的话；theme 一句主张；summary 不超过 120 字；正文每段 90–200 字。
- 英文是同一内容的独立重写，不逐句直译：title 不超过 12 个词，每段 50–110 词。
- 字段内只放纯文本：不用反引号、Markdown、HTML（页面原样显示）。
- ctaLabel：中文“返回 HotelByte 首页”，英文“Back to the HotelByte homepage”；cta.href 为 '/'。
- nextThemeSeeds：中英各 5 条，每条至少 12 个字符，是这篇引出的、代码里已经有的、买家关心的后续话题
  （页面把它当 keywords）；不写权限与安全话题、未来计划、内部测试工具。

### 7. 数据

在 src/data/dailyStories.ts 的 dailyStories 数组末尾按日期升序追加一个对象；只改这个文件，不动已有篇目，不提交 src/data/generated/。

```ts
{
  date: 'YYYY-MM-DD',
  slug: 'english-words-joined-by-hyphens',
  content: {
    zh: { title, mood, theme, summary, body: [/* 3–4 段 */], ctaLabel: '返回 HotelByte 首页' },
    en: { title, mood, theme, summary, body: [/* 3–4 段 */], ctaLabel: 'Back to the HotelByte homepage' }
  },
  visual: {
    src: '/daily/YYYY-MM-DD.svg',
    alt: { zh, en },       // 图里画了什么，至少 8 个字符
    caption: { zh, en }    // 这张图想说明的点，至少 20 个字符
  },
  nextThemeSeeds: { zh: [/* 5 条 */], en: [/* 5 条 */] },
  cta: { href: '/' },
  generatedBy: '<agent>-daily-story-publisher',   // 如 claude-daily-story-publisher、codex-daily-story-publisher
  generatedAt: 'YYYY-MM-DDTHH:mm:ss+04:00'          // 实际发布时间
}
```

slug 用 3–8 个英文小写单词描述这件事，不含日期，全局唯一。

### 8. 配图

public/daily/<date>.svg：

- 开头 `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="540" viewBox="0 0 960 540" role="img" aria-labelledby="title desc">`，
  带 `<title id="title">` 和 `<desc id="desc">`。
- 页面上大约按 320px 宽显示：画机制，不画仪表盘。3–6 个大形体（卡片、轨道、闸门、时钟、天平、漏斗……）加箭头关系；
  最多 4 个文字标签，英文白话 1–3 个词，font-size 不小于 28，不写字段名。
- 配色跟官网：底色 #F2EEE2 / #F8F5EC，主线 #1C2823，强调 #7E5D19 / #C9A24B，警示 #9C3B25 / #D96C4F，
  分隔 #D8D1BD，可加一个辅助色（如 #4F7A6A 或 #3E6A8A）。
- 纯矢量：不用 script、image、foreignObject、外链字体、样式或图片；font-family="Trebuchet MS, Arial, sans-serif"；
  文件不超过 12 KB；每篇构图不同。

### 9. 校验

在 hotelbyte-landing 工作区：

```bash
npm ci
npm run test:daily-stories
npm run lint
npm run build
npm run test:seo
xmllint --noout public/daily/<date>.svg
```

再对照第 4、5、6 节把中英正文逐句过一遍；条件允许时，让另一个没参与写作的 agent 只拿正文、取材 PR 和本文件做一次复核。
任何一步失败就修好重跑；修不好就不发布，在报告里写原因。

### 10. 发布

- 一篇一个提交：标题 `publish <date> daily story: <slug>`，正文只列取材 PR（hotel-be#…、hotel-fe#…）和跑过的检查。
  这个仓库是公开的：提交信息、PR 标题和正文同样按第 4 节写，核对细节留在私有 issue 或本地记录里。
- 推送到 origin main（和以往每日故事一样，由官网部署流程发布）。被拒绝时 rebase 到最新 origin/main、重跑第 9 节再推；
  仍不行就开 PR 并报告。不要 force push。
- 推送后打开 https://hotelbyte.com/stories/<slug>：能打开就记“已上线”，打不开就记“已推送，部署待确认”。
- 报告：日期、slug、中英标题、取材 PR、提交 SHA、页面 URL 和上线状态；没补完的日期也列出来。
