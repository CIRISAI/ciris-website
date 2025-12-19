/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://ciris.ai',
  generateRobotsTxt: true,
  trailingSlash: true,
  outDir: './out',
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
    ],
    additionalSitemaps: [],
  },
  exclude: ['/api/*'],
}
