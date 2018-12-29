import React from 'react'
import { View, StatusBar as _StatusBar } from 'react-native'
import { Constants } from 'expo'

export default StatuBar = ({ backgroundColor, ...props }) => {
    return (
        <View style={{ backgroundColor, height: Constants.statusBarHeight }} >
            <_StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    )
}