import { requestHandler } from "../internal";
import { ApiKeys, PaymentInput, PaymentResponse } from "../types";

type PaymentConfig = {
    apiKeys: ApiKeys;
};

type Options = Partial<ApiKeys>

export function handlePaymentMethods(config: PaymentConfig) {
    return {
        create: createPayment(config.apiKeys)
    }
}

export function createPayment(apiKeys: ApiKeys) {
    return async function createPaymentInner(
        params: PaymentInput,
        options?: Partial<ApiKeys> & { idempotencyKey: string; }
    ) {
        return await requestHandler<PaymentResponse>({
            path: '/v1/payments',
            method: 'POST',
            apiKeys: { ...apiKeys, ...options },
            body: params,
        })
    }
}