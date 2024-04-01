'use client'
import React, { useEffect, useRef } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

function Login() {
  const userIdRef = useRef(null)
  const passwordRef = useRef(null)
  const { data: session } = useSession()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const result = await signIn('credentials', {
      userId: userIdRef.current,
      password: passwordRef.current,
      redirect: true,
      callbackUrl: '/',
    })
  }

  return (
    <main>
      <h1>Login</h1>
      <div>
        <div>
          <label htmlFor="userId">UserId</label>
          <div>
            <input
              ref={userIdRef}
              onChange={(e) => {
                userIdRef.current = e.target.value
              }}
              id="userId"
              name="userId"
              type="text"
              required
              autoFocus={true}
            />
          </div>
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <div>
            <input
              type="password"
              id="password"
              name="password"
              ref={passwordRef}
              onChange={(e) => (passwordRef.current = e.target.value)}
            />
          </div>
        </div>

        <div>
          <button onClick={handleSubmit}>로그인</button>
        </div>
      </div>
    </main>
  )
}

export default Login
