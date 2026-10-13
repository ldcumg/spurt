import { createEmptyNoteContent } from "../../noteFormUtils";
import NoteEditor from "./NoteEditor";
import { render, screen } from "@testing-library/react";
import type { SVGProps } from "react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/assets/icons", () => ({
  Check: (props: SVGProps<SVGSVGElement>) => <svg {...props} />,
  Link: (props: SVGProps<SVGSVGElement>) => <svg {...props} />,
  More: (props: SVGProps<SVGSVGElement>) => <svg {...props} />,
  NoteFilled: (props: SVGProps<SVGSVGElement>) => <svg {...props} />,
  Under: (props: SVGProps<SVGSVGElement>) => <svg {...props} />,
  Upload: (props: SVGProps<SVGSVGElement>) => <svg {...props} />,
}));

describe("NoteEditor", () => {
  it("비활성 상태가 바뀔 때 콘텐츠 변경 이벤트를 발생시키지 않는다", async () => {
    const handleContentChange = vi.fn();
    const props = {
      title: "테스트 노트",
      content: createEmptyNoteContent(),
      onTitleChange: vi.fn(),
      onContentChange: handleContentChange,
    };
    const { rerender } = render(<NoteEditor {...props} />);

    await screen.findByRole("textbox", { name: "노트 본문" });
    handleContentChange.mockClear();

    rerender(
      <NoteEditor
        {...props}
        isDisabled
      />,
    );
    rerender(
      <NoteEditor
        {...props}
        isDisabled={false}
      />,
    );

    expect(handleContentChange).not.toHaveBeenCalled();
  });
});
