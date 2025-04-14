import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="rounded-lg bg-white p-8 text-center shadow-md">
        <h1 className="mb-4 text-2xl font-bold text-red-500">
          404 - Page Not Found
        </h1>
        <p className="mb-6 text-gray-700">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="rounded bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
