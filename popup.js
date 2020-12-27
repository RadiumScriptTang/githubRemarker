let ids = ["rate-1", "rate-2", "rate-3", "rate-4", "rate-5"]

let elements = [];

let currentSelected = 1;

console.log("Hello");

chrome.tabs.getSelected(null, function (tab) {　　// 先获取当前页面的tabID
    chrome.tabs.sendMessage(tab.id, {action: "getRate"}, function(response) {
        console.log(response);
        elements[currentSelected].classList.remove('selected');
        if (response == null){
            elements[1].classList.add('selected');
            return;
        }
        currentSelected = response.rate;
        elements[currentSelected].classList.add('selected');

    });
});


for (let i = 0; i < ids.length; i++){
    elements.push(document.getElementById(ids[i]))
    elements[i].addEventListener("click", function (event){
        let idx = ids.indexOf(event.target.id);
        elements[currentSelected].classList.remove('selected');
        elements[idx].classList.add('selected');
        currentSelected = idx;

        chrome.tabs.getSelected(null, function (tab) {　　// 先获取当前页面的tabID
            chrome.tabs.sendMessage(tab.id, {action: "setRate", rate: idx}, function(response) {
                console.log(response);
            });
        });

    });
}