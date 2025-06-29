import Button from "../../components/Button";
import VideoPreview from "../../components/VideoPreview ";

import { useTikTokForm } from "./store/hook/useTikTokForm";
import TiktokInputText from "./TiktokInputText";

const TiktokForm: React.FC = () => {
  const {
    state,
    actions: {
      handleInputURL,
      handleSubmit,
      handlePasteFromClipboard,
      handleTryPaste,
      handleCleanField,
      handleDownloadTiktokVideo,
    },
  } = useTikTokForm();

  const { error, tikData, loading, inputUrl, pastedSuccess } = state;

  return (
    <section className="bg-white/5 border border-purple-400/30 backdrop-blur-xl rounded-[2rem] shadow-[0_0_60px_rgba(168,85,247,0.2)] p-6 md:p-10 w-full max-w-md text-center space-y-6 transition">
      <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 text-transparent bg-clip-text">
        TikTok
        <br />
        Downloader
      </h1>

      <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
        {/* Campo de entrada com ícone */}
        <div className="relative">
          <span className="absolute inset-y-0 left-3 flex items-center text-purple-300 text-lg">
            🔗
          </span>

          <TiktokInputText
            value={inputUrl}
            error={error}
            onClick={() => handleTryPaste()}
            onChange={(str) => handleInputURL(str)}
          />
        </div>

        {/* Mensagem de sucesso */}
        {pastedSuccess && (
          <span className="text-green-400 text-xs block -mt-2">
            ✔️ URL colada com sucesso!
          </span>
        )}

        {/* Botão colar */}
        <Button
          onClick={handlePasteFromClipboard}
          ovclassName="w-full py-3 px-4 rounded-xl bg-white/10 border border-white/10 text-white hover:bg-white/20 transition font-medium flex items-center justify-center gap-2 backdrop-blur-sm"
        >
          📋 Colar da área de transferência
        </Button>

        {/* Botão apagar */}
        <Button
          onClick={handleCleanField}
          ovclassName="w-full py-3 px-4 rounded-xl bg-white/10 border border-white/10 text-white hover:bg-white/20 transition font-medium flex items-center justify-center gap-2 backdrop-blur-sm"
        >
          Limpar conteudo
        </Button>

        {/* Botão de envio */}
        <Button type="submit" load={loading} disabled={!!tikData?.id}>
          🚀 Obter vídeo
        </Button>
      </form>

      {/* Mensagem de erro */}
      {error && (
        <p
          role="alert"
          className="text-red-500 font-medium text-sm italic mt-2 whitespace-pre-line"
        >
          {error}
        </p>
      )}

      {/* Link de download */}
      {tikData && (
        <VideoPreview
          videoUrl={tikData.url}
          coverUrl={tikData.cover}
          loading={loading}
          onDownload={handleDownloadTiktokVideo}
        />
      )}
    </section>
  );
};

export default TiktokForm;
