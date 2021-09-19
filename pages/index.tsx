import type { NextPage } from 'next'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <div className="container mx-auto p-6 text-sm">
      <div className="shadow p-6">
        <div className="flex w-full">
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
        </div>
        <p>Guest Page!</p>
      </div>
    </div>
  )
}

export default Home
