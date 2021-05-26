import Layout from '../components/Layout'
import withSession from '../lib/session'
import PropTypes from 'prop-types'

const Profile = ({ user }) => {
  return (
    <Layout>
      <h1>Your GitHub profile</h1>
      <h2>
        This page uses{' '}
        <a href="https://nextjs.org/docs/basic-features/pages#server-side-rendering">
          Server-side Rendering (SSR)
        </a>{' '}
        and{' '}
        <a href="https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering">
          getServerSideProps
        </a>
      </h2>

      {user?.isSignedIn && (
        <>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </>
      )}
    </Layout>
  )
}

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

  return {
    props: { user: req.session.get('user') },
  }
})

export default Profile

Profile.propTypes = {
  user: PropTypes.shape({
    isSignedIn: PropTypes.bool,
  }),
}
