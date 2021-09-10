import React from 'react';

const Controls = ({handleShow,play,playAudio,pauseAudio,nextAudio
,prevAudio,shuffleRef,audioRepeat}) =>{

	return(
	    <div className="controls">
	      <i id="repeat-plist" ref={shuffleRef} className="material-icons" onClick={audioRepeat} title="Playlist looped">repeat</i>
	      <i id="prev" className="material-icons" onClick={prevAudio}>skip_previous</i>
	      <div className="play-pause">
	        {
	        	play ?
	        	<i className="material-icons play" onClick={pauseAudio}>pause</i>
	        	:
	        	<i className="material-icons play" onClick={playAudio}>play_arrow</i>
	        }
	      </div>
	      <i id="next" className="material-icons" onClick={nextAudio}>skip_next</i>
	      <i id="more-music" className="material-icons" onClick={handleShow}>queue_music</i>
	    </div>
		)
}

export default Controls;