"use client";

import Button from "@/components/ui/Button";
import TextInput from "@/components/ui/TextInput";
import { AUTH_API_PATH } from "@/constants";
import { clientFetcher } from "@/lib/axios/clientFetcher";
import { PostLoginRequest } from "@/types/auth.types";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

type LoginErrors = {
  email?: string;
  password?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validate = (email: string, password: string) => {
  const errors: LoginErrors = {};

  if (!email) errors.email = "이메일을 입력해주세요.";
  else if (!EMAIL_PATTERN.test(email)) errors.email = "이메일 형식이 올바르지 않습니다.";

  if (!password) errors.password = "비밀번호를 입력해주세요.";

  return errors;
};

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginErrors>({});

  const { mutate: login, isPending } = useMutation({
    mutationFn: (body: PostLoginRequest) => clientFetcher.post(AUTH_API_PATH.login, body),
  });

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nextErrors = validate(email, password);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    login({ email, password });
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="flex flex-col gap-24"
    >
      <TextInput
        label="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
        type="email"
        autoComplete="username"
      />
      <TextInput
        label="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
        type="password"
        autoComplete="current-password"
      />
      <Button
        type="submit"
        size="lg"
        disabled={isPending}
      >
        로그인
      </Button>
    </form>
  );
}
