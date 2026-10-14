import {
  NOTE_DRAFT_VERSION,
  getNoteDraftStorageErrorKind,
  getNoteDraftStorageKey,
  readNoteDraft,
  removeNoteDraft,
  saveNoteDraft,
  type NoteDraft,
} from "./noteDraftStorage";
import { beforeEach, describe, expect, it } from "vitest";

const owner = { teamId: "team3-spurt", userId: 2633 };

const createDraft = (): NoteDraft => ({
  version: NOTE_DRAFT_VERSION,
  ...owner,
  title: "임시 노트",
  content: {
    type: "doc",
    content: [{ type: "paragraph", content: [{ type: "text", text: "작성 중인 본문" }] }],
  },
  linkUrl: "https://example.com",
  goalId: 721,
  todoId: 1913,
  savedAt: "2026-10-14T03:00:00.000Z",
});

describe("noteDraftStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("팀과 사용자별 저장 키를 만든다", () => {
    expect(getNoteDraftStorageKey(owner)).toBe("spurt:note-draft:v1:team3-spurt:2633");
    expect(getNoteDraftStorageKey({ ...owner, userId: 3000 })).not.toBe(getNoteDraftStorageKey(owner));
    expect(getNoteDraftStorageKey({ ...owner, teamId: "other/team" })).toBe("spurt:note-draft:v1:other%2Fteam:2633");
  });

  it("제목, 본문, 링크, 목표와 할 일을 함께 저장하고 읽는다", () => {
    const draft = createDraft();

    expect(saveNoteDraft(draft)).toBe(true);
    expect(readNoteDraft(owner)).toEqual(draft);
  });

  it("작성자 정보가 현재 사용자와 다르면 불러오지 않는다", () => {
    const draft = createDraft();
    localStorage.setItem(getNoteDraftStorageKey(owner), JSON.stringify({ ...draft, userId: 9999 }));

    expect(readNoteDraft(owner)).toBeNull();
  });

  it("손상되었거나 현재 버전과 다른 데이터는 불러오지 않는다", () => {
    const key = getNoteDraftStorageKey(owner);
    localStorage.setItem(key, "invalid-json");
    expect(readNoteDraft(owner)).toBeNull();

    localStorage.setItem(key, JSON.stringify({ ...createDraft(), version: 2 }));
    expect(readNoteDraft(owner)).toBeNull();
  });

  it("임시저장 데이터를 삭제한다", () => {
    saveNoteDraft(createDraft());

    expect(removeNoteDraft(owner)).toBe(true);
    expect(readNoteDraft(owner)).toBeNull();
  });

  it("현재 팀과 사용자의 임시저장만 삭제한다", () => {
    const otherOwner = { teamId: "team3-spurt", userId: 3000 };
    const otherDraft: NoteDraft = { ...createDraft(), ...otherOwner };
    saveNoteDraft(createDraft());
    saveNoteDraft(otherDraft);

    removeNoteDraft(owner);

    expect(readNoteDraft(owner)).toBeNull();
    expect(readNoteDraft(otherOwner)).toEqual(otherDraft);
  });

  it("브라우저 저장소 오류를 용량 초과와 사용 불가로 구분한다", () => {
    expect(getNoteDraftStorageErrorKind(new DOMException("storage full", "QuotaExceededError"))).toBe("quotaExceeded");
    expect(getNoteDraftStorageErrorKind(new DOMException("storage blocked", "SecurityError"))).toBe("unavailable");
    expect(getNoteDraftStorageErrorKind(new Error("unknown"))).toBe("unknown");
  });

  it("저장소 쓰기 오류를 호출부에 전달한다", () => {
    const quotaError = new DOMException("storage full", "QuotaExceededError");
    const unavailableStorage = {
      getItem: () => null,
      setItem: () => {
        throw quotaError;
      },
      removeItem: () => undefined,
    };

    expect(() => saveNoteDraft(createDraft(), unavailableStorage)).toThrow(quotaError);
  });
});
