import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface CheckoutSlice {
    isSide: boolean;
    loading: boolean;
    view: ViewEnum;
    selectedGiftCard: GiftCard;
}

export type GiftCard = {
    checkout_value_id: string;
    name: string;
    value_in_cents: number;
    cost_in_cents: number;
};

const DEFAULT_SELECTED_GIFT_CARD = {
    checkout_value_id: '',
    cost_in_cents: 0,
    name: '',
    value_in_cents: 0,
};

export type ViewEnum = 'checkout' | 'checkout-confirmation';

export const checkoutInitialState: CheckoutSlice = {
    isSide: true,
    loading: false,
    selectedGiftCard: DEFAULT_SELECTED_GIFT_CARD,
    view: 'checkout',
};

export const checkoutSlice = createSlice({
    initialState: checkoutInitialState,
    name: 'checkout',
    reducers: {
        clearGiftCard(state) {
            state.selectedGiftCard = DEFAULT_SELECTED_GIFT_CARD;
        },
        prizeOutGiftCard(state) {
            state.view = 'checkout-confirmation';
        },
        selectGiftCard(state, action: PayloadAction<GiftCard>) {
            state.selectedGiftCard = action.payload;
        },
        setCheckoutView(state, action: PayloadAction<ViewEnum>) {
            state.view = action.payload;
        },
        toggleIsLoading(state) {
            state.loading = !state.loading;
        },
        toggleIsSide(state) {
            // TODO: Check screen size to determine if it's side or bottom
            state.isSide = !state.isSide;
        },
    },
});

export const { setCheckoutView, toggleIsLoading, toggleIsSide, selectGiftCard, clearGiftCard, prizeOutGiftCard } =
    checkoutSlice.actions;

export const selectLoading = ({ checkout: { loading } }: RootState): boolean => loading;

export const selectCheckoutView = ({ checkout: { view } }: RootState): ViewEnum => view;

export const selectedGC = ({ checkout: { selectedGiftCard } }: RootState): GiftCard => selectedGiftCard;

export const selectCheckoutIsSide = ({ checkout }: RootState): boolean => {
    return checkout.isSide;
};

export default checkoutSlice.reducer;
