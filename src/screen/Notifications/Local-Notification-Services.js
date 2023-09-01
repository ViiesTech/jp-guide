import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { Platform } from 'react-native';


class LocalNotificationService {
  configure = (onOpenNotification) => {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
      },

      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: function (notification) {

        if (!notification?.data) {
          return;
        }
        notification.userInteraction = true;
        onOpenNotification(
          Platform.OS === 'ios' ? notification.data.item : notification.data,
        );

        if (Platform.OS === 'ios') {
          notification.finish(PushNotificationIOS.FetchResult.NoData);
        }
      },

      // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
      onAction: function (notification) {
        console.log('ACTION:', notification.action);
        console.log('NOTIFICATION:', notification);

      },

      // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
      onRegistrationError: function (err) {
        console.error(err.message, err);
      },

      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      popInitialNotification: true,
      requestPermissions: true,
    });
  };
  unRegister = () => {
    PushNotification.unregister();
  };

  showNotification = (id, title, message, data = {}, options = {}) => {
    PushNotification.localNotification({
      /* Android only Properties*/
      ...this.buildAndroidNotification(id, title, message, data, options),
      /* IOS and Android properties*/

      ...this.buildIOSNotification(id, title, message, data, options),
      /* IOS and Android properties */
      title: title || '',
      message: message || '',
      playSound: options.playSound || false,  
      soundName: options.soundName || 'default',
      channelId: "myChannel",
      userInteraction: false, // BOOLEAN: If the notification was opened by the user from the notification area or not
    });
  };
  buildAndroidNotification = (id, title, message, data = {}, options = {}) => {
    return {
      id: id || 1,
      autoCancel: true,
      largeIcon: options.largeIcon || 'ic_launcher',
      smallIcon: options.smallIcon || 'ic_notification',
      bigText: message || '',
      subText: title || '',
      vibrate: options.vibrate || true,
      vibration: options.vibration || 300,
      priority: options.priority || 'high',
      importance: options.importance || 'high', // (optional) set notifications importance
      data: data,
    };
  };

  buildIOSNotification = (id, title, message, data = {}, options = {}) => {
    return {
      alertAction: options.alertAction || 'view',
      category: options.category || '',
      userInfo: {
        id: id,
        item: data,
      },
    };
  };

  createNotificationChannel = () => {
    PushNotification.createChannel({
      channelId: 'myChannel',
      channelName: 'DonoChannel',
      channelDescription: 'My channel description',
      importance: 4, // 4 = Max, 3 = High, 2 = Default, 1 = Low, 0 = None
      vibration: true,
    });
  };
  cancelAllLocalNotifications = () => {
    {
      PushNotification.cancelAllLocalNotifications();
    }
  };
  removeDeliveredNotificationByID = (notificationId) => {
    console.log(
      '[LocalNotificationService] removeDeliveredNotificationByID: ',
      notificationId,
    );
    PushNotification.cancelLocalNotifications({ id: `${notificationId}` });
  };
}


export const localNotificationService = new LocalNotificationService()