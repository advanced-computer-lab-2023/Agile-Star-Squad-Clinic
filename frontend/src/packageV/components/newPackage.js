import React from "react";

import Card from "../../shared/components/Card/Card";

const inputHandler = (event) => {
  console.log("done");
};
const NewPackage = () => {
  return (
    <Card>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">
          Name:
        </label>
        <input
          type="email"
          class="form-control"
          id="pname"
          placeholder="Enter a Name"
          required
        />
      </div>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">
          Price Per Year:
        </label>
        <input
          type="email"
          class="form-control"
          id="pprice"
          placeholder="Enter a Price"
          required
        />
      </div>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">
          Doctor Session Discount:
        </label>
        <input
          type="email"
          class="form-control"
          id="pdocdisc"
          placeholder="Enter a Discount Number"
          required
        />
      </div>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">
          Medicine Discount:
        </label>
        <input
          type="number"
          class="form-control"
          id="pmeddisc"
          placeholder="Enter a Discount Number"
          required
        />
      </div>
      <div class="mb-3">
        <label for="exampleFormControlTextarea1" class="form-label">
          Description:
        </label>
        <textarea
          class="form-control"
          id="pdesc"
          rows="3"
        ></textarea>
      </div>
      <button class="btn btn-primary sm" id="subbutton">Submit</button>

    </Card>
  );
};

export default NewPackage;
