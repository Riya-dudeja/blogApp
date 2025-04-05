import React from "react";
import {FadeLoader} from 'react-spinners';

const Loading = () => {
  return (
    <div className="fixed inset-0 grid place-items-center bg-white z-30">
      {/* <img className="w-[20rem]" src="/loading.gif" alt="loading" /> */}
      <FadeLoader />
    </div>
  );
};

export default Loading;