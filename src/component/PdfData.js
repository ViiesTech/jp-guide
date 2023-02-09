import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native'
import React,{useEffect} from 'react'
import Pdf from 'react-native-pdf'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Comment from './Comment'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { DocumentView, RNPdftron } from "react-native-pdftron";

import { Config } from 'react-native-pdftron'



const PdfData = (props) => {


    console.log("Propss.......",props)

    useEffect(() => {
        RNPdftron.enableJavaScript(true);
    }, [])

    return (
        <ScrollView>

            <DocumentView
                document={props.URL.uri}
                showLeadingNavButton={true}
                disabledTools={[Config.Buttons.addPageButton, Config.Buttons.cropPageButton]}
                leadingNavButtonIcon={
                    Platform.OS === "ios"
                        ? "ic_close_black_24px.png"
                        : "ic_arrow_back_white_24dp"
                } 
                style={styles.PDF}
                />


            <View style={{  width: wp('80%'), alignSelf: 'center',  padding: 20 }}>
                <Comment onSendComment={props.onSendComment} onState={props.onState} val={props.val}/>
            </View>
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    PDF: {
        minHeight: 400,
        width: wp('80%'),

        height:400
        // backgroundColor: 'transparent',

    }
})

export default PdfData