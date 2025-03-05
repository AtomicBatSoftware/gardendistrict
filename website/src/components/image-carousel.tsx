"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from 'embla-carousel-autoplay'
import Image from "next/image";


const images = [
  "/carousel/SUB16958.jpg",
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

  return (
    <div className="w-screen h-screen overflow-hidden relative">
      <div ref={emblaRef} className="w-full h-full overflow-hidden">
        <div className="flex w-full h-full">
          {images.map((src, index) => (
            <div key={index} className="relative w-full h-full flex-[0_0_100%]">
              <Image
              src={src}
              alt={`Slide ${index + 1}`}
              fill
              className="object-cover object-top"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
