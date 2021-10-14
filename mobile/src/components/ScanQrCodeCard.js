import React, { Component } from "react";

import {
  StyleSheet,
  // Text,
  View,
  BackHandler,
  SafeAreaView,
  Platform,
  TouchableHighlight,
  TouchableOpacity,
  TouchableNativeFeedback,
  StatusBar,
  TouchableWithoutFeedback
} from "react-native";

import {
  Text
} from "@ui-kitten/components";
import { Ionicons, Foundation } from "@expo/vector-icons";

export class ScanQrCodeCard extends Component {
  render() {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => this.props.onClick()}
        style={{
          justifyContent: "center",
          alignItems: "center",
          // padding: 20,
          height: 130,
          width: "45%",
          marginHorizontal: 5,
          marginTop: 20,
          borderColor: "#d9d9d9",
          // borderWidth: 1,
          borderRadius: 10,
          // backgroundColor:"#22558519"
          backgroundColor: "#fff",
          shadowColor: "#000",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 3
          },
          shadowOpacity: 0.29,
          shadowRadius: 4.65,
          elevation: 7
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Ionicons
            name="qr-code-outline"
            size={50}
            color="black"
            // color={Colors.primary}
          />
          <Text
            style={{
              fontSize: 13,
              marginTop: 10,
              // color: Colors.primary
              color: "black"
            }}
          >
            Scan QR Code
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default ScanQrCodeCard;