import styled from "styled-components";

export const Container = styled.div``

export const Title = styled.p`
  font-size: 24px;
  font-weight: 600;
  color: #252433;
`

export const BackTitle = styled.div`
  display: flex;
  align-items: center;
`

export const ContentContainer = styled.div`
    margin-top: 30px;
`

export const CardHeader = styled.div`
  display: flex;
  justify-content: center;
`

export const StepOne = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const StepTwo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const HorizontalLine = styled.div`
  width: 20%;
  height: 1px;
  background-color: #DCE1E5;
  margin: 25px 30px 25px 10px;
`

export const PersonalDataStep = styled.p``

export const ContactStep = styled.p``

export const OuterBall = styled.div<{ isActive: boolean }>`
  width: 60px;
  height: 60px;
  background-color: ${({ isActive }) => (isActive ? '#FF9933' : 'white')};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const StepBall = styled.div<{ isActive: boolean; isCompleted: boolean }>`
  width: 50px;
  height: 50px;
  background-color: ${({ isActive, isCompleted }) => (isCompleted ? '#29A33D' : isActive ? '#FF9933' : 'white')};
  border-radius: 50%;
  border: ${({ isActive, isCompleted }) => (isCompleted ? '#29A33D' : isActive ? '4px solid white' : '2px solid #B9C2CB')};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: ${({ isActive, isCompleted }) => (isCompleted ? 'white' : isActive ? '#252433' : '#252433')};
`

export const CardContent = styled.div`
  .form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;
  }
`

export const CardContentTitle = styled.p`
  font-size: 20px;
  font-weight: 600;
  color: #252433;
`

export const CardContentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 20px 0;
`

export const FormFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  gap: 1rem;
`

export const InputField = styled.div``

export const ErrorMessage = styled.div`
  color: red;
  margin-top: 3px;
`
