"use client";

import { Upload } from "@/assets/icons";
import { useState } from "react";

interface UploadInputProps {
  placeholder?: string;
  onFileChange: (file: File | null) => void;
}

export default function UploadInput({ placeholder = "파일을 업로드해주세요", onFileChange }: UploadInputProps) {
  const [file, setFile] = useState<File | null>(null);

  return (
    <label className="flex w-full cursor-pointer items-center gap-16 rounded-lg border border-dashed border-neutral-400 bg-neutral-50 py-12 pr-16 pl-12">
      <Upload className="size-24 shrink-0" />
      <span className={`text-body-lg ${file ? "text-neutral-700" : "text-neutral-500"}`}>
        {file ? file.name : placeholder}
      </span>
      <input
        type="file"
        className="hidden"
        onChange={(e) => {
          const newFile = e.target.files?.[0] ?? null;
          setFile(newFile);
          onFileChange(newFile);
        }}
      />
    </label>
  );
}
