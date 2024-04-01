import { API_SURVEY, API_SURVEY_LIST } from '@/components/config/Const';
import { mutate } from 'swr'
import axios from 'axios';

export async function POST(request, {params}) {
  const action = params.action;
  let result = { action: "not action"};
  let status = 200;
  let data;

  try{
    data = await request.json();
  }catch(error){
    result.action = `Exception : ${error.message}` 

    return Response.json(result,{
      status : 400,
    })
  }

  try{
    console.log(data);
    switch(action){
      case "create": 
        result.action = "create";
        await axios.post(`${API_SURVEY}/regist`, {...data, userId:"sangbin0810"});
        break;
      case "edit": 
        result.action = "edit";
        await axios.post(`${API_SURVEY}/edit`, data);
        break;
      case "delete": 
        result.action = "delete"
        await axios.post(`${API_SURVEY}/remove`, {surveyId : data?.id});
        break;
      case "copy": 
        result.action = "copy"
        const originData = await axios.get(`${API_SURVEY}/${data?.id}`).then(res => res.data);
        await axios.post(`${API_SURVEY}/regist`, originData).then(res => res.data);
        break;
      defualt:
        result.action = `${action} not define action`
    }
  }
  catch(error) {
    result.action = `Exception : ${error.message}` 
    status = 400;
  }

  return Response.json(result,{
    status,
  })
}