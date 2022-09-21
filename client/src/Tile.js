import React from 'react'

function Tile({track}) {
    console.log(`http://localhost:3000${track.audio_data}`)
    return (
    <div>
        <h4>New Track</h4>
        <audio src={`http://localhost:3000${track.audio_data}`} controls="controls"></audio>
        
    </div>
  )
}

export default Tile