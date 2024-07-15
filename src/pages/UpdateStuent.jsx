import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import lab from "../assets/lab.jpg";
import Nav from "../components/Nav";
import Loading from "../Loading";
import { url } from "../Url";
import { useLocation, useParams } from "react-router-dom";
const UpdateStudent = () => {
  const id = useParams().id;
  console.log(id);
  const [image, imageSet] = useState();
  let [inputs, setInputs] = useState({
    name: "",
    phone: "",
    birth: "",
    location: "",
    attendance: "",
  });
  const [loading, setLoading] = useState(false);
  //getting inputs content in our object dynamically and send it to check function
  function handleInputs(e) {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  }

  async function showStudentDetails() {
    const res = await axios.get(`${url()}students/ ${id}`);
    const data = res.data.data;
    setInputs({
      ...inputs,
      name: data.name,
      location: data.location,
      birth: data.birthday,
      phone: data.phone_number,
      attendance: data.attendance,
    });
    imageSet(`${url()}images/${data.image}`);
  }
  useEffect(() => {
    showStudentDetails();
  }, []);
  const addedSuccesfullyNotify = () =>
    toast.success("Student Updated Succesfully ");
  const emptyNotify = () => toast.error("Please fill all information");
  const TenNotify = () => toast.error("Phone must be ten numbers ");
  async function updateStudent(e) {
    e.preventDefault();
    if (
      !(
        inputs.name !== "" &&
        inputs.birth !== "" &&
        inputs.phone !== "" &&
        inputs.location !== "" &&
        inputs.attendance !== "" &&
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
      formData.append("attendance", inputs.attendance);
      setLoading(true);
      const res = await axios.post(
        "http://127.0.0.1:8000/api/v1/students",
        formData
      );
      if (res.status === 200) {
        addedSuccesfullyNotify();
        setLoading(false);
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
                value={inputs.name}
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Student Phone Number"
                value={inputs.phone}
                onChange={handleInputs}
                required
              />
              <input
                type="date"
                name="birth"
                placeholder="Student birthday"
                value={inputs.birth}
                onChange={handleInputs}
                required
              />
              <input
                type="text"
                name="location"
                placeholder="Student location"
                onChange={handleInputs}
                value={inputs.location}
                required
              />{" "}
              <input
                type="text"
                name="attendance"
                placeholder="Student attendance"
                onChange={handleInputs}
                value={inputs.attendance}
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
                  updateStudent(e);
                }}
              >
                Update Student
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

export default UpdateStudent;
