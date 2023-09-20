import './App.css';
 import React, {useState } from 'react'
import Navbar from './components/Navbar';
import News  from './components/News';
import 
{Routes ,
   Route
  } from "react-router-dom"
  import LoadingBar from 'react-top-loading-bar'
 
  const App = (props)=> {
  const pageSize =9;
  const apiKey=process.env.REACT_APP_NEWS_API
  // state = {
  //   progress:0
  // }

  const[progress, setProgress] = useState(0)
  // setProgress=(progress)=>{
  //   setState({progress: progress})
  // }
     return (
       <div>
         <LoadingBar
        color='#f11946'
        progress={progress}
       height={1}
      />
         <Navbar />
     
         <Routes>
         <Route exact path='/' element={  <News apiKey={apiKey}  setProgress={setProgress} key={"general"}  pageSize={pageSize} country="in" category="general" />  }></Route>
         <Route exact path='/business' element={  <News apiKey={apiKey} setProgress={setProgress} key={"business"}  pageSize={pageSize} country="in" category="business" />  }></Route>
         <Route exact path='/entertainment' element={  <News apiKey={apiKey} setProgress={setProgress} key={"entertainment"}  pageSize={pageSize} country="in" category="entertainment" />  }></Route>
         <Route exact path='/general' element={  <News apiKey={apiKey} setProgress={setProgress} key={"general"}  pageSize={pageSize} country="in" category="general" />  }></Route>
         <Route exact path='/health' element={  <News apiKey={apiKey} setProgress={setProgress} key={"health"}  pageSize={pageSize} country="in" category="health" />  }></Route>
         <Route exact path='/science' element={  <News apiKey={apiKey} setProgress={setProgress}  key={"science"} pageSize={pageSize} country="in" category="science" />  }></Route>
         <Route exact path='/sports' element={  <News apiKey={apiKey} setProgress={setProgress} key={"sports"}  pageSize={pageSize} country="in" category="sports" />  }></Route>
         <Route exact path='/technology' element={  <News apiKey={apiKey} setProgress={setProgress} key={"technology"}  pageSize={pageSize} country="in" category="technology" />  }></Route>
        
         </Routes>
       </div>
     )
 }
  export default App