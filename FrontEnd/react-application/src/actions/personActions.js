import axios from "axios";
import { GET_ERRORS, GET_PERSONS, GET_PERSON } from "./types";

//Register Information 
// export const createPerson = (person, history) => async dispatch => {
//   try {
//     const res = await axios.post("http://localhost:8080/api/person", person);

//     history.push("/dashboard");
//   } catch (err) {
//     dispatch({
//       type: GET_ERRORS,
//       payload: err.response.data
//     });
//   }
// };

//Get All Information 
// export const getPersons = () => async dispatch => {
//   const res = await axios.get("/api/person/all");
//   dispatch({
//     type: GET_PERSONS,
//     payload: res.data
//   });
// };

//Get the User Information 
export const getPerson = (id, history) => async dispatch => {
  try {
    const res = await axios.get(`http://cloudcomputinga1loginmicroservice-env.eba-p8kd6tvw.us-east-1.elasticbeanstalk.com/api/users/getUsers/${id}`);

    //Getting the user information  
    const { role } = res.data;
    localStorage.setItem("urole", role);
    history.push("/dashboard");
    dispatch({
      type: GET_PERSON,
      payload: res.data,
    });
  } catch (error) {
    history.push("/dashboard");
  }
};

//Add Items
export const createNewItem = (newItem, history) => async dispatch => {
  try {
    
    await axios.post(`http://cloudcomputinga1itemmicroservice-env.eba-btrpvvm3.us-east-1.elasticbeanstalk.com/api/items/addItem`, newItem);

    history.push("/dashboard");
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });


    console.log(err);
  }
};

