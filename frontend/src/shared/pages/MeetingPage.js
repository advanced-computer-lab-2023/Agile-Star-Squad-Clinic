import './MeetingPage.css';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import {
  MeetingProvider,
  MeetingConsumer,
  useMeeting,
  useParticipant,
} from '@videosdk.live/react-sdk';
import { authToken, createMeeting } from '../components/Meeting/API';
import ReactPlayer from 'react-player';
import axios from 'axios';
import UserContext from '../../user-store/user-context';

function JoinScreen({ getMeetingAndToken }) {
  const [meetingId, setMeetingId] = useState(null);
  const [isGettingMeeting, setIsGettingMeeting] = useState(false);
  const onClick = async () => {
    await getMeetingAndToken(meetingId);
  };

  return (
    <div>
      {/* <input
        type="text"
        placeholder="Enter Meeting Id"
        onChange={(e) => {
          setMeetingId(e.target.value);
        }}
      />
      <button onClick={onClick}>Join</button>
      {' or '} */}
      <button onClick={onClick}>Create Meeting</button>
    </div>
  );
}

function ParticipantView(props) {
  const micRef = useRef(null);
  const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
    useParticipant(props.participantId);

  const videoStream = useMemo(() => {
    if (webcamOn && webcamStream) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(webcamStream.track);
      return mediaStream;
    }
  }, [webcamStream, webcamOn]);

  useEffect(() => {
    if (micRef.current) {
      if (micOn && micStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(micStream.track);

        micRef.current.srcObject = mediaStream;
        micRef.current
          .play()
          .catch((error) =>
            console.error('videoElem.current.play() failed', error),
          );
      } else {
        micRef.current.srcObject = null;
      }
    }
  }, [micStream, micOn]);

  return (
    <div key={props.participantId}>
      <p>
        Participant: {displayName} | Webcam: {webcamOn ? 'ON' : 'OFF'} | Mic:{' '}
        {micOn ? 'ON' : 'OFF'}
      </p>
      <audio ref={micRef} autoPlay muted={isLocal} />
      {webcamOn && (
        <ReactPlayer
          //
          playsinline // very very imp prop
          pip={false}
          light={false}
          controls={false}
          muted={true}
          playing={true}
          //
          url={videoStream}
          //
          height={'200px'}
          width={'300px'}
          onError={(err) => {
            console.log(err, 'participant video error');
          }}
        />
      )}
    </div>
  );
}

function Controls() {
  const { leave, toggleMic, toggleWebcam } = useMeeting();
  return (
    <div>
      <button onClick={() => leave()}>Leave</button>
      <button onClick={() => toggleMic()}>toggleMic</button>
      <button onClick={() => toggleWebcam()}>toggleWebcam</button>
    </div>
  );
}

function MeetingView(props) {
  const [joined, setJoined] = useState(null);
  const { join } = useMeeting();
  const { participants } = useMeeting({
    onMeetingJoined: () => {
      setJoined('JOINED');
    },
    onMeetingLeft: () => {
      props.onMeetingLeave();
    },
  });
  const joinMeeting = () => {
    setJoined('JOINING');
    join();
  };

  return (
    <div className="container">
      <h3>Meeting Id: {props.meetingId}</h3>
      {joined && joined == 'JOINED' ? (
        <div>
          <Controls />
          {[...participants.keys()].map((participantId) => (
            <ParticipantView
              participantId={participantId}
              key={participantId}
            />
          ))}
        </div>
      ) : joined && joined == 'JOINING' ? (
        <p>Joining the meeting...</p>
      ) : (
        <button onClick={joinMeeting}>Join</button>
      )}
    </div>
  );
}

function MeetingPage() {
  const [meetingId, setMeetingId] = useState(null);

  const userCtx = useContext(UserContext);

  const [name, setName] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:3000/meeting', { withCredentials: true })
      .then((res) => {
        setMeetingId(res.data.data.meeting.meetingId);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`http://localhost:3000/${userCtx.role}s/${userCtx.userId}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (userCtx.role === 'patient') setName(res.data.data.patient.name);
        else if (userCtx.role === 'doctor') setName(res.data.data.doctor.name);
      });
  }, []);

  const getMeetingAndToken = async (id) => {
    const meetingId =
      id == null ? await createMeeting({ token: authToken }) : id;
    axios.post(
      'http://localhost:3000/meeting',
      { meetingId },
      { withCredentials: true },
    );
    setMeetingId(meetingId);
  };

  const onMeetingLeave = () => {
    axios
      .delete('http://localhost:3000/meeting', { withCredentials: true })
      .then((res) => {
        setMeetingId(null);
      })
      .catch((err) => {
        console.log(err);
      });
    setMeetingId(null);
  };

  return authToken && meetingId ? (
    <MeetingProvider
      config={{
        meetingId,
        micEnabled: true,
        webcamEnabled: true,
        name,
      }}
      token={authToken}
    >
      <MeetingConsumer>
        {() => (
          <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
        )}
      </MeetingConsumer>
    </MeetingProvider>
  ) : (
    <JoinScreen getMeetingAndToken={getMeetingAndToken} />
  );
}

export default MeetingPage;
