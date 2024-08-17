"use client";
import { config } from "dotenv";
config({ path: ".env.local" });
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { AuthLoading, Authenticated, ConvexReactClient } from "convex/react";

import { Loading } from "@/components/auth/loading";

interface ConvexClientProviderProps {
  children: React.ReactNode;
}

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;

const convex = new ConvexReactClient(convexUrl);

export const ConvexClientProvider = ({
  children,
}: ConvexClientProviderProps) => (
  <ClerkProvider>
    <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
      <Authenticated>{children}</Authenticated>
      <AuthLoading>
        <div className="h-full flex flex-col items-center justify-center">
        <Loading />
        </div>
       
      </AuthLoading>
    </ConvexProviderWithClerk>
  </ClerkProvider>
);
