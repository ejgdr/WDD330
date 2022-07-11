if ('geolocation' in navigator) {
    console.log('geolocation available');
    navigator.geolocation.getCurrentPosition(async position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        document.getElementById('latitude').textContent = latitude;
        document.getElementById('longitude').textContent = longitude;

        const api_url = `/earth/${latitude},${longitude}`;
        const response = await fetch(api_url);
        const json = await response.json();
        console.log(json);
    });
} else {
    console.log('geolocation NOT available');
}