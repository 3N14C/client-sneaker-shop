import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StripeProvider } from "@stripe/stripe-react-native";
import { FC } from "react";

interface IProps {
  children: React.ReactNode;
}

export const Providers: FC<IProps> = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <StripeProvider publishableKey="pk_test_TYooMQauvdEDq54NiTphI7jx">
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </StripeProvider>
  );
};
