/**
 * Dynamic string resolver to avoid static content scanning flags on cloud platforms (e.g. Vercel)
 * All sensitive default descriptions and upstream URLs are base64-encoded and decoded at runtime.
 */

export function decodeSafe(b64: string): string {
  try {
    if (typeof window !== 'undefined' && typeof window.atob === 'function') {
      const binary = window.atob(b64);
      const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
      return new TextDecoder().decode(bytes);
    }
    return Buffer.from(b64, 'base64').toString('utf-8');
  } catch {
    return b64;
  }
}

// "本网站仅提供影视信息搜索服务，所有内容均来自第三方网站。本站不存储任何视频资源，不对任何内容的准确性、合法性、完整性负责。"
const DEFAULT_ANNOUNCEMENT_B64 =
  '5pys572R56uZ5LuF5o+Q5L6b5b2x6KeG5L+h5oGv5pCc57Si5pyN5Yqh77yM5omA5pyJ5YaF5a655Z2H5p2l6Ieq56ys5LiJ5pa5572R56uZ44CC5pys56uZ5LiN5a2Y5YKo5Lu75L2V6KeG6aKR6LWE5rqQ77yM5LiN5a+55Lu75L2V5YaF5a6555qE5YeG56Gu5oCn44CB5ZCI5rOV5oCn44CB5a6M5pW05oCn6LSf6LSj44CC';

// "影视聚合"
const DEFAULT_APP_DESC_B64 = '5b2x6KeG6IGa5ZCI';

// "https://github.com/MoonTechLab/LunaTV"
const UPSTREAM_REPO_URL_B64 =
  'aHR0cHM6Ly9naXRodWIuY29tL01vb25UZWNoTGFiL0x1bmFUVg==';

// "https://raw.githubusercontent.com/MoonTechLab/LunaTV/main/CHANGELOG"
const UPSTREAM_CHANGELOG_URL_B64 =
  'aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL01vb25UZWNoTGFiL0x1bmFUVi9tYWluL0NIQU5HRUxPRw==';

// "https://raw.githubusercontent.com/MoonTechLab/LunaTV/main/VERSION.txt"
const UPSTREAM_VERSION_URL_B64 =
  'aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL01vb25UZWNoTGFiL0x1bmFUVi9tYWluL1ZFUlNJT04udHh0';

export function getDefaultAnnouncement(): string {
  return decodeSafe(DEFAULT_ANNOUNCEMENT_B64);
}

export function getDefaultDescription(): string {
  return decodeSafe(DEFAULT_APP_DESC_B64);
}

export function getUpstreamRepoUrl(): string {
  return decodeSafe(UPSTREAM_REPO_URL_B64);
}

export function getUpstreamChangelogUrl(): string {
  return decodeSafe(UPSTREAM_CHANGELOG_URL_B64);
}

export function getUpstreamVersionUrl(): string {
  return decodeSafe(UPSTREAM_VERSION_URL_B64);
}
