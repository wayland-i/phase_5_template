import './stylesheets/App.css';
import MicRecorder from 'mic-recorder-to-mp3';
import { useState, useEffect } from 'react';
import Container from './Container';

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

function App() {

  const [audioData, setAudioData] = useState(null)
  const [allTracks, setAllTracks] = useState([])

  // state for first track
  const [trackOne, setTrackOne] = useState(
    {
      isRecording: false,
      blobURL: '',
      isBlocked: false,
    })

  // one time check for mic permissions
  useEffect(() => {
    navigator.getUserMedia({ audio: true },
      () => {
        console.log('Permission Granted');
        setTrackOne({ isBlocked: false });
      },
      () => {
        console.log('Permission Denied');
        setTrackOne({ isBlocked: true })
      },
    );
  
  }, [])

    
  // Starting first track
  const startOne = (e) => {
    if (trackOne.isBlocked) {
      console.log('Permission Denied');
    } else {
      Mp3Recorder
        .start()
        .then(() => {
          setTrackOne({ isRecording: true });
          
        }).catch((e) => console.error(e));
    }
  };
  
  console.log(trackOne.blobURL)
  
  // Stopping first track, creating an object url (necessary?), state updated
  const stopOne = () => {
    Mp3Recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const file = new File(buffer, 'track-one.mp3', {
          type: blob.type
        })
        console.log(blob)
        setAudioData(file)
        const blobURL = URL.createObjectURL(blob)
        setTrackOne({ blobURL, isRecording: false });
      }).catch((e) => console.log(e));
    
    }

    console.log(audioData)

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const formData = new FormData()
    formData.append('audio_data', audioData)


    fetch('/tracks', {
      method: 'POST',
      body: formData
    })
    console.log(formData, "posted to backend")
  }

useEffect(() => {
  fetch('/tracks')
    .then(r => r.json())
    .then(data => console.log(data))
}, [audioData])



if (navigator.getUserMedia) {
  console.log('getUserMedia supported.');
  // navigator.getUserMedia(
  //   // constraints - only audio needed for this app
  //   {
  //     audio: true,
  //   },

  //   // Success callback
  //   (stream) => {
  //     const mediaRecorder = new MediaRecorder(stream);

  //     const myStream = mediaRecorder.stream;
  //     console.log(myStream);
  //   }
  // );
}


  return (
    <div className="App">
      
      
      
      <h1>Track 1</h1>
      <button onClick={startOne} disabled={trackOne.isRecording}>
        Record
      </button>

      <button onClick={stopOne} disabled={!trackOne.isRecording}>
        Stop
      </button>

      <audio src={trackOne.blobURL} controls="controls" />

      <br></br><br></br><br></br><br></br><br></br><br></br>

      {/* { <audio src={URL.createObjectURL(audioData)} controls="controls" />} */}

      <form onSubmit={handleSubmit}>
        <button type='submit'> submit this audio to the database</button>
      </form>

      <Container allTracks={allTracks}/>
      
      
    </div>
  );
}

export default App;
