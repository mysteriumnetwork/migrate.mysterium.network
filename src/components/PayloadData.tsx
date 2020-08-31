import React from 'react'

import CopyToClipboard from 'react-copy-to-clipboard';

import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton';

import FileCopyIcon from '@material-ui/icons/FileCopy';
import { withStyles } from '@material-ui/core/styles'

const CopyButton = withStyles({
    root: {
        color: '#9f1f63'
    }
})(FileCopyIcon)


interface PayloadProps {
    value: string;
}

function PayloadData(props: PayloadProps) {
    const { value } = props
    return (
        <TextField
            value={value}
            id="standard-multiline-static"
            label="Payload data"
            // variant="outlined"
            variant="filled"
            disabled
            fullWidth
            multiline
            InputProps={{
                endAdornment: (
                    <CopyToClipboard text={value}>
                        <IconButton color="primary" aria-label="upload picture" component="span">
                            <CopyButton />
                        </IconButton>
                    </CopyToClipboard>
                ),
            }}
        />
    )
}


export default PayloadData


