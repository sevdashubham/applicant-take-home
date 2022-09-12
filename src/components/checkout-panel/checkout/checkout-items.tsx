import React from 'react';
import Classnames from 'classnames';
import { PrizeoutOfferValueOptions } from '../../../slices/offers-slice';

import './checkout-items.less';
import {cents_to_dollar} from "../../../utils/functions";

interface CheckoutItemsProps {
    giftCard: PrizeoutOfferValueOptions;
    onClickHandler: (giftCard: PrizeoutOfferValueOptions) => void;
    isSelected: boolean;
}

export const CheckoutItems: React.FC<CheckoutItemsProps> = ({ giftCard, onClickHandler, isSelected }): React.ReactElement => {

    const classes: string = Classnames('checkout-item', {
        'selected-offer-gift-card': isSelected,
        'unselected-offer-gift-card': !isSelected,
    });

    return (
        <div className={classes} onClick={() => onClickHandler(giftCard)}>
            <h4>{cents_to_dollar(giftCard.value_in_cents)}</h4>
            <h3>{cents_to_dollar(giftCard.cost_in_cents)}</h3>
        </div>
    );
};
