setImage(file);
        setImageUrl(file !== "" ? URL.createObjectURL(file) : "");
import ReactDOM from "react-dom";
import Modal from './Modal/Modal';
import './NewItem.css';
import { useEffect, useState } from "react";
import storage from '../index';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import ReactDOM from "react-dom";
import Modal from './Modal/Modal';
import './NewItem.css';
import { useEffect, useState } from "react";
import storage from '../index';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const NewItem = (props) => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [location, setLocation] = useState("");
    const [owner, setOwner] = useState("");
    const [badgeType, setBadgeType] = useState("");
    const [image, setImage] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [avatar, setAvatar] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    const [isLoading, setLoading] = useState(false);


    const onTitleChange = (event) => {
        setTitle(event.target.value);
    };
    const onPriceChange = (event) => {
        setPrice(event.target.value);
    };
    const onLocationChange = (event) => {
        setLocation(event.target.value);
    };
    const onOwnerChange = (event) => {
        setOwner(event.target.value);
    };
    const onBadgeTypeChange = (event) => {
        setBadgeType(event.target.value);
    };

    useEffect(() => {
        if (!props.isNew) {
            let data = props.data;
            setTitle(data['title']);
            setPrice(data['price']);
            setLocation(data['location']);
            setOwner(data['owner']);
            setBadgeType(data['badgeType']);
            setImageUrl(data['imageUrl']);
            setAvatarUrl(data['avatarUrl']);
        }
    }, []);

    const updateImage = (event) => {
        setImage(event.target.files);
        setImageUrl(file !== "" ? URL.createObjectURL(file) : "");

    }

    const updateOwnerImage = (file) => {
        setAvatar(file);
        setAvatarUrl(file !== "" ? URL.createObjectURL(file) : "");

    }

    const onDelete = () => {
        props.onDelete(props.data['id']);
        props.exit();
    };

    const onSave = async () => {
        setLoading(true);
        let imageDownloadUrl;
        let avatarDownloadUrl;
        if (image !== "") {
            const imageRef = ref(storage, `${image.name}`);
            await uploadBytesResumable(imageRef, image).then(async (snapshot) => {
                const url = await getDownloadURL(snapshot.ref);
                imageDownloadUrl = url;
            });
        }

        if (avatar !== "") {
            const avatarRef = ref(storage, `${avatar.name}`);
            await uploadBytesResumable(avatarRef, avatar).then(async (snapshot) => { avatarDownloadUrl = await getDownloadURL(snapshot.ref) });
        }


        const data = {
            "id": props.data['id'],
            "title": title,
            "price": price,
            "owner": owner,
            "location": location,
            "badgeType": badgeType,
            "imageUrl": imageDownloadUrl,
            "avatarUrl": avatarDownloadUrl
        };

        const requestOptions = {
            method: 'PUT',
            headers: { "Content-type": "application/json; charset=UTF-8", },
            body: JSON.stringify(data)
        };
        fetch(`https://64e25700ab0037358818efc3.mockapi.io/listings/${props.data['id']}`, requestOptions).then(() => { props.refresh(); });

        props.exit();
    };

    const onAdd = async () => {
        setLoading(true);
        let imageDownloadUrl;
        let avatarDownloadUrl;

        if (image !== "") {
            const imageRef = ref(storage, `${image.name}`);
            await uploadBytesResumable(imageRef, image).then(async (snapshot) => {
                const url = await getDownloadURL(snapshot.ref);
                imageDownloadUrl = url;
            });
        }

        if (avatar !== "") {
            const avatarRef = ref(storage, `${avatar.name}`);
            await uploadBytesResumable(avatarRef, avatar).then(async (snapshot) => {
                avatarDownloadUrl = await getDownloadURL(snapshot.ref) });
        }

        const data = {
            "id": Math.random().toString(),
            "title": title,
            "price": price,
            "owner": owner,
            "location": location,
            "badgeType": badgeType,
            "imageUrl": imageDownloadUrl,
            "avatarUrl": avatarDownloadUrl
        };

        const requestOptions = {
            method: 'POST',
            headers: { "Content-type": "application/json; charset=UTF-8", },
            body: JSON.stringify(data)
        };
        fetch(`https://64e25700ab0037358818efc3.mockapi.io/listings`, requestOptions).then(() => { props.refresh(); });

        props.exit();
    }

    return ReactDOM.createPortal(
        <Modal exit={props.exit}>
            <InputField label="Title" value={title} onChange={onTitleChange} />
            <InputField label="Price" value={price} onChange={onPriceChange} />
            <InputField label="Location" value={location} onChange={onLocationChange} />
            <InputField label="Owner" value={owner} onChange={onOwnerChange} />
            <InputField label="Badge Type" value={badgeType} onChange={onBadgeTypeChange} placeholder="popular / newHouse / bestDeals" />
            <UploadButton label="Image" setFile={updateImage} imageUrl={imageUrl} />
            <UploadButton label="Owner Image" setFile={updateOwnerImage} imageUrl={avatarUrl} />

            {!props.isNew && <EditButtons onSave={onSave} onDelete={onDelete} isLoading={isLoading} />}
            {props.isNew && <NewButton onAdd={onAdd} isLoading={isLoading} />}


        </Modal>, document.getElementById("backdrop-root"));
}

export default NewItem;

const EditButtons = (props) => {
    return (
        <div className="d-flex justify-content-end mt-5">
            <button className="formButtons formDeleteButton" onClick={props.onDelete}>Delete</button>
            <button className="formButtons" onClick={props.onSave}>
                {!props.isLoading && <span>Save</span>}
                {props.isLoading && <div className="loader" />}
            </button>
        </div>
    );
};

const NewButton = (props) => {
    return (
        <div className="d-flex justify-content-end mt-5">
            <button className="formButtons" onClick={props.onAdd}>
                {!props.isLoading && <span>Add</span>}
                {props.isLoading && <div className="loader" />}
            </button>
        </div>
    );
};

const UploadButton = (props) => {
    const onChange = (event) => {
        props.setFile(event.target.files[0]);
    };

    const onRemoveImage = () => {
        props.setFile("");
    };

    if (props.imageUrl !== "") {
        // let imageUrl = URL.createObjectURL(props.imageUrl);
        return (
            <div className="inputRow">
                <label className="inputLabel">{props.label}</label>
                <div >
                    <span>
                        <img src={props.imageUrl} height={40} />
                    </span>
                    <span className="ms-3">
                        <button className="removeIcon" onClick={onRemoveImage}>
                            <i className="bi bi-x" />
                        </button>
                    </span>
                </div>
            </div>);
    }


    return (
        <div className="inputRow">
            <label className="inputLabel">{props.label}</label>
            <div >
                <label className="uploadBtn">
                    <input type="file" onChange={onChange} />
                    Upload Image</label>
            </div>
        </div>
    );
};

const InputField = (props) => {
    return (
        <div className="inputRow">
            <label className="inputLabel">{props.label}</label>
            <div class="input-field">
                <input type="text" id="search-term" onChange={props.onChange} defaultValue={props.value} placeholder={props.placeholder} />
            </div>
        </div>
    );
}
