// Simple Error Message Component
import React from "react";

const ErrorMsg = ({ msg }: { msg?: string }) => {
  return (
    <>
      {msg && (
        <span className="text-red-500 text-sm mt-1 block">{msg}</span>
      )}
    </>
  );
};

export default ErrorMsg; 