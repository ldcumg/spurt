import MetaSection from "./MetaSection";
import { FlagFilled, Link as LinkIcon, Todos } from "@/assets/icons";
import Dropdown, { type DropDownOption } from "@/components/ui/Dropdown";

interface ConnectionSectionProps {
  goals: DropDownOption[];
  todos: DropDownOption[];
  selectedGoalId: string;
  selectedTodoId: string;
  description: string;
  isGoalDisabled: boolean;
  isTodoDisabled: boolean;
  onGoalChange: (option: DropDownOption) => void;
  onTodoChange: (option: DropDownOption) => void;
  onAddGoal: (label: string) => void;
  onAddTodo: (label: string) => void;
}

/** 노트가 속한 목표와 할 일을 선택하는 연결 정보 영역이다. */
export default function ConnectionSection({
  goals,
  todos,
  selectedGoalId,
  selectedTodoId,
  description,
  isGoalDisabled,
  isTodoDisabled,
  onGoalChange,
  onTodoChange,
  onAddGoal,
  onAddTodo,
}: ConnectionSectionProps) {
  return (
    <MetaSection
      icon={<LinkIcon className="size-20" />}
      title="연결 정보"
      description={description}
    >
      <div className="flex flex-col gap-8">
        <div className="bg-primary-50 rounded-lg p-12">
          <div className="mb-8 flex items-center gap-8">
            <FlagFilled className="text-warning size-20" />
            <strong className="text-title-xs">목표</strong>
          </div>
          <Dropdown
            options={goals}
            value={selectedGoalId}
            disabled={isGoalDisabled}
            onChange={onGoalChange}
            onAddOption={onAddGoal}
          />
        </div>
        <div className="bg-blue-light rounded-lg p-12">
          <div className="mb-8 flex items-center gap-8">
            <Todos className="text-information size-20" />
            <strong className="text-title-xs">할 일</strong>
          </div>
          <Dropdown
            variant="todo"
            options={todos}
            value={selectedTodoId}
            placeholder={selectedGoalId ? undefined : "먼저 목표를 추가해 주세요"}
            disabled={!selectedGoalId || isTodoDisabled}
            onChange={onTodoChange}
            onAddOption={onAddTodo}
          />
        </div>
      </div>
    </MetaSection>
  );
}
