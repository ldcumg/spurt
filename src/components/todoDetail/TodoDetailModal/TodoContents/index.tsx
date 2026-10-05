import { Link, Temporary } from "@/assets/icons";

export default function TodoContents() {
  return (
    <div>
      <div>
        <h3>첨부자료</h3>
        <Temporary className="size-17" />
        <Link className="size-17" />
      </div>
      <div>
        <h3>작성된 노트</h3>
      </div>
    </div>
  );
}
