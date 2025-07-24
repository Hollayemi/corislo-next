// api.js
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const instance = axios.create({
  baseURL: "https://api.example.com",
});

const mock = new MockAdapter(instance);

export default mock;
