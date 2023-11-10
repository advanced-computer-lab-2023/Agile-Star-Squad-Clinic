import './Button.css';

const Button = (props) => {
  return (
    <div>
      <button className='submitButton' onClick={props.onClick}>{props.name}</button>
    </div>
  );
};

export default Button;
