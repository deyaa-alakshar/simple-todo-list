import React from "react";
import CircularProgress from '@mui/material/CircularProgress';

const Loading = () => {
  return (
    <div className='h-svh bg-zinc-900 p-5 flex items-center justify-center'>
      <CircularProgress size={40} />
    </div>
  );
};

export default Loading;
