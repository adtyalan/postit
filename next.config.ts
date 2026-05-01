import os from "os";
import type { NextConfig } from "next";

/**
 * Mengumpulkan semua IP address lokal non-internal (IPv4) dari semua
 * network interface yang aktif di mesin ini.
 *
 * Kenapa dilakukan di sini dan bukan di tempat lain:
 * - next.config.ts dijalankan oleh Node.js pada saat server start,
 *   sehingga `os.networkInterfaces()` tersedia secara native tanpa dependency tambahan.
 * - Ini menghindari hardcode IP yang sering berubah saat berpindah jaringan.
 */
function getLocalIpAddresses(): string[] {
  const ifaces = os.networkInterfaces();

  return Object.values(ifaces)
    .flat()
    .filter(
      (iface): iface is os.NetworkInterfaceInfo =>
        iface !== undefined &&
        iface.family === "IPv4" &&
        !iface.internal
    )
    .map((iface) => iface.address);
}

const localIps = getLocalIpAddresses();

const nextConfig: NextConfig = {
  // IP lokal mesin di-detect otomatis saat server start,
  // sehingga tidak perlu hardcode meskipun IP berubah di jaringan lain.
  allowedDevOrigins: localIps,
  experimental: {
    serverActions: {
      allowedOrigins: localIps,
    },
  },
};

export default nextConfig;
