// variables from the document
let h1 = document.querySelector("h1");
let h3 = document.querySelector("h3");
let next = document.getElementById("next");
let go = document.getElementById("go");

//state of the page
let state = {
    // what page is currently viewed
    page: 0,
    // symbols array
    symbols: ["!", "@", "#", "$", "%", "^", "&", "*", "("],
    // array of page objects with content for every view
    pages: [
        {
            header: "I can read your mind.",
            next: "",
            subhead: "",
            go: "Go",
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
            subhead: "Ex: 14 is 1 + 4 = 5 <br> click next to proceed" ,
            go: "restart icon",
        },
        {
            header: "Subtract your new number from the original number",
            next: "NEXT",
            subhead: "Ex: 14 - 5 = 9 <br> click next to proceed",
            go: "restart icon",
        },
        {
            header: "0 - ! <br> 1 - @ <br> 2 - $ <br> ... <br> ... <br> ... <br> ... <br> ... <br> ... <br> ... <br> ... <br> ... <br> ... <br> ... <br> ... <br> ... <br> ... <br> ... <br> ... <br> ... <br> ... <br> ... <br> ... <br> ... <br> ... <br> ... <br> ... <br> ... <br> ... <br> ... <br> ... <br> ... <br> ... <br> ... <br> ... <br> ... <br> ... <br> ... <br> ... <br> ... <br> ... <br> ... ",
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
    let x = []
    for (item in arr) {
        //for every element in array switch case checks which symbol it is and then adds the correct number and dash before it
        x.map((element)=>{
            switch (element) {
            case "!": console.log("0 - " + element);
              break;
          }})
    }
}
//function to get all content from state oject and update page in state
function setPage(page) {
    h1.innerHTML = state.pages[page].header;
    next.innerHTML = state.pages[page].next;
    h3.innerHTML = state.pages[page].subhead;
    go.innerHTML = state.pages[page].go;
    state.page = page; 
    if (next.innerHTML == ""){
        next.style.display = "none";
    }
    else {
        next.style.display = ""
    }
}

//button event listeners for next page and restart
next.addEventListener("click", ()=> {
    setPage(state["page"] + 1)
})

go.addEventListener("click", ()=> {
    if (go.innerHTML == "Go") {
        setPage(1);
    }
    else {
        setPage(0);
    }
    
})

//when the page is loaded ,start with first page view
setPage(0);