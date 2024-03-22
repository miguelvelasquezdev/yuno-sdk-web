import { WindowInstance } from "../types/window";
import { Yuno, YunoInstance } from "../types/yuno";
import { CDN_URL, YUNO_NAMESPACE } from "./constants";

export const isServer = typeof window === "undefined";
const windowInstance = window as WindowInstance;

export function insertYunoScriptElement() {
  const scriptEl = createYunoScriptElement(CDN_URL);
    
  document.head.insertBefore(scriptEl, document.head.firstElementChild);

  return new Promise<Yuno | undefined>((resolve, reject) => {
    scriptEl.onerror = () => reject(`The script "${CDN_URL}" failed to load. Check the HTTP status code and response body in DevTools to learn more.`)
    scriptEl.onload = () => resolve(getYunoNamespace())
  })
}

function createYunoScriptElement(url: string) {
  const scriptEl = document.createElement("script");
  scriptEl.src = url;

  return scriptEl;
}

export function findYunoScript() {
  const scriptEl = document.querySelector(`script[src="${CDN_URL}"]`);
  return scriptEl;
}

export function getYunoNamespace() {
  return windowInstance[`${YUNO_NAMESPACE}`];
}
