import React from 'react'

function Tile({track}) {
    console.log(track)
    return (
    <div>
        <h4>New Track</h4>
        <audio src={track}></audio>
        
    </div>
  )
}

export default Tile