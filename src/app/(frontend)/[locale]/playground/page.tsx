import { Button } from '@/components/ui/button'

const Sample = () => {
  return (
    <div className="p-4 border-2 border-dashed border-foreground rounded-lg bg-background text-foreground">
      <div className="w-full min-h-64">
        <div>
          <h1>H1 tag</h1>
          <h2>H2 tag</h2>
          <h3>H3 tag</h3>
          <p>
            This is normal text. It&apos;s regular and has 5% spacing. It&apos;s made of charcoal.
          </p>
          <p className="text-muted-foreground">This is muted text</p>
          <div className="flex gap-2">
            <Button variant={'default'}>Default</Button>
            <Button variant={'destructive'}>Destructive</Button>
            <Button variant={'ghost'}>Ghost</Button>
            <Button variant={'link'}>Link</Button>
            <Button variant={'outline'}>Outline</Button>
            <Button variant={'secondary'}>Secondary</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <div className="flex flex-col gap-4 p-2">
      <div>
        <Sample />
      </div>
      <div className="dark">
        <Sample />
      </div>
    </div>
  )
}
