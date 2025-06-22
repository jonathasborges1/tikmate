import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { appConfig } from "./config/appconfig";
import { fetchDownloadUrl } from "./api/fetchDownloadUrl";
import "./index.css";
import { useIsIphone } from "./hooks/useIsIphone";
import Footer from "./components/Footer";

function App() {
  const isIphone = useIsIphone();

  const [inputUrl, setInputUrl] = useState("");

  const [downloadUrl, setDownloadUrl] = useState("");
  const [cover, setCover] = useState("");

  const [loading, setLoading] = useState(false);
  const [pastedSuccess, setPastedSuccess] = useState(false);

  const [error, setError] = useState("");

  const isValidTikTokUrl = (url: string) => {
    const trimmed = url.trim();

    // Verificação manual de formato antes de tentar criar um objeto URL
    const isLikelyTiktokUrl =
      /^https:\/\/vm\.tiktok\.com\/[A-Za-z0-9]+\/?$/.test(trimmed);

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

  const handleSubmit = async () => {
    setDownloadUrl("");
    setError("");
    setPastedSuccess(false);

    if (!inputUrl.trim()) {
      setError("Por favor, insira a URL do vídeo do TikTok.");
      return;
    }

    if (!isValidTikTokUrl(inputUrl)) {
      return setError(
        "🔗 A URL inserida não parece ser válida. Certifique-se de colar um link curto como:\nhttps://vm.tiktok.com/abc123/"
      );
    }

    setLoading(true);

    try {
      const data = await fetchDownloadUrl(inputUrl, appConfig.API.URL);
      setDownloadUrl(data?.url);
      setCover(data?.cover);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro inesperado.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasteFromClipboard = async () => {
    try {
      if (
        !navigator.clipboard ||
        typeof navigator.clipboard.readText !== "function"
      ) {
        throw new Error(
          "A API de área de transferência não está disponível neste navegador."
        );
      }

      const text = await navigator.clipboard.readText();

      if (typeof text !== "string" || text.trim() === "") {
        console.warn("🔒 Clipboard vazio ou acesso negado:", text);
        throw new Error("Não foi possível acessar o conteúdo copiado.");
      }

      const sanitized = text.trim();

      if (sanitized === inputUrl) return;

      setInputUrl(sanitized);
      setPastedSuccess(true);
      setError("");
    } catch (err) {
      console.error(err);
      if (isIphone) {
        setError(
          "❌ O Safari no iPhone não permite colar automaticamente. Mantenha pressionado o campo acima e cole manualmente."
        );
      } else {
        setError(
          "Erro ao acessar a área de transferência ou conteúdo inválido."
        );
      }
    }
  };

  const handleTryPaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text && text.includes("tiktok.com")) {
        setInputUrl(text);
        setPastedSuccess(true);
        setError("");
      }
    } catch {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      isIphone &&
        setError(
          "⚠️ No iPhone, pressione e segure o campo acima e escolha 'Colar'."
        );
    }
  };

  const renderMainContent = () => {
    return (
      <section className="bg-white/5 border border-purple-400/30 backdrop-blur-xl rounded-[2rem] shadow-[0_0_60px_rgba(168,85,247,0.2)] p-6 md:p-10 w-full max-w-md text-center space-y-6 transition">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 text-transparent bg-clip-text">
          TikTok
          <br />
          Downloader
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="space-y-4"
        >
          {/* Campo de entrada com ícone */}
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-purple-300 text-lg">
              🔗
            </span>
            <input
              type="text"
              value={inputUrl}
              onClick={handleTryPaste}
              onChange={(e) => {
                setInputUrl(e.target.value);
                setError("");
                setPastedSuccess(false);
              }}
              placeholder="Cole a URL do TikTok (ex. vm.tiktok.com/ZMSu)"
              className={`w-full pl-10 pr-4 py-3 rounded-xl bg-[#1b1533]/60 border ${
                error ? "border-red-500" : "border-purple-700/30"
              } text-white placeholder-purple-300 text-sm md:text-base focus:outline-none focus:ring-2 ${
                error ? "ring-red-500" : "ring-purple-500/40"
              } drop-shadow-lg`}
            />
          </div>

          {/* Mensagem de sucesso */}
          {pastedSuccess && (
            <span className="text-green-400 text-xs block -mt-2">
              ✔️ URL colada com sucesso!
            </span>
          )}

          {/* Botão colar */}
          <button
            type="button"
            onClick={handlePasteFromClipboard}
            className="w-full py-3 px-4 rounded-xl bg-white/10 border border-white/10 text-white hover:bg-white/20 transition font-medium flex items-center justify-center gap-2 backdrop-blur-sm"
          >
            📋 Colar da área de transferência
          </button>

          {/* Botão apagar */}
          <button
            type="button"
            onClick={() => {
              setInputUrl("");
            }}
            className="w-full py-3 px-4 rounded-xl bg-white/10 border border-white/10 text-white hover:bg-white/20 transition font-medium flex items-center justify-center gap-2 backdrop-blur-sm"
          >
            Limpar conteudo
          </button>

          {/* Botão de envio */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-6 rounded-xl font-semibold text-base transition-all duration-200 transform hover:scale-[1.02] 
              border border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.3)]
              ${
                loading
                  ? "bg-purple-600/30 text-white cursor-not-allowed"
                  : "bg-gradient-to-r from-[#8927ec] via-[#3c38d1] to-[#1a68e8] text-white"
              }`}
          >
            {loading ? <ClipLoader size={20} color="#fff" /> : "🚀 Obter vídeo"}
          </button>
        </form>

        {/* Mensagem de erro */}
        {error && (
          <p className="text-red-500 font-medium text-sm italic mt-2">
            {error}
          </p>
        )}

        {/* Link de download */}
        {downloadUrl && (
          <div className="mt-4 animate-fade-in">
            <p className="text-green-400 font-semibold text-sm md:text-base mb-2">
              Vídeo pronto:
            </p>
            <a
              href={downloadUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 rounded-lg bg-purple-700/40 text-white font-medium hover:underline"
            >
              Clique aqui para baixar
            </a>
            <video
              controls
              playsInline
              preload="metadata"
              className="mt-4 mx-auto rounded-xl max-w-full shadow-lg"
              poster={cover}
            >
              <source src={downloadUrl} type="video/mp4" />
              Seu navegador não suporta o vídeo.
            </video>

            <p className="text-xs text-purple-300 mt-2 italic">
              🎥 Toque no vídeo acima e use o botão de compartilhamento do
              Safari para salvar no app Fotos.
            </p>
          </div>
        )}
      </section>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#0f051d] via-[#120e29] to-[#1a1039] text-white px-4 py-8">
      <main className="flex-1 flex items-center justify-center">
        {renderMainContent()}
      </main>
      <section className={"mx-auto"}>
        <span className="text-[9px]">
          O conteudo deste app consome api oficial da tikmate.app
        </span>
      </section>
      <Footer />
    </div>
  );
}

export default App;
