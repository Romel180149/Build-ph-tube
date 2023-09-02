

// blog text starts here

function showBlogText() {
  // Get the reference to the HTML element with the ID "blogContent"
  var blogContentDiv = document.getElementById("blogContent");
  
  if (blogContentDiv) {
    // Define the blog text content
    var blogText = ".Discuss the scope of var, let, and const; .Tell us the use cases of null and undefined; .What do you mean by REST API?";
    
    // Split the blog text into lines using the semicolon and space as the delimiter
    var lines = blogText.split('; ');

    // Create a paragraph element for each line and append it to the "blogContent" div
    lines.forEach(function (line) {
      var paragraph = document.createElement("p");
      paragraph.textContent = line;
      blogContentDiv.appendChild(paragraph);
    });
  } else {
    // If the "blogContent" div is not found, log an error message
    console.error("Element with ID 'blogContent' not found.");
  }
}


// blog text ends here

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
        "grid-cols-1", 
        "md:grid-cols-2", 
        "lg:grid-cols-4", 
        "gap-4" ,
        "p-4",
        "mx-auto",
        
        
        
        // Add some gap between the grid items
        
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
// Assuming `video.others.posted_date` is a numeric value representing seconds since the epoch
const postedDateInSeconds = parseInt(video.others.posted_date, 10);

// Convert the seconds to milliseconds for creating a Date object
const postedDate = new Date(postedDateInSeconds * 1000);

// Get the current date and time
const currentDate = new Date();

// Calculate the time difference in seconds
const timeDifferenceInSeconds = Math.floor((currentDate - postedDate) / 1000);

// Calculate hours, minutes, and seconds
const hours = Math.floor(timeDifferenceInSeconds / 3600);
const minutes = Math.floor((timeDifferenceInSeconds % 3600) / 60);
const seconds = timeDifferenceInSeconds % 60;

// Create a formatted time string
let formattedTime = '';

if (hours > 0) {
  formattedTime += `${hours} hrs `;
}

if (minutes > 0) {
  formattedTime += `${minutes} min ago `;
}




videoCard.innerHTML = `
  <div class="relative">
    <img src="${video.thumbnail}" alt="Video Thumbnail" class="w-full rounded-lg mb-2">
    <p class="absolute bottom-2 right-2 text-white text-xs bg-black bg-opacity-70 px-1">${formattedTime}</p>
  </div>
  <!-- ... (other video card content) ... -->
  <div class="flex items-center mb-2">
    <img src="${video.authors[0].profile_picture}" alt="Author Profile Picture" class="w-12 h-12 rounded-full">
    <h2 class="text-sm font-semibold ml-2">${video.title}</h2>
    <!-- Adjust the class "text-sm" for the desired font size of the title -->
  </div>
  <div class="flex items-center">
    <p class="text-gray-500 flex-1 text-xs">${video.authors[0].profile_name}</p>
    <!-- Adjust the class "text-xs" for the desired font size of the author's name -->
    ${video.authors[0].verified ? '<span class="bg-blue-500 text-white px-2 py-1 rounded-full text-xs ml-2">Verified</span>' : ''}
  </div>
  <p class="text-gray-500 text-xs">Views: ${video.others.views}</p>
  
`;


        // Append each video card to the grid container
        gridContainer.appendChild(videoCard);
      });



      // Append the grid container to the card container
      cardContainer.appendChild(gridContainer);
    } 
  
    else if (categoryId === "1005") {
      // Display additional text content for the "Drawing" category with no videos
      cardContainer.innerHTML = `
        <div class="flex flex-col items-center justify-center text-gray-500">
          <img src="./Icon.png" alt="No Content Icon">
          <p>Oops! There is no drawing-related content available at the moment.</p>
          <p>Check back later for more drawing videos!</p>
        </div>
      `;
      
    }
  
  } catch (error) {
    console.error("Error loading videos:", error);
  }
};


// Call the handleCategory function to load video categories
handleCategory();

// You can replace the categoryId with the one you want to load initially
handleLoadVideos("1005"); // Replace with the desired category ID
// 
// sort by view 

// Add a reference to the "Sort by View" button
const sortButton = document.getElementById("sortButton");

// Function to sort video cards by views in descending order
function sortVideosByViewsDescending() {
  // Sort the video data in descending order based on the 'views' property
  data.data.sort((a, b) => b.others.views - a.others.views);

  // Call the function to display the sorted video cards
  displaySortedVideos();
}

// Add a click event listener to the button to trigger the sorting
sortButton.addEventListener("click", sortVideosByViewsDescending);
function displaySortedVideos() {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";

  // Iterate through the sorted video data and create and append video cards
  data.data.forEach((video) => {
    const videoCard = document.createElement("div");
    // Create and populate the video card HTML based on the sorted data
    // ...

    cardContainer.appendChild(videoCard);
  });
}
