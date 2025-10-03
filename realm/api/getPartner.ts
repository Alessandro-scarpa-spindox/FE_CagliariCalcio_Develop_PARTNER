export const getPartner = async (tokenId: string) => {
  const url =
    `${process.env.EXPO_PUBLIC_REACT_APP_BASE_URL}${process.env.EXPO_PUBLIC_REACT_APP_ENDPOINT}/getPartner` ||
    ''

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ tokenId }),
    headers: { 'Content-Type': 'application/json' },
  })

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`)
  }
  const json = await response.json()
  return json
}
