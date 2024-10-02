import styled from "styled-components";

export const Container = styled.div``;

export const Messages = styled.div`
  padding: 2px 0 2px 5px;
  margin-top: 5px;
  overflow: auto;
  height: 340px;
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
  top: 4px;
  left: 5px;

`;
export const Input = styled.input`
  padding: 3px 7px;
  border-radius: 7px;
`;

export const Button = styled.button`
  margin-left: 20px;
  border-radius: 7px;
  padding: 3px 15px;
  transition: 0.2s ease-in-out;
`;