'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { getPriceId, getEnvironmentUrls, isTestMode } from '@/lib/stripe-config';
import { redirectToStripeCheckout, redirectToMultiProductStripeCheckout } from '@/lib/stripe-checkout';

interface UpsellContextType {
  isPopupOpen: boolean;
  isLoading: boolean;
  openUpsell: () => void;
  closeUpsell: () => void;
  acceptUpsell: () => Promise<void>;
  declineUpsell: () => Promise<void>;
  setLoading: (loading: boolean) => void;
}

const UpsellContext = createContext<UpsellContextType | undefined>(undefined);

interface UpsellProviderProps {
  children: ReactNode;
  onAcceptUpsell?: () => Promise<void>;
  onDeclineUpsell?: () => Promise<void>;
}

export function UpsellProvider({
  children,
  onAcceptUpsell,
  onDeclineUpsell
}: UpsellProviderProps) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const openUpsell = useCallback(() => {
    setIsPopupOpen(true);
  }, []);

  const closeUpsell = useCallback(() => {
    setIsPopupOpen(false);
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    setIsLoading(loading);
  }, []);

  const acceptUpsell = useCallback(async () => {
    setIsLoading(true);
    try {
      if (onAcceptUpsell) {
        await onAcceptUpsell();
      } else {
        // Default behavior - proceed to multi-product checkout (bootcamp + asset pack)
        console.log('🎯 User accepted upsell - proceeding to multi-product checkout');

        const bootcampPriceId = getPriceId('bootcamp');
        const assetPackPriceId = getPriceId('asset_pack');
        const urls = getEnvironmentUrls();

        if (!bootcampPriceId || !assetPackPriceId) {
          throw new Error('Missing price IDs for bootcamp or asset pack');
        }

        // Use the new multi-product checkout function
        await redirectToMultiProductStripeCheckout({
          products: [
            {
              priceId: bootcampPriceId,
              quantity: 1,
            },
            {
              priceId: assetPackPriceId,
              quantity: 1,
            },
          ],
          successUrl: urls.successUrl,
          cancelUrl: urls.cancelUrl,
          metadata: {
            product: 'bootcamp_with_asset_pack',
            upsell_accepted: 'true',
            total_expected: '56',  // $37 + $19
            environment: isTestMode() ? 'test' : 'production',
            source: 'upsell_popup',
          },
        });
      }
    } catch (error) {
      console.error('Upsell accept error:', error);
      // You might want to show an error message to the user here
    } finally {
      setIsLoading(false);
      setIsPopupOpen(false);
    }
  }, [onAcceptUpsell]);

  const declineUpsell = useCallback(async () => {
    setIsLoading(true);
    try {
      if (onDeclineUpsell) {
        await onDeclineUpsell();
      } else {
        // Default behavior - proceed to single product checkout (bootcamp only)
        console.log('❌ User declined upsell - proceeding to bootcamp checkout only');

        const bootcampPriceId = getPriceId('bootcamp');
        const urls = getEnvironmentUrls();

        if (!bootcampPriceId) {
          throw new Error('Missing price ID for bootcamp');
        }

        await redirectToStripeCheckout({
          priceId: bootcampPriceId,
          quantity: 1,
          successUrl: urls.successUrl,
          cancelUrl: urls.cancelUrl,
          metadata: {
            product: 'bootcamp',
            upsell_declined: 'true',
            environment: isTestMode() ? 'test' : 'production',
            source: 'upsell_popup',
          },
        });
      }
    } catch (error) {
      console.error('Upsell decline error:', error);
      // You might want to show an error message to the user here
    } finally {
      setIsLoading(false);
      setIsPopupOpen(false);
    }
  }, [onDeclineUpsell]);

  const value: UpsellContextType = {
    isPopupOpen,
    isLoading,
    openUpsell,
    closeUpsell,
    acceptUpsell,
    declineUpsell,
    setLoading,
  };

  return (
    <UpsellContext.Provider value={value}>
      {children}
    </UpsellContext.Provider>
  );
}

export function useUpsell() {
  const context = useContext(UpsellContext);
  if (context === undefined) {
    throw new Error('useUpsell must be used within an UpsellProvider');
  }
  return context;
} 