const handleCategory = async () => {
  try {
    // Fetch the list of video categories from your new API
    const response = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    if (!response.ok) {
      throw new Error(`Network response was not ok (status ${response.status})`);
    }
    const data = await response.json();

    const tabContainer = document.getElementById("tab-container");

    // Check if the response data has the expected structure
    if (Array.isArray(data.data)) {
      data.data.forEach((category) => {
        const div = document.createElement("div");
        div.innerHTML = `
          <a onclick="handleLoadVideos('${category.category_id}')" class="tab">${category.category}</a>
        `;
        tabContainer.appendChild(div);

        // Display category names directly without clicking (optional)
        if (category.category_id === "1000") {
          // You can customize how the "All" category is displayed
          const allCategoryDiv = document.createElement("div");
          allCategoryDiv.innerHTML = `
            <a class="tab">${category.category}</a>
          `;
          tabContainer.appendChild(allCategoryDiv);
        }
      });
    } else {
      console.error("Unexpected data structure in API response:", data);
    }
  } catch (error) {
    console.error("Error loading video categories:", error);
  }
};


const handleLoadVideos = async (categoryId) => {
  try {
    // Fetch video data based on the category ID from your new API
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    if (!response.ok) {
      throw new Error(`Network response was not ok (status ${response.status})`);
    }
    const data = await response.json();

    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";

    // Check if the response data has the expected structure
    if (Array.isArray(data.data)) {
      // Create a container div with grid layout
      const gridContainer = document.createElement("div");
      gridContainer.classList.add(
        "grid",
        "grid-cols-1", // Set the number of columns to 1 for small screens
        "md:grid-cols-2", // Set the number of columns to 2 for medium screens and larger
        "lg:grid-cols-4", // Set the number of columns to 4 for large screens and larger
        "gap-4" ,// Add some gap between the grid items
        
      );

      data.data.forEach((video) => {
        // Create HTML elements for each video card
        const videoCard = document.createElement("div");
        videoCard.classList.add(
          "border",
          "border-gray-300",
          "p-4",
          "w-full",
          "rounded-lg",
          "shadow-md",
          "video-card"
          // Add other Tailwind CSS classes as needed
        );

        // Add other elements to the video card (thumbnail, title, etc.)
        videoCard.innerHTML = `
          <img src="${video.thumbnail}" alt="Video Thumbnail" class="w-full rounded-lg mb-2">
          <h2 class="text-lg font-semibold">${video.title}</h2>
          <p class="text-gray-500">Author: ${video.authors[0].profile_name}</p>
          <p class="text-gray-500">Views: ${video.others.views}</p>
          <p class="text-gray-500">Posted Date: ${video.others.posted_date}</p>
        `;

        // Append each video card to the grid container
        gridContainer.appendChild(videoCard);
      });



      // Append the grid container to the card container
      cardContainer.appendChild(gridContainer);
    } else {
      console.error("Unexpected data structure in API response:", data);
    }
  } catch (error) {
    console.error("Error loading videos:", error);
  }
};


// Call the handleCategory function to load video categories
handleCategory();

// You can replace the categoryId with the one you want to load initially
handleLoadVideos("1000"); // Replace with the desired category ID
