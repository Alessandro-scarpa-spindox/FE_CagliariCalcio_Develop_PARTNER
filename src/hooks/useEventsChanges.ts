import { useEffect, useRef } from 'react'
import { watchAllEventsChanges } from '@/api/getEvents'
import { Event } from '@/model/Events'

export type Change = {
  fullDocument: Event & { _id: Realm.BSON.ObjectId }
  operationType: 'insert' | 'delete' | 'update'
  documentKey: {
    _id: string
  }
}

export const useEventsChanges = (
  processChanges: (change: Change) => void,
  isFocused: boolean,
) => {
  const changeStreamRef =
    useRef<Awaited<ReturnType<typeof watchAllEventsChanges> | null>>(null)
  useEffect(() => {
    if (isFocused && !changeStreamRef.current) {
      watchAllEventsChanges(processChanges).then((changeStream) => {
        changeStreamRef.current = changeStream
      })
    }

    if (!isFocused && changeStreamRef.current) {
      changeStreamRef.current.return(null)
      changeStreamRef.current = null
    }
    return () => {
      if (changeStreamRef.current) {
        changeStreamRef.current.return(null)
        changeStreamRef.current = null
      }
    }
  }, [isFocused, processChanges])
}
