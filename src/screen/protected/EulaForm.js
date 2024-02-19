import { View, Text, useWindowDimensions, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import RenderHtml from 'react-native-render-html';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { heightPercentageToDP } from 'react-native-responsive-screen';
import Feather from 'react-native-vector-icons/Feather'
import { COLORS } from '../../utils/COLORS';
import colors from '../../constant/colors';
import Toast from 'react-native-toast-message';
import firestore from '@react-native-firebase/firestore';
import auth, { firebase } from '@react-native-firebase/auth';


const EulaForm = ({ navigation }) => {

  const [isChecked, setIsChecked] = useState(false)

  const [isLoader, setLoader] = useState(false)
  const source = {
    html: `
    <p><strong><u>The JP Guide &ndash; End User License &nbsp;Agreement</u></strong></p>
<p><em><strong>Updated: 5 August 2023</strong></em></p>

<p><strong><u>Products and Services</u></strong></p>
<p><strong>The JP Guide, LLC offers products and services for general information and educational purposes. Pricing and description information is available at TheJPGuide.com. All prices, descriptions, terms, and conditions presented on the website, TheJPGuide.com are hereby incorporated into this User Agreement. All terms and conditions presented here and on the website are subject to change at any time without notice.</strong></p>

<p><strong><u>For General Information Only</u></strong></p>
<p><strong>The information contained herein is intended ONLY FOR GENERAL INFORMATION AND EDUCATIONAL PURPOSES. &nbsp;None of the information or recommendations contained herein have been reviewed, approved, authorized, or otherwise supported by the Federal Aviation Administration, any other government or intergovernmental agency, any aviation trade group, any airlines, or governmentally certified aviation firms. Any references to specific airline or aircraft procedures, rules, policies, or limitations are for illustrative purposes only and should not be relied upon in any way. Pilots must acquire and verify all information used for flight operations by way of approved company manuals and official aviation sources regulated by the respective authorities.</strong></p>

<p><strong><u>No Warranties</u></strong></p>
<p><strong>This product/service is provided with no warranties, guarantees, promises, commitments, or expectations. The JP Guide, LLC shall not be liable for any damages, including but not limited to, consequential damages, loss of income, or harm to person or property, arising from, or in connection with, this guide or any related products, software, or services.</strong></p>

<p><strong><u>No Claims to Accuracy of Information</u></strong></p>
<p><strong>The JP Guide, LLC does not guarantee the accuracy, completeness, or timeliness of any information contained in this application or its underlying sources and shall not be liable for any losses or damages, including direct, indirect, consequential, or punitive damages, arising out of, or related to, the use or misuse of any information contained in this application. Users should not reply on the information contained herein for air navigation or any other purpose.</strong></p>

<p><strong><u>Intellectual Property</u></strong></p>
<p><strong>All intellectual property contained, displayed, or otherwise utilized by and for this application/service is the property of The JP Guide, LLC. Intellectual property includes but is not limited to Trademarks, Copyrights, Web domains. Users of the application have no ownership or rights beyond a limited, non-exclusive license to use the application and view the information contained within for personal, non-commercial purposes only.</strong></p>

<p><strong><u>Duplication, Copying, and Resale Prohibited</u></strong></p>
<p><strong>Users are expressly prohibited from duplicating, copying, reproducing, modifying, distributing, transmitting, displaying, selling, reselling, or otherwise exploiting, in whole or in part, any content or materials provided by The JP Guide, LLC, either electronically or in print, for any commercial or unauthorized purposes.</strong></p>

<p><strong><u>Non-Commercial Use Only</u></strong></p>
<p><strong>The information and materials provided by The JP Guide, LLC are intended solely for personal, non-commercial use and shall not be used for any commercial or profit-generating activities without the express written permission of The JP Guide, LLC.</strong></p>

<p><strong><u>Enforcement and Remedies</u></strong></p>
<p><strong>Any unauthorized duplication, copying, distribution, or resale of The JP Guide&apos;s intellectual property will be considered a breach of this User Agreement and may result in legal action. The JP Guide, LLC reserves the right to pursue all available legal remedies to protect its intellectual property rights and seek damages for any losses incurred as a result of such unauthorized activities.</strong></p>

<p><strong><u>Protection of Proprietary Information</u></strong></p>
<p><strong>Users must take all reasonable precautions to protect the confidentiality and security of The JP Guide&apos;s proprietary information and materials. Users shall not disclose or provide access to The JP Guide&apos;s proprietary content to any third party without the explicit consent of The JP Guide, LLC.</strong></p>

<p><strong><u>Responsibility for User-Generated Content</u></strong></p>
<p><strong>Any content, feedback, suggestions, or ideas submitted by users through the application become the property of The JP Guide, LLC. By submitting user-generated content, users grant The JP Guide a worldwide, royalty-free, non-exclusive, perpetual, irrevocable, and fully sublicensable right to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display such content in any media, now known or hereafter devised, for any purpose, including commercial use.</strong></p>

<p><strong><u>Reporting Intellectual Property Violations</u></strong></p>
<p><strong>If users believe that their intellectual property rights have been violated while using The JP Guide application, they should promptly notify The JP Guide, LLC, in writing, providing details of the alleged violation.</strong></p>

<p><strong>Any violation of this Intellectual Property section may result in immediate termination of the user&apos;s access to The JP Guide application, in addition to any other legal remedies available to The JP Guide, LLC.</strong></p>

<p><strong><u>Entirety of the Agreement</u></strong></p>
<p><strong>This Agreement, and all terms, conditions, warranties, and representations herein, are for the sole and exclusive benefit of the signatories hereto. This Agreement constitutes the entire understanding of the parties as of its Effective Date and supersedes all prior and independent, oral or written agreements, understandings, statements, representations, commitments, promises, and warranties made with respect to the subject matter of this Agreement.</strong></p>

<p><strong><u>Choice of Law and Venue</u></strong></p>
<p><strong>This Agreement is governed by the Laws of the State of Florida and the Laws of the United States of America. In the event of a dispute, both Parties will use good faith efforts to resolve the matter without litigation. In the event of litigation, both Parties agree that the appropriate venue and jurisdiction for all matters between the parties shall be a court of competent jurisdiction located within Ft. Lauderdale-Broward County, Florida. In all matters, all Parties will be responsible for their own legal, attorney, and court fees and expenses, regardless of any outcome in court.</strong></p>

<p><strong><u>Acceptance of User Agreement</u></strong></p>
<p><strong>By clicking the &quot;Accept&quot; button or enrolling into the paid subscription of The JP Guide application, you acknowledge that you have read, understood, and agree to be bound by all the terms and conditions set forth in this User Agreement. If you do not agree to these terms, you must refrain from using the application and discontinue any enrollment in the paid subscription.</strong></p>

<p><strong>Your acceptance of this User Agreement constitutes a legally binding contract between you and The JP Guide, LLC. It supersedes any prior agreements, whether written or oral, between you and The JP Guide, LLC, regarding the subject matter herein.</strong></p>

<p><strong>You affirm that you are at least 18 years old and have the legal capacity to enter into this agreement. If you are accepting this User Agreement on behalf of an organization or entity, you warrant that you have the authority to bind the organization or entity to the terms and conditions stated herein.</strong></p>
<p><strong>The JP Guide, LLC reserves the right to update, modify, or revise this User Agreement at any time without prior notice. It is your responsibility to review this agreement periodically to stay informed of any changes. Continued use of the application after changes to the User Agreement shall constitute your acceptance of the modified terms.</strong></p>
<p><strong>If you have any questions or concerns regarding this User Agreement, please contact us at [contact email or support page].</strong></p>
<p><strong>By clicking &quot;Accept&quot; and using the application or enrolling in the paid subscription, you agree to comply with and be bound by all the terms and conditions set forth in this User Agreement.</strong></p>
<p><strong>Thank you for using The JP Guide application responsibly and respecting the intellectual property and rights of others.</strong></p>
`
  };


  const EulaServiceReaded = () => {

    setLoader(true)



    if (isChecked === true) {
      const UID = auth()?.currentUser?.uid

      firestore()
        .collection("Users")
        .doc(UID)
        .update({
          "EulaStatus": true
        }).then(() => {
          console.log("successfully updated")
          navigation.navigate("DownloadPdf")
          setLoader(false)

        }).catch(err => {
          console.log(err)
          setLoader(false)

        })


    } else {
      Toast.show({
        'type': 'error',
        'text1': "Please accept the End User License Agreement"
      })
      setLoader(false)
    }
  }
  const { width } = useWindowDimensions();
  return (
    <SafeAreaView style={{ flex: 1 }}>

      <View >

        <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }}>

          <RenderHtml
            contentWidth={width}
            source={source}
          />

          <View style={{ flexDirection: 'row', height: 100, alignItems: 'center', paddingHorizontal: 20 }}>

            <TouchableOpacity onPress={() => setIsChecked(!isChecked)} style={{ height: 30, width: 30, backgroundColor: 'white', borderRadius: 5, alignItems: 'center', justifyContent: 'center', borderWidth: 1, }}>
              {
                isChecked === true ?
                  <Feather

                    name='check'
                    size={25}
                    color={'black'}
                  />
                  :
                  null

              }

            </TouchableOpacity>

            <Text style={{ marginLeft: 10, fontSize: heightPercentageToDP('2%'), color: "black" }}>Please accept the <Text style={{ textDecorationLine: 'underline', color: 'blue' }}> End User License Agreement</Text></Text>
          </View>

          <View style={{ paddingHorizontal: 20 }}>



            <TouchableOpacity onPress={() => EulaServiceReaded()} style={{ height: 50, backgroundColor: colors.primary, borderRadius: 5, alignItems: 'center', justifyContent: 'center', borderWidth: 1, marginBottom: 20 }}>

              {
                isLoader === true ?

                  <ActivityIndicator style={{ alignSelf: 'center', }} size={'small'} color={'white'} />
                  :

                  <Text style={{ color: "white", fontWeight: 'bold', fontSize: 18 }}>Continue</Text>
              }
            </TouchableOpacity>

          </View>
        </ScrollView>
      </View>

      <Toast />

    </SafeAreaView>
  )
}

export default EulaForm