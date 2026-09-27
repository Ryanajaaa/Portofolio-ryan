import { cn } from "@/lib/utils";

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-14 flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className
      )}
    >
      <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
        {eyebrow}
      </span>
      <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="max-w-xl text-sm leading-relaxed text-muted md:text-base">
          {description}
        </p>
      )}
    </div>
  );
}
