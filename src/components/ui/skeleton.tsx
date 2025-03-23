import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-gray-6/50 dark:bg-gray-11/50", className)}
      {...props}
    />
  )
}

export { Skeleton }
