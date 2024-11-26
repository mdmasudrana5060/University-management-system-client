
import { createBrowserRouter } from "react-router-dom";
import App from "../App"
import  { adminPaths } from "./admin.route";
import Login from "../pages/Login";
import { facultyPaths } from "./faculty.routes";
import { studentPaths } from "./student.route";
import { routeGenerator } from "../utils/routesGenerator";

const router=createBrowserRouter([
    {
        path:'/',
        element:<App/>,
       
    },
    {
        path:'/admin',
        element:<App/>,
        children:routeGenerator(adminPaths)
    },
    {
        path: '/faculty',
        element: <App />,
        children: routeGenerator(facultyPaths),
      },
      {
        path: '/student',
        element: <App />,
        children: routeGenerator(studentPaths),
      },
    {
        path:'/login',
        element:<Login/>
    }
 
    // {
    //     path:'/student',
    //     element:<App/>,
    //     children:adminRoutes
    // }
])

export default router