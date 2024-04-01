'use client'

import { useCallback, useContext, useEffect } from 'react';
import { ReactSortable } from 'react-sortablejs';

import QuestionItem from './QuestionItem';

import './QuestionList.css';
import QuestionContextProvider, { QuestionContext } from '../context/QuestionContextProvider';


function QuestionList({ updateSurvey, isEdit, originData, isResponse}) {
  const {questions, setQuestions } = useContext(QuestionContext);

  useEffect(() => {
    console.log('active');
    updateSurvey(questions);
  },[questions])

  return (
      <div className='quesionList-Wrapper'>
        {/* dragDrop 라이브러리 */}
        <ReactSortable
          list={questions}
          setList={setQuestions}
          animation={200}
          delayOnTouchOnly={true}
          delay={2}
          handle='.handleDragDrop'
        >
          {questions &&
            questions.map((it, questionIdx) => (
              <QuestionItem
                key={it.questionId}
                questionPosition={questionIdx + 1}
                question={it}
                questionsLength={questions.length}
                isResponse={isResponse}
              />
            ))}
        </ReactSortable>
      </div>
  );
}

export default QuestionList;
