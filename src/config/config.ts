import { IConfig } from "../types/interfaces";

const config:IConfig = {
  maps_api_key: process.env.REACT_APP_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  maps_api_id: process.env.REACT_APP_PUBLIC_GOOGLE_MAPS_API_ID || "",
  coordinates: { lat: 34.101244, lng: -118.343684 },
  address: process.env.REACT_APP_ADDRESS || "",
  baseUrl: process.env.REACT_APP_BASE_URL || "",
  textForSharing: process.env.REACT_APP_TEXT_FOR_SHARING || "",
  gmail_url: process.env.REACT_APP_GMAIL_URL || ""
};

export default config;