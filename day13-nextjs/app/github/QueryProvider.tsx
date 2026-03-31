"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState, ReactNode } from "react";

export default function QueryProvider({ children }: { children: ReactNode }) {
  // useState ensures each request gets its own QueryClient
  // Don't create QueryClient outside component in Next.js!
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes fresh
            retry: 2, // retry failed requests twice
            refetchOnWindowFocus: false, // don't refetch on tab switch
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* DevTools — shows cache state visually */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
