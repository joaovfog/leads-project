import { TableContainer, TableHeader, TableRow, TableHeaderCell, TableCell } from "./styles";

type TableProps = {
  data: {
    id: number;
    nome: string;
    cpf: string;
    email: string;
    telefone: string;
  }[];
};

export const Table = ({ data }: TableProps) => {
  return (
    <TableContainer>
      <TableHeader>
        <TableRow isEven={false}>
          <TableHeaderCell>Nome</TableHeaderCell>
          <TableHeaderCell>CPF</TableHeaderCell>
          <TableHeaderCell>E-mail</TableHeaderCell>
          <TableHeaderCell>Telefone</TableHeaderCell>
          <TableHeaderCell>Ações</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <tbody>
        {data.map((item, index) => (
          <TableRow key={item.id} isEven={index % 2 === 0}>
            <TableCell>{item.nome}</TableCell>
            <TableCell>{item.cpf}</TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>{item.telefone}</TableCell>
            <TableCell>
              <button>Editar</button>
              <button>Excluir</button>
            </TableCell>
          </TableRow>
        ))}
      </tbody>
    </TableContainer>
  )
}