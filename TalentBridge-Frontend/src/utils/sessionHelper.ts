import type { SessionMetaRequest } from "@/types/user.types";
import { UAParser } from "ua-parser-js";

export function getSessionMeta(): SessionMetaRequest {
  const parser = new UAParser();
  const result = parser.getResult();

  let deviceName = "";
  if (result.device.vendor && result.device.model)
    deviceName = `${result.device.vendor} ${result.device.model}`;
  else
    deviceName = `${result.browser.name || "Browser"} on ${result.os.name || "Unknown OS"}`;

  const deviceType = result.device.type || "desktop";

  const userAgent = navigator.userAgent;

  return {
    deviceName,
    deviceType,
    userAgent,
  };
}
