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
  }

  ul {
    margin: 0;
    padding: 0;
  }

  h2 {
    padding: 0 10px;
  }

  button {
    width: 35px;
    height: 35px;
    border-radius: 15px;
    background-color: #2d0044;
    border: 0;
    cursor: pointer;
    margin-top: 5px;
    margin-bottom: 10px;
  }
`;

export const ColorPicker = styled.div`
  display: inline-block;
  position: relative;
  overflow: hidden;
  width: 40px;
  height: 40px;
  border: solid 2px #ddd;
  border-radius: 40px;

  input {
    position: absolute;
    right: -8px;
    top: -8px;
    width: 56px;
    height: 56px;
    border: none;
  }
`;
