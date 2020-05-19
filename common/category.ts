import { types } from "mobx-state-tree";
import { Icon } from "./icon";
import { CategoryType } from "./types/category";
import { IconType } from "./types/icon";

export const Category = types.model("Category", {
  id: types.identifier,
  name: types.string,
  description: types.optional(types.string, ""),
  isFixed: types.optional(types.boolean, false),
  type: types.optional(
    types.enumeration(Object.keys(CategoryType)),
    CategoryType.outcome
  ),
  icon: types.optional(Icon, {
    name: "piggy-bank",
    type: IconType.FontAwesome5,
  }),
  parent: types.maybe(types.reference(types.late(() => Category))),
  createdAt: types.optional(types.Date, new Date()),
  deletedAt: types.maybe(types.Date),
  updatedAt: types.maybe(types.Date),
  syncAt: types.maybe(types.Date),
});
