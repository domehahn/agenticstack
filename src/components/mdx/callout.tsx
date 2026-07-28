import { AlertTriangle, Building2, Info, Lightbulb } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

type CalloutVariant = "note" | "warning" | "architecture" | "key-takeaway";

const variantStyles: Record<
  CalloutVariant,
  { icon: typeof Info; label: string; className: string }
> = {
  note: {
    icon: Info,
    label: "Note",
    className: "border-border bg-surface",
  },
  warning: {
    icon: AlertTriangle,
    label: "Warning",
    className: "border-destructive/40 bg-destructive/5",
  },
  architecture: {
    icon: Building2,
    label: "Architecture",
    className: "border-accent/40 bg-accent/5",
  },
  "key-takeaway": {
    icon: Lightbulb,
    label: "Key takeaway",
    className: "border-accent/40 bg-surface-elevated",
  },
};

function BaseCallout({
  variant,
  children,
}: {
  variant: CalloutVariant;
  children: ReactNode;
}) {
  const { icon: Icon, label, className } = variantStyles[variant];
  return (
    <aside
      className={cn(
        "not-prose my-6 rounded-md border-l-2 px-5 py-4",
        className,
      )}
    >
      <p className="mb-1.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-foreground">
        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
        {label}
      </p>
      <div className="text-sm leading-relaxed text-foreground/90 [&_p]:m-0">
        {children}
      </div>
    </aside>
  );
}

export function Note({ children }: { children: ReactNode }) {
  return <BaseCallout variant="note">{children}</BaseCallout>;
}

export function Warning({ children }: { children: ReactNode }) {
  return <BaseCallout variant="warning">{children}</BaseCallout>;
}

export function Architecture({ children }: { children: ReactNode }) {
  return <BaseCallout variant="architecture">{children}</BaseCallout>;
}

export function KeyTakeaway({ children }: { children: ReactNode }) {
  return <BaseCallout variant="key-takeaway">{children}</BaseCallout>;
}
