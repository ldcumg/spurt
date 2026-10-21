import SignupForm from "@/app/(auth)/signup/_components/SignupForm";
import ROUTES from "@/constants/routes";
import Link from "next/link";

export default function SignupPage() {
  return (
    <>
      <h1 className="text-display text-foreground-title mb-32">회원가입</h1>
      <SignupForm />
      <p className="text-body-md mt-16 text-center font-medium text-neutral-600">
        이미 회원이신가요?{" "}
        <Link
          href={ROUTES.login}
          className="text-primary-500 font-semibold underline"
        >
          로그인
        </Link>
      </p>
    </>
  );
}
