// components/slider/SliderNewsWrapper.tsx
"use client";

import dynamic from "next/dynamic";

const SliderNews = dynamic(
  () => import("./SliderNews").then((mod) => mod.SliderNews),
  {
    loading: () => (
      <div className="h-96 w-full rounded-lg bg-gray-200 animate-pulse" />
    ),
    ssr: false,
  }
);

export default function SliderNewsWrapper(props: any) {
  return <SliderNews {...props} />;
}