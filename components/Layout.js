import React from 'react'
import Head from 'next/head'
import Header from './Header'
import PropTypes from 'prop-types'

const Layout = ({ children }) => (
  <>
    <Head>
      <title>Sproutify</title>
    </Head>
    <Header />
    <main>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </main>
  </>
)

export default Layout

Layout.propTypes = {
  children: PropTypes.node,
}
