import React from'react';
import {useNavigate} from'react-router-dom';

const Board = ({ itran, host, hostNm, hostUid, hostRole, trNm, trState, trCreatedAt, trStartAt, trEndedAt, guestUsers}) => {

    const navigate = useNavigate();

    const moveToUpdate = () => {
        navigate('/management/transaction/'+itran);
    };
    const moveToList = () => {
        navigate('/management/all');
      };

    const getAcceptStatus = (alAccept) => {
        if (alAccept === 1) {
          return "수락";
        } else if (alAccept === 2) {
          return "거절";
        } else if (alAccept === 3) {
          return "관리자 or 호스트로 인해 알람 취소";
        } else {
          return "확인 전";
        }
      };

      
    

    return (
        <div>
            <h1>{trNm}</h1>
            <h5>현재 계약 상태 : {trState} | 계약 생성일 : {trCreatedAt} | 계약 진행일 : {trStartAt} | 계약 마감일 : {trEndedAt}</h5>
            <hr />
            <h5>계약 생성자 이름 : {hostNm} | 계약 생성자 ID : {hostUid} | 계약 생성자 등급 : {hostRole}</h5>
            <hr />
            <h3>거래수신자 목록</h3>
            <div>
                {guestUsers.map((guestUsers, index) => (
                    <div key={index}>
                        <h5><p>거래 수신자 이름 : {guestUsers.guestNm}</p></h5>
                        <h5><p>거래 수신자 ID : {guestUsers.guestUid}</p></h5>
                        <h5><p>수락 상태 : {getAcceptStatus(guestUsers.alAccept)}</p></h5>
                        <h5><p>수락/거절 시간 : {guestUsers.alUpdatedAt}</p></h5>
                        <hr />
                    </div>
                ))}
            </div>
            <div>
                <button onClick = {moveToUpdate}>수정</button>
                <button onClick = {moveToList}>목록</button>
            </div>
        </div>
    );
};

export default Board;