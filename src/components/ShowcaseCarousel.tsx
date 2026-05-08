"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Data dummy untuk showcase surat.
 * Mengikuti estetika "Dead Letter Office" dengan nuansa nostalgia.
 */
const SHOWCASE_ITEMS = [
  {
    id: "1",
    date: "14 Oktober 1924",
    stampUrl: "/stamps/locomotive.png",
    salutation: "Orang Asing Tercinta,",
    content: "Aku menulis ini untuk versi dirimu yang belum ada. Kopinya sudah dingin, dan hujan mengetuk kaca jendela seperti hantu yang berirama. Aku berharap di mana pun kau berada, matahari lebih hangat daripada di sini.",
    author: "Anonim",
  },
  {
    id: "2",
    date: "May 12, 1942",
    stampUrl: "/stamps/botanica.png",
    salutation: "My Dearest Eleanor,",
    content: "The letters from home are the only things keeping the shadows at bay. I keep your ribbon in my pocket, a small piece of a world that still makes sense. I will find my way back to you, even if the stars forget their places.",
    author: "James W.",
  },
  {
    id: "3",
    date: "1998年3月15日",
    stampUrl: "/stamps/voyage.png",
    salutation: "親愛なる友へ (Shin-ai naru tomo e),",
    content: "桜が散っています。まるで、伝えられなかった言葉が空に舞っているようです。時の流れは残酷ですが、この手紙がいつかあなたの元に届くことを願っています。",
    author: "ハルキ (Haruki)",
  },
  {
    id: "4",
    date: "23 Mei 1956",
    stampUrl: "/stamps/botanica.png",
    salutation: "Untuk Masa Depan,",
    content: "Dunia terasa begitu cepat hari ini. Pesawat-pesawat baru terbang melintasi samudra, tetapi surat-surat masih menjadi cara terbaik untuk membisikkan rahasia. Jangan lupakan rasa kertas di bawah jemarimu.",
    author: "Seorang Pemimpi",
  },
  {
    id: "5",
    date: "1 Januari 2000",
    stampUrl: "/stamps/voyage.png",
    salutation: "Kepada Siapa Pun Yang Menemukan Ini,",
    content: "Kembang api baru saja padam. Semua orang takut akan akhir dunia, tetapi aku hanya takut akan kesepian. Jika kau membaca ini, berarti kita berdua masih di sini, bukan?",
    author: "Penjaga Menara",
  }
];

export const ShowcaseCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 untuk prev, 1 untuk next

  // Fungsi untuk navigasi ke item berikutnya
  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % SHOWCASE_ITEMS.length);
  }, []);

  // Fungsi untuk navigasi ke item sebelumnya
  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + SHOWCASE_ITEMS.length) % SHOWCASE_ITEMS.length);
  }, []);

  // Efek untuk auto-scroll setiap 5 detik (Diubah dari 3s)
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [nextSlide]);

  const currentItem = SHOWCASE_ITEMS[currentIndex];

  // Varian animasi untuk transisi antar slide
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "50%" : "-50%",
      opacity: 0,
      rotate: direction > 0 ? 5 : -5,
      scale: 0.9,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      rotate: -1.5,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? "50%" : "-50%",
      opacity: 0,
      rotate: direction < 0 ? 5 : -5,
      scale: 0.9,
    }),
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-between min-h-0">
      {/* Container Area Amplop */}
      <div className="flex-1 w-full flex items-center justify-center min-h-0 relative">
        {/* Envelope container bound by height to prevent overflow */}
        <div className="h-full max-h-[65vh] aspect-[3/4] relative shrink-0 @container">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 200, damping: 25 },
                opacity: { duration: 0.2 },
                rotate: { duration: 0.4 },
              }}
              className="absolute inset-0 bg-background-paper p-[8cqw] flex flex-col shadow-2xl border border-text-main/10 rounded-sm will-change-transform overflow-hidden select-none"
            >
              {/* Tekstur Kertas */}
              <div className="absolute inset-0 pointer-events-none noise-bg opacity-[0.03]" />
              <div className="absolute inset-0 pointer-events-none paper-texture opacity-5" />
              
              <div className="relative z-10 flex flex-col h-full justify-between gap-[3cqw]">
                {/* Header Surat */}
                <div className="flex justify-between items-start shrink-0">
                  <div className="space-y-[0.5cqw]">
                    <p className="font-display text-[2.5cqw] text-muted uppercase tracking-widest">Arsip No:</p>
                    <p className="font-typewriter text-[3.5cqw] text-text-main font-bold">#{currentItem.id.padStart(4, '0')}</p>
                    <div className="pt-[1.5cqw]">
                      <p className="font-display text-[2.5cqw] text-muted uppercase tracking-widest">Tanggal:</p>
                      <p className="font-typewriter text-[3cqw] text-text-main/70">{currentItem.date}</p>
                    </div>
                  </div>
                  <div className="w-[16cqw] h-[21cqw] border border-muted/20 flex items-center justify-center p-[0.5cqw] grayscale opacity-60 shrink-0">
                    <img 
                      src={currentItem.stampUrl} 
                      alt="Prangko" 
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Isi Surat */}
                <div className="flex-1 flex flex-col justify-center overflow-hidden py-[1cqw]">
                  <h3 className="font-hand text-[6cqw] text-text-main leading-tight mb-[1.5cqw]">{currentItem.salutation}</h3>
                  <p className="font-newsreader text-[4cqw] text-text-main/90 leading-relaxed italic ink-bleed line-clamp-4 md:line-clamp-5">
                    "{currentItem.content}"
                  </p>
                </div>

                {/* Footer Surat */}
                <div className="pt-[2cqw] border-t border-muted/10 flex justify-between items-end shrink-0">
                  <p className="font-hand text-[5.5cqw] text-text-main">{currentItem.author}</p>
                  <span className="font-display text-[2.2cqw] text-muted/50 tracking-[0.2em] uppercase">Void Dispatch</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Kontrol Navigasi - Diletakkan tepat di bawah amplop */}
      <div className="flex items-center gap-4 md:gap-6 mt-4 md:mt-6 shrink-0 relative z-20">
        <motion.button
          whileHover={{ scale: 1.1, x: -3 }}
          whileTap={{ scale: 0.9 }}
          onClick={prevSlide}
          className="p-1.5 text-background-paper/30 hover:text-background-paper transition-colors"
          aria-label="Sebelumnya"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 md:w-7 md:h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </motion.button>

        {/* Indikator Progres */}
        <div className="flex flex-col items-center min-w-[70px] py-1 px-3 rounded-full bg-background-paper/5 backdrop-blur-sm border border-background-paper/10">
          <div className="flex items-baseline gap-1">
            <span className="font-display text-base md:text-lg text-background-paper font-black tracking-tighter">
              {(currentIndex + 1).toString().padStart(2, '0')}
            </span>
            <span className="text-primary font-display text-[9px] font-bold opacity-60">/</span>
            <span className="font-display text-[9px] text-background-paper/30 font-bold">
              {SHOWCASE_ITEMS.length.toString().padStart(2, '0')}
            </span>
          </div>
          <div className="w-6 h-0.5 bg-background-paper/10 mt-0.5 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-primary"
              initial={false}
              animate={{ width: `${((currentIndex + 1) / SHOWCASE_ITEMS.length) * 100}%` }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            />
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.1, x: 3 }}
          whileTap={{ scale: 0.9 }}
          onClick={nextSlide}
          className="p-1.5 text-background-paper/30 hover:text-background-paper transition-colors"
          aria-label="Berikutnya"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 md:w-7 md:h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </motion.button>
      </div>
    </div>
  );
};
