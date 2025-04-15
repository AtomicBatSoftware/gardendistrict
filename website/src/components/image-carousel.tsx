"use client";

import React, { useEffect, useState, useMemo } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from 'embla-carousel-autoplay'
import Image from "next/image";
import { fetchSheetData } from "@/data-fetcher/generic-fetcher";
import { CACHE_TTL } from "@/lib/constants";

const CAROUSEL_IMAGE_CACHE_KEY = "carouselImageCache"
const CAROUSEL_IMAGE_CACHE_EXPIRATION_KEY = "carouselImageExpirationCache"
const CAROUSEL_IMAGE_SHEET_LINK = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQFe8zXVdVW7slOpUu8hsp32MnnEz1ZGRivhEWJjaBUIWxz5jRXd8qYjKrZ05KEQG0F-kT1YFlFiSaZ/pub?output=csv&gid=79665976";

// Used as the first image always for performance reasons
const FIRST_CAROUSEL_IMAGE = "/carousel/DEFAULT.jpg";

const defaultCarouselImageUrls = [
  "/carousel/DSC07602.jpg",
  "/carousel/SUB18107.jpg",
  "/carousel/SUB18054.jpg",
  "/carousel/DSC07917.jpg",
  "/carousel/SUB18130.jpg",
  "/carousel/SUB18023.jpg",
  "/carousel/SUB18027.jpg",
  "/carousel/DSC07771.jpg",
  "/carousel/SUB18100.jpg",
];

export function FullScreenCarousel() {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true
    },
    [Autoplay({
      delay: 7000,
      stopOnInteraction: false
    })]
  );

  const [carouselImageUrls, setCarouselImageUrls] = useState<string[]>([]);
  const [useDefaultImages, setUseDefaultImages] = useState(false);

  useEffect(() => {
    async function fetchCarouselImages() {
      try {
        const carouselImageUrls: string[] = (await fetchSheetData<string>(CAROUSEL_IMAGE_SHEET_LINK,
          row => row.imageUrl)).filter(url => url.toLowerCase().startsWith("https://"));

        if (carouselImageUrls !== undefined && carouselImageUrls.length > 0) {
          setCarouselImageUrls(carouselImageUrls)
          localStorage.setItem(CAROUSEL_IMAGE_CACHE_KEY, JSON.stringify(carouselImageUrls));
          localStorage.setItem(CAROUSEL_IMAGE_CACHE_EXPIRATION_KEY, String(Date.now() + CACHE_TTL));
        } else {
          console.error(`Failed to get carousel image urls - setting to default and clearing cache`);
          localStorage.removeItem(CAROUSEL_IMAGE_CACHE_KEY);
          localStorage.removeItem(CAROUSEL_IMAGE_CACHE_EXPIRATION_KEY);
          setUseDefaultImages(true);
        }
      } catch (error) {
        console.error('Error fetching carousel images - setting to default and clearing cache:', error);
        localStorage.removeItem(CAROUSEL_IMAGE_CACHE_KEY);
        localStorage.removeItem(CAROUSEL_IMAGE_CACHE_EXPIRATION_KEY);
        setUseDefaultImages(true);
      }
    }

    const urlParams = new URLSearchParams(window.location.search);
    const shouldRefresh = urlParams.has("refresh");

    const now = Date.now();
    const cachedCarouselImageUrls = localStorage.getItem(CAROUSEL_IMAGE_CACHE_KEY);
    const cachedCarouselImageUrlsExpiration = localStorage.getItem(CAROUSEL_IMAGE_CACHE_EXPIRATION_KEY);
    
    // Use cache if it exists & isn't expired & no refresh requested
    if (cachedCarouselImageUrls && cachedCarouselImageUrlsExpiration && !shouldRefresh && now < Number(cachedCarouselImageUrlsExpiration)) {
      setCarouselImageUrls(JSON.parse(cachedCarouselImageUrls));
      console.info('Fetched carousel images from cache.');
    } else {
      fetchCarouselImages();
      console.info('Fetched carousel images from sheet.');
    }
  }, []);

  const handleImageError = () => {
    console.info('Image failed to load - setting to default and clearing cache.');
    localStorage.removeItem(CAROUSEL_IMAGE_CACHE_KEY);
    localStorage.removeItem(CAROUSEL_IMAGE_CACHE_EXPIRATION_KEY);
    setUseDefaultImages(true);
  };

  const imagesToDisplay = useMemo(() => 
    [FIRST_CAROUSEL_IMAGE, ...(useDefaultImages ? defaultCarouselImageUrls : carouselImageUrls)],
    [useDefaultImages, carouselImageUrls]
  );

  return (
    <div className="w-screen h-screen overflow-hidden relative">
      <div ref={emblaRef} className="w-full h-full overflow-hidden">
        <div className="flex w-full h-full">
          {imagesToDisplay.map((src, index) => (
            <div key={index === 0 ? 'first-image' : index} className="relative w-full h-full flex-[0_0_100%]">
              {index === 0 ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={src}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                <Image
                  src={src}
                  alt={`Slide ${index + 1}`}
                  fill
                  className="object-cover object-top"
                  onError={handleImageError}
                  suppressHydrationWarning
                  loading="lazy"
                  quality={85}
                  sizes="100vw"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
