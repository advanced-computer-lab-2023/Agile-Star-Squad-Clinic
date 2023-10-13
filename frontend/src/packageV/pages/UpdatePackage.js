import React, { useEffect, useState } from 'react';
import Card from '../../shared/components/Card/Card';

const UpdatePackage = () => {
  const [name, setName] = useState('');
  const [pricePerYear, setPricePerYear] = useState('');
  const [doctorSessionDiscount, setDoctorSessionDiscount] = useState('');
  const [medicineDiscount, setMedicineDiscount] = useState('');
  const [familyMemberDiscount, setFamilyMemberDiscount] = useState('');
  const [description, setDescription] = useState('');

  // Fetch package data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'http://localhost:3000/packages/6527157f77b75cc614f306af'
        ); // Replace {package_id} with the actual package ID.
        if (response.ok) {
          const data = await response.json();
          const {
            name,
            pricePerYear,
            doctorSessionDiscount,
            medicineDiscount,
            familyMemberDiscount,
            description,
          } = data.data.package; // Assuming the API response matches the data structure.
          console.log('Data: ', data);
          console.log('Data.data: ', data.data);
          console.log(name);



          // Set the state variables with the retrieved data
          setName(name);
          setPricePerYear(pricePerYear);
          setDoctorSessionDiscount(doctorSessionDiscount);
          setMedicineDiscount(medicineDiscount);
          setFamilyMemberDiscount(familyMemberDiscount);
          setDescription(description);
        } else {
          // Handle errors if the server response is not ok
          alert('Failed to fetch package data.');
        }
      } catch (error) {
        // Handle network errors
        alert('Network error: ' + error.message);
      }
    };

    fetchData();
  }, []);

  const submitHandler = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    // You can use the state variables to send updated data to the server
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
        // 'http://localhost:3000/packages/{package_id}',
        'http://localhost:3000/packages/6527157f77b75cc614f306af',
        {
          method: 'PATCH', // Use the appropriate HTTP method (e.g., PUT or POST) for updating data
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        // Handle a successful response
        alert('Data updated successfully.');
        // You can also redirect or perform other actions here.
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
