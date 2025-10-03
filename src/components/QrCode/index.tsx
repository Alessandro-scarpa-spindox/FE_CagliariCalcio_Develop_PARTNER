import { View } from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import { Colors } from '@/constants/Colors'

type QrCodeProps = {
  link: string
  isScanned?: boolean
}

export const QrCode = ({ link, isScanned }: QrCodeProps) => {
  return (
    <View
      style={{
        backgroundColor: isScanned ? Colors.danger : Colors.textLight,
        padding: 10,
        borderRadius: 10,
      }}
    >
      <QRCode
        value={link}
        size={200}
        backgroundColor={isScanned ? Colors.danger : undefined}
      />
    </View>
  )
}
