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

export const metadata: Metadata = {
  title: "Sign In",
  description: `Sign in to your ${APP_NAME} account to access your dashboard and manage your orders.`,
};
const SignInPage = () => {
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
          <CardTitle className="text-center">Sign In</CardTitle>
          <CardDescription className="text-center">
            Welcome back! Please enter your credentials to access your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">{/* Sign-in form */}</CardContent>
      </Card>
    </div>
  );
};

export default SignInPage;
