import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


//토큰 기능 나의 토큰값 조회 GET 클라이언트 1 입장
const GetMyToken = () => {
    
        const [loading, setLoading] = useState(true);
        const [myToken, SetMyToken] = useState({});
        const [error, setError] = useState(null);
        const loginedIuser = 1;
        

        const getMyToken= useCallback(async (loginedIuser) => {
            setLoading(true);

        try {
            
            const resp = await (await axios.get('//localhost:8080/transfer/myeht?',{params : {loginedIuser}})).data;
            SetMyToken(resp);
            setLoading(false);
            console.log(resp);

        } catch (err) {

            SetMyToken([]); // 오류 발생 시 빈 리스트로 설정
            setError(err);
            
            setLoading(false);
            window.alert(err.response?.data?.message || 'An error occurred');

        }
    },[]);

        console.log(myToken);

        useEffect(() => {
            getMyToken(loginedIuser);
    
        }, [getMyToken, loginedIuser]);

  if(error){
    alert(error.message)
  }

  return (
    <div>
      {loading ? (
        <h2>loading...</h2>
      ) : (
        <div>
            <hr />
            <h1>나의 토큰값</h1>
            <br/>
            <h5>{myToken.unm}</h5>
            <h5>나의 토큰 : {myToken.ehtBalance}</h5>
            <h5> <Link to={`/eht/incinerate/${loginedIuser}`}>토큰 전환</Link></h5>
        </div>
      )}
    </div>
  );
};

export default GetMyToken;