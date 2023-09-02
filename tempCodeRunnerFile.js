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
      data.data.forEach((video) => {
        // Create HTML elements to display video data (thumbnail, title, author, views, posted date)
        const videoCard = document.createElement("div");
        videoCard.classList.add("video-card"); // You can define your CSS class for video cards

        // Add video thumbnail
        const thumbnailImg = document.createElement("img");
        thumbnailImg.src = video.thumbnail;
        videoCard.appendChild(thumbnailImg);

        // Add video title
        const titleDiv = document.createElement("div");
        titleDiv.innerText = video.title;
        videoCard.appendChild(titleDiv);

        // Add author information
        const authorDiv = document.createElement("div");
        authorDiv.innerText = `Author: ${video.authors[0].profile_name}`;
        videoCard.appendChild(authorDiv);

        // Add views information
        const viewsDiv = document.createElement("div");
        viewsDiv.innerText = `Views: ${video.others.views}`;
        videoCard.appendChild(viewsDiv);

        // Add posted date information
        const dateDiv = document.createElement("div");
        dateDiv.innerText = `Posted Date: ${video.others.posted_date}`;
        videoCard.appendChild(dateDiv);

        // Append the video card to the card container
        cardContainer.appendChild(videoCard);
      });
    } else {
      console.error("Unexpected data structure in API response:", data);
    }
  } catch (error) {
    console.error("Error loading videos:", error);
  }
};
