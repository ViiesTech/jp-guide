import { View, Text, Touchable, TouchableOpacity } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { DocumentView, PDFViewCtrl, RNPdftron, } from "react-native-pdftron";

const DarkMode = (props) => {

  const [DarkMode, setDarkMode] = useState()
  const pdfViewCtrlRef = useRef(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const storeData = async (value) => {

    setIsDarkMode(!isDarkMode);
    const pdfViewCtrl = pdfViewCtrlRef.current;
    if (pdfViewCtrl) {
      const style = isDarkMode ? 'DarkMode' : 'Default';
      pdfViewCtrl.setToolStyle(style);
      console.log(style)
    }


    try {
      await AsyncStorage.setItem('@Dark', value)
    } catch (e) {
      // saving error
    }
  }

  useEffect(() => {
    getData()
  }, [DarkMode])

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@Dark')
      // console.log(jsonValue)
      setDarkMode(jsonValue)
      return jsonValue != null ? JSON.parse(jsonValue) : null;

    } catch (e) {
      // error reading value
    }
  }



  return (
    <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 20 }}>
      <TouchableOpacity onPress={() => storeData("Yes")} style={{ height: 60, width: 100, borderRadius: 10, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'white' }}>
        <Text style={{ color: 'white' }}>Dark</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => storeData("No")} style={{ height: 60, width: 100, borderRadius: 10, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', marginLeft: 10, borderWidth: 1, borderColor: 'black' }}>
        <Text style={{ color: 'black' }}>Light</Text>
      </TouchableOpacity>
    </View>
  )
}

export default DarkMode