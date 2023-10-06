import { Box, Typography, useTheme } from '@material-ui/core'
import React, { useCallback, useMemo } from 'react'
import { useIntl } from 'react-intl'
import { useStyles } from './styles'
import { PieChart, Pie, Cell } from 'recharts'

export const MarginData = (): JSX.Element => {
  const classes = useStyles()
  const theme = useTheme()
  const { formatMessage } = useIntl()

  const translate = useCallback((id: string) => formatMessage({ id }), [formatMessage])

  const chartData = [
    {
      name: 'dark',
      value: 66,
    },
    {
      name: 'green',
      value: 33,
    },
  ]

  const COLORS = useMemo(() => [theme.palette.background.paper, theme.palette.success.main], [theme])

  return (
    <Box className={classes.container}>
      <Box className={classes.blockHeader}>
        <Typography variant="subtitle1" id="orderboot-container-title">
          {translate('page.swap.margin.title')}
        </Typography>
      </Box>
      <Box className={classes.chartData}>
        <Box>
          <Typography variant="overline" className={classes.label}>
            {translate('page.swap.margin.leverage')}
          </Typography>
          <Typography variant="h4" className={classes.greenColor}>
            5.0x
          </Typography>
        </Box>
        <PieChart width={85} height={85}>
          <Pie data={chartData} dataKey="value" innerRadius={28} outerRadius={40}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </Box>
      <Box className={classes.rowData}>
        <Typography variant="overline" className={classes.label}>
          {translate('page.swap.margin.minmargin')}
        </Typography>
        <Box className={classes.data}>
          <Typography variant="body2">36 625.00</Typography>
          <Typography variant="overline" className={classes.currency}>
            USDT
          </Typography>
        </Box>
      </Box>
      <Box className={classes.rowData}>
        <Typography variant="overline" className={classes.label}>
          {translate('page.swap.margin.equity')}
        </Typography>
        <Box className={classes.data}>
          <Typography variant="body2">36 625.00</Typography>
          <Typography variant="overline" className={classes.currency}>
            USDT
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
