import { useRouter } from "next/navigation";
import { useContext } from 'react';
import Swal from 'sweetalert2';
// global
import { SurveyStateContext } from '@/app/states/context/SurveyStateProvider';
// ui
import {
  MdOutlineEdit,
  MdOutlineDeleteOutline,
  MdContentCopy,
} from 'react-icons/md';
import { TbExternalLink } from "react-icons/tb";
import './ToggleEditBox.css';

import axios from 'axios';
import useSurveyList from "@/components/hook/SurveyList";

function ToggleEditBox({ surveyId, onToggleEditBox }) {

  // const {onDelete , onCopy} = useContext(SurveyStateContext);
  const router = useRouter();
  const { mutate } = useSurveyList();
  const handleCopySurvey = () => {

    let timerInterval;
    Swal.fire({
      title: "복사중...",
      html: " <b></b> .",
      timer: 700,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getPopup().querySelector("b");
        timerInterval = setInterval(() => {
          timer.textContent = `${Swal.getTimerLeft()}`;
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      }
    }).then((result) => {
      axios.post('/api/survey/copy', {id : surveyId}).then(()=> mutate());
      onToggleEditBox();
    });

  };
  const handleDeleteSurvey = () => {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      confirmButtonText: 'Yes, delete it!',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      onToggleEditBox();
      if (result.isConfirmed) {
        
        axios.post('/api/survey/delete', {id : surveyId})
        .then(()=>{
          Swal.fire({
            title: 'Deleted!',
            text: 'Your file has been deleted.',
            icon: 'success',
          });
          mutate();
        })
        .catch(()=>{
          Swal.fire({
            title: 'Not Deleted!',
            text: 'Your file has been deleted.',
            icon: 'failed',
          });
        });
      }
    });
  };

  return (
    <div className='ToggleEditBox-Wrapper'>
      <div  onClick={() => router.push(`./response/${surveyId}`)}>
        <TbExternalLink  className='EditBoxIcon' />
        설문 보기
      </div>
      <div onClick={() => router.push(`./edit/${surveyId}`)}>
        <MdOutlineEdit className='EditBoxIcon' />
        편집
      </div>
      <div onClick={handleCopySurvey}>
        <MdContentCopy className='EditBoxIcon' /> 복제
      </div>
      <div className='DeleteBox' onClick={handleDeleteSurvey}>
        <MdOutlineDeleteOutline className='EditBoxIcon' />
        삭제
      </div>
    </div>
  );
}

export default ToggleEditBox;
