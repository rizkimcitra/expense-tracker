import { useTheme } from '@/hooks'

import React, { cloneElement } from 'react'
import { Tooltip as TippyTooltip, TooltipProps } from 'react-tippy'

type CustomToolTip = { children: React.ReactNode } & TooltipProps

const Tooltip: React.FunctionComponent<CustomToolTip> = ({ children, ...props }) => {
  const { theme } = useTheme()

  return cloneElement(<TippyTooltip />, { ...props, children, theme })
}

export default Tooltip
