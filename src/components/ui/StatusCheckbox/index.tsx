"use client";

import { Done, Todo } from "@/assets/icons";
import { twMerge } from "@/lib/twMerge";
import clsx from "clsx";

interface StatusCheckboxProps {
  isDone: boolean;
  onChange: () => void;
  label?: string;
  className?: string;
}

export default function StatusCheckbox({ isDone, onChange, label, className }: StatusCheckboxProps) {
  const Icon = isDone ? Done : Todo;

  return (
    <label className={twMerge(clsx("inline-flex cursor-pointer items-center gap-6", className))}>
      <input
        type="checkbox"
        checked={isDone}
        onChange={onChange}
        className="peer sr-only"
      />
      <Icon className={`size-32 ${isDone ? "text-primary-500" : "text-neutral-600"}`} />
      {label && <span>{label}</span>}
    </label>
  );
}
