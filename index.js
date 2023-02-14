// @ts-nocheck
import Render from './render.js';

// Globals:
let reader3d = new FileReader();
let reader2d = new FileReader();
let molecule3d;
let molecule2d;
let size3d;
let size2d;
let call = 0;

// responsive canvases
const mediaQuery = window.matchMedia('(min-width: 680px)');
if (mediaQuery.matches)
{
  size2d = 300;
  size3d = 300;
}
else
{
  size2d = 250;
  size3d = 266;
}

function Display2D(_2Dmolecule)
{
  let molecule = Render.readMOL(_2Dmolecule);
  let display2D = new Render.TransformCanvas(
    'display2D',
    size2d,
    size2d,
    false
  );
  display2D.styles.atoms_HBlack_2D = false;
  display2D.styles.atoms_color = 'white';
  display2D.styles.bonds_color = 'white';
  display2D.styles.atoms_font_size_2D = 8;
  display2D.styles.atoms_displayTerminalCarbonLabels_2D = true;
  display2D.styles.backgroundColor = '#141414';
  display2D.loadMolecule(molecule);
  // display2D.styles.atoms_implicitHydrogens_2D = false;
  // let HydrogenReducer = new Render.informatics.HydrogenDeducer;
  // HydrogenReducer.removeHydrogens(molecule, false);
}

function Display3D(_3Dmolecule)
{
  let molecule = Render.readMOL(_3Dmolecule);
  let display3D = new Render.TransformCanvas('display3D', size3d, size3d, true);
  display3D.styles.compass_display = true;
  display3D.styles.atoms_circles_2D = true;
  display3D.styles.atoms_useJMOLColors = true;
  display3D.styles.bonds_color = 'white';
  display3D.styles.atoms_HBlack_2D = false;
  display3D.styles.bonds_symmetrical_2D = true;
  display3D.styles.backgroundColor = '#141414';
  display3D.dragPath = [];
  display3D.oldDrag = display3D.drag;
  display3D.drag = function (e)
  {
    this.dragPath[display3D.dragPath.length] = e.p;
    this.oldDrag(e);
  };

  display3D.loadMolecule(molecule);
}

const tableTitle = document.querySelector('.table-title');
function DisplayTable(values)
{
  tableTitle.innerHTML = values[4];
  iupacName.innerHTML = values[3];
  molecularFormula.innerHTML = values[1];
  molecularWeight.innerHTML = values[2];
  cid.innerHTML = values[0];
  // Add table title responsiveness:
  //   if (tableTitle.innerHTML.length > 10) {
  //     tableTitle.styles.fontSize = 'smaller';
  //   }
}





// Search and Logo elements:
const searchEl = document.querySelector('.search-box');
const searchField = document.querySelector('.search-field');
const logoEl = document.querySelector('.logo');
const searchBtn = document.querySelector('.go-icon');

// Table elements:
const iupacName = document.getElementById('iupac-name');
const molecularFormula = document.getElementById('molecular-formula');
const molecularWeight = document.getElementById('molecular-weight');
const cid = document.getElementById('cid');

// Event Handlers:
function handleSearchFocus()
{
  logoEl.classList.add('logo-rotate');
  searchEl.classList.add('border-searching');
}

function handleSearchBlur()
{
  searchField.blur();
  logoEl.classList.remove('logo-rotate');
  searchEl.classList.remove('border-searching');
}

function handleSearch(searchedString)
{
  if (call === 0)
  {
    call++;
    fetch(
      `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/ATP/SDF?record_type=3d`
    )
      .then((res) =>
      {
        return res.blob();
      })
      .then((data) =>
      {
        reader3d.readAsText(data);
        reader3d.onload = function ()
        {
          molecule3d = reader3d.result;
          Display3D(molecule3d);
        };
      });

    fetch(
      `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/ATP/SDF?record_type=2d`
    )
      .then((res) =>
      {
        return res.blob();
      })
      .then((data) =>
      {
        reader2d.readAsText(data);
        reader2d.onload = function ()
        {
          molecule2d = reader2d.result;
          Display2D(molecule2d);
        };
      });

    fetch(
      `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/ATP/property/Title,IUPACName,MolecularFormula,MolecularWeight/JSON`
    )
      .then((res) => res.json())
      .then((data) =>
      {
        const values = Object.values(data.PropertyTable.Properties[0]);
        DisplayTable(values);
      });
  } else
  {
    fetch(
      `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${searchedString}/SDF?record_type=3d`
    )
      .then((res) =>
      {
        return res.blob();
      })
      .then((data) =>
      {
        reader3d.readAsText(data);
        reader3d.onload = function ()
        {
          molecule3d = reader3d.result;
          Display3D(molecule3d);
        };
      });

    fetch(
      `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${searchedString}/SDF?record_type=2d`
    )
      .then((res) =>
      {
        return res.blob();
      })
      .then((data) =>
      {
        reader2d.readAsText(data);
        reader2d.onload = function ()
        {
          molecule2d = reader2d.result;
          Display2D(molecule2d);
        };
      });

    fetch(
      `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${searchedString}/property/Title,IUPACName,MolecularFormula,MolecularWeight/JSON`
    )
      .then((res) => res.json())
      .then((data) =>
      {
        const values = Object.values(data.PropertyTable.Properties[0]);
        DisplayTable(values);
      });
  }
}

