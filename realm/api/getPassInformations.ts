export const getPassInformations = async (guestId: string) => {
  const url =
    `${process.env.EXPO_PUBLIC_REACT_APP_BASE_URL}${process.env.EXPO_PUBLIC_REACT_APP_ENDPOINT}/ticket` ||
    ''
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ id: guestId }),
    headers: { 'Content-Type': 'application/json' },
  })
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`)
  }
  const json = await response.json()
  return json
}
