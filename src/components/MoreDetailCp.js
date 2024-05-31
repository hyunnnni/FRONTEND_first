import React from'react';
import {Link, useNavigate} from'react-router-dom';

const Board = ({ itran, ialarm, trNm, hostNm, hostUid, hostRole, guest, guestNm, 
    guestUid, guestRole, alState, trCreatedAt, trUpdatedAt, trEndedAt, icon, contract}) => {

    const navigate = useNavigate();

    const moveToUpdate = () => {
        navigate('/api/management/transaction/'+itran);
    };
    const moveToList = () => {
        navigate('/api/management/all');
      };


    const getAcceptStatus = (alState) => {
        if (alState === 1) {
          return "진행 중";
        } else if (alState === 2) {
          return "거절로 인한 취소";
        } else if (alState === 3) {
          return "거래 완료";
        } else if (alState === 4) {
          return "관리자 or 호스트로 인해 알람 취소";
        }else {
          return "확인 전";
        }
      };

      


    return (
        <div>
            <h1>거래명 : {trNm}</h1>
            <h5>계약 생성일 : {trCreatedAt} | 계약 진행일 : {trUpdatedAt} | 계약 완료일 : {trEndedAt}</h5>
            <hr />
            <h5>계약 생성자 이름 : {hostNm} | 계약 생성자 ID : {hostUid} | 계약 생성자 등급 : {hostRole}</h5>
            <hr />
            <h5>계약 수신자 이름 : {guestNm} | 계약 수신자 ID : {guestUid} | 계약 수신자 등급 : {guestRole}</h5>
            <hr />
            <h3><p>거래 상태 : {getAcceptStatus(alState)}</p></h3>
            <hr />
            <h3><Link to ={`/strongbox/${icon}`}>계약서 : {contract}</Link></h3>
            <div>
                <button onClick = {moveToUpdate}>수정</button>
                <button onClick = {moveToList}>모든 목록</button>
            </div>
        </div>
    );
};

export default Board;