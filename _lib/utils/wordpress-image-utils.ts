import type { ImageLoaderProps } from "next/image";
import type { WordpressImage } from "@/_types/property-types";

const FRAGMENT_KEY = "#wpsizes=";

function getCandidates(image: WordpressImage) {
  const derivatives = Object.values(image.sizes ?? {})
    .filter((size) => size?.url && typeof size.width === "number")
    .map((size) => ({ width: size.width, url: size.url }));

  if (!derivatives.length) return [];

  const widest = Math.max(...derivatives.map((candidate) => candidate.width));
  const candidates = [
    ...derivatives,
    { width: widest + 1, url: image.full_url },
  ].sort((a, b) => a.width - b.width);

  return candidates.filter(
    (candidate, index) =>
      index === 0 || candidate.width !== candidates[index - 1].width,
  );
}

export function wordpressImageSrc(image: WordpressImage): string {
  const candidates = getCandidates(image);
  if (!candidates.length) return image.full_url;

  const encoded = candidates
    .map((candidate) => `${candidate.width}|${candidate.url}`)
    .join(",");

  return `${image.full_url}${FRAGMENT_KEY}${encodeURIComponent(encoded)}`;
}

export function wordpressImageLoader({ src, width }: ImageLoaderProps): string {
  const index = src.indexOf(FRAGMENT_KEY);
  if (index === -1) return src;

  const candidates = decodeURIComponent(src.slice(index + FRAGMENT_KEY.length))
    .split(",")
    .map((entry) => {
      const separator = entry.indexOf("|");
      return {
        width: Number(entry.slice(0, separator)),
        url: entry.slice(separator + 1),
      };
    });

  if (!candidates.length) return src.slice(0, index);

  const match = candidates.find((candidate) => candidate.width >= width);

  return (match ?? candidates[candidates.length - 1]).url;
}
