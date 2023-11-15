import { Link } from "react-router-dom"

const SignupOptions = () => {
    return <div>
        <div>
        <Link to={"/patient/register"}>Sign up as patient</Link>

        </div>
        <div>
        <Link to={"/doctor/register"}>Sign up as doctor</Link>

        </div>
    </div>
}

export default SignupOptions;