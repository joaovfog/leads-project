import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  position: relative;
`

export const Label = styled.p`
  margin-bottom: 14px;
  font-weight: 600;
  color: #4D4F5C;
`

export const SelectField = styled.select<{ error?: boolean }>`
  border-radius: 4px;
  color: #8c744f;
  display: block;
  appearance: none;
  border-width: 1px;
  border-color: ${(props) => (!props.error ? '#adb2a6' : '#dd503d')};
  border-style: solid;
  font-size: 14px;
  height: 50px;
  width: 100%;
  padding-left: 24px;
  box-sizing: border-box;

  &:focus {
    border-color: #dce1e5;
  }
`