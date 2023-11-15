import axios from "axios";
const podchyClient = axios.create({
    baseURL: `${import.meta.env.VITE_PODCHY_API_URL}/api`,
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("token")}`,
    },
});

export default podchyClient;