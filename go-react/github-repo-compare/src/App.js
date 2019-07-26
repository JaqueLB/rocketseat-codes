import React, { Fragment } from "react";
import GlobalStyle from "./styles/global";
import Main from "./pages/Main";

// scoped css! it exists only here
// const Title = styled.h1`
//   color: #f00;
//   font-size: 32px;
// `;

const App = () => (
  <Fragment>
    <GlobalStyle />
    <Main />
  </Fragment>
);

export default App;
