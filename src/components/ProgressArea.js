import React from 'react';

const ProgressArea = ({selected,player,progress,cuTime,maxTime}) =>{

	return(
	    <div className="progress-area"> 
	    	{
	    		selected && (
	    			<>
				      <div className="progress-bar" ref={progress}>
				        <audio ref={player} id="main-audio" src={`../audio/${selected?.src}.mp3`}></audio>
				      </div>
				      <div className="song-timer">
				        <span className="current-time" ref={cuTime}>0:00</span>
				        <span className="max-duration" ref={maxTime}>0:00</span>
				      </div>
				    </>  
	    			)
	    	}
	    </div>
		)
}

export default ProgressArea;