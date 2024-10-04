"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function CustomErrorPage({
  statusCode,
}: {
  statusCode: number;
}) {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  // Ensure the component is mounted before using the router
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Function to reset the app, either reload or navigate
  const handleReset = () => {
    if (isMounted) {
      router.refresh(); // Reload the current page only when mounted
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="max-w-lg text-center">
        <h1 className="text-9xl font-bold text-red-500">{statusCode}</h1>
        <h2 className="mt-4 text-3xl font-bold text-gray-800">
          Oops! Something Went Wrong
        </h2>
        <p className="mt-2 text-gray-600">
          An unexpected error has occurred. Try refreshing the page or return to
          the homepage.
        </p>

        <button
          onClick={handleReset}
          className="mt-6 inline-block rounded-lg bg-red-500 px-6 py-3 text-white hover:bg-red-600"
        >
          Reset Page
        </button>

        <div className="mt-6">
          <Image
            src="/error/unexpectedError.svg"
            alt="Unexpected Error"
            className="mx-auto w-64"
            width={0}
            height={0}
            sizes="100vh"
          />
        </div>

        <div className="mt-6">
          <a href="/" className="text-blue-500 hover:underline">
            Go Back to Homepage
          </a>
        </div>
      </div>
    </div>
  );
}
