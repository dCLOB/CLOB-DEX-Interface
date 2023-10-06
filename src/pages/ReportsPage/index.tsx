import React, { useCallback, useEffect, useMemo } from 'react'
import { Box } from '@material-ui/core'
import { useStyles } from './styles'
import { ReportsSideBar } from 'shared/containers/Reports/Sidebar'
import { useNavigate, useParams } from 'react-router-dom'
import { ReportsOpenOrders } from 'shared/containers/Reports/OpenOrders'
import routes, { reportsTabs } from 'constants/routes'
import getLink from 'helpers/getLink'

const ReportsPage = (): JSX.Element => {
  const classes = useStyles()
  const navigate = useNavigate()
  const { tab } = useParams()

  const tabs = useMemo(() => Object.entries(reportsTabs).map(([key, value]) => value), [])

  useEffect(() => {
    if (!tabs.includes(tab || '')) {
      navigate(getLink(routes.ROUTE_REPORTS, { tab: reportsTabs.openOrders }))
    }
  }, [tab])

  const renderTabContent = useCallback(() => {
    switch (tab) {
      default:
        return <ReportsOpenOrders />
    }
  }, [tab])

  return (
    <Box className={classes.reportsPage}>
      <ReportsSideBar />
      <Box className={classes.mainContent}>{renderTabContent()}</Box>
    </Box>
  )
}

export default ReportsPage
