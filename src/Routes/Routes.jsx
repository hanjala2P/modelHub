import { createBrowserRouter } from "react-router";
import Root from "../Components/Root";
import AllModels from "../Components/AllModels/AllModels";
import AddModel from "../Components/AddModel/AddModel";
import Register from "../Components/Auth/Register/Register";
import Login from "../Components/Auth/Login/Login";
import ViewDetails from "../Components/Cards/ViewDetails";
import PrivetRoute from "./PrivetRoute";
import UpdateModel from "../Components/UpdateModel/UpdateModel";
import LatestModels from "../Components/LatestModel/LatestModels";
import Home from "../Components/Home/Home";
import Hero from "../Components/Hero/Hero";
import MyModels from "../Pages/My Models/MyModels";
import UserProfile from "../Pages/User/UserProfile";
import Download from "../Pages/Download/Download";

// Animated Error Boundary Component with an Animated SVG
const ErrorBoundaryUI = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="bg-base-200 border border-base-300 p-8 rounded-2xl shadow-xl max-w-md w-full flex flex-col items-center">
        
        {/* Animated SVG Warning Icon */}
        <div className="w-20 h-20 mb-4 animate-bounce">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#e11d48"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-full h-full drop-shadow-md"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>

        <h2 className="text-2xl font-bold mb-2 text-base-content">Oops, Something Went Wrong!</h2>
        <p className="text-sm opacity-80 mb-6 text-base-content">
          We encountered an error loading the data or the requested page could not be found.
        </p>
        <a 
          href="/" 
          className="inline-block bg-[#e11d48] hover:bg-[#be123c] text-white font-medium px-6 py-2.5 rounded-xl transition-all shadow-lg hover:shadow-[#e11d48]/30"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
};

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>,
        errorElement: <ErrorBoundaryUI></ErrorBoundaryUI>, // Global root level error boundary
        children: [
            {
                path: '/allModels',
                element: <AllModels></AllModels>,
                loader: () => fetch('http://localhost:3000/models'),
                errorElement: <ErrorBoundaryUI></ErrorBoundaryUI>
            },
            {
                path: '/addModel',
                element: <AddModel></AddModel>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/viewDetails/:id',
                element: <PrivetRoute><ViewDetails></ViewDetails></PrivetRoute>,
            },
            {
                path: '/update-model/:id',
                element: <PrivetRoute><UpdateModel></UpdateModel></PrivetRoute>,
                loader: ({ params }) => fetch(`http://localhost:3000/models/${params.id}`),
                errorElement: <ErrorBoundaryUI></ErrorBoundaryUI>
            },
            {
                path: '/my-models',
                element: <PrivetRoute><MyModels></MyModels></PrivetRoute>,
            },
            {
                path: '/download',
                element: <PrivetRoute><Download></Download></PrivetRoute>,
            },
            {
                path: '/profile',
                element: <PrivetRoute><UserProfile></UserProfile></PrivetRoute>,
            },
            {
                index: true,
                element: <LatestModels></LatestModels>,
                loader: () => fetch('http://localhost:3000/latest-models'),
                errorElement: <ErrorBoundaryUI></ErrorBoundaryUI>
            },
        ]
    }
]);