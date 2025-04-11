import axios from "axios";


export const userHasEarlyConfig = (uniId , token) => {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${process.env.PANEL_URI}/panel/api/inbounds/getClientTraffics/${uniId}`,
        headers: {
            'Accept': 'application/json',
            'Cookie': token
        }
    };

    axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
            console.log(error);
        });

}
