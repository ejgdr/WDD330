if ('geolocation' in navigator) {
    console.log('geolocation available');
    navigator.geolocation.getCurrentPosition(async position => {
        try{
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            document.getElementById('latitude').textContent = latitude.toFixed(2);
            document.getElementById('longitude').textContent = longitude.toFixed(2);
        
            const api_url = `/earth/${latitude},${longitude}`;

            const response = await fetch(api_url);
            const json = await response.json();
            console.log(json);
            const location_pic = json.pic_location;
            const day_pic = json.pic_day;
            const notif = json.notifications;
            
            let loc_image = document.getElementById('location_image').src = location_pic.url;

            document.getElementById('day_explanation').textContent = day_pic.explanation;
            let day_image = document.getElementById('day_image').src = day_pic.url;
            document.getElementById('day_hdImage').href = day_pic.hdurl;
            document.getElementById('day_title').textContent = day_pic.title;

            const data = { latitude, longitude, loc_image, day_image };
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            };
            const resp = await fetch('/api', options);
            const js = await resp.json();
            console.log(js);

            let ul = document.getElementById('notifications');
            ul.innerHTML = '';
            for (let i = 0; i < notif.length; i++) {
                let li = document.createElement('li');
                let a = document.createElement('a');
                
                li.appendChild(document.createTextNode(`${notif[i].messageIssueTime}  `));
                a.appendChild(document.createTextNode(`${notif[i].messageType} -- ${notif[i].messageID}`));
                a.setAttribute("href", `${notif[i].messageURL}`);
                li.appendChild(a);
                ul.appendChild(li);
            }
        } catch (err) {
            // No working my handling error, I wanted to substitute my actual url by find the picture with not available to show.
            document.getElementById('location_image').src = `no-image.png`;
        }
    });
} else {
    console.log('geolocation NOT available');
}