import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import checkoutPanelViewWrapper, { SetViewProps } from '../view-wrapper';
import './checkout-confirmation.less';
import { useAppSelector } from '../../../hooks';
import { selectedGC, clearGiftCard } from '../../../slices/checkout-slice';
import { clearSelectedOffer } from '../../../slices/offers-slice';
import { useDispatch } from 'react-redux';
import { cents_to_dollar } from '../../../utils/functions';
import { Button } from '../../common';

const CheckoutConfirmationPanelView: React.FC<SetViewProps> = ({ setView }): React.ReactElement => {
    const selectedGiftCard = useAppSelector(selectedGC);
    const dispatch = useDispatch();

    useEffect(() => {
        setView('checkout');
    }, [selectedGiftCard]);

    const buttonHandler = () => {
        dispatch(clearGiftCard());
        dispatch(clearSelectedOffer());
        setView('checkout');
    };

    return (
        <section className="checkout-confirmation">
            <h2>Checkout Confirmation Panel</h2>
            <h2>Order successful</h2>
            <h1>{selectedGiftCard.name}</h1>
            <h3>{`Amount: ${cents_to_dollar(selectedGiftCard.cost_in_cents)}`}</h3>
            <Button
                ariaLabel="Done"
                color={'confirm'}
                onClick={buttonHandler}
                size="medium"
                text={'Done'}
                type="submit"
            />
        </section>
    );
};

CheckoutConfirmationPanelView.propTypes = {
    setView: PropTypes.func,
};

export default checkoutPanelViewWrapper(CheckoutConfirmationPanelView, 'checkout-confirmation');
