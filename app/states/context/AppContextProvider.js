'use client';

import ResponseStateProvider from "./RespnseStateProvider";
import SurveyStateProvider from "./SurveyStateProvider";

export default function AppContextProvider(props) {
  return (
    <>
      {/* <SurveyStateProvider> */}
      <ResponseStateProvider>
      {props.children}
      </ResponseStateProvider>
      {/* </SurveyStateProvider> */}
    </>
  );
}