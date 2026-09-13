import type { ImageLoaderProps } from "next/image";

export default function localImageLoader({ src }: ImageLoaderProps): string {
  return src;
}
