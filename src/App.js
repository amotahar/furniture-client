import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom'
import { routes } from './routes/Routes';
import { useEffect, useState } from "react";
import './App.css';
import Loader from './utils/Loader';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2500);
  });

  return (
    <div>
      <div>
        {isLoading ? (
          <Loader></Loader>
        ) : (
          <div>
            <div className="mx-auto max-w-[1440px]">
      <RouterProvider router={routes}></RouterProvider>
                <Toaster />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;


// ! max width set korlam
