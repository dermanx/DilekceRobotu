import React, { useState } from 'react';
import { FormData, APIResponse, AIResponse } from '../types';
import { generateAndDownloadWord } from '../utils/wordGenerator';
import { FileText, Loader, FileEdit, Info } from 'lucide-react';
import PaymentForm from './PaymentForm';
import Modal from './Modal';
import toast from 'react-hot-toast';

interface Props {
  formData: FormData;
  apiResponse: APIResponse;
  aiResponse: AIResponse | null;
  onReset: () => void;
  onCreatePetition: () => void;
  isAILoading: boolean;
}

const maskText = (text: string): string => {
  // Convert text to array of characters
  const chars = text.split('');
  
  // Calculate number of characters to mask (30% of total)
  const totalChars = chars.length;
  const charsToMask = Math.floor(totalChars * 0.3);
  
  // Create array of indices to mask
  const indices = Array.from({ length: totalChars }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  
  // Mask selected characters
  const maskIndices = indices.slice(0, charsToMask);
  maskIndices.forEach(index => {
    if (chars[index] !== ' ' && chars[index] !== '\n') {
      chars[index] = '█';
    }
  });
  
  return chars.join('');
};

export default function SonucEkrani({ 
  formData, 
  apiResponse, 
  aiResponse, 
  onReset, 
  onCreatePetition,
  isAILoading 
}: Props) {
  const [isGeneratingWord, setIsGeneratingWord] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [hasPaid, setHasPaid] = useState(false);

  const handleDownloadWord = async () => {
    if (!hasPaid) {
      setShowPaymentModal(true);
      return;
    }

    if (!aiResponse?.content) {
      toast.error('Dilekçe içeriği bulunamadı');
      return;
    }
    
    setIsGeneratingWord(true);
    try {
      await generateAndDownloadWord(aiResponse.content, formData);
      toast.success('Word belgesi başarıyla oluşturuldu');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Belge oluşturulurken beklenmeyen bir hata oluştu';
      toast.error(errorMessage);
    } finally {
      setIsGeneratingWord(false);
    }
  };

  const handlePaymentSuccess = () => {
    setHasPaid(true);
    setShowPaymentModal(false);
    toast.success('Ödeme başarılı! Şimdi tam metni görüntüleyebilir ve indirebilirsiniz.');
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">İşlem Başarılı!</h2>
      </div>

      <div className="space-y-4">
        <div className="border-b dark:border-gray-700 pb-4">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Girilen Bilgiler</h3>
          <dl className="space-y-2">
            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Ad Soyad</dt>
              <dd className="text-sm text-gray-900 dark:text-white">{formData.ad} {formData.soyad}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Telefon</dt>
              <dd className="text-sm text-gray-900 dark:text-white">{formData.telefon}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Adres</dt>
              <dd className="text-sm text-gray-900 dark:text-white">{formData.adres}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Kurum</dt>
              <dd className="text-sm text-gray-900 dark:text-white">{formData.kurum}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Mesaj</dt>
              <dd className="text-sm text-gray-900 dark:text-white">{formData.mesaj}</dd>
            </div>
          </dl>
        </div>

        {aiResponse && (
          <div className="border-b dark:border-gray-700 pb-4">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">AI Dilekçe Sonucu</h3>
            {aiResponse.success ? (
              <>
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md mb-4">
                  <pre className="whitespace-pre-wrap text-sm text-gray-800 dark:text-gray-200 font-['Times_New_Roman'] text-justify select-none">
                    {hasPaid ? aiResponse.content : maskText(aiResponse.content)}
                  </pre>
                </div>
                {!hasPaid && (
                  <div className="flex items-start gap-2 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-md mb-4 text-blue-700 dark:text-blue-300">
                    <Info className="h-5 w-5 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">
                      Dilekçe metninin tamamını görmek ve indirmek için aşağıdaki "Tam Metni Görüntüle ve İndir" butonuna tıklayarak ödeme yapabilirsiniz. Ödeme işlemi tamamlandıktan sonra metnin tam haline erişim sağlanacaktır. Lütfen devam etmek için yönergeleri takip ediniz.
                    </p>
                  </div>
                )}
                <div className="space-y-2">
                  <button
                    onClick={handleDownloadWord}
                    disabled={isGeneratingWord}
                    className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 dark:disabled:bg-blue-800 transition-colors duration-200"
                  >
                    {isGeneratingWord ? (
                      <>
                        <Loader className="h-5 w-5 animate-spin" />
                        Word Belgesi Hazırlanıyor...
                      </>
                    ) : (
                      <>
                        <FileEdit className="h-5 w-5" />
                        {hasPaid ? 'Word Olarak İndir' : 'Tam Metni Görüntüle ve İndir (24.90₺)'}
                      </>
                    )}
                  </button>
                </div>
              </>
            ) : (
              <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-md text-red-700 dark:text-red-400">
                {aiResponse.error}
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col gap-4">
          {!aiResponse && (
            <button
              onClick={onCreatePetition}
              disabled={isAILoading}
              className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-green-300 dark:disabled:bg-green-800 transition-colors duration-200"
            >
              {isAILoading ? (
                <>
                  <Loader className="h-5 w-5 animate-spin" />
                  Dilekçe Oluşturuluyor...
                </>
              ) : (
                <>
                  <FileText className="h-5 w-5" />
                  Dilekçe Oluştur
                </>
              )}
            </button>
          )}
          
          <button
            onClick={onReset}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            Yeni Dilekçe
          </button>
        </div>
      </div>

      <Modal isOpen={showPaymentModal} onClose={() => setShowPaymentModal(false)}>
        <PaymentForm
          amount={24.90}
          onSuccess={handlePaymentSuccess}
          onCancel={() => setShowPaymentModal(false)}
        />
      </Modal>
    </div>
  );
}