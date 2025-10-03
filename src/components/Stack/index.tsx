import { FlowerRule, FlowerRuleProps } from '@flowerforce/flower-react'
import { forwardRef, PropsWithChildren } from 'react'
import { View, ViewStyle } from 'react-native'

type StackProps = PropsWithChildren &
  Omit<FlowerRuleProps, 'children'> &
  ViewStyle & { position?: 'absolute' | 'fixed' | 'relative' | 'static' }

export const Stack = forwardRef<View, StackProps>(
  ({ children, rules, position, ...rest }, ref) => {
    return (
      <FlowerRule rules={rules}>
        <View
          ref={ref}
          style={[
            {
              display: 'flex',
              position,
            },
            rest as ViewStyle,
          ]}
        >
          {children}
        </View>
      </FlowerRule>
    )
  },
)
Stack.displayName = 'Stack'
