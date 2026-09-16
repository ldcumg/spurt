import Badge from "@/components/ui/Badge";

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
