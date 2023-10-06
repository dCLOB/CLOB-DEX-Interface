import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'
import React from 'react'
import { useStyles } from './styles'

type AccordionItemType = {
  key: string
  title: string
  details: JSX.Element
}

interface CustomAccordinProps {
  accordionItems: AccordionItemType[]
}

export const CustomAccordion = (props: CustomAccordinProps): JSX.Element => {
  const classes = useStyles()

  const { accordionItems } = props

  return (
    <Box className={classes.container}>
      {accordionItems.map((item) => {
        return (
          <Accordion key={item.key} className={classes.accordion}>
            <AccordionSummary expandIcon={<ExpandMore color="primary" className={classes.expandedIcon} />}>
              <Typography variant="subtitle1">{item.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>{item.details}</AccordionDetails>
          </Accordion>
        )
      })}
    </Box>
  )
}
