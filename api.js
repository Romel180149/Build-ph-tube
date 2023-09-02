

// blog text starts here
function showBlogText() {
  var blogContentDiv = document.getElementById("blogContent");
  if (blogContentDiv) {
    var blogText = "Discuss the scope of var, let, and const; Tell us the use cases of null and undefined; What do you mean by REST API?";
    var lines = blogText.split('; '); // Split the text into lines using the semicolon and space as the delimiter

    // Create a paragraph for each line and append it to the div
    lines.forEach(function (line) {
      var paragraph = document.createElement("p");
      paragraph.textContent = line;
      blogContentDiv.appendChild(paragraph);
    });
  } else {
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
        "grid-cols-1", // Set the number of columns to 1 for small screens
        "md:grid-cols-2", // Set the number of columns to 2 for medium screens and larger
        "lg:grid-cols-4", // Set the number of columns to 4 for large screens and larger
        "gap-4" ,// Add some gap between the grid items
        
      );
//       const gridContainer = document.createElement("div");
// gridContainer.classList.add(
//   "flex",            // Add flex display
//   "flex-wrap",       // Allow the cards to wrap to the next row if needed
//   "justify-center",  // Center-align horizontally
//   "items-center"     // Center-align vertically
// );


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

       
   
 
  




// videoCard.innerHTML = `
//   <img src="${video.thumbnail}" alt="Video Thumbnail" class="w-full rounded-lg mb-2">
//   <div class="flex flex-col md:flex-row items-center mb-2">
//     <div class="md:w-1/4">
//       <img src="${video.authors[0].profile_picture}" alt="Author Profile Picture" class="w-24 h-24 md:w-12 md:h-12 rounded-full">
//     </div>
//     <div class="md:w-3/4 md:ml-3">
//       <h2 class="text-lg font-semibold">${video.title}</h2>
//       <p class="text-gray-500">${video.authors[0].profile_name}</p>
//       ${video.authors[0].verified ? '<span class="bg-blue-500 text-white px-2 py-1 rounded-full text-xs ml-2">Verified</span>' : ''}
//     </div>
//   </div>
//   <p class="text-gray-500">Views: ${video.others.views}</p>
//   <p class="text-gray-500">Posted Date: ${video.others.posted_date}</p>
// `;
// videoCard.innerHTML = `
//   <img src="${video.thumbnail}" alt="Video Thumbnail" class="w-full rounded-lg mb-2">
//   <div class="flex items-center mb-2">
//     <img src="${video.authors[0].profile_picture}" alt="Author Profile Picture" class="w-12 h-12 rounded-full">
//     <h2 class="text-lg font-semibold ml-2">${video.title}</h2>
//   </div>
//   <p class="text-gray-500">${video.authors[0].profile_name}</p>
//   ${video.authors[0].verified ? '<span class="bg-blue-500 text-white px-2 py-1 rounded-full text-xs ml-2">Verified</span>' : ''}
//   <p class="text-gray-500">Views: ${video.others.views}</p>
// `;
// videoCard.innerHTML = `
//   <img src="${video.thumbnail}" alt="Video Thumbnail" class="w-full rounded-lg mb-2">
//   <div class="flex items-center mb-2">
//     <img src="${video.authors[0].profile_picture}" alt="Author Profile Picture" class="w-12 h-12 rounded-full">
//     <div class="ml-2">
//       <div class="flex items-center">
//         <h2 class="text-lg font-semibold">${video.title}</h2>
//         ${video.authors[0].verified ? '<span class="bg-blue-500 text-white px-2 py-1 rounded-full text-xs ml-2">Verified</span>' : ''}
//       </div>
//       <p class="text-gray-500">${video.authors[0].profile_name}</p>
//       <p class="text-gray-500">Views: ${video.others.views}</p>
//     </div>
//   </div>
// `;

videoCard.innerHTML = `
  <img src="${video.thumbnail}" alt="Video Thumbnail" class="w-full rounded-lg mb-2">
  <div class="flex items-center mb-2">
    <img src="${video.authors[0].profile_picture}" alt="Author Profile Picture" class="w-12 h-12 rounded-full">
    <h2 class="text-lg font-semibold ml-2">${video.title}</h2>
  </div>
  <div class="flex items-center">
    <p class="text-gray-500">${video.authors[0].profile_name}</p>
    ${video.authors[0].verified ? '<span class="bg-blue-500 text-white px-2 py-1 rounded-full text-xs ml-2">Verified</span>' : ''}
  </div>
  <p class="text-gray-500">Views: ${video.others.views}</p>
`;





















    
      
      
      
      
      
      

        

        // Append each video card to the grid container
        gridContainer.appendChild(videoCard);
      });



      // Append the grid container to the card container
      cardContainer.appendChild(gridContainer);
    } 
   
    else if (categoryId === "drawing") {
      // Display an icon and text for the "Drawing" category with no videos
      cardContainer.innerHTML = `
        <div class="flex flex-col items-center justify-center text-gray-500">
          <img src="./Icon.png" alt="No Content Icon">
          <p>Oops! There is no content here.</p>
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
handleLoadVideos("1000"); // Replace with the desired category ID
