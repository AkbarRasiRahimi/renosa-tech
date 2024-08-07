import Link from "next/link";
import React from "react";

function NotFound() {
  return (
    <div className="absolute text-center max-w-72 bg-base-100 p-10 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">404 Failed</h1>
      <p className="text-base-content mb-6"> Page Not Found </p>
      <Link href={"/"} className="btn btn-primary w-full">
        Main Page
      </Link>
    </div>
  );
}

export default NotFound;
