import React, { memo, useCallback } from 'react';
import Classnames from 'classnames';
import {
    PrizeoutOffer,
    PrizeoutOfferSettings,
    selectedOfferPosition,
    updateSelectedOfferPosition,
} from '../../../../../slices/offers-slice';
import { OfferGiftCard } from '../offer-gift-card/offer-gift-card';

import './vertical-offers.less';
import { useAppSelector } from '../../../../../hooks';
import { useDispatch } from 'react-redux';

interface OfferView {
    offers: PrizeoutOffer[];
    viewSettings?: PrizeoutOfferSettings;
    parentIndex: number;
}

const VerticalOffers: React.FC<OfferView> = ({ offers, viewSettings, parentIndex }): React.ReactElement => {
    const heading = viewSettings.title || 'Recommended';
    const subtitle = viewSettings.subtitle || null;
    const classes: string = Classnames('vertical-offers', { '--has-subtitle': subtitle });
    const selectedOfferPos = useAppSelector(selectedOfferPosition);
    const dispatch = useDispatch();

    const offerClickHandler = useCallback((childIndex: number) => {
        dispatch(
            updateSelectedOfferPosition({
                childIndex,
                parentIndex,
            }),
        );
    }, []);

    const returnOffers = () => {
        return offers.map((offer, index) => (
            <OfferGiftCard
                key={`${heading}-${offer.name}`}
                offer={offer}
                isSelected={parentIndex === selectedOfferPos.parentIndex && index === selectedOfferPos.childIndex}
                onClickHandler={() => offerClickHandler(index)}
            />
        ));
    };

    return (
        <div className={classes}>
            <h2>{heading}</h2>
            {subtitle && <h3>{subtitle}</h3>}
            {offers && <div className="vertical-offers__gift-cards">{returnOffers()}</div>}
        </div>
    );
};

export default memo(VerticalOffers);
