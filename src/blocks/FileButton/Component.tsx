import { Button } from '@/components/ui/button'
import { File, FileButton } from '@/payload-types'
import Link from 'next/link'
import { Download } from 'lucide-react'

export function FileButtonComponent({ buttonText, fullWidth, file }: FileButton) {
  return (
    <div className="max-w-[1024px] mx-auto p-4">
      <Button asChild className={`${fullWidth ? 'w-full' : ''}`}>
        <Link href={(file as File).url ?? ''} download={true}>
          <Download />
          {buttonText}
        </Link>
      </Button>
    </div>
  )
}
