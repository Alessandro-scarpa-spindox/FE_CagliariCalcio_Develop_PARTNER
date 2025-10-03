import { useFlower, useFlowerForm } from '@flowerforce/flower-react'
import React, { useCallback, useEffect } from 'react'
import Toast from 'react-native-toast-message'
import { LoadingView } from '@/components/LoadingView'

import { Guest } from '@/model/Events'
import { Realm, app } from '@/provider'

export const SendTicketsByEmail = () => {
  const { back } = useFlower()
  const { getData } = useFlowerForm()
  const { unsetData } = useFlowerForm()

  const onSendTicketsByEmail = useCallback(async () => {
    const guests = getData('event.guests')
    const sendSingleTicketGuest = getData(`sentSingleTicket`)

    const sendAllTicketGuest = guests.reduce(
      (acc: Realm.BSON.ObjectId[], guest: Guest) => {
        guest.email && acc.push(new Realm.BSON.ObjectId(guest.id))
        return acc
      },
      [],
    )
    const sendTicketTo = sendSingleTicketGuest
      ? [new Realm.BSON.ObjectId(sendSingleTicketGuest)]
      : sendAllTicketGuest

    try {
      await app.currentUser?.functions.sendTicket(sendTicketTo)

      Toast.show({
        type: 'success',
        text1: 'Invio completato!',
        text2: 'Ticket inviato via mail',
      })
    } catch (e) {
      console.log('error server mail -- ', e)
      Toast.show({
        type: 'error',
        text1: 'Errore!',
        text2: 'Ticket non inviato',
      })
    } finally {
      unsetData('sentSingleTicket')
      back('initialNode')
    }
  }, [getData, unsetData, back])

  useEffect(() => {
    onSendTicketsByEmail()
  }, [onSendTicketsByEmail])

  return <LoadingView />
}
