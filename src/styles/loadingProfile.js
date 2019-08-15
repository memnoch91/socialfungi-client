import themeOnly from './themeOnly';
import profileStyles from './profileStyleObject';

export default {
    ...profileStyles,
    handle: {
        height: 20,
        backgroundColor: themeOnly.palette.primary.main,
        width: 60,
        margin: '0 auto 7px auto'
    },
    fullLine: {
        height: 15,
        backgroundColor: 'rgba(0,0,0,0.6)',
        width: '60%',
        marginBottom: 10,
        marginRight: 'auto',
        marginLeft: 'auto'
    },
    halfLine: {
        height: 15,
        backgroundColor: 'rgba(0,0,0,0.6)',
        width: '50%',
        marginBottom: 10
    }
}