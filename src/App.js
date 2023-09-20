
import { Route, Routes,} from "react-router-dom";
import { Login } from "./Components/auth/login";
import { Register } from "./Components/auth/register";
import { Authorized } from "./views/Authorized";
import { ApplicationViews } from "./views/ApplicationViews";

export const App = () => {
  
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="*" 
      element={
        <Authorized>
          <ApplicationViews />
        </Authorized>
      } 
      />
    </Routes>
  )
}










