import React, { useState } from 'react'

const UserPage = () => {

  const [inputs, setInputs] = useState([])

  const handleChange = (event) => {
    event.preventDefault()
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))
    console.log(value)
  }

  const handleSubmit = () => {

    const createPatient = async () => {
      const res = await fetch('http://localhost:8777/u/addnewuser',
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(inputs)
        })
      const data = await res.json()
      console.log(JSON.stringify(inputs));
    }
    createPatient()
    window.location.reload(false);
  }

  return (
    <>
      <form className='add-form' onSubmit={handleSubmit}>
        <div className="container">
          <div className="form-control">
            <label>Enter reference number:
              <input type="number" name="referencenumber" value={inputs.referencenumber || ""}
                onChange={handleChange} />
            </label><br />
            <label>Enter patient Card Id:
              <input type="text" name="cardid" value={inputs.cardid || ""}
                onChange={handleChange} />
            </label><br />
            <label>Enter patient Fullname:
              <input type="text" name="fullname" value={inputs.fullname || ""}
                onChange={handleChange} />
            </label><br />
            <label>Enter age:
              <input type="number" name="age" value={inputs.age || ""}
                onChange={handleChange} />
            </label><br />
            <label>Enter address:
              <input type="text" name="address" value={inputs.address || ""}
                onChange={handleChange} />
            </label><br />
            <label>Enter role:
              <input type="text" name="role" value={inputs.role || ""}
                onChange={handleChange} />
            </label><br />
            <input type="submit" value="Save info" className='btn btn-success' />
          </div>
        </div>
      </form><br/>
    </>
  )
}

export default UserPage 