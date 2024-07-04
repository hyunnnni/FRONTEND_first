import React from 'react';
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <div>
      <hr/>
      <br />
      관리자
      <br />
      <br />
      <Link to="/api/management/all">거래 목록</Link>
    </div>
    <div>
    <hr/>
    <br />
      유저
      <br />
      <br />
      <Link to="/transfer/myeht">나의 토큰값 조회(클1)</Link>
      <br />
      <br />
      <Link to="/transfer/myehts">나의 토큰값 조회(클2)</Link>
    </div>
  </footer>
);
};
export default Footer;