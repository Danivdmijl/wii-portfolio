document.addEventListener("mousemove", function (e) {
    const cursor = document.getElementById("wii-cursor");
    cursor.style.left = e.pageX + "px";
    cursor.style.top = e.pageY + "px";
});


document.addEventListener('keydown', function(event) {
    // Get the warning screen element
    const warningScreen = document.getElementById('warning-screen');

    // Only allow the "A" key press if the warning screen is visible
    if ((event.key === 'a' || event.key === 'A') && warningScreen.style.display !== 'none') {
        // Play the Wii click sound
        const clickSound = document.getElementById('wii-click-sound');
        clickSound.play();

        // Select the "Press (A) to continue" flashing text
        const flashingText = document.querySelector('.flashing-text');

        // Add the fade-out class to the flashing text
        if (flashingText) {
            flashingText.classList.add('fade-out');
        }

        // After the flashing text fades out, delay 0.5 seconds before fading out the rest of the text
        setTimeout(function() {
            // Select the rest of the warning text (all <p> and <h2> elements inside the warning screen)
            const warningTexts = document.querySelectorAll('.warning-content h2, .warning-content p');
            warningTexts.forEach(text => {
                text.classList.add('fade-out');
            });
        }, 1500); // 0.5 second delay after the first text fades out

        // After the rest of the text fades out, wait an additional 2 seconds before fading the screen away
        setTimeout(function() {
            // Fade out the entire warning screen
            if (warningScreen) {
                warningScreen.classList.add('fade-out');
            }

            // Play background music after the screen has faded, plus 1-second delay
            setTimeout(function() {
                const backgroundMusic = document.getElementById('wii-background-sound');
                backgroundMusic.play(); // Start the background music

                // Completely hide the warning screen after the fade-out animation finishes
                setTimeout(function() {
                    warningScreen.style.display = 'none'; // Set display to none to remove it from the layout
                }, 1500); // After the fade-out completes (1.5 seconds)
            }, 500); // 1-second delay after the warning screen fades out
        }, 3500); // Total of 2 seconds after the other text fades
    }
});


function updateTime() {
    const hourElement = document.querySelector('.time-part.hour');
    const minuteElement = document.querySelector('.time-part.minute');
    const periodElement = document.querySelector('.time-part.period');

    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const period = hours >= 12 ? 'pm' : 'am';

    // Convert to 12-hour format
    hours = hours % 12 || 12;

    // Update the hour, minute, and period in the HTML
    hourElement.textContent = hours;
    minuteElement.textContent = minutes < 10 ? '0' + minutes : minutes; // Add leading zero if necessary
    periodElement.textContent = period;
}

// Update time on page load
updateTime();

// Update time every minute
setInterval(updateTime, 60000);


// Function to update the date in "Day MM/DD" format
function updateDate() {
    const dateElement = document.getElementById("current-date");
    const currentDate = new Date();
    
    // Array of weekday names
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    
    // Get current day, month, and date
    const dayName = days[currentDate.getDay()];
    const month = currentDate.getMonth() + 1; // getMonth() is zero-based
    const day = currentDate.getDate();

    // Format the date as "Day MM/DD"
    const formattedDate = `${dayName} ${month}/${day}`;

    // Set the formatted date in the h3 element
    dateElement.textContent = formattedDate;
}

// Call the updateDate function to set the date when the page loads
updateDate();

// Optionally, update the date every day (86400000 ms = 1 day)
setInterval(updateDate, 86400000);


// Select all wii cards
const wiiCards = document.querySelectorAll('.wii-card');


