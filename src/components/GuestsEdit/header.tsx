import { useFlower, useFlowerForm } from '@flowerforce/flower-react'
import React, { memo, useCallback } from 'react'
import { Button } from '../Button'

const _GuestsHeader = () => {
  const { getData, setData } = useFlowerForm()
  const { next } = useFlower()

  const onSave = useCallback(async () => {
    next('onSave')
  }, [getData, setData, next])

  return (
    <Button
      title="Salva"
      variant="secondary"
      onPress={onSave}
      rules={{
        $and: [{ '$form.isValid': { $eq: true } } /*  { tempGuests: { $gt: 0 } } */],
      }}
      alwaysDisplay
    />
  )
}

export const GuestsHeader = memo(_GuestsHeader)
