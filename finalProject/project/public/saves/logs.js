async function getData() {
    const response = await fetch('/api');
    const data = await response.json();
    const box = document.getElementById('mySaved');

    for (item of data) {
        const root = document.createElement('p');
        const geo = document.createElement('div');
        const date = document.createElement('div');

        geo.textContent = `${item.latitude}°, ${item.longitude}°, ${item.loc_image}, ${item.day_image}`;
        const dateString = new Date(item.timestamp).toLocaleString();
        date.textContent = dateString;

        geo.appendChild(date);
        root.appendChild(geo);
        box.appendChild(root);
    }

    console.log(data);
}
getData();