// Titles and images for each card
const wiiCardsData = [
    { id: 'card1', title: 'My Shinys', image: './images/shinypokemon.jpg', link: 'https://danivdmijl.github.io/Shiny-Pokemon-Dani/' },
    { id: 'card2', title: 'Memory Game', image: './images/memorygame.jpg', link: 'https://danivdmijl.github.io/memory-game/' },
    { id: 'card3', title: 'Kanao Flip a Coin', image: './images/kanaoflipacoin.jpg', link: 'https://danivdmijl.github.io/Kanao-s-Coin-Flip/' },
    { id: 'card4', title: 'Pokemon Catch', image: './images/pokemoncatch.jpg', link: 'https://danivdmijl.github.io/Pokemon-catch-game/' },
    { id: 'card5', title: 'Cookie Clicker', image: './images/cookiedough.jpg', link: 'https://danivdmijl.github.io/CoockieDough/' },
    { id: 'card6', title: 'Color Picker', image: './images/colorpicker.jpg', link: 'https://danivdmijl.github.io/ColorPicker/' },
    { id: 'card7', title: 'Museum Online', image: './images/museumonline.jpg', link: 'https://ianschaafsma.github.io/BO-Museum_Online/web/' },
    { id: 'card8', title: 'Succes Dagboek', image: './images/succesdagboek.jpg', link: 'https://danivdmijl.github.io/Succes-Dagboek/' },
    { id: 'card9', title: 'Succes Dagboek', image: './images/succesdagboek.jpg', link: 'https://danivdmijl.github.io/Succes-Dagboek/' },
    { id: 'card10', title: 'Color Picker', image: './images/colorpicker.jpg', link: 'https://danivdmijl.github.io/ColorPicker/' },
    { id: 'card11', title: 'Memory Game', image: './images/memorygame.jpg', link: 'https://danivdmijl.github.io/memory-game/' },
    { id: 'card12', title: 'Cookie Clicker', image: './images/cookiedough.jpg', link: 'https://danivdmijl.github.io/CoockieDough/' },    
    { id: 'card13', title: 'Pokemon Catch', image: './images/pokemoncatch.jpg', link: 'https://danivdmijl.github.io/Pokemon-catch-game/' },
    { id: 'card14', title: 'Museum Online', image: './images/museumonline.jpg', link: 'https://ianschaafsma.github.io/BO-Museum_Online/web/' },
    { id: 'card15', title: 'Kanao Flip a Coin', image: './images/kanaoflipacoin.jpg', link: 'https://danivdmijl.github.io/Kanao-s-Coin-Flip/' },
    { id: 'card16', title: 'My Shinys', image: './images/shinypokemon.jpg', link: 'https://danivdmijl.github.io/Shiny-Pokemon-Dani/' },
];

// Dynamically set the images for each card based on the card-id
function setCardImages() {
    wiiCardsData.forEach(cardData => {
        const cardElement = document.getElementById(cardData.id);

        if (cardElement) {
            // Create an img element dynamically
            const img = document.createElement('img');
            img.classList.add('thumbnail');
            img.src = cardData.image;  // Set the image source dynamically
            img.alt = cardData.title;  // Set the alt text to the title

            // Append the image to the card element
            cardElement.appendChild(img);
        }
    });
}

// Call the function to set the images when the page loads
document.addEventListener('DOMContentLoaded', setCardImages);

const clickSound2 = document.getElementById('wii-click-sound2');


function preloadSounds() {
    clickSound2.load(); // Force load the click sound
}


// Function to play the click sound instantly
function playClickSound() {
    clickSound2.currentTime = 0;  // Reset playback position to start
    clickSound2.play().catch(error => console.error('Error playing click sound:', error)); // Play the sound immediately
}

window.addEventListener('DOMContentLoaded', preloadSounds);

// Function to show the correct game title in the oval (your existing code)
function showGameTitleOval(event) {
    const cardElement = event.target.closest('.wii-card');
    const cardIndex = cardElement ? parseInt(cardElement.dataset.index, 10) : null;
    
    if (cardIndex !== null && wiiCardsData[cardIndex]) {
        const cardData = wiiCardsData[cardIndex];
        
        const existingOval = document.querySelector('.game-title-oval');
        if (existingOval) {
            existingOval.remove();
        }

        const oval = document.createElement('div');
        oval.classList.add('game-title-oval');
        oval.textContent = cardData.title;

        const cardRect = cardElement.getBoundingClientRect();
        oval.style.top = `${cardRect.bottom + window.scrollY + 20}px`;
        oval.style.left = `${cardRect.left + (cardRect.width / 2) - 120}px`;

        document.body.appendChild(oval);
        requestAnimationFrame(() => {
            oval.style.top = `${cardRect.bottom + window.scrollY + 10}px`;
            oval.style.opacity = 1;
        });
    }
}


let currentStartIndex = 0; // Track the current index of the card set being displayed
const cardsPerPage = 8; // Number of cards to display at a time

