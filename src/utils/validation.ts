export const isValidTikTokUrl = (url: string) => {
  const trimmed = url.trim();

  // Verificação manual de formato antes de tentar criar um objeto URL
  const isLikelyTiktokUrl = /^https:\/\/vm\.tiktok\.com\/[A-Za-z0-9]+\/?$/.test(
    trimmed
  );

  if (!isLikelyTiktokUrl) return false;

  try {
    const parsed = new URL(trimmed);
    return (
      parsed.hostname === "vm.tiktok.com" &&
      /^\/[A-Za-z0-9]+\/?$/.test(parsed.pathname)
    );
  } catch {
    return false;
  }
};
