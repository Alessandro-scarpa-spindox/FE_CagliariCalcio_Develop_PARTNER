export const getRegisterInformation = async (partnerId: string) => {
  const url = `${process.env.EXPO_PUBLIC_REACT_APP_BASE_URL}/app/${process.env.EXPO_PUBLIC_REACT_APP_ID}/endpoint/registration`
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ id: partnerId }),
    headers: { 'Content-Type': 'application/json' },
  })
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`)
  }
  const json = await response.json()
  return json
}
