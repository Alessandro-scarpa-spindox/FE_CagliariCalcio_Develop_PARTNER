import React from 'react'
import { IconRegistry, Icon as KIcon } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { FlowerRule, FlowerRuleProps } from '@flowerforce/flower-react'
import { Colors } from '@/constants/Colors'

type IconProps = {
  name: string
  fill?: string
  colorKey?: keyof typeof Colors
  size?: string | number
} & FlowerRuleProps

export const Icon = ({ name, fill = '#FFF', size = 28, colorKey, rules }: IconProps) => {
  const iconSize = isNaN(Number(size)) ? 28 : Number(size)
  return (
    <FlowerRule rules={rules}>
      <IconRegistry icons={EvaIconsPack} />
      <KIcon
        name={name}
        fill={colorKey ? Colors[colorKey] : fill}
        style={{
          width: iconSize,
          height: iconSize,
        }}
      />
    </FlowerRule>
  )
}
