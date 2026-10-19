"use client";

import StatusCheckbox from "@/components/ui/StatusCheckbox";

interface StatusInputProps {
  isDone: boolean;
  setIsDone: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function StatusInput({ isDone, setIsDone }: StatusInputProps) {
  return (
    <div className="flex w-full flex-col gap-8">
      <label className="text-title-xs">상태 *</label>
      <div className="relative">
        <StatusCheckbox
          checked={!isDone}
          onChange={() => setIsDone(false)}
          label="TO DO"
        />
        <StatusCheckbox
          className="absolute left-1/2"
          checked={isDone}
          onChange={() => setIsDone(true)}
          label="DONE"
        />
      </div>
    </div>
  );
}
