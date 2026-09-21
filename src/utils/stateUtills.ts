import type { Dispatch, SetStateAction } from "react";

/**
 * 객체 state의 특정 key에 대해 setState 핸들러를 반환하는 유틸
 * @param setState
 * @returns 전달받은 key에 해당하는 값을 변경하는 setState 핸들러를 반환합니다.
 * @example
 * // user 상태가 { name: string; age: number } 라고 가정할 때:
 * const setUserByKey = createStateKeySetter(setUser);
 * setUserByKey('name')('이원빈');// setUser(prev => ({ ...prev, name: '이원빈' }))
 * setUserByKey('age')(25);// setUser(prev => ({ ...prev, age: 25 }))
 */
export function createStateKeySetter<T>(setState: Dispatch<SetStateAction<T>>) {
  return <K extends keyof T>(key: K) =>
    (value: T[K]) => {
      setState((prev) => ({ ...prev, [key]: value }));
    };
}
