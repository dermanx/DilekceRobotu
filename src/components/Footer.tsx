import React from 'react';
import { Scale } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center">
              <Scale className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                Hukuki Metin Robotu
              </span>
            </div>
            <p className="mt-4 text-gray-600 dark:text-gray-300 text-sm">
              Profesyonel hukuki metinleri saniyeler içinde oluşturun. Güvenli, hızlı ve kullanıcı dostu platform.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Politikalar
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="/kullanim-sartlari" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm">
                  Kullanım Şartları
                </a>
              </li>
              <li>
                <a href="/gizlilik-politikasi" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm">
                  Gizlilik Politikası
                </a>
              </li>
              <li>
                <a href="/politikalar" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm">
                  Politikalar
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              İletişim
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="mailto:info@hukukimetinrobotu.com" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm">
                  info@hukukimetinrobotu.com
                </a>
              </li>
              <li>
                <span className="text-gray-600 dark:text-gray-300 text-sm">
                  +90 (212) 123 45 67
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
            ©2024 Hukuki Metin Robotu. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}