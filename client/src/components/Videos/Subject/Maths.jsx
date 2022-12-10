import React, {useState, useEffect} from 'react'
import Lectures from './Lectures'

const Maths = (props) => {
  const {batch} = props;
  const [lectures, setLectures] = useState([]);
  

  useEffect(()=>{
    const fetchVideos = async()=>{

      let result = await fetch(`http://localhost:5000/api/fetchVideos/${batch}/Maths`, {
        method:'get',
        headers:{
          'Content-Type':'application/json'
        }
      })
  
      result = await result.json();
      console.log(result)
      setLectures([...result]);
      console.log("result",result)
      console.log("lectures",lectures)

      if(lectures.length===0 && result.length===0){
        setLectures([{
          subject:"Maths",
          batch:batch,
          title:"No Videos Uploaded",
          pic:"../../../images/user.png"
        }]);
      }
    }
    fetchVideos();
  }, []);

  return (
    <main className='py-32 flex flex-col lg:grid-cols-3 lg:grid-rows-3 lg:mx-4 lg:grid gap-4 justify-center items-center'>
    {
      lectures.map((item, index)=>(
        <Lectures key={index} subject="Physics" link = {item.vidurl} title={item.title} pic={item.pic} batch = {batch}/>
      ))
    }
    </main>
  )
}

export default Maths