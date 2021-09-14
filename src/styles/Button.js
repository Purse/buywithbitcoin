import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0% {
    background: rgba(7, 175, 249, 1);
  }
  100% {
    background: rgba(0, 212, 255, 1);
  }
`;

const Button = styled.a`
  width: 92%;
  margin: 0 0 20px;
  background: rgba(7, 175, 249, 1);
  border-radius: 10px;
  font-size: 15px;
  padding: 10px;
  cursor: pointer;
  color: #fff !important;
  display: inline-block;
  font-weight: 400;
  text-align: center;

  &:hover {
    animation: 1s ${pulse} alternate infinite;
  }
`;

export default Button;
