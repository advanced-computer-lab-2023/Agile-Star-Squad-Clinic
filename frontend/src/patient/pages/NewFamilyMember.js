import React from "react";

import Card from "../../shared/components/Card/Card";

const inputHandler = (event) => {
  console.log("done");
};
const NewFamilyMember = () => {
  return (
    <Card>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">
          Name:
        </label>
        <input
          type="string"
          class="form-control"
          id="pname"
          placeholder="Enter a Name"
          required
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
      <button class="btn btn-primary sm" id="subbutton">Submit</button>

    </Card>
  );
};

export default NewFamilyMember;
