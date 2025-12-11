
export type ImageMimeType = "image/png" | "image/jpeg" | "image/webp";

export interface ImageParts {
  mimeType: ImageMimeType;
  data: string;
}
