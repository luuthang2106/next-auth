import type { NextPage } from 'next'

const Register: NextPage = () => {
    return (
        <div className="w-screen h-screen flex items-center justify-center text-sm">
            <div className="w-11/12 md:w-96 shadow p-6">
                <div className="flex flex-col w-full space-y-4">
                    <p className="uppercase text-center font-bold">Register</p>
                    <div className="flex flex-col space-y-2">
                        <label>Username</label>
                        <input className="h-6 px-2 shadow outline-none" type="email" />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label>Password</label>
                        <input className="h-6 px-2 shadow outline-none" type="password" />
                    </div>
                    <button className="uppercase w-full bg-gray-200 font-bold text-gray-500 py-3">
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Register
