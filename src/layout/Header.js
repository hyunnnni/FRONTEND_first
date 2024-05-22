import React from 'react';
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <header>
            &nbsp;&nbsp;
            <Link to="/management/all">거래 목록</Link>
            <hr/>
        </header>
    );
};

export default Header;