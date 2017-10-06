import { StyleSheet } from 'react-native';
import colors from './colors';
export default StyleSheet.create({
    container: {
        height: 44,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: '#fff',
    },
    button: {
        padding: 5,
        marginLeft: 5,
        backgroundColor: colors.primary,
        borderWidth: 1,
        borderColor: colors.lightGray,
        borderRadius: 3,
    },
    buttonText: {
        color: colors.white,
    }
});
