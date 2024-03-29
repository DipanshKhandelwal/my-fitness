import React from 'react'
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native'
import { getMetricMetaInfo, timeToString, getDailyReminderValue, clearLocalNotifications, setLocalNotifications } from '../utils/helpers'
import Slider from './Slider';
import Stepper from './Stepper';
import DateHeader from './DateHeader';
import { Ionicons } from '@expo/vector-icons';
import TextButton from './TextButton';
import { submitEntry, removeEntry } from '../utils/api';
import { connect } from 'react-redux'
import { addEntry } from '../actions'
import { white, purple } from '../utils/colors'
import { NavigationOptions } from 'react-navigation'

const SubmitBtn = ({ onPress }) => {
    return (
        <TouchableOpacity
            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
            onPress={onPress}>
            <Text style={styles.submitBtnText} >SUBMIT</Text>
        </TouchableOpacity>
    )
}

class AddEntry extends React.Component {

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
                ...oldState,
                [metric]: count > max ? max : count
            }
        })
    }

    decrement = (metric) => {
        this.setState((oldState) => {
            const count = oldState[metric] - getMetricMetaInfo(metric).step

            return {
                ...oldState,
                [metric]: count < 0 ? 0 : count
            }
        })
    }

    slide = (metric, value) => {
        this.setState(() => ({
            [metric]: value
        }))
    }

    submit = () => {
        const key = timeToString()
        const entry = this.state

        this.props.dispatch(addEntry({
            [key]: entry
        }))

        this.setState({
            run: 0,
            bike: 0,
            swim: 0,
            sleep: 0,
            eat: 0
        })

        this.toHome()

        submitEntry({ entry, key })

        clearLocalNotifications()
            .then(setLocalNotifications)
    }

    reset = () => {
        const key = timeToString()

        this.props.dispatch(addEntry({
            [key]: getDailyReminderValue()
        }))

        this.toHome()

        removeEntry(key)
    }

    toHome = () => {
        this.props.navigation.navigate('AddEntry')
    }

    render() {
        const metaInfo = getMetricMetaInfo()

        if (this.props.alreadyLogged) {
            return (
                <View style={styles.center} >
                    <Ionicons
                        name={Platform.OS === 'ios' ? 'ios-happy' : 'md-happy'}
                        size={100}
                    />
                    <Text>You already logged your information for today.</Text>
                    <TextButton style={{ padding: 10 }} onPress={this.reset}>
                        Reset
                    </TextButton>
                </View>
            )
        }

        return (
            <View style={styles.container} >
                <DateHeader date={(new Date().toLocaleDateString())} />
                {Object.keys(metaInfo).map((key) => {
                    const { getIcon, type, ...rest } = metaInfo[key]
                    const value = this.state[key]

                    return (
                        <View key={key} style={styles.row} >
                            {getIcon()}
                            {
                                type == 'slider'
                                    ? <Slider
                                        value={value}
                                        onChange={(value) => this.slide(key, value)}
                                        {...rest}
                                    />
                                    : <Stepper
                                        value={value}
                                        onIncrement={() => this.increment(key)}
                                        onDecrement={() => this.decrement(key)}
                                        {...rest}
                                    />
                            }
                        </View>
                    )
                })}
                <SubmitBtn onPress={this.submit} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center'
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: white
    },
    iosSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40
    },
    androidSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 2,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center'
    },
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center'
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 30
    }
})

const mapStateToProps = (state) => {
    const key = timeToString()

    return {
        alreadyLogged: state[key] && typeof state[key].today === 'undefined'
    }
}

export default connect(mapStateToProps)(AddEntry)