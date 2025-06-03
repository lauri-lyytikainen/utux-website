import { SiteLinkComponent } from '@/components/Link/SiteLink'
import { Button } from '@/components/ui/button'
import { LinkButton, SiteLink } from '@/payload-types'

export function LinkButtonComponent({ buttonText, link, fullWidth }: LinkButton) {
  return (
    <div className="max-w-[1024px] mx-auto p-4">
      <Button asChild className={`${fullWidth ? 'w-full' : ''}`}>
        <SiteLinkComponent linkObject={link as SiteLink} text={buttonText} />
      </Button>
    </div>
  )
}
