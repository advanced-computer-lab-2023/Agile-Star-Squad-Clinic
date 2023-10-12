import React, { Component } from "react";

class AddFamilyMember extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      NationalID: "",
      age: "",
      gender: "",
      relation: "",
    };
  }

  handleNameChange = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  handleNationalIDChange = (event) => {
    this.setState({
      NationalID: event.target.value,
    });
  };

  handleAgeChange = (event) => {
    this.setState({
      age: event.target.value,
    });
  };

  handleGenderChange = (event) => {
    this.setState({
      gender: event.target.value,
    });
  };

  handleRelationChange = (event) => {
    this.setState({
      relation: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify(this.state),
    };
    fetch("http://localhost:3000/patients/6521b46c8e7a4831ac7e6dce/addFamilyMember", requestOptions)
      .then((response) => response.json())
      .then((data) => {
       
      })
      .catch((error) => {
        
      });
  };

  render() {
    const { name, NationalID, age, gender, relation } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" value={name} onChange={this.handleNameChange} />
        </div>
        <div>
          <label>National ID</label>
          <input type="text" value={NationalID} onChange={this.handleNationalIDChange} />
        </div>
        <div>
          <label>Age</label>
          <input type="number" value={age} onChange={this.handleAgeChange} />
        </div>
        <div>
          <label>Gender</label>
          <input type="text" value={gender} onChange={this.handleGenderChange} />
        </div>
        <div>
          <label>Relation</label>
          <input type="text" value={relation} onChange={this.handleRelationChange} />
        </div>
        <button type="submit">Add Family Member</button>
      </form>
    );
  }
}

export default AddFamilyMember;
