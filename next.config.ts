import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Testing on a real phone means loading the dev server over the LAN
   * (`http://192.168.x.x:3000`), which is a different origin from the
   * `localhost` the server was initialised with. Next blocks cross-origin
   * requests to dev-only assets by default, so the document renders — it is
   * server-rendered — while every `/_next/static` chunk comes back 403. React
   * never hydrates and the page looks perfect but is completely inert: the
   * menu button, and every other control, does nothing.
   *
   * Dev-only; production builds are unaffected.
   */
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*", "172.16.*.*"],
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
