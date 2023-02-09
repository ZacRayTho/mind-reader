// variables from the document
let h1 = document.querySelector("h1");
let h3 = document.querySelector("h3");
let next = document.getElementById("next");
let go = document.getElementById("go");

// symbols array--HAD TO MOVE BECAUSE COULDN'T ACCESS IN STATE BEFORE STATE WAS INIT
let symbols = ["!", "@", "#", "$", "%", "^", "&", "*", "("]
//state of the page
let state = {
    // what page is currently viewed
    page: 0,
    // array of page objects with content for every view
    pages: [
        {
            header: "I can read your mind.",
            next: "",
            subhead: "",
            go: "GO",
        },
        {
            header: "Pick a number from 01 - 99",
            next: "NEXT",
            subhead: "when you have your number click next",
            go: "restart icon",
        },
        {
            header: "Add both digits together to get a new number",
            next: "NEXT",
            subhead: "Ex: 14 is 1 + 4 = 5 <br> click next to proceed",
            go: "restart icon",
        },
        {
            header: "Subtract your new number from the original number",
            next: "NEXT",
            subhead: "Ex: 14 - 5 = 9 <br> click next to proceed",
            go: "restart icon",
        },
        {
            //CAN'T USE STATE.SYMBOLS WITHIN STATE BECAUSE ITS NOT INIT YET
            header: loadSymbols(symbols),
            next: "REVEAL",
            subhead: "Find your new number. <br> Note the symbol beside the number",
            go: "restart icon",
        },
        {
            header: "!",
            next: "",
            subhead: "your symbol is: <br> !",
            go: "restart icon",
        },
    ]
}

function loadSymbols(arr) {
    //get a symbol for 00-99
    let x = []
    for (let i = 0; i < 100; i++) {
        x.push(symbols[i % 9])
    }
    //NEW for every element in array,change that element to the current iterator number + dash + the current value of the array
    for (let i = 0; i < 100; i++) {
        x[i] = i + " - " + x[i] + "<br>"
    }
    return x.toLocaleString().replaceAll(",", "");
}
//function to get all content from state oject and update page in state
function setPage(page) {
    h1.innerHTML = state.pages[page].header;
    next.innerHTML = state.pages[page].next;
    h3.innerHTML = state.pages[page].subhead;
    go.innerHTML = state.pages[page].go;
    state.page = page;
    location.hash = page;
    if (next.innerHTML == "") {
        next.style.display = "none";
    }
    else {
        next.style.display = ""
    }
    (page == 0 ? go.innerHTML = "GO" : go.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-counterclockwise" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"></path><path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"></path></svg>')
    localStorage.setItem("page", state.page)
}

//button event listeners for next page and restart
next.addEventListener("click", () => {
    animate();
    // Set timeout so the text doesn't change before the animation starts
    setTimeout(setPage, 1000, state["page"] + 1);
})

//functions for GO button
go.addEventListener("click", () => {
    if (go.innerHTML == "GO") {
        animate();
        setTimeout(setPage, 100, 1)    
    }
    else {
        animate();
        setTimeout(setPage, 100, 0)
    }

})

//on hash change update page
window.onhashchange = () => {
    setPage(Number(location.hash.replace("#", "")))
}

//DOM REFLOW -- an operation that computes layout of document,and during computing updates elements and reinitialize them---CAN REQUIRE A LOT OF CPU POWER AND BLOCKS USER OPERATION SO MINIMIZE USE
//remove slide class, than trigger a DOM reflow^^^, then add the slide class which automatically starts the animation for that class 
function animate() {
    h1.classList.remove("slide");
    h1.offsetWidth;
    h1.classList.add("slide");
}

//when the page is loaded ,start with whichever page localStorage has stored
setPage(Number(localStorage.getItem("page")));

