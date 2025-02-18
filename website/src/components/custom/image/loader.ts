"use client";

import { ImageLoaderProps } from "next/image";

const imageLoader = ({ src, width, quality }: ImageLoaderProps) => {
  // ローカル画像を変換APIに渡す
  return `/api/image/loader?src=${src}&w=${width}&q=${quality || 75}`;
};

export default imageLoader;