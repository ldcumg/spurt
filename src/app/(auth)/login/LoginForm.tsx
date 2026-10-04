"use client";

import Button from "@/components/ui/Button";
import TextInput from "@/components/ui/TextInput";
import ROUTES from "@/constants/routes";
import { EMAIL_PATTERN, VALIDATION_MESSAGES } from "@/constants/validation";
import { useLoginMutation } from "@/hooks/mutations/useLoginMutation";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

type LoginErrors = {
  email?: string;
  password?: string;
};

const validate = (email: string, password: string) => {
  const errors: LoginErrors = {};

  if (!email) errors.email = VALIDATION_MESSAGES.emailRequired;
  else if (!EMAIL_PATTERN.test(email)) errors.email = VALIDATION_MESSAGES.emailInvalid;

  if (!password) errors.password = VALIDATION_MESSAGES.passwordRequired;

  return errors;
};

const getLoginErrorMessage = (error: Error) => {
  if (isAxiosError(error) && error.response?.status === 401) {
    return "이메일 또는 비밀번호가 올바르지 않습니다.";
  }
  return "로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
};

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginErrors>({});

  const { mutate: login, isPending, error } = useLoginMutation();

  const handleBlur = (field: keyof LoginErrors) => {
    const fieldError = validate(email, password)[field];
    setErrors((prev) => ({ ...prev, [field]: fieldError }));
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nextErrors = validate(email, password);
    setErrors(nextErrors);
    const [firstErrorField] = Object.keys(nextErrors);
    if (firstErrorField) {
      const firstErrorInput = e.currentTarget.elements.namedItem(firstErrorField);
      if (firstErrorInput instanceof HTMLInputElement) firstErrorInput.focus();
      return;
    }

    login({ email, password }, { onSuccess: () => router.replace(ROUTES.dashboard) });
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="flex flex-col gap-24"
    >
      <TextInput
        label="이메일"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={() => handleBlur("email")}
        error={errors.email}
        type="email"
        autoComplete="username"
        placeholder="이메일을 입력해주세요"
      />
      <TextInput
        label="비밀번호"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onBlur={() => handleBlur("password")}
        error={errors.password}
        type="password"
        autoComplete="current-password"
        placeholder="비밀번호를 입력해주세요"
      />
      <p className="text-body-md text-error">{error && getLoginErrorMessage(error)}</p>
      <Button
        type="submit"
        size="wide"
        className="text-title-xs"
        disabled={isPending}
      >
        로그인
      </Button>
    </form>
  );
}
