import Link from "next/link";
import Container from "components/container";

const links = [
  { href: "https://github.com/vercel/next.js", label: "GitHub" },
  { href: "https://nextjs.org/docs", label: "Exit Preview" },
];

export default function Nav({ preview }) {
  return (
    <nav>
      <Container>
        <ul className="flex items-center justify-between p-8">
          <li>
            <Link href="/">
              <a className="text-gray-900 no-underline">Home</a>
            </Link>
          </li>
          {preview && (
            <li>
              <a
                href="/api/exit-preview"
                className="px-4 py-2 text-white no-underline bg-gray-900 rounded-md"
              >
                Exit Preview Mode
              </a>
            </li>
          )}
        </ul>
      </Container>
    </nav>
  );
}
