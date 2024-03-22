import { ApiKeys } from "../types";
import { ApiKeyPrefix, ApiKeyPrefixToEnvironmentSuffix, EnvironmentSuffix, RequestOptions } from "./types";

export async function requestHandler<TReturn>(
  opts: RequestOptions,
): Promise<TReturn> {
  const { method, path, apiKeys, body } = opts;

  const methodHasPayload = method === "POST" && body;

  return await fetch(
    `${generateBaseUrlApi(apiKeys.publicApiKey)}${path ?? ""}`,
    {
      method,
      headers: setHeaders({ apiKeys }),
      body: methodHasPayload ? JSON.stringify(body) : undefined,
    },
  ).then((res) => res.json());
}

type HeadersOps = {
  apiKeys: ApiKeys;
};

function setHeaders(opts: HeadersOps) {
  const { publicApiKey, privateSecretKey } = opts.apiKeys;

  const defaultHeaders = {
    "public-api-key": publicApiKey,
    "private-secret-key": privateSecretKey,
    "Content-Type": "application/json",
  } as {
    ['public-api-key']: string;
    ["private-secret-key"]: string;
    ["Content-Type"]: string;
    ["X-Idempotency-Key"]?: string
  };

  if (opts.apiKeys.idempotencyKey) {
    defaultHeaders["X-Idempotency-Key"] = opts.apiKeys.idempotencyKey;
  }

  return defaultHeaders;
}

const apiKeyPrefixToEnvironmentSuffix = {
  dev: "-dev",
  staging: "-staging",
  sandbox: "-sandbox",
  prod: "",
} as ApiKeyPrefixToEnvironmentSuffix;

function generateBaseUrlApi(publicApiKey: string) {
  const [apiKeyPrefix] = publicApiKey.split("_");
  const environmentSuffix = apiKeyPrefixToEnvironmentSuffix[
    apiKeyPrefix as ApiKeyPrefix
  ] as EnvironmentSuffix;
  const baseURL = `https://api${environmentSuffix}.y.uno`;

  return baseURL;
}
