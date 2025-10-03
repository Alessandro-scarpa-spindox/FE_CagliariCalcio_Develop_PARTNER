import { Colors } from '@/constants/Colors'
import { FlowerFieldProps } from '@flowerforce/flower-react'
import React from 'react'
import { StyleSheet } from 'react-native'
import { Input } from '../Form/Input'

type DateInputProps = {
  label: string
  placeholder?: string
} & Omit<FlowerFieldProps, 'children'>

export const DateInput = ({ label, id, validate }: DateInputProps) => {
  return (
    <Input
      id={`${id}`}
      label={label}
      placeholder="GG/MM/AAAA"
      required
      validate={[
        {
          rules: {
            $and: [
              { $self: { $exists: true } },
              {
                $self: {
                  $regex:
                    /(0[1-9]{1}|1[0-9]|2[0-9]|3[01])\/(0[1-9]{1}|1[012]{1})\/(19|20)+[0-9]{2}$/,
                },
              },
            ],
          },
          message: 'Inserire una data nel seguente formato: GG/MM/AAAA',
        },
      ]}
    />
  )
}

const styles = StyleSheet.create({
  container: { rowGap: 6 },
  picker: {
    backgroundColor: Colors.textLight,
    minHeight: 48,
  },
  pickerError: {
    borderColor: Colors.error,
  },
})
