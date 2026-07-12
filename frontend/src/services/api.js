import apiClient from "./apiClient";

export const registerUser = (data)=>{
    return apiClient.post("/auth/register",data);
}

export const loginUser = (data)=>{
    return apiClient.post("/auth/login",data);
}

export const getNotes = ()=>{
    return apiClient.get("/notes")
}
export const createNotes= (data)=>{
    return apiClient.post("/notes",data);
}

export const updateNotes= (id,data)=>{
    return apiClient.patch(`/notes/${id}`,data);
}

export const deleteNotes= (id)=>{
    return apiClient.delete(`/notes/${id}`);
}
