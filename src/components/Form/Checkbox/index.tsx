import React, { memo, PropsWithChildren } from 'react'
import { CheckBox as KICheckbox } from '@ui-kitten/components'
import { FlowerField, FlowerFieldProps } from '@flowerforce/flower-react'

type Props = PropsWithChildren<{ label?: string } & Omit<FlowerFieldProps, 'children'>>

export const CheckBox = memo(({ id, validate, rules, label }: Props) => {
  return (
    <FlowerField id={id} validate={validate} defaultValue={false} rules={rules}>
      {({ onChange: onChangeFlower, value }) => (
        <KICheckbox
          checked={value}
          onChange={(newValue) => {
            onChangeFlower(newValue)
          }}
          status="danger"
        >
          {label}
        </KICheckbox>
      )}
    </FlowerField>
  )
})
