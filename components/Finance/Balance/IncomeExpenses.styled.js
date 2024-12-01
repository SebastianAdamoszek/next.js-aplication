import styled from "styled-components";

export const LinkContainer = styled.div`
  display: flex;
  box-shadow: 0 0 10px gray;

  p {
    border: none;
    border-radius: 0;
  }
  a {
    line-height: 0;
    /* border-radius: 12px; */
    box-shadow: 0 0 3px white;
    border: none;
    transition: 0.3s ease-in-out;
    &:hover {
      background-color: rgba(0, 0, 0, 1);
      box-shadow: 0 0 10px gray;
    }
  }
`;

export const LinkBack = styled.div`
  position: relative;
  top: -60px;
  left: -35%;
  box-shadow: 0 0 10px gray;
  border-radius: 5px;

  p {
    padding: 2px 10px;
    border-radius: 5px;
  }
`;

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h2 {
    margin: 0 0 20px 0;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;

    input {
      border-radius: 5px;
      border: none;
      box-shadow: 0 0 3px white;
      transition: 0.3s ease-in-out;
      padding: 2px 5px;
      &:hover {
        background-color: rgba(0, 0, 0, 1);
        box-shadow: 0 0 10px gray;
      }
    }

    button {
      width: 110px;
      border-radius: 5px;
      background-color: rgba(0, 0, 0, 0.3);
      box-shadow: 0 0 3px white;
      border: none;
      transition: 0.3s ease-in-out;
      &:hover {
        background-color: rgba(0, 0, 0, 1);
        box-shadow: 0 0 10px gray;
      }
    }

    div {
      display: flex;
      gap: 8px;
    }
  }

  ul {
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    text-align: left;

    li {
      width: 300px;
      display: flex;
      justify-content: flex-start;
      justify-content: space-between;
      border-bottom: 1px dashed;
      padding: 5px;
      border-radius: 5px;
      transition: 0.2s ease-in-out;

      &:hover {
        box-shadow: 0 0 10px gray;
      }
    }

    button {
      padding: 2px 15px;
      border-radius: 5px;
      box-shadow: 0 0 3px white;
      border: none;
      transition: 0.3s ease-in-out;
      &:hover {
        background-color: rgba(0, 0, 0, 1);
        box-shadow: 0 0 10px gray;
      }
    }
  }
`;

export const StyledCurlyBracket = styled.div`
  display: inline-block;
  width: 320px;
  height: 30px;
  border-left: 2px solid;
  border-right: 2px solid;
  border-top: 2px solid;
  border-radius: 50px 50px 0px 0px;
  position: relative;
  top: 25px;
  box-shadow: 0 0 10px gray;
  background-color: inherit;
`;
export const Exspan = styled.span`
  color: inherit;
  border: 10px solid;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  box-shadow: 0 0 10px gray;

  position: relative;
  top: -27px;
  left: 50px;
`;
export const Inspan = styled.span`
  color: inherit;
  border: 10px solid;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  box-shadow: 0 0 10px gray;

  position: relative;
  top: -27px;
  left: -50px;
`;