'use client'

import useSurveyItem from "@/components/hook/SurveyItem";
import SurveyItem from "../../components/SurveyItem";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Item({id}) {
  const route = useRouter();

  const {surveyItem, isError, isLoading, mutate} = useSurveyItem(id);
  
  useEffect(() => {
    console.log('useSurveyItem muate activ!')
    mutate();
  },[mutate]);

  if(isError){
    route.push('./new');
    return;
  }

  if(isLoading) return (
    <div>Loading...</div>
  )

  return <SurveyItem isEdit={true} originSurveyItem={surveyItem}/>
} 

export default function Edit({params}){
  const id = params?.id;

  return (
    <Item id={id}/>
  );
}
