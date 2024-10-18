const linksSections = document.querySelectorAll('.board__nav-link');
const infoSections = document.querySelectorAll('.board__item-info');

const data = await fetch('../data.json').then(request => {
    if (!request.ok) {
        console.log("Oops! Something went wrong.");
        return null;
    }
    return request.json();
});

const changeButtonState = activeLink => {
    for(const link of linksSections) link.classList.remove("board__nav-link--active");
    activeLink.classList.add("board__nav-link--active");
}

const changeSection = (sectionName, propertyTimeFrame, data) => {
    if (data === null) return
    else {
        for(let i = 0; i < data.length; ++i) {
            infoSections[i].children[0].textContent = `${data[i].timeframes[propertyTimeFrame].current}hrs`;
            infoSections[i].children[1].textContent = `Last ${sectionName} - ${data[i].timeframes[propertyTimeFrame].previous}hrs`
        }
    }
};

changeSection("week", "weekly", data);

window.addEventListener('click', event => {
    if (event.target.classList.contains("board__nav-link")) {
        changeButtonState(event.target);
        changeSection(
            event.target.id, 
            event.target.textContent.toLowerCase(), 
            data
        );
    }
});
