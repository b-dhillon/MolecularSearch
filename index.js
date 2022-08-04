import ChemLib from './lib/ChemDoodleWeb.js';
// import logoImg from './img/logoImg.png';


let reader3d = new FileReader();
let reader2d = new FileReader();
let readerProp = new FileReader();
let molecule3d;
let molecule2d;
let size3d;
let size2d;
let searchString;

// Makes 2D & 3D canvases responsive
const mediaQuery = window.matchMedia('(min-width: 680px)')
if (mediaQuery.matches)
{
    size3d = 350;
    size2d = 300;
}
else
{
    size3d = 320;
    size2d = 225;
}

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


function Display2D()
{
    let display2D = new ChemLib.TransformCanvas('display2D', size2d, size2d, true);
    display2D.styles.atoms_HBlack_2D = false;
    display2D.styles.atoms_color = 'white';
    display2D.styles.bonds_color = "white";
    display2D.styles.atoms_font_size_2D = 8;
    display2D.styles.atoms_displayTerminalCarbonLabels_2D = true;
    display2D.styles.backgroundColor = '#259872';

    let pyridineMolFile = 'Molecule Name\n  CHEMDOOD01011121543D 0   0.00000     0.00000     0\n[Insert Comment Here]\n  6  6  0  0  0  0  0  0  0  0  1 V2000\n    0.0000    1.0000    0.0000   N 0  0  0  0  0  0  0  0  0  0  0  0\n   -0.8660    0.5000    0.0000   C 0  0  0  0  0  0  0  0  0  0  0  0\n   -0.8660   -0.5000    0.0000   C 0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -1.0000    0.0000   C 0  0  0  0  0  0  0  0  0  0  0  0\n    0.8660   -0.5000    0.0000   C 0  0  0  0  0  0  0  0  0  0  0  0\n    0.8660    0.5000    0.0000   C 0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  2  0  0  0  0\n  2  3  1  0  0  0  0\n  3  4  2  0  0  0  0\n  4  5  1  0  0  0  0\n  5  6  2  0  0  0  0\n  6  1  1  0  0  0  0\nM  END';
    let mol = ChemLib.readMOL(pyridineMolFile);
    display2D.loadMolecule(mol);
    // rotate2D.styles.atoms_font_bold_2D = true;
}

function Display3D()
{
    let display3D = new ChemLib.TransformCanvas('display3D', size3d, size3d, true);
    display3D.styles.atoms_circles_2D = true;
    display3D.styles.atoms_useJMOLColors = true;
    display3D.styles.atoms_HBlack_2D = false;
    display3D.styles.bonds_symmetrical_2D = true;
    display3D.styles.backgroundColor = '#259872';
    display3D.dragPath = [];
    display3D.oldDrag = display3D.drag;
    display3D.drag = function (e)
    {
        this.dragPath[display3D.dragPath.length] = e.p;
        this.oldDrag(e);
    }

    let pyridineMolFile = 'Molecule Name\n  CHEMDOOD01011121543D 0   0.00000     0.00000     0\n[Insert Comment Here]\n  6  6  0  0  0  0  0  0  0  0  1 V2000\n    0.0000    1.0000    0.0000   N 0  0  0  0  0  0  0  0  0  0  0  0\n   -0.8660    0.5000    0.0000   C 0  0  0  0  0  0  0  0  0  0  0  0\n   -0.8660   -0.5000    0.0000   C 0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -1.0000    0.0000   C 0  0  0  0  0  0  0  0  0  0  0  0\n    0.8660   -0.5000    0.0000   C 0  0  0  0  0  0  0  0  0  0  0  0\n    0.8660    0.5000    0.0000   C 0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  2  0  0  0  0\n  2  3  1  0  0  0  0\n  3  4  2  0  0  0  0\n  4  5  1  0  0  0  0\n  5  6  2  0  0  0  0\n  6  1  1  0  0  0  0\nM  END';
    let mol = ChemLib.readMOL(pyridineMolFile);
    display3D.loadMolecule(mol);


    // let mol = ChemLib.readMOL(_3Dmolecule);
    // display3D.loadMolecule(mol);
}

Display2D();
Display3D();