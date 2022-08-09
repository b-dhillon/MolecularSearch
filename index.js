import ChemLib from './lib/ChemDoodleWeb.js';

let reader3d = new FileReader();
let reader2d = new FileReader();
let molecule3d;
let molecule2d;
let size3d;
let size2d;




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

// EXPORT THESE!!
function Display2D(_2Dmolecule)
{
    let display2D = new ChemLib.TransformCanvas('display2D', size2d, size2d, true);
    display2D.styles.atoms_HBlack_2D = false;
    display2D.styles.atoms_color = 'white';
    display2D.styles.bonds_color = "white";
    display2D.styles.atoms_font_size_2D = 8;
    display2D.styles.atoms_displayTerminalCarbonLabels_2D = true;
    display2D.styles.backgroundColor = '#259872';

    // let pyridineMolFile = 'Molecule Name\n  CHEMDOOD01011121543D 0   0.00000     0.00000     0\n[Insert Comment Here]\n  6  6  0  0  0  0  0  0  0  0  1 V2000\n    0.0000    1.0000    0.0000   N 0  0  0  0  0  0  0  0  0  0  0  0\n   -0.8660    0.5000    0.0000   C 0  0  0  0  0  0  0  0  0  0  0  0\n   -0.8660   -0.5000    0.0000   C 0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -1.0000    0.0000   C 0  0  0  0  0  0  0  0  0  0  0  0\n    0.8660   -0.5000    0.0000   C 0  0  0  0  0  0  0  0  0  0  0  0\n    0.8660    0.5000    0.0000   C 0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  2  0  0  0  0\n  2  3  1  0  0  0  0\n  3  4  2  0  0  0  0\n  4  5  1  0  0  0  0\n  5  6  2  0  0  0  0\n  6  1  1  0  0  0  0\nM  END';
    // let mol = ChemLib.readMOL(pyridineMolFile);
    // display2D.loadMolecule(mol);
    // rotate2D.styles.atoms_font_bold_2D = true;

    let mol = ChemLib.readMOL(_2Dmolecule);
    display2D.loadMolecule(mol);
}

function Display3D(_3Dmolecule)
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

    // let pyridineMolFile = 'Molecule Name\n  CHEMDOOD01011121543D 0   0.00000     0.00000     0\n[Insert Comment Here]\n  6  6  0  0  0  0  0  0  0  0  1 V2000\n    0.0000    1.0000    0.0000   N 0  0  0  0  0  0  0  0  0  0  0  0\n   -0.8660    0.5000    0.0000   C 0  0  0  0  0  0  0  0  0  0  0  0\n   -0.8660   -0.5000    0.0000   C 0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -1.0000    0.0000   C 0  0  0  0  0  0  0  0  0  0  0  0\n    0.8660   -0.5000    0.0000   C 0  0  0  0  0  0  0  0  0  0  0  0\n    0.8660    0.5000    0.0000   C 0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  2  0  0  0  0\n  2  3  1  0  0  0  0\n  3  4  2  0  0  0  0\n  4  5  1  0  0  0  0\n  5  6  2  0  0  0  0\n  6  1  1  0  0  0  0\nM  END';
    // let mol = ChemLib.readMOL(pyridineMolFile);
    // display3D.loadMolecule(mol);


    let mol = ChemLib.readMOL(_3Dmolecule);
    display3D.loadMolecule(mol);
}

// Selected elements:
const searchEl = document.querySelector(".search-box");
const searchField = document.querySelector(".search-field2");
const si = document.querySelector(".search-icon");
const logoEl = document.querySelector(".logo");
const goIcon = document.querySelector(".go-icon");

const searchBtn = document.querySelector(".searchBtn")
console.log(searchBtn);

// Table elements: 
const tableTitle = document.querySelector(".table-title");
const iupacName = document.getElementById("iupac-name");
const molecularFormula = document.getElementById("molecular-formula");
const molecularWeight = document.getElementById("molecular-weight")
const cid = document.getElementById("cid")





// Event Handlers:
function handleSearchFocus()
{
    searchEl?.classList.add("border-searching");
    // si?.classList.add("si-rotate")
    logoEl?.classList.add("logo-rotate")
    // goIcon?.classList.add("go-in")
}

function handleSearchBlur()
{
    searchEl?.classList.remove("border-searching");
    // si?.classList.remove("si-rotate");
    logoEl?.classList.remove("logo-rotate")
    // goIcon?.classList.remove("go-in")
}

function handleGo()
{
    if (searchField.value.length > 1)
    {
        goIcon?.classList.add("go-in")
    } else
    {
        goIcon?.classList.remove("go-in")
    }
}

function handleKeyDown(event)
{
    console.log('User pressed: ', event.key);
    if (event.key === 'Enter')
    {
        event.preventDefault();
        console.log(searchField.value);

        // console.log(searchField.value);
        handleSearch(searchField.value);
    }
};



function handleSearch(searchedString)
{
    fetch(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${searchedString}/SDF?record_type=3d`)
        .then(res => { return res.blob() })
        .then(data =>
        {
            reader3d.readAsText(data);
            reader3d.onload = function ()
            {
                molecule3d = reader3d.result;
                // console.log(molecule);
                Display3D(molecule3d);
            };
        })

    fetch(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${searchedString}/SDF?record_type=2d`)
        .then(res => { return res.blob() })
        .then(data =>
        {
            reader2d.readAsText(data);
            reader2d.onload = function ()
            {
                molecule2d = reader2d.result;
                // console.log(molecule);
                Display2D(molecule2d);
            };
        })

    // fetch(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${searchedString}/property/Title,IUPACName,MolecularFormula,MolecularWeight/JSON`)
    //     .then(res => res.json())
    //     .then(data =>
    //     {
    //         const values = Object.values(data.PropertyTable.Properties[0]);
    //         DisplayTable(values);
    //         // tableTitle.innerHTML = values[4];
    //         // console.log(values);
    //     })
}

function DisplayTable(values)
{
    console.log(values);
    tableTitle.innerHTML = values[4];
    iupacName.innerHTML = values[3];
    molecularFormula.innerHTML = values[1];
    molecularWeight.innerHTML = values[2];
    cid.innerHTML = values[0]
}

// searchField.addEventListener('focus', handleSearchFocus);
// searchField.addEventListener('blur', handleSearchBlur);
searchField.addEventListener('keydown', handleKeyDown);
searchBtn.addEventListener('click', () => handleSearch(searchField.value));
// searchBtn.addEventListener('click', handleKeyDown);


console.log(searchField);

// goIcon.addEventListener('click', () => handleSearch(searchField.value));

function handleSearchBtn(event)
{
    // event.preventDefault();
    // alert(searchField.value);
    // handleSearch(searchField.value);
    tableTitle.innerHTML = 'Worked!'

}


searchBtn.addEventListener('touchend', handleSearchBtn)

// Display2D();
// Display3D();

