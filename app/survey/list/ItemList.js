import React, { useState } from 'react';
import ToggleEditBox from './ToggleEditBox';

import { IoIosArrowDown } from 'react-icons/io';
import getDate from '@/app/util/Date';

import './ItemList.css';


function ItemList({
  surveyId,
  surveyTitle,
  surveySubTitle,
  createdDate,
}) {
  const [toggleEditBox, setToggleEditBox] = useState(false);

  //모달 열기
  const onToggleEditBox = () => {
    setToggleEditBox((prev) => !prev);
  };

  return (
    <div className='ItemListWrppaer'>
      <div className='ItemList' >
        <div className='ItemList-Title'> {surveyTitle}</div>
        <div className='ItemList-SubTitle' >
          <div className='subTitle'>{surveySubTitle} </div>

          <div className='date'> {getDate(new Date(createdDate))}</div>

          <div className='arrowDown' onClick={onToggleEditBox}>
            <IoIosArrowDown />
          </div>

          {toggleEditBox && (
            <ToggleEditBox
              surveyId={surveyId}
              onToggleEditBox={onToggleEditBox}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemList;
