import React from 'react';


const MusicImage = ({selected}) =>{
	return(
		<>
		{
	    	selected && (
				<div className="img-area">
			      <img src={`../images/${selected.src}.jpg`} alt="" />
			    </div>
	    		)			
		}
	    </>
		)
}

export default MusicImage;