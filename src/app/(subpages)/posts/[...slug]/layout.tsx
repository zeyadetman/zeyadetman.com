export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <article className="full-article">{children}</article>;
}
