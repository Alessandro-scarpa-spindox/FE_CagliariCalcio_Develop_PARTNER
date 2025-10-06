import { FlowerField, useFlowerForm } from '@flowerforce/flower-react'
import { FlatList, View } from 'react-native'
import React, { memo, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { GuestInsert } from '../GuestInsert'
import { Stack } from '../Stack'
import { Button } from '../Button'
import KeyboardContainer from '../KeyboardContainer'
import { useRealmAuth } from '@/hooks/useRealmAuth'

const _GuestsEdit = () => {
  const { setParams, setOptions }: any = useNavigation()
  const { currentUser } = useRealmAuth()

  const { getData } = useFlowerForm()

  const eventSpaces = getData('event.spacesById')

  useEffect(() => {
    setParams({ isEditing: true })

    setOptions({ gestureEnabled: false })
    return () => {
      setParams({ isEditing: false })
      setOptions({ gestureEnabled: true })
    }
  }, [setOptions, setParams])

  return (
    <FlowerField id="tempGuests">
      {({ value = [], onChange }) => {
        return (
          <KeyboardContainer>
            <Stack gap={2}>
              <FlatList
                data={value}
                keyExtractor={(_, index) => index.toString()}
                contentContainerStyle={{
                  paddingHorizontal: 20,
                  marginTop: 20,
                }}
                style={{ marginBottom: 5 }}
                ItemSeparatorComponent={() => <View style={{ height: 40 }} />}
                renderItem={({ index }) => (
                  <GuestInsert
                    spaces={eventSpaces}
                    index={index}
                    guests={value}
                    onChange={onChange}
                  />
                )}
              />
              <Stack
                alignItems="center"
                bottom={0}
                //@ts-ignore
                position="sticky"
                width={'100%'}
              >
                <Stack flexDirection="row" gap={10} alignItems="center" width={'100%'}>
                  <Button
                    fullWidth
                    noRadius
                    icon="plus-circle-outline"
                    title="Aggiungi ospite"
                    variant="secondary"
                    rules={{
                      $and: [
                        {
                          tempGuests: {
                            $lt: `$ref:event.partners.${currentUser!.partnerId}.guests`,
                          },
                        },
                      ],
                    }}
                    onPress={() => {
                      onChange([
                        ...(value || []),
                        {
                          firstName: '',
                          lastName: '',
                          birthDate: '',
                          email: '',
                          phoneNumber: '',
                          spaceId: '',
                        },
                      ])
                    }}
                  />
                </Stack>
              </Stack>
            </Stack>
          </KeyboardContainer>
        )
      }}
    </FlowerField>
  )
}

export const GuestsEdit = memo(_GuestsEdit)
