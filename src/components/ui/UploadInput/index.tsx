"use client";

import { Upload } from "@/assets/icons";
import { useState } from "react";

interface UploadInputProps {
  label?: string;
  error?: string;
  placeholder?: string;
  onFileChange: (file: File | null) => void;
}

export default function UploadInput({
  label,
  error,
  placeholder = "파일을 업로드해주세요",
  onFileChange,
}: UploadInputProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (newFile: File | null) => {
    setFile(newFile);
    onFileChange(newFile);
  };

  const dragClass = isDragging ? "border-primary-500 bg-primary-50 shadow-md" : "border-neutral-400 bg-neutral-50";

  return (
    <div className="flex w-full flex-col gap-8">
      {label && <span className="text-title-xs">{label}</span>}
      <div className="flex flex-col gap-4">
        <label
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            handleFile(e.dataTransfer.files?.[0] ?? null);
          }}
          className={`flex w-full cursor-pointer items-center gap-16 rounded-lg border border-dashed ${dragClass} py-12 pr-16 pl-12`}
        >
          <Upload className="size-24 shrink-0" />
          <span className={`text-body-lg min-w-0 truncate ${file ? "text-neutral-700" : "text-neutral-500"}`}>
            {file ? file.name : placeholder}
          </span>
          <input
            type="file"
            className="hidden"
            onChange={(e) => {
              handleFile(e.target.files?.[0] ?? null);
            }}
          />
        </label>
        {error && <p className="text-body-md text-error">{error}</p>}
      </div>
    </div>
  );
}
