import { appConfig } from "../config/appconfig";
import { handleError } from "../utils/error";

export interface TikTokDownloadInfo {
  url: string;
  cover?: string;
  id?: string;
}

/**
 * Envia uma URL do TikTok para a API e retorna dados para o download (via TikMate).
 */
export async function fetchTikTokDownloadInfo(
  inputUrl: string
): Promise<TikTokDownloadInfo> {
  try {
    const cleanUrl = inputUrl.trim();

    const response = await fetch(`${appConfig.API.URL}/api/tiktok`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: cleanUrl }),
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (data.success && data.token && data.id) {
      return {
        ...data,
        url: `https://tikmate.app/download/${data.token}/${data.id}.mp4`,
      };
    }

    const message = data.message || "Erro ao obter os dados do vídeo.";
    throw new Error(message);
  } catch (error) {
    handleError(error, "Falha ao buscar informações do vídeo");
  }
}

/**
 * Requisita o blob de vídeo via proxy da própria API local.
 */
export async function fetchTikTokVideoBlob(videoUrl?: string): Promise<Blob> {
  try {
    if (!videoUrl) throw new Error("videoUrl invalida:");
    const proxyUrl = `${appConfig.API.URL}/api/proxy?url=${encodeURIComponent(
      videoUrl
    )}`;
    const response = await fetch(proxyUrl);

    if (!response.ok) {
      throw new Error(
        `Erro HTTP no proxy: ${response.status} ${response.statusText}`
      );
    }

    return await response.blob();
  } catch (error) {
    handleError(error, "Falha ao baixar o vídeo via proxy");
  }
}
