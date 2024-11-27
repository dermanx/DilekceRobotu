import React from 'react';
import { Scale, Shield, Clock, ArrowRight, Code, Users } from 'lucide-react';
import AuthButton from './AuthButton';

interface Props {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: Props) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16 lg:px-8 xl:mt-28">
              <div className="text-center">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                  <span className="block">Hukuki Metin Robotu ile</span>
                  <span className="block text-blue-600 dark:text-blue-400">Profesyonel Dilekçeler</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 dark:text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl">
                  Yapay zeka destekli dilekçe oluşturma platformu ile saniyeler içinde profesyonel hukuki metinler oluşturun.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center">
                  <AuthButton onSignedInAction={onGetStarted} />
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-blue-100 to-transparent dark:from-blue-900/20"></div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 dark:text-blue-400 font-semibold tracking-wide uppercase">Özellikler</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Daha İyi Bir Dilekçe Deneyimi
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 lg:mx-auto">
              Modern teknoloji ile hukuki süreçlerinizi kolaylaştırın.
            </p>
          </div>

          <div className="mt-20">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative px-6 py-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mb-4">
                    <Scale className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Hukuki Doğruluk</h3>
                  <p className="text-gray-500 dark:text-gray-300">Güncel mevzuata uygun profesyonel metinler oluşturun.</p>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative px-6 py-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mb-4">
                    <Shield className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Güvenli ve Gizli</h3>
                  <p className="text-gray-500 dark:text-gray-300">Verileriniz güvende, gizliliğiniz koruma altında.</p>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative px-6 py-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mb-4">
                    <Clock className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Hızlı Oluşturma</h3>
                  <p className="text-gray-500 dark:text-gray-300">Saniyeler içinde profesyonel hukuki metinler.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-blue-50 dark:bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="text-center">
              <div className="text-4xl font-extrabold text-blue-600 dark:text-blue-400">1000+</div>
              <div className="mt-2 text-lg font-medium text-gray-600 dark:text-gray-300">Oluşturulan Dilekçe</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-extrabold text-blue-600 dark:text-blue-400">500+</div>
              <div className="mt-2 text-lg font-medium text-gray-600 dark:text-gray-300">Mutlu Müşteri</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-extrabold text-blue-600 dark:text-blue-400">%99</div>
              <div className="mt-2 text-lg font-medium text-gray-600 dark:text-gray-300">Müşteri Memnuniyeti</div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-24 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Müşterilerimiz Ne Diyor?</h2>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">
              Platformumuz hakkında düşünceler
            </p>
          </div>
          <div className="mt-20">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-8 shadow-lg">
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                      <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white">Ahmet ERYILMAZ {i}</h4>
                      <p className="text-gray-500 dark:text-gray-300"></p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    "Dilekçe yazmak hiç bu kadar kolay olmamıştı."
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 dark:bg-blue-900">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Hemen Başlayın</span>
            <span className="block text-blue-200">İlk dilekçenizi oluşturun.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <AuthButton onSignedInAction={onGetStarted} />
          </div>
        </div>
      </div>
    </div>
  );
}