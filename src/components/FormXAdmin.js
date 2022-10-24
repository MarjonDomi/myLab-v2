import { useState } from "react";
import { useRef } from "react";
import UserPage from "./UserPage";
// import axios from "axios"


const FormXAdmin = () => {
  const [inputs, setInputs] = useState({});
  const [analysistype, setAnalysisType] = useState([])
  const [info, setInfo] = useState([])

  const handleChange = (event) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    // setInputs(value)
    setInputs(values => ({ ...values, [name]: value }))
  }

  //GET Analysis Type
  const getAnalysisType = async () => {
    console.log(inputs.analysis_type)
    const res = await fetch(`http://localhost:8777/t/componentsList/` + inputs.analysis_type,
      {
        method: 'GET',
      }
    )
    const data = await res.json()
    console.log("analysis type =>", data)
    setInfo(data)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    getAnalysisType()
  }
  
  const addComponentResults = async () =>{
    const resp = await fetch(`http://localhost:8777/addnewanalysisresult`,
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(inputs)
    })
      ({
        // "analysis_id": 0,
        "analysis_res": {
          // "analysistype_id": 0,
          "componentList": [
            {
              "component_id": inputs.component_id,
              "component_name": inputs.component_name,
              "component_norma": inputs.component_name
            }
          ],
          "description": inputs.description
        },
        "result_values": inputs.result_values,
        "user": {
          "address": inputs.address,
          "age": inputs.age,
          "cardid": inputs.cardid,
          "fullname": inputs.fullname,
          // "id": 0,
          "referencenumber": inputs.referencenumber,
          "roles": inputs.role
        }
    })
      const data2 = await resp.json()
      console.log("analysis type =>", data2)
    }
   
  //   )
  // }

  const addresult =()=>{
    addComponentResults()
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
            <label> Type of Analysis:
              <input
                type="text"
                name="analysis_type"
                value={inputs.analysistype}
                onChange={handleChange}
              />
            </label>
            <input type="submit" value="OK" className='btn btn-success' />
          </div>           
           <br/>
          <div className="form">
          <div className="row">
            <table id='table' className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th> Component Name</th>
                  <th> Result Value</th>
                  <th> Components Values</th>
                </tr>
              </thead>
              <tbody>
                {info.map((item) => 
                  <tr key={item.id_component}>
                    <td> {item.component_name} </td>
                    <td>{<input type="text" name="results"/>}</td>
                    <td>{item.norma}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <input type="submit" value="Add results" className='btn btn-success' onClick={addresult}/>
          </div>
        </div>
      </form>
    </>
  )
}

export default FormXAdmin