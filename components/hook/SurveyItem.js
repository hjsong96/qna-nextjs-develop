import useSWR from 'swr';
// import useSWRImmutable from 'swr/immutable';
import { API_SURVEY } from '../config/Const';
import axios from 'axios';

const fetcher = (...args) => axios.get(...args).then(res => res.data);

export default function useSurveyItem(id) {
  const { data, error, isLoading, mutate } = useSWR(`${API_SURVEY}/${id}`, fetcher);

  return {
    surveyItem : data,
    isError : error,
    isLoading,
    mutate
  }
}