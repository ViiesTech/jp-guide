/**
 * @format
 */

import {AppRegistry, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging'
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';


AppRegistry.registerComponent(appName, () => App);
PushNotification.configure({
    onRegister: function(token){
        console.log(token)
    },

    onNotification: function(notification){
        console.log("notification:", notification);
        notification.finish(PushNotificationIOS.FetchResult.NoData)
    },

    channelId: '1',

    permissions:{
        alert: true,
        badge: true,
        sound: true,
    },

    popInitialNotification: true,

    requestPermissions: Platform.OS === 'ios',



    
    
})
