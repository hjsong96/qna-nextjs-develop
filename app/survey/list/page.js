'use client'

import { HiOutlinePlusSmall } from 'react-icons/hi2';

import ItemList from './ItemList';
// import { useContext } from 'react';
// import { SurveyStateContext } from '@/app/states/context/SurveyStateProvider';

import Link from 'next/link';
import useSurveyList from '@/components/hook/SurveyList';

// export const FormStateContext = createContext();

function ServeyItemList() {
  const {surveyList, isError, isLoading} = useSurveyList();

  if(isError) return (
    <div>ERROR!</div>
  )

  if(isLoading) return (
    <div>Loading...</div>
  )

  return (
    surveyList.map((it, idx) => (
      <ItemList key={idx} {...it} />
    ))
  )
}

function Content() {
  // const {surveyList, isError, isLoading} = useContext(SurveyStateContext);

  return (
    <div className='Content-Wrapper'>
        <div className='ItemListWrppaer '>
          <Link href='./edit/new'>
            <HiOutlinePlusSmall className=' Add-Icon' id='plusIcon' />
          </Link>
        </div>

        <ServeyItemList/>
    </div>
  );
}

export default Content;
