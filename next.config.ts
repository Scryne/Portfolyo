import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Statik çıktı: out/ her statik barındırıcıda çalışır, sunucu yok.
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  // İki ayrı kök layout (TR ve EN) olduğu için eşleşmeyen yollara tek bir 404 sayfası.
  experimental: { globalNotFound: true },
};

export default nextConfig;
