"use client";

import { INITIAL_NOTES, type NoteMock } from "./mock";
import { useSyncExternalStore } from "react";

const STORAGE_KEY = "spurt:notes";

let notes: NoteMock[] = INITIAL_NOTES;
let isHydrated = false;
const listeners = new Set<() => void>();

// 노트 데이터 변경을 모든 저장소 구독자에게 알린다.
const emitChange = () => listeners.forEach((listener) => listener());

// 브라우저 로컬 스토리지의 노트 데이터를 최초 한 번 불러온다.
const hydrateFromStorage = () => {
  if (isHydrated || typeof window === "undefined") return;
  isHydrated = true;

  try {
    const storedNotes = window.localStorage.getItem(STORAGE_KEY);
    if (!storedNotes) return;

    const parsedNotes: unknown = JSON.parse(storedNotes);
    if (Array.isArray(parsedNotes)) notes = parsedNotes as NoteMock[];
  } catch {
    notes = INITIAL_NOTES;
  }
};

// 변경된 노트 목록을 로컬 스토리지에 저장하고 구독자에게 알린다.
const commitNotes = (nextNotes: NoteMock[]) => {
  hydrateFromStorage();

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextNotes));
  } catch {
    return false;
  }

  notes = nextNotes;
  emitChange();
  return true;
};

// 컴포넌트를 노트 저장소 변경 알림에 등록한다.
const subscribe = (listener: () => void) => {
  listeners.add(listener);
  hydrateFromStorage();

  return () => listeners.delete(listener);
};

// 클라이언트에서 현재 노트 목록을 반환한다.
const getSnapshot = () => notes;

// 서버 렌더링에서 사용할 초기 노트 목록을 반환한다.
const getServerSnapshot = () => INITIAL_NOTES;

// React 컴포넌트에서 현재 노트 목록을 구독한다.
export function useNotesStore() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

// 지정한 노트의 즐겨찾기 상태를 반전해 저장한다.
export function toggleNoteFavorite(id: number) {
  hydrateFromStorage();
  return commitNotes(notes.map((note) => (note.id === id ? { ...note, isFavorite: !note.isFavorite } : note)));
}
