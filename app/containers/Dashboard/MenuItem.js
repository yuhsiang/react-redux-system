import { Link } from 'react-router';
import styled from 'styled-components';

export default styled(Link)`
  height: 40px;
  line-height: 40px;
  width: 180px;
  display: inline-block;
  padding-left: 20px;
  font-size: 14px;
  border-bottom: 1px solid grey;
  color: #FFF;
  text-decoration: none;


  &:active {
    background: #41ADDD;
    color: black;
  }
  &:hover {
    color: #001e35;
  }
`
