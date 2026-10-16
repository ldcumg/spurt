import Profile from "@/components/ui/Profile";

interface TodoEmptyProps {
  variant?: "todo" | "done";
}

export default function TodoEmpty({ variant }: TodoEmptyProps) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-32 text-center">
      <Profile
        variant="working"
        className="size-128"
      />
      {variant === "todo" ? (
        <p>
          최근 등록한 할 일이 없어요
          <br />할 일을 등록해 보세요.
        </p>
      ) : (
        <p>
          최근 완료한 할 일이 없어요
          <br />할 일을 완료해 보세요.
        </p>
      )}
    </div>
  );
}
