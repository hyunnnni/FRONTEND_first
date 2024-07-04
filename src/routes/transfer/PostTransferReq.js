import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

//송금 기능 송금 요청 POST 클라이언트 1 입장
const PostTransferReq = () => {
    const navigate = useNavigate();
  
    const [error, setError] = useState(null);
    const [InsTransferReqDto, setInsTransferReqDto] = useState({
      loginedIuser: 1,
      targetIuser: 0,
      amount: 0
    });
  
    const { targetIuser, amount } = InsTransferReqDto; //비구조화 할당
  
    const onChange = (event) => {
      const { value, name } = event.target; //event.target에서 name과 value만 가져오기
      setInsTransferReqDto({
        ...InsTransferReqDto,
        [name]: value,
      });
    };
  
    const postTransferReq = async () => {
  
       const SelTransferAlarmDto = {
           loginedIuser : 1 ,
           fromOrTo : 1,
           page : 1
       };
       const queryString = new URLSearchParams(SelTransferAlarmDto).toString();
  
      try{
  
      const postData = {
          loginedIuser: InsTransferReqDto.loginedIuser,
          targetIuser: parseInt(InsTransferReqDto.targetIuser),
          amount: InsTransferReqDto.amount
      };
  
      await axios.post(`//localhost:8080/transfer/req`, postData).then((res) => {
        alert('요청되었습니다.');
        navigate(`/transfer/alarm?${queryString}`);
      });
      }catch(err){
          setError(err);
          console.error(error)
          window.alert(err.response?.data?.message || 'An error occurred');
                  // 확인을 누르면 이전 화면으로 이동
                  navigate(-1);
        }
      };
      
  
    const backToList = () => {
        const SelTransferAlarmDto = {
            loginedIuser : 1 ,
            fromOrTo : 1,
            page : 1
        };
        const queryString = new URLSearchParams(SelTransferAlarmDto).toString();
  
      navigate(`/transfer/alarm?${queryString}`);
    };
  
    return (
      <div>
        <div>
          <hr/>
          <span>요청 금액 int</span>
          <input type="text" name="amount" value={amount} onChange={onChange} />
        </div>
        <br />
        <div>
          <span>수신자</span>
          <input
            type="text"
            name="targetIuser"
            value={targetIuser}
            onChange={onChange}
          />
        </div>
        <br />
        <div>
          <button onClick={postTransferReq}>요청 전송</button>
          <button onClick={backToList}>취소</button>
        </div>
      </div>
    );
  };
  
  export default PostTransferReq;