import env from "./.environment";

const authConfig = {
  iosClientId: env.GOOGLE_CREDENTIALS_IOS_CLIENT_ID,
  androidClientId: env.GOOGLE_CREDENTIALS_ANDROID_CLIENT_ID,
  iosStandaloneAppClientId: undefined,
  androidStandaloneAppClientId: undefined,
  scopes: ["profile", "email"],
};

export default authConfig;
