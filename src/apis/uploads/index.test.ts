import { uploadImage } from ".";
import { clientFetcher } from "@/lib/axios/clientFetcher";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/axios/clientFetcher", () => ({
  clientFetcher: { post: vi.fn() },
}));

const uploadUrlResponse = {
  data: {
    uploadUrl: "https://storage.example.com/presigned",
    url: "https://cdn.example.com/note.png",
  },
} as unknown as Awaited<ReturnType<typeof clientFetcher.post>>;

describe("uploadImage", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("업로드 URL을 발급받아 파일을 PUT하고 최종 URL을 반환한다", async () => {
    const file = new File(["image"], "note.png", { type: "image/png" });
    vi.mocked(clientFetcher.post).mockResolvedValue(uploadUrlResponse);
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(null, { status: 200 }));

    await expect(uploadImage(file)).resolves.toBe("https://cdn.example.com/note.png");
    expect(clientFetcher.post).toHaveBeenCalledWith("/images", { fileName: "note.png" });
    expect(fetchMock).toHaveBeenCalledWith("https://storage.example.com/presigned", {
      method: "PUT",
      headers: { "Content-Type": "image/png" },
      body: file,
    });
  });

  it("파일 PUT이 실패하면 최종 URL을 반환하지 않는다", async () => {
    const file = new File(["image"], "note.png", { type: "image/png" });
    vi.mocked(clientFetcher.post).mockResolvedValue(uploadUrlResponse);
    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(null, { status: 500 }));

    await expect(uploadImage(file)).rejects.toThrow("이미지 파일 업로드에 실패했습니다. (500)");
  });
});
