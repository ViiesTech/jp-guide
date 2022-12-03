import {StyleSheet, TextInput } from 'react-native'
import React from 'react'
const TextInputComp = (props) => {
    return <TextInput  {...props}  style={{...props.style}}/>
}
const style = StyleSheet.create({
  
})
export default TextInputComp