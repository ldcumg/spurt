"use client";

import Button from "@/components/ui/Button";
import TextInput from "@/components/ui/TextInput";
import { EMAIL_PATTERN } from "@/constants/regex";
import ROUTES from "@/constants/routes";
import { useSignupMutation } from "@/hooks/mutations/useSignupMutation";
import { isAxiosError } from "axios";
import { useRouter } from "next/router";
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

const NAME_MAX_LENGTH = 20;
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 72;

const validate = ({ name, email, password, passwordConfirm }: SignupValues) => {
  const errors: SignupErrors = {};

  if (!name) errors.name = "닉네임을 입력해주세요.";

  if (!email) errors.email = "이메일을 입력해주세요.";
  else if (!EMAIL_PATTERN.test(email)) errors.email = "이메일 형식이 올바르지 않습니다.";

  if (!password) errors.password = "비밀번호를 입력해주세요.";
  else if (password.length < PASSWORD_MIN_LENGTH)
    errors.password = `비밀번호는 ${PASSWORD_MIN_LENGTH}자 이상이어야 합니다.`;

  if (passwordConfirm !== password) errors.passwordConfirm = "비밀번호가 일치하지 않습니다.";

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

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nextErrors = validate({ name, email, password, passwordConfirm });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

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
        autoComplete="nickname"
        maxLength={NAME_MAX_LENGTH}
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={errors.name}
      />
      <TextInput
        label="이메일"
        type="email"
        autoComplete="username"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
      />
      <TextInput
        label="비밀번호"
        type="password"
        autoComplete="new-password"
        maxLength={PASSWORD_MAX_LENGTH}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
      />
      <TextInput
        label="비밀번호 확인"
        type="password"
        autoComplete="new-password"
        maxLength={PASSWORD_MAX_LENGTH}
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
        error={errors.passwordConfirm}
      />
      <p className="text-body-md text-error">
        {error && !isEmailDuplicated(error) && "회원가입 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요."}
      </p>
      <Button
        type="submit"
        size="lg"
        disabled={isPending}
      >
        회원가입
      </Button>
    </form>
  );
}
