"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ExternalLink, Menu } from "lucide-react";

const navItems = [
  { href: "/", label: "Buscar por CI" },
  // { href: "/stats", label: "Actas por estado" },

  { href: "/mapa", label: "GRAN PROTESTA MUNDIAL POR LA VERDAD 📍" },

  {
    href: "https://resultadosconvzla.com/",
    label: "Sitio Oficial",
    variant: "primary",
    external: true,
  },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0">
            <Link href="/" className="text-primary">
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                <h1 className="text-xl sm:text-2xl font-bold leading-tight">
                  Consulta Actas CNE
                </h1>
                <p className="text-xs sm:text-sm font-normal mt-1 sm:mt-0">
                  (Version Independiente)
                </p>
              </div>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 flex items-center gap-1.5",
                    pathname === item.href
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "text-secondary-foreground hover:bg-primary/10 hover:text-primary",

                    // blue if primary

                    item.variant === "primary"
                      ? "bg-blue-600 hover:bg-blue-500 text-white hover:text-white  "
                      : ""
                  )}
                >
                  {item.label}

                  {item.external && <ExternalLink className="h-4 w-4" />}
                </Link>
              ))}
            </div>
          </div>
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="mt-6 flow-root">
                  <div className="space-y-2 py-6">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        target={item.external ? "_blank" : undefined}
                        className={cn(
                          "flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium ",
                          pathname === item.href
                            ? "bg-primary text-primary-foreground"
                            : "text-secondary-foreground hover:bg-primary/10 hover:text-primary",
                          item.variant === "primary"
                            ? "bg-blue-600 hover:bg-blue-500 text-white hover:text-white  "
                            : ""
                        )}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                        {item.external && <ExternalLink className="h-4 w-4" />}
                      </Link>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
