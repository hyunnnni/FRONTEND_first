import React from'react';
import {useNavigate} from'react-router-dom';

//관리자 기능 모든 거래 목록 상세 조회의 컴포넌트
const GetTransferReceiptCp = ({ itransfer, itransAlarm, toIuser, toIuserNm, fromIuser, fromIuserNm,
    balance, transferAmount, transCreatedAt, transRe}) => {

    const navigate = useNavigate();

    const moveToList = () => {
        navigate(-1);
      };

      


    return (
        <div>
            <h5>송금 시간 : {transCreatedAt}</h5>
            <hr />
            <h5>보낸 사람 이름 : {fromIuserNm}</h5>
            <hr />
            <h5>받는 사람 이름 : {toIuserNm}</h5>
            <hr />
            <h3>거래 금액 : {transferAmount}</h3><h5>거래 당시 나의 잔고 : {balance}</h5>
            <hr />
            <h3>명세서 : {transRe}</h3>
            <div>
                <button onClick = {moveToList}>거래 내역 목록</button>
            </div>
        </div>
    );
};

export default GetTransferReceiptCp;