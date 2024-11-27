import React from 'react';
import { FormState, FormData, APIResponse, AIResponse } from './types';
import { generateAIContent } from './services/aiService';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import { Sun, Moon } from 'lucide-react';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import GirisFormu from './components/GirisFormu';
import SonucEkrani from './components/SonucEkrani';
import LandingPage from './components/LandingPage';
import AuthButton from './components/AuthButton';
import Footer from './components/Footer';

const initialFormData: FormData = {
  ad: '',
  soyad: '',
  telefon: '',
  adres: '',
  mesaj: '',
  kurum: '',
};

const initialState: FormState = {
  step: 1,
  data: initialFormData,
  apiResponse: null,
  aiResponse: null,
  isLoading: false,
  isAILoading: false,
  error: null,
};

function App() {
  const [state, setState] = React.useState<FormState>(initialState);
  const [darkMode, setDarkMode] = React.useState(false);
  const [showLanding, setShowLanding] = React.useState(true);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleGetStarted = () => {
    setShowLanding(false);
  };

  const handleFormChange = (data: Partial<FormData>) => {
    setState((prev) => ({
      ...prev,
      data: { ...prev.data, ...data },
    }));
  };

  const handleSubmit = async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await mockApiCall(state.data);
      setState((prev) => ({
        ...prev,
        step: 2,
        apiResponse: response,
        isLoading: false,
      }));
      toast.success('Form başarıyla gönderildi');
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: 'Bir hata oluştu. Lütfen tekrar deneyiniz.',
        isLoading: false,
      }));
      toast.error('Form gönderilirken bir hata oluştu');
    }
  };

  const handleCreatePetition = async () => {
    setState((prev) => ({ ...prev, isAILoading: true }));

    try {
      const aiContent = await generateAIContent(state.data.mesaj, state.data.kurum);
      setState((prev) => ({
        ...prev,
        aiResponse: {
          success: true,
          content: aiContent,
        },
        isAILoading: false,
      }));
      toast.success('Dilekçe başarıyla oluşturuldu');
    } catch (error) {
      setState((prev) => ({
        ...prev,
        aiResponse: {
          success: false,
          content: '',
          error: error instanceof Error ? error.message : 'AI ile iletişim kurulurken bir hata oluştu',
        },
        isAILoading: false,
      }));
      toast.error('Dilekçe oluşturulurken bir hata oluştu');
    }
  };

  const handleReset = () => {
    setState(initialState);
    setShowLanding(true);
    toast.success('Form sıfırlandı');
  };

  const mockApiCall = async (data: FormData): Promise<APIResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return {
      success: true,
      message: 'Veriler başarıyla işlendi',
      data: { id: Math.random().toString(36).substr(2, 9) },
    };
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
      <nav className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-1"></div>
            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                aria-label="Toggle theme"
              >
                {darkMode ? (
                  <Sun className="h-5 w-5 text-yellow-500" />
                ) : (
                  <Moon className="h-5 w-5 text-gray-700" />
                )}
              </button>
              <AuthButton />
            </div>
          </div>
        </div>
      </nav>

      <div className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SignedIn>
            {showLanding ? (
              <LandingPage onGetStarted={handleGetStarted} />
            ) : (
              <>
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Hukuki Metin Robotu
                  </h1>
                </div>

                {state.step === 1 ? (
                  <GirisFormu
                    formData={state.data}
                    onChange={handleFormChange}
                    onSubmit={handleSubmit}
                    isLoading={state.isLoading}
                    error={state.error}
                  />
                ) : (
                  <SonucEkrani
                    formData={state.data}
                    apiResponse={state.apiResponse!}
                    aiResponse={state.aiResponse}
                    onReset={handleReset}
                    onCreatePetition={handleCreatePetition}
                    isAILoading={state.isAILoading}
                  />
                )}
              </>
            )}
          </SignedIn>
          <SignedOut>
            <LandingPage onGetStarted={handleGetStarted} />
          </SignedOut>
        </div>
      </div>
      <Footer />
      <Toaster position="top-center" />
    </div>
  );
}

export default App;