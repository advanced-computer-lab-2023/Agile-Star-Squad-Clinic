import axios from "axios";

const { createContext, useState } = require("react");


const UserContext = createContext({
    role: "guest", 
    userId: null, 
    status: null,
    login: (user) => { }, 
    logout: async () => { }
});

export default UserContext;

export const UserContextProvider = (props) => {
    const [user, setUser] = useState({ role: "guest", userId: null, status: null });

    const login = (user) => {
        setUser({role: user.role, userId: user.userId, status: user.status});
    }

    const logout = async () => {
        await axios.get('http://localhost:3000/auth/logout');
        setUser({ role: "guest", id: null });
    }

    return <UserContext.Provider value={{
        role: user.role,
        userId: user.userId,
        status: user.status,
        login: login,
        logout: logout
    }}>
        {props.children}
    </UserContext.Provider>
}