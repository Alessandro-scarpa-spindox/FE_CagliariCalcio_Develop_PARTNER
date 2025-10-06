import {
  FlowerNavigate,
  FlowerNavigateProps,
  FlowerRule,
} from '@flowerforce/flower-react'
import { useCallback } from 'react'
import { StyleSheet, Pressable, ViewStyle } from 'react-native'
import { Text } from '../Text'
import { Icon } from '../Icon'
import { Colors } from '@/constants/Colors'

type ButtonProps = {
  icon?: string
  title: string
  fullWidth?: boolean
  onPress?: () => void
  disabled?: boolean
  noRadius?: boolean
  style?: ViewStyle
  variant?: 'primary' | 'secondary' | 'text' | 'tertiary'
} & Omit<FlowerNavigateProps, 'children'>
export const Button = ({
  icon,
  title,
  fullWidth,
  action,
  onPress,
  disabled,
  rules,
  noRadius,
  alwaysDisplay,
  style,
  variant = 'primary',
}: ButtonProps) => {
  const renderButton = useCallback(
    (onClick: () => void, hidden?: boolean) => (
      <Pressable
        style={[
          styles.main,
          styles[variant],
          (hidden || disabled) && styles.disabled,
          fullWidth && styles.fullWidth,
          noRadius && styles.noRadius,
          style && style,
        ]}
        disabled={hidden || disabled}
        onPress={() => {
          onPress?.()
          action && onClick()
        }}
      >
        {icon && <Icon name={icon} />}

        <Text text={title} color={textColorByVariant[variant] as any} />
      </Pressable>
    ),
    [action, disabled, fullWidth, icon, noRadius, onPress, style, title, variant],
  )
  return (
    <FlowerNavigate action={action}>
      {({ onClick }) => (
        <FlowerRule rules={rules} alwaysDisplay={alwaysDisplay}>
          {({ hidden }) => renderButton(onClick, hidden)}
        </FlowerRule>
      )}
    </FlowerNavigate>
  )
}

const styles = StyleSheet.create({
  main: {
    borderRadius: 12,
    paddingVertical: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 80,
    paddingHorizontal: 16,
    gap: 5,
  },
  primary: {
    backgroundColor: Colors.textLight,
    borderColor: Colors.textLight,
  },
  secondary: {
    backgroundColor: Colors.backgroundSecondary,
    borderColor: Colors.backgroundSecondary,
  },
  tertiary: { backgroundColor: 'none' },
  disabled: {
    backgroundColor: '#cccccc',
  },
  noRadius: { borderRadius: 0 },
  fullWidth: {
    width: '100%',
  },
  shadow: {
    shadowColor: 'rgba(19,19,19)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 5,
    shadowRadius: 5,
  },
  text: { borderBottomColor: '#cccccc', borderBottomWidth: 1, borderRadius: 0 },
})

const textColorByVariant = {
  primary: 'text',
  secondary: 'textLight',
  text: 'textLight',
  tertiary: 'textLight',
}
