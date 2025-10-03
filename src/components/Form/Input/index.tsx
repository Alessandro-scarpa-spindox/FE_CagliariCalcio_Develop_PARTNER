import { FlowerField, FlowerFieldProps } from '@flowerforce/flower-react'
import { Input as KInput, InputProps as KittenInputProps } from '@ui-kitten/components'

import { useCallback, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Icon } from '@/components/Icon'
import { Text } from '@/components/Text'
import { Colors } from '@/constants/Colors'
import { Stack } from '@/components/Stack'
import dayjs from 'dayjs'

type InputProps = {
  required?: boolean
  isNumeric?: boolean
  isDate?: boolean
  label: string
  placeholder?: string
  secureText?: boolean
  onChange?: (value: string) => void
  value?: string
  inputType?: KittenInputProps['inputMode']
} & Omit<FlowerFieldProps, 'children'>
export const Input = ({
  label,
  id,
  placeholder,
  secureText,
  value: valueProp,
  validate,
  required,
  inputType = 'text',
  onChange: onChangeProp,
  isNumeric,
  isDate,
}: InputProps) => {
  const [secureTextEntry, setSecureTextEntry] = useState(secureText)
  const toggleSecureEntry = useCallback(() => {
    setSecureTextEntry((prevSecurity) => !prevSecurity)
  }, [])

  const renderIcon = useCallback(
    () =>
      secureText ? (
        <TouchableOpacity onPress={toggleSecureEntry}>
          <Icon name={secureTextEntry ? 'eye-off' : 'eye'} colorKey="backgroundPrimary" />
        </TouchableOpacity>
      ) : (
        <></>
      ),
    [secureText, secureTextEntry, toggleSecureEntry],
  )

  const handleChange = useCallback(
    (value: string, onChangeFlower: (value: string | number) => void) => {
      const formattedValue = isNumeric ? Number(value.replace(/[^0-9]+/g, '')) : value

      onChangeFlower(formattedValue)
      onChangeProp?.(value)
    },
    [isNumeric, onChangeProp, isDate],
  )

  const renderLabel = useCallback(
    () => (
      <View style={styles.label}>
        <Stack flexDirection="row" gap={2}>
          <Text text={label || ''} />
          {required && <Text color="danger" fontSize={20} text="*" />}
        </Stack>
      </View>
    ),
    [required, label],
  )

  const renderError = useCallback((errors: string[]) => {
    return <Text text={errors.join(', ')} color="error" />
  }, [])

  return (
    <FlowerField id={id} validate={validate}>
      {({ onChange: onChangeFlower, value = '', onBlur, errors, isTouched }) => (
        <KInput
          textStyle={{
            color: Colors.backgroundPrimaryLight,
          }}
          autoCapitalize="none"
          status={isTouched && errors?.length ? 'danger' : 'basic'}
          onBlur={onBlur}
          secureTextEntry={secureTextEntry}
          style={{
            borderRadius: 8,
            backgroundColor: Colors.textLight,
          }}
          scrollEnabled={false}
          caption={isTouched && errors?.length ? renderError(errors) : ''}
          size="large"
          label={renderLabel}
          onChangeText={(value) => handleChange(value, onChangeFlower)}
          value={valueProp || value}
          placeholder={placeholder}
          accessoryRight={renderIcon}
          inputMode={inputType}
        />
      )}
    </FlowerField>
  )
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 6,
  },
})
