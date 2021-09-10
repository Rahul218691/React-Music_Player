import React,{useEffect,useState,useRef} from 'react';
import TopBar from './components/TopBar';
import MusicImage from './components/MusicImage';
import SongDetails from './components/SongDetails';
import ProgressArea from './components/ProgressArea';
import Controls from './components/Controls';
import MusicList from './components/MusicList';
import {allMusic} from './utils/music.js';

const App = () =>{

  const audioRef = useRef();
  const progressRef = useRef();
  const curTimeRef = useRef();
  const maxTimeRef = useRef();
  const shuffleRef = useRef();
  const [list,setList] = useState([]);
  const [show,setShow] = useState(false);
  const [selected,setSelected] = useState('');
  const [index,setIndex] = useState(0);
  const [play,setPlay] = useState(false);

  useEffect(()=>{
    setList(allMusic);
    return () => setList([]);
  },[]);

  useEffect(()=>{
    setSelected(list[index]);
  },[list,index]);

  const handleHide = () =>setShow(false);

  const handleShow = () =>setShow(true);

  const playAudio = () =>{
    setPlay(true);
    audioRef.current.play();
  }

  const pauseAudio = () =>{
    setPlay(false);
    audioRef.current.pause()
  }

  const nextAudio = () =>{
    if(index !== list.length - 1){
      pauseAudio();
      setIndex(index + 1);
      progressRef.current.style.width = `0%`;
    }
  }

  const prevAudio = () =>{
    if(index !== 0){
      pauseAudio();
      setIndex(index - 1);
      progressRef.current.style.width = `0%`;
    }
  }  

  const listAudioSelect = (i) =>{
    pauseAudio()
    setIndex(i);
    progressRef.current.style.width = `0%`;
  }

  const audioRepeat = () =>{
    let getText = shuffleRef.current.innerText;
    switch (getText) {
      case "repeat":
        shuffleRef.current.innerText = "repeat_one";
        shuffleRef.current.setAttribute('title',"Song looped");
        break;
      case "repeat_one":
        shuffleRef.current.innerText = "shuffle";
        shuffleRef.current.setAttribute('title',"Playback shuffled");
        break;
      case "shuffle":
        shuffleRef.current.innerText = "repeat";
        shuffleRef.current.setAttribute('title',"Playlist looped");
        break; 
      default:
        break;       
    }
  }

  useEffect(()=>{
    if(audioRef.current){
      maxTimeRef.current.innerText='0:00';
      audioRef.current.addEventListener('timeupdate',(e)=>{
        const currentTime = e.target.currentTime;
        const duration = e.target.duration;
        let progressWidth = (currentTime / duration) * 100;
        progressRef.current.style.width = `${progressWidth}%`;
          let mainAdDuration = audioRef.current.duration;
          let totalMin = Math.floor(mainAdDuration / 60);
          let totalSec = Math.floor(mainAdDuration % 60);
          if(totalSec < 10){
            totalSec = `0${totalSec}`;
          }
          maxTimeRef.current.innerText = `${totalMin}:${totalSec}`;
         let currentMin = Math.floor(currentTime / 60);
         let currentSec = Math.floor(currentTime % 60);
         if(currentSec < 10){
           currentSec = `0${currentSec}`;
         }
         curTimeRef.current.innerText = `${currentMin}:${currentSec}`;
      });
    }
  });


  useEffect(()=>{
      if(audioRef.current){
        audioRef.current.addEventListener('ended',()=>{
          let getText = shuffleRef.innerText;
          switch (getText) {
            case "repeat":
              nextAudio();
              break;
            case "repeat_one":
              audioRef.current.currentTime = 0;
              setIndex(index);
              break;
            case "shuffle":
              let randIndex = Math.floor((Math.random() * list.length) + 1);
              do{
                  randIndex = Math.floor((Math.random() * list.length) + 1);
              }while (index === randIndex)
              break;
            default:
              break;
          }
        })
      }
  })



  return (
    <div className="wrapper">
      <TopBar />
      <MusicImage selected={selected}
      />
      <SongDetails selected={selected}
      />
      <ProgressArea selected={selected}
      player={audioRef}
      progress={progressRef}
      cuTime={curTimeRef}
      maxTime={maxTimeRef}
      />
      <Controls handleShow={handleShow} play={play}
      playAudio={playAudio}
      pauseAudio={pauseAudio}
      nextAudio={nextAudio}
      prevAudio={prevAudio}
      shuffleRef={shuffleRef}
      audioRepeat={audioRepeat}
      />
      <MusicList show={show} list={list} handleHide={handleHide}
      index={index}
      listAudioSelect={listAudioSelect}/>
    </div>
  );
}

export default App;
