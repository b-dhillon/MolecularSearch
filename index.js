// import ChemLib from './lib/ChemDoodleWeb.js';
// import logoImg from './img/logoImg.png';


let reader3d = new FileReader();
let reader2d = new FileReader();
let readerProp = new FileReader();
let molecule3d;
let molecule2d;
let size3d;
let size2d;
let searchString;

// Selected elements:
const searchEl = document.querySelector(".search-box");
const searchField = document.querySelector(".search-field");
const si = document.querySelector(".search-icon");
const logoEl = document.querySelector(".logoImg");


// Event Handlers:
function handleSearchClick()
{
    searchEl?.classList.add("border-searching");
    si?.classList.add("si-rotate")
    logoEl?.classList.add("logo-rotate")
}

function handleSearchReset()
{
    searchEl?.classList.remove("border-searching");
    si?.classList.remove("si-rotate");
    logoEl?.classList.remove("logo-rotate")
}

function handleGo()
{
    const goIcon = document.querySelector(".go-icon")
    if (searchString.length > 0)
    {
        goIcon?.classList.add("go-in")
    } else
    {
        goIcon?.classList.remove("go-in")
    }
}

searchField.addEventListener('focus', handleSearchClick);
searchField.addEventListener('blur', handleSearchReset);