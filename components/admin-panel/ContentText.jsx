"use client";

import { useContentStore } from "./ContentProvider";

export default function ContentText({ section, name, fallback = "", as: Tag = "span", className = "" }) {
  const { store, loading } = useContentStore();

  let text = fallback;
  if (!loading) {
    const value = store?.content?.[section]?.[name];
    if (value !== undefined && value !== null && value !== "") {
      text = value;
    }
  }

  return <Tag className={className}>{text}</Tag>;
}