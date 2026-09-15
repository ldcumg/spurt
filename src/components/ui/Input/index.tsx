import { useId } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

/**
 *
 * @param label 입력창 상단 라벨에 들어갈 텍스트
 * @param error 입력창 하단에 띄울 메시지
 * @param id (선택) 별도 id 지정할 때 사용
 * @returns
 */
export default function Input({ label, error, id, ...props }: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;

  const borderClass = error ? "border-error" : "border-input-border focus:border-primary-500";

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
          id={inputId}
          className={`text-body-lg h-48 w-full rounded-lg border bg-white px-16 outline-none disabled:opacity-50 ${borderClass}`}
          {...props}
        />
        <p
          id={errorId}
          className="text-body-md text-error min-h-22"
        >
          {error}
        </p>
      </div>
    </div>
  );
}
