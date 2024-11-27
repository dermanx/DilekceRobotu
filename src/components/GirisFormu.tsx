import React, { useState } from 'react';
import { FormData } from '../types';
import { User, Phone, MessageSquare, AlertCircle, MapPin, Building } from 'lucide-react';
import { validatePhone, validateName } from '../utils/validation';
import LegalDisclaimer from './LegalDisclaimer';

interface Props {
  formData: FormData;
  onChange: (data: Partial<FormData>) => void;
  onSubmit: () => void;
  isLoading: boolean;
  error: string | null;
}

export default function GirisFormu({ formData, onChange, onSubmit, isLoading, error }: Props) {
  const [validationErrors, setValidationErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [hasAcceptedDisclaimer, setHasAcceptedDisclaimer] = useState(false);

  const validate = (field: keyof FormData, value: string): string | null => {
    switch (field) {
      case 'ad':
      case 'soyad':
        return validateName(value) ? null : 'Geçerli bir isim giriniz';
      case 'telefon':
        return validatePhone(value) ? null : 'Geçerli bir telefon numarası giriniz';
      case 'adres':
        return value.length >= 10 ? null : 'Adres en az 10 karakter olmalıdır';
      case 'kurum':
        return value.length >= 3 ? null : 'Kurum adı en az 3 karakter olmalıdır';
      case 'mesaj':
        return value.length >= 10 ? null : 'Mesaj en az 10 karakter olmalıdır';
      default:
        return null;
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    const error = validate(field, value);
    setValidationErrors(prev => ({
      ...prev,
      [field]: error
    }));
    onChange({ [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!hasAcceptedDisclaimer) {
      setShowDisclaimer(true);
      return;
    }
    
    const errors: Partial<Record<keyof FormData, string>> = {};
    let hasError = false;
    
    (Object.keys(formData) as Array<keyof FormData>).forEach(field => {
      const error = validate(field, formData[field]);
      if (error) {
        errors[field] = error;
        hasError = true;
      }
    });

    setValidationErrors(errors);
    
    if (!hasError) {
      onSubmit();
    }
  };

  const handleDisclaimerAccept = () => {
    setHasAcceptedDisclaimer(true);
    setShowDisclaimer(false);
  };

  const renderInput = (
    field: keyof FormData,
    placeholder: string,
    icon: React.ReactNode,
    type: string = 'text'
  ) => (
    <div className="space-y-1">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
          {icon}
        </div>
        <input
          type={type}
          placeholder={placeholder}
          value={formData[field]}
          onChange={(e) => handleChange(field, e.target.value)}
          className={`block w-full pl-10 pr-3 py-2 border rounded-md leading-5 bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            validationErrors[field] ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          }`}
        />
      </div>
      {validationErrors[field] && (
        <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
          <AlertCircle className="h-4 w-4" />
          {validationErrors[field]}
        </p>
      )}
    </div>
  );

  return (
    <>
      <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">Dilekçe Bilgi Girişi</h2>
        
        {error && (
          <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 text-red-700 dark:text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {renderInput('ad', 'Adınız', <User className="h-5 w-5" />)}
          {renderInput('soyad', 'Soyadınız', <User className="h-5 w-5" />)}
          {renderInput('telefon', 'Telefon Numaranız', <Phone className="h-5 w-5" />, 'tel')}
          {renderInput('adres', 'Adresiniz', <MapPin className="h-5 w-5" />)}
          {renderInput('kurum', 'Dilekçenin verileceği kurum.', <Building className="h-5 w-5" />)}
          <p className="text-sm text-gray-500">Örnek "Aile Mahkemesine" "Cumhuriyet Başsavcılığına" </p>

          <div className="space-y-1">
            <div className="relative">
              <div className="absolute top-3 left-3 text-gray-400 dark:text-gray-500">
                <MessageSquare className="h-5 w-5" />
              </div>
              <textarea
                placeholder="Açıklama yazın. Örnek Şiddetli geçimsizlik nedeniyle boşanma"
                value={formData.mesaj}
                onChange={(e) => handleChange('mesaj', e.target.value)}
                className={`block w-full pl-10 pr-3 py-2 border rounded-md leading-5 bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  validationErrors.mesaj ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
                rows={4}
              />
            </div>
            {validationErrors.mesaj && (
              <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {validationErrors.mesaj}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 dark:disabled:bg-blue-800 transition-colors duration-200"
          >
            {isLoading ? 'Gönderiliyor...' : 'Gönder'}
          </button>
        </form>
      </div>

      <LegalDisclaimer
        isOpen={showDisclaimer}
        onAccept={handleDisclaimerAccept}
        onClose={() => setShowDisclaimer(false)}
      />
    </>
  );
}