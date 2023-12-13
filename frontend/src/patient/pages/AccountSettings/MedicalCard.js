import { useState, useCallback } from "react";
import { SideCard } from "./Account"
import Dropzone from "react-dropzone"
import classes from "./MedicalCard.module.css"
import uploadImg from "../../../assets/patientAccount/upload.png";



const MedicalCard = (props) => {
    const [tab, setTab] = useState(0);
    const [files, setFiles] = useState([]);

    const getTabStyle = (index) => {
        if (index == tab) {
            return `${classes.tabText} ${classes.activeTab}`;
        }
        return classes.tabText;
    };

    const toastMe = (msg) => {

    }

    return <SideCard>
        <div className={classes.sideCardTitle}>Medical Documents</div>
        <div className={classes.tabs}>
            <div className={getTabStyle(0)} onClick={() => setTab(0)}>
                Upload {tab == 0 && <hr className={classes.activeTab} />}
            </div>
            <div className={getTabStyle(1)} onClick={() => setTab(1)}>
                My Documents {tab == 1 && <hr className={classes.activeTab} />}
            </div>
        </div>
        <MyDropzone label="Upload Document" maxFiles={5} toast={toastMe} files={files} setFiles={setFiles}/>
    </SideCard>;
}

const MyDropzone = (props) => {
    const files = props.files;
    const setFiles = props.setFiles;
    const onDrop = useCallback(acceptedFiles => {
        if (files.length + acceptedFiles.length > props.maxFiles) {
            props.toast(`Upload a maximum of ${props.maxFiles} files`);
            return;
        }
        if (acceptedFiles?.length) {
            console.log(Object.assign(acceptedFiles[0], { preview: URL.createObjectURL(acceptedFiles[0]) }));
            setFiles(prevFiles => [...prevFiles, ...acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            }))]
            );
        }
    })

    const rejectFile = () => {
        props.toast(`Only .PNG and .JPG files are accepted`);
        return;
    }


    const thumbs = files.map(file => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img
                    src={file.preview}
                    style={img}
                />
            </div>
        </div>
    ));

    return <div className={classes.myDropzone}>
        <Dropzone onDrop={onDrop} onDropRejected={rejectFile} accept={{ 'image/png': ['png'], 'image/jpeg': ['jpg'] }} >
            {({ getRootProps, getInputProps }) => (
                <section>
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        {files.length > 0 && <aside style={thumbsContainer}>
                            {thumbs}
                        </aside>}
                        {files.length == 0 && <>
                            <img height={50} src={uploadImg}/>
                            <div className="mt-3">Drag & drop files or Browse</div>
                            <div className={classes.dropzoneSubtitle}>Supported formats: JPEG, PNG, PDF</div>
                            </>
                        }
                    </div>

                </section>
            )}
        </Dropzone>
    </div>;
}

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
};

const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
};

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
};

export default MedicalCard