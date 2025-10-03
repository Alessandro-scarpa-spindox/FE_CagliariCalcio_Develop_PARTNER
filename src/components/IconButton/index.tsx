import { TouchableOpacity } from 'react-native'
import {
  FlowerNavigate,
  FlowerNavigateProps,
  FlowerRule,
} from '@flowerforce/flower-react'
import { Icon } from '../Icon'
import { Text } from '../Text'
import { Color, Colors } from '@/constants/Colors'

type IconButtonProps = {
  icon: string
  onPress?: () => void
  fill?: string
  size?: number
  text?: string
  labelColor?: Color
  fontSize?: number
  gap?: number
  bgColor?: Color
} & Omit<FlowerNavigateProps, 'children'>

export const IconButton = ({
  icon,
  onPress,
  action,
  fill,
  size,
  rules,
  text,
  fontSize = 14,
  gap = 10,
  bgColor,
  labelColor = 'textLight',
}: IconButtonProps) => {
  return (
    <FlowerRule rules={rules}>
      <FlowerNavigate action={action}>
        {({ onClick }) => (
          <TouchableOpacity
            onPress={() => {
              onPress?.()
              action && onClick()
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: gap,
              backgroundColor: bgColor ? Colors?.[bgColor] : 'none',
              padding: 5,
            }}
          >
            <Icon name={icon} fill={fill} size={size} />
            {text && <Text text={text} fontSize={fontSize} color={labelColor} />}
          </TouchableOpacity>
        )}
      </FlowerNavigate>
    </FlowerRule>
  )
}
