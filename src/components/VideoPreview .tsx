import React from "react";
import Button from "./Button";

interface VideoPreviewProps {
  videoUrl?: string;
  coverUrl?: string;
  loading?: boolean;
  onDownload: () => void;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({
  videoUrl,
  coverUrl = "",
  loading = false,
  onDownload,
}) => {
  // if (!videoUrl) return null;
  const isValidUrl = Boolean(
    videoUrl?.startsWith("http") || videoUrl?.startsWith("https")
  );

  if (!isValidUrl) {
    return (
      <div className="mt-4 text-center animate-fade-in text-red-400 text-sm md:text-base bg-white/10 border border-red-400/30 rounded-xl p-4">
        ❌ Não foi possível exibir seu vídeo.
        <br />
        Algo deu errado com a URL fornecida.
      </div>
    );
  }

  return (
    <div className="mt-4 animate-fade-in text-center">
      <p className="text-green-400 font-semibold text-sm md:text-base mb-2">
        Vídeo pronto:
      </p>

      <Button
        load={loading}
        onClick={onDownload}
        ovclassName="inline-block px-4 py-2 rounded-lg bg-purple-700/40 text-white font-medium hover:underline border-2 border-white-700"
      >
        ⬇️ Clique aqui para baixar
      </Button>

      <video
        controls
        playsInline
        preload="metadata"
        className="mt-4 mx-auto rounded-xl max-w-full shadow-lg"
        poster={coverUrl}
      >
        <source src={videoUrl} type="video/mp4" />
        Seu navegador não suporta o vídeo.
      </video>

      <p className="text-xs text-purple-300 mt-2 italic">
        🎥 Toque no vídeo acima e use o botão de compartilhamento do Safari para
        salvar no app Fotos.
      </p>
    </div>
  );
};

export default VideoPreview;
