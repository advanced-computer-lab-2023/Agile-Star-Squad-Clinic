import './InputField.css';

const InputField = (props) => {
    return (
        <div className="container">
            <div>
                <input className='inputField' type={props.type} id={props.id} onChange={props.onChange} defaultValue={props.value} placeholder={props.placeholder} />
            </div>
        </div>
    );
}

export default InputField;