import React, {useState, useEffect} from 'react';
import Timer from './components/Timer/Timer'
import PacmanLoader from "react-spinners/PacmanLoader";
function App() {
  const loaderStyle = {
    position: "absolute",
    left: "40%",
    top: "30%",
    transform: "translate(-50%, -50%)"
  }
  const [loading, setLoading] = useState(false)
  useEffect(()=> {
    setLoading(true)
    setTimeout(()=> {
      setLoading(false)
    }, 4000)
  }, [])
  return (
    <>
      {loading ? 
      <div style={loaderStyle}>
      <PacmanLoader 
      color="#6bbe92" 
      loading={loading}  
      size={150}         
      /> 
      </div>
      :<Timer />}
      
    </>
  )
}
export default App;