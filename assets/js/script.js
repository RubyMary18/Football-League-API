//windowForward
// function windowForward() {
//     history.forward();
// }
// windowForward();


//loginBodyFunction
function loginBodyFunction() {
    //Login 
    var email = document.querySelector(".email-box input");
    pass = document.querySelector('.password-box input'),
        form = document.querySelector('.login-main form'),
        error = document.querySelector(".login-main span:last-child");

    //Login details
    var staticEmail = "ruby18@gmail.com";
    staticPassword = "ruby@123";

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        var emailInput = email.value,
            passInput = pass.value;

        if (emailInput == staticEmail && passInput == staticPassword) {
            localStorage.setItem("code", "login");
            window.location.replace('index.html');
        } else {
            error.classList.add('show');
            error.innerText = "please enter valid username and password";
        }
    })
}

//logoutFunction
function logoutFunction() {
    var form = document.querySelectorAll('form'),
        logOut = document.querySelector('.header-right form button');

    form.forEach(function (list) {
        list.addEventListener("submit", function (e) {
            e.preventDefault();
        })
    })

    logOut.addEventListener("click", function (e) {
        e.preventDefault();
        localStorage.setItem("code", "logout");
        window.location.replace('login.html');
    })
}

//codeFunction
function codeFunction() {
    var codeData = localStorage.getItem("code");
    if (codeData == "login") {
        redirectFunction();
        // console.log(window.history.length);
        // location.reload(1);
        // if (window.location.history(-1) == "login.html") {
        //     history.forward();
        // }
        // console.log(codeData);
        // window.location.href = "index.html";
    } else {
        window.location.replace("login.html");
    }

    function redirectFunction() {
        // console.log(window.location.href);
        if (window.location.href == "login.html") {
            console.log("login");
            // window.location.href = "http://127.0.0.1:5502/index.html";
        }
    }

    //navigation
    var navToggle = document.querySelector(".hamburger-toggle"),
        hamburger = document.querySelector(".hamburger"),
        navMenu = document.querySelector(".nav-menu"),
        navLink = document.querySelectorAll(".nav-menu li");

    navToggle.addEventListener("click", function () {
        hamburger.classList.toggle("open");
        navMenu.classList.toggle("hide");
    })

    navLink.forEach(function (li) {
        li.addEventListener("click", function () {
            for (i = 0; i < navLink.length; i++) {
                navLink[i].classList.remove("active");
            }
            li.classList.add("active");
        })
    })
}

var loadScore;

//clubFunction
function clubFunction() {
    var errorSpan = document.querySelector('.club-box span');
    errorSpan.classList.add('hide');

    var p = fetch("https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.clubs.json");
    p.then(function (response) {
        return response.json();
    }).then(function (value) {

        for (var i = 0; i < value.clubs.length; i++) {

            var select = document.querySelector('.club-box select');
            option = document.createElement("option");

            option.value = value.clubs[i].name;
            option.text = value.clubs[i].name;
            select.appendChild(option);
        }

        select.addEventListener("click", function () {
            checkForSelect(select);
        })

        //checkForSelect function
        function checkForSelect(input) {
            var text = input.value;

            for (var i = 0; i < value.clubs.length; i++) {
                if (text == value.clubs[i].name) {

                    var output = "",
                        resultLen,
                        counter = 0,
                        n = 5;

                    function loadMore(counter, n) {

                        var p1 = fetch("https://raw.githubusercontent.com/openfootball/football.json/master/2019-20/en.1.json");
                        p1.then(function (response1) {
                            return response1.json();
                        }).then(function (value1) {

                            var score = [],
                                tableContainer = document.querySelector('.result');
                            tableContainer.classList.remove('hide');

                            for (var j = 0; j < value1.matches.length; j++) {
                                if (text == value1.matches[j].team1 || text == value1.matches[j].team2) {
                                    score.push(value1.matches[j]);
                                }
                            }
                            resultLen = score.length;
                            result = score.slice(counter, n);
                            showResult(resultLen);
                        })
                    }

                    //shorResult function
                    function showResult(len) {
                        for (let item of result) {
                            output += `
                        <tr>
                          <td>${item.team1}</td>
                          <td>${item.team2}</td>
                          <td>${item.score.ft[0]}</td>
                          <td>${item.score.ft[1]}</td>
                        </tr>
                        `;
                        }
                        var tableData = document.querySelector('.tabel-data');
                        tableData.innerHTML = output;
                        loadScore = len;
                    }

                    var loadBtn = document.querySelector('.load-btn a');
                    loadBtn.addEventListener('click', function () {

                        console.log(resultLen);
                        counter += 5;
                        n += 5;
                        if (n > loadScore) {
                            n = loadScore;
                            loadBtn.classList.add('hide');
                        }

                        loadMore(counter, n);
                    })
                    loadMore(counter, n);
                }
            }
        }
    })
}

function matchFunction() {
    for (var i = 1; i <= 38; i++) {

        var select1 = document.querySelector('.match-box select');
        option = document.createElement("option");

        option.value = "Matchday" + " " + i;
        option.text = "Matchday" + " " + i;
        select1.appendChild(option);
    }

    select1.addEventListener("click", function () {

        var matchInput = select1.value;
        var p3 = fetch("https://raw.githubusercontent.com/openfootball/football.json/master/2019-20/en.1.json");
        p3.then(function (matchResponse) {
            return matchResponse.json();
        }).then(function (matchValue) {

            var matchTableContainer = document.querySelector('.match-result'),
                matchRound = [];

            matchTableContainer.classList.remove('hide');

            for (var k = 0; k < matchValue.matches.length; k++) {

                if (matchInput == matchValue.matches[k].round) {
                    matchRound.push(matchValue.matches[k]);
                    var matchResult = "";

                    for (let list of matchRound) {
                        matchResult += `
                            <tr>
                              <td>${list.round}</td>
                              <td>${list.team1}</td>
                              <td>${list.team2}</td>
                              <td>${list.score.ft[0]}</td>
                              <td>${list.score.ft[1]}</td>
                            </tr>
                            `;
                    }
                    var matchTableData = document.querySelector('.match-result .tabel-data');
                    matchTableData.innerHTML = matchResult;
                }
            }
        })
    })
}


if (document.body.classList.contains('login-body')) {
    loginBodyFunction();
} else if (document.body.classList.contains('index-body')) {
    codeFunction();
    logoutFunction();
} else if (document.body.classList.contains('club-body')) {
    codeFunction();
    clubFunction();
    logoutFunction();
} else if (document.body.classList.contains('match-body')) {
    codeFunction();
    matchFunction();
    logoutFunction();
}

window.addEventListener('load', function () {
    whiteSpace();
})

window.addEventListener('resize', function () {
    whiteSpace();
})

function whiteSpace() {
    var header = document.querySelector("header");
    var footer = document.querySelector("footer");
    var main = document.querySelector("main");
    var windowHeight = window.innerHeight;
    var height = windowHeight - (header.offsetHeight + footer.offsetHeight);
    main.style.minHeight = height + "px";
}