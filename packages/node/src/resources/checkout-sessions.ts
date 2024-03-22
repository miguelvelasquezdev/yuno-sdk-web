import { requestHandler } from "../internal/request-handler";
import {
  ApiKeys,
  CheckoutSessionInput,
  CheckoutSessionResponse,
} from "../types";

type CheckoutSessionConfig = {
  apiKeys: ApiKeys;
};

export function handleCheckoutSessionMethods(config: CheckoutSessionConfig) {
  return {
    create: createCheckoutSession(config.apiKeys),
  };
}

export function createCheckoutSession(apiKeys: ApiKeys) {
  return async function createCheckoutSessionInner(
    params: CheckoutSessionInput,
    options?: Partial<ApiKeys>
  ) {
    const body = { ...params, account_id: apiKeys.accountCode };

    return await requestHandler<CheckoutSessionResponse>({
      path: "/v1/checkout/sessions",
      method: "POST",
      apiKeys: { ...apiKeys, ...options },
      body,
    });
  };
}
