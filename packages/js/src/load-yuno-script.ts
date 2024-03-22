import {
  findYunoScript,
  getYunoNamespace,
  insertYunoScriptElement,
  isServer,
} from "./internal/utils";

export async function loadYunoScript() {
  if (isServer)
    throw new Error(
      `You're trying to use @yuno-sdk-web/js in a server environment. This is not supported by default.`,
    );

  const yunoFound = getYunoInstance();
  if (yunoFound) return yunoFound;

  const yuno = await insertYunoScriptElement();

  if (!yuno) {
    throw Error("Failed to download Yuno script.")
  }

  return yuno
}

function getYunoInstance() {
  const scriptFound = findYunoScript();
  const yunoNamespace = getYunoNamespace();

  if (scriptFound && yunoNamespace) {
    return yunoNamespace;
  }
}
