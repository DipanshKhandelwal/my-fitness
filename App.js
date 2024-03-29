import React from 'react'
import { View, Platform } from 'react-native'
import AddEntry from './components/AddEntry'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import History from './components/History'
import { createMaterialTopTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation'
import { purple, white } from './utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import StatusBar from './components/StatusBar'
import EntryDetail from './components/EntryDetail'
import Live from './components/Live'
import { setLocalNotifications } from './utils/helpers'

const Tabs = createMaterialTopTabNavigator({
  History: {
    screen: History,
    navigationOptions: {
      tabBarLabel: 'History',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    }
  },
  AddEntry: {
    screen: AddEntry,
    navigationOptions: {
      tabBarLabel: 'Add Entry',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    }
  },
  Live: {
    screen: Live,
    navigationOptions: {
      tabBarLabel: 'Live',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-speedometer' size={30} color={tintColor} />
    }
  }
}, {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: Platform.OS == 'ios' ? purple : white,
      style: {
        height: 56,
        backgroundColor: Platform.OS == 'ios' ? white : purple,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowRadius: 6,
        shadowOpacity: 1,
        shadowOffset: {
          width: 0,
          height: 3
        },
      },
    }
  }
)

const MainNavigator = createAppContainer(createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      header: null
    }
  },
  EntryDetail: {
    screen: EntryDetail,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    }
  }
}))

export default class App extends React.Component {

  componentDidMount() {
    setLocalNotifications()
  }

  render() {
    return (
      <Provider store={createStore(reducer)} >
        <View style={{ flex: 1 }} >
          <StatusBar backgroundColor={purple} basStyle='light-content' />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}