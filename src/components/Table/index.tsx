import {
  TableCellProps,
  Table as MuiTable,
  TableBody,
  TableHead,
  TableRow,
  TableContainer,
  TableCell,
  Box,
  Typography,
} from "@mui/material";
import { ReactNode } from "react";

export interface ITableColumn {
  name: string;
  align?: TableCellProps["align"];
}

interface ITableRow {
  id: string;
}

interface TableProps<T extends ITableRow> {
  columns: ITableColumn[];
  rows: T[];
  renderRow: (row: T, index: number) => ReactNode;
}

export const Table = <T extends ITableRow>({ columns, rows, renderRow }: TableProps<T>) => {
  return (
    <TableContainer sx={{ flex: 1 }}>
      <MuiTable sx={{ height: rows.length === 0 ? "100%" : "inherit" }} size="small">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.name} align={column.align}>
                <Typography variant="caption" color="textSecondary">
                  {column.name}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length === 0 && (
            <TableRow>
              <TableCell colSpan={columns.length} align="center">
                <Box display="flex" flexDirection="column" alignItems="center" paddingY={6}>
                  <Typography variant="body2" color="textDisabled">
                    There are no orders yet
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          )}
          {rows.map((row, index) => (
            <TableRow key={row.id}>{renderRow(row, index)}</TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};
