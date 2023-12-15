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

import styles from './Meeting.module.css';

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
      if (userCtx.role === 'patient') {
        setName(nameResult.data.data.patient.name);
      } else {
        setName(nameResult.data.data.doctor.name);
      }
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
    <div>
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
            <MeetingView
              meetingId={meetingId}
              onMeetingLeave={onMeetingLeave}
            />
          )}
        </MeetingConsumer>
      </MeetingProvider>
    </div>
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
    <div style={{ display: 'flex' }}>
      {[...participants.keys()].map((participantId) => (
        <ParticipantView participantId={participantId} key={participantId} />
      ))}
      <Controls />
    </div>
  );
};

function Controls() {
  const { leave, toggleMic, toggleWebcam } = useMeeting();

  const [isMicOn, setIsMicOn] = useState(true);
  const [isWebcamOn, setIsWebcamOn] = useState(true);

  const micOn = (
    <svg
      className={styles.svg}
      xmlns="http://www.w3.org/2000/svg"
      width="56"
      height="76"
      viewBox="0 0 56 76"
      fill="none"
    >
      <path
        d="M28 48C34.64 48 39.96 42.64 39.96 36L40 12C40 5.36 34.64 0 28 0C21.36 0 16 5.36 16 12V36C16 42.64 21.36 48 28 48ZM49.2 36C49.2 48 39.04 56.4 28 56.4C16.96 56.4 6.8 48 6.8 36H0C0 49.64 10.88 60.92 24 62.88V76H32V62.88C45.12 60.96 56 49.68 56 36H49.2Z"
        fill="white"
      />
    </svg>
  );

  const micOff = (
    <svg
      className={styles.svg}
      xmlns="http://www.w3.org/2000/svg"
      width="72"
      height="76"
      viewBox="0 0 72 76"
      fill="none"
    >
      <path
        d="M64 36H57.2C57.2 38.96 56.56 41.72 55.48 44.2L60.4 49.12C62.64 45.2 64 40.76 64 36ZM47.92 36.68C47.92 36.44 48 36.24 48 36V12C48 5.36 42.64 0 36 0C29.36 0 24 5.36 24 12V12.72L47.92 36.68ZM5.08 4L0 9.08L24.04 33.12V36C24.04 42.64 29.36 48 36 48C36.88 48 37.76 47.88 38.6 47.68L45.24 54.32C42.4 55.64 39.24 56.4 36 56.4C24.96 56.4 14.8 48 14.8 36H8C8 49.64 18.88 60.92 32 62.88V76H40V62.88C43.64 62.36 47.08 61.08 50.16 59.28L66.92 76L72 70.92L5.08 4Z"
        fill="white"
      />
    </svg>
  );

  const webcamOn = (
    <svg
      className={styles.svg}
      xmlns="http://www.w3.org/2000/svg"
      width="72"
      height="48"
      viewBox="0 0 72 48"
      fill="none"
    >
      <path
        d="M56 18V4C56 1.8 54.2 0 52 0H4C1.8 0 0 1.8 0 4V44C0 46.2 1.8 48 4 48H52C54.2 48 56 46.2 56 44V30L72 46V2L56 18Z"
        fill="white"
      />
    </svg>
  );

  const webcamOff = (
    <svg
      className={styles.svg}
      xmlns="http://www.w3.org/2000/svg"
      width="76"
      height="76"
      viewBox="0 0 76 76"
      fill="none"
    >
      <path
        d="M76 18L60 34V20C60 17.8 58.2 16 56 16H31.28L76 60.72V18ZM5.08 0L0 5.08L10.92 16H8C5.8 16 4 17.8 4 20V60C4 62.2 5.8 64 8 64H56C56.84 64 57.56 63.68 58.16 63.28L70.92 76L76 70.92L5.08 0Z"
        fill="white"
      />
    </svg>
  );

  const endCall = (
    <svg
      className={styles.svg}
      xmlns="http://www.w3.org/2000/svg"
      width="96"
      height="36"
      viewBox="0 0 96 36"
      fill="none"
    >
      <path
        className={styles.leaveSvg}
        d="M48 8C41.6 8 35.4 9 29.6 10.88V23.28C29.6 24.84 28.68 26.24 27.36 26.88C23.44 28.84 19.88 31.36 16.72 34.28C16 35 15 35.4 13.92 35.4C12.8 35.4 11.8 34.96 11.08 34.24L1.16 24.32C0.44 23.64 0 22.64 0 21.52C0 20.4 0.44 19.4 1.16 18.68C13.36 7.12 29.84 0 48 0C66.16 0 82.64 7.12 94.84 18.68C95.56 19.4 96 20.4 96 21.52C96 22.64 95.56 23.64 94.84 24.36L84.92 34.28C84.2 35 83.2 35.44 82.08 35.44C81 35.44 80 35 79.28 34.32C76.12 31.36 72.52 28.88 68.6 26.92C67.28 26.28 66.36 24.92 66.36 23.32V10.92C60.6 9 54.4 8 48 8Z"
        fill="white"
      />
    </svg>
  );

  return (
    <div className={styles.buttonsDiv}>
      <Link to="/">
        <button className={styles.leaveButton} onClick={() => leave()}>
          {endCall}
        </button>
      </Link>
      <button
        className={styles.toggleMicButton}
        onClick={() => {
          setIsMicOn(!isMicOn);
          toggleMic();
        }}
      >
        {isMicOn ? micOn : micOff}
      </button>
      <button
        className={styles.toggleWebcamButton}
        onClick={() => {
          setIsWebcamOn(!isWebcamOn);
          toggleWebcam();
        }}
      >
        {isWebcamOn ? webcamOn : webcamOff}
      </button>
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
    <div className={styles.viewDiv} key={props.participantId}>
      <p>
        Participant: {displayName} | Webcam: {webcamOn ? 'ON' : 'OFF'} | Mic:{' '}
        {micOn ? 'ON' : 'OFF'}
      </p>
      <audio ref={micRef} autoPlay muted={isLocal} />
      {webcamOn && (
        <div className={styles.webcamContainer}>
          <ReactPlayer
            style={{
              display: 'inline-block',
              position: 'relative',
              top: '35%',
            }}
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
            height={'100%'}
            width={'100%'}
            onError={(err) => {
              console.log(err, 'participant video error');
            }}
          />
        </div>
      )}
    </div>
  );
}
