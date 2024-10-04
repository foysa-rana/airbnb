/* eslint-disable react/no-unescaped-entities */
"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Custom404() {
  const router = useRouter();

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-red-500">404</h1>
        <h2 className="mt-4 text-3xl font-bold text-gray-800">
          Page Not Found
        </h2>
        <p className="mt-2 text-gray-600">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>

        <button
          onClick={() => router.push("/")}
          className="mt-6 inline-block rounded-lg bg-blue-500 px-6 py-3 text-white hover:bg-blue-600"
        >
          Go Back Home
        </button>

        <div className="mt-6">
          <Image
            src="/error/_404.svg"
            alt="Page Not Found"
            className="mx-auto w-64"
            width={0}
            height={0}
            sizes="100vh"
          />
        </div>

        <div className="mt-6">
          <a href="/" className="text-blue-500 hover:underline">
            Return to Homepage
          </a>
        </div>
      </div>
    </div>
  );
}
