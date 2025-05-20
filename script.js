document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const periodicTableContainer = document.getElementById('periodic-table-container');
    const inputSpot1 = document.getElementById('input1');
    const inputSpot2 = document.getElementById('input2');
    const resultSpot = document.getElementById('result');
    const clearButton = document.getElementById('clear-button');
    const compoundInfoText = document.getElementById('compound-info-text'); // Repurposed for feedback

    // New Game Elements
    const startScreen = document.querySelector('.start-screen');
    const playButton = document.getElementById('play-button');
    const gameContainer = document.querySelector('.game-container');
    const timerDisplay = document.getElementById('timer-display');
    const scoreDisplay = document.getElementById('score-display');
    const characterImage = document.getElementById('character-image');
    const hintText = document.getElementById('hint-text');
    const scorePopup = document.querySelector('.score-popup');
    const finalScoreDisplay = document.getElementById('final-score');
    const playAgainButton = document.getElementById('play-again-button');
    const searchInput = document.getElementById('element-search');
    const homeButton = document.getElementById('home-button');
    const toggleHints = document.getElementById('toggle-hints');        
    const musicToggle = document.getElementById('music-toggle');
    const gameAudio = document.getElementById('game-audio');
    const volumeSlider = document.getElementById('volume-slider');
    const volumeInline = document.getElementById('volume-inline');
    const darkModeToggle = document.getElementById('dark-mode-toggle');

    //Sounds and stuff
    const dropSound = new Audio('drop.mp3');
    const correctAns = new Audio('correct.mp3');
    const wrongAns = new Audio('wrong.mp3');
    const clap = new Audio('clap.mp3');

    // --- Game State Variables ---
    let timerInterval = null;
    let gameActive = false; // To control game flow
    let currentChallenge = null; // Stores the compound the player needs to form
    let shuffledCompounds = []; // Array to hold compounds in a random order
    let currentChallengeIndex = 0; // Index to track the current challenge in the shuffled list
    let currentStrikes = 0; // Track incorrect attempts for the current challenge
    let hintsEnabled = true; // default state
    let musicPlaying = false;

    let draggedElement = null;
    let input1Symbol = null;
    let input2Symbol = null;

    // Player name & leaderboard
    let playerName = "----";
    let leaderboard = JSON.parse(localStorage.getItem('leaderboard') || '[]');

    // --- Data (Periodic Table and Compounds) ---
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

       const compounds = [
        { elements: ["H", "O"], info: "In its liquid form, animals need it to live.", explicitHint: "70% of the planet is covered in it.", formula: "H₂O" },
        { elements: ["Na", "Cl"], info: "It's the main ingredient of table salt.", explicitHint: "Both elements are in the third row.", formula: "NaCl" },
        { elements: ["C", "O"], info: "Plants breathe it in, we breathe it out.", explicitHint: "It's the opposite of oxygen, in a way.", formula: "CO₂" },
        { elements: ["H", "Cl"], info: "A strong acid found in your stomach.", explicitHint: "The strongest acid, but it can't melt plastic.", formula: "HCl" },
        { elements: ["N", "H"], info: "Has a very strong smell and is used in cleaning products.", explicitHint: "Mixing it with bleach creates a deadly gas.", formula: "NH₃" },
        { elements: ["S", "O"], info: "A key component of acid rain.", explicitHint: "It smells like spoiled eggs.", formula: "SO₂" },
        { elements: ["C", "H"], info: "The primary component of natural gas.", explicitHint: "Cows produce it, and it creates the greenhouse effect.", formula: "CH₄" },
        { elements: ["Na", "O"], info: "Used to make glasses.", explicitHint: "Also fertilizer.", formula: "Na₂O" },
        { elements: ["N", "O"], info: "A powerful anaesthetic.", explicitHint: "Also known as \"laughing gas\".", formula: "N₂O" },
        { elements: ["Ag", "I"], info: "It was used in the first photographic machines.", explicitHint: "It can also make clouds rain.", formula: "AgI" },
        { elements: ["K", "Br"], info: "It can cure dogs from epilepsy.", explicitHint: "Usually in the form of a white powder.", formula: "UO₂" },
    ];

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
        return array;
    }


    // --- Initialization ---
    // Render the periodic table on load
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


    // Initially show the start screen and hide the game
    startScreen.classList.remove('hidden');
    gameContainer.classList.add('hidden');
    scorePopup.classList.add('hidden');

    

    homeButton.addEventListener('click', (e) => {
        e.preventDefault();

        // Show start screen
        startScreen.classList.remove('hidden');

        // Hide game and score popup
        gameContainer.classList.add('hidden');
        scorePopup.classList.add('hidden');

        // Stop the timer if running
        clearInterval(timerInterval);
        gameActive = false;
      
        // Optional: reset timer display
        timerDisplay.textContent = 'Time: 0s';
        scoreDisplay.textContent = 'Score: 0';

        // Optional: reset feedback text
        compoundInfoText.textContent = 'Drop two elements into the spots above.';
        });

    // --- Game Functions ---

    function startGame() {
        gameAudio.play();
        musicPlaying = !musicPlaying;
        score = 0;
        timeLeft = 90; // Reset timer
        gameActive = true; // Set game state
        scoreDisplay.textContent = `Score: ${score}`;
        updateTimerDisplay();

        // Shuffle the compounds at the start of a new game
        shuffledCompounds = shuffleArray([...compounds]); // Create a copy to avoid modifying original
        currentChallengeIndex = 0; // Start with the first compound in the shuffled list
        currentStrikes = 0; // Reset strikes for the new game


        // Hide start screen, show game container
        startScreen.classList.add('hidden');
        scorePopup.classList.add('hidden'); // Ensure popup is hidden
        gameContainer.classList.remove('hidden');

        startTimer();
        presentNewChallenge();
    }

    function endGame() {
     gameAudio.pause();
     clap.play();
     gameActive = false; // Set game state
     clearInterval(timerInterval); // Stop the timer
     // Save to leaderboard
     leaderboard.push({ 
        name: playerName, 
        score: score,
        date: new Date().toLocaleDateString() // Optional: add timestamp
     });
    
     // Sort and keep top 5 scores
     leaderboard.sort((a, b) => b.score - a.score);
     leaderboard = leaderboard.slice(0, 5);
     localStorage.setItem('leaderboard', JSON.stringify(leaderboard));

     // Update UI
     finalScoreDisplay.textContent = `Your final score: ${score}`;
     gameContainer.classList.add('hidden');
     scorePopup.classList.remove('hidden');
    
     // Reset game elements
     clearInputSpots();
     compoundInfoText.textContent = "Game Over!";
     resultSpot.innerHTML = "?";
     resultSpot.style.backgroundColor = '#ddd';
     resultSpot.classList.remove('correct', 'incorrect');

     // Render leaderboard
     renderLeaderboard();
    }

    function startTimer() {
        timerInterval = setInterval(() => {
            timeLeft--;
            updateTimerDisplay();

            if (timeLeft <= 0) {
                endGame();
            }
        }, 1000); // Update every 1 second
    }

    function updateTimerDisplay() {
        timerDisplay.textContent = `Time: ${timeLeft}s`;
         // Optional: Add styling for low time
         if (timeLeft <= 10) {
             timerDisplay.style.color = 'red';
         } else {
             timerDisplay.style.color = ''; // Reset to default
         }
    }

    function presentNewChallenge() {
        // Reset strikes for the new challenge
        currentStrikes = 0;

        // Clear previous input and feedback
        clearInputSpots();
        resultSpot.innerHTML = "?";
        resultSpot.style.backgroundColor = '#ddd';
        resultSpot.classList.remove('correct', 'incorrect');
        compoundInfoText.textContent = "Drag and drop the two elements here."; // Default feedback

        // Get the next compound from the shuffled list
        if (currentChallengeIndex < shuffledCompounds.length) {
            currentChallenge = shuffledCompounds[currentChallengeIndex];
            currentChallengeIndex++; // Move to the next index for the next challenge
        } else {
             // If we run out of unique challenges, end the game
             endGame();
             return; // Stop if game ended
        }


        // Update the character image (using placeholder or static for now)
        characterImage.src = "papa.png"; // Update this if you have character images

        // Display the initial hint

        hintText.textContent = currentChallenge.info;

        }

    function clearInputSpots() {
         inputSpot1.innerHTML = "";
         inputSpot2.innerHTML = "";
         const allCategoryClasses = elements.map(el => el.category);
         inputSpot1.classList.remove('filled', 'correct', 'incorrect', ...allCategoryClasses);
         inputSpot2.classList.remove('filled', 'correct', 'incorrect', ...allCategoryClasses);

         inputSpot1.style.borderColor = '#ccc'; // Reset border color
         inputSpot2.style.borderColor = '#ccc'; // Reset border color

         input1Symbol = null;
         input2Symbol = null;
    }

    
    function renderLeaderboard() {
    const list = document.getElementById('leaderboard-list');
    list.innerHTML = '';
    leaderboard.forEach((entry, index) => {
        const trophy = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '';
        const li = document.createElement('li');
        li.textContent = `${trophy} ${entry.name} - ${entry.score}`;
        list.appendChild(li);
    });
}

    function showFeedback(isCorrect) {
    const checkerBox = document.getElementById('compound-info-box');
    if (!checkerBox) return;

    checkerBox.classList.add(isCorrect ? 'glow-correct' : 'glow-wrong');

    setTimeout(() => {
        checkerBox.classList.remove('glow-correct');
        checkerBox.classList.remove('glow-wrong');
    }, 1000); // 1 second glow
}



    // --- Drag and Drop Handlers ---

    // Handler for when dragging starts on an element
    periodicTableContainer.addEventListener('dragstart', (event) => {
        if (!gameActive) return; // Only allow dragging if game is active

        draggedElement = event.target.closest('.element');
        if (!draggedElement) return; // Ensure a valid element is being dragged
        draggedElement.classList.remove('glow-highlight');

        event.dataTransfer.effectAllowed = 'copy';
        // Set dataTransfer data - includes symbol, name, number, category
        event.dataTransfer.setData('text/plain', draggedElement.dataset.symbol); // Fallback/compatibility
        event.dataTransfer.setData('text/element-symbol', draggedElement.dataset.symbol);
        event.dataTransfer.setData('text/element-name', draggedElement.dataset.name);
        event.dataTransfer.setData('text/element-number', draggedElement.dataset.number);
        event.dataTransfer.setData('text/element-category', draggedElement.dataset.category);

        // Add a class for styling while dragging (optional, for visual feedback)
        setTimeout(() => {
            if(draggedElement) draggedElement.classList.add('dragging');
        }, 0);
    });

    // Handler for drag over the periodic table container (can keep this basic one)
    periodicTableContainer.addEventListener('dragover', (event) => {
        if (!gameActive) return;
        event.preventDefault(); // Necessary to allow dropping within the container (though drops are handled by spots)
    });

     // Handler for when dragging ends (regardless of where it's dropped)
     periodicTableContainer.addEventListener('dragend', () => {
        if (draggedElement) {
            draggedElement.classList.remove('dragging');
            draggedElement = null;
        }
    });


    const inputSpots = document.querySelectorAll('.input-spot');

    inputSpots.forEach(spot => {
        // Handler for drag over an input spot - allows dropping on the spot
        spot.addEventListener('dragover', (event) => {
            if (!gameActive) return; // Only allow dragover if game is active
            event.preventDefault(); // Necessary to allow dropping on this element
            event.dataTransfer.dropEffect = 'copy'; // Show 'copy' cursor

             // Provide visual feedback on dragover if the spot is empty
            if (!spot.classList.contains('filled')) {
                 spot.style.borderColor = '#4CAF50'; // Highlight the spot
            }
        });

        // Handler for when drag leaves an input spot - remove visual feedback
        spot.addEventListener('dragleave', (event) => {
             if (!gameActive) return; // Only react if game is active
             // Reset border color if the spot is empty
             if (!spot.classList.contains('filled')) {
                 spot.style.borderColor = '#ccc'; // Reset border color
             }
        });

        // Handler for dropping an element onto an input spot
        spot.addEventListener('drop', (event) => {
            if (!gameActive) return; // Only allow dropping if game is active
            event.preventDefault(); // Prevent default behavior (like opening the element as a link)
            //Play drop sound
            dropSound.play();
            // Reset dragover border color after drop
            spot.style.borderColor = '#ccc';


            // Prevent dropping if the spot is already filled
            if (spot.classList.contains('filled')) {
                compoundInfoText.textContent = "This spot is already filled. Clear to try again.";
                return; // Stop processing the drop
            }

            // --- Process the dropped element ---
            const symbol = event.dataTransfer.getData('text/element-symbol');
            const name = event.dataTransfer.getData('text/element-name');
            const number = event.dataTransfer.getData('text/element-number');
            const category = event.dataTransfer.getData('text/element-category');

            // Clear previous content and classes for this spot
            spot.innerHTML = "";
            const allCategoryClasses = elements.map(el => el.category);
            spot.classList.remove('filled', 'correct', 'incorrect', ...allCategoryClasses); // Remove feedback classes too

            // Display the dropped element's info in the input spot
            spot.innerHTML = `
                <div class="atomic-number">${number}</div>
                <div class="symbol">${symbol}</div>
                <div class="name">${name}</div>
            `;
            spot.classList.add('filled');
            spot.classList.add(category); // Add category class for styling

            // Update the symbols held in state for compound checking
            if (spot.id === 'input1') {
                input1Symbol = symbol;
            } else if (spot.id === 'input2') {
                input2Symbol = symbol;
            }

            // Check for compound only when both spots are filled
            if (input1Symbol && input2Symbol) {
                checkForCompound();
            } else {
                 // Update feedback if only one spot is filled
                compoundInfoText.textContent = "Drop the second element.";
            }
        });
    });


    // --- Compound Checking Logic (Modified for Strikes) ---
    function checkForCompound() {
         // Remove previous feedback classes from input spots and result
         inputSpot1.classList.remove('correct', 'incorrect');
         inputSpot2.classList.remove('correct', 'incorrect');
         resultSpot.classList.remove('correct', 'incorrect');


         // Check if both symbols match the current challenge elements (order doesn't matter)
         const isCorrectPair =
             currentChallenge && // Ensure currentChallenge is set
             currentChallenge.elements.includes(input1Symbol) &&
             currentChallenge.elements.includes(input2Symbol) &&
             input1Symbol !== input2Symbol; // Ensure they are different elements


        if (isCorrectPair) {
            // Correct guess!
            score++; // Increment score
            scoreDisplay.textContent = `Score: ${score}`; // Update score display
            const glowingHint = document.querySelector('.element.glow-hint');
            if (glowingHint) {
                glowingHint.classList.remove('glow-hint');
            }
            // Provide positive feedback
            resultSpot.innerHTML = `
                <div class="symbol">${currentChallenge.formula}</div>
                <div class="name">${currentChallenge.info.split('\n')[0].split(' - ')[1] || 'Compound Formed!'}</div>
            `; // Display formula and basic name (handle potential missing info)
            resultSpot.classList.add('correct');
            compoundInfoText.textContent = `Correct! It's ${currentChallenge.formula}. Getting ready for the next one...`;
            showFeedback(true);


            // Add correct class to input spots for audiovisual feedback
            correctAns.play();
            inputSpot1.classList.add('correct');
            inputSpot2.classList.add('correct');
            characterImage.src = "papa happy.png";
            setTimeout(() => {     
                characterImage.src = "papa.png";
            }, 1000);
            // Reset strikes for the next challenge
            currentStrikes = 0;
                
            // Present a new challenge after a short delay
            setTimeout(presentNewChallenge, 1500); // 1.5 second delay
        } else {
             // Incorrect guess - but only if both slots are filled and they are not the correct pair
             if (input1Symbol && input2Symbol) {
                currentStrikes++; // Increment strike count

                resultSpot.innerHTML = "?";
                resultSpot.classList.add('incorrect');
                wrongAns.play();
                characterImage.src = "papa angry.png";
                setTimeout(() => {     
                    characterImage.src = "papa.png";
                }, 1000);
                // Provide feedback based on the strike count
                if (currentStrikes === 1) {
                    // 1st Strike: More explicit hint
                    if (hintsEnabled) {
                        hintText.textContent += " " + currentChallenge.explicitHint;
                    }
                    compoundInfoText.textContent = "Here's a stronger hint!";
                     inputSpot1.classList.add('incorrect');
                     inputSpot2.classList.add('incorrect');
                     // Clear slots after incorrect attempt
                     setTimeout(clearInputSpots, 1000); // Clear slots shortly after feedback
                } else if (currentStrikes === 2) {
                     // 2nd Strike: Reveal one of the correct elements (text hint)
                     const revealedElementSymbol = currentChallenge.elements[0]; // Reveal the first element's symbol
                     const revealedElement = elements.find(el => el.symbol === revealedElementSymbol);
                     const revealedElementName = revealedElement ? revealedElement.name : revealedElementSymbol; // Get name if found
                    if (hintsEnabled) {
                        hintText.textContent += " " + `One of the elements is ${revealedElementName} (${revealedElementSymbol}).`;
                        
                    }
                     inputSpot1.classList.add('incorrect');
                     inputSpot2.classList.add('incorrect');
                     const elementTile = document.querySelector(`.element[data-symbol="${revealedElementSymbol}"]`);
                     if (hintsEnabled) {
                     glowingElementTile = document.querySelector(`.element[data-symbol="${revealedElementSymbol}"]`);
                    
                     if (glowingElementTile) {
                       glowingElementTile.classList.add('glow-hint');
                    }}

                     // Clear slots after incorrect attempt
                     setTimeout(clearInputSpots, 1000); // Clear slots shortly after feedback
                } else if (currentStrikes >= 3) { // 3rd strike or more
                    // 3rd Strike: Reveal the compound, no point awarded, move to next challenge
                    
                    const compoundName = currentChallenge.info.split('\n')[0].split(' - ')[1] || 'Compound';
                    resultSpot.innerHTML = `
                        <div class="symbol">${currentChallenge.formula}</div>
                        <div class="name">${compoundName}</div>
                    `;
                     resultSpot.classList.add('incorrect'); // Indicate it was a miss
                    compoundInfoText.textContent = `Third strike! The compound was ${currentChallenge.formula}. No point awarded.`;

                    // Add incorrect class to input spots for visual feedback before clearing
                    inputSpot1.classList.add('incorrect');
                    inputSpot2.classList.add('incorrect');
                    if (hintsEnabled) {
                    if (glowingElementTile) {
                        glowingElementTile.classList.remove('glow-hint');
                        glowingElementTile = null;
                    }} 
                    showFeedback(false);
                    // Present a new challenge after a delay
                    setTimeout(presentNewChallenge, 2500); // Longer delay to read the revealed answer

                    // Ensure slots are cleared even after the reveal
                    setTimeout(clearInputSpots, 1000);
                }

             } else {

             }
        }
    }

    // --- Clear Button Listener ---
    clearButton.addEventListener('click', () => {
        if (!gameActive) return;
        clearInputSpots();
        resultSpot.innerHTML = "?";
        resultSpot.style.backgroundColor = '#ddd';
        resultSpot.classList.remove('correct', 'incorrect');
        compoundInfoText.textContent = "Drop two elements into the spots above.";
    });

    document.body.addEventListener('dragover', (event) => {
        event.preventDefault();
    });

    document.body.addEventListener('drop', (event) => {
        event.preventDefault();
        if (!event.target.closest('.input-spot') && !event.target.closest('.element')) {
        }
    });

   playButton.addEventListener('click', () => {
    document.querySelector('.name-entry-popup').classList.remove('hidden');
    });
    
    playAgainButton.addEventListener('click', startGame);

    searchInput.addEventListener('input', () => {
    const value = searchInput.value.trim().toLowerCase();
    const allElements = document.querySelectorAll('.element');

    allElements.forEach(el => {
        const symbol = el.dataset.symbol.toLowerCase();
        if (value && symbol === value) {
            el.classList.add('glow-highlight');
        } else {
            el.classList.remove('glow-highlight');
        }
    });
});

