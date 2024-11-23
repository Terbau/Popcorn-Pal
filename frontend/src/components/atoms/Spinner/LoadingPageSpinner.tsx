import { Spinner } from "./Spinner";

export const LoadingPageSpinner = () => {
  return (
    <div className="mt-8 flex justify-center ">
      <Spinner className="h-12 w-12" />
    </div>
  );
};
