export async function resetNewPassword(userEmail: string) {
  try {
    const res = await fetch(
      `${process.env.EXPO_PUBLIC_REACT_APP_BASE_URL}/${process.env.EXPO_PUBLIC_REACT_APP_AUTH_API_URL}/reset/call`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userEmail.toLowerCase(),
          password: '',
        }),
      },
    )
    const data = await res.text()

    if (res.ok) return { status: res.status, body: data }
    else throw 'Error in fetch resetNewPassword'
  } catch (e) {
    console.log('error in resetNewPassword - ', e)
    throw e
  }
}
