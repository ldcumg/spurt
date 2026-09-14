import Button from "@/components/ui/Button";
import ProgressBar from "@/components/ui/Progess/ProgressBar";
import ProgressRing from "@/components/ui/Progess/ProgressRing";

export default function HomePage() {
  return (
    <div>
      <ProgressRing percentage={60} />
    </div>
  );
}
