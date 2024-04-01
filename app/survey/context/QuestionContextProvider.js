'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import shortid from "shortid";

export const QuestionContext = createContext();

export default function QuestionContextProvider({set, children}) {

  //아이디 생성 react-sortablejs
  const generateUniqueId = () => {
    return shortid.generate();
  };

  const defaultQuestionItem = useMemo(()=>[
    {
      questionId: generateUniqueId(),
      questionType: 'shortText',
      questionText: '',
      response: '',
      options: [
        // {
        //   checkBoxNum: 1,
        //   checked: false,
        //   checkBoxText: '',
        // },
      ],
    },
  ],[]);

  //초기값
  const [questions, setQuestions] = useState(() => {
    if (set?.isEdit && set?.id) {
      return set?.id;
    } else if (set?.isResponse && set?.responseData )  {
      return set?.responseData;
    }else{
      // 기본 데이터 사용
      return defaultQuestionItem;
    }
  });
  

  // 질문추가하기
  const addQuestion = (questionPosition) => {
    const newQuestion = {
      questionId: generateUniqueId(),
      questionType: 'shortText',
      questionText: '',
      response: '',
      options: [
        // {
        //   checkBoxNum: 1,
        //   checked: false,
        //   checkBoxText: '',
        // },
      ],
    };
    const updatedQuestions = [...questions];

    updatedQuestions.splice(questionPosition, 0, newQuestion); // 새 질문을 삽입
    setQuestions(updatedQuestionqs); // 상태 업데이트

    //새로 들어온 question에 대한 에니메이션 class 넣어주기
    setTimeout(() => {
      const questionElements =
        document.getElementsByClassName('wrapper-Questions');
      questionElements[questionPosition].classList.add('new-question');

      // 일정 시간이 지난 후에 애니메이션 클래스 제거
      setTimeout(() => {
        questionElements[questionPosition].classList.remove('new-question');
      }, 800);
    }, 0); // 0ms 후에 클래스 추가
  };

  // 질문 삭제
  const deleteQuestion = (questionPosition) => {
    const remainingQuestion = [
      ...questions.slice(0, questionPosition - 1),
      ...questions.slice(questionPosition),
    ];
    const updatedQuestions = remainingQuestion.map((it) => ({
      ...it,
      questionPosition:
        it.questionPosition > questionPosition
          ? it.questionPosition - 1
          : it.questionPosition,
    }));

    setQuestions(updatedQuestions);
  };

  // 질문 state 변경
  const handleQuestionChange = (position, field, value) => {
    setQuestions((prev) => {
      const updatedQuestion = prev.map((it, idx) => {
        if (idx === parseInt(position - 1)) {
          return {
            ...it,
            [field]: value,
          };
        }
        return it;
      });
      return updatedQuestion;
    });
  };

  // 질문 위치 변경
  const handleQuestionPosition = (type, currentPosition) => {
    const currentIndex = currentPosition - 1;
    const updatedQuestions = [...questions];

    // 위로 보내기
    if (type === 'upPosition' && currentIndex > 0) {
      // 변경된 질문 배열을 설정
      [updatedQuestions[currentIndex], updatedQuestions[currentIndex - 1]] = [
        updatedQuestions[currentIndex - 1],
        updatedQuestions[currentIndex],
      ];
      setQuestions(updatedQuestions);

      // 아래로 보내기
    } else if (type === 'downPosition' && currentIndex < questions.length - 1) {
      [updatedQuestions[currentIndex], updatedQuestions[currentIndex + 1]] = [
        updatedQuestions[currentIndex + 1],
        updatedQuestions[currentIndex],
      ];
      setQuestions(updatedQuestions);
    } else {
      alert('불가');
    }
  };

  // checkBox 리스트 추가하기
  const addCheckBoxList = (questionPosition) => {
    const newCheckBox = {
      checkBoxNum: questions[questionPosition - 1].options.length + 1,
      checked: false,
      optionText: '',
    };

    setQuestions((prev) => {
      const updatedQuestions = prev.map((question, idx) => {
        if (idx === questionPosition - 1) {
          return {
            ...question,
            options: [...question.options, newCheckBox],
          };
        }
        return question;
      });
      return updatedQuestions;
    });
  };

  // checklist값 변경하고 저장
  const handleOptionChange = (questionPosition, checkBoxNum, field, value) => {
    setQuestions((prev) => {
      const updatedQuestions = prev.map((question, idx) => {
        if (idx === questionPosition - 1) {
          const updatedOptions = question.options.map((option, optionIdx) => {
            if (optionIdx === checkBoxNum - 1) {
              return {
                ...option,
                [field]: value,
              };
            }
            return option;
          });
          return {
            ...question,
            options: updatedOptions,
          };
        }
        return question;
      });
      return updatedQuestions;
    });
  };

  //DragDrop으로 cehckList index변경
  const handleOptionIndex = (questionIndex, updatedOptions) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[questionIndex].options = updatedOptions;
      return updatedQuestions;
    });
  };

  //checkList 삭제 하기
  const handleOptionDelete = (questionIndex, optionIndex) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[questionIndex].options = updatedQuestions[
        questionIndex
      ].options.filter((it, idx) => idx !== optionIndex);
      return updatedQuestions;
    });
  };



  const surveyState = {
    questions,
    setQuestions,
    addQuestion,
    deleteQuestion,
    handleQuestionChange,
    handleQuestionPosition,
    handleOptionChange,
    handleOptionIndex,
    addCheckBoxList,
    handleOptionDelete,
  }
  
  return (
    <QuestionContext.Provider value={surveyState}>
      {children}
    </QuestionContext.Provider>
  )
}