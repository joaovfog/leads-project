import styled from 'styled-components';

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
`

export const TableRow = styled.tr<{ isEven: boolean }>`
  background-color: ${props => (props.isEven ? 'white' : '#f4f5f7')};
`

export const TableCell = styled.td`
  padding: 1rem;
`