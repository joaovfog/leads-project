import styled from "styled-components";

export const TextInputContainer = styled.div`
  width: 100%;
  position: relative;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  input {
    margin-top: 14px;
    display: flex;
    align-items: center;
    justify-content: left;
    border-color: #adb2a6bd;
  }
`

export const Label = styled.p``

export const InputField = styled.input<{ error?: boolean }>`
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
    border-color: #DCE1E5;
  }

  &::placeholder {
    color: #DCE1E5;
  }
`
