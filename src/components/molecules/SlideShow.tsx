import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import MeanGirls from '../../assets/MeanGirls.jpg';
import NoteBook from '../../assets/The-notebook-banner.jpeg';
import Twilight from '../../assets/5df38c0b498e1fe8464e4413-1713649621457.jpeg';

export function EmblaCarousel() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  // Array med bilder og tekst
  const slides = [
    { image: MeanGirls, text: "Mean Girls", rating: "8.0/10" },
    { image: NoteBook, text: "The Notebook", rating: "7.9/10" },
    { image: Twilight, text: "Twilight", rating: "5.2/10" }
  ];

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {slides.map((slide, index) => (
          <div className="relative flex-shrink-0 w-full h-3/5" key={index}>
            <img src={slide.image} alt={`Slide ${index + 1}`} className="w-full object-cover" />

            <div className="absolute bottom-0 left-0 bg-black bg-opacity-70 text-white p-2 text-4xl w-72">
              <p className="font-bold">{slide.text}</p>
              <p>{slide.rating}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmblaCarousel;


