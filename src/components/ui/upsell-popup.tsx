'use client';

import { useState, useEffect } from 'react';
import { Button } from './button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './dialog';
import { Badge } from './badge';
import { X, Clock, Star, Package, Zap, CheckCircle, AlertTriangle } from 'lucide-react';
import { useDeviceType } from '@/hooks/use-mobile';

interface UpsellPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onAcceptUpsell: () => void;
  onDeclineUpsell: () => void;
  isLoading?: boolean;
}

export function UpsellPopup({
  isOpen,
  onClose,
  onAcceptUpsell,
  onDeclineUpsell,
  isLoading = false,
}: UpsellPopupProps) {
  const [isClosing, setIsClosing] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes countdown
  const [showUrgency, setShowUrgency] = useState(false);

  const { deviceType, screenSize } = useDeviceType();
  const isMobile = deviceType === 'mobile';
  const isSmallPhone = screenSize.width < 375;

  // Countdown timer effect
  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  // Show urgency when less than 2 minutes left
  useEffect(() => {
    setShowUrgency(timeLeft <= 120);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 200);
  };

  const handleAccept = () => {
    onAcceptUpsell();
  };

  const handleDecline = () => {
    onDeclineUpsell();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className={`${isMobile ? 'w-screen h-screen max-w-none max-h-none m-0 p-0 gap-0' : 'max-w-[95vw] sm:max-w-[500px] max-h-[90vh]'} p-0 overflow-hidden bg-white`}>
        <DialogTitle className="sr-only">Complete Game Asset Pack Offer</DialogTitle>

        {/* Hero Image */}
        <div className={`relative ${isMobile ? (isSmallPhone ? 'h-24' : 'h-28') : 'h-32 sm:h-40'} bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 overflow-hidden`}>
          {/* Asset Pack Image */}
          <div className="absolute inset-0">
            <img
              src="/images/ultimate-asset-pack.png"
              alt="The Ultimate Game Asset Pack"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 rounded-full p-2 bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-sm"
          >
            <X className="h-5 w-5 text-white" />
          </button>

          {/* Urgency Banner - Overlay on hero */}
          <div className={`absolute bottom-0 left-0 right-0 text-white p-3 text-center transition-all duration-500 ${showUrgency
            ? 'bg-gradient-to-r from-red-600/95 to-red-500/95 animate-pulse'
            : 'bg-gradient-to-r from-red-500/90 to-red-400/90'
            }`}>
            <div className="flex items-center justify-center gap-2">
              <Clock className={`h-4 w-4 ${showUrgency ? 'animate-spin' : 'animate-pulse'}`} />
              <span className="font-bold text-sm">
                {showUrgency ? 'OFFER EXPIRING SOON!' : 'LIMITED TIME OFFER'}
              </span>
              {showUrgency && (
                <div className="flex items-center gap-1 bg-red-800/80 px-2 py-1 rounded text-xs">
                  <AlertTriangle className="h-3 w-3" />
                  <span className="font-bold">URGENT</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={`${isMobile ? 'px-3 overflow-y-auto -mt-4' : 'p-3 sm:p-4 overflow-y-auto max-h-[calc(90vh-160px)]'}`} style={isMobile ? { paddingBottom: '11rem' } : undefined}>
          {/* Main Headline */}
          <div className={`text-center ${isMobile ? 'mb-2' : 'mb-3 sm:mb-4'}`}>
            <h2 className={`${isMobile ? (isSmallPhone ? 'text-lg' : 'text-xl') : 'text-lg sm:text-xl'} font-bold text-gray-900 mb-1`}>
              Complete Game Asset Pack
            </h2>
            <p className={`${isMobile ? 'text-sm' : 'text-gray-600 text-xs sm:text-sm'}`}>
              Everything you need to build amazing Fortnite games
            </p>
          </div>

          {/* Value Proposition - Clean Design */}
          <div className={`p-3 sm:p-4 rounded-lg ${isMobile ? 'mb-2' : 'mb-3 sm:mb-4'} transition-all duration-500 ${showUrgency
            ? 'bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200'
            : 'bg-gradient-to-r from-slate-50 to-gray-50 border border-gray-200'
            }`}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <div className="text-center">
                  <div className={`${isMobile ? (isSmallPhone ? 'text-xl' : 'text-2xl') : 'text-2xl sm:text-3xl'} font-bold text-green-600`}>$19</div>
                  <div className="text-xs text-gray-500">TODAY ONLY</div>
                </div>
                {showUrgency && (
                  <Badge className="bg-red-600 text-white animate-pulse px-2 py-1 text-xs">
                    {formatTime(timeLeft)}
                  </Badge>
                )}
              </div>
              <div className="text-center sm:text-right">
                <div className={`${isMobile ? 'text-lg' : 'text-lg sm:text-xl'} font-bold text-gray-400 line-through`}>$750</div>
                <div className={`${isMobile ? 'text-sm' : 'text-xs sm:text-sm'} text-green-600 font-semibold`}>Save $731 (97% OFF!)</div>
              </div>
            </div>

            {showUrgency && (
              <div className="mt-2 p-2 bg-red-50 rounded border border-red-200">
                <div className="flex items-center gap-2 text-red-700 text-xs">
                  <AlertTriangle className="h-3 w-3" />
                  <span className="font-semibold">⏰ Time is running out! This offer will expire in {formatTime(timeLeft)}</span>
                </div>
              </div>
            )}
          </div>

          {/* Asset List - Compact Cards */}
          <div className={isMobile ? 'mb-2' : 'mb-3 sm:mb-4'}>
            <h3 className={`font-semibold text-gray-900 mb-2 sm:mb-3 text-center ${isMobile ? 'text-sm' : 'text-sm sm:text-base'}`}>What's Included:</h3>
            <div className={`grid grid-cols-1 ${isMobile ? 'gap-1.5' : 'gap-1.5 sm:gap-2'}`}>
              <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-white rounded border border-gray-200 hover:border-blue-300 transition-colors">
                <div className="bg-blue-100 p-1.5 sm:p-2 rounded">
                  <Zap className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className={`font-semibold text-gray-900 ${isMobile ? 'text-sm' : 'text-xs sm:text-sm'}`}>Hundreds of 3D Game Assets</div>
                  <div className="text-xs text-gray-600">Characters, props, environments, weapons</div>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-white rounded border border-gray-200 hover:border-green-300 transition-colors">
                <div className="bg-green-100 p-1.5 sm:p-2 rounded">
                  <Zap className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <div className={`font-semibold text-gray-900 ${isMobile ? 'text-sm' : 'text-xs sm:text-sm'}`}>2D UI Elements & HUD</div>
                  <div className="text-xs text-gray-600">Menus, buttons, health bars, icons</div>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-white rounded border border-gray-200 hover:border-purple-300 transition-colors">
                <div className="bg-purple-100 p-1.5 sm:p-2 rounded">
                  <Zap className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600" />
                </div>
                <div className="flex-1">
                  <div className={`font-semibold text-gray-900 ${isMobile ? 'text-sm' : 'text-xs sm:text-sm'}`}>Audio Files & Sound Effects</div>
                  <div className="text-xs text-gray-600">Background music, SFX, voice lines</div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons - Compact Design */}
          <div className={`${isMobile ? 'space-y-2' : 'space-y-1.5 sm:space-y-2'}`}>
            <Button
              onClick={handleAccept}
              disabled={isLoading}
              className={`w-full ${isMobile ? 'h-12 text-sm' : 'h-10 sm:h-12 text-sm sm:text-base'} bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg`}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Processing...
                </div>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
                  YES I WANT THE ASSET PACK
                </>
              )}
            </Button>

            <Button
              onClick={handleDecline}
              disabled={isLoading}
              variant="outline"
              className={`w-full ${isMobile ? 'h-10 text-sm' : 'h-8 sm:h-10 text-xs sm:text-sm'} text-gray-700 hover:text-gray-900 hover:bg-gray-50 font-medium border-gray-300`}
            >
              No Thanks, Just The Bootcamp
            </Button>
          </div>

          {/* Urgency Footer */}
          <div className="mt-2 sm:mt-3 text-center">
            <p className={`text-xs transition-all duration-300 ${showUrgency ? 'text-red-600 font-semibold' : 'text-gray-500'
              }`}>
              {showUrgency ? (
                <>
                  ⚡⚡⚡ OFFER EXPIRES IN {formatTime(timeLeft)} - DON'T MISS OUT! ⚡⚡⚡
                </>
              ) : (
                <>
                  ⚡ This offer expires when you close this popup
                </>
              )}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 