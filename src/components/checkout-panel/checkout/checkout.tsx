import React, {useCallback, useEffect} from 'react';
import checkoutPanelViewWrapper from '../view-wrapper';

import CheckoutButton from './checkout-button';

import './checkout.less';
import {useAppSelector} from "../../../hooks";
import {PrizeoutOfferValueOptions, selectedOfferGiftCards} from "../../../slices/offers-slice";
import {selectedGC, selectGiftCard, clearGiftCard} from "../../../slices/checkout-slice";

import {CheckoutItems} from "./checkout-items";
import {useDispatch} from "react-redux";
import {OfferGiftCard} from "../../../modules/widget/components/offers/offer-gift-card/offer-gift-card";

const CheckoutPanelView: React.FC = (): React.ReactElement => {

    const giftCards = useAppSelector(selectedOfferGiftCards);
    const selectedGiftCard = useAppSelector(selectedGC);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(clearGiftCard());
    }, [giftCards])

    const giftCardClickHandler = useCallback((giftCard: PrizeoutOfferValueOptions) => {
        dispatch(selectGiftCard({...giftCard, name: giftCards.name}))
    }, [giftCards]);

    const checkoutListFactory = () => {
        return giftCards.giftcard_list.map((giftCard: PrizeoutOfferValueOptions) => (
            <CheckoutItems giftCard={giftCard} isSelected={selectedGiftCard.checkout_value_id === giftCard.checkout_value_id} onClickHandler={giftCardClickHandler}/>
        ));
    };

    const renderGiftCard = () => {
        if (giftCards.name === '') {
            return <h3>{'Select Offer to proceed'}</h3>;
        }
        return <OfferGiftCard
            offer={giftCards}
            isSelected={false}
        />
    }

    return (
        <section className="checkout">
            <div className="grid grid--top-bottom grid--stretch-top">
                <div className="grid__item no-scrollbars">
                    <section className="checkout__brand">
                        {renderGiftCard()}
                    </section>
                </div>
                <div className="grid__item checkout-item-list">
                    {checkoutListFactory()}
                </div>
                <div className="grid__item">
                    <section className="checkout__calculation">
                        <CheckoutButton isValid={selectedGiftCard.checkout_value_id !== ''}/>
                    </section>
                </div>
            </div>
        </section>
    );
};

export default checkoutPanelViewWrapper(CheckoutPanelView, 'checkout');
