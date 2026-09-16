import Button from "@/components/ui/Button";
import ProgressBar from "@/components/ui/ProgressBar";
import ProgressRing from "@/components/ui/ProgressRing";

export default function HomePage() {
  return (
    <>
      {" "}
      {/* todo 개수만 넘길 때 -> TO DO 5 */}
      <Badge
        type="todo"
        todoCount={6}
      />
      <div></div>
    </>
  );
}
