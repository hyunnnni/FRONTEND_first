import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';

//토큰 기능 토큰 -> 돈 PUT 
const PutIncinerate = () => {
  const navigate = useNavigate();

  const { loginedIuser } = useParams();
  const [error, setError] = useState(null);
  const [useCountry, setUseCountry] = useState('KRW');
  const [updEhtIncinerateDto, setUpdEhtIncinerateDto] = useState({
    loginedIuser: loginedIuser,
    upaymentPw: '',
    ehtIncinerate: 0,
    useCountry: useCountry
  });
  const[pw, setpw] = useState(false);

  const { upaymentPw, ehtIncinerate} = updEhtIncinerateDto; //비구조화 할당

  const onChange = (event) => {
    const { value, name } = event.target; //event.target에서 name과 value만 가져오기
    setUpdEhtIncinerateDto({
      ...updEhtIncinerateDto,
      [name]: value,
    });
  };

  const barter = async () => {

    try{

    const postData = {
        loginedIuser: updEhtIncinerateDto.loginedIuser,
        upaymentPw: updEhtIncinerateDto.upaymentPw,
        ehtIncinerate: parseInt(updEhtIncinerateDto.ehtIncinerate),
        useCountry: updEhtIncinerateDto.useCountry
    };

    console.log(postData);

    await axios.put(`//localhost:8080/eht/incinerate`, postData).then((res) => {
      alert('전환되었습니다.');
      console.log(postData.loginedIuser);
      if(postData.loginedIuser === '1'){
        navigate('/transfer/myeht?',{params : {loginedIuser}});
      }else if(postData.loginedIuser === '2'){
        navigate('/transfer/myehts?',{params : {loginedIuser}});
      }

    });
    }catch(err){
        setError(err);
        console.error(error)
        window.alert(err.response?.data?.message || 'An error occurred');
                // 확인을 누르면 이전 화면으로 이동
                navigate('/transfer/myeht?',{params : {loginedIuser}});
                console.log(navigate);
      }
    };
    

  const backToList = () => {
    if(loginedIuser === '1'){
      navigate('/transfer/myeht?',{params : {loginedIuser}});
    }else if(loginedIuser === '2'){
      navigate('/transfer/myehts?',{params : {loginedIuser}});
    }
    
  };


  return (
  <div>
    {!upaymentPw && (
      <div>
        <div>
        <span>요청 토큰 int</span>
        <input type="text" name="ehtIncinerate" value={ehtIncinerate} onChange={onChange} />
        </div>
        <br />
        <button onClick={() => setpw(true)}>전환</button>
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
        onKeyUp={(e) => {if (upaymentPw.length === 6) { barter();}}}/>
    </div>
            )}
    <br />
    <button onClick={backToList}>나의 토큰값으로 돌아가기</button>
    </div>
  );
};

export default PutIncinerate;