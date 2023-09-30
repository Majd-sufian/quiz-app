import { QueryClient, QueryClientProvider } from "react-query";

export const queryClient = new QueryClient();

export function QueryClientProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
