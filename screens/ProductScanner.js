import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  askAsync as askPermissionsAsync,
  CAMERA as CameraPermissions,
} from "expo-permissions";
import { Camera } from "expo-camera";
import { getFirestore } from "../firebaseHelpers";
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
import buyItemDialog from "../scripts/userDialogs";

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
    await buyItemDialog(
      this.state.dbh,
      data,
      () => this.setState({ hasScanned: false }),
      () => this.setState({ hasScanned: false }),
      () => this.setState({ hasScanned: false }),
      () => this.setState({ hasScanned: false })
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
