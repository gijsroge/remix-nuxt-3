import { useLocation } from "remix";

export function actionTarget() {
  if (useLocation().pathname === "/") return "?index";
  return useLocation().pathname;
}
