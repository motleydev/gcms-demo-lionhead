import Container from "./container";
import { EXAMPLE_PATH } from "../lib/constants";

export default function Footer() {
  return (
    <footer className="py-6 border-t bg-accent-1 border-accent-2">
      <Container>
        <div className="flex flex-col items-center py-28 lg:flex-row">
          <div className="flex flex-col items-center justify-center lg:flex-row lg:pl-4 lg:w-1/2">
            <a
              href="https://graphcms.com/docs/guides/concepts/preview-urls"
              className="px-12 py-3 mx-3 mb-6 font-bold text-white transition-colors duration-200 bg-black border border-black hover:bg-white hover:text-black lg:px-8 lg:mb-0"
            >
              Read Documentation
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
