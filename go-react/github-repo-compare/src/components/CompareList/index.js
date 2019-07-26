import React from "react";

import { Container, Repository } from "./styles";

const CompareList = () => (
  <Container>
    <Repository>
      <header>
        <img
          src="https://avatars3.githubusercontent.com/u/69631?v=4"
          alt="Facebook Logo"
        />
        <strong>react</strong>
        <small>Facebook</small>
      </header>

      <ul>
        <li>
          96,014 <small>stars</small>
        </li>
        <li>
          96,014 <small>forks</small>
        </li>
        <li>
          96,014 <small>issues</small>
        </li>
        <li>
          1 day ago <small>last commit</small>
        </li>
      </ul>
    </Repository>
    <Repository>
      <header>
        <img
          src="https://avatars3.githubusercontent.com/u/69631?v=4"
          alt="Facebook Logo"
        />
        <strong>react</strong>
        <small>Facebook</small>
      </header>

      <ul>
        <li>
          96,014 <small>stars</small>
        </li>
        <li>
          96,014 <small>forks</small>
        </li>
        <li>
          96,014 <small>issues</small>
        </li>
        <li>
          1 day ago <small>last commit</small>
        </li>
      </ul>
    </Repository>
  </Container>
);

export default CompareList;
