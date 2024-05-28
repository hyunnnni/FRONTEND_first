import React from'react';
import {useNavigate} from'react-router-dom';

const Board = ({ ialarm, trNm, eachTrNm, hostNm, hostUid, hostRole, guestNm, 
    guestUid, guestRole, alAccept, alCreatedAt, alUpdatedAt, alEndedAt}) => {

    const navigate = useNavigate();

    const moveToUpdate = () => {
        navigate('/api/management/transaction/'+ialarm);
    };
    const moveToList = () => {
        navigate('/api/management/all');
      };
      const moveToUserList = () => {
        navigate('/api/management/alluser');
      };

    const getAcceptStatus = (alAccept) => {
        if (alAccept === 1) {
          return "진행 중";
        } else if (alAccept === 2) {
          return "거절로 인한 취소";
        } else if (alAccept === 3) {
          return "거래 완료";
        } else if (alAccept === 4) {
          return "관리자 or 호스트로 인해 알람 취소";
        }else {
          return "확인 전";
        }
      };

      


    return (
        <div>
            <h1>계약명 : {trNm}</h1>
            <h2>개인 계약명 : {eachTrNm}</h2>
            <h5>계약 생성일 : {alCreatedAt} | 계약 진행일 : {alUpdatedAt} | 계약 완료일 : {alEndedAt}</h5>
            <hr />
            <h5>계약 생성자 이름 : {hostNm} | 계약 생성자 ID : {hostUid} | 계약 생성자 등급 : {hostRole}</h5>
            <hr />
            <h5>계약 수신자 이름 : {guestNm} | 계약 수신자 ID : {guestUid} | 계약 수신자 등급 : {hostRole}</h5>
            <hr />
            <h3><p>거래 상태 : {getAcceptStatus(alAccept)}</p></h3>
            <div>
                <button onClick = {moveToUpdate}>수정</button>
                <button onClick = {moveToList}>모든 목록</button>
                <button onClick = {moveToUserList}>생성자에 따른 목록</button>
            </div>
        </div>
    );
};

export default Board;