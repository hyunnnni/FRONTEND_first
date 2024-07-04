import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import '../../App.css'; 
import { Link } from 'react-router-dom';

//토큰 기능 토큰 상품 리스트 조회 GET
const GetEhtGoodsList = () => {
    
    const [loading, setLoading] = useState(false); // 초기에는 로딩 상태를 false로 설정
    const [error, setError] = useState(null);
    const [selEhtGoodsListAll, setSelEhtGoodsListAll] = useState([]); // 배열로 초기화
    const [useCountry, setUseCountry] = useState('KRW');

    const getSelTransferAllList = useCallback(async (useCountry) => {
        setLoading(true);
        try {
            console.log(useCountry);
            const resp = await (await axios.get('//localhost:8080/eht/goodslist?',{params : {useCountry}})).data;
            setSelEhtGoodsListAll(resp);
            setLoading(false);
            console.log(resp);
        } catch (err) {
            setSelEhtGoodsListAll([]); // 오류 발생 시 빈 리스트로 설정
            setError(err);
            
            setLoading(false);
            window.alert(err.response?.data?.message || 'An error occurred');
        }
    },[]);
    console.log(error)

    console.log(useCountry);

    useEffect(() => {
        getSelTransferAllList(useCountry);

    }, [getSelTransferAllList, useCountry]);


    return (
        <div>
            <div>
                <button onClick={() => setUseCountry('KRW')}>한국 원</button>
                <button onClick={() => setUseCountry('USD')}>미국 달러</button>
                <button onClick={() => setUseCountry('AUD')}>호주 달러</button>
                <button onClick={() => setUseCountry('CAD')}>캐나다 달러</button>
                <button onClick={() => setUseCountry('CNH')}>중국 위안</button>
                <button onClick={() => setUseCountry('EUR')}>유럽 유로</button>
                <button onClick={() => setUseCountry('JPY')}>일본 엔</button>
            </div>
            {loading ? (
                <h2>loading...</h2>
            ) : (
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>상품명</th>
                                <th>판매 토큰값</th>
                                <th>코인 가격</th>
                                <th>가격</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {selEhtGoodsListAll.length === 0 ? (
                                <tr>
                                    <td colSpan="5">조회할 데이터가 없습니다.</td>
                                </tr>
                            ) : (
                                selEhtGoodsListAll.map((ehtGoods, index) => (
                                    <tr key={ehtGoods.iehtGoods}>
                                        <td>{ehtGoods.ehtGNm}</td>
                                        <td>{ehtGoods.ehtGPrice}</td>
                                        <td style={{ color: 'green' }}>{ehtGoods.ehtGCoin}</td>
                                        <td style={{ color: 'red' }}>{ehtGoods.ehtExchangePrice}</td>
                                        <td><Link to={`/eht/barter/${ehtGoods.iehtGoods}/${ehtGoods.ehtExchangePrice}`}>구매</Link></td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default GetEhtGoodsList;