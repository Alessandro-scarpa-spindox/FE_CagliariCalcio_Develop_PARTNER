export const registerUser = async (email: string, password: string) => {
  const res = await fetch(
    `${process.env.EXPO_PUBLIC_REACT_APP_BASE_URL}/${process.env.EXPO_PUBLIC_REACT_APP_AUTH_API_URL}/register`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.toLowerCase(),
        password,
      }),
    },
  )

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Registration failed: ${err}`)
  }

  const data = await res.json()
  return data
}
