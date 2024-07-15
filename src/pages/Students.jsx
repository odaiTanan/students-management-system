import React, { useState } from "react";
import Nav from "../components/Nav";
import t from "../assets/lab.jpg";
import { Link, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { imageUrl, url } from "../Url";
import { ToastContainer, toast } from "react-toastify";
import Loading from "../Loading";
const Students = () => {
  const [students, setStudents] = useState([[]]);
  const [filteredArray, setFilteredArray] = useState([]);
  const [filtered2, setFiltered2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [search, setSearch] = useState("");

  async function getStudents() {
    setLoading(true);
    const res = await axios.get(`${url()}students`);
    setStudents([res.data.data]);
    setLoading(false);
  }
  useEffect(() => {
    getStudents();
  }, [deleted]);
  useEffect(() => {
    if (search !== "") {
      console.log(students[0]);
      const filtered = students[0].filter((value) =>
        value.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredArray(filtered);
    } else {
      setFilteredArray("");
    }
  }, [search]);

  let studentsShow =
    filteredArray.length < 1
      ? students[0].map((student, index) => {
          return (
            <div className="scard" key={index}>
              <div className="details">
                <div>
                  <h1>name </h1>
                  <p>{student.name}</p>
                </div>
                <div>
                  <h1>birth-day </h1>
                  <p>{student.birthday}</p>
                </div>
                <div>
                  <h1>phone </h1>
                  <p>{student.phone_number}</p>
                </div>
                <div>
                  <h1>location </h1>
                  <p>{student.location}</p>
                </div>
                <div>
                  <h1>attendance </h1>
                  <p>{student.attendance}</p>
                </div>
                <div className="icons">
                  <Link to={`/update/${student.id}`}>
                    <i className="fa-solid fa-pen"></i>
                  </Link>

                  <i
                    className="fa-solid fa-trash"
                    onClick={() => remove(student.id)}
                  ></i>
                </div>
              </div>
              <div className="image">
                <img src={`${imageUrl()}${student.image}`} alt="" />
              </div>
            </div>
          );
        })
      : filteredArray.map((student, index) => {
          return (
            <div className="scard" key={index}>
              <div className="details">
                <div>
                  <h1>name </h1>
                  <p>{student.name}</p>
                </div>
                <div>
                  <h1>birth-day </h1>
                  <p>{student.birthday}</p>
                </div>
                <div>
                  <h1>phone </h1>
                  <p>{student.phone_number}</p>
                </div>
                <div>
                  <h1>location </h1>
                  <p>{student.location}</p>
                </div>
                <div>
                  <h1>attendance </h1>
                  <p>{student.attendance}</p>
                </div>
                <div className="icons">
                  <Link to={`/update/${student.id}`}>
                    <i className="fa-solid fa-pen"></i>
                  </Link>

                  <i
                    className="fa-solid fa-trash"
                    onClick={() => remove(student.id)}
                  ></i>
                </div>
              </div>
              <div className="image">
                <img src={`${imageUrl()}${student.image}`} alt="" />
              </div>
            </div>
          );
        });
  const deletedSuccesfullyNotify = () =>
    toast.success("Student deleted Succesfully ");
  async function remove(id) {
    setLoading(true);
    const res = await axios.delete(`${url()}students/${id}`);
    setLoading(false);
    setDeleted(!deleted);
    deletedSuccesfullyNotify();
  }
  return (
    <div className="students-continer">
      <Nav />
      <div className="search">
        <input
          type="text"
          name="search"
          placeholder="filter by name"
          id="search"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <div>
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
      </div>
      <div className="student-cards">
        {!loading ? studentsShow : <Loading />}
      </div>{" "}
      <ToastContainer />
    </div>
  );
};

export default Students;
