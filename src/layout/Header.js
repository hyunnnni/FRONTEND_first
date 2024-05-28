import React from 'react';
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <header>
            &nbsp;&nbsp;
            <Link to="/api/management/all">모든 거래 목록</Link>
            &nbsp;&nbsp;
            <Link to="/api/management/alluser">| 거래 생성자에 따른 목록</Link>
            <hr/>
        </header>
    );
};

export default Header;