import { View, Text, ImageBackground, TextInput, TouchableOpacity, Image, ActivityIndicator, FlatList, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../../constant/colors'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import firestore from '@react-native-firebase/firestore';
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { COLORS } from '../../utils/COLORS';
import Icon from 'react-native-vector-icons/AntDesign'
import AwesomeAlert from 'react-native-awesome-alerts';

const AllPdf = ({ navigation }) => {

    const [data, setData] = useState()
    const [search, setSearch] = useState("");
    const [Alert, setAlert] = useState(false)
    const [DeletePdf, setDelete] = useState(false)

    const [selectedItem, setSelectedItem] = useState(null);





    useEffect(() => {
        getPdf()
    }, [])


    const handleConfirm = (item) => {
        console.log(item); // do something with the selected item

        const firstLatter = item.name.charAt(0).toUpperCase()




        firestore()
            .collection("PDF")
            .doc(item.id)
            .delete()
            .then(() => {

                firestore()
                    .collection("Alphabet")
                    .doc(`${firstLatter}`)
                    .collection(`${firstLatter}`)
                    .doc(item.name)
                    .delete()
                    .then(() => {
                        getPdf()
                        setSelectedItem(null);
                        setAlert(false);
                    })


            })

    };

    const hideAlert = () => {
        setSelectedItem(null);
        setAlert(false);
    };



    const getPdf = () => {

        firestore()
            .collection("PDF")
            .get()
            .then((querySnapshot) => {
                const AlphabetPDF = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                const sort = AlphabetPDF.sort((a, b) => a.name.localeCompare(b.name));
                setData(sort);



            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }






    return (
        <ImageBackground source={require('../../assets/images/hi.jpeg')} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} resizeMode={'cover'}>

            <View style={{ backgroundColor: colors.primary, width: wp('90'), alignSelf: 'center', borderRadius: 20, top: 10, marginBottom: 30, padding: 20, flex: 0.9 }}>

                <View style={{ flexDirection: 'row', width: wp('70%'), justifyContent: 'space-between', marginBottom: 20 }}>

                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ height: 60, padding: 10 }}>
                        <Icon name='back' color={'white'} size={30} />
                    </TouchableOpacity>

                    <TextInput
                        placeholder='Search'
                        style={{ height: 60, width: wp('50%'), backgroundColor: 'white', borderRadius: 10, paddingHorizontal: 10 }}
                        onChangeText={(txt) => {
                            setSearch(txt)
                            // CallData(txt.charAt(0))
                        }}
                        value={search}
                    />
                </View>

                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>



                    {
                        search === "" ?

                            data?.filter((val) => {

                                // console.log(val)
                                if (search === "") {
                                    return val
                                } else if (AlphabetPdfs?.Airport && val.Airport.toLowerCase().includes(search.toLowerCase())) {
                                    return val
                                }
                            }).map((item) => {
                                return (
                                    <TouchableOpacity onPress={() => navigation.navigate('PDF', { pageUrl: item.Page, isSelected: item.name, Airport: item.Airport })} style={{ height: 80, width: wp('80%'), alignSelf: 'center', backgroundColor: COLORS.WHITE, borderRadius: 5, marginTop: 10, alignItems: 'center', flexDirection: 'row', paddingHorizontal: 10, justifyContent: 'space-between' }}>
                                        <View style={{ flexDirection: 'row' }}>

                                            <Text style={{ fontWeight: 'bold', fontSize: hp('2%') }}>{item.name}</Text>

                                            <FontAwesome5
                                                style={{ marginRight: 20, marginLeft: 20 }}
                                                name={'plane-departure'}
                                                size={25}
                                                color={'black'}
                                            />



                                            <Text style={{ fontSize: hp('2%') }}>{item.Airport}</Text>
                                        </View>

                                        <TouchableOpacity onPress={() => { setAlert(true), setSelectedItem(item) }}>

                                            <AntDesign
                                                name='delete'
                                                size={30}
                                                color={"red"}
                                            />
                                        </TouchableOpacity>


                                    </TouchableOpacity>
                                )
                            })

                            :

                            data?.filter((val) => {

                                // console.log(val)
                                if (search === "") {
                                    return val
                                } else if (val.Airport && val.Airport.toLowerCase().includes(search.toLowerCase())) {
                                    return val
                                }
                            }).map((item) => {
                                return (
                                    <TouchableOpacity onPress={() => navigation.navigate('PDF', { pageUrl: item.Page, isSelected: item.name, Airport: item.Airport })} style={{ height: 80, width: wp('80%'), alignSelf: 'center', backgroundColor: COLORS.WHITE, borderRadius: 5, marginTop: 10, alignItems: 'center', flexDirection: 'row', paddingHorizontal: 10, justifyContent: 'space-between' }}>
                                        <View style={{ flexDirection: 'row' }}>

                                            <Text style={{ fontWeight: 'bold', fontSize: hp('2%') }}>{item.name}</Text>

                                            <FontAwesome5
                                                style={{ marginRight: 20, marginLeft: 20 }}
                                                name={'plane-departure'}
                                                size={25}
                                                color={'black'}
                                            />



                                            <Text style={{ fontSize: hp('2%') }}>{item.Airport}</Text>
                                        </View>

                                        <TouchableOpacity onPress={() => { setAlert(true), setSelectedItem(item) }}>

                                            <AntDesign
                                                name='delete'
                                                size={30}
                                                color={"red"}
                                            />
                                        </TouchableOpacity>


                                    </TouchableOpacity>
                                )
                            })

                    }
                </ScrollView>
            </View>


            <AwesomeAlert
                show={Alert}
                showProgress={false}
                title="Delete Pdf"
                message="Are you sure you want to delete ?"
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                showConfirmButton={true}
                cancelText="No, cancel"
                confirmText="Yes, delete it"
                confirmButtonColor="#DD6B55"
                onCancelPressed={() => {
                    hideAlert()

                }}
                onConfirmPressed={() => {

                    handleConfirm(selectedItem)
                }}
                contentStyle={{ height: 100, }}
                titleStyle={{ fontSize: hp('2%'), fontWeight: 'bold' }}
                cancelButtonStyle={{ height: 60, width: wp('20%'), alignItems: 'center', justifyContent: 'center', }}
                cancelButtonTextStyle={{ fontSize: hp('1.5%'), fontWeight: 'bold' }}
                confirmButtonStyle={{ height: 60, width: wp('20%'), alignItems: 'center', justifyContent: 'center', }}
                confirmButtonTextStyle={{ fontSize: hp('1.5%'), fontWeight: 'bold' }}
                messageStyle={{ fontSize: hp('1.7%') }}

            />

        </ImageBackground>
    )
}

export default AllPdf