// useTikTokForm.ts
import { useState } from "react";

import {
  fetchTikTokDownloadInfo,
  fetchTikTokVideoBlob,
  type TikTokDownloadInfo,
} from "../api/tiktokApi";

import { downloadBlobAsFile } from "../utils/download";
import { readClipboardText } from "../utils/clipboard";
import { isValidTikTokUrl } from "../utils/validation";

import { useIsIphone } from "./useIsIphone";
import { ErrorMessages } from "../constants/messages";

export function useTikTokForm() {
  const {
    emptyUrl,
    invalidUrl,
    iOSPasteError,
    clipboardError,
    clipboardWarnIos,
  } = ErrorMessages;

  const isIphone = useIsIphone();

  const [inputUrl, setInputUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [pastedSuccess, setPastedSuccess] = useState(false);
  const [tikData, setTikData] = useState<TikTokDownloadInfo | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setPastedSuccess(false);
    if (!inputUrl.trim()) {
      return setError(emptyUrl);
    }

    if (!isValidTikTokUrl(inputUrl)) {
      return setError(invalidUrl);
    }

    setLoading(true);

    try {
      const data = await fetchTikTokDownloadInfo(inputUrl);
      setTikData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro inesperado.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadTiktokVideo = async () => {
    if (!tikData?.url || !tikData?.id) return;

    setLoading(true);
    const videoBlob = await fetchTikTokVideoBlob(tikData?.url);
    downloadBlobAsFile(videoBlob, `${tikData?.id}-tiktok-video.mp4`);
    setLoading(false);
  };

  const handlePasteFromClipboard = async () => {
    try {
      const sanitized = await readClipboardText();

      if (sanitized === inputUrl) return;

      setInputUrl(sanitized);
      setPastedSuccess(true);
      setError("");
    } catch (err) {
      console.error(err);

      if (isIphone) {
        setError(iOSPasteError);
      } else {
        setError(clipboardError);
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
      return isIphone && setError(clipboardWarnIos);
    }
  };

  const handleCleanField = () => {
    setInputUrl("");
    setPastedSuccess(false);
    setTikData(null);
  };

  const handleInputURL = (str: string) => {
    setInputUrl(str);
    setError("");
    setPastedSuccess(false);
  };

  return {
    state: {
      error,
      tikData,
      loading,
      inputUrl,
      pastedSuccess,
    },
    actions: {
      handleTryPaste,
      handleInputURL,
      handlePasteFromClipboard,
      handleCleanField,
      handleSubmit,
      handleDownloadTiktokVideo,
    },
  };
}
