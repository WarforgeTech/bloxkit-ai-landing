'use client';

import { useUpsell } from '@/hooks/use-upsell';
import { UpsellPopup } from './upsell-popup';

export function GlobalUpsellPopup() {
    const { isPopupOpen, isLoading, closeUpsell, acceptUpsell, declineUpsell } = useUpsell();

    return (
        <UpsellPopup
            isOpen={isPopupOpen}
            onClose={closeUpsell}
            onAcceptUpsell={acceptUpsell}
            onDeclineUpsell={declineUpsell}
            isLoading={isLoading}
        />
    );
} 