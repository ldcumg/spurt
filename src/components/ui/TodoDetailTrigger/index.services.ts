import { getFileName } from "./index.utils";
import { clientFetcher } from "@/lib/axios/clientFetcher";

export const downloadFile = async (fileUrl: string) => {
  try {
    const { data } = await clientFetcher.get(fileUrl, {
      responseType: "blob",
    });
    const blobUrl = URL.createObjectURL(data);

    const anchor = document.createElement("a");
    anchor.href = blobUrl;
    anchor.download = getFileName(fileUrl, "download");
    anchor.click();

    URL.revokeObjectURL(blobUrl);
  } catch (error) {
    alert("파일 다운로드를 실패 했습니다.");
    console.error(error);
  }
};
