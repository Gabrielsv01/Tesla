import React from 'react';

import Ai from 'pages/AI';
import Home from 'pages/Home';
import {NoMatch} from 'pages/NoMatch';
import {Route, Routes} from 'react-router-dom';

const Routers = () => (
  <Routes>
    {/* <Route  index element={<Home />} /> */}
    <Route path="/ai" element={<Ai />} />
    <Route path="/" element={<Home />} />
    <Route path="*" element={<NoMatch />} />
  </Routes>
);

export default Routers;
