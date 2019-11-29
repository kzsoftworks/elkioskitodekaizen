import React from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import {
  askAsync as askPermissionsAsync,
  CAMERA as CameraPermissions,
} from "expo-permissions";
import { Camera } from "expo-camera";
import { getFirestore } from "../firebaseHelpers";
import authState from "../states/authState";
import Container from "../components/Container";
import { BarCodeScanner } from "expo-barcode-scanner";
import {
  FlashOffOutlineButton,
  FlashOutlineButton,
  MaximizeOutlineButton,
  MoreHorizontalOutlineButton,
  PersonOutlineButton,
  PlusSquareOutlineButton,
} from "../components/RoundButton";
import HorizontalSlider from "../components/HorizontalSlider";

export default class ProductScanner extends React.Component {
  state = {
    dbh: null,

    cameraPermissionsGranted: false,
    hasScanned: false,
    focus: 0,
    flash: Camera.Constants.FlashMode.off,
    zoom: 0,

    showIcons: false,
    showFocusSlider: false,
    showZoomSlider: false,
  };

  constructor(props) {
    super(props);

    this.handleBarCodeScanned = this.handleBarCodeScanned.bind(this);
    this.showAskToBuyMessage = this.showAskToBuyMessage.bind(this);
    this.renderCamera = this.renderCamera.bind(this);
    this.renderButtons = this.renderButtons.bind(this);
  }

  async componentWillMount() {
    const { status } = await askPermissionsAsync(CameraPermissions);
    this.setState({
      cameraPermissionsGranted: status === "granted",
      dbh: getFirestore(),
    });
  }

  componentDidMount() {
    this.setState({ autoFocus: Camera.Constants.AutoFocus.off });
  }

  async handleBarCodeScanned({ data }) {
    this.setState({ hasScanned: true });
    const itemsRef = await this.state.dbh
      .collection("items")
      .where("bar_code", "==", data) //"7798228640018" es crowie sabor chocolate, por ejemplo
      .limit(1)
      .get();
    if (itemsRef.empty) {
      Alert.alert(
        "Item doesn't exist",
        "If you think this is an error, please contact the Office Manager.",
        [{ onPress: () => this.setState({ hasScanned: false }) }]
      );
    } else {
      const itemData = itemsRef.docs[0].data();
      this.showAskToBuyMessage(itemData);
    }
    // this.setState({ hasScanned: false });
  }

  showAskToBuyMessage(itemData) {
    Alert.alert(
      "Confirm purchase",
      `Item: ${itemData.name}\nPrice: $${itemData.price}`,
      [
        {
          text: "Yes",
          onPress: async () => {
            try {
              await this.state.dbh.collection("purchases").add({
                user_id: authState.user.firebaseId,
                barcode: itemData.bar_code,
                name: itemData.name,
                cost: itemData.price,
                date: new Date(),
              });
              Alert.alert("Sabelo!", `You purchased: ${itemData.name}`, [
                { onPress: () => this.setState({ hasScanned: false }) },
              ]);
            } catch (e) {
              Alert.alert("An error has occurred", e.message, [
                { onPress: () => this.setState({ hasScanned: false }) },
              ]);
            }
          },
        },
        {
          text: "No",
          onPress: () => this.setState({ hasScanned: false }),
          style: "cancel",
        },
      ]
    );
  }

  render() {
    if (!this.state.cameraPermissionsGranted) {
      return (
        <Text>
          This app needs to use the camera in order to work. Grant the required
          permissions.
        </Text>
      );
    }
    return (
      <Container>
        {this.renderCamera()}
        {this.renderButtons()}
      </Container>
    );
  }

  renderButtons() {
    return (
      <View style={{ flex: 1, flexDirection: "column" }}>
        {MoreHorizontalOutlineButton(() =>
          this.setState({ showIcons: !this.state.showIcons })
        )}
        {this.state.showIcons && (
          <View style={{ flex: 1, flexDirection: "column" }}>
            {PersonOutlineButton(() =>
              this.props.navigation.navigate("Profile")
            )}
            {this.state.flash === Camera.Constants.FlashMode.off
              ? FlashOutlineButton(() =>
                  this.setState({
                    flash: Camera.Constants.FlashMode.torch,
                  })
                )
              : FlashOffOutlineButton(() =>
                  this.setState({
                    flash: Camera.Constants.FlashMode.off,
                  })
                )}
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                maxHeight: 50,
                height: "100%",
              }}
            >
              {MaximizeOutlineButton(() =>
                this.setState({
                  showZoomSlider: !this.state.showZoomSlider,
                })
              )}
              {this.state.showZoomSlider &&
                HorizontalSlider(this.state.zoom, value => {
                  this.setState({
                    zoom: value,
                  });
                })}
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                maxHeight: 50,
                height: "100%",
              }}
            >
              {PlusSquareOutlineButton(() =>
                this.setState({
                  showFocusSlider: !this.state.showFocusSlider,
                })
              )}
              {this.state.showFocusSlider &&
                HorizontalSlider(this.state.focus, value => {
                  this.setState({
                    focus: value,
                  });
                })}
            </View>
          </View>
        )}
      </View>
    );
  }

  renderCamera() {
    return (
      <Camera
        ref={ref => {
          this.camera = ref;
        }}
        type={Camera.Constants.Type.back}
        flashMode={this.state.flash}
        zoom={this.state.zoom}
        focusDepth={this.state.focus}
        autoFocus={this.state.autoFocus}
        barCodeScannerSettings={{
          barCodeTypes: [
            BarCodeScanner.Constants.BarCodeType.ean13,
            BarCodeScanner.Constants.BarCodeType.ean8,
          ],
        }}
        onBarCodeScanned={
          this.state.hasScanned ? undefined : this.handleBarCodeScanned
        }
        style={StyleSheet.absoluteFillObject}
      />
    );
  }
}
