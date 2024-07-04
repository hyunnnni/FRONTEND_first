import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// 관리자 기능 모든 거래 목록 상세 조회의 컴포넌트
const Board = ({ itran, ialarm, trsNm, hostNm, hostUid, hostRole, guest, guestNm, 
    guestUid, guestRole, alState, confsubCode, iconfctgy, trsCtgy, trsContractPrice, trsDeposit, 
    trsPtMethods, trsMemo, trsPtType, trsPtdatedAt, trsCreatedAt, trsExecutiondatedAt, trsStartdatedAt, trsEnddatedAt, contract }) => {

    console.log(confsubCode)

    const navigate = useNavigate();

    const moveToUpdate = () => {
        navigate('/api/management/transaction/' + itran);
    };
    const moveToList = () => {
        navigate('/api/management/all');
    };

    const getAcceptStatus = (alState) => {
        if (alState === 1) {
            return "진행 중";
        } else if (alState === 2) {
            return "거절로 인한 취소";
        } else if (alState === 3) {
            return "거래 완료";
        } else if (alState === 4) {
            return "관리자 or 호스트로 인해 알람 취소";
        } else {
            return "확인 전";
        }
    };

    const handleDownload = async (contractRoute) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/management/download`, {
                params: {
                    irole: 1,
                    contractRoute: contractRoute
                },
                responseType: 'blob' // 서버 응답을 blob 타입으로 설정
            });

            // 파일 다운로드를 위한 링크 생성
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', contractRoute.substring(contractRoute.lastIndexOf('/') + 1));
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("파일 다운로드 중 오류 발생:", error);
        }
    };

    const getContractImage = (confsubCode) => {
        console.log(confsubCode)
        switch (confsubCode) {
            case "01":
                return <img src="/0010101.PNG" alt="계약서 미리보기" />;
            case "02":
                return <img src="/0010102.PNG" alt="계약서 미리보기" />;
            case "03":
                return <img src="/0010103.PNG" alt="계약서 미리보기" />;
            case "04":
                return <img src="/0010104.PNG" alt="계약서 미리보기" />;
            case "05":
                return <img src="/0010105.PNG" alt="계약서 미리보기" />;
            case "06":
                return <img src="/0010106.PNG" alt="계약서 미리보기" />;
            default:
                return <img src="/0010107.PNG" alt="계약서 미리보기" />;
        }
    };

    return (
        <div>
            <hr />
            <br />
            <h1>{trsCtgy}</h1>
            <h1>거래명 : {trsNm}</h1>
            <br />
            <h5>계약 생성일 : {trsCreatedAt} | 계약 체결일 : {trsExecutiondatedAt} | 계약 실행일 : {trsStartdatedAt} | 계약 완료일 : {trsEnddatedAt}</h5>
            <br />
            <h5>계약 생성자 이름 : {hostNm} | 계약 생성자 ID : {hostUid} | 계약 생성자 등급 : {hostRole}</h5>
            <br />
            <h5>계약 수신자 이름 : {guestNm} | 계약 수신자 ID : {guestUid} | 계약 수신자 등급 : {guestRole}</h5>
            <hr />
            <h5> 계약금 (월세, 월급 포함): {trsContractPrice} | 보증금 : {trsDeposit} </h5>
            <hr />
            <h5> 지급 수단 : {trsPtMethods} - 메모사항 : {trsMemo} | 지급 방식 : {trsPtType} | 지급일(달마다 지급일 시 첫 날 기준 매달 같은 날 지급) : {trsPtdatedAt}</h5>
            <hr />
            <h3><p>거래 상태 : {getAcceptStatus(alState)}</p></h3>
            <div>
            <h2>계약서 미리보기</h2>
            {contract && contract.length > 0 ? (
                <>
                    {getContractImage(confsubCode)}
                    {contract.map((c, index) => (
                        <div key={index}>
                            <button onClick={() => handleDownload(c.contractRoute)}>{index + 1}. 다운로드</button>
                        </div>
                    ))}
                </>
            ) : (
                <p>계약서가 없습니다.</p>
            )}
        </div>
            <hr />
            <div>
                <button onClick={moveToUpdate}>수정</button>
                <button onClick={moveToList}>모든 목록</button>
            </div>
        </div>
    );
};

export default Board;
