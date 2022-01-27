import {useLocation, useTransition} from "remix";
import {Transition} from "@remix-run/react/transition";

export function actionTarget() {
  if (useLocation().pathname === "/") return "?index";
  return useLocation().pathname;
}