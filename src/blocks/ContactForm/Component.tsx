'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import React, { useState } from 'react'
import { ContactForm } from '@/payload-types'
import { Loader2, Mail, SendHorizonal } from 'lucide-react'
import { sendEmail } from '@/utilities/sendEmail'

export function ContactFormComponent({
  title,
  submitButtonText,
  nameField,
  emailField,
  messageField,
  successMessage,
  successTitle,
}: ContactForm) {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const formSchema = z.object({
    email: z.string().email(emailField.ErrorInvalid).max(254, emailField.ErrorLong),
    name: z.string().min(1, nameField.ErrorShort).max(64, nameField.ErrorLong),
    message: z.string().min(1, messageField.ErrorShort).max(512, messageField.ErrorLong),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      name: '',
      message: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true)
    await sendEmail({
      name: values.name,
      email: values.email,
      message: values.message,
    }).then(({ data }) => {
      if (data) {
        setSubmitted(true)
      }
    })
    setLoading(false)
  }
  return (
    <div className="max-w-[1024px] mx-auto p-4 relative">
      <h2 className="my-4">{title}</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={`${submitted ? 'hidden' : 'block'} space-y-8`}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>{nameField.label}</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder={nameField.label} disabled={loading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>{emailField.label}</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder={emailField.label} disabled={loading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>{messageField.label}</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder={messageField.label} disabled={loading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
          <Button type="submit" disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : <SendHorizonal />} {submitButtonText}
          </Button>
        </form>
      </Form>
      <div className={`${submitted ? 'block' : 'hidden'} w-full flex flex-col gap-8`}>
        <div className="flex flex-col justify-center items-center gap-4">
          <Mail />
          <h3>{successTitle}</h3>
        </div>
        <p className="text-center">{successMessage}</p>
      </div>
    </div>
  )
}
