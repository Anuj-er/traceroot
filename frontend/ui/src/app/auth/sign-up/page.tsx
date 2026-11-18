import { env } from "@/env";
import { isCloud } from "@/lib/server/cloud";
import { clientIdFromCallbackUrl } from "@/lib/oauth/client-display";
import { loadOAuthClientDisplay } from "@/lib/oauth/load-client-display";
import { SignUpClient } from "./sign-up-client";

export const dynamic = "force-dynamic";

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string | string[] }>;
}) {
  const googleAuthConfigured = Boolean(
    env.AUTH_GOOGLE_CLIENT_ID.trim() && env.AUTH_GOOGLE_CLIENT_SECRET.trim(),
  );
  // A sign-up on the way to connecting an assistant says which one.
  const { callbackUrl } = await searchParams;
  const connection = await loadOAuthClientDisplay(
    clientIdFromCallbackUrl(typeof callbackUrl === "string" ? callbackUrl : null),
  );

  return (
    <SignUpClient
      googleAuthConfigured={googleAuthConfigured}
      emailDomainPolicyEnabled={isCloud()}
      connection={connection}
    />
  );
}
