"use client";

import Button from "@/components/ui/Button";
import TextInput from "@/components/ui/TextInput";
import ROUTES from "@/constants/routes";
import {
  EMAIL_PATTERN,
  NAME_MAX_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  VALIDATION_MESSAGES,
} from "@/constants/validation";
import { useSignupMutation } from "@/hooks/mutations/useSignupMutation";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

type SignupValues = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

type SignupErrors = {
  name?: string;
  email?: string;
  password?: string;
  passwordConfirm?: string;
};

const validate = ({ name, email, password, passwordConfirm }: SignupValues) => {
  const errors: SignupErrors = {};

  if (!name) errors.name = VALIDATION_MESSAGES.nameRequired;

  if (!email) errors.email = VALIDATION_MESSAGES.emailRequired;
  else if (!EMAIL_PATTERN.test(email)) errors.email = VALIDATION_MESSAGES.emailInvalid;

  if (!password) errors.password = VALIDATION_MESSAGES.passwordRequired;
  else if (password.length < PASSWORD_MIN_LENGTH) errors.password = VALIDATION_MESSAGES.passwordTooShort;

  if (passwordConfirm !== password) errors.passwordConfirm = VALIDATION_MESSAGES.passwordMismatch;

  return errors;
};

const isEmailDuplicated = (error: Error) => isAxiosError(error) && error.response?.status === 409;

export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errors, setErrors] = useState<SignupErrors>({});

  const router = useRouter();
  const { mutate: signup, isPending, error } = useSignupMutation();

  const handleBlur = (field: keyof SignupErrors) => {
    const fieldError = validate({ name, email, password, passwordConfirm })[field];
    setErrors((prev) => ({ ...prev, [field]: fieldError }));
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nextErrors = validate({ name, email, password, passwordConfirm });
    setErrors(nextErrors);
    const [firstErrorField] = Object.keys(nextErrors);
    if (firstErrorField) {
      const firstErrorInput = e.currentTarget.elements.namedItem(firstErrorField);
      if (firstErrorInput instanceof HTMLInputElement) firstErrorInput.focus();
      return;
    }

    signup(
      { email, name, password },
      {
        onSuccess: () => router.replace(ROUTES.dashboard),
        onError: (err) => {
          if (isEmailDuplicated(err)) setErrors({ email: "이미 사용중인 이메일입니다." });
        },
      },
    );
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="flex flex-col gap-24"
    >
      <TextInput
        label="닉네임"
        name="name"
        autoComplete="nickname"
        maxLength={NAME_MAX_LENGTH}
        value={name}
        onChange={(e) => setName(e.target.value)}
        onBlur={() => handleBlur("name")}
        error={errors.name}
        placeholder="닉네임을 입력해주세요"
      />
      <TextInput
        label="이메일"
        name="email"
        type="email"
        autoComplete="username"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={() => handleBlur("email")}
        error={errors.email}
        placeholder="이메일을 입력해주세요"
      />
      <TextInput
        label="비밀번호"
        name="password"
        type="password"
        autoComplete="new-password"
        maxLength={PASSWORD_MAX_LENGTH}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onBlur={() => handleBlur("password")}
        error={errors.password}
        placeholder="비밀번호를 입력해주세요"
      />
      <TextInput
        label="비밀번호 확인"
        name="passwordConfirm"
        type="password"
        autoComplete="new-password"
        maxLength={PASSWORD_MAX_LENGTH}
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
        onBlur={() => handleBlur("passwordConfirm")}
        error={errors.passwordConfirm}
        placeholder="비밀번호를 한번 더 입력해주세요"
      />
      <p className="text-body-md text-error">
        {error && !isEmailDuplicated(error) && "회원가입 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요."}
      </p>
      <Button
        type="submit"
        size="wide"
        className="text-title-xs"
        disabled={isPending}
      >
        회원가입
      </Button>
    </form>
  );
}
