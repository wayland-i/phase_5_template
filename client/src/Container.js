import React from 'react'
import Tile from './Tile'


function Container({allTracks}) {

    const fileDisplay = () => {
        return allTracks.map(track => (
            <Tile 
                key={track.id}
                track={track}
            />
        ))
    }

  return (
    <div>
        <h1>Container</h1>
        {fileDisplay()}
    </div>
  )
}

export default Container