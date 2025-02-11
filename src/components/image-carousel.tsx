"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from 'embla-carousel-autoplay'
import Image from "next/image";


const images = [
  "/image1.png",
  "/image2.png",
  "/image3.png",
  "/image4.png"
];

export function FullScreenCarousel() {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true
    },
    [Autoplay({ delay: 7000 })]
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
