'use client'

import { useSession, signIn, signOut } from 'next-auth/react'

export default function RootHead() {
  const { data: session, status } = useSession()

  if (!session) {
    return (
      <div>
        <div className="Top-Bar">LOGO + NAME</div>
      </div>
    )
  }
  return (
    <div>
      <div className="Top-Bar">LOGO + NAME</div>
      <p>안녕하세요, {session.user.nickName} 님!</p>
      <button onClick={() => signOut()}>로그아웃</button>
    </div>
  )
}
