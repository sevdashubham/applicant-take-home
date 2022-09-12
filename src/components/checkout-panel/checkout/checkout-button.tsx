import React, { useCallback } from 'react';
import { Button } from '../../common';

import './checkout-button.less';
import { usePrizeOutCheckout } from '../../../utils/hooks/usePrizeOutCheckout';
import { useAppSelector } from '../../../hooks';
import { selectedGC, prizeOutGiftCard } from '../../../slices/checkout-slice';
import { useDispatch } from 'react-redux';

interface CheckoutButtonProps {
    isValid: boolean;
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ isValid }): React.ReactElement => {
    const selectedGiftCard = useAppSelector(selectedGC);
    const dispatch = useDispatch();
    const handlePrizeOutSuccess = useCallback((response) => {
        if (response) {
            dispatch(prizeOutGiftCard());
        }
    }, []);

    const { prizeOut, isPrizing } = usePrizeOutCheckout({
        onSuccess: handlePrizeOutSuccess,
    });

    const buttonText = () => {
        if (isPrizing) {
            return 'Requesting checkout';
        }
        if (isValid) {
            return 'Prizeout Gift Card';
        }
        return 'Select Gift Card';
    };

    const buttonHandler = () => {
        prizeOut(selectedGiftCard);
    };

    return (
        <div className="checkout-button-container">
            <Button
                ariaLabel="Prizeout your gift card"
                color={isValid ? 'confirm' : ''}
                onClick={buttonHandler}
                size="medium"
                text={buttonText()}
                type="submit"
            />
        </div>
    );
};

export default CheckoutButton;
