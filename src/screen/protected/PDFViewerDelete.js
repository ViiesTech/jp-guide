import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { DocumentView } from 'react-native-pdftron';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native';

const PDFViewerDelete = ({ route, navigation }) => {

    const [pdfDocPath, setPDFDocPAth] = useState("")
    const _viewer = useRef()

    useEffect(() => {
        // const unsubscribe = navigation.addListener('focus', () => {
        getPdf()
        // });

        // return unsubscribe
    }, [])


    const getPdf = async () => {


        await AsyncStorage.getItem('ABQ').then((doc) => {
            console.log("docer;;';';';';';';';';';';';';';", doc)
            setPDFDocPAth(doc)

        }).catch((e) => {

        })

        // console.log("Gettting version.......", doc)

    }

    const goBack = () => {





        // console.log( "this.view",  _viewer)

        _viewer.current.saveDocument().then(async (filePath) => {
            console.log('saveDocument:', filePath);
            await AsyncStorage.setItem('', filePath).then(() => {
                navigation.navigate('Home')
            })
        });



    }

    return (
        <View style={styles.container}>

            <TouchableOpacity onPress={() => goBack()} style={{ height: 50, width: 50, backgroundColor: 'red' }}>

            </TouchableOpacity>
            {pdfDocPath !== "" ?

                <DocumentView
                    document={pdfDocPath}
                    ref={_viewer}
                    style={styles.pdfView}
                />

                :
                <ActivityIndicator size={20} />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    pdfView: {
        flex: 1,
        width: '100%',
    },
});


export default PDFViewerDelete