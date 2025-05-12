document.addEventListener('DOMContentLoaded', () => {
    const periodicTableContainer = document.getElementById('periodic-table-container');
    const inputSpot1 = document.getElementById('input1');
    const inputSpot2 = document.getElementById('input2');
    const resultSpot = document.getElementById('result');
    const clearButton = document.getElementById('clear-button');
    const compoundInfoText = document.getElementById('compound-info-text');

    // Elements go here
    const elements = [
        { "number": 1, "symbol": "H", "name": "Hydrogen", "category": "nonmetal", "xpos": 1, "ypos": 1 },
        { "number": 2, "symbol": "He", "name": "Helium", "category": "noble-gas", "xpos": 18, "ypos": 1 },
        { "number": 3, "symbol": "Li", "name": "Lithium", "category": "alkali-metal", "xpos": 1, "ypos": 2 },
        { "number": 4, "symbol": "Be", "name": "Beryllium", "category": "alkaline-earth-metal", "xpos": 2, "ypos": 2 },
        { "number": 5, "symbol": "B", "name": "Boron", "category": "metalloid", "xpos": 13, "ypos": 2 },
        { "number": 6, "symbol": "C", "name": "Carbon", "category": "nonmetal", "xpos": 14, "ypos": 2 },
        { "number": 7, "symbol": "N", "name": "Nitrogen", "category": "nonmetal", "xpos": 15, "ypos": 2 },
        { "number": 8, "symbol": "O", "name": "Oxygen", "category": "nonmetal", "xpos": 16, "ypos": 2 },
        { "number": 9, "symbol": "F", "name": "Fluorine", "category": "nonmetal", "xpos": 17, "ypos": 2 },
        { "number": 10, "symbol": "Ne", "name": "Neon", "category": "noble-gas", "xpos": 18, "ypos": 2 },
        { "number": 11, "symbol": "Na", "name": "Sodium", "category": "alkali-metal", "xpos": 1, "ypos": 3 },
        { "number": 12, "symbol": "Mg", "name": "Magnesium", "category": "alkaline-earth-metal", "xpos": 2, "ypos": 3 },
        { "number": 13, "symbol": "Al", "name": "Aluminum", "category": "post-transition-metal", "xpos": 13, "ypos": 3 },
        { "number": 14, "symbol": "Si", "name": "Silicon", "category": "metalloid", "xpos": 14, "ypos": 3 },
        { "number": 15, "symbol": "P", "name": "Phosphorus", "category": "nonmetal", "xpos": 15, "ypos": 3 },
        { "number": 16, "symbol": "S", "name": "Sulfur", "category": "nonmetal", "xpos": 16, "ypos": 3 },
        { "number": 17, "symbol": "Cl", "name": "Chlorine", "category": "nonmetal", "xpos": 17, "ypos": 3 },
        { "number": 18, "symbol": "Ar", "name": "Argon", "category": "noble-gas", "xpos": 18, "ypos": 3 },
        { "number": 19, "symbol": "K", "name": "Potassium", "category": "alkali-metal", "xpos": 1, "ypos": 4 },
        { "number": 20, "symbol": "Ca", "name": "Calcium", "category": "alkaline-earth-metal", "xpos": 2, "ypos": 4 },
        { "number": 21, "symbol": "Sc", "name": "Scandium", "category": "transition-metal", "xpos": 3, "ypos": 4 },
        { "number": 22, "symbol": "Ti", "name": "Titanium", "category": "transition-metal", "xpos": 4, "ypos": 4 },
        { "number": 23, "symbol": "V", "name": "Vanadium", "category": "transition-metal", "xpos": 5, "ypos": 4 },
        { "number": 24, "symbol": "Cr", "name": "Chromium", "category": "transition-metal", "xpos": 6, "ypos": 4 },
        { "number": 25, "symbol": "Mn", "name": "Manganese", "category": "transition-metal", "xpos": 7, "ypos": 4 },
        { "number": 26, "symbol": "Fe", "name": "Iron", "category": "transition-metal", "xpos": 8, "ypos": 4 },
        { "number": 27, "symbol": "Co", "name": "Cobalt", "category": "transition-metal", "xpos": 9, "ypos": 4 },
        { "number": 28, "symbol": "Ni", "name": "Nickel", "category": "transition-metal", "xpos": 10, "ypos": 4 },
        { "number": 29, "symbol": "Cu", "name": "Copper", "category": "transition-metal", "xpos": 11, "ypos": 4 },
        { "number": 30, "symbol": "Zn", "name": "Zinc", "category": "transition-metal", "xpos": 12, "ypos": 4 },
        { "number": 31, "symbol": "Ga", "name": "Gallium", "category": "post-transition-metal", "xpos": 13, "ypos": 4 },
        { "number": 32, "symbol": "Ge", "name": "Germanium", "category": "metalloid", "xpos": 14, "ypos": 4 },
        { "number": 33, "symbol": "As", "name": "Arsenic", "category": "metalloid", "xpos": 15, "ypos": 4 },
        { "number": 34, "symbol": "Se", "name": "Selenium", "category": "nonmetal", "xpos": 16, "ypos": 4 },
        { "number": 35, "symbol": "Br", "name": "Bromine", "category": "nonmetal", "xpos": 17, "ypos": 4 },
        { "number": 36, "symbol": "Kr", "name": "Krypton", "category": "noble-gas", "xpos": 18, "ypos": 4 },
        { "number": 37, "symbol": "Rb", "name": "Rubidium", "category": "alkali-metal", "xpos": 1, "ypos": 5 },
        { "number": 38, "symbol": "Sr", "name": "Strontium", "category": "alkaline-earth-metal", "xpos": 2, "ypos": 5 },
        { "number": 39, "symbol": "Y", "name": "Yttrium", "category": "transition-metal", "xpos": 3, "ypos": 5 },
        { "number": 40, "symbol": "Zr", "name": "Zirconium", "category": "transition-metal", "xpos": 4, "ypos": 5 },
        { "number": 41, "symbol": "Nb", "name": "Niobium", "category": "transition-metal", "xpos": 5, "ypos": 5 },
        { "number": 42, "symbol": "Mo", "name": "Molybdenum", "category": "transition-metal", "xpos": 6, "ypos": 5 },
        { "number": 43, "symbol": "Tc", "name": "Technetium", "category": "transition-metal", "xpos": 7, "ypos": 5 },
        { "number": 44, "symbol": "Ru", "name": "Ruthenium", "category": "transition-metal", "xpos": 8, "ypos": 5 },
        { "number": 45, "symbol": "Rh", "name": "Rhodium", "category": "transition-metal", "xpos": 9, "ypos": 5 },
        { "number": 46, "symbol": "Pd", "name": "Palladium", "category": "transition-metal", "xpos": 10, "ypos": 5 },
        { "number": 47, "symbol": "Ag", "name": "Silver", "category": "transition-metal", "xpos": 11, "ypos": 5 },
        { "number": 48, "symbol": "Cd", "name": "Cadmium", "category": "transition-metal", "xpos": 12, "ypos": 5 },
        { "number": 49, "symbol": "In", "name": "Indium", "category": "post-transition-metal", "xpos": 13, "ypos": 5 },
        { "number": 50, "symbol": "Sn", "name": "Tin", "category": "post-transition-metal", "xpos": 14, "ypos": 5 },
        { "number": 51, "symbol": "Sb", "name": "Antimony", "category": "metalloid", "xpos": 15, "ypos": 5 },
        { "number": 52, "symbol": "Te", "name": "Tellurium", "category": "metalloid", "xpos": 16, "ypos": 5 },
        { "number": 53, "symbol": "I", "name": "Iodine", "category": "nonmetal", "xpos": 17, "ypos": 5 },
        { "number": 54, "symbol": "Xe", "name": "Xenon", "category": "noble-gas", "xpos": 18, "ypos": 5 },
        { "number": 55, "symbol": "Cs", "name": "Cesium", "category": "alkali-metal", "xpos": 1, "ypos": 6 },
        { "number": 56, "symbol": "Ba", "name": "Barium", "category": "alkaline-earth-metal", "xpos": 2, "ypos": 6 },
        { "number": 72, "symbol": "Hf", "name": "Hafnium", "category": "transition-metal", "xpos": 4, "ypos": 6 },
        { "number": 73, "symbol": "Ta", "name": "Tantalum", "category": "transition-metal", "xpos": 5, "ypos": 6 },
        { "number": 74, "symbol": "W", "name": "Tungsten", "category": "transition-metal", "xpos": 6, "ypos": 6 },
        { "number": 75, "symbol": "Re", "name": "Rhenium", "category": "transition-metal", "xpos": 7, "ypos": 6 },
        { "number": 76, "symbol": "Os", "name": "Osmium", "category": "transition-metal", "xpos": 8, "ypos": 6 },
        { "number": 77, "symbol": "Ir", "name": "Iridium", "category": "transition-metal", "xpos": 9, "ypos": 6 },
        { "number": 78, "symbol": "Pt", "name": "Platinum", "category": "transition-metal", "xpos": 10, "ypos": 6 },
        { "number": 79, "symbol": "Au", "name": "Gold", "category": "transition-metal", "xpos": 11, "ypos": 6 },
        { "number": 80, "symbol": "Hg", "name": "Mercury", "category": "transition-metal", "xpos": 12, "ypos": 6 },
        { "number": 81, "symbol": "Tl", "name": "Thallium", "category": "post-transition-metal", "xpos": 13, "ypos": 6 },
        { "number": 82, "symbol": "Pb", "name": "Lead", "category": "post-transition-metal", "xpos": 14, "ypos": 6 },
        { "number": 83, "symbol": "Bi", "name": "Bismuth", "category": "post-transition-metal", "xpos": 15, "ypos": 6 },
        { "number": 84, "symbol": "Po", "name": "Polonium", "category": "metalloid", "xpos": 16, "ypos": 6 },
        { "number": 85, "symbol": "At", "name": "Astatine", "category": "metalloid", "xpos": 17, "ypos": 6 },
        { "number": 86, "symbol": "Rn", "name": "Radon", "category": "noble-gas", "xpos": 18, "ypos": 6 },
        { "number": 87, "symbol": "Fr", "name": "Francium", "category": "alkali-metal", "xpos": 1, "ypos": 7 },
        { "number": 88, "symbol": "Ra", "name": "Radium", "category": "alkaline-earth-metal", "xpos": 2, "ypos": 7 },
        { "number": 104, "symbol": "Rf", "name": "Rutherfordium", "category": "transition-metal", "xpos": 4, "ypos": 7 },
        { "number": 105, "symbol": "Db", "name": "Dubnium", "category": "transition-metal", "xpos": 5, "ypos": 7 },
        { "number": 106, "symbol": "Sg", "name": "Seaborgium", "category": "transition-metal", "xpos": 6, "ypos": 7 },
        { "number": 107, "symbol": "Bh", "name": "Bohrium", "category": "transition-metal", "xpos": 7, "ypos": 7 },
        { "number": 108, "symbol": "Hs", "name": "Hassium", "category": "transition-metal", "xpos": 8, "ypos": 7 },
        { "number": 109, "symbol": "Mt", "name": "Meitnerium", "category": "transition-metal", "xpos": 9, "ypos": 7 },
        { "number": 110, "symbol": "Ds", "name": "Darmstadtium", "category": "transition-metal", "xpos": 10, "ypos": 7 },
        { "number": 111, "symbol": "Rg", "name": "Roentgenium", "category": "transition-metal", "xpos": 11, "ypos": 7 },
        { "number": 112, "symbol": "Cn", "name": "Copernicium", "category": "transition-metal", "xpos": 12, "ypos": 7 },
        { "number": 113, "symbol": "Nh", "name": "Nihonium", "category": "post-transition-metal", "xpos": 13, "ypos": 7 },
        { "number": 114, "symbol": "Fl", "name": "Flerovium", "category": "post-transition-metal", "xpos": 14, "ypos": 7 },
        { "number": 115, "symbol": "Mc", "name": "Moscovium", "category": "post-transition-metal", "xpos": 15, "ypos": 7 },
        { "number": 116, "symbol": "Lv", "name": "Livermorium", "category": "post-transition-metal", "xpos": 16, "ypos": 7 },
        { "number": 117, "symbol": "Ts", "name": "Tennessine", "category": "metalloid", "xpos": 17, "ypos": 7 },
        { "number": 118, "symbol": "Og", "name": "Oganesson", "category": "noble-gas", "xpos": 18, "ypos": 7 }
    ];

    // Compounds go here
     const compounds = [
        { elements: ["H", "O"], info: "H₂O - Water\nA vital substance for all known forms of life.", formula: "H₂O" },
        { elements: ["Na", "Cl"], info: "NaCl - Sodium Chloride\nCommonly known as table salt.", formula: "NaCl" },
        { elements: ["C", "O"], info: "CO₂ - Carbon Dioxide\nA greenhouse gas, essential for photosynthesis.", formula: "CO₂" },
        { elements: ["H", "Cl"], info: "HCl - Hydrogen Chloride\nA strong acid, also known as hydrochloric acid.", formula: "HCl" },
        { elements: ["N", "H"], info: "NH₃ - Ammonia\nA colorless gas with a pungent smell, used in fertilizers.", formula: "NH₃" },
        { elements: ["S", "O"], info: "SO₂ - Sulfur Dioxide\nA toxic gas with a pungent odor, a major air pollutant.", formula: "SO₂" },
        { elements: ["C", "H"], info: "CH₄ - Methane\nThe main component of natural gas.", formula: "CH₄" },
        { elements: ["Na", "O"], info: "Na₂O - Sodium Oxide\nA solid white compound.", formula: "Na₂O" },
        { elements: ["N", "O"], info: "N₂O - Nitrous Oxide\nAlso known as \"laughing gas\", a powerful anaesthetic.", formula: "N₂O" },
    ];


    let draggedElement = null;
    let input1Symbol = null;
    let input2Symbol = null;

    elements.forEach(element => {
        const elementDiv = document.createElement('div');
        elementDiv.classList.add('element', element.category);
        elementDiv.setAttribute('draggable', true);
        elementDiv.style.gridColumnStart = element.xpos;
        elementDiv.style.gridRowStart = element.ypos;
        elementDiv.dataset.symbol = element.symbol;
        elementDiv.dataset.name = element.name;
        elementDiv.dataset.number = element.number;
        elementDiv.dataset.category = element.category;


        elementDiv.innerHTML = `
            <div class="atomic-number">${element.number}</div>
            <div class="symbol">${element.symbol}</div>
            <div class="name">${element.name}</div>
        `;

        periodicTableContainer.appendChild(elementDiv);
    });

    // Drag and Drop
    periodicTableContainer.addEventListener('dragstart', (event) => {
        draggedElement = event.target.closest('.element');
        if (!draggedElement) return;

        event.dataTransfer.effectAllowed = 'copy'; // Change effectAllowed to 'copy'
        event.dataTransfer.setData('text/plain', draggedElement.dataset.symbol);
        // Also transfer element data for displaying in input spots
        event.dataTransfer.setData('text/element-symbol', draggedElement.dataset.symbol);
        event.dataTransfer.setData('text/element-name', draggedElement.dataset.name);
        event.dataTransfer.setData('text/element-number', draggedElement.dataset.number);
        event.dataTransfer.setData('text/element-category', draggedElement.dataset.category);


        setTimeout(() => {
            draggedElement.classList.add('dragging');
        }, 0);
    });

    periodicTableContainer.addEventListener('dragover', (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy'; // Change dropEffect to 'copy'
    });

     periodicTableContainer.addEventListener('dragend', () => {
        if (draggedElement) {
            draggedElement.classList.remove('dragging');
            draggedElement = null;
        }
    });


    const inputSpots = document.querySelectorAll('.input-spot');

    inputSpots.forEach(spot => {
        spot.addEventListener('dragover', (event) => {
            event.preventDefault();
            event.dataTransfer.dropEffect = 'copy';
            spot.style.borderColor = '#4CAF50';
        });

        spot.addEventListener('dragleave', (event) => {
             if (!spot.classList.contains('filled')) {
                spot.style.borderColor = '#ccc';
             }
        });

        spot.addEventListener('drop', (event) => {
            event.preventDefault();
             if (!spot.classList.contains('filled')) {
                spot.style.borderColor = '#ccc';
             }


            const symbol = event.dataTransfer.getData('text/element-symbol');
            const name = event.dataTransfer.getData('text/element-name');
            const number = event.dataTransfer.getData('text/element-number');
            const category = event.dataTransfer.getData('text/element-category');

            // Clear previous content and classes
            spot.innerHTML = "";
            const allCategoryClasses = elements.map(el => el.category);
            spot.classList.remove('filled', ...allCategoryClasses);

            // Display the dropped element's info in the input spot
            spot.innerHTML = `
                <div class="atomic-number">${number}</div>
                <div class="symbol">${symbol}</div>
                <div class="name">${name}</div>
            `;
            spot.classList.add('filled');
            spot.classList.add(category); // Add category class for styling

            if (spot.id === 'input1') {
                input1Symbol = symbol;
            } else if (spot.id === 'input2') {
                input2Symbol = symbol;
            }

            checkForCompound();
        });
    });

    // Compound Checking Logic
    function checkForCompound() {
        if (input1Symbol && input2Symbol) {
            if (input1Symbol === input2Symbol) { //This is just because two same elements mess up the logic
            foundCompound = undefined;
            }
            else {
                const foundCompound = compounds.find(compound =>
                    compound.elements.includes(input1Symbol) && compound.elements.includes(input2Symbol) && compound.elements.length === 2 // Ensure only two elements are involved
                );

                if (foundCompound) {
                    resultSpot.innerHTML = `
                        <div class="symbol">${foundCompound.formula}</div>
                        <div class="name">${foundCompound.info.split('\n')[0].split(' - ')[1]}</div>
                    `; // Display formula and basic name
                    resultSpot.style.backgroundColor = '#C8E6C9'; // Light green for success
                    compoundInfoText.textContent = foundCompound.info; // Display full info in the info box
                } else {
                    resultSpot.innerHTML = "?";
                    resultSpot.style.backgroundColor = '#FFCDD2'; // Light red for no compound
                    compoundInfoText.textContent = "No known compound formed from this combination in our list."; // Update info box
                }               
            }
        } else {
            resultSpot.innerHTML = "?";
             resultSpot.style.backgroundColor = '#ddd'; // Default color
             compoundInfoText.textContent = "Drop two elements into the spots above to see if they form a compound."; // Update info box
        }
    }

    clearButton.addEventListener('click', () => {
        inputSpot1.innerHTML = "";
        inputSpot2.innerHTML = "";
        const allCategoryClasses = elements.map(el => el.category);
        inputSpot1.classList.remove('filled', ...allCategoryClasses);
        inputSpot2.classList.remove('filled', ...allCategoryClasses);

        inputSpot1.style.borderColor = '#ccc';
        inputSpot2.style.borderColor = '#ccc';

        resultSpot.innerHTML = "?";
        resultSpot.style.backgroundColor = '#ddd';

        compoundInfoText.textContent = "Drop two elements into the spots above to see if they form a compound.";

        input1Symbol = null;
        input2Symbol = null;
    });


    document.body.addEventListener('dragover', (event) => {
        event.preventDefault();
    });


    document.body.addEventListener('drop', (event) => {
        event.preventDefault();
    });
});