// Function to display a subset of cards
function displayCards(startIndex) {
    // Clear the current cards
    wiiCards.forEach(card => card.innerHTML = '');

    // Get the subset of cards to display
    const endIndex = Math.min(startIndex + cardsPerPage, wiiCardsData.length);
    const cardsToShow = wiiCardsData.slice(startIndex, endIndex);

    // Populate the visible cards with the new subset
    wiiCards.forEach((card, index) => {
        const cardData = cardsToShow[index]; // Get data for current index within visible range
        if (cardData) {
            card.dataset.index = startIndex + index; // Store the original index of the card for later
            const img = document.createElement('img');
            img.classList.add('thumbnail');
            img.src = cardData.image;
            img.alt = cardData.title;
            card.appendChild(img);
        }
    });

    // Show/hide the left arrow based on whether we are at the start
    const leftArrow = document.querySelector('.arrow-left');
    if (currentStartIndex === 0) {
        leftArrow.style.visibility = 'hidden'; // Hide the left arrow when at the start
    } else {
        leftArrow.style.visibility = 'visible'; // Show the left arrow when not at the start
    }

    // Show/hide the right arrow based on whether we are at the end
    const rightArrow = document.querySelector('.arrow-right');
    if (currentStartIndex + cardsPerPage >= wiiCardsData.length) {
        rightArrow.style.visibility = 'hidden'; // Hide the right arrow if we are at the end of the array
    } else {
        rightArrow.style.visibility = 'visible'; // Show the right arrow if more cards are available
    }
}



// Display the initial set of cards and hide the left arrow
document.addEventListener('DOMContentLoaded', () => {
    displayCards(currentStartIndex);
    document.querySelector('.arrow-left').style.visibility = 'hidden'; // Initially hide the left arrow
});

// Right arrow click event listener
document.querySelector('.arrow-right').addEventListener('click', function() {
    // Slide out the current cards to the left
    wiiCards.forEach(card => {
        card.classList.add('slide-out-left');
    });

    // After the slide-out animation completes, show the next set of cards
    setTimeout(() => {
        // Remove the slide-out class after animation ends
        wiiCards.forEach(card => {
            card.classList.remove('slide-out-left');
        });

        // Update the current index to show the next set of cards
        currentStartIndex += cardsPerPage;

        // If we reach the end of the array, loop back to the beginning
        if (currentStartIndex >= wiiCardsData.length) {
            currentStartIndex = 0;
        }

        // Display the next set of cards
        displayCards(currentStartIndex);

        // Apply the slide-in-right animation for the new cards
        wiiCards.forEach(card => {
            card.classList.add('slide-in-right');
        });

        // Remove the slide-in animation class after it's done
        setTimeout(() => {
            wiiCards.forEach(card => {
                card.classList.remove('slide-in-right');
            });
        }, 1000); // Match the duration of your CSS animation (1s)
    }, 800); // Wait for the slide-out animation to complete
});

// Left arrow click event listener
document.querySelector('.arrow-left').addEventListener('click', function() {
    // Slide out the current cards to the right
    wiiCards.forEach(card => {
        card.classList.add('slide-out-right');
    });

    // After the slide-out animation completes, show the previous set of cards
    setTimeout(() => {
        // Remove the slide-out class after animation ends
        wiiCards.forEach(card => {
            card.classList.remove('slide-out-right');
        });

        // Update the current index to show the previous set of cards
        currentStartIndex -= cardsPerPage;

        // If we are at the start of the array, prevent it from going negative
        if (currentStartIndex < 0) {
            currentStartIndex = 0;
        }

        // Display the previous set of cards
        displayCards(currentStartIndex);

        // Apply the slide-in-left animation for the new cards
        wiiCards.forEach(card => {
            card.classList.add('slide-in-left');
        });

        // Remove the slide-in animation class after it's done
        setTimeout(() => {
            wiiCards.forEach(card => {
                card.classList.remove('slide-in-left');
            });
        }, 1000); // Match the duration of your CSS animation (1s)
    }, 800); // Wait for the slide-out animation to complete
});



// Function to hide the oval when not hovering
function hideGameTitleOval() {
    const existingOval = document.querySelector('.game-title-oval');
    if (existingOval) {
        existingOval.style.opacity = 0;
        existingOval.style.top = `${parseFloat(existingOval.style.top) + 10}px`;
        setTimeout(() => {
            if (existingOval) {
                existingOval.remove();
            }
        }, 500);
    }
}

wiiCards.forEach(card => {
    card.addEventListener('mouseenter', showGameTitleOval);
    card.addEventListener('mouseleave', hideGameTitleOval);
    card.addEventListener('click', playClickSound);
    card.addEventListener('click', openModal);
});


let currentLink = ''; // Variable to store the link of the current card

function openModal(event) {
    const cardElement = event.target.closest('.wii-card');
    const cardIndex = cardElement ? parseInt(cardElement.dataset.index, 10) : null;
    
    if (cardIndex !== null && wiiCardsData[cardIndex]) {
        const cardData = wiiCardsData[cardIndex];
        const modal = document.getElementById('modal');
        const modalImg = document.getElementById('modal-img');

        modalImg.src = cardData.image;
        currentLink = cardData.link; // Store the link for the current card
        modal.style.display = 'flex';  
    }
}



