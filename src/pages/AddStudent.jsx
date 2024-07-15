import React from "react";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import lab from "../assets/lab.jpg";
import Nav from "../components/Nav";
import Loading from "../Loading";
import { useNavigate } from "react-router-dom";
const AddStudent = () => {
  const nav = useNavigate();
  const [image, imageSet] = useState();
  let [inputs, setInputs] = useState({
    name: "",
    phone: "",
    birth: "",
    location: "",
  });
  const [loading, setLoading] = useState(false);
  //getting inputs content in our object dynamically and send it to check function
  function handleInputs(e) {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  }

  const addedSuccesfullyNotify = () =>
    toast.success("Student Added Succesfully ");
  const emptyNotify = () => toast.error("Please fill all information");
  const TenNotify = () => toast.error("Phone must be ten numbers ");
  async function addStudent(e) {
    e.preventDefault();
    if (
      !(
        inputs.name !== "" &&
        inputs.birth !== "" &&
        inputs.phone !== "" &&
        inputs.location !== "" &&
        image !== ""
      )
    ) {
      emptyNotify();
    } else if (inputs.phone.length !== 10) {
      TenNotify();
    } else {
      const formData = new FormData();
      formData.append("name", inputs.name);
      formData.append("image", image);
      formData.append("phone_number", inputs.phone);
      formData.append("birthday", inputs.birth);
      formData.append("location", inputs.location);
      setLoading(true);
      const res = await axios.post(
        "http://127.0.0.1:8000/api/v1/students",
        formData
      );
      if (res.status === 200) {
        addedSuccesfullyNotify();
        setLoading(false);
        setTimeout(() => {
          nav("/show");
        }, 2000);
      }
    }
  }
  return (
    <div className="main-add">
      <Nav />
      <div className="add-continer">
        {!loading ? (
          <form action="" method="post" encType="multipart/form-data">
            <div className="image">
              <img src={lab} alt="fail" />
            </div>
            <div className="second">
              <input
                type="text"
                name="name"
                placeholder="Student Name"
                onChange={handleInputs}
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Student Phone Number"
                onChange={handleInputs}
                required
              />
              <input
                type="date"
                name="birth"
                placeholder="Student birthday"
                onChange={handleInputs}
                required
              />
              <input
                type="text"
                name="location"
                placeholder="Student location"
                onChange={handleInputs}
                required
              />{" "}
              <input
                className="input "
                type="file"
                name="image"
                id="image"
                placeholder="Enter Student Image"
                onChange={(e) => {
                  imageSet(e.target.files.item(0));
                }}
                required
              />
              <button
                type="submit"
                onClick={(e) => {
                  addStudent(e);
                }}
              >
                Add Student
              </button>
            </div>
          </form>
        ) : (
          <Loading />
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default AddStudent;
