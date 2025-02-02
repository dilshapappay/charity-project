import React, { useState, useEffect } from "react";

import {
  createVolunteer,
  getVolunteerById,
  updateVolunteer,
} from "../services/volunteerService";
import { getCamps } from "../services/campService";
import { getUsers } from "../services/userService";
import styles from "./addVolunteer.module.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function AddVolunteerForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    
    UserId: '',
    CampId: '',
  });

  const [camps, setCamps] = useState([]);
  const [users, setUsers] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    console.log("Volunteer ID:", id);
    if (id) {
      setIsEditMode(true);
      const fetchVolunteer = async function () {
        try {
          const volunteer = await getVolunteerById(id);
          console.log("Fetched volunteer:", volunteer);
          setFormData({
            Id:id,
            UserId: volunteer.UserId,
            CampId: volunteer.CampId,
          });
        } catch (error) {
          console.error("Error fetching volunteer:", error);
        }
      };
      fetchVolunteer();
    }
  }, [id]);

  useEffect(() => {
    const fetchCamps = async function () {
      try {
        const camps = await getCamps();
        console.log("Fetched camps:", camps);
        setCamps(camps);
      } catch (error) {
        console.error("Error fetching camps:", error);
      }
    };
    fetchCamps();
  }, []);

  useEffect(() => {
    const fetchUsers = async function () {
      try {
        const users = await getUsers();
        console.log("Fetched users:", users);
        setUsers(users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {

        await updateVolunteer(formData);
        alert("Volunteer updated successfully");
      } else {
        await createVolunteer(formData);
        alert("Volunteer added successfully");
      }
      navigate("/main/volunteers");
    } catch (error) {
      console.error("Error saving volunteer:", error);
      alert("Error saving volunteer");
    }
  };
  const handleReset = () => {
    setFormData({
      UserId: "",
      CampId: "",
    });
  };

  return (
    <div className={styles.formContainer}>
      <h2>{isEditMode ? "Update Volunteer" : "Add Volunteer"}</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="UserId">Volunteer Name</label>
          <select
            name="UserId"
            value={formData.UserId}
            onChange={handleChange}
            required
          >
            <option value="">Select Volunteer</option>
            {users.map((user) => (
              <option
                key={user.Id}
                value={user.Id}
              >{`${user.FirstName} ${user.LastName}`}</option>
            ))}
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="CampId">Camp Name</label>
          <select
            name="CampId"
            value={formData.CampId}
            onChange={handleChange}
            required
          >
            <option value="">Select Camp</option>
            {camps.map((camp) => (
              <option key={camp.Id} value={camp.Id}>
                {camp.Name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.buttonGroup}>
          <button type="submit"> {isEditMode ? "Update" : "Submit"}</button>
          <button type="button" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
