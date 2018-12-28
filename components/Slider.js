import React from 'react'
import { View, Text, Slider as _Slider } from 'react-native'

export default Slider = ({ max, unit, step, value, onChange }) => {
    return (
        <View>
            <_Slider
                step={step}
                value={value}
                onValueChange={onChange}
                maximumValue={max}
                minimumValue={0}
            />
            <View>
                <Text>{value}</Text>
                <Text>{unit}</Text>
            </View>
        </View>
    )
}