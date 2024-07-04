import React from 'react';
import { Link } from "react-router-dom";
import './Header.css'; // CSS 파일을 임포트

const Header = () => {
    return (
        <header className="header">
             <div>
                <Link to="/write">거래 요청(클1)</Link>
                <Link to="/transaction/select">| 거래 알람 목록(클1)</Link>
            </div>
            <div>
                <Link to="/transaction/selects">거래 알람 목록(클2)</Link>
            </div>
            <hr/>
            <div>
                <Link to="/transferreq">송금 요청(클1)</Link>
                <Link to="/transfer/alarm">| 송금 알람 목록(클1)</Link>
                <Link to="/transfer/all">| 송금 내역(클1)</Link>
            </div>
            <div>
                <Link to="/transfer/alarms">송금 알람 목록(클2)</Link>
                <Link to="/transfer/alarm/accept">| 송금 알람 수락 목록(클2)</Link>
                <Link to="/transfer/alls">| 송금 내역(클2)</Link>
            </div>
            <hr/>
            <div>
                <Link to="/eht/goodslist">토큰 상품 리스트</Link>
                <Link to="/eht/use">나의 토큰 사용 내역</Link>
            </div>
        </header>
    );
};

export default Header;