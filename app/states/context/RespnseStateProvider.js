'use client'

import { createContext, useState } from "react";

export const ResponseStateContext = createContext();

export default function ResponseStateProvider(props) {
  const [responseList, setResponseList] = useState([])

  const newResponseId = responseList.length > 0 ? responseList[responseList.length - 1].responseId + 1 : 0;

  const onCreate = (data) => {
    const newData = {...data, responseId: newResponseId}
    setResponseList([...responseList, newData])
  }

  const globalState = {
    responseList,
    setResponseList,
    onCreate,
  }
  
  return (
    <ResponseStateContext.Provider value={globalState}>
      {props.children}
    </ResponseStateContext.Provider>
  )
}