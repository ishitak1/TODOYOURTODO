import { atom } from "recoil";
import { Todo } from "../types/Todo";

export const todoState = atom<Todo[] | []>({
  key: "todoState",
  default: [],
});
