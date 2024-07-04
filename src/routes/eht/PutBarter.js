import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';

//토큰 기능 돈-> 토큰 PUT 클라이언트 2 시점
const PutBarter = () => {
  const navigate = useNavigate();

  const { iehtGoods } = useParams();
  const { ehtExchangePrice } = useParams();
  const [error, setError] = useState(null);
  const [useCountry, setUseCountry] = useState('KRW');
  const loginedIuser = 2;
  const [updEhtBarterDto, setUpdEhtBarterDto] = useState({
    loginedIuser: loginedIuser,
    iehtGoods: iehtGoods,
    upaymentPw: '',
    icard: 0,
    usePricePaid: ehtExchangePrice,
    useCountry: useCountry
  });
  const[pw, setpw] = useState(false);
  const [cards, setCards] = useState([]);

  const { upaymentPw, icard} = updEhtBarterDto; //비구조화 할당

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get('//localhost:8080/eht/card',{params : {loginedIuser}});
        setCards(response.data);
      } catch (err) {
        setError(err);
        console.error(err);
      }
    };
    fetchCards();
  }, []);

  const onChange = (event) => {
    const { value, name } = event.target; //event.target에서 name과 value만 가져오기
    setUpdEhtBarterDto({
      ...updEhtBarterDto,
      [name]: value,
    });
  };

  const barter = async () => {

    const SelTransferAlarmAcceptDto = {
        loginedIuser: 2,
        page: 1
    };
    const queryString = new URLSearchParams(SelTransferAlarmAcceptDto).toString();

    try{

    const postData = {
        loginedIuser: updEhtBarterDto.loginedIuser,
        iehtGoods: updEhtBarterDto.iehtGoods,
        upaymentPw: updEhtBarterDto.upaymentPw,
        icard: parseInt(updEhtBarterDto.icard),
        usePricePaid: updEhtBarterDto.usePricePaid,
        useCountry: updEhtBarterDto.useCountry
    };

    console.log(postData);

    await axios.put(`//localhost:8080/eht/barter`, postData).then((res) => {
      alert('구매되었습니다.');
      navigate(`/transfer/alarm/accept?${queryString}`);

    });
    }catch(err){
        setError(err);
        console.error(error)
        window.alert(err.response?.data?.message || 'An error occurred');
                // 확인을 누르면 이전 화면으로 이동
                navigate('/eht/goodslist?',{params : {useCountry}});
                console.log(navigate);
      }
    };
    

  const backToList = () => {
    navigate('/eht/goodslist?',{params : {useCountry}});
  };

  const companyNm = (cardCompany) => {
    
    if (cardCompany === 1) {
        return "삼성카드";
    } else if (cardCompany === 2) {
        return "현대카드";
    } else if (cardCompany === 3) {
        return "신한카드";
    } else if (cardCompany === 4) {
        return "우리카드";
    } else if (cardCompany === 5) {
      return "국민카드";
    } else if (cardCompany === 6) {
        return "카카오카드";
    } else if (cardCompany === 7) {
      return "하나카드";
    } else if (cardCompany === 8) {
      return "농협카드";
    } 
  }


  return (
  <div>
    {!upaymentPw && (
      <div>
        <div>
          <span>카드</span>
          <select name="icard" value={icard} onChange={onChange}>
            <option value="0">카드를 선택하세요</option>
            {cards.map((card) => (
            <option key={card.icard} value={card.icard}>
            {card.cardNm} {/* 카드 이름 또는 다른 식별 정보 */}
            {companyNm(card.cardCompany)}
            </option>
            ))}
          </select>
        </div>
        <br />
        <button onClick={() => setpw(true)}>결제</button>
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
    <button onClick={backToList}>토큰 상품 리스트로 돌아가기</button>
    </div>
  );
};

export default PutBarter;