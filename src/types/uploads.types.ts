// api request

export type PostImageUploadUrlRequest = {
  fileName: string;
};

export type PostFileUploadUrlRequest = {
  fileName: string;
};

// api response

export type UploadUrlResponse = {
  uploadUrl: string;
  url: string;
};
