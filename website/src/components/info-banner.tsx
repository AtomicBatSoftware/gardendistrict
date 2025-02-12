'use client';

import { useState } from 'react';

interface InfoBannerProps {
  message: string;
}

export function InfoBanner(props: InfoBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  const dismissBanner = () => {
    setIsVisible(false);
  };

  return (
    isVisible && (
      <div className="bg-[#b77e08] text-white p-4 left-0 w-full shadow-lg">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <p className="text-xl">{props.message}</p>
          <button
            onClick={dismissBanner}
            className="text-[#702963] hover:text-gray-300 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    )
  );
}
