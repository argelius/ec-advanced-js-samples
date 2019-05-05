import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <p>This is the home page</p>
      <ul>
        <li><Link to="/page-a">Page A</Link></li>
        <li><Link to="/page-b">Page B</Link></li>
      </ul>
    </>
  );
}
