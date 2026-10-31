const fs = require("fs");
const path = require("path");

// Every route is dynamic (the root layout reads the theme cookie), so
// next-sitemap finds nothing in the build output. List the pages here.
const projectSlugs = fs
  .readdirSync(path.join(__dirname, "src/content"))
  .filter((file) => /\.mdx?$/.test(file))
  .map((file) => file.replace(/\.mdx?$/, ""));

const pages = ["/", "/about", "/projects", ...projectSlugs.map((slug) => `/projects/${slug}`)];

module.exports = {
  siteUrl: process.env.SITE_URL || "https://www.josephcarothers.com",
  generateRobotsTxt: true,
  exclude: ["/test", "/contact"],
  additionalPaths: async (config) =>
    Promise.all(pages.map((page) => config.transform(config, page))),
};
