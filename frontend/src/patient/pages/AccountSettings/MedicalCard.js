import { useState, useCallback, useContext, useEffect } from 'react';
import { SideCard } from './Account';
import Dropzone from 'react-dropzone';
import classes from './MedicalCard.module.css';
import uploadImg from '../../../assets/patientAccount/upload.png';
import deleteImg from '../../../assets/patientAccount/delete.png';
import UserContext from '../../../user-store/user-context';
import axios from 'axios';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import storage from '../../..';
import { toastMeError, toastMeSuccess } from '../../../shared/components/util/functions';

const MedicalCard = (props) => {
  const [tab, setTab] = useState(0);
  const [files, setFiles] = useState([]);
  const [existingFiles, setExistingFiles] = useState([]);

  const userCtx = useContext(UserContext);

  //   axios.patch( // call after setFiles
  //     `https://localhost:3000/patients/${userCtx.userId}/setHealthRecords`,
  //     { medicalRecord: files },
  //     { withCredentials: true },
  //   );

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const updateBackend = async () => {
      await fetch(
        `http://localhost:3000/patients/${userCtx.userId}`,
        {
          credentials: 'include',
          method: "PATCH",
          headers: { 'Content-type': 'application/json; charset=UTF-8' },
          body: JSON.stringify({ medicalRecord: existingFiles }),
        },
      );
    }

    if (existingFiles!= null) {
      updateBackend();
    }
  }, [existingFiles])

  const fetchData = async () => {
    const response = await axios.get(
      `http://localhost:3000/patients/${userCtx.userId}`,
      {
        useCredentials: true,
      },
    );
    setExistingFiles(response.data.data.medicalRecord);
  }

  const getTabStyle = (index) => {
    if (index == tab) {
      return `${classes.tabText} ${classes.activeTab}`;
    }
    return classes.tabText;
  };

  const toastMe = (msg) => { };

  const uploadFiles = async () => {
    const newFiles = [];
    toastMeSuccess("Uploading...")
    for (const file of files) {
      const fileRef = ref(storage, `${file.name}`);
      await uploadBytesResumable(fileRef, file).then(async (snapshot) => {
        const downloadUrl = await getDownloadURL(snapshot.ref);
        newFiles.push(downloadUrl);
      });
    }


    setExistingFiles(val => [...val, ...newFiles]);
    setFiles([]);

    toastMeSuccess("Documents uploaded successfully")

  }

  const deleteDocument = async (deletedFile) => {
    setExistingFiles(files => {
      return files.filter(file => deletedFile != file);
    })
    toastMeSuccess("Document deleted successfully")
  }

  const getUploadTab = () => {
    const thumbs = files.map((file) => (
      <div style={thumb} key={file.name}>
        <div style={thumbInner}>
          <img src={file.preview} style={img} />
        </div>
      </div>
    ));

    return (
      <>
        <MyDropzone
          label="Upload Document"
          maxFiles={5}
          toast={toastMeError}
          files={files}
          setFiles={setFiles}
        />
        <div className="d-flex flex-column align-items-start mt-3">
          <div>Selected Files:</div>
          {files.length == 0 && (
            <div className={classes.noFiles}>No files selected</div>
          )}
          {files.length > 0 && <aside style={thumbsContainer}>{thumbs}</aside>}
        </div>
        <button onClick={uploadFiles} disabled={files.length == 0} className={classes.uploadButton}>
          Upload Files
        </button>
      </>
    );
  };

  const getDocumentsTab = () => {
    //files line 53 should be patients uploaded file urls from db
    return (
      <div className="d-flex flex-wrap overflow-scroll">
        {existingFiles.map((file) => (
          <div
            className="position-relative border p-3 col-5 m-3"
            key={file.name}
          >
            <a href={file} target="_blank">
              <div>
                {!file.includes('pdf') && <img src={file} height={50} />}
                {file.includes('pdf') && "View PDF"}
              </div>
            </a>
            <div onClick={() => deleteDocument(file)} className={classes.deleteButton}>
              <img height={30} src={deleteImg} />
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <SideCard>
      <div className={classes.sideCardTitle}>Medical Documents</div>
      <div className={classes.tabs}>
        <div className={getTabStyle(0)} onClick={() => setTab(0)}>
          Upload {tab == 0 && <hr className={classes.activeTab} />}
        </div>
        <div className={getTabStyle(1)} onClick={() => setTab(1)}>
          My Documents {tab == 1 && <hr className={classes.activeTab} />}
        </div>
      </div>
      {tab == 0 && getUploadTab()}
      {tab == 1 && getDocumentsTab()}
    </SideCard>
  );
};

const MyDropzone = (props) => {
  const files = props.files;
  const setFiles = props.setFiles;
  const onDrop = useCallback((acceptedFiles) => {
    if (files.length + acceptedFiles.length > props.maxFiles) {
      props.toast(`Upload a maximum of ${props.maxFiles} files`);
      return;
    }
    if (acceptedFiles?.length) {
      console.log(
        Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(acceptedFiles[0]),
        }),
      );
      setFiles((prevFiles) => [
        ...prevFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      ]);
    }
  });

  const rejectFile = () => {
    props.toast(`Only .PNG, .PDF, .JPG files are accepted`);
    return;
  };

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} />
      </div>
    </div>
  ));

  return (
    <div className={classes.myDropzone}>
      <Dropzone
        onDrop={onDrop}
        onDropRejected={rejectFile}
        accept={{ 'image/png': ['png'], 'image/jpeg': ['jpg'], 'application/pdf': ['pdf'] }}
      >
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {/* {files.length > 0 && <aside style={thumbsContainer}>
                            {thumbs}
                        </aside>} */}
              <>
                <img height={50} src={uploadImg} />
                <div className="mt-3">Drag & drop files or Browse</div>
                <div className={classes.dropzoneSubtitle}>
                  Supported formats: JPEG, PNG, PDF
                </div>
              </>
            </div>
          </section>
        )}
      </Dropzone>
    </div>
  );
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 'auto',
  height: 50,
  padding: 4,
  boxSizing: 'border-box',
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%',
};

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 8,
};

export default MedicalCard;
