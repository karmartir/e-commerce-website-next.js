import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { APP_NAME } from "@/lib/constants";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CredentialsSignInForm from "./credentials-signin-form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign In",
  description: `Sign in to your ${APP_NAME} account to access your dashboard and manage your orders.`,
};
const SignInPage = async (props: {
  searchParams: Promise<{
    callbackUrl?: string;
  }>;
}) => {
  // Check if user is already signed in
  const { callbackUrl } = await props.searchParams;
  const session = await auth();
  if (session) {
    return redirect(callbackUrl || "/");
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="p-6">
        <CardHeader className="space-y-4">
          <Link href="/" className="flex-center">
            <Image
              src="/images/logo.svg"
              alt={`${APP_NAME} logo`}
              width={100}
              height={100}
              priority
            />
          </Link>
          <CardTitle className="text-center mb-0.5 ">Sign In</CardTitle>
          <CardDescription className="text-center mb-2">
            Welcome back! Please, sign in to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <CredentialsSignInForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default SignInPage;
