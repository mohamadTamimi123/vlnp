const axios = require('axios');
let data = JSON.stringify({
    "id": 1,
    "settings": "{\"clients\":[{\"id\":\"95e4e7bb-7796-47e7-e8a7-f4055194f776\",\"alterId\":0,\"email\":\"New Client\",\"limitIp\":2,\"totalGB\":42949672960,\"expiryTime\":1682864675944,\"enable\":true,\"tgId\":\"\",\"subId\":\"\"}]}"
});

let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://3.249.109.246:80/panel/api/inbounds/addClient',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cookie': '3x-ui=MTc0MzcwODAzOHxEWDhFQVFMX2dBQUJFQUVRQUFCMV80QUFBUVp6ZEhKcGJtY01EQUFLVEU5SFNVNWZWVk5GVWhoNExYVnBMMlJoZEdGaVlYTmxMMjF2WkdWc0xsVnpaWExfZ1FNQkFRUlZjMlZ5QWYtQ0FBRUVBUUpKWkFFRUFBRUlWWE5sY201aGJXVUJEQUFCQ0ZCaGMzTjNiM0prQVF3QUFRdE1iMmRwYmxObFkzSmxkQUVNQUFBQUh2LUNHd0VDQVFwWlJFZGtXRE5WTjBKc0FRcG1jVkZIUkcxa1JVbFZBQT09fK4hQzAT6xu6lBIdavdn9PjjS2bw5lRu2FkLHQh1bfQ9'
    },
    data : data
};

axios.request(config)
    .then((response) => {
        console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
        console.log(error);
    });
