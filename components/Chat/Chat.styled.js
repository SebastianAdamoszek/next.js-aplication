import styled from "styled-components";

export const Container = styled.div``;

export const Messages = styled.div`
  padding: 2px 0 2px 5px;
  margin-top: 5px;
  overflow: auto;
  height: 345px;
  border: 1px solid black;
  background-color: darkgray;
`;

export const UserMes = styled.div`
  p {
    font-size: 18px;
  }
  span {
    font-size: 12px;
    padding: 0 10px 0 0px;
  }
`;

export const Form = styled.form`
  position: relative;
  top: 0px;
  left: 20px;

  button {
    padding: 0 5px;
  }
`;
export const Input = styled.input``;

export const Button = styled.button`
  margin-left: 20px;
`;
