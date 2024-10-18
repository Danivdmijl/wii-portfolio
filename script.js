document.addEventListener("mousemove", function (e) {
    const cursor = document.getElementById("wii-cursor");
    cursor.style.left = e.pageX + "px";
    cursor.style.top = e.pageY + "px";
});


document.addEventListener('keydown', function(event) {
    if (event.key === 'a' || event.key === 'A') {
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
            const warningScreen = document.getElementById('warning-screen');
            if (warningScreen) {
                warningScreen.classList.add('fade-out');
            }

            // Play background music after the screen has faded, plus 1-second delay
            setTimeout(function() {
                const backgroundMusic = document.getElementById('wii-background-sound');
                backgroundMusic.play(); // Start the background music

                // **NEW: Completely hide the warning screen after the fade-out animation finishes**
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
    { id: 'card1', title: 'My Shinys', image: './images/shinypokemon.jpg' },
    { id: 'card2', title: 'Memory Game', image: './images/memorygame.jpg' },
    { id: 'card3', title: 'Kanao Flip a Coin', image: './images/kanaoflipacoin.jpg' },
    { id: 'card4', title: 'My Shinys', image: './images/shinypokemon.jpg' },
    { id: 'card5', title: 'Memory Game', image: './images/memorygame.jpg' },
    { id: 'card6', title: 'Kanao Flip a Coin', image: './images/kanaoflipacoin.jpg' },
    { id: 'card7', title: 'My Shinys', image: './images/shinypokemon.jpg' },
    { id: 'card8', title: 'Memory Game', image: './images/memorygame.jpg' },
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

// Function to show the correct game title in the oval
function showGameTitleOval(event) {
    const cardId = event.target.closest('.wii-card').id;  // Use closest to handle image hover
    const cardData = wiiCardsData.find(card => card.id === cardId);

    if (cardData) {
        // Remove any existing ovals to avoid duplication
        const existingOval = document.querySelector('.game-title-oval');
        if (existingOval) {
            existingOval.remove();
        }

        // Create the oval element
        const oval = document.createElement('div');
        oval.classList.add('game-title-oval');
        oval.textContent = cardData.title;  // Set the correct title

        // Get the hovered card's position and size
        const cardRect = event.target.closest('.wii-card').getBoundingClientRect();

        // Set the initial oval's position right below the card (hidden at first)
        oval.style.top = `${cardRect.bottom + window.scrollY + 20}px`; // 20px space below the card for animation
        oval.style.left = `${cardRect.left + (cardRect.width / 2) - 120}px`; // Centered under the card (oval width: 150px)

        // Append the oval to the body
        document.body.appendChild(oval);

        // Trigger the transition (force reflow for smooth animation)
        requestAnimationFrame(() => {
            oval.style.top = `${cardRect.bottom + window.scrollY + 10}px`; // Move up smoothly
            oval.style.opacity = 1; // Fade in
        });
    }
}

// Function to hide the oval when not hovering
function hideGameTitleOval() {
    const existingOval = document.querySelector('.game-title-oval');
    if (existingOval) {
        // Fade out the oval
        existingOval.style.opacity = 0;
        existingOval.style.top = `${parseFloat(existingOval.style.top) + 10}px`; // Slide down smoothly

        // Remove the oval after the transition and delay completes
        setTimeout(() => {
            if (existingOval) {
                existingOval.remove();
            }
        }, 500);
    }
}

// Add event listeners to each card
wiiCards.forEach(card => {
    card.addEventListener('mouseenter', showGameTitleOval);
    card.addEventListener('mouseleave', hideGameTitleOval);
});


// Function to open the modal and zoom in the clicked card
function openModal(event) {
    const cardId = event.target.closest('.wii-card').id;  // Get the clicked card's id
    console.log("Clicked card ID:", cardId);  // Check if card ID is correct
    
    const cardData = wiiCardsData.find(card => card.id === cardId);  // Find the corresponding data
    
    if (cardData) {
        console.log("Found card data:", cardData);  // Check if card data is found
        const modal = document.getElementById('modal');
        const modalImg = document.getElementById('modal-img');
        
        modalImg.src = cardData.image;  // Set the modal image source
        console.log("Modal image src set to:", cardData.image);  // Log the image path

        modal.style.display = 'flex';  // Show the modal
        console.log("Modal is now visible");  // Confirm modal visibility
    } else {
        console.log("No card data found for this card ID.");  // Handle case if no matching data
    }
}


// Function to close the modal
function closeModal() {
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

// Array of animation names for each card
const cardAnimations = [
    'spin3d-card1',
    'spin3d-card2',
    'spin3d-card3',
    'spin3d-card4',
    // Add more if needed
];

// Function to set animations for each card
function setCardAnimations() {
    wiiCards.forEach((card, index) => {
        const img = card.querySelector('.thumbnail'); // Select the image inside the card
        if (img) {
            // Assign the unique animation from the array
            img.style.animation = `${cardAnimations[index % cardAnimations.length]} 15s infinite ease-in-out`;
        }
    });
}

// Call the function to assign the animations
document.addEventListener('DOMContentLoaded', setCardAnimations);
