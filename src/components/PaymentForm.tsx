import React, { useState } from 'react';
import { CreditCard, Calendar, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

interface PaymentFormProps {
  amount: number;
  onSuccess: () => void;
  onCancel: () => void;
}

// Test kartları
const TEST_CARDS = {
  success: {
    number: '5890040000000016',
    expiry: '12/30',
    cvc: '123',
  },
  fail: {
    number: '5890040000000015',
    expiry: '12/30',
    cvc: '123',
  },
};

export default function PaymentForm({ amount, onSuccess, onCancel }: PaymentFormProps) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + '/' + v.slice(2, 4);
    }
    return v;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevent double submission
    if (isLoading || isPaymentComplete) return;
    
    setIsLoading(true);

    try {
      // Kart numarasını normalize et
      const normalizedCardNumber = cardNumber.replace(/\s/g, '');
      
      // Test kartlarını kontrol et
      if (normalizedCardNumber === TEST_CARDS.success.number) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsPaymentComplete(true);
        toast.success('Ödeme başarıyla gerçekleşti');
        onSuccess();
      } else if (normalizedCardNumber === TEST_CARDS.fail.number) {
        throw new Error('Yetersiz bakiye');
      } else {
        throw new Error('Geçersiz kart numarası');
      }
    } catch (error) {
      toast.error(`Ödeme başarısız: ${error instanceof Error ? error.message : 'Bir hata oluştu'}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Form is disabled if payment is complete or loading
  const isFormDisabled = isLoading || isPaymentComplete;

  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Ödeme</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Ödenecek Tutar: {amount.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-1">
          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Kart Numarası
          </label>
          <div className="relative">
            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              id="cardNumber"
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              placeholder="0000 0000 0000 0000"
              maxLength={19}
              className="pl-10 pr-3 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
              required
              disabled={isFormDisabled}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Son Kullanma
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                id="expiry"
                type="text"
                value={expiry}
                onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                placeholder="AA/YY"
                maxLength={5}
                className="pl-10 pr-3 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                required
                disabled={isFormDisabled}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="cvc" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              CVC
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                id="cvc"
                type="text"
                value={cvc}
                onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 3))}
                placeholder="000"
                maxLength={3}
                className="pl-10 pr-3 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                required
                disabled={isFormDisabled}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={onCancel}
            disabled={isFormDisabled}
            className="flex-1 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            İptal
          </button>
          <button
            type="submit"
            disabled={isFormDisabled}
            className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'İşleniyor...' : isPaymentComplete ? 'Ödeme Tamamlandı' : 'Ödemeyi Tamamla'}
          </button>
        </div>
      </form>
    </div>
  );
}