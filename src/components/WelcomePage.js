import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import FormXAdmin from './FormXAdmin'
import UserPage from './UserPage'
import { useNavigate } from "react-router-dom";


const WelcomePage = () => {

  const [contactinfo, setContactInfo] = useState([])
  const [inputText, setInputText] = useState("")
  const [buttonAddPatient, setButtonAddPatient] = useState(false)
  const [buttonAnalysis, setButtonAnalysis] = useState(false)
  const navigation = useNavigate()


  const buttonhandler1 = () => {
    setButtonAddPatient(true)
  }
  const buttonhandler2 = () => {
    setButtonAnalysis(true)
  }

  const getAnalysisByCardId = async () => {
    console.log(inputText)
    const res = await fetch(`http://localhost:8777/analysisresultsbyid/` + inputText,
      {
        method: 'GET',
      })
    const data = await res.json()
    console.log("ok =>", data)
    setContactInfo(data)
    // setDescription(data.description)
    // console.log(contactinfo[0].analysis_res.description)
  }
  

  const handleSubmit = () => {
    // if(inputText !== null){
    getAnalysisByCardId()
    // }else
    // {
    //   alert("Empty value not allowed")
    // }
  }

  const handleChange = (event) => {
    const name = event.target.value;
    setInputText(name)
    // console.log("erdhi e dhena " + name)
  }
  const navigateTo = (analysis_id) => navigation('/resultview/' + analysis_id)

  // const handleClick = () =>{
  // navigateTo(contactinfo.analysis_id);

  // }

  return (
    <>
      <h1>Welcome Page</h1><br />
      <h1> THIS IS YOUR LABORATORY</h1><br />
      <input type="text" onChange={handleChange} />
      <input type="submit" value=' Search ' onClick={handleSubmit} />
      <input type='button' value=' Add patient ' onClick={buttonhandler1} />
      <input type='button' value=' Add Analysis ' onClick={buttonhandler2} />
      <br /><br />
      <div>
        <ol>
          {
            contactinfo.map((info) =>
              <li key={info.analysis_id}><a href="/">{info.analysis_res.description}</a></li>
            )}
        </ol>
      </div>
      {buttonAddPatient === true &&
        <UserPage />
      }
      {buttonAnalysis === true &&
        <FormXAdmin />
      }
       {/* {buttonclick === true &&
                    navigation("/showInfo/" + contactid)
                } */}

    </>
  )
}
export default WelcomePage
