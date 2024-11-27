import React from 'react';
import { SignInButton, UserButton, useUser } from '@clerk/clerk-react';
import { ArrowRight } from 'lucide-react';

interface AuthButtonProps {
  onSignedInAction?: () => void;
}

export default function AuthButton({ onSignedInAction }: AuthButtonProps) {
  const { isSignedIn } = useUser();

  if (isSignedIn) {
    return (
      <div className="flex items-center gap-4">
        {onSignedInAction && (
          <button
            onClick={onSignedInAction}
            className="group inline-flex items-center justify-center px-6 py-2 text-base font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors duration-200"
          >
            Başlayın
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        )}
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              rootBox: 'w-10 h-10',
              avatarBox: 'w-10 h-10 rounded-full',
            },
          }}
        />
      </div>
    );
  }

  return (
    <SignInButton mode="modal">
      <button className="group inline-flex items-center justify-center px-6 py-2 text-base font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors duration-200">
        Giriş Yap
        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
      </button>
    </SignInButton>
  );
}
