import React, {useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom';
import Chapters from '../Chapters.jsx/Chapters';
import Lectures from './Lectures'

const Chemistry = (props) => {
  
  const {batch} = props;
  const [lectures, setLectures] = useState([]);
  const [chapters, setChapters] = useState(()=>new Set());
  const [chapterArr, setChapterArr] = useState([]);
  const location = useLocation();
  console.log(location.state)

  useEffect(()=>{
    const fetchVideos = async()=>{
      try{
        
          const subject = "Chemistry";
          const batch = JSON.parse(localStorage.getItem('data')).result.batch;
          const category = location.state.courseCategory;

          fetch(`http://localhost:5000/api/fetchVideos/view-video`, {
            method:'post',
            body:JSON.stringify({subject, batch, category}),
            headers:{
              'Content-Type':'application/json'
            }
          }).then((response)=>{
            response.json().then(
              (lectureArr)=>{
                lectureArr.forEach(element => {
                  if(!chapters.has(element.chapter)){
                    setChapters(prev => new Set(prev).add(element.chapter));
                    chapters.add(element.chapter);
                    console.log(chapters)
                  }
                });

                setLectures([...lectureArr])
                setChapterArr([...chapters].sort((a,b)=>{
                  console.log(a)
                  if(parseInt(a)<parseInt(b)){
                    return -1;
                  }else{
                    return 1;
                  }
                }));
              }
            )
          })
          .catch((err)=>{
            console.log("Error is ",err)
          })
          
          console.log(lectures)

          if(lectures.length===0){
            setLectures([{
              subject:"Chemistry",
              batch:batch,
              title:"No Videos Uploaded",
              pic:"../../../images/user.png"
            }]);
          }
        }catch(err){

        }
      
    }

    fetchVideos();
  }, []);
  
  return (
    <main className='pt-32 lg:grid lg:grid-cols-3 lg:grid-row-3'>
    {
      chapterArr.map((item, index)=>(
        <Chapters key={index} lectures = {lectures} chapter={item} subject={"Chemistry"}/>
      ))
    }
    </main>
  )
}

export default Chemistry