import React from "react";
import { RotatingTriangles } from "react-loader-spinner";
import "./../style/loader.css";

const Loader = () => {
    return (
        <div>
            <div className="box mt-10">
                <div>
                    <RotatingTriangles
                        visible={true}
                        height="120"
                        width="120"
                        ariaLabel="rotating-triangels-loading"
                        wrapperStyle={{}}
                        wrapperClass="rotating-triangels-wrapper"
                    />
                </div>
            </div>
        </div>
    );
};

export default Loader;

// https://mhnpd.github.io/react-loader-spinner/
// https://www.npmjs.com/package/react-loader-spinner
//npm i react-loader-spinner