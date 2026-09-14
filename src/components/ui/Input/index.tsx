import { useId } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({ label, error, id, ...props }: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;

  const borderClass = error
    ? "border-error"
    : "border-input-border focus:border-primary-500";

  return (
    <div className="flex w-full flex-col gap-8">
      {label && (
        <label
          htmlFor={inputId}
          className="text-title-xs"
        >
          {label}
        </label>
      )}
      <div className="flex flex-col gap-4">
        <input
          id={id}
          className={`text-body-lg h-48 w-full rounded-lg border px-16 outline-none disabled:opacity-50 ${borderClass}`}
          {...props}
        />
        {error && (
          <p
            id={errorId}
            className="text-body-md text-error"
          >
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
