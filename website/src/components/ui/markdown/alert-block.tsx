import { ForwardRefExoticComponent, RefAttributes } from "react";
import {
  Icon,
  IconAlertHexagon,
  IconAlertTriangle,
  IconBulb,
  IconInfoCircle,
  IconMessage2Exclamation,
  IconProps,
  IconQuestionMark,
} from "@tabler/icons-react";

type AlertType = "note" | "tip" | "important" | "warning" | "caution";

export function AlertIcon({
  type,
}: {
  type: AlertType;
}): ForwardRefExoticComponent<IconProps & RefAttributes<Icon>> {
  if (type === "note") return IconInfoCircle;
  if (type === "tip") return IconBulb;
  if (type === "important") return IconMessage2Exclamation;
  if (type === "warning") return IconAlertTriangle;
  if (type === "caution") return IconAlertHexagon;
  return IconQuestionMark; // この行は型定義的には不要（到達しない）になる
}
