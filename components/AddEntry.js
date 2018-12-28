import React from 'react'
import { View, Text } from 'react-native'
import { getMetricMetaInfo } from '../utils/helpers'

export default class AddEntry extends React.Component {

    state = {
        run: 0,
        bike: 0,
        swim: 0,
        sleep: 0,
        eat: 0
    }

    increment = (metric) => {
        const { max, step } = getMetricMetaInfo(metric)

        this.setState((oldState) => {
            const count = oldState[metric] + step

            return {
                ...state,
                [metric]: count > max ? max : count
            }
        })
    }

    decrement = (metric) => {
        this.setState((oldState) => {
            const count = oldState[metric] - getMetricMetaInfo(metric).step

            return {
                ...state,
                [metric]: count < 0 ? 0 : count
            }
        })
    }

    slide = (metric, value) => {
        this.setState(() => ({
            [metric]: value
        }))
    }

    render() {
        const metaInfo = getMetricMetaInfo()

        return (
            <View>
                {Object.keys(metaInfo).map((key) => {
                    const { getIcon, type, ...rest } = metaInfo[key]
                    const value = this.state[key]

                    return (
                        <View key={key}>
                            {getIcon()}
                        </View>
                    )
                })}
            </View>
        )
    }
}