"use client";

import { Check, Under } from "@/assets/icons";
import { twMerge } from "@/lib/twMerge";
import { useEffect, useId, useRef, useState } from "react";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

/**
 * <select>의 브라우저 기본 UI 대신 프로젝트의 디자인을 적용하기 위해 만든 단일 선택 컴포넌트다.
 * 방향키, Home/End, Escape와 바깥 영역 클릭을 지원한다.
 *
 * value를 컴포넌트 내부에서 보관하지 않는 제어 컴포넌트다. 사용자가 옵션을
 * 선택하면 onChange를 호출하고, 부모가 전달한 value가 바뀌면서 화면도 갱신된다.
 *
 * @example
 * const [sortOrder, setSortOrder] = useState("recent");
 *
 * <Select
 *   label="정렬 순서"
 *   options={[
 *     { value: "recent", label: "최신순" },
 *     { value: "oldest", label: "오래된순" },
 *   ]}
 *   value={sortOrder}
 *   onChange={setSortOrder}
 * />
 */
export default function Select({
  label,
  options,
  value,
  onChange,
  placeholder = "선택해 주세요",
  disabled = false,
  className,
}: SelectProps) {
  // 옵션 목록이 화면에 열려 있는지만 컴포넌트 내부 상태로 관리한다.
  const [isOpen, setIsOpen] = useState(false);

  // value와 같은 옵션의 위치를 찾는다. 일치하는 옵션이 없으면 findIndex는 -1을 반환한다.
  const selectedIndex = options.findIndex((option) => option.value === value);

  // activeIndex는 키보드 포커스가 위치한 옵션이다. 실제 선택값인 selectedIndex와는 역할이 다르다.
  // 예를 들어 방향키로 다른 옵션에 이동해도 Enter를 누르기 전까지 value는 바뀌지 않는다.
  const [activeIndex, setActiveIndex] = useState(Math.max(selectedIndex, 0));

  // containerRef는 클릭한 곳이 Select 안인지 밖인지 판별할 때 사용한다.
  const containerRef = useRef<HTMLDivElement>(null);

  // 옵션을 선택하거나 Escape를 누른 뒤 포커스를 다시 트리거 버튼으로 돌려보내기 위한 ref다.
  const triggerRef = useRef<HTMLButtonElement>(null);

  // 방향키 이동 시 특정 옵션 버튼에 직접 focus()를 호출할 수 있도록 각 버튼을 배열로 보관한다.
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);

  // 한 화면에 Select가 여러 개 있어도 ARIA id가 겹치지 않도록 React가 고유 id를 만든다.
  const generatedId = useId();
  const triggerId = `${generatedId}-trigger`;
  const listboxId = `${generatedId}-listbox`;

  // 현재 value에 해당하는 전체 옵션 객체다. 값이 잘못되었으면 undefined가 된다.
  const selectedOption = options[selectedIndex];

  // 컴포넌트 바깥을 클릭하거나 터치하면 열린 목록을 닫는다.
  // pointerdown은 마우스와 터치를 모두 다루므로 각각의 이벤트를 따로 등록할 필요가 없다.
  useEffect(() => {
    const handleOutsidePointerDown = (event: PointerEvent) => {
      // event.target이 바깥 요소일 때만 닫는다. Select 내부 클릭은 이후 click 이벤트가 처리한다.
      if (!containerRef.current?.contains(event.target as Node)) setIsOpen(false);
    };

    document.addEventListener("pointerdown", handleOutsidePointerDown);

    // 컴포넌트가 사라질 때 전역 이벤트를 제거해 중복 실행과 메모리 누수를 막는다.
    return () => document.removeEventListener("pointerdown", handleOutsidePointerDown);
  }, []);

  /** 전달받은 위치의 옵션을 활성화하고 실제 DOM 포커스도 함께 이동한다. */
  const focusOption = (index: number) => {
    // 옵션이 없을 때 나머지 계산을 하면 나머지 연산의 결과가 NaN이 되므로 먼저 종료한다.
    if (options.length === 0) return;

    // 양 끝에서 방향키를 계속 누르면 반대편으로 순환한다.
    // options.length를 먼저 더하면 index가 -1이어도 양수 범위로 안전하게 보정할 수 있다.
    const nextIndex = (index + options.length) % options.length;
    setActiveIndex(nextIndex);

    // 목록을 처음 열 때는 setIsOpen 이후에 옵션 DOM이 생성된다.
    // requestAnimationFrame으로 다음 브라우저 렌더 시점까지 기다린 뒤 focus()를 호출한다.
    requestAnimationFrame(() => optionRefs.current[nextIndex]?.focus());
  };

  /** 옵션 목록을 열고 선택된 옵션 또는 전달받은 옵션으로 포커스를 이동한다. */
  const openListbox = (index = Math.max(selectedIndex, 0)) => {
    // 비활성 상태이거나 보여 줄 옵션이 없으면 빈 목록을 열지 않는다.
    if (disabled || options.length === 0) return;

    setIsOpen(true);
    focusOption(index);
  };

  /** 옵션 목록을 닫는다. 필요한 경우 트리거 버튼에 포커스를 복원한다. */
  const closeListbox = (restoreFocus = false) => {
    setIsOpen(false);

    // 옵션 목록이 DOM에서 사라진 다음 포커스를 옮겨야 하므로 다음 렌더 시점까지 기다린다.
    if (restoreFocus) requestAnimationFrame(() => triggerRef.current?.focus());
  };

  /** 옵션 선택을 부모에게 알리고 목록을 닫은 뒤 트리거로 포커스를 돌려보낸다. */
  const handleSelect = (option: SelectOption) => {
    // 실제 value 변경은 부모가 담당한다. 이 컴포넌트는 선택된 value만 전달한다.
    onChange(option.value);
    closeListbox(true);
  };

  return (
    <div
      ref={containerRef}
      // relative는 아래의 absolute 옵션 패널이 이 컨테이너를 기준으로 배치되게 한다.
      // twMerge를 사용해 호출부의 className이 기본 너비 등을 안전하게 덮어쓸 수 있게 한다.
      className={twMerge("relative inline-block min-w-160", className)}
    >
      <button
        ref={triggerRef}
        id={triggerId}
        type="button"
        // aria-haspopup은 이 버튼이 listbox를 연다는 사실을 보조 기술에 알려준다.
        aria-haspopup="listbox"
        // aria-expanded는 옵션 목록이 현재 열려 있는지 알려준다.
        aria-expanded={isOpen}
        // aria-controls는 트리거와 아래 listbox의 id를 연결한다.
        aria-controls={listboxId}
        disabled={disabled}
        // 마우스 클릭으로 같은 버튼에서 열기와 닫기를 전환한다.
        onClick={() => (isOpen ? closeListbox() : openListbox())}
        onKeyDown={(event) => {
          // 아래 방향키는 현재 선택값부터 목록을 연다. 선택값이 없으면 첫 옵션에서 시작한다.
          if (event.key === "ArrowDown") {
            event.preventDefault();
            openListbox(selectedIndex >= 0 ? selectedIndex : 0);
          }

          // 위 방향키는 선택값부터 열고, 선택값이 없으면 마지막 옵션에서 시작한다.
          if (event.key === "ArrowUp") {
            event.preventDefault();
            openListbox(selectedIndex >= 0 ? selectedIndex : options.length - 1);
          }

          // 목록이 열려 있을 때 Escape를 누르면 선택값을 바꾸지 않고 닫는다.
          if (event.key === "Escape" && isOpen) {
            event.preventDefault();
            closeListbox();
          }
        }}
        className="border-input-border bg-surface-card hover:border-primary-300 focus-visible:border-primary-500 focus-visible:ring-primary-100 flex h-44 w-full cursor-pointer items-center gap-8 rounded-xl border px-12 text-left shadow-sm transition-[border-color,box-shadow] duration-150 outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {/* 필드 이름과 현재 값을 분리해 "정렬 순서 | 최신순"처럼 읽히게 한다. */}
        <span className="text-caption shrink-0 font-semibold text-neutral-500">{label}</span>
        <span
          // 장식용 구분선은 스크린 리더가 읽지 않도록 숨긴다.
          aria-hidden="true"
          className="bg-border h-16 w-px shrink-0"
        />
        <span className="text-body-md text-foreground-title min-w-0 flex-1 truncate font-semibold">
          {/* 잘못된 value나 빈 value가 전달되면 옵션 이름 대신 placeholder를 보여준다. */}
          {selectedOption?.label ?? placeholder}
        </span>
        <span className="bg-primary-50 text-primary-600 flex size-28 shrink-0 items-center justify-center rounded-lg">
          {/* 열림 상태에서는 화살표를 위쪽으로 회전해 현재 상태를 시각적으로 표현한다. */}
          <Under className={twMerge("size-16 transition-transform duration-150", isOpen && "rotate-180")} />
        </span>
      </button>

      {/* 닫힌 상태에서는 옵션 패널 자체를 DOM에서 제거한다. */}
      {isOpen && (
        <div className="border-input-border bg-surface-card absolute top-[calc(100%+8px)] right-0 z-50 w-full min-w-max origin-top overflow-hidden rounded-xl border p-4 shadow-lg transition-[opacity,transform] duration-150 starting:-translate-y-4 starting:scale-95 starting:opacity-0">
          <div
            id={listboxId}
            // listbox/option 역할을 사용해 일반 버튼 묶음이 아니라 단일 선택 목록임을 전달한다.
            role="listbox"
            // 별도의 보이는 목록 제목 대신 트리거 버튼을 이 목록의 이름으로 연결한다.
            aria-labelledby={triggerId}
            className="flex flex-col gap-2"
          >
            {options.map((option, index) => {
              // 포커스 여부와 관계없이 실제 value가 같은 옵션만 선택 스타일을 사용한다.
              const isSelected = option.value === value;

              return (
                <button
                  key={option.value}
                  ref={(element) => {
                    optionRefs.current[index] = element;
                  }}
                  type="button"
                  role="option"
                  // 스크린 리더가 현재 선택된 한 항목을 구분할 수 있게 한다.
                  aria-selected={isSelected}
                  // 활성 옵션 하나만 Tab 순서에 둔다. 이를 roving tabindex 패턴이라고 한다.
                  tabIndex={activeIndex === index ? 0 : -1}
                  // 마우스와 키보드가 번갈아 사용되어도 활성 위치가 현재 항목과 일치하게 한다.
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onClick={() => handleSelect(option)}
                  onKeyDown={(event) => {
                    // 아래/위 방향키로 다음/이전 옵션에 포커스를 옮긴다.
                    if (event.key === "ArrowDown") {
                      event.preventDefault();
                      focusOption(index + 1);
                    }

                    if (event.key === "ArrowUp") {
                      event.preventDefault();
                      focusOption(index - 1);
                    }

                    // Home과 End는 각각 첫 옵션과 마지막 옵션으로 바로 이동한다.
                    if (event.key === "Home") {
                      event.preventDefault();
                      focusOption(0);
                    }

                    if (event.key === "End") {
                      event.preventDefault();
                      focusOption(options.length - 1);
                    }

                    // Escape는 선택을 취소하고 목록을 닫은 뒤 트리거로 돌아간다.
                    if (event.key === "Escape") {
                      event.preventDefault();
                      closeListbox(true);
                    }

                    // Tab의 기본 포커스 이동은 유지하되 열린 패널만 닫는다.
                    if (event.key === "Tab") closeListbox();
                  }}
                  className={twMerge(
                    "text-body-md focus-visible:bg-primary-50 flex h-40 min-w-152 cursor-pointer items-center justify-between gap-12 rounded-lg px-12 text-left font-semibold text-neutral-700 transition-colors outline-none",
                    isSelected ? "bg-primary-100 text-primary-700" : "hover:bg-primary-50 hover:text-primary-700",
                  )}
                >
                  <span className="whitespace-nowrap">{option.label}</span>
                  {/* 모든 행의 폭을 같게 유지하기 위해 체크가 없어도 동일한 아이콘 공간을 확보한다. */}
                  <span className="flex size-20 shrink-0 items-center justify-center">
                    {isSelected && <Check className="text-primary-600 size-18" />}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
