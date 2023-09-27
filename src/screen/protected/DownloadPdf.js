import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';

import { DocumentView, RNPdftron, PDFViewCtrl, } from "react-native-pdftron";
import { COLORS } from '../../utils/COLORS';
import storage from '@react-native-firebase/storage';
import ReactNativeBlobUtil from 'react-native-blob-util'
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';

const DownloadPdf = ({ navigation }) => {

    const UID = auth()?.currentUser?.uid
    const [saveUrl, setSaveUrl] = useState("")
    const [AllFirebasePdfData, setAllFirebasePdfData] = useState()
    const [downloadProgress, setDownloadProgress] = useState(0);

    const [LoadingAlphabeth, setLoadingAlphabets] = useState("")

    useEffect(() => {
        getALlPDf()
    }, [])


    useEffect(() => {
        getDownloadUrl()
    }, [AllFirebasePdfData])

    const getALlPDf = async () => {

        const jsonValue = await AsyncStorage.getItem('YYZ');

        console.log("sdadsa", jsonValue)

        if (jsonValue !== null) {
            navigation.navigate("Home")

            console.log("Going to home")
        } else {




            const alphabets = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
            const promises = [];

            alphabets.forEach((Alpha) => {
                const promise = firestore()
                    .collection("Alphabet")
                    ?.doc(Alpha)
                    ?.collection(Alpha)
                    ?.get()
                    .then((querySnapshot) => {
                        const Arr = [];

                        querySnapshot.forEach((doc) => {
                            // Push individual items from the document data, not the entire document data
                            Arr.push(doc.data());
                        });

                        
                        //   console.log(`Data for ${Alpha}:`, Arr);
                        return Arr;
                    })
                    .catch((error) => {
                        console.error(`Error fetching data for ${Alpha}:`, error);
                        return []; // Return an empty array if there's an error
                    });

                promises.push(promise);
            });

            console.log("promises", promises);

            Promise.all(promises)
                .then((dataArrays) => {
                    const allPdfData = dataArrays.reduce((acc, currentArray) => acc.concat(currentArray), []);
                    console.log("Data Arrays:", allPdfData);
                    setAllFirebasePdfData(allPdfData);

                })
                .catch((error) => {
                    console.error("Error fetching PDF data:", error);
                });


        }
    }





    const getDownloadUrl = async () => {

        if (AllFirebasePdfData) {
            console.log("Running :)")
            const totalItems = AllFirebasePdfData.length;
            let completedItems = 0;
            for (const e of AllFirebasePdfData) {
                try {
                    const response = await ReactNativeBlobUtil
                        .config({
                            fileCache: true,
                        })
                        .fetch('GET', `${e.Page}`, {
                            // Add any necessary headers here
                        })

                    // Get the downloaded file path
                    const filePath = response.path();

                    // Assuming 'name' is the property in e that holds the name of the file
                    const fileName = e.name;

                    const firstLetter = fileName.charAt(0).toUpperCase();

                    setLoadingAlphabets(firstLetter)

                    // Save the filePath and fileName pair to AsyncStorage
                    await AsyncStorage.setItem(fileName, filePath);

                    completedItems++;

                    if (completedItems === totalItems) {
                        // All items have been successfully processed
                        console.log("All items have been downloaded successfully.");
                        setLoadingAlphabets("Finish")
                        navigation.navigate("Home")
                    }

                    console.log(`Saved path for file ${fileName}: ${filePath}`);
                } catch (error) {
                    console.error('Error downloading file:', error);
                }
            }
        }
    };




    return (
        <View style={{ flex: 1, backgroundColor: "white", alignItems: 'center', justifyContent: 'center' }}>

            <Text style={{ fontSize: 18 }}>Downloading takes some time please wait.</Text>

            <LottieView source={require('../../assets/images/Downloading.json')} autoPlay loop style={{ height: 200, width: 200 }} />

            {
                LoadingAlphabeth === "A" ?

                    <Text style={{ color: 'black' }}>5.5%</Text>
                    :
                    LoadingAlphabeth === "B" ?
                        <Text style={{ color: 'black' }}>11%</Text>

                        :
                        LoadingAlphabeth === "C" ?
                            <Text style={{ color: 'black' }}>15.5%</Text>

                            :
                            LoadingAlphabeth === "D" ?
                                <Text style={{ color: 'black' }}>18.2%</Text>

                                :
                                LoadingAlphabeth === "E" ?
                                    <Text style={{ color: 'black' }}>20%</Text>

                                    :
                                    LoadingAlphabeth === "F" ?
                                        <Text style={{ color: 'black' }}>25.8%</Text>

                                        :
                                        LoadingAlphabeth === "G" ?
                                            <Text style={{ color: 'black' }}>30.80%</Text>

                                            :
                                            LoadingAlphabeth === "H" ?
                                                <Text style={{ color: 'black' }}>40%</Text>

                                                :
                                                LoadingAlphabeth === "I" ?
                                                    <Text style={{ color: 'black' }}>45.5%</Text>

                                                    :

                                                    LoadingAlphabeth === "J" ?
                                                        <Text style={{ color: 'black' }}>45.8%</Text>

                                                        :
                                                        LoadingAlphabeth === "K" ?
                                                            <Text style={{ color: 'black' }}>50%</Text>

                                                            :
                                                            LoadingAlphabeth === "L" ?
                                                                <Text style={{ color: 'black' }}>55%</Text>

                                                                :
                                                                LoadingAlphabeth === "M" ?
                                                                    <Text style={{ color: 'black' }}>60%</Text>

                                                                    :
                                                                    LoadingAlphabeth === "O" ?
                                                                        <Text style={{ color: 'black' }}>65%</Text>

                                                                        :
                                                                        LoadingAlphabeth === "P" ?
                                                                            <Text style={{ color: 'black' }}>70%</Text>

                                                                            :
                                                                            LoadingAlphabeth === "Q" ?
                                                                                <Text style={{ color: 'black' }}>71.20%</Text>


                                                                                :
                                                                                LoadingAlphabeth === "R" ?
                                                                                    <Text style={{ color: 'black' }}>75%</Text>


                                                                                    :
                                                                                    LoadingAlphabeth === "S" ?
                                                                                        <Text style={{ color: 'black' }}>80%</Text>


                                                                                        :
                                                                                        LoadingAlphabeth === "T" ?
                                                                                            <Text style={{ color: 'black' }}>85.5%</Text>


                                                                                            :
                                                                                            LoadingAlphabeth === "U" ?
                                                                                                <Text style={{ color: 'black' }}>90.01%</Text>


                                                                                                :
                                                                                                LoadingAlphabeth === "V" ?
                                                                                                    <Text style={{ color: 'black' }}>93.10%</Text>

                                                                                                    :
                                                                                                    LoadingAlphabeth === "W" ?
                                                                                                        <Text style={{ color: 'black' }}>95.20%</Text>


                                                                                                        :
                                                                                                        LoadingAlphabeth === "X" ?
                                                                                                            <Text style={{ color: 'black' }}>97.10%</Text>


                                                                                                            :
                                                                                                            LoadingAlphabeth === "Y" ?
                                                                                                                <Text style={{ color: 'black' }}>99%</Text>


                                                                                                                :
                                                                                                                LoadingAlphabeth === "Z" ?
                                                                                                                    <Text style={{ color: 'black' }}>100%</Text>
                                                                                                                    :
                                                                                                                    LoadingAlphabeth === "Finish" ?
                                                                                                                        <Text style={{ color: 'black' }}>Finished</Text>

                                                                                                                        :

                                                                                                                        <Text>Please wait..</Text>


            }
        </View>
    )



}

export default DownloadPdf