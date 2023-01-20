import { View, Text, StatusBar, FlatList, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import Header from '../../component/Header'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import colors from '../../constant/colors'
import Icon from 'react-native-vector-icons/MaterialIcons'



import Comment from '../../component/Comment'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import ShowingComments from '../../component/ShowingComments'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const NoteDetail = ({ route, navigation }) => {
    const UID = auth().currentUser.uid

    const HEIGHT = StatusBar.currentHeight;
    const { detail, Title } = route.params
    const text = detail.Note
    const isSelected = detail.title

    console.log(isSelected)

    const [commentText, onCommentText] = useState("")
    const [Comments, getComment] = useState("")

    useEffect(() => {
        FetchComment()
    }, [])

    const sendComment = () => {

        if (commentText !== "") {
            firestore()
                .collection('Users')
                .doc(UID)
                .get()
                .then((info) => {
                    firestore()
                        .collection('Comments')
                        .doc(Title)
                        .collection("Comments")
                        .add({
                            name: info?.data()?.username,
                            Comment: commentText,
                            UID: UID,
                            CreatedAt: Math.floor(Date.now() / 1000)
                        }, {
                            merge: true
                        })
                }).then(() => {
                    onCommentText("")
                })


        }

    }


    const FetchComment = () => {

        firestore()
            .collection('Comments')
            .doc(Title)
            .collection("Comments")
            .orderBy('CreatedAt', 'desc')
            .onSnapshot((doc) => {
                const Temp = []
                doc?.docs?.map((tnt) => {
                    Temp.push(tnt)
                })
                getComment(Temp)
            })
    }

    const onDeleteComment = (chatID) => {

        firestore()
            .collection('Comments')
            .doc(Title)
            .collection("Comments")
            .doc(chatID)
            .delete()
    }


    return (
        <View style={{ flex: 1 }}>
            <View style={{ marginTop: HEIGHT + hp('5'), alignSelf: 'center' }}>
                <Header Logo={require('../../assets/images/logo1.png')} profile={require('../../assets/images/profile.png')} btnColor={colors.primary} Nav={navigation} />
            </View>


            <ScrollView contentContainerStyle={{ backgroundColor: colors.primary, width: wp('90'), alignSelf: 'center', borderRadius: 20, top: 30 }}>
                <View style={{ padding: 30 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Icon name='arrow-back' color={'gray'} size={50} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 24, color: 'white', marginLeft: 20 }}>General Aircraft Notes</Text>
                    </View>
                </View>
                <View style={{ backgroundColor: '#303071', paddingVertical: 10, borderRadius: 10, justifyContent: 'center', paddingLeft: 20, marginVertical: 10, width: wp('80'), alignSelf: "center" }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ width: wp('55') }}>
                            <Text style={{ color: 'white', fontSize: 22 }}>{detail.title}</Text>
                        </View>
                        <Image source={require('../../assets/images/airplan.png')} style={{ width: wp(9), height: hp('2'), marginRight: 10 }} />
                    </View>
                </View>
                <View style={{ backgroundColor: '#FFFF', paddingVertical: 10, borderRadius: 10, paddingLeft: 20, marginVertical: 10, width: wp('80'), alignSelf: "center", top: 30 }}>
                    <Text style={{ lineHeight: 50, fontSize: 22, color: 'black', paddingRight: 20 }}>
                        {text}
                    </Text>
                </View>
                <View style={{ width: wp('80%'), alignSelf: 'center', padding: 20, backgroundColor: 'white', marginTop: 40, borderRadius: 20, marginBottom:20 }}>

                    <Comment onSendComment={sendComment} onState={onCommentText} val={commentText} />

                    <FlatList
                        data={Comments}
                        renderItem={(cmt) => {

                            const comment = cmt?.item.data().Comment
                            const name = cmt?.item.data().name
                            const uid = cmt?.item.data().UID

                            return (
                                <>
                                    {
                                        comment !== "" ?
                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 35, width: wp('70%'), justifyContent: 'space-between' }}>
                                                <ShowingComments name={name} comment={comment} />
                                                {
                                                    UID === uid ?
                                                        <TouchableOpacity onPress={() => onDeleteComment(cmt.item.id)}>

                                                            <MaterialCommunityIcons
                                                                name='delete'
                                                                size={25}

                                                            />
                                                        </TouchableOpacity>
                                                        :
                                                        null
                                                }

                                            </View>

                                            :

                                            <Text>No Comment here</Text>

                                    }


                                </>
                            )
                        }}
                    />
                </View>
            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 22
    }
})
export default NoteDetail