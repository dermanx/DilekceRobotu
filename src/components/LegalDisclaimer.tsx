import React from 'react';
import { Scale, AlertTriangle } from 'lucide-react';
import Modal from './Modal';

interface LegalDisclaimerProps {
  isOpen: boolean;
  onAccept: () => void;
  onClose: () => void;
}

export default function LegalDisclaimer({ isOpen, onAccept, onClose }: LegalDisclaimerProps) {
  const [isChecked, setIsChecked] = React.useState(false);

  const handleAccept = () => {
    if (isChecked) {
      onAccept();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        <div className="flex items-center justify-center mb-4">
          <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
            <Scale className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-4">
          Yasal Sorumluluk Bildirimi
        </h2>

        <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg mb-6">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-500 mt-0.5" />
            <p className="ml-3 text-sm text-yellow-600 dark:text-yellow-500">
              Lütfen aşağıdaki yasal bildirimi dikkatlice okuyunuz.
            </p>
          </div>
        </div>

        <div className="prose dark:prose-invert max-w-none mb-6">
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            Bu platform tarafından oluşturulan dilekçeler, genel hukuki bilgilendirme amacıyla sunulmaktadır. 
            Sunulan içerik hukuki tavsiye niteliğinde değildir ve avukat-müvekkil ilişkisi oluşturmaz.
          </p>
          
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mt-4">
            Oluşturulan dilekçeler, her durumun kendine özgü koşullarını tam olarak yansıtmayabilir. 
            Hukuki süreçlerinizde bir avukata danışmanız önemle tavsiye edilir.
          </p>

          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mt-4">
            Platform, oluşturulan dilekçelerin kullanımından doğabilecek herhangi bir zarar veya yükümlülükten 
            sorumlu tutulamaz.
          </p>
        </div>

        <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input
              id="disclaimer"
              type="checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <label
            htmlFor="disclaimer"
            className="ml-2 text-sm text-gray-600 dark:text-gray-300"
          >
            Yasal sorumluluk metnini okudum ve anladım.
          </label>
        </div>

        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            İptal
          </button>
          <button
            onClick={handleAccept}
            disabled={!isChecked}
            className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Onaylıyorum
          </button>
        </div>
      </div>
    </Modal>
  );
}