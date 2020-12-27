
let userPrefix = "githubRemarker_";

function showRemarks(){
    if (window.location.href.indexOf("followers") > -1){
        return;
    }
    let userEles = document.querySelectorAll('div.width-full a[data-hovercard-type="user"]');
    for (let i = 0; i < userEles.length; i++){
        let userEle = userEles[i];
        let username = userEle.innerText;
        if (window.localStorage[userPrefix + username] != null){
            userEle.innerHTML += "<span>(" + window.localStorage[userPrefix + username] + ")</span>";
        }
        let parentDiv = userEle.parentElement;
        if (parentDiv.lastChild.className !== 'remark-user-input'){
            parentDiv.innerHTML += "<a class='remark-user-btn'>remark</a>";
            parentDiv.innerHTML += "<input name='" + username + "' style='display: none' class='remark-user-input'>";
        }

    }
    $(".remark-user-btn").click(function (){
        $(this).hide();
        $(this).parent().children("input").show();
        $(".remark-user-input").blur(function (){
            $(this).hide();
            let val = $(this).val();
            if (val !== ''){
                let username = $(this).attr("name");
                window.localStorage[userPrefix + username] = val;
                showRemarks();
            }
            else {
                $(this).parent().children("a.remark-user-btn").show();
            }
        })
    })
}

setTimeout(function (){
    showRemarks();

}, 3000);
