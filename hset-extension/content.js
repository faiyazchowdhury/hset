document.querySelectorAll('.hset-link').forEach(link => {
  let bubble; // Declare a variable to store the dynamically created bubble

  // Parse the hyper set data from the data-hset attribute
  const hsetData = JSON.parse(link.getAttribute('data-hset'));

  // Function to create and populate the bubble dynamically
  function createBubble() {
    // Create the bubble element
    bubble = document.createElement('div');
    bubble.classList.add('bubble'); // Add the 'bubble' class for styling

    // Populate the bubble with links and authors
    const bubbleContent = hsetData.map(entry =>
      `<a href="${entry.url}" target="_blank">${entry.url} by ${entry.author}</a>`
    ).join('');
    bubble.innerHTML = bubbleContent;

    // Add the bubble to the document body
    document.body.appendChild(bubble);
  }

  // Function to position the bubble relative to the link
  function positionBubble() {
    const rect = link.getBoundingClientRect();
    bubble.style.top = `${rect.bottom + window.scrollY}px`; // Position below the link
    bubble.style.left = `${rect.left + window.scrollX}px`; // Align with the left edge of the link
  }

  // Show the bubble on hover
  link.addEventListener('mouseenter', () => {
    if (!bubble) createBubble(); // Create the bubble if it doesn't exist
    positionBubble(); // Position it correctly
    bubble.style.display = 'block'; // Show it
  });

  // Hide and remove the bubble when not hovering
  link.addEventListener('mouseleave', () => {
    if (bubble) {
      bubble.style.display = 'none'; // Hide it
      document.body.removeChild(bubble); // Remove it from DOM
      bubble = null; // Reset reference for future use
    }
  });

  // Optional: Make the bubble appear on click instead of hover
  link.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default link behavior

    if (bubble && bubble.style.display === 'block') {
      document.body.removeChild(bubble); // Remove if already visible
      bubble = null;
    } else {
      if (!bubble) createBubble(); // Create if not existing
      positionBubble(); // Position it correctly
      bubble.style.display = 'block'; // Show it
    }
  });
});
