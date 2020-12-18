import React from 'react';
import PropTypes from 'prop-types';
import NavBar from "../../components/NavBar";

UserProfile.propTypes = {

};

const UserProfile=(props)=>{
    const [isLoading, setIsLoading] = React.useState(0);
    const [state, setState] = useState(initState);

    return (
        <div>
            <NavBar/>

        </div>
    );
}

export default UserProfile;