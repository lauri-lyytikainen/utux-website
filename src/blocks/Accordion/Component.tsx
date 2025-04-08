import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Accordion as AccordionType } from '@/payload-types'
import jsxConverters from '@/utilities/richTextConverter'
import { RichText } from '@payloadcms/richtext-lexical/react'

export function AccordionComponent({ accordions }: AccordionType) {
  return (
    <div className="max-w-[1024px] mx-auto p-4">
      <Accordion type="single" collapsible className="w-full">
        {accordions?.map((accordion, index) => {
          return (
            <AccordionItem value={accordion.title + '-' + index} key={index}>
              <AccordionTrigger>
                <h2>{accordion.title}</h2>
              </AccordionTrigger>
              <AccordionContent>
                {accordion.content && (
                  <RichText data={accordion.content} converters={jsxConverters} />
                )}
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
    </div>
  )
}
