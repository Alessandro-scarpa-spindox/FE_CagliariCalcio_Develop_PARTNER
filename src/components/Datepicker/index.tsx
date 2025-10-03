import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Datepicker } from '@ui-kitten/components'
import { FlowerField, FlowerFieldProps } from '@flowerforce/flower-react'
import dayjs from 'dayjs'
import { Text } from '../Text'
import { Colors } from '@/constants/Colors'

type DatePickerProps = {
  label: string
  placeholder?: string
} & Omit<FlowerFieldProps, 'children'>

export const DatePicker = ({
  label,
  placeholder,
  id,
  validate,
}: DatePickerProps): React.ReactElement => {
  const formatValue = (value: string | undefined) => {
    if (!value) return null
    const parsedDate = dayjs(value)
    return parsedDate.isValid() ? parsedDate : null
  }

  return (
    <FlowerField id={id} validate={validate}>
      {({ value, onChange, errors, onBlur, isTouched }) => {
        const formattedDate = formatValue(value)
        return (
          <View style={styles.container}>
            <Text text={label} />
            <Datepicker
              onBlur={onBlur}
              placeholder={placeholder}
              date={formattedDate?.isValid() ? formattedDate.toDate() : null}
              onSelect={(newDate) => onChange(newDate)}
              controlStyle={[
                styles.picker,
                isTouched && !!errors?.length && styles.pickerError,
              ]}
              max={dayjs().toDate()}
              min={dayjs('1900-01-01').toDate()}
              caption={
                isTouched && !!errors?.length
                  ? () => <Text color="error" text={errors.join(', ')} />
                  : undefined
              }
            />
          </View>
        )
      }}
    </FlowerField>
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
