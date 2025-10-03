import { useNavigation } from 'expo-router'
import {
  FlowerNavigate,
  FlowerNavigateProps,
  FlowerValueProps,
  useFlower,
} from '@flowerforce/flower-react'
import { useWindowDimensions } from 'react-native'
import { PropsWithChildren } from 'react'
import { IconButton } from '../IconButton'
import { Stack } from '../Stack'
import { Text } from '../Text'

type Props = PropsWithChildren<
  {
    title?: string
    text?: string
    backNode?: string
    rightRender?: React.JSX.Element
  } & Omit<FlowerValueProps, 'children'> &
    Omit<FlowerNavigateProps, 'children'>
>

export const PageHeader = ({
  title,
  action,
  text = '',
  rightRender,
  backNode,
  children,
}: Props) => {
  const { back } = useFlower()
  const { goBack } = useNavigation()
  const { width } = useWindowDimensions()
  const isMobile = width < 700
  return (
    <FlowerNavigate action={action}>
      {() => (
        <Stack>
          <Stack
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            paddingHorizontal={20}
            paddingVertical={10}
          >
            <IconButton
              onPress={() => (backNode ? back(backNode) : goBack())}
              icon="arrow-back"
              text={isMobile ? '' : 'Indietro'}
            />
            <Text variant="h5" text={title || ''} fontSize={18} />
            {text && <Text variant="h5" text={text} />}
            {rightRender && rightRender}
          </Stack>
          <Stack paddingHorizontal={50} paddingVertical={10}>
            {children}
          </Stack>
        </Stack>
      )}
    </FlowerNavigate>
  )
}
