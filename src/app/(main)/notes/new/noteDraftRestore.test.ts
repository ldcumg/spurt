import { resolveDraftSelection } from "./noteDraftRestore";
import { describe, expect, it } from "vitest";

const goals = [{ id: "10" }, { id: "20" }];
const todos = [
  { id: 100, goalId: 10 },
  { id: 200, goalId: 20 },
];

describe("resolveDraftSelection", () => {
  it("저장된 목표와 할 일의 관계가 유효하면 둘 다 복원한다", () => {
    expect(resolveDraftSelection({ goalId: 10, todoId: 100 }, goals, todos)).toEqual({
      goalId: "10",
      todoId: "100",
      status: "complete",
    });
  });

  it("저장 당시 목표가 없었다면 기본 목표만 선택한다", () => {
    expect(resolveDraftSelection({ goalId: null, todoId: null }, goals, todos)).toEqual({
      goalId: "10",
      todoId: "",
      status: "goalRequired",
    });
  });

  it("저장된 목표가 삭제됐다면 기본 목표만 선택한다", () => {
    expect(resolveDraftSelection({ goalId: 30, todoId: 300 }, goals, todos)).toEqual({
      goalId: "10",
      todoId: "",
      status: "goalUnavailable",
    });
  });

  it("저장된 할 일이 없다면 유효한 목표만 복원한다", () => {
    expect(resolveDraftSelection({ goalId: 10, todoId: null }, goals, todos)).toEqual({
      goalId: "10",
      todoId: "",
      status: "todoRequired",
    });
  });

  it("할 일이 삭제됐거나 다른 목표로 이동했다면 목표만 복원한다", () => {
    expect(resolveDraftSelection({ goalId: 10, todoId: 999 }, goals, todos)).toEqual({
      goalId: "10",
      todoId: "",
      status: "todoUnavailable",
    });
    expect(resolveDraftSelection({ goalId: 10, todoId: 200 }, goals, todos)).toEqual({
      goalId: "10",
      todoId: "",
      status: "todoUnavailable",
    });
    expect(resolveDraftSelection({ goalId: 10, todoId: 300 }, goals, [...todos, { id: 300, goalId: null }])).toEqual({
      goalId: "10",
      todoId: "",
      status: "todoUnavailable",
    });
  });

  it("현재 목표가 하나도 없으면 목표와 할 일을 모두 비운다", () => {
    expect(resolveDraftSelection({ goalId: 30, todoId: 300 }, [], todos)).toEqual({
      goalId: "",
      todoId: "",
      status: "goalUnavailable",
    });
  });
});
