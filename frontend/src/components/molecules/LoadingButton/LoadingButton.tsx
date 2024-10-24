import { Button, type ButtonProps } from "../../atoms/Button/Button";
import { Spinner } from "../../atoms/Spinner/Spinner";

export interface LoadingButtonProps extends ButtonProps {
  isLoading: boolean;
  shouldDisableWhenLoading?: boolean;
}

export const LoadingButton = ({
  isLoading = false,
  shouldDisableWhenLoading = true,
  ...props
}: LoadingButtonProps) => {
  return (
    <Button
      {...props}
      disabled={shouldDisableWhenLoading && isLoading}
      leftIcon={isLoading && <Spinner />}
    />
  );
};
