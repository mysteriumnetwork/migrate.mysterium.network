import Slider from '@material-ui/core/Slider'
import { withStyles } from '@material-ui/core/styles'

const PriceSlider = withStyles({
    thumb: {
        height: 20,
        width: 20,
        backgroundColor: '#822061',
        marginTop: -10,
        marginLeft: -10,
        '&:focus, &:hover, &$active': {
            boxShadow: '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
        },
    },
    active: {
        backgroundColor: '#9f1f63'
    },
    valueLabel: {
        left: '-65px',
        top: -22,
        '& *': {
            width: '180px',
            background: 'transparent',
            color: '#9f1f63',
        },
        fontWeight: 'bold',
        textAlign: 'center'
    },
    track: {
        height: 3,
    },
    rail: {
        height: 2,
        opacity: 0.5,
        backgroundColor: '#bfbfbf',
    },
    mark: {
        backgroundColor: '#bfbfbf',
        height: 8,
        width: 1,
        marginTop: -3,
    },
    markActive: {
        opacity: 1,
        backgroundColor: 'currentColor',
    },
    markLabel: {
        color: '#aaaaaa'
    },
    colorPrimary: {
        color: '#9f1f63'
    },
})(Slider)

export default PriceSlider
