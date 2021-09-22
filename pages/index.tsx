import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAuth } from 'hooks/useAuth'

const Home: NextPage = () => {
  const {
    loggedIn,
    user,
    signout
  }: any = useAuth()

  return (
    <div className="container mx-auto p-6 text-sm">
      <div className="shadow p-6">
        <div className="flex w-full">
          {
            loggedIn ?
              (
                <>
                  <span className="px-4 py-2 ml-auto mr-4">{user.email}</span>
                  <button onClick={() => signout()} className="px-4 py-2 shadow">
                    Logout
              </button>
                </>
              )
              : (
                <>
                  <Link href="/login">
                    <button className="px-4 py-2 ml-auto mr-4 shadow">
                      Login
              </button>
                  </Link>
                  <Link href="/register">
                    <button className="px-4 py-2 shadow">
                      Register
              </button>
                  </Link>
                </>
              )
          }
        </div >
        {
          loggedIn ? (
            <p>Logged In!</p>
          ) : (
            <p>Not Logged In Yet!</p>
          )
        }
      </div >
    </div >
  )
}

export default Home
