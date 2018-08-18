import axios from "axios";

//const URL = `http://localhost:4000`;
const URL = `http://farmbazaar.co.in:8072`;

export const postMenu = (menu, callback) => {
  // console.log("Inside the method", menu);
  axios
    .post(`${URL}/postMenu`, menu)
    .then(response => callback())
    .catch(err => console.log(err));
};
