import { Button } from '@/components/ui/button'
import { LinkButton, Page } from '@/payload-types'
import Link from 'next/link'

export function LinkButtonComponent({
  buttonText,
  buttonLink,
  buttonLinkExternal,
  useInternalLink,
  fullWidth,
}: LinkButton) {
  const link = useInternalLink
    ? ((buttonLink as Page).breadcrumbs?.at(-1)?.url ?? '/')
    : buttonLinkExternal
  return (
    <div className="max-w-[1024px] mx-auto p-4">
      <Button asChild className={`${fullWidth ? 'w-full' : ''}`}>
        <Link href={link as string}>{buttonText}</Link>
      </Button>
    </div>
  )
}
