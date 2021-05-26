import Layout from '../components/Layout'
import withSession from '../lib/session'
import marqetaClient from '../lib/marqetaClient'

const Home = ({ user, cardPANLastFour, currentBalance }) => (
  <Layout>
    <div className="my-12">
      <div className="inline-block">
        <div
          className="px-8 py-8 bg-green-900 text-white w-96 h-48 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out"
        >
          <h3 className="py-8 text-4xl font-bold font-mono">${currentBalance}</h3>
          <div className="text-center mt-2 leading-none flex justify-between w-full">
            <span className=" inline-flex items-center leading-none text-sm">
              **** **** **** {cardPANLastFour}
            </span>
          </div>
        </div>
      </div>
    </div>
  </Layout>
)

export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req.session.get('user')

  if (!user) {
    return {
      redirect: {
        destination: '/signup',
        permanent: false,
      },
    }
  }

  // TODO: Get the users balance via /balances/{user.mqUser.token}
  const mqBalanceResponse = await marqetaClient.get(`/balances/${user.mqUser.token}`)
  const balance = mqBalanceResponse.data
  console.log('Balance: ', balance)

  return {
    props: {
      user: req.session.get('user'),
      cardPANLastFour: user.mqCard.last_four,
      currentBalance: balance.gpa.available_balance,
    },
  }
})

export default Home
