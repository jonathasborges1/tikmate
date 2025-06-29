import { handleError } from "./error";

// utils/clipboard.ts
export async function readClipboardText(): Promise<string> {
  const { clipboard } = navigator;
  const messageErr = "A API de área de transferência não está disponível.";

  if (!clipboard || typeof clipboard.readText !== "function") {
    throw new Error(messageErr);
  }

  try {
    const text = await clipboard.readText();
    if (!text.trim()) throw new Error("🔒 Clipboard vazio ou acesso negado.");
    return text.trim();
  } catch (error) {
    handleError(error, "Falha ao copiar URL");
  }
}
