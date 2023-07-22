import { atom } from "recoil";

export const todoInputState = atom<string>({
  key: "todoInputState",
  default: "",
});
