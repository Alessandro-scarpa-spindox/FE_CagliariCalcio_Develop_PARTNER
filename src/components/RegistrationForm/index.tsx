import React from 'react'
import { StyleSheet } from 'react-native'
import { Form } from './Form'
import { FlowerValue } from '@flowerforce/flower-react'

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
