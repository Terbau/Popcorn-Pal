import { ForYouItem } from "@/components/molecules/ForYouItem/ForYouItem";
import { mockedForyouData } from "./foryouData";

export const ForYouAnimation = () => {
  const data = mockedForyouData;

  return (
    <div className="flex flex-col gap-6 animate-scroll-y">
      {data.map((item, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <needed>
        <ForYouItem key={index} item={item} mocked />
      ))}
    </div>
  );
};
