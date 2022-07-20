if ('geolocation' in navigator) {
    console.log('geolocation available');
    navigator.geolocation.getCurrentPosition(async position => {
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
        
        document.getElementById('location_image').src = location_pic.url;

        document.getElementById('day_explanation').textContent = day_pic.explanation;
        document.getElementById('day_image').src = day_pic.url;
        document.getElementById('day_hdImage').href = day_pic.hdurl;
        document.getElementById('day_title').textContent = day_pic.title;
        document.getElementById('day_copyright').textContent = day_pic.copyright;

        let ul = document.getElementById('notifications');
        ul.innerHTML = '';
        for (let i = 0; i < notif.length; i++) {
            let li = document.createElement('li');
            let a = document.createElement('a');
            
            li.appendChild(document.createTextNode(`${notif[i].messageIssueTime} ~ `));
            a.appendChild(document.createTextNode(`${notif[i].messageType} -- ${notif[i].messageID}`));
            a.setAttribute("href", `${notif[i].messageURL}`);
            li.appendChild(a);
            ul.appendChild(li);
        }
    });
} else {
    console.log('geolocation NOT available');
}