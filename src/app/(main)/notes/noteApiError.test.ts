import { getNoteApiError, isNoteApiErrorStatus, shouldRetryNoteQuery } from "./noteApiError";
import type { AxiosError } from "axios";
import { describe, expect, it } from "vitest";

const createAxiosError = (status?: number) =>
  ({
    isAxiosError: true,
    response: status ? { status } : undefined,
  }) as AxiosError;

describe("getNoteApiError", () => {
  it.each([
    [400, "제목, 할 일, 참고 링크 등 입력 내용을 확인해 주세요."],
    [403, "로그인한 계정과 데이터의 소유권을 확인해 주세요."],
    [404, "할 일 목록을 새로 불러왔어요. 다시 선택해 주세요."],
    [500, "서버에 일시적인 문제가 생겼어요. 잠시 후 다시 시도해 주세요."],
  ])("노트 생성의 %i 오류를 사용자 메시지로 변환한다", (status, message) => {
    expect(getNoteApiError(createAxiosError(status), "create")).toMatchObject({ status, message });
  });

  it("응답이 없는 오류를 네트워크 오류로 처리한다", () => {
    expect(getNoteApiError(createAxiosError(), "list")).toMatchObject({ status: null, canRetry: true });
  });
});

describe("note API error helpers", () => {
  it("상태 코드를 판별한다", () => {
    expect(isNoteApiErrorStatus(createAxiosError(404), 404)).toBe(true);
  });

  it("4xx 오류는 재시도하지 않는다", () => {
    expect(shouldRetryNoteQuery(0, createAxiosError(403))).toBe(false);
  });

  it("네트워크와 5xx 오류는 한 번만 재시도한다", () => {
    expect(shouldRetryNoteQuery(0, createAxiosError())).toBe(true);
    expect(shouldRetryNoteQuery(0, createAxiosError(500))).toBe(true);
    expect(shouldRetryNoteQuery(1, createAxiosError(500))).toBe(false);
  });
});
