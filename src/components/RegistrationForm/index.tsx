import React from 'react'
import { FlowerValue } from '@flowerforce/flower-react'
import { Form } from './Form'

type FormData = {
  id: string
  tokenId: string
  email: string
  name: string
  phone: string
}

export const RegistrationForm = () => {
  return (
    <FlowerValue id="partnerData">
      {({ value }) => {
        return <Form {...(value as FormData)} />
      }}
    </FlowerValue>
  )
}
