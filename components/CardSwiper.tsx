"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";

export type Slide = { src: string; alt: string };

// Stacked card-deck swiper (Swiper.js "cards" effect). Click the deck to
// advance to the next card; you can also drag/swipe it.
export default function CardSwiper({ slides }: { slides: Slide[] }) {
  return (
    <Swiper
      modules={[EffectCards]}
      effect="cards"
      grabCursor
      rewind
      cardsEffect={{ perSlideOffset: 9, perSlideRotate: 3 }}
      onClick={(swiper) => swiper.slideNext()}
      className="aspect-square w-full cursor-pointer"
    >
      {slides.map((s, i) => (
        <SwiperSlide
          key={s.src}
          className="relative overflow-hidden rounded-3xl border border-line bg-surface md:rounded-[2rem]"
        >
          <Image
            src={s.src}
            alt={s.alt}
            fill
            sizes="300px"
            priority={i === 0}
            draggable={false}
            className="object-cover"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
