import { types } from "mobx-state-tree";
import { IconType } from "./types/icon";

export const Icon = types.model("Icon", {
  name: types.string,
  type: types.enumeration(Object.keys(IconType)),
  color: types.optional(types.string, "black"),
  backgroundColor: types.optional(types.string, "white"),
});
