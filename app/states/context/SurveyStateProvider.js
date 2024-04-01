
import axios from "axios";
import { createContext, useState } from "react";
import useSWR from 'swr';

export const SurveyStateContext = createContext();

const fetcher = (...args) => {
  return axios.get(...args).then(res => res.data())
};

export default function SurveyStateProvider(props) {
  // const { data, error, isLoading } = useSWR(API_SURVEY_LIST, fetcher);
  // const [surveyList, setSurveyList] = useState([
  //   {
  //     surveyId: 0,
  //     surveyTitle: '설문조사1',
  //     surveySubTitle: '서브 타이틀',

  //     date: 1707322599671,
  //     questions: [
  //       {
  //         questionId: '0',
  //         questionType: 'shortText',
  //         questionText: '1번질문',
  //         response:'',
  //         options :[]
  //       },
  //     ],
  //   },
  // ]);

  // const newSurveyId =
  //   surveyList.length > 0 ? surveyList[surveyList.length - 1].surveyId + 1 : 0;

  const getSurveyItem = (id) =>{
    // return surveyList.find((survey) => survey.surveyId === parseInt(id));
  }
  
  const onCreate = (data) => {
    // const newData = { ...data, surveyId: newSurveyId };
    // setSurveyList([...surveyList, newData]);
  };

  const onEdit = (data) => {
    // const editSurvey = surveyList.map((it) =>
    //   it.surveyId === data.surveyId ? { ...data } : it
    // );
    // setSurveyList(editSurvey);
  };

  const onDelete = (surveyId) => {
    // const deleteSurvey = surveyList.filter((it) => it.surveyId !== surveyId);
    // setSurveyList(deleteSurvey);
  };

  const onCopy = (surveyId) => {
    // const copySurvey = surveyList.find((it) => it.surveyId === surveyId);
    // const changedCopySurveyId = { ...copySurvey, surveyId: newSurveyId };
    // setSurveyList([...surveyList, changedCopySurveyId]);
    // console.log('copySurveyList' + surveyList);
  };

  // const globalState = {
  //   surveyList : data,
  //   // getSurveyItem,
  //   // setSurveyList,
  //   // onCreate,
  //   // onEdit,
  //   // onDelete,
  //   // onCopy
  //   isError : error,
  //   isLoading
  // }
  
  return (
    <>
    {/* <SurveyStateContext.Provider value={globalState}> */}
      {props.children}
    {/* </SurveyStateContext.Provider> */}
    </>
  )
}