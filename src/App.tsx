import React from 'react'
import BN from 'bn.js'

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { getAddressBalance, isBlockchainAddress, encodeTxData } from './blockchain'
import PriceSlider from './components/PriceSlider'
import PayloadData from './components/PayloadData'

import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { NumberLiteral } from '@babel/types';

const useStyles = makeStyles(theme => ({
    submit: {
        margin: theme.spacing(3, 0, 2),
        background: 'linear-gradient(125deg, #9f1f63, #262262)'
    },
    form: {
        marginTop: theme.spacing(3),
    },
    tooltip: {
        backgroundColor: 'red'
    },
    payload: {
        marginTop: '50px'
    }
}));

const DECIMAL_OFFSET = new BN(1e8)

function valueLabelFormat(value: number) {
    const readableValue = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `${readableValue} MYST`;
}

function App() {
    const classes = useStyles();

    const [isAddress, setAddressStatus] = React.useState<boolean>(true)
    const [address, setAddress] = React.useState<string>("")
    const [balance, setBalance] = React.useState<BN>(new BN(0))
    const handleAddressChange = async (event: any) => {
        const walletAddress = event.currentTarget.value
        setAddress(walletAddress)

        const validAddress = isBlockchainAddress(walletAddress)
        setAddressStatus(validAddress)
        if (validAddress) {
            const tokenBalance = new BN(await getAddressBalance(walletAddress))
            setBalance(tokenBalance)

            setValue(tokenBalance.div(DECIMAL_OFFSET).toNumber())
            setPayload(encodeTxData(tokenBalance))
        }
    }

    const [payload, setPayload] = React.useState<string>(encodeTxData())
    const generatePayload = (amount: number = 0) => {
        if (amount <= 0) amount = 0;
        const payload = (amount === balance.div(DECIMAL_OFFSET).toNumber())
            ? encodeTxData(balance)
            : encodeTxData(new BN(amount * DECIMAL_OFFSET.toNumber()))

        setPayload(payload)
    }

    const [value, setValue] = React.useState<number>(0);
    function updateValue(newValue: number) {
        setValue(newValue)
        generatePayload(newValue)
    }
    const handleInputChange = (event: any, ...params: any[]) => {
        const amount = event.currentTarget.value
        updateValue(amount)
    }
    const handleChange = (event: any, tokenAmount: number | number[]) => {
        updateValue(tokenAmount as number)
    };

    const marks = [{ value: 0, label: '0' }, { value: balance.div(DECIMAL_OFFSET).toNumber(), label: 'Entire balance' }]

    return (
        <Container maxWidth="md" component="main">
            <CssBaseline />
            <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                    <Grid item xs={11}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="address"
                            label="Your MYST wallet address"
                            helperText={!isAddress ? "Incorrect address" : ""}
                            name="address"
                            value={address}
                            error={!isAddress}
                            onChange={handleAddressChange}
                        />
                    </Grid>

                    <Grid item xs={11}>
                        <TextField
                            id="outlined"
                            label="Amount of MYST to migrate"
                            variant="outlined"
                            name="amount"
                            value={value}
                            onChange={handleInputChange}
                            fullWidth
                        />

                        {
                            isAddress && address !== ""
                                ?
                                <PriceSlider
                                    value={value}
                                    min={0}
                                    max={balance.div(DECIMAL_OFFSET).toNumber()}
                                    step={1}
                                    onChange={handleChange}
                                    aria-labelledby="amount-slider"
                                    // valueLabelDisplay="on"
                                    valueLabelFormat={valueLabelFormat}
                                    getAriaValueText={valueLabelFormat}
                                    marks={marks}
                                    disabled={!isAddress || address === ""}
                                />
                                : undefined
                        }
                    </Grid>

                    <Grid item xs={11} sm={4} >
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={(e: any) => {
                                e.preventDefault()
                                generatePayload(value)
                            }}>
                            Generate payload
                        </Button>
                    </Grid>
                </Grid>
            </form >

            <Grid container spacing={2} className={classes.payload}>
                <Grid item xs={11}>
                    <PayloadData value={payload} />
                </Grid>
            </Grid>

        </Container >

    )
}

export default App
