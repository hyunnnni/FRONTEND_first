import React from 'react';
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <header>
            &nbsp;&nbsp;
            <Link to="/write"> 거래 생성</Link>
            &nbsp;&nbsp;
            <Link to="/api/management/all">| 거래 목록</Link>
            &nbsp;&nbsp;
            <Link to="/transaction/select">| 알람 관리</Link>
            <hr/>
        </header>
    );
};

export default Header;