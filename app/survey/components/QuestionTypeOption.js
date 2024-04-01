import React, { useContext } from 'react';
import './QuestionTypeOption.css';
import { QuestionContext } from '../context/QuestionContextProvider';
import Image from 'next/image';

function QuestionTypeOption({
  handleToggle,
  questionType,
  questionPosition,
  name,
  value,
}) {
  const { handleQuestionChange } = useContext(QuestionContext);
  
  const handleTypeChange = (questionPosition, questionType, value) => {
    handleQuestionChange(questionPosition, questionType, value);
    handleToggle();
  };

  const iconSrc = {
    shortText : '/longText.png',
    longText : '/shortText.png',
    checkBox : '/checkBox.png',
  }

  return (
    <div
      className={`QuestionTypeImgWrapper ${
        questionType === value ? 'selected' : ''
      }`}
      onClick={() => handleTypeChange(questionPosition, 'questionType', value)}
    >
      <div className='OptionImg'>
        <img alt='' src={iconSrc[value] || ''}></img>
      </div>
      <div className='optionName'>{name}</div>
    </div>
  );
}

export default QuestionTypeOption;
