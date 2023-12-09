import styles from './Messages.module.css';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ChatRoom from './ChatRoom';
import NavBar from '../../../shared/components/NavBar/NavBar';
import Sender from './Sender';
import Receiver from './Receiver';
import TextBox from './TextBox';

const Messages = () => {
  return (
    <>
      <div>
        <a href="/HomePage">
          <svg
            className={styles.backArrow}
            xmlns="http://www.w3.org/2000/svg"
            width="23"
            height="14"
            viewBox="0 0 23 14"
            fill="none"
          >
            <path
              d="M1.59583 1.53345L11.9077 11.9807L22.2571 1.57064"
              stroke="black"
              strokeOpacity="0.6"
              strokeWidth="2.04827"
            />
          </svg>
        </a>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-4 mt-4">
            <h2 className={styles.messages}>Messages</h2>
            <div className={styles.searchChat}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="36"
                viewBox="0 0 35 36"
                fill="none"
              >
                <g filter="url(#filter0_d_969_2522)">
                  <path
                    d="M20.3802 16.7389H19.8506L19.6629 16.549C20.0819 16.0382 20.388 15.4367 20.5596 14.7873C20.7311 14.1379 20.7637 13.4567 20.655 12.7926C20.34 10.837 18.7848 9.27536 16.9078 9.03618C16.248 8.94858 15.5778 9.02055 14.9485 9.24658C14.3192 9.47261 13.7475 9.84671 13.2772 10.3403C12.8069 10.8338 12.4504 11.4337 12.235 12.0941C12.0196 12.7544 11.951 13.4578 12.0345 14.1502C12.2624 16.1199 13.7506 17.7519 15.6141 18.0825C16.247 18.1965 16.8961 18.1622 17.5149 17.9823C18.1337 17.8023 18.707 17.481 19.1937 17.0414L19.3747 17.2383V17.7941L22.2236 20.7837C22.4985 21.0721 22.9476 21.0721 23.2224 20.7837C23.4973 20.4953 23.4973 20.024 23.2224 19.7356L20.3802 16.7389ZM16.3582 16.7389C14.689 16.7389 13.3416 15.325 13.3416 13.5734C13.3416 11.8218 14.689 10.4079 16.3582 10.4079C18.0273 10.4079 19.3747 11.8218 19.3747 13.5734C19.3747 15.325 18.0273 16.7389 16.3582 16.7389Z"
                    fill="#3D64FD"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_d_969_2522"
                    x="-5.29412"
                    y="-5.47059"
                    width="46.5882"
                    height="46.5882"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="2.82353" />
                    <feGaussianBlur stdDeviation="5.64706" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0.85098 0 0 0 0 0.85098 0 0 0 0 0.85098 0 0 0 0.32 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_969_2522"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_969_2522"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
              <input
                type="text"
                placeholder="Search..."
                className={styles.searchText}
              />
            </div>
            <div className={styles.myMessages}>
              <ChatRoom />
              <ChatRoom />
              <ChatRoom />
              <ChatRoom />
              <ChatRoom />
              <ChatRoom />
            </div>
          </div>
          <div className="col-8 mt-4">
            <div className={styles.chosenChat}>
              <h2 className={styles.messages}>Ahmed Lasheen</h2>
            </div>
            <div className={styles.Room}>
              <div className={styles.RoomLeft}>
                <Sender />
                <Sender />
                <Sender />
                <Sender />
                <Sender />
              </div>
              <div className={styles.RoomRight}>
                <Receiver />
                <Receiver />
                <Receiver />
                <Receiver />
                <Receiver />
              </div>
            </div>
            <div className={styles.typingSpace}>
              <TextBox/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Messages;
