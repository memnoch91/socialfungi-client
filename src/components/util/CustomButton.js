import React from 'react'

import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton'

export default function CustomButton({toolTipTitle, toolTipClass, btnClass, children, clickFunction }) {
    return (
        <Tooltip title={toolTipTitle} className={toolTipClass}>
            <IconButton className={btnClass} onClick={clickFunction}>
                {children}
            </IconButton>
        </Tooltip>
    )
}
