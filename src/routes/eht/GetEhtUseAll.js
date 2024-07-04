import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../App.css'; 

//토큰 기능 환전, 구매내역 조회 GET 클라이언트 1 입장
const GetEhtUseAll = () => {
    
    const [loading, setLoading] = useState(false); // 초기에는 로딩 상태를 false로 설정
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [selEhtUseAllList, setSelEhtUseAllList] = useState([]);
    const [buyOrExchange, setBuyOrExchange] = useState(0);
    const [selDateStart, setSelDateStart] = useState(null);
    const [selDateEnd, setSelDateEnd] = useState(null); 
    const [loginedIuser, setLoginedIuser] = useState(1); 

    const getSelTransferAllList = useCallback(async (queryString) => {
        setLoading(true);
        try {
            const resp = await (await axios.get(`//localhost:8080/eht/use?${queryString}`)).data;
            setSelEhtUseAllList(resp);
            setLoading(false);
            console.log(resp);
        } catch (err) {
            setSelEhtUseAllList([]); // 오류 발생 시 빈 리스트로 설정
            setError(err);
            
            setLoading(false);
            window.alert(err.response?.data?.message || 'An error occurred');
        }
    }, []);
    console.log(error)

    useEffect(() => {
        
            const SelEhtUseAllDto = {
                loginedIuser: loginedIuser,
                buyOrExchange: buyOrExchange,
                page: page
            }

            if (selDateStart) {
                SelEhtUseAllDto.selDateStart = selDateStart.toISOString().split('T')[0];
            }
    
            if (selDateEnd) {
                SelEhtUseAllDto.selDateEnd = selDateEnd.toISOString().split('T')[0];
            }
            
            const queryString = new URLSearchParams(SelEhtUseAllDto).toString();
            console.log(queryString);
            getSelTransferAllList(queryString);

        }, [getSelTransferAllList, page, buyOrExchange, selDateStart, selDateEnd, loginedIuser]);


        return (
            <div>
                <div>
                    <br/>
                    <hr/>
                    <button onClick={() => setLoginedIuser(loginedIuser === 1 ? 2 : 1)}>.</button>
                    <button onClick={() => setBuyOrExchange(0)}>전체 내역</button>
                    <button onClick={() => setBuyOrExchange(1)}>토큰 구매 내역</button>
                    <button onClick={() => setBuyOrExchange(2)}>토큰 전환 내역</button>
                </div>
                <div>
                <br/>
                    <label>Start Date: </label>
                    <DatePicker 
                        selected={selDateStart}
                        onChange={(date) => {
                            setSelDateStart(date);
                            if (!selDateEnd) {
                                setSelDateEnd(new Date());
                            }
                        }}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Select start date"
                    />
                    <label>End Date: </label>
                    <DatePicker 
                        selected={selDateEnd}
                        onChange={(date) => setSelDateEnd(date)}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Select end date"
                        minDate={selDateStart}
                    />
                </div>
                <div>
                <br/>
                    <button onClick={() => setPage(page - 1)} disabled={page === 1}> 이전 페이지 </button>
                    <span>| {page} |</span>
                    <button onClick={() => setPage(page + 1)}>다음 페이지</button>
                </div>
                {loading ? (
                    <h2>loading...</h2>
                ) : (
                    <div>
                        <br />
                        <div className="transaction-type-info">
                        토큰 구매 <span className="color-box highlight-pink"></span> 토큰 전환 <span className="color-box highlight-green"></span> 
                        
                    </div>
                    <br/>
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>구매 상품</th>
                                    <th>상품 코드</th>
                                    <th>구매 당시 가격</th>
                                    <th>전환한 토큰 값</th>
                                    <th>전환 받은 금액</th>
                                    <th>환율 적용된 국가</th>
                                    <th>날짜</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selEhtUseAllList.length === 0 ? (
                                    <tr>
                                        <td colSpan="8">조회할 데이터가 없습니다.</td>
                                    </tr>
                                ) : (
                                    selEhtUseAllList.map((ehtUse, index) => (
                                        <tr key={ehtUse.iehtUse}>
                                            <td className={ehtUse.useCode === '001' ? 'highlight-pink' : 'highlight-green'}>{index+1+((page-1)*10)}</td>
                                            <td className={ehtUse.useCode === '001' ? 'highlight-pink' : 'highlight-green'}>
                                                {ehtUse.selEhtGoodsInfo ? ehtUse.selEhtGoodsInfo.ehtGNm : ''}</td>
                                            <td className={ehtUse.useCode === '001' ? 'highlight-pink' : 'highlight-green'}> 
                                                {ehtUse.selEhtGoodsInfo ? ehtUse.selEhtGoodsInfo.ehtGNum : ''}</td>
                                            <td className={ehtUse.useCode === '001' ? 'highlight-pink' : 'highlight-green'}>{ehtUse.usePricePaid}</td>
                                            <td className={ehtUse.useCode === '001' ? 'highlight-pink' : 'highlight-green'}>{ehtUse.useIncinerate}</td>
                                            <td className={ehtUse.useCode === '001' ? 'highlight-pink' : 'highlight-green'}>{ehtUse.useExchangeAmount}</td>
                                            <td className={ehtUse.useCode === '001' ? 'highlight-pink' : 'highlight-green'}>{ehtUse.useCountry}</td>
                                            <td className={ehtUse.useCode === '001' ? 'highlight-pink' : 'highlight-green'}>{ehtUse.useCreatedAt}</td>
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

export default GetEhtUseAll;