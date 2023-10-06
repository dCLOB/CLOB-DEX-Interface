import { Box, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'
import clsx from 'clsx'
import { SortArrowsIcon } from 'icons'
import React from 'react'
import { useStyles } from './styles'

type DataTableProps = {
  data: any[]
  columns: any[]
  loading: boolean
  headerClassName?: string
  rowClassName?: string
  handleSort?: (label: string) => void
}

export const DataTable = (props: DataTableProps): JSX.Element => {
  const classes = useStyles()

  const { data, columns, loading, headerClassName, rowClassName, handleSort } = props

  const renderHeader = () => {
    return (
      <TableHead className={classes.tableHeader}>
        <TableRow className={clsx(classes.tableHeader, headerClassName)}>
          {columns.map((column, index) => {
            return (
              <TableCell
                className={clsx(classes.tableHeaderCell, column.className)}
                key={`${index}-${column.name}`}
                align={column.align || 'left'}
                onClick={() => handleSort && column.searchProperty && handleSort(column.searchProperty)}
                data-table-header-cell={column.name}
              >
                <Box
                  className={clsx({
                    [classes.headerCell]: true,
                    [classes.rightAlign]: column.align === 'right',
                  })}
                >
                  {column.sortable && <SortArrowsIcon />}
                  {column.label}
                </Box>
              </TableCell>
            )
          })}
        </TableRow>
      </TableHead>
    )
  }

  const renderBody = () => {
    if (loading) return

    return (
      <TableBody>
        {data &&
          data.map((row, rowIndex) => (
            <TableRow key={rowIndex} className={clsx(classes.tableRow, rowClassName)}>
              {columns.map((column, index) => (
                <TableCell
                  key={`${column.name}-${index}`}
                  className={clsx(classes.tableRowCell, column.className)}
                  align={column.align || 'left'}
                  data-table-body-cell={column.name}
                >
                  {column.render ? column.render(row, column.name) : renderValue(row[column.name])}
                </TableCell>
              ))}
            </TableRow>
          ))}
      </TableBody>
    )
  }

  const renderValue = (value: number | string | boolean) => {
    if (!value) return '—'

    return value
  }

  return (
    <Box className={classes.tableWrapper}>
      <Table>
        {renderHeader()}
        {!!data.length && renderBody()}
      </Table>
    </Box>
  )
}
