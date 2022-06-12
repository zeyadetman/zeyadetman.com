/** @type {import('next').NextConfig} */
const withPlugins = require("next-compose-plugins");
const withPWA = require("next-pwa");
const mdxOptions = (...args) =>
  import("./mdxConfig/options.js").then(({ default: fetch }) => fetch(...args));

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    providerImportSource: "@mdx-js/react",
    ...mdxOptions,
  },
});

const nextConfig = {
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
  reactStrictMode: true,
  images: {
    domains: ["/public"],
  },
};

module.exports = withPlugins([
  withMDX({
    pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  }),
  nextConfig,
  withPWA({
    pwa: {
      disable: process.env.NODE_ENV === "development",
      register: true,
      sw: "/sw.js",
    },
  }),
]);
