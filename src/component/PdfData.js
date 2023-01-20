import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native'
import React from 'react'
import Pdf from 'react-native-pdf'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Comment from './Comment'


const PdfData = (props) => {
    return (
        <ScrollView>

            <Pdf
                source={props.URL}
                style={styles.PDF} />


            <View style={{  width: wp('80%'), alignSelf: 'center',  padding: 20 }}>
                <Comment onSendComment={props.onSendComment} onState={props.onState} val={props.val}/>
            </View>
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    PDF: {
        minHeight: 500,
        width: wp('80%'),
        backgroundColor: 'transparent',

    }
})

export default PdfData