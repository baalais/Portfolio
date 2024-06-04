document.addEventListener("DOMContentLoaded", function() {
  const boxes = document.querySelectorAll('.box');
  const boxSize = 100; // Width and height of the box
  const padding = 20; // Padding to ensure boxes stay within the screen
  const fishContainer = document.querySelector('.fish-container');
  const screenWidth = fishContainer.offsetWidth; // Width of the screen
  const screenHeight = fishContainer.offsetHeight; // Height of the screen
  const maxOccupancyDesktop = 1; // Maximum percentage of fish-container width and height for desktop
  const maxOccupancyPhone = 0.6; // Maximum percentage of fish-container width and height for phone

  function getRandomPosition() {
    const containerRect = document.querySelector('.container').getBoundingClientRect();
    const maxX = containerRect.width - boxSize - 2 * padding;
    const maxY = containerRect.height - boxSize - 2 * padding;
    // Introduce additional randomness by adding random offsets
    const offsetX = Math.random() * maxX * 0.2; // Adjust the multiplier as needed
    const offsetY = Math.random() * maxY * 0.2; // Adjust the multiplier as needed
    const x = Math.floor(Math.random() * maxX + offsetX) + padding;
    const y = Math.floor(Math.random() * maxY + offsetY) + padding;
    return { x, y };
  }

  function moveBox(box, maxOccupancy) {
    let { x, y } = getRandomPosition();

    // Calculate the maximum allowable coordinates based on the percentage of fish-container dimensions
    const maxAllowedX = screenWidth * maxOccupancy - boxSize - padding;
    const maxAllowedY = screenHeight * maxOccupancy - boxSize - padding;

    // Ensure the fish stays within the boundaries of the screen
    x = Math.min(x, maxAllowedX);
    y = Math.min(y, maxAllowedY);

    // Ensure the fish stays within the left and top boundaries of the screen
    x = Math.max(x, padding);
    y = Math.max(y, padding);

    box.style.transition = "transform 1s ease-in-out";
    box.style.transform = `translate(${x}px, ${y}px)`;
  }

  function moveAllBoxes(maxOccupancy) {
    boxes.forEach(box => moveBox(box, maxOccupancy));
  }

  // Check screen width and apply appropriate logic
  if (screenWidth > 768) {
    // For desktop version
    moveAllBoxes(maxOccupancyDesktop);
  } else {
    // For phone version
    moveAllBoxes(maxOccupancyPhone);
  }

  // Move boxes every second
  setInterval(() => {
    if (screenWidth > 768) {
      // For desktop version
      moveAllBoxes(maxOccupancyDesktop);
    } else {
      // For phone version
      moveAllBoxes(maxOccupancyPhone);
    }
  }, 1000);
});
