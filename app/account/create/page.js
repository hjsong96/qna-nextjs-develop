'use client'

import React, { useRef, useState } from 'react'
import axios, { isCancel, AxiosError } from 'axios'
import { usePathname, useRouter } from 'next/navigation'

function CreateAccount() {
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [userName, setUserName] = useState('')
  //const [nickName, setNickName] = useState('')
  const [email, setEmail] = useState('')
  const [disabledSubmit, setDisabledSubmit] = useState(false)

  const pathname = usePathname()
  const router = useRouter()

  const userIdInput = useRef()
  const passwordInput = useRef()
  const userNameInput = useRef()
  const emailInput = useRef()

  const handlerChange = (event) => {
    const fn_change = () => event.target.value || ''

    switch (event.target.name) {
      case 'userId':
        setUserId(fn_change)
        break
      case 'password':
        setPassword(fn_change)
        break
      case 'userName':
        setUserName(fn_change)
        break
      case 'nickName':
        setNickName(fn_change)
        break
      case 'email':
        setEmail(fn_change)
    }
  }

  const handlerSubmit = async (event) => {
    console.log(userId, password)
    event.preventDefault()
    setDisabledSubmit(true)

    if (!window.confirm('회원 가입 하시겠습니까?')) {
      setDisabledSubmit(false)
      return
    }

    let validation = false

    if (!/.{2,}/.test(userId) || !userId.trim()) {
      alert('아이디는 2글자 이상이어야 합니다. (공백은 불가능합니다.)')
      userIdInput.current.focus()
      validation = true
      console.log(1)
    } else if (!/.{4,}/.test(password) || !password.trim()) {
      alert('비밀번호는 4글자 이상이어야 합니다. (공백은 불가능합니다.)')
      passwordInput.current.focus()
      validation = true
      console.log(1)
    } else if (userName === '' || !userName.trim()) {
      alert('이름을 입력해주세요 (공백은 불가능합니다.)')
      userNameInput.current.focus()
      validation = true
      console.log(1)
    } else if (!/^[a-zA-Z가-힣]+$/.test(userName)) {
      alert('이름은 한글 또는 영어만 입력 가능합니다.')
      userNameInput.current.focus()
      validation = true
      console.log(1)
    }
    // else if (nickName == '') {
    //   alert('닉네임')
    //   validation = true
    //   console.log(1)
    // }
    else if (email === '' || !email.trim()) {
      alert('이메일을 입력해주세요 (공백은 불가능합니다.)')
      emailInput.current.focus()
      validation = true
      console.log(1)
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('이메일 형식을 올바르게 입력해주세요. ex)홍길동@uracle.com')
      emailInput.current.focus()
      validation = true
      console.log(1)
    }

    if (validation) {
      //alert('validation check fail.')
      setDisabledSubmit(false)
      return
    }

    await axios
      .post('http://localhost:8080/api/user/regist', {
        userId: userId,
        password: password,
        userName: userName,
        //nickName: nickName,
        email: email,
      })
      .then((response) => {
        alert('회원 가입에 성공 했습니다.')
        router.push(`/account/login`)
      })
      .catch((error) => {
        alert('회원 가입에 실패 했습니다.')
      })

    setDisabledSubmit(false)
  }

  return (
    <>
      <div className="login">
        <label htmlFor="userId">
          아이디 :
          <input
            ref={userIdInput}
            type="text"
            name="userId"
            value={userId}
            onChange={handlerChange}
            required
          />
        </label>
        <br />
        <label htmlFor="password">
          패스워드 :
          <input
            ref={passwordInput}
            type="password"
            name="password"
            value={password}
            onChange={handlerChange}
            required
          />
        </label>
        <br />
        <label htmlFor="userName">
          이름 :
          <input
            ref={userNameInput}
            type="text"
            name="userName"
            value={userName}
            onChange={handlerChange}
            required
          />
        </label>
        {/* <br />
        <label htmlFor="nickName">
          닉네임 :
          <input
            type="text"
            name="nickName"
            value={nickName}
            onChange={handlerChange}
            required
          />
        </label> */}
        <br />
        <label htmlFor="email">
          이메일 :
          <input
            ref={emailInput}
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={handlerChange}
            required
          />
        </label>
        <br />
        <input
          type="submit"
          value="Submit"
          onClick={handlerSubmit}
          disabled={disabledSubmit}
        />
      </div>
    </>
  )

  //#{userId} ,#{userName}, #{email}, #{password}, #{nickName}
}

export default CreateAccount
