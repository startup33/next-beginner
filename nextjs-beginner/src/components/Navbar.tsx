import { Github } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="border-b border-border px-6 py-4 flex items-center justify-between">
      <span className="font-bold text-lg tracking-tight">NextStarter</span>
      <nav className="flex items-center gap-4">
        <Link
          href="/products"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Products
        </Link>
        <Link
          href="#features"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Features
        </Link>
        <Link
          href="#cta"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Get Started
        </Link>
        <Button variant="outline" size="sm">
          <Github className="size-4" />
          GitHub
        </Button>
      </nav>
    </header>
  );
};

export default Navbar;
