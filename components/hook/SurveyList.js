import useSWR from 'swr';
import { API_SURVEY_LIST } from '../config/Const';
import axios from 'axios';

const fetcher = (...args) => axios.get(...args).then(res => res.data);

export default function useSurveyList() {
  const { data, error, isLoading, mutate} = useSWR(API_SURVEY_LIST, fetcher, { refreshInterval: 10000 });

  return {
    surveyList : data,
    isError : error,
    isLoading,
    mutate
  }
}