function closeModal() {
    const wiiMenuSound = document.getElementById('wii-menu-sound'); // Get the Wii Menu sound element

    // Play the Wii Menu sound when closing the modal
    wiiMenuSound.currentTime = 0; // Reset sound to the start
    wiiMenuSound.play();

    console.log("Modal is closing");
    const modal = document.getElementById('modal');
    const modalContent = document.querySelector('.modal-content');

    // Add the zoomOut class for the closing animation
    modalContent.classList.add('zoomOut');

    // Wait for the animation to finish before hiding the modal
    setTimeout(() => {
        modal.style.display = 'none';
        modalContent.classList.remove('zoomOut'); // Reset the animation
    }, 300); // Match the duration of the CSS animation (0.3s)
}


// Add click event listeners to each card to open the modal
wiiCards.forEach(card => {
    card.addEventListener('click', openModal);
});

// Add event listener to close the modal when clicking the close button
document.getElementById('close-modal').addEventListener('click', closeModal);

// Add event listener to close the modal when clicking outside the modal content
window.addEventListener('click', function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        closeModal();
    }
});

// Function to close the modal when "Wii Menu" is clicked
document.getElementById('wii-menu-button').addEventListener('click', closeModal);

// Add future functionality for the "Start" button
document.getElementById('start-button').addEventListener('click', function() {
    console.log("Start button clicked!");
    // Additional functionality can be added here
});

// Get references to the audio elements
const startSound = document.getElementById('start-sound');
const wiiMenuSound = document.getElementById('wii-menu-sound');

// Event listener for the "Start" button
document.getElementById('start-button').addEventListener('click', function() {
    // Play the start sound
    startSound.currentTime = 0; // Reset sound to the start
    startSound.play();

    // After the sound plays, redirect to the currentLink
    if (currentLink) {
        setTimeout(() => {
            window.open(currentLink, '_blank'); // Open link in new tab after sound
        }, 500); // Delay the redirect slightly to allow the sound to play
    }
});


const cardAnimations = [
    'spin3d-card1',
    'spin3d-card2',
    'spin3d-card3',
    'spin3d-card4',
    // Add more if needed
];

// Function to animate each card with staggered timings
function animateCard(card, index) {
    const img = card.querySelector('.thumbnail'); // Select the image inside the card
    if (img) {
        const minDuration = 7; // Minimum duration of animation in seconds
        const maxDuration = 12; // Maximum duration of animation in seconds
        const minInterval = 3000; // Minimum time (in ms) between animation repeats
        const maxInterval = 7000; // Maximum time (in ms) between animation repeats
        const minBreak = 8000; // Minimum break (in ms) before the next animation (8 seconds)
        const maxBreak = 15000; // Maximum break (in ms) before the next animation (15 seconds)

        // Generate random animation duration, random interval, and random break time
        const randomDuration = Math.random() * (maxDuration - minDuration) + minDuration;
        const randomInterval = Math.random() * (maxInterval - minInterval) + minInterval;
        const randomBreak = Math.random() * (maxBreak - minBreak) + minBreak;

        // Ensure no overlapping animations by applying a "busy" flag to each card
        if (!card.classList.contains('busy')) {
            card.classList.add('busy'); // Mark card as busy

            // Apply the animation with random duration
            img.style.animation = `${cardAnimations[index % cardAnimations.length]} ${randomDuration}s ease-in-out`;

            // After the animation ends, wait for a random interval, then add a random break before triggering it again
            setTimeout(() => {
                img.style.animation = ''; // Reset the animation
                setTimeout(() => {
                    // Add a random break before the animation starts again
                    setTimeout(() => {
                        card.classList.remove('busy'); // Mark the card as free to animate again
                        animateCard(card, index); // Trigger the animation again after the random break
                    }, randomBreak);
                }, randomInterval);
            }, randomDuration * 1000); // Wait for the animation to finish
        }
    }
}

function setCardAnimations() {
    wiiCards.forEach((card, index) => {
        // Initial stagger for each card's first animation (delay by index * 1 second)
        const initialDelay = index * 1000; // 1 second stagger between each card's first animation
        setTimeout(() => {
            animateCard(card, index); // Start the animation loop for each card
        }, initialDelay);
    });
}

document.addEventListener('DOMContentLoaded', setCardAnimations);