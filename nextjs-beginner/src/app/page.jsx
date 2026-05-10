import { Button } from "../components/ui/button";
import { ArrowRight, Code2, Layers, Zap, Github, Twitter } from "lucide-react";
import Navbar from "../components/Navbar";

const features = [
  {
    icon: <Zap className="size-6" />,
    title: "Lightning Fast",
    description:
      "Built with Next.js 16 and React 19 for the best performance out of the box.",
  },
  {
    icon: <Layers className="size-6" />,
    title: "Component Driven",
    description: "Composable UI with shadcn/ui components and Tailwind CSS v4.",
  },
  {
    icon: <Code2 className="size-6" />,
    title: "Developer Experience",
    description:
      "TypeScript, ESLint, and a clean project structure to keep you productive.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative flex flex-col items-center justify-center text-center px-6 py-24 gap-6 overflow-hidden">
          {/* Mesh gradient blobs */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-indigo-500/40 blur-[100px]" />
            <div className="absolute top-10 right-0 h-80 w-80 rounded-full bg-violet-500/35 blur-[100px]" />
            <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-400/30 blur-[100px]" />
          </div>

          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-1 text-xs text-muted-foreground backdrop-blur-sm">
            <Zap className="size-3" />
            Next.js 16 + shadcn/ui
          </span>

          <h1 className="text-5xl font-extrabold tracking-tight max-w-2xl leading-tight">
            Build beautiful apps{" "}
            <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400 bg-clip-text text-transparent">
              faster than ever
            </span>
          </h1>

          <p className="text-muted-foreground text-lg max-w-xl">
            A minimal Next.js starter with shadcn/ui, Tailwind CSS v4, and React
            19. Everything you need to ship your next idea.
          </p>

          <div className="flex items-center gap-3 flex-wrap justify-center">
            <Button size="lg">
              Get Started
              <ArrowRight className="size-4" />
            </Button>
            <Button variant="outline" size="lg">
              View on GitHub
              <Github className="size-4" />
            </Button>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="px-6 py-16 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">
            Why this starter?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-border bg-card p-6 flex flex-col gap-3"
              >
                <div className="text-primary">{feature.icon}</div>
                <h3 className="font-semibold text-base">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        {/* <section
          id="cta"
          className="px-6 py-20 flex flex-col items-center text-center gap-6 bg-muted/50"
        >
          <h2 className="text-3xl font-bold max-w-md">
            Ready to start building?
          </h2>
          <p className="text-muted-foreground max-w-sm">
            Clone the repo, run{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">
              npm run dev
            </code>
            , and you&apos;re live in seconds.
          </p>
          <Button size="lg">
            Start Now
            <ArrowRight className="size-4" />
          </Button>
        </section> */}
      </main>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-6 flex items-center justify-between text-sm text-muted-foreground">
        <span>© 2026 NextStarter</span>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-foreground transition-colors">
            <Twitter className="size-4" />
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            <Github className="size-4" />
          </a>
        </div>
      </footer>
    </div>
  );
}
