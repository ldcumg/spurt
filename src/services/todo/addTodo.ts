export const handleSubmit = (
  e: React.SubmitEvent<HTMLFormElement>,
  formRef: React.RefObject<HTMLFormElement | null>,
) => {
  e.preventDefault();

  //TODO - 파일 url 발금 로직

  const formData = new FormData(formRef.current!);

  const newTodo = {
    title: formData.get("title"),
    goalId: formData.get("goalId"),
    fileUrl: "",
    linkUrl: formData.get("linkUrl"),
  };

  console.log(newTodo);
};
