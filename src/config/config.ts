import { IConfig } from "../types/interfaces";

const config:IConfig = {
  maps_api_key: process.env.PUBLIC_GOOGLE_MAPS_API_KEY || "AIzaSyDI5a-MwAAsb3YznjbqZKakoWn2Rp_z28g",
  maps_api_id: process.env.PUBLIC_GOOGLE_MAPS_API_ID || "amiable-venture-313007",
  coordinates: { lat: 34.101244, lng: -118.343684 },
  address: process.env.ADDRESS || "7060 Hollywood Blvd, Los Angeles, CA",
  baseUrl: process.env.BASE_URL || "http://quest-registration-api.groupbwt.com/api",
  textForSharing: process.env.TEXT_FOR_SHARING || "Check out this Meetup with SoCal!",
  gmail_url: process.env.GMAIL_URL || "https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=&su=Check out this Meetup with SoCal!&ui=2&tf=1&pli=1"
};

export default config;