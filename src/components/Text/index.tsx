import { Text as KText } from '@ui-kitten/components'
import { FlowerRule, FlowerRuleProps } from '@flowerforce/flower-react'
import { TextStyle } from 'react-native'
import { Colors } from '@/constants/Colors'

type TextProps = {
  text: string
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p1'
  color?: keyof typeof Colors
} & FlowerRuleProps &
  TextStyle

export const Text = ({
  text,
  variant = 'p1',
  color = 'textLight',
  rules,
  ...styles
}: TextProps) => {
  return (
    <FlowerRule rules={rules}>
      <KText category={variant} style={{ color: Colors[color], ...styles }}>
        {text}
      </KText>
    </FlowerRule>
  )
}
