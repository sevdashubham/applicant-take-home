import {useCallback, useState} from "react";
import {GiftCard} from "../../slices/checkout-slice";

export type PrizeOutPayload = {
    checkout_value_id: string,
    cost_in_cents: number,
    name: string,
    value_in_cents: number,
};

export type PrizeOutErrorPayload = {
    title: string,
    message: string,
    confirmText: string,
};

export type UsePrizeOutCheckoutProps = {
    onSuccess?: (result: any) => void,
    onError?: (error: PrizeOutErrorPayload) => void,
};

export type UsePrizeOutCheckoutReturn = {
    prizeOut: (payload: PrizeOutPayload) => Promise<void>,
    isPrizing: boolean,
};

const unknownErrorPayload: PrizeOutErrorPayload = {
    title: 'Oops!',
    message: 'Something went wrong',
    confirmText: 'Ok',
};

export function usePrizeOutCheckout(props: UsePrizeOutCheckoutProps): UsePrizeOutCheckoutReturn {
    const { onSuccess, onError } = props;
    const [isSubmitting, setSubmitting] = useState(false);

    const finishWithError = useCallback((error: PrizeOutErrorPayload) => {
        setSubmitting(false);
        onError?.(error);
    }, []);

    const finishWithSuccess = useCallback(async (payload) => {
        setSubmitting(false);
        onSuccess?.(payload);
    }, []);

    const checkout = async (body: GiftCard) => {
        try {
            return new Promise((res, rej) => {
                setTimeout(() => res(body), 2000)
            })
        } catch (err) {
            throw new Error("error.unknown");
        }
    };

    const handlePrizeOut = useCallback(
        async (payload: PrizeOutPayload) => {
            if (isSubmitting) {
                return;
            }
            try {
                setSubmitting(true);
                const body = {
                    checkout_value_id: payload.checkout_value_id,
                    name: payload.name.trim(),
                    cost_in_cents: payload.cost_in_cents,
                    value_in_cents: payload.value_in_cents,
                };
                const response = await checkout(body);
                if (response) {
                    await finishWithSuccess({success: true});
                } else {
                    finishWithError(unknownErrorPayload);
                }
            } catch (e) {
                finishWithError(e);
            }
        },
        [isSubmitting],
    );

    return {
        prizeOut: handlePrizeOut,
        isPrizing: isSubmitting,
    };
}
