import withSession from '../../lib/session'
import marqetaClient from '../../lib/marqetaClient'


export default withSession(async (req, res) => {
  const { email, firstName, lastName } = await req.body

  try {
    const user = {
      isSignedIn: true,
      email: email,
      firstName: firstName,
      lastName: lastName
    }

    // --------------------------------------------------------------------------------

    // 1. Create the user on the Marqeta Platform.
    const mqUserResponse = await marqetaClient.post('/users', {
      "first_name": firstName,
      "last_name": lastName,
      email: email,
      "active": true
    })
    const mqUser = mqUserResponse.data
    console.log('Created user: ', mqUser)

    // 2. Create a card for the Marqeta user, linked to the pre-defined card product.
    // https://www.marqeta.com/docs/developer-guides/core-api-quick-start#_step_2_get_a_card_product_token
    const mqCardsResponse = await marqetaClient.post('/cards', {
      card_product_token: 'your-card-product-token',
      user_token: mqUser.token
    })
    const mqCard = mqCardsResponse.data
    console.log('Created card: ', mqCard)

    // 3. Fund the card
    // https://www.marqeta.com/docs/developer-guides/core-api-quick-start#_create_a_gpa_order_to_fund_a_user_account
    const mqGPAOrderResponse = await marqetaClient.post('/gpaorders', {
      "user_token": mqUser.token,
      "amount": "100.00",
      "currency_code": "USD",
      "funding_source_token": "sandbox_program_funding"
    })
    const mqGPAOrder = mqGPAOrderResponse.data
    console.log('GPA Order: ', mqGPAOrder)

    // 4. Store user and card on the session for the purposes of this sample app
    user.mqUser = mqUser
    user.mqCard = mqCard

    // --------------------------------------------------------------------------------

    req.session.set('user', user)
    await req.session.save()
    res.json(user)
  } catch (error) {
    console.error(error)
    const { response: fetchResponse } = error
    res.status(fetchResponse?.status || 500).json(error.data)
  }
})
