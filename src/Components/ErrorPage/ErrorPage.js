import React from 'react';
//import 404 image from the /src/images folder
import errorPage from '../../images/404.png';

//component for error page
const ErrorPage = () => {
    return (
        <div className="text-center">
            <img className="img-fluid" src={ errorPage } alt="errorPageImage" />
        </div>
    );
};

export default ErrorPage;