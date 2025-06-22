export async function fetchDownloadUrl(inputUrl: string, apiUrl: string) {
  const cleanUrl = inputUrl.trim();
  const response = await fetch(`${apiUrl}/api/tiktok`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url: cleanUrl }),
  });

  const data = await response.json();
  if (data.success && data.token && data.id) {
    return {
      url: `https://tikmate.app/download/${data.token}/${data.id}.mp4?hd=1`,
      cover: data?.cover,
    };
  } else {
    throw new Error("Erro ao obter o vídeo. Verifique a URL.");
  }
}
