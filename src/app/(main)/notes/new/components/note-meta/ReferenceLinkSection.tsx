import MetaSection from "./MetaSection";
import { Link as LinkIcon } from "@/assets/icons";
import TextInput from "@/components/ui/TextInput";

interface ReferenceLinkSectionProps {
  linkUrl: string;
  linkUrlError: string;
  isDisabled: boolean;
  onChange: (value: string) => void;
  onBlur: () => void;
}

/** 노트와 함께 저장할 참고 링크를 입력하는 영역이다. */
export default function ReferenceLinkSection({
  linkUrl,
  linkUrlError,
  isDisabled,
  onChange,
  onBlur,
}: ReferenceLinkSectionProps) {
  return (
    <MetaSection
      icon={<LinkIcon className="size-20" />}
      title="참고 링크"
      description="노트와 함께 저장할 웹페이지 주소를 입력해 주세요."
    >
      <TextInput
        type="url"
        inputMode="url"
        autoComplete="url"
        placeholder="https://example.com"
        value={linkUrl}
        error={linkUrlError}
        disabled={isDisabled}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
      />
    </MetaSection>
  );
}
