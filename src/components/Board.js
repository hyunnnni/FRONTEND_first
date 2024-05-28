import React from'react';
import {Link, useNavigate} from'react-router-dom';

const Board = ({ itran, host, hostNm, hostUid, hostRole, trNm, trCreatedAt, guestUsers}) => {

    const navigate = useNavigate();

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

      
      const irole = 1;

    return (
        <div>
            <h1>{trNm}</h1>
            <h5>계약 생성일 : {trCreatedAt}</h5>
            <hr />
            <h5>계약 생성자 이름 : {hostNm} | 계약 생성자 ID : {hostUid} | 계약 생성자 등급 : {hostRole}</h5>
            <hr />
            <h3>해당 계약 목록</h3>
            <div>
                {guestUsers.map((guestUsers) => (
                    <div key={guestUsers.ialarm}>

                        <h5><Link to ={`/api/management/moredetail/${guestUsers.ialarm}/${irole}`}>{guestUsers.guestUid}님과의 거래</Link></h5>
                        <h5>개인 거래명 : {guestUsers.eachTrNm}</h5>
                        <h5><p>거래 상태 : {getAcceptStatus(guestUsers.alAccept)}</p></h5>
                        <hr />
                    </div>
                ))}
            </div>
            <div>
                <button onClick = {moveToList}>모든 목록</button>
                <button onClick = {moveToUserList}>생성자에 따른 목록</button>
            </div>
        </div>
    );
};

export default Board;