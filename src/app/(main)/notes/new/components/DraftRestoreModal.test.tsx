import DraftRestoreModal from "./DraftRestoreModal";
import { DISCLOSURE_ROOT_ID } from "@/constants/dom";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { SVGProps } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/assets/icons", () => ({
  X: (props: SVGProps<SVGSVGElement>) => (
    <svg
      aria-hidden="true"
      {...props}
    />
  ),
}));

const savedAt = "2026-10-14T06:30:00.000Z";

describe("DraftRestoreModal", () => {
  beforeEach(() => {
    const disclosureRoot = document.createElement("div");
    disclosureRoot.id = DISCLOSURE_ROOT_ID;
    document.body.append(disclosureRoot);
  });

  afterEach(() => {
    cleanup();
    document.getElementById(DISCLOSURE_ROOT_ID)?.remove();
  });

  it("임시저장한 노트의 제목과 저장 시각을 보여준다", async () => {
    render(
      <DraftRestoreModal
        isOpen
        draftTitle="프로젝트 회고 정리"
        savedAt={savedAt}
        onSkip={() => undefined}
        onRestore={() => undefined}
      />,
    );

    expect(await screen.findByRole("heading", { name: "임시저장한 노트가 있어요" })).toBeInTheDocument();
    expect(screen.getByText("프로젝트 회고 정리")).toBeInTheDocument();
    expect(screen.getByText("저장 시각")).toBeInTheDocument();
    expect(screen.getByText("프로젝트 회고 정리").closest("dl")?.querySelector("time")).toHaveAttribute(
      "dateTime",
      savedAt,
    );
  });

  it("제목이 비어 있으면 대체 제목을 보여준다", async () => {
    render(
      <DraftRestoreModal
        isOpen
        draftTitle="   "
        savedAt={savedAt}
        onSkip={() => undefined}
        onRestore={() => undefined}
      />,
    );

    expect(await screen.findByText("제목 없는 노트")).toBeInTheDocument();
  });

  it("닫기와 건너뛰기, 불러오기 동작을 각각 전달한다", async () => {
    const user = userEvent.setup();
    const onSkip = vi.fn();
    const onRestore = vi.fn();

    render(
      <DraftRestoreModal
        isOpen
        draftTitle="프로젝트 회고 정리"
        savedAt={savedAt}
        onSkip={onSkip}
        onRestore={onRestore}
      />,
    );

    await user.click(await screen.findByRole("button", { name: "모달 닫기" }));
    await user.click(screen.getByRole("button", { name: "이번에는 불러오지 않기" }));
    await user.click(screen.getByRole("button", { name: "불러오기" }));

    expect(onSkip).toHaveBeenCalledTimes(2);
    expect(onRestore).toHaveBeenCalledOnce();
  });
});
