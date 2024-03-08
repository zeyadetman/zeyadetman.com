import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>404</h1>
        <h2>Page Not Found</h2>
      </div>

      <Link href="/" className="link">
        Return Home
      </Link>
    </div>
  );
}
