import { useReducer } from "react";

import { useIsIphone } from "../../../../hooks/useIsIphone";
import { ErrorMessages } from "../../../../constants/messages";
import { isValidTikTokUrl } from "../../../../utils/validation";
import { initialState, tiktokReducer } from "../types/tiktokReducer";
import { TikTokActions } from "../types/tiktokActions";

import { downloadBlobAsFile } from "../../../../utils/download";
import { readClipboardText } from "../../../../utils/clipboard";
import {
  fetchTikTokDownloadInfo,
  fetchTikTokVideoBlob,
} from "../../../../api/tiktokApi";

export function useTikTokForm() {
  const [state, dispatch] = useReducer(tiktokReducer, initialState);

  const isIphone = useIsIphone();

  const {
    emptyUrl,
    invalidUrl,
    iOSPasteError,
    clipboardError,
    clipboardWarnIos,
  } = ErrorMessages;

  const setInput = (value: string) => {
    dispatch({ type: TikTokActions.SET_INPUT, payload: value });
    dispatch({ type: TikTokActions.SET_ERROR, payload: "" });
    dispatch({ type: TikTokActions.SET_SUCCESS, payload: false });
  };

  const setError = (message: string) => {
    dispatch({ type: TikTokActions.SET_ERROR, payload: message });
  };

  const setLoading = (status: boolean) => {
    dispatch({ type: TikTokActions.SET_LOADING, payload: status });
  };

  const setTikData = (data: typeof initialState.tikData) => {
    dispatch({ type: TikTokActions.SET_TIKDATA, payload: data });
  };

  const setSuccess = (status: boolean) => {
    dispatch({ type: TikTokActions.SET_SUCCESS, payload: status });
  };

  const handleInputURL = (str: string) => {
    dispatch({ type: "SET_INPUT", payload: str });
  };

  const handleCleanField = () => {
    dispatch({ type: "RESET" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setSuccess(false);

    if (!state.inputUrl.trim()) return setError(emptyUrl);
    if (!isValidTikTokUrl(state.inputUrl)) return setError(invalidUrl);

    setLoading(true);

    try {
      const data = await fetchTikTokDownloadInfo(state.inputUrl);
      setTikData(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro inesperado.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadTiktokVideo = async () => {
    if (!state.tikData?.url || !state.tikData?.id) return;

    setLoading(true);
    const videoBlob = await fetchTikTokVideoBlob(state.tikData.url);
    downloadBlobAsFile(videoBlob, `${state.tikData.id}-tiktok-video.mp4`);
    setLoading(false);
  };

  const handlePasteFromClipboard = async () => {
    try {
      const text = await readClipboardText();

      if (text === state.inputUrl) return;

      setInput(text);
      setSuccess(true);
    } catch {
      setError(isIphone ? iOSPasteError : clipboardError);
    }
  };

  const handleTryPaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text.includes("tiktok.com")) {
        setInput(text);
        setSuccess(true);
      }
    } catch {
      return isIphone && setError(clipboardWarnIos);
    }
  };

  return {
    state,
    actions: {
      handleInputURL,
      handleSubmit,
      handlePasteFromClipboard,
      handleTryPaste,
      handleCleanField,
      handleDownloadTiktokVideo,
    },
  };
}
