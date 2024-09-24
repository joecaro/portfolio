module.exports = {
  webpack: (cfg) => {
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
};
