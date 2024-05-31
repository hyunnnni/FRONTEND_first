import React from 'react';
import {Link} from "react-router-dom";
const Footer = () => {
  return (
    <footer>
      끝
      &nbsp;&nbsp;
            <Link to="/transaction/selects">| 알람 관리</Link>
    </footer>
  );
};

export default Footer;