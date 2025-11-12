import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Copy, CheckCheck } from 'lucide-react';
import { useTranslation } from '../../../contexts/TranslationContext'; // ← AGREGAR IMPORT

interface ProductShareProps {
  showShareOptions: boolean;
  setShowShareOptions: (show: boolean) => void;
  copiedToClipboard: boolean;
  handleShare: () => void;
  shareOnSocialMedia: (platform: string) => void;
}

export function ProductShare({
  showShareOptions,
  setShowShareOptions,
  copiedToClipboard,
  handleShare,
  shareOnSocialMedia
}: ProductShareProps) {
  const { t } = useTranslation(); // ← AGREGAR HOOK

  return (
    <div className="relative">
      <button
        onClick={() => setShowShareOptions(!showShareOptions)}
        className="bg-white/90 backdrop-blur-sm rounded-full p-2 sm:p-3 shadow-lg hover:scale-110 transition-transform duration-200"
      >
        {copiedToClipboard ? (
          <CheckCheck className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
        ) : (
          <Share2 className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700" />
        )}
      </button>
      <AnimatePresence>
        {showShareOptions && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="absolute right-0 top-full mt-2 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200 p-3 min-w-[200px] z-30"
          >
            <div className="space-y-2">
              <button
                onClick={handleShare}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 transition-colors duration-200 text-left"
              >
                {typeof navigator.share === 'function' ? (
                  <>
                    <Share2 className="h-5 w-5 text-blue-600" />
                    <span className="text-sm font-medium font-serif text-gray-700">
                      {t('services.share')} {/* ← TRADUCIBLE */}
                    </span>
                  </>
                ) : (
                  <>
                    <Copy className="h-5 w-5 text-gray-600" />
                    <span className="text-sm font-medium font-serif text-gray-700">
                      {t('services.copyLink')} {/* ← TRADUCIBLE */}
                    </span>
                  </>
                )}
              </button>
              <div className="border-t border-gray-200 my-2" />
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => shareOnSocialMedia('whatsapp')}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-green-50 transition-colors duration-200"
                >
                  <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold font-serif">WA</span>
                  </div>
                  <span className="text-xs text-gray-700">
                    {t('services.whatsapp')} {/* ← TRADUCIBLE */}
                  </span>
                </button>
                <button
                  onClick={() => shareOnSocialMedia('facebook')}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                >
                  <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold font-serif">f</span>
                  </div>
                  <span className="text-xs text-gray-700">
                    {t('services.facebook')} {/* ← TRADUCIBLE */}
                  </span>
                </button>
                <button
                  onClick={() => shareOnSocialMedia('twitter')}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                >
                  <div className="w-6 h-6 bg-blue-400 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold font-serif">X</span>
                  </div>
                  <span className="text-xs text-gray-700">
                    {t('services.twitter')} {/* ← TRADUCIBLE */}
                  </span>
                </button>
                <button
                  onClick={() => shareOnSocialMedia('telegram')}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                >
                  <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold font-serif">TG</span>
                  </div>
                  <span className="text-xs text-gray-700">
                    {t('services.telegram')} {/* ← TRADUCIBLE */}
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}