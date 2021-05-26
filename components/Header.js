import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import Link from 'next/link'
import useUser from '../lib/useUser'
import { useRouter } from 'next/router'
import fetchJson from '../lib/fetchJson'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Header = () => {
  const { user, mutateUser } = useUser()
  const router = useRouter()
  return (
    <header>
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/">
                <a className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10"
                      src="/images/Logo.png"
                      alt="Sproutify"
                    />
                  </div>
                  <div className="text-gray-800 text-xl font-bold mx-2">
                    Sproutify
                  </div>
                </a>
              </Link>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <a href="#" className="bg-gray-100 text-gray-800 px-3 py-2 rounded-md text-sm font-medium">
                    Cards
                  </a>
                </div>
              </div>
            </div>
            
            <div className="ml-4 flex items-center md:ml-6">
              
              {!user?.isSignedIn && (
                <Link href="/signup">
                  <a href="#" className="text-gray-800 px-3 py-2 rounded-md text-sm font-medium">
                    Sign Up
                  </a>
                </Link>
              )}
              
              {/* Profile dropdown */}
              {user?.isSignedIn && (
                <Menu as="div" className="ml-3 relative">
                  {({ open }) => (
                    <>
                      <div>
                        <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-10 w-10 rounded-full"
                            src="/images/avatar.jpeg"
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        show={open}
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items
                          static
                          className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                          <Menu.Item>
                            {({ active }) => (
                              <Link href="/profile">
                                <a
                                  href="#"
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                  )}
                                >
                                  Profile
                                </a>
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="/api/signout"
                                onClick={async (e) => {
                                  e.preventDefault()
                                  mutateUser(
                                    await fetch('/api/signout', { method: 'POST' }),
                                    false
                                  )
                                  router.push('/signup')
                                }}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                Sign Out
                              </a>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </>
                  )}
                </Menu>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
