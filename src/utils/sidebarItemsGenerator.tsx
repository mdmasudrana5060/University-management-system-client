import { NavLink } from "react-router-dom";
import { TUserPath } from "../types";

export const sidebarItemsGenerator = (items: TUserPath[],role:string) => {
  const sidebarItems= items.map((item) => {
    if (item.children) {
      return {
        key: item.name,
        label: item.name,
        children: item.children.map((child) => ({
          key: child.name,
          label: <NavLink to={`/${role}/${child.path}`}>{child.name}</NavLink>,
        })),
      };
    } else {
      return {
        key: item.name,
        label: <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>,
        children: [],
      };
    }
  });
  return sidebarItems
};
