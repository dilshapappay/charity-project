import React, { useState, useEffect } from 'react';
import { createRequirement, getRequirementById, updateRequirement } from '../services/requirementService';
import { getItems } from '../services/itemService';
import styles from './addRequirement.module.css';
import { getCamps } from '../services/campService';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function AddRequirementForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [requirement, setRequirement] = useState({
    ItemId: '',
    CampId: '',
    RequiredQuantity: '',
    AchievedQuantity: '',
    ImageURL: null,
  });

  const [items, setItems] = useState([]);
  const [camps, setCamps] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const fetchAllItems = async function () {
      try {
        let allItems = [];
        let page = 1;
        let hasMoreItems = true;

        while (hasMoreItems) {
          const response = await getItems(page);
          console.log(`Fetched items for page ${page}:`, response.data);
          allItems = [...allItems, ...response.data];
          hasMoreItems = response.data.length > 0;
          page++;
        }

        setItems(allItems);
      } catch (error) {
        console.error('Error fetching all items:', error);
      }
    };
    fetchAllItems();
  }, []);
  useEffect(() => {
    const fetchAllCamps = async function () {
      try {
        let allCamps = [];
        let page = 1;
        let hasMoreCamps = true;

        while (hasMoreCamps) {
          const response = await getCamps(page);
          console.log(`Fetched camps for page ${page}:`, response.data);
          allCamps = [...allCamps, ...response.data];
          hasMoreCamps = response.data.length > 0;
          page++;
        }

        setCamps(allCamps);
      } catch (error) {
        console.error('Error fetching all camps:', error);
      }
    };
    fetchAllCamps();
  }, []);

  useEffect(() => {
    console.log("Requirement ID:", id);
    if (id) {
      setIsEditMode(true);
      const fetchRequirement = async function () {
        try {
          const requirement = await getRequirementById(id);
          console.log("Fetched requirement:", requirement);
          setRequirement({
            Id: id,
            ItemId: requirement.ItemId,
            CampId: requirement.CampId,
            StatusId: requirement.StatusId,
            RequiredQuantity: requirement.RequiredQuantity,
            AchievedQuantity: requirement.AchievedQuantity,
            ImageURL: requirement.ImageURL,
          });
        } catch (error) {
          console.error("Error fetching requirement:", error);
        }
      };
      fetchRequirement();
    }
  }, [id]);

  const handleChange = (e) => {
    setRequirement({
      ...requirement,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setRequirement({
      ...requirement,
      ImageURL: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    debugger
    e.preventDefault();
    const data = new FormData();
    for (const key in requirement) {
      data.append(key, requirement[key]);
    }
    try {
      if (isEditMode) {
        await updateRequirement( data);
        alert("Requirement updated successfully");
      } else {
        await createRequirement(data);
        alert("Requirement added successfully");
      }
      navigate("/main/Requirements");
    } catch (error) {
      console.error("Error saving Requirement:", error);
      alert("Error saving Requirement");
    }
  };

  const handleReset = () => {
    setRequirement({
      ItemId: '',
      CampId: '',
      RequiredQuantity: '',
      AchievedQuantity: '',
      ImageURL: null,
    });
  };

  return (
    <div className={styles.formContainer}>
      <h2>{isEditMode ? "Update Requirement" : "Add Requirement"}</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Item </label>
          <select name="ItemId" value={requirement.ItemId} onChange={handleChange}>
            <option value="">Select Item</option>
            {items.map((item) => (
              <option key={item.Id} value={item.Id}>
                {item.Name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Camp</label>
          <select name="CampId" value={requirement.CampId} onChange={handleChange}>
            <option value="">Select Camp</option>
            {camps.map((camp) => (
              <option key={camp.Id} value={camp.Id}>
                {camp.Name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Required Quantity</label>
          <input
            type="text"
            name="RequiredQuantity"
            value={requirement.RequiredQuantity}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Achieved Quantity</label>
          <input 
            type="text"
            name="AchievedQuantity"
            value={requirement.AchievedQuantity}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Image</label>
          <input
            type="file"
            name="ImageURL"
            onChange={handleFileChange}
          />
        </div>
        <div className={styles.buttonGroup}>
          <button type="reset" onClick={handleReset}>Reset</button>
          <button type="submit"> {isEditMode ? "Update" : "Submit"}</button>
        </div>
      </form>
    </div>
  );
}