import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="mx-auto mt-auto w-full border-t px-2 py-4 text-center">
      <p className="text-foreground/80 text-xs">
        2025 &copy; Odin Project Assignment by{' '}
        <Link
          to="https://github.com/JamesChan"
          target="_blank"
          aria-label="Go to author's Github repository"
          className="hover:text-foreground focus:text-foreground focus-visible:ring-ring relative rounded-md font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        >
          James Chen
          <span className="sr-only">Open in new tab</span>
        </Link>
        . All rights reserved.
      </p>
    </footer>
  );
}
