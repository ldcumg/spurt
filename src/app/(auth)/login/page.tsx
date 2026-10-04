import LoginForm from "./LoginForm";
import ROUTES from "@/constants/routes";
import Link from "next/link";

export default function LoginPage() {
  return (
    <>
      <h1 className="text-display text-foreground-title mb-32">로그인</h1>
      <LoginForm />
      <p className="text-body-md font-medium mt-16 text-center text-neutral-600">
        Spurt가 처음이신가요?{" "}
        <Link
          href={ROUTES.signup}
          className="text-primary-500 font-semibold underline"
        >
          회원가입
        </Link>
      </p>
    </>
  );
}
