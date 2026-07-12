import { getToken } from "../utils/storage";
import { Navigate } from "react-router-dom";

function PrivateRoutes({children}){
    const token = getToken();
    return token? children: <Navigate to ="/" replace/>
}

export default PrivateRoutes;
