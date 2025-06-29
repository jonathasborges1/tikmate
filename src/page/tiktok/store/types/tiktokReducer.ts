import { TikTokActions } from "./tiktokActions";
import type { TikTokAction, TikTokState } from "./tiktokTypes";

export const initialState: TikTokState = {
  inputUrl: "",
  loading: false,
  error: "",
  pastedSuccess: false,
  tikData: null,
};

export function tiktokReducer(
  state: TikTokState,
  action: TikTokAction
): TikTokState {
  switch (action.type) {
    case TikTokActions.SET_INPUT:
      return {
        ...state,
        inputUrl: action.payload,
        error: "",
        pastedSuccess: false,
      };
    case TikTokActions.SET_LOADING:
      return { ...state, loading: action.payload };
    case TikTokActions.SET_ERROR:
      return { ...state, error: action.payload };
    case TikTokActions.SET_SUCCESS:
      return { ...state, pastedSuccess: action.payload };
    case TikTokActions.SET_TIKDATA:
      return { ...state, tikData: action.payload };
    case TikTokActions.RESET:
      return initialState;
    default:
      return state;
  }
}
