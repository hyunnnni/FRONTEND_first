import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

//송금 기능 송금 POST 클라이언트 2 입장
const PostTransferEht = () => {
    const navigate = useNavigate();
    const { itransAlarm } = useParams();
    const [error, setError] = useState(null);
    const [InsTransferEhtDto, setInsTransferEhtDto] = useState({
      loginedIuser: 2,
      itransAlarm: itransAlarm,
      amount: "",
      upaymentPw:""
    });
    const useCountry = 'KRW';
    

    const[pw, setpw] = useState(false);

    console.log(itransAlarm);
  
    const { upaymentPw, amount } = InsTransferEhtDto; //비구조화 할당

    const formatAmount = (value) => {
      if (!value) return value;
      const onlyNums = value.replace(/[^0-9]/g, "");
      return onlyNums.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
    const onChange = (event) => {
      const { value, name } = event.target; //event.target에서 name과 value만 가져오기
      if (name === "amount") {
        setInsTransferEhtDto({
            ...InsTransferEhtDto,
            [name]: formatAmount(value)
        });
    } else {
        setInsTransferEhtDto({
            ...InsTransferEhtDto,
            [name]: value
        });
    }
    };
  

    const postTransferEht = async () => {

      try{

        const SelTransferAllDto = {
            loginedIuser : 2 ,
            fromOrTo : 0,
            page : 1
        };
        const queryString = new URLSearchParams(SelTransferAllDto).toString();
  
        const postData = {
            loginedIuser: InsTransferEhtDto.loginedIuser,
            itransAlarm: parseInt(InsTransferEhtDto.itransAlarm),
            amount: InsTransferEhtDto.amount,
            upaymentPw : InsTransferEhtDto.upaymentPw

        };

        console.log(postData);
    
        await axios.post(`//localhost:8080/transfer`, postData).then((res) => {

        const itransfer = res.data;
        console.log(itransfer);

        if(itransfer > 0){
          alert('송금되었습니다.');
          navigate(`/main/${itransfer}`);
        } else if( itransfer === -100){
          alert('잔액 부족입니다. 토큰을 먼저 충전해주세요');
          navigate('/eht/goodslist?',{params : {useCountry}});
        } else if( itransfer === -1){
          alert('결제 비밀번호가 설정되어있지않습니다. 먼저 설정해주세요');
          navigate(`/transfer/all?${queryString}`);
        }
          
        

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
        const SelTransferAlarmAcceptDto = {
            loginedIuser : 2 ,
            page : 1
        };
        const queryString = new URLSearchParams(SelTransferAlarmAcceptDto).toString();
  
      navigate(`/transfer/alarm/accept?${queryString}`);
    };
  
    return (
      <div>
          {!upaymentPw && (
              <div>
                  <div>
                      <span>송금액</span>
                      <input type="text" name="amount" value={amount} onChange={onChange} />
                  </div>
                  <br />
                  <button onClick={() => setpw(true)}>
                        송금
                    </button>
              </div>
          )}
            {pw && (
                <div>
                    <span>결제 비밀번호 (6자리)</span>
                    <input
                        type="password"
                        name="upaymentPw"
                        value={upaymentPw}
                        onChange={onChange}
                        maxLength="6"
                        onKeyUp={(e) => {
                            if (upaymentPw.length === 6) {
                              postTransferEht();
                            }
                        }}
                    />
                </div>
            )}
            <br />
            <button onClick={backToList}>목록으로 돌아가기</button>
        </div>
    );
};
  
  export default PostTransferEht;