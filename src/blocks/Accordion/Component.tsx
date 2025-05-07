import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Separator } from '@/components/ui/separator'
import { Accordion as AccordionType } from '@/payload-types'
import jsxConverters from '@/utilities/richTextConverter'
import { RichText } from '@payloadcms/richtext-lexical/react'
import React from 'react'

export function AccordionComponent({ accordions }: AccordionType) {
  return (
    <div className="max-w-[1024px] mx-auto p-4">
      <Accordion className="w-full">
        {accordions?.map((accordion, index) => {
          return (
            <React.Fragment key={index}>
              <Separator />
              <AccordionItem>
                <AccordionTrigger>
                  <h2>{accordion.title}</h2>
                </AccordionTrigger>
                <AccordionContent>
                  {accordion.content && (
                    <RichText data={accordion.content} converters={jsxConverters} />
                  )}
                </AccordionContent>
              </AccordionItem>
            </React.Fragment>
          )
        })}
        {accordions && accordions.length > 0 && <Separator />}
      </Accordion>
    </div>
  )
}
