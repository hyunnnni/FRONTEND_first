import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RemitPostTran = () => {
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [InsTranReqDto, setInsTranReqDto] = useState({
    loginedIuser: 1,
    targetIuser: 0,
    trNm: '',
    trPw:''
  });

  const { targetIuser, trNm, trPw } = InsTranReqDto; //비구조화 할당

  const onChange = (event) => {
    const { value, name } = event.target; //event.target에서 name과 value만 가져오기
    setInsTranReqDto({
      ...InsTranReqDto,
      [name]: value,
    });
  };

  const saveBoard = async () => {

    const SelAllDto = {
        irole : 1 ,
        search : "",
        page : 1
    };
    const queryString = new URLSearchParams(SelAllDto).toString();

    try{

    const postData = {
        loginedIuser: InsTranReqDto.loginedIuser,
        targetIuser: parseInt(InsTranReqDto.targetIuser),
        trNm: InsTranReqDto.trNm,
        trPw: InsTranReqDto.trPw
    };

    await axios.post(`//localhost:8080/transaction/req`, postData).then((res) => {
      alert('등록되었습니다.');
      navigate(`/api/management/all?${queryString}`);
    });
    }catch(err){
        setError(err);
        console.error(error)
        window.alert(err.response?.data?.message || 'An error occurred');
                // 확인을 누르면 이전 화면으로 이동
                navigate(`/api/management/all?${queryString}`);
      }
    };
    

  const backToList = () => {
    const SelAllDto = {
        irole : 1 ,
        search : "",
        page : 1
    };
    const queryString = new URLSearchParams(SelAllDto).toString();

    navigate(`/api/management/all?${queryString}`);
  };

  return (
    <div>
      <div>
        <span>거래명</span>
        <input type="text" name="trNm" value={trNm} onChange={onChange} />
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
        <span>비밀번호</span>
        <input
          type="text"
          name="trPw"
          value={trPw}
          onChange={onChange}
        />
      </div>
      <br />
      <div>
        <button onClick={saveBoard}>저장</button>
        <button onClick={backToList}>취소</button>
      </div>
    </div>
  );
};

export default RemitPostTran;