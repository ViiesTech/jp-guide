import messaging from '@react-native-firebase/messaging';
import {Platform} from 'react-native';
class FCMService {
  register = (onRegister, onNotification, onOpenNotification) => {
    this.checkPermission(onRegister);
    this.createNotificationsListeners(
      onRegister,
      onNotification,
      onOpenNotification,
    );
  };

  registerAppWithFCM = async () => {
    if (Platform.OS === 'ios') {
      await messaging().registerDeviceForRemoteMessages();
      await messaging().setAutoInitEnabled(true);
    }
  };
  
  checkPermission = (onRegister) => {
    
    messaging().hasPermission().then((enabled) => {
        if (enabled) {
          // User has permission
          this.getToken(onRegister);
        } else {
          // User doesn't have permission
          this.requestPermission();
        }
      })
      .catch((error) => {
        console.log('[FCMService] Permission rejected', error);
      });
  };

  getToken = (onRegister) => {
    messaging().getToken().then((fcmToken) => {
        if (fcmToken) {
          onRegister(fcmToken);
        } else {
          console.log('[FCMService] user does not have a device token');
        }
      })
 
      .catch((error) => {
        console.log('[FCMService] getToken rejected', error);
      });
  };

  requestPermission = (onRegister) => {
    messaging().requestPermission().then(() => {
        this.getToken(onRegister);
      })
      .catch((error) => {
        console.log('[FCMService] Request permission rejected');
      });
  };

  deleteToken = () => {
    console.log('[FCMService] deleteToken');
    messaging().deleteToken().catch((error) => {
        console.log('[FCMService] Delete token error ', error);
      });
  };

  createNotificationsListeners = (
    onRegister,
    onNotification,
    onOpenNotification,
    ) => {
    // When the application is running ,but in background
    messaging().onNotificationOpenedApp((remoteMessage) => {
      if (remoteMessage) {
        const notification = remoteMessage.notification;
        onOpenNotification(remoteMessage);
      }
    });

messaging().setBackgroundMessageHandler(async remoteMessage => {
   if (remoteMessage) {
    const notification = remoteMessage.notification;
    onOpenNotification(remoteMessage);
  
  }
  })
    // when the application is opened from a quite state.
    messaging().getInitialNotification().then((remoteMessage) => {
  
        if (remoteMessage) {
          const notification = remoteMessage.notification;
          onOpenNotification(remoteMessage);
        
        }
    });
    // Foreground state messages
    this.messageListener = messaging().onMessage(async (remoteMessage) => {
      if (remoteMessage) {
        let notification = null;
        if (Platform.OS === 'ios') {
          notification = remoteMessage;
        } else {
          notification = remoteMessage;
        }
        onNotification(notification);
      }
    });
    
   
    // Triggered when have new token
      messaging().onTokenRefresh((fcmToken) => {
        console.log('[FCMService] New token refresh: ', fcmToken);
        onRegister(fcmToken);
      });
  };

  unRegister = () => {
    this.messageListener();
  };
}

export const fcmService = new FCMService();