document.getElementById('settings-toggle').addEventListener('click', function (e) {
  e.preventDefault();
  const parent = this.closest('.has-submenu');
  parent.classList.toggle('open');
});

darkModeToggle.addEventListener('change', () => {
  if (darkModeToggle.checked) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
});

toggleHints.addEventListener('change', () => {
  hintsEnabled = toggleHints.checked;

  // If hints are turned OFF, remove only the extra part (not the base info)
  if (!hintsEnabled && currentChallenge) {
    hintText.textContent = currentChallenge.info;
  }
});

musicToggle.addEventListener('click', (e) => {
    e.preventDefault(); //prevent default link behavior

    if (musicPlaying) {
        gameAudio.pause();
    } else {
        gameAudio.play();
    }

    musicPlaying = !musicPlaying;
    volumeSlider.style.display = musicPlaying ? 'block' : 'none';
});

volumeSlider.addEventListener('input', () => {
    const value = parseFloat(volumeSlider.value);
    const percent = Math.round(value * 100);

    gameAudio.volume = value;

    volumeInline.textContent = `${percent}%`;

    volumeSlider.style.background =`linear-gradient(to right,rgb(0, 0, 0) ${percent}%, #ccc ${percent}%)`;
});

// Name entry handlers
    document.getElementById('start-with-name').addEventListener('click', () => {
        const nameInput = document.getElementById('player-name-input').value.trim().toUpperCase().substring(0, 4);
        playerName = nameInput || "----";
        document.querySelector('.name-entry-popup').classList.add('hidden');
        startGame();
    });

    document.getElementById('skip-name').addEventListener('click', () => {
       playerName = "USER";
       document.querySelector('.name-entry-popup').classList.add('hidden');
       startGame();
    });

// Leaderboard toggle
document.getElementById('toggle-leaderboard').addEventListener('click', () => {
    const leaderboardSection = document.getElementById('leaderboard-section');
    leaderboardSection.classList.toggle('hidden');
    const button = document.getElementById('toggle-leaderboard');
    button.textContent = leaderboardSection.classList.contains('hidden') 
        ? 'View Leaderboard' 
        : 'Hide Leaderboard';
});

});