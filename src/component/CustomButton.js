import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const CustomButton = ({
  title,
  onPress,
  buttonColor,
  titleColor,
  buttonStyle,
  textStyle,
  Loading
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={{
        ...styles.container,
        ...buttonStyle,
        backgroundColor: buttonColor || '#512DA8',
      }}
      onPress={onPress}>
      {
        Loading == true ?
          <ActivityIndicator size={'small'} color={'white'} />
          :
          <Text
            style={{ ...styles.title, ...textStyle, color: titleColor || '#fff' }}>
            {title}
          </Text>
      }

    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#512DA8',
    height: hp('6'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 16,
  },
});