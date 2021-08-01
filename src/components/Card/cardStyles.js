import styled, { css } from "styled-components";

export const Container = styled.div`
  background: white;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 1px 4px 0 rgba(192, 208, 230, 0.8);
  cursor: pointer;
  border-top: 20px solid ${(props) => props.color};

  width: 300px;

  .card-title {
    color: black;
    font-size: 1.1em;
    display: inline-block;
    margin-bottom: 5px;
  }

  p {
    font-size: 0.9em;
    width: 300px;
  }

  ${(props) =>
    props.isDragging &&
    css`
      cursor: grabbing;
      border: 2px dashed rgb(0, 0, 0, 0.2);
      background-color: transparent;

      h3,
      p,
      span,
      div {
        opacity: 0;
      }
    `}
`;

export const Users = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const HeaderStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const DateExport = styled.h3`
  padding: 2px 5px;
  font-size: 0.7em;
  border-radius: 5px;
  background-color: #ebebeb;
  color: #333;
  font-weight: 900;
  ${(props) =>
    props.state == true &&
    css`
      background-color: #f4d463;
      color: #5c4c11;
    `}
  ${(props) =>
    props.state == false &&
    css`
      background-color: #f46363;
      color: #4f0c0c;
    `};
`;

export const Description = styled.div`
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  width: max-content;
  padding: 2px 5px;
  font-size: 1em;
  border-radius: 4px;
  opacity: 0.8;
  font-weight: 900;
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
