import React from 'react';
import Classnames from 'classnames';
import { GiftCard, BonusTag } from '../../../../../components/common/';
import { PrizeoutOffer, PrizeoutOfferSelectedGC } from '../../../../../slices/offers-slice';

import './offer-gift-card.less';

interface OfferGiftCardProps {
    offer: PrizeoutOffer | PrizeoutOfferSelectedGC;
    onClickHandler?: () => void;
    isSelected: boolean;
}

export const OfferGiftCard: React.FC<OfferGiftCardProps> = ({
    offer,
    onClickHandler,
    isSelected,
}): React.ReactElement => {
    const firstGiftCard = offer.giftcard_list[0];
    const offerType = firstGiftCard.display_monetary_bonus ? 'monetary' : 'percentage';
    const offerValue = firstGiftCard.display_bonus;
    const classes: string = Classnames('offer-gift-card', {
        'selected-offer-gift-card': isSelected,
        'unselected-offer-gift-card': !isSelected,
    });

    return (
        <div className={classes} onClick={() => onClickHandler()}>
            <GiftCard name={offer.name} imgUrl={offer.image_url} altText={offer.name} className="offer" />
            {offerValue > 0 && <BonusTag type={offerType} value={offerValue} size="small" />}
        </div>
    );
};
