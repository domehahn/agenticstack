"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import type { NavItem } from "@/config/navigation";

export function MobileNav({ items }: { items: NavItem[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    function onClick(event: MouseEvent) {
      if (event.target === dialogRef.current) dialogRef.current?.close();
    }
    dialog.addEventListener("click", onClick);
    return () => dialog.removeEventListener("click", onClick);
  }, []);

  return (
    <div className="sm:hidden">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label="Open navigation menu"
        onClick={() => dialogRef.current?.showModal()}
      >
        <Menu className="h-5 w-5" aria-hidden="true" />
      </Button>
      <dialog
        ref={dialogRef}
        aria-label="Navigation menu"
        className="m-0 h-full max-h-none w-full max-w-none border-none bg-background p-0 text-foreground backdrop:bg-foreground/20"
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <span className="font-mono text-sm font-semibold">Menu</span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Close navigation menu"
            onClick={() => dialogRef.current?.close()}
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </Button>
        </div>
        <nav className="px-6 py-4">
          <ul className="flex flex-col gap-1">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => dialogRef.current?.close()}
                  className="block rounded-md px-2 py-3 text-lg font-medium hover:bg-surface"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </dialog>
    </div>
  );
}
