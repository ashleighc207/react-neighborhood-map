import axios from "axios";

const yelp = axios.create({
  baseURL: "https://api.foursquare.com/v2",
  timeout: 1000
});

export default yelp;
