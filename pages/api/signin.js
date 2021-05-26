import fetchJson from '../../lib/fetchJson'
import withSession from '../../lib/session'

export default withSession(async (req, res) => {
  const { email } = await req.body

  try {
    // Hardcode a user for the webinar
    const user = {
      isSignedIn: true,
      email: email,
    }
    req.session.set('user', user)
    await req.session.save()
    res.json(user)
  } catch (error) {
    const { response: fetchResponse } = error
    res.status(fetchResponse?.status || 500).json(error.data)
  }
})
