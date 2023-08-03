import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp, heightPercentageToDP } from 'react-native-responsive-screen'
import CustomButton from './CustomButton'
import colors from '../constant/colors'
import { A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, R, S, T, U, V, X, Y, globalSearch } from '../arrayindex/Alphabet'
import Modal from 'react-native-modal'
import AntDesign from 'react-native-vector-icons/AntDesign'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import { useSelector, useDispatch } from 'react-redux'
import { COLORS } from '../utils/COLORS'

const Header = ({
    placeHolder,
    onPress,
    Logo,
    ImageUR,
    inputProps,
    onPressButton,
    btnColor,
    profile,
    Nav,
    onchangeText,
    value,
    ImageUrl,
    QuickFind
    // navigation
}) => {


    const [isModalVisible, setModalVisible] = useState(false);
    const [search, setSearch] = useState("");
    const [data, setData] = useState()
    const [AlphabetPdfs, setAlphabetPdfs] = useState()


    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

    const [getData, setGetData] = useState()
    const [CurrentAplhabet, setAplhabet] = useState("")

    const UID = auth()?.currentUser?.uid

    const allPdf = useSelector(state => state.pdf.allPdf);


    useEffect(() => {
        getMYData()
    }, [])

    const getMYData = () => {

        firestore()
            .collection("Users")
            .doc(UID)
            .onSnapshot((doc) => {
                // console.log("doccccccccer",doc.data())
                setData(doc?.data())

            })

    }

    const CallData = (Aplha) => {
        setSearch("")
        setAplhabet(Aplha)

        firestore()
            .collection("Alphabet")
            .doc(Aplha)
            .collection(Aplha)
            .get()
            .then((i) => {
                const AlphabetPDF = i.docs?.map((doc) => doc.data())

                const sort = AlphabetPDF.sort((a, b) => a.name.localeCompare(b.name));

                setAlphabetPdfs(sort)


            })


    }


    const goToPDFPage = (item) => {
        Nav.navigate('PDFText', { pageUrl: item.Page, isSelected: item.name })
        toggleModal()
    }


    return (
        <View style={{ width: wp('90%'), flexDirection: 'row', justifyContent: 'space-between' }}>

            {
                QuickFind ?


                    <View >
                    </View>

                    :
                    null

            }
            <TouchableOpacity onPress={() => Nav.navigate('Home')}>
                <Image source={Logo ? Logo : require('../assets/images/OldPic.png')} style={[styles.Logo, { marginLeft: QuickFind ? 50 : 0 }]} resizeMode='contain' />
            </TouchableOpacity>
            {/* {
                QuickFind ?

                    <></>
                    :
                    <TouchableOpacity onPress={() => toggleModal()} style={{ height: 60, width: wp('50%'), backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', borderRadius: 20 }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: hp('2%') }}>Quick Find</Text>
                    </TouchableOpacity>

            } */}
            
            <View/>
            {/* <TouchableOpacity onPress={() => Nav.navigate('EditProfile')}>
                <Image source={data?.Image ? { uri: data?.Image } : require("../assets/images/OldPic.png")} style={styles.profile} resizeMode={'cover'} />
            </TouchableOpacity> */}

            <Modal isVisible={isModalVisible}>

                <ScrollView contentContainerStyle={{ flexGrow:1 }}>

                    <TouchableOpacity onPress={() => { toggleModal() }}>

                        <AntDesign name='closecircleo' size={25} />
                    </TouchableOpacity>


                    <TextInput
                        style={{ height: 60, width: wp('80%'), backgroundColor: COLORS.WHITE, alignSelf: 'center', borderRadius: 10, marginTop: 10, borderWidth: 1, paddingHorizontal: 20 }}
                        placeholder="Enter City / Country Name"
                        onChangeText={(txt) => {
                            setSearch(txt)
                        }}


                        value={search}

                    />


                    <View style={{ borderRadius: 10, padding: 20, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>

                        {
                            alphabet?.map((item) => {
                                return (
                                    <>
                                        <TouchableOpacity onPress={() => CallData(item)} style={{ height: 70, width: 70, backgroundColor: colors.primary, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 20, marginLeft: 10 }}>
                                            <Text style={{ color: COLORS.WHITE, fontWeight: 'bold', fontSize: hp('2.5%') }}>{item}</Text>
                                        </TouchableOpacity>

                                    </>
                                )
                            })
                        }


                        <TouchableOpacity >

                        </TouchableOpacity>
                    </View>
                
                    {/* <Text style={{ color: 'black', alignSelf: 'center', fontSize: hp('2.5%') }}>Airport Code for {CurrentAplhabet}</Text> */}
                    {
                        getData === undefined ?

                            <Text style={{ color: 'black', fontSize: hp("2.5%"), alignSelf: 'center' }}>Nothing found</Text>

                            :

                            <View />
                    }
                 
                    <ScrollView >
                        {

                            search === "" ?

                                AlphabetPdfs?.filter((val) => {

                                    // console.log(val)
                                    if (search === "") {
                                        return val
                                    } else if (AlphabetPdfs?.Airport && val.Airport.toLowerCase().includes(search.toLowerCase())) {
                                        return val
                                    }
                                }).map((item, key) => {
                                    return (
                                        <>
                                            <TouchableOpacity onPress={() => goToPDFPage(item)} style={{ height: 60, backgroundColor: colors.primary, borderRadius: 10, marginTop: 20, justifyContent: 'center', paddingHorizontal: 20, alignSelf: 'center' }}>
                                                <Text style={{ color: COLORS.WHITE, alignSelf: 'center', fontSize: hp('2.5%'), fontWeight: 'bold' }}>
                                                    {item.name}
                                                </Text>

                                                {
                                                    item?.Domestic ?
                                                        <Text style={{ alignSelf: 'center', fontSize: hp('1%'), color: COLORS.WHITE, fontWeight: 'bold' }}>Domestic Airport</Text>

                                                        :
                                                        <Text style={{ alignSelf: 'center', fontSize: hp('1%'), color: COLORS.WHITE, fontWeight: 'bold' }}>International Airport</Text>


                                                }
                                            </TouchableOpacity>

                                            <Text style={{ alignSelf: 'center', fontSize: hp('2.5%'), fontWeight: 'bold', marginTop: 5 }}>{item?.Airport}</Text>
                                        </>
                                    )
                                })

                                :

                                allPdf?.filter((val) => {

                                    // console.log(val)
                                    if (search === "") {
                                        return val
                                    } else if (val.Airport && val.Airport.toLowerCase().includes(search.toLowerCase())) {
                                        return val
                                    }
                                }).map((item, key) => {
                                    // console.log("item.....", item.Domestic)


                                    return (
                                        <>
                                            <TouchableOpacity onPress={() => goToPDFPage(item)} style={{ height: 60, backgroundColor: colors.primary, borderRadius: 10, marginTop: 20, justifyContent: 'center', paddingHorizontal: 20, alignSelf: 'center' }}>
                                                <Text style={{ color: COLORS.WHITE, alignSelf: 'center', fontSize: hp('2.5%'), fontWeight: 'bold' }}>
                                                    {item.name}
                                                </Text>
                                                {
                                                    item?.Domestic ?
                                                        <Text style={{ alignSelf: 'center', fontSize: hp('1%'), color: COLORS.WHITE, fontWeight: 'bold' }}>Domestic Airport</Text>

                                                        :
                                                        <Text style={{ alignSelf: 'center', fontSize: hp('1%'), color: COLORS.WHITE, fontWeight: 'bold' }}>International Airport</Text>


                                                }
                                            </TouchableOpacity>

                                            <Text style={{ alignSelf: 'center', fontSize: hp('2.5%'), fontWeight: 'bold', marginTop: 5 }}>{item?.Airport}</Text>
                                        </>
                                    )
                                })



                        }
                    </ScrollView>

                </ScrollView>
            </Modal>

        </View>
    )
}

const styles = StyleSheet.create({
    Logo: {
        width: wp('15'),
        height: hp('9'),
        // backgroundColor: 'lightblue',
        borderRadius: 10,

    },
    input: {
        height: hp('5'),
        width: hp(25),
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'gray',
        padding: 20
    },
    profile: {
        width: 70,
        height: 70,
        borderRadius: 200
    }
})
export default Header