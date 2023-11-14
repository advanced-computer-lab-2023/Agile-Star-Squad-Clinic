import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import Card from '../../shared/components/Card/Card';

const UpdatePackage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState('');
  const [pricePerYear, setPricePerYear] = useState('');
  const [doctorSessionDiscount, setDoctorSessionDiscount] = useState('');
  const [medicineDiscount, setMedicineDiscount] = useState('');
  const [familyMemberDiscount, setFamilyMemberDiscount] = useState('');
  const [description, setDescription] = useState('');

  
  useEffect(() => {
   
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/packages/${id}`
        ); 
        if (response.ok) {
          const data = await response.json();
          const {
            name,
            pricePerYear,
            doctorSessionDiscount,
            medicineDiscount,
            familyMemberDiscount,
            description,
          } = data.data.package; 
         
          
          setName(name);
          setPricePerYear(pricePerYear);
          setDoctorSessionDiscount(doctorSessionDiscount);
          setMedicineDiscount(medicineDiscount);
          setFamilyMemberDiscount(familyMemberDiscount);
          setDescription(description);
        } else {
          alert('Failed to fetch package data.');
        }
      } catch (error) {
       
        alert('Network error: ' + error.message);
      }
    };

    fetchData();
  }, [id]);

  const submitHandler = async (event) => {
    event.preventDefault(); 
    const data = {
      name,
      pricePerYear,
      doctorSessionDiscount,
      medicineDiscount,
      familyMemberDiscount,
      description,
    };

    try {
      const response = await fetch(
        `http://localhost:3000/packages/${id}`,
        
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        // Handle a successful response
        alert('Package updated successfully.');
        navigate('/packages');
      } else {
        // Handle errors if the server response is not ok
        alert('Failed to update data.');
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
            type="text"
            class="form-control"
            placeholder="Enter a Name"
            defaultValue={'Habiba'}
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

export default UpdatePackage;
