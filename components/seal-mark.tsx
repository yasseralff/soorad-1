import { Heart } from 'lucide-react'
import { cn } from '@/lib/utils'

// A small wax-seal style badge with a heart, used as the product mark.
export function SealMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'relative inline-flex size-14 items-center justify-center rounded-full bg-wax text-wax-foreground shadow-md',
        "before:absolute before:inset-1 before:rounded-full before:border before:border-wax-foreground/30 before:content-['']",
        className,
      )}
      aria-hidden="true"
    >
      <Heart className="size-6 fill-current" />
    </span>
  )
}
