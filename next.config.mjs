/** Statischer Export für GitHub Pages (eigene Domain, kein basePath). */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
};
export default nextConfig;
