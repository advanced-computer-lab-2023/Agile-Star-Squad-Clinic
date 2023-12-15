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
import { Link } from 'react-router-dom';

const Meeting = () => {
  const userCtx = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(true);
  const [meetingId, setMeetingId] = useState(null);
  const [name, setName] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const meetingResult = await axios.get('http://localhost:3000/meeting', {
        withCredentials: true,
      });
      setMeetingId(meetingResult.data.data.meeting.meetingId);
    } catch (error) {
      const meetingId = await createMeeting({ token: authToken });
      await axios.post(
        'http://localhost:3000/meeting',
        { meetingId },
        { withCredentials: true },
      );
      setMeetingId(meetingId);
    }

    try {
      const nameResult = await axios.get(
        `http://localhost:3000/${userCtx.role}s/${userCtx.userId}`,
        {
          withCredentials: true,
        },
      );
      setName(nameResult.data.data.patient.name);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (meetingId && name) {
      setIsLoading(false);
    }
  }, [meetingId, name]);

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

  return isLoading ? (
    <div>Loading</div>
  ) : (
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
  );
};

export default Meeting;

const MeetingView = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const initialized = useRef(false);
  const { join } = useMeeting();
  const { participants } = useMeeting({
    onMeetingJoined: () => {
      setIsLoading(false);
    },
    onMeetingLeft: () => {
      props.onMeetingLeave();
    },
  });

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      joinMeeting();
    }
  }, []);

  const joinMeeting = () => {
    setTimeout(() => {
      join();
    }, 100);
  };

  return isLoading ? (
    <div>Loading</div>
  ) : (
    <div>
      <Controls />
      {[...participants.keys()].map((participantId) => (
        <ParticipantView participantId={participantId} key={participantId} />
      ))}
    </div>
  );
};

function Controls() {
  const { leave, toggleMic, toggleWebcam } = useMeeting();

  return (
    <div>
      <Link to="/">
        <button onClick={() => leave()}>Leave</button>
      </Link>
      <button onClick={() => toggleMic()}>toggleMic</button>
      <button onClick={() => toggleWebcam()}>toggleWebcam</button>
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
