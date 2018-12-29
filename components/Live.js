import React from 'react'
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native'
import { white, purple } from '../utils/colors'
import { Foundation } from '@expo/vector-icons'

export default class Live extends React.Component {

    state = {
        coords: null,
        status: null,
        direction: ''
    }

    askPermission = () => {

    }

    render() {
        const { coords, status, direction } = this.state

        if (status === null) {
            return <ActivityIndicator style={{ marginTop: 30 }} />
        }

        if (status === 'denied') {
            return (
                <View>
                    <Text>Denied</Text>
                </View>
            )
        }

        if (status === 'undetermined') {
            return (
                <View style={styles.center} >
                    <Foundation name='alert' size={50} />
                    <Text>
                        You need to enable location services for this app.
                    </Text>
                    <TouchableOpacity onPress={this.askPermission} style={styles.button} >
                        <Text style={styles.buttonText} >
                            Enable
                        </Text>
                    </TouchableOpacity>
                </View>
            )
        }

        return (
            <View style={styles.container} >
                <Text>Live</Text>
                <Text>{JSON.stringify(this.state)}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between'
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 30,
    },
    button: {
        padding: 10,
        backgroundColor: purple,
        alignSelf: 'center',
        borderRadius: 5,
        margin: 20,
    },
    buttonText: {
        color: white,
        fontSize: 20,
    }
}) 