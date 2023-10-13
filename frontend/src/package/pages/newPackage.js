import React, { useState } from 'react';

import { useNavigate } from "react-router-dom";

import Card from '../Card/Card';

const NewPackage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [pricePerYear, setPricePerYear] = useState('');
  const [doctorSessionDiscount, setDoctorSessionDiscount] = useState('');
  const [medicineDiscount, setMedicineDiscount] = useState('');
  const [familyMemberDiscount, setFamilyMemberDiscount] = useState('');
  const [description, setDescription] = useState('');

  const submitHandler = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Validate form data
    if (
      !name ||
      !pricePerYear ||
      !doctorSessionDiscount ||
      !medicineDiscount ||
      !familyMemberDiscount
    ) {
      alert('Please fill in all required fields.');
      return;
    }

    const data = {
      name,
      pricePerYear,
      doctorSessionDiscount,
      medicineDiscount,
      familyMemberDiscount,
      description,
    };

    try {
      const response = await fetch('http://localhost:3000/packages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Handle a successful response
        alert('Package Added Succesfully');

        navigate('/packages');
      } else {
        // Handle errors if the server response is not ok
        alert('Failed to send data.');
      }
    } catch (error) {
      // Handle network errors
      alert('Network error: ' + error.message);
    }
  };
  return (
    <Card>
      <form onSubmit={submitHandler}>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            Name:
          </label>
          <input
            key={'name'}
            type="text"
            class="form-control"
            placeholder="Enter a Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            Price Per Year:
          </label>
          <input
            type="number"
            class="form-control"
            placeholder="Enter a Price"
            required
            value={pricePerYear}
            onChange={(e) => setPricePerYear(e.target.value)}
          />
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            Doctor Session Discount:
          </label>
          <input
            type="number"
            class="form-control"
            placeholder="Enter a Discount Number"
            required
            value={doctorSessionDiscount}
            onChange={(e) => setDoctorSessionDiscount(e.target.value)}
          />
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            Medicine Discount:
          </label>
          <input
            type="number"
            class="form-control"
            placeholder="Enter a Discount Number"
            required
            value={medicineDiscount}
            onChange={(e) => setMedicineDiscount(e.target.value)}
          />
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            Family Member Discount:
          </label>
          <input
            type="number"
            class="form-control"
            placeholder="Enter a Discount Number"
            required
            value={familyMemberDiscount}
            onChange={(e) => setFamilyMemberDiscount(e.target.value)}
          />
        </div>
        <div class="mb-3">
          <label for="exampleFormControlTextarea1" class="form-label">
            Description:
          </label>
          <textarea
            class="form-control"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <button class="btn btn-primary sm" id="subbutton" type="submit">
          Submit
        </button>
      </form>
    </Card>
  );
};

export default NewPackage;
