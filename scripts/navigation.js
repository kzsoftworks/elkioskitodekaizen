import { NavigationActions } from "react-navigation";

export const navigateToScreen = function(navigation, screen) {
  return navigation.reset(
    [NavigationActions.navigate({ routeName: screen })],
    0
  );
};
