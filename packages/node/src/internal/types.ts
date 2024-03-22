import { ApiKeys } from "../types";

export type ApiKeyPrefixToEnvironmentSuffix = {
    dev: "-dev";
    staging: "-staging";
    sandbox: "-sandbox";
    prod: "";
};
export type ApiKeyPrefix = keyof ApiKeyPrefixToEnvironmentSuffix;
export type EnvironmentSuffix = ApiKeyPrefixToEnvironmentSuffix[ApiKeyPrefix];
export type FetchMethods = "POST" | "GET";
export type RequestOptions = {
    method: FetchMethods;
    path?: string;
    apiKeys: ApiKeys;
    body?: unknown;
};