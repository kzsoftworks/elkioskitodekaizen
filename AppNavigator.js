import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import ProductScanner from "./screens/ProductScanner";
import Profile from "./screens/Profile";
import SignIn from "./screens/SignIn";
import Home from "./screens/Home";
import ChooseProduct from "./screens/ChooseProduct";

const AppNavigator = createStackNavigator(
  {
    SignIn: { screen: SignIn },
    ProductScanner: { screen: ProductScanner },
    Profile: { screen: Profile },
    Home: { screen: Home },
    ChooseProduct: { screen: ChooseProduct },
  },
  {
    headerMode: "none",
  }
);

export default createAppContainer(AppNavigator);
