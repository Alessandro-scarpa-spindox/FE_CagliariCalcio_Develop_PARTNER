import React, { useRef, useState } from 'react'
import { Picker } from '@react-native-picker/picker'
import { FlowerField, FlowerFieldProps } from '@flowerforce/flower-react'
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native'
import { Stack } from '../Stack'
import { Text } from '@/components/Text'
import { Colors } from '@/constants/Colors'
import { Icon } from '@/components/Icon'

type DropdownProps = {
  options: { label: string; value: string | number }[]
  label?: string
  placeholder: string
  style?: ViewStyle
  pickerStyle?: ViewStyle
  required?: boolean
  onDelete?: () => void
} & Omit<FlowerFieldProps, 'children'>
const NOT_A_VALUE = 'notavalue'
export const Dropdown = ({
  options,
  id,
  validate,
  label,
  placeholder,
  style,
  required,
  onDelete,
  pickerStyle,
}: DropdownProps) => {
  const pickerRef = useRef<Picker<string> | null>(null)
  const [isFocused, setIsFocused] = useState(false)

  return (
    <FlowerField id={id} validate={validate}>
      {({ onChange, value = NOT_A_VALUE }) => {
        return (
          <View style={[styles.container, isFocused && styles.focus, style]}>
            <Stack flexDirection="row" gap={2}>
              {label && <Text text={label} marginBottom={6} />}
              {required && <Text color="danger" fontSize={20} text="*" />}
            </Stack>

            <View style={styles.pickerWrap}>
              <Picker
                ref={pickerRef}
                selectedValue={value}
                onValueChange={(itemValue = '') => {
                  if (NOT_A_VALUE !== itemValue) {
                    onChange(itemValue)
                    setIsFocused(false)
                  }
                }}
                style={[styles.picker, pickerStyle]}
                itemStyle={styles.item}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              >
                {[{ label: placeholder, value: NOT_A_VALUE }, ...options].map(
                  (option) => (
                    <Picker.Item
                      key={option.value}
                      label={option.label}
                      value={option.value}
                    />
                  ),
                )}
              </Picker>
              {onDelete && (
                <TouchableOpacity onPress={onDelete}>
                  <Icon name="trash" fill={Colors.danger} size={20} />
                </TouchableOpacity>
              )}
            </View>
          </View>
        )
      }}
    </FlowerField>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginVertical: 4,
    minHeight: 48,
  },
  pickerWrap: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    minHeight: 48,
  },
  picker: {
    height: '100%',
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.backgroundSecondary,
    borderRadius: 5,
    backgroundColor: 'white',
    color: 'black',
    paddingHorizontal: 10,
    fontSize: 14,
  },
  item: {
    backgroundColor: 'white',
    color: Colors.danger,
  },
  focus: {
    borderColor: 'green',
  },
})
