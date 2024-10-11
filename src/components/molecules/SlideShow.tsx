import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import MeanGirls from "../../assets/MeanGirls.jpg";
import NoteBook from "../../assets/The-notebook-banner.jpeg";
import Twilight from "../../assets/5df38c0b498e1fe8464e4413-1713649621457.jpeg";
import { Icon } from "@iconify/react";
import { Button } from "../atoms/Button/Button";

export function SlideShow() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  const slides = [
    { image: MeanGirls, text: "Mean Girls", rating: "8.0", year: "2004" },
    { image: NoteBook, text: "The Notebook", rating: "7.9", year: "2007" },
    { image: Twilight, text: "Twilight", rating: "5.2", year: "2017" },
  ];

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {slides.map((slide, index) => (
          <div className="relative flex-shrink-0 w-full mb-6" key={index}>
            <img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className="w-full object-cover"
            />
            <div className="absolute flex items-end z-10 bottom-0 left-0 bg-gradient-to-b from-transparent to-black text-white p-2 text-4xl w-full font-roboto">
              <div className="pl-2">
                <p className="font-bold text-4xl">{slide.text}</p>
                <div className="flex items-center space-x-2">
                  <Icon
                    icon="noto:star"
                    width="0.5em"
                    height="1.5em"
                    className="pt-2"
                  />
                  <p className="text-xl pt-2 pr-0 mr-0 ">{slide.rating}</p>

                  <Icon
                    icon="ci:line-m"
                    width="1.2em"
                    height="1.2em"
                    className="pt-2 pl-0"
                  />
                  <p className="text-xl pt-2">{slide.year}</p>
                </div>
                <Button className="pl-10 pr-10 flex items-center">
                  <p>Read more</p>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
