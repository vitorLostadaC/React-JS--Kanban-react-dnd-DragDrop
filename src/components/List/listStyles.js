import styled from "styled-components";

export const Container = styled.div`
  min-height: 200px;
  background-color: #ebebeb;
  border-radius: 5px;
  padding: 0 15px;
  height: 100%;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 320px;
  margin-right: 10px;
  box-shadow: inset 2px 4px 4px rgba(0, 0, 0, 0.05);

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 42px;

    button {
      width: 30px;
      height: 30px;
      border-radius: 15px;
      background-color: black;
      border: 0;
      cursor: pointer;
      margin-top: 5px;
      padding: 2px;
    }
  }

  ul {
    margin: 0;
    padding: 0;
  }

  h2 {
    padding: 0 10px;
  }
`;

export const ColorPicker = styled.div`
  display: inline-block;

  input {
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 40px;
    background: none;
  }
  input::-webkit-color-swatch-wrapper {
    padding: 0;
  }
  input::-webkit-color-swatch {
    border: solid 1px #000; /*change color of the swatch border here*/
    border-radius: 40px;
  }
`;
