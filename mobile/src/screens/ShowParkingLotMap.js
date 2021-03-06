import React, { Component } from "react";

import MapView from "react-native-maps";

import {
  Dimensions,
  StyleSheet,
  //  Text,
  TextInput,
  View,
  BackHandler,
  SafeAreaView,
  Platform,
  TouchableHighlight,
  TouchableOpacity,
  TouchableNativeFeedback,
  StatusBar,
} from "react-native";

// import { Colors } from "react-native/Libraries/NewAppScreen";
import Colors from "../constants/colors";
import style from "../constants/style";
import serverUrl from "../constants/apiUrl";

import SelectLocationMaps from "./SelectLocationMaps";
import Constants from "expo-constants";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

import {
  Text,
  Icon,
  Layout,
  TopNavigation,
  TopNavigationAction,
  Spinner,
} from "@ui-kitten/components";

import axios from "axios";

import { MaterialIcons, Foundation } from "@expo/vector-icons";

import { GlobalContext } from "../context/GlobalState";


export default class ShowParkingLotMap extends React.Component {
  static contextType = GlobalContext;

  state = {
    selectLocationMapsModel: false,
    location: { coords: { latitude: 15.993939400354561,  longitude: 108.25619180908294, } },
    errorMessage: false,
    parkingLotList: [],
    isLoading: true,
    permission: false,
    getUserLocationLoading: false,
    tooltipVisible: true,
  };
  componentDidMount() {
    this.setState({ isLoading: true });
    axios(serverUrl + "/parking", {
      headers: {
        "jwt-token": this.context.state.loginData["jwt-token"],
      },
    })
      .then((response) => {
        let responseDate = response.data;
        this.setState({ isLoading: false });

        if (!responseDate.length == 0 && !responseDate[0].latitude) {
          this.setState({
            errorMessage: "Something went wrong.Please try again.",
          });
        }
        this.setState(
          {
            parkingLotList: responseDate,
            isLoading: false,
          },
          function () {}
        );
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          errorMessage: "Something went wrong.Please try again.",
          isLoading: false,
        });
      });
    setTimeout(() => {
      this.setState({ tooltipVisible: false });
    }, 5000);
  }
  componentWillMount() {}
  getUserLocation = async () => {
    this.setState({ getUserLocationLoading: true });
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        permission: false,
      });
      this.setState({ getUserLocationLoading: false });
    }
    if (status == "granted") {
      this.setState({
        permission: true,
      });
    }
    try {
      let location = await Location.getCurrentPositionAsync({});
      console.log(location);
      this.setState({
        // location: { coords: { latitude: 32.715069, longitude: -117.15552 } },
        location: location,
      });
      this.setState({ getUserLocationLoading: false });
    } catch (e) {
      console.log(e);
      this.setState({ getUserLocationLoading: false });
    }
  };
  BackIcon = (style) => <Icon {...style} name="arrow-ios-back-outline" />;

  BackAction = () => (
    <TopNavigationAction
      icon={this.BackIcon}
      onPressIn={() => this.props.navigation.goBack()}
    />
  );
  render() {
    return (
      <View style={{ flex: 1 }}>
        <TopNavigation
          title="Parking Lot"
          alignment="center"
          leftControl={this.BackAction()}
        />
        {this.state.tooltipVisible && (
          <View
            style={{
              // height: 40,
              // width: "100%",
              borderWidth: 1,
              // padding: 5,
              borderRadius: 8,
              backgroundColor: "#ffffff",
              position: "absolute",
              left: 10,
              right: 10,
              top: 70,
              zIndex: 1,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              // marginHorizontal: 10,
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}
          >
            <Foundation
              name="info"
              size={24}
              color="black"
              style={{ margin: 10 }}
            />
            <Text>
              You can Click on marker and title of marker for more information
              about a parking lot
            </Text>
          </View>
        )}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            this.getUserLocation();
          }}
          style={{
            height: 40,
            width: 40,
            borderWidth: 1,
            // padding: 5,
            borderRadius: 8,
            backgroundColor: "#ffffffbb",
            position: "absolute",
            right: 15,
            bottom: 15,
            zIndex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {!this.state.getUserLocationLoading ? (
            <MaterialIcons name="my-location" size={30} />
          ) : (
            <Spinner color="blue" />
          )}
        </TouchableOpacity>
        {!this.state.isLoading ? (
          !this.state.errorMessage ? (
            <MapView
              style={styles.mapStyle}
              region={{
                latitude: this.state.location.coords.latitude,
                longitude: this.state.location.coords.longitude,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
              }}
            >
              {this.state.parkingLotList &&
                this.state.parkingLotList.map((mapInfo, index) => (
                  <MapView.Marker
                    key={index}
                    coordinate={{
                      latitude: Number(mapInfo.latitude),
                      longitude: Number(mapInfo.longitude),
                    }}
                    title={mapInfo.pd_loc_name}
                    onCalloutPress={() =>
                      this.props.navigation.navigate("ParkingLotDetails", {
                        data: mapInfo,
                      })
                    }
                  />
                ))}
            </MapView>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>{this.state.errorMessage}</Text>
            </View>
          )
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Spinner color="blue" />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mapStyle: {
    // width: Dimensions.get("window").width,
    // height: Dimensions.get("window").height
    width: "100%",
    height: "100%",
  },
});
