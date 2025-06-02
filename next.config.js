const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [require('remark-gfm')],
    rehypePlugins: [require('rehype-highlight')],
  },
})

module.exports = withMDX({
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  webpack: (cfg) => {
    cfg.module.rules.push({
      test: /\.mdx?$/,
      use: [
        {
          loader: '@mdx-js/loader',
          options: {
            remarkPlugins: [require('remark-gfm')],
            rehypePlugins: [require('rehype-highlight')],
          }
        }
      ]
    });
    cfg.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });
    return cfg;
  },
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'res.cloudinary.com',
    }],
  },
  compiler: {
    styledComponents: true,
  },
});
