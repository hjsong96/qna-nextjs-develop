'use client'

import { useState } from 'react';
import Link from 'next/link'

/**
 * react 아이콘
 */
import { FaLongArrowAltDown, FaLongArrowAltUp } from 'react-icons/fa';
import { IoAnalytics, IoSettingsOutline } from 'react-icons/io5';
import { AiOutlineLogin } from 'react-icons/ai';

export default function SideBar () {
  const [sideBarDetail, setSideBarDetail] = useState(true);

  return (
    <div className='Side-Bar'>
      <div
        className='Side-Bar-Top-Title'
        onClick={() => setSideBarDetail((pre)=>!pre)}
      >
        My Content
        {sideBarDetail ? (
          <FaLongArrowAltUp />
        ) : (
          <FaLongArrowAltDown />
        )}
      </div>

      {sideBarDetail && (
        <div className='Side-Bar-Top'>
          <Link href='/survey/list'>- 전체콘텐츠</Link>
          <Link href='/survey'>- 설문</Link>
          <Link href='/survey'>- 퀴즈</Link>
          <Link href='/survey'>- 설문</Link>
        </div>
      )}

      <div className='Side-Bar-Bottom'>
        <Link href='/analysis'>
          <IoAnalytics className='icons' />
          응답 및 분석
        </Link>
        <Link href='/setting'>
          <IoSettingsOutline className='icons' />
          설정
        </Link>
        <Link href='/account/login'>
          <AiOutlineLogin className='icons' /> 로그인
        </Link>
      </div>
    </div>
  )
}