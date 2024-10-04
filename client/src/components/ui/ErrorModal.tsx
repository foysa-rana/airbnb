// components/ErrorModal.tsx
import React from "react";

interface ErrorModalProps {
  errorMessage: string;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ errorMessage }) => {
  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded fixed z-50 top-80 left-1/2 -translate-x-1/2 min-w-96 text-center"
      role="alert"
    >
      <span className="block sm:inline">{errorMessage}</span>
    </div>
  );
};

export default ErrorModal;
