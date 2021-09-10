import React,{useRef} from 'react';

const MusicList = ({list,show,handleHide,index,listAudioSelect}) =>{

  const liaudRef = useRef();
  const durRef = useRef();


	return(
    <div className={`${show ? 'music-list show' : 'music-list'}`}>
      <div className="header">
        <div className="row">
          <i className= "list material-icons">queue_music</i>
          <span>Music list</span>
        </div>
        <i id="close" className="material-icons" onClick={handleHide}>close</i>
      </div>
      <ul>
        {
          list.map((music,i) =>(
            <li key={i} onClick={()=>listAudioSelect(i)}>
              <div className="row">
                <span>{music.name}</span>
                <p>{music.artist}</p>
              </div>
              <span ref={durRef} className="audio-duration">{i === index ? 'playing':''}</span>
              <audio ref={liaudRef} className={music.src} src={`../audio/${music.src}.mp3`}></audio>
            </li>
          ))
        }
      </ul>
    </div>
		)
}

export default MusicList;