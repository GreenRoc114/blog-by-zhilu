import type { NitroConfig } from 'nitropack'
import type { BundledLanguage, BundledTheme } from 'shiki'
import type { FeedEntry } from '~/types/feed'
import redirectList from './redirects.json'

export { zhCN as dateLocale } from 'date-fns/locale/zh-CN'

// 存储 nuxt.config 和 app.config 共用的配置
// 此处为启动时需要的配置，启动后可变配置位于 app/app.config.ts
const blogConfig = {
    title: 'GreenRoc的博客',
    subtitle: 'No Fate, We Make.',
    // 长 description 利好于 SEO
    description: 'GreenRoc的个人博客，分享技术与生活，框架直接从其他大佬那里fork过来的，网站下方有这位大佬的github仓库。',
    author: {
        name: 'GreenRoc',
        avatar: 'https://cd.ahhf45.top/img/IMG_0555.jpeg',
        email: 'mollymathieson4@gmail.com',
        homepage: 'https://ahhf45.top/',
    },
    copyright: {
        abbr: 'CC BY-NC-SA 4.0',
        name: '署名-非商业性使用-相同方式共享 4.0 国际',
        url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hans',
    },
    favicon: 'https://cd.ahhf45.top/img/IMG_0555.jpeg',
    language: 'zh-Hans',
    timeEstablished: '2025-05-09',
    timezone: 'Asia/Shanghai',
    url: 'https://ahhf45.top/',

    feed: {
        limit: 50,
    },

    // 在 URL 中隐藏的路径前缀
    hideContentPrefixes: ['/posts'],

    imageDomains: [
        // 自动启用本域名的 Nuxt Image
        // 'www.zhilu.cyou',
        // '7.isyangs.cn',
    ],

    // 禁止搜索引擎收录的路径
    robotsNotIndex: ['/preview', '/previews/*'],

    scripts: [
        // 自己部署的 Umami 统计服务
        { 'src': 'https://umami.ahhf45.top/script.js', 'data-website-id': '9b92a3f1-97bc-494c-aea9-436c5590421f', 'defer': true },
        // Cloudflare Insights 统计服务
        //{ 'src': 'https://static.cloudflareinsights.com/beacon.min.js', 'data-cf-beacon': '{"token": "97a4fe32ed8240ac8284e9bffaf03962"}', 'defer': true },
    ],

    // 用于 Shiki、Plain Shiki 引入代码高亮
    // 同时用于显示代码块语言对应的 Iconify Catppuccin 图标
    shiki: {
        bundledLangs: <BundledLanguage[]>['bat', 'log', 'sh', 'powershell'],
        langs: <BundledLanguage[]>['bat', 'c', 'cpp', 'css', 'diff', 'html', 'ini', 'java', 'js', 'json', 'log', 'makefile', 'matlab', 'md', 'mdc', 'powershell', 'python', 'sh', 'sql', 'ssh-config', 'toml', 'ts', 'tsx', 'vb', 'vue', 'xml', 'yaml'],
        themes: <BundledTheme[]>['catppuccin-latte', 'one-dark-pro'],
        defaultTheme: <BundledTheme>'catppuccin-latte',
        darkTheme: <BundledTheme>'one-dark-pro',
    },

    // 用于 Twikoo 评论系统
    twikoo: {
        js: 'https://gcore.jsdelivr.net/npm/twikoo@1.6.40/dist/twikoo.all.min.js',
        // 自己部署的 Twikoo 服务
        envId: 'https://twikoo.ahhf45.top/',
        preload: 'https://twikoo.ahhf45.top/',
    },
}

// 用于生成 OPML 和友链页面配置
export const myFeed = <FeedEntry>{
    author: blogConfig.author.name,
    sitenick: 'GreenRoc的博客',
    title: blogConfig.title,
    desc: blogConfig.subtitle || blogConfig.description,
    link: blogConfig.url,
    feed: new URL('/atom.xml', blogConfig.url).toString(),
    icon: blogConfig.favicon,
    avatar: blogConfig.author.avatar,
    archs: ['Nuxt', 'Vercel'],
    date: blogConfig.timeEstablished,
    comment: '这是我自己',
}

// 将旧页面永久重定向到新页面
const redirectRouteRules = Object.entries(redirectList)
    .reduce<NitroConfig['routeRules']>((acc, [from, to]) => {
        acc![from] = { redirect: { to, statusCode: 301 } }
        return acc
    }, {})

// https://nitro.build/config#routerules
// @keep-sorted
export const routeRules = <NitroConfig['routeRules']>{
    ...redirectRouteRules,
    '/api/stats': { prerender: true, headers: { 'Content-Type': 'application/json' } },
    '/atom.xml': { prerender: true, headers: { 'Content-Type': 'application/xml' } },
    '/favicon.ico': { redirect: { to: blogConfig.favicon } },
    '/zhilu.opml': { prerender: true, headers: { 'Content-Type': 'application/xml' } },
}

export default blogConfig
