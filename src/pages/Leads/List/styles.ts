import styled from "styled-components";

export const Container = styled.div``

export const HeaderContainer = styled.div``

export const FirstRowHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const SecondRowHeader = styled.div`
  margin-top: 30px;
`

export const Title = styled.p`
  font-size: 24px;
  font-weight: 600;
  color: #252433;
`

export const CardHeader = styled.div`
  display: flex;
  gap: 1rem;
`

export const CardFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1rem;
`

export const ContentContainer = styled.div`
  margin-top: 30px;
`

export const TableContainer = styled.table`
  width: 100%;
  border-collapse: collapse;
`

export const TableHeader = styled.thead`
  background-color: #f4f5f7;
  border-radius: 4px 4px 0px 0px;
`

export const TableHeaderCell = styled.th`
  padding: 1rem;
  text-align: left;

  &:last-child {
    text-align: center;
  }
`

export const TableRow = styled.tr<{ isEven: boolean }>`
  background-color: ${props => (props.isEven ? 'white' : '#f4f5f7')};
`

export const TableCell = styled.td`
  padding: 1rem;
  text-align: left;

  &:last-child {
    text-align: center;
  }
`

export const TableActions = styled.div`
  display: flex;
  justify-content: center;
`
