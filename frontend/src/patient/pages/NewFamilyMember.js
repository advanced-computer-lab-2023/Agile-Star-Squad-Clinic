import React, { useState } from "react";
import Card from "../../shared/components/Card/Card";

const NewFamilyMember = () => {
  const [familyMember, setFamilyMember] = useState({
    name: "",
    NationalID: "",
    age: "",
    gender: "",
    relation: "",
  });

  const inputHandler = (event) => {
    const { name, value } = event.target;
    setFamilyMember((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify(familyMember), // Use the data entered in the form
    };

    fetch("http://localhost:3000/6526e47b30ab6b420edcd716/familyMembers", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        // Handle the response, e.g., show a success message
        console.log("Family member added:", data);
      })
      .catch((error) => {
        // Handle errors, e.g., show an error message
        console.error("Error adding family member:", error);
      });
  };

  return (
    <Card>
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="pname" className="form-label">
            Name:
          </label>
          <input
            type="text" // Use "text" type for name
            className="form-control"
            id="pname"
            name="name" // Set the name attribute to match the state property
            placeholder="Enter a Name"
            required
            onChange={inputHandler}
          />
        </div>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">
          NationalID:
        </label>
        <input
          type="number"
          class="form-control"
          id="pprice"
          placeholder="Enter a Price"
          required
        />
      </div>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">
          Age:
        </label>
        <input
          type="number"
          class="form-control"
          id="pdocdisc"
          placeholder="Enter a Discount Number"
          required
        />
      </div>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">
          Gender:
        </label>
        <input
          type="string"
          class="form-control"
          id="pmeddisc"
          placeholder="Male or Female"
          required
        />
      </div>
      <div class="mb-3">
        <label for="exampleFormControlTextarea1" class="form-label">
          Relation:
        </label>
        <textarea
          class="form-control"
          id="pdesc"
          placeholder="Husband/Wife/Children"
          rows="3"
        ></textarea>
      </div>
        <button type="submit" className="btn btn-primary sm" id="subbutton">
          Submit
        </button>
      </form>
    </Card>
  );
};

export default NewFamilyMember;
