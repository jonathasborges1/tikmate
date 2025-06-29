import type { TikTokDownloadInfo } from "../../../../api/tiktokApi";
import type { TikTokActions } from "./tiktokActions";

export type TikTokInfo = TikTokDownloadInfo;

export interface TikTokState {
  inputUrl: string;
  loading: boolean;
  error: string;
  pastedSuccess: boolean;
  tikData: TikTokInfo | null;
}

export type TikTokAction =
  | { type: typeof TikTokActions.SET_INPUT; payload: string }
  | { type: typeof TikTokActions.SET_LOADING; payload: boolean }
  | { type: typeof TikTokActions.SET_ERROR; payload: string }
  | { type: typeof TikTokActions.SET_SUCCESS; payload: boolean }
  | {
      type: typeof TikTokActions.SET_TIKDATA;
      payload: TikTokInfo | null;
    }
  | { type: typeof TikTokActions.RESET };
