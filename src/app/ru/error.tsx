"use client";

import ErrorContent from "@/components/ErrorContent";

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return <ErrorContent lang="RU" digest={error.digest} retry={retry} />;
}
