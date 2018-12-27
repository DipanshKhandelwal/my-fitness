import React from 'react'
import { View } from 'react-native'
import { getMetricMetaInfo } from '../utils/helpers'

export default class AddEntry extends React.Component {

    state = {
        run: 0,
        bike: 0,
        swim: 0,
        sleep: 0,
        eat: 0
    }

    render() {
        return (
            <View>
                {getMetricMetaInfo('sleep').getIcon()}
            </View>
        )
    }
}