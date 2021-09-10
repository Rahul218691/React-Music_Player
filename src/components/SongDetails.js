import React from 'react';

const SongDetails = ({selected}) => {
	return(
			<>
				{
					selected && (
						    <div className="song-details">
						      <p className="name">{selected.name}</p>
						      <p className="artist">{selected.artist}</p>
						    </div>
						)
				}
			</>	

		)
}

export default SongDetails;