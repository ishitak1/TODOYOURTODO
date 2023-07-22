import { atom } from "recoil";

export const suggestionState = atom<string[] | []>({
  key: "suggestionState",
  default: [],
});
