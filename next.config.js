module.exports = {
  webpack: (cfg) => {
    cfg.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });
    return cfg;
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};
