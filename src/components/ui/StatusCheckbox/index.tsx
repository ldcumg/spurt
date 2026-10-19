"use client";

import { Done, Todo } from "@/assets/icons";
import { twMerge } from "@/lib/twMerge";
import clsx from "clsx";

interface StatusCheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  onChange: () => void;
  label?: string;
  className?: string;
}

export default function StatusCheckbox({ checked, onChange, label, className, ...props }: StatusCheckboxProps) {
  const Icon = checked ? Done : Todo;

  return (
    <label className={twMerge(clsx("inline-flex cursor-pointer items-center gap-6", className))}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="peer sr-only"
        {...props}
      />
      <Icon className={`size-32 shrink-0 ${checked ? "text-primary-600" : "text-neutral-600"}`} />
      {label && <span>{label}</span>}
    </label>
  );
}
