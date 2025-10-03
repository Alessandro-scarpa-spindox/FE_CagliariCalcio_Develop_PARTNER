import { useEffect, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'

const useCountdown = (countDownDate: Dayjs) => {
  const now = dayjs()
  const diff = countDownDate.diff(now)

  const [countDown, setCountDown] = useState(diff)

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate.diff(dayjs()))
    }, 1000)

    if (countDownDate.diff(dayjs()) < 0) clearInterval(interval)

    return () => clearInterval(interval)
  }, [countDownDate])

  const isLive = diff < 0 && diff > -10800000

  return { countdown: getReturnValues(countDown), isLive }
}

const getReturnValues = (countDown: number) => {
  if (countDown < 0) return [0, 0, 0, 0]
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24))
  const hours = Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000)

  return [days, hours, minutes, seconds]
}

export { useCountdown }