async function displayDescription(moleculeInput)
{

  const apiKey = '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';
  const prompt = `Give a long scientific description of the chemical compound ${moleculeInput}`;
  // const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-003/completions';
  const apiUrl = 'https://api.openai.com/v1/engines/text-curie-001/completions';

  await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      'prompt': prompt,
      'max_tokens': 100,
      'temperature': 0.2,
    })
  })
    .then(response => response.json())
    .then(data =>
    {
      console.log(data.choices[0].text.trim());
      return data.choices[0].text.trim();
    })
    .catch(error => console.error(error));

  // return response
}


handleSearch();


function handleKeyDown(event)
{
  if (event.key === 'Enter')
  {
    event.preventDefault();
    displayDescription(searchField.value)
    handleSearch(searchField.value);
    handleSearchBlur();
  }
}

// Event Listeners
searchField.addEventListener('focus', handleSearchFocus);
searchField.addEventListener('blur', handleSearchBlur);
// searchField.addEventListener('keydown', handleKeyDown);


searchField.addEventListener('keydown', (event) =>
{
  if (event.key === 'Enter')
  {
    event.preventDefault();
    displayDescription(searchField.value);
    handleSearch(searchField.value);
    handleSearchBlur();
  }
});


searchBtn.addEventListener('click', () =>
{
  displayDescription(searchField.value);
  handleSearch(searchField.value);

});

// let pyridineMolFile = 'Molecule Name\n  CHEMDOOD01011121543D 0   0.00000     0.00000     0\n[Insert Comment Here]\n  6  6  0  0  0  0  0  0  0  0  1 V2000\n    0.0000    1.0000    0.0000   N 0  0  0  0  0  0  0  0  0  0  0  0\n   -0.8660    0.5000    0.0000   C 0  0  0  0  0  0  0  0  0  0  0  0\n   -0.8660   -0.5000    0.0000   C 0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -1.0000    0.0000   C 0  0  0  0  0  0  0  0  0  0  0  0\n    0.8660   -0.5000    0.0000   C 0  0  0  0  0  0  0  0  0  0  0  0\n    0.8660    0.5000    0.0000   C 0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  2  0  0  0  0\n  2  3  1  0  0  0  0\n  3  4  2  0  0  0  0\n  4  5  1  0  0  0  0\n  5  6  2  0  0  0  0\n  6  1  1  0  0  0  0\nM  END';
// let mol = ChemLib.readMOL(pyridineMolFile);
// display2D.loadMolecule(mol);
// rotate2D.styles.atoms_font_bold_2D = true;

// let pyridineMolFile = 'Molecule Name\n  CHEMDOOD01011121543D 0   0.00000     0.00000     0\n[Insert Comment Here]\n  6  6  0  0  0  0  0  0  0  0  1 V2000\n    0.0000    1.0000    0.0000   N 0  0  0  0  0  0  0  0  0  0  0  0\n   -0.8660    0.5000    0.0000   C 0  0  0  0  0  0  0  0  0  0  0  0\n   -0.8660   -0.5000    0.0000   C 0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -1.0000    0.0000   C 0  0  0  0  0  0  0  0  0  0  0  0\n    0.8660   -0.5000    0.0000   C 0  0  0  0  0  0  0  0  0  0  0  0\n    0.8660    0.5000    0.0000   C 0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  2  0  0  0  0\n  2  3  1  0  0  0  0\n  3  4  2  0  0  0  0\n  4  5  1  0  0  0  0\n  5  6  2  0  0  0  0\n  6  1  1  0  0  0  0\nM  END';
// let mol = ChemLib.readMOL(pyridineMolFile);
// display3D.loadMolecule(mol);
