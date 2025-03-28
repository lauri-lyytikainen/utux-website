import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import React from 'react'
import { Breadcrumb as crumb } from '@payloadcms/plugin-nested-docs/types'

export function Breadcrumbs({ crumbs }: { crumbs: crumb[] }) {
  return (
    <Breadcrumb className="max-w-[1024px] mx-auto p-4">
      <BreadcrumbList>
        {crumbs.map((breadcrumb, index) => (
          <React.Fragment key={index}>
            {index > 0 && <BreadcrumbSeparator>/</BreadcrumbSeparator>}
            <BreadcrumbItem>
              <BreadcrumbLink href={breadcrumb.url ?? '/'}>{breadcrumb.label}</BreadcrumbLink>
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
