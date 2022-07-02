const links = [
    {
      label: "Week1 Notes",
      url: "week1/index.html"
    },
    {
      label: "Week2 - 5 Notes",
      url: "week2/index.html"
    },
    {
      label: "Week5 Challenge: Todo",
      url: "challengeOne/index.html"
    },
    {
      label: "Week7 Notes",
      url: "week7/index.html"
    },
    {
      label: "Final Project Notes",
      url: "finalProject/index.html"
    }
  ]

function createLinks(){
    const toOrderList = document.querySelector("#dynamicList");

    links.forEach( createLink => {
        const liTags = document.createElement("li");
        const aTags = document.createElement("a");
        aTags.setAttribute("href", createLink.url);
        aTags.innerText = createLink.label;

        liTags.appendChild(aTags);
        toOrderList.appendChild(liTags);
    })
}