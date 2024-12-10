import axios from 'axios';

const API_KEY = import.meta.env.REACT_APP_PEXELS_API_KEY;
const BASE_URL = 'https://api.pexels.com/v1/search';

/**
 * Fetch an image URL from Pexels.
 * @param {string} query - Search query for the image.
 * @param {number} width - Desired image width.
 * @param {number} height - Desired image height.
 * @returns {string} - The fetched image URL or a fallback URL.
 */
export const fetchPexelsImage = async (query, width = 600, height = 400) => {
  try {
    const response = await axios.get(BASE_URL, {
      headers: {
        Authorization: API_KEY,
      },
      params: {
        query,
        per_page: 1,
      },
    });

    const photos = response.data.photos;
    if (photos.length > 0) {
      return photos[0].src.medium.replace(/w=\d+&h=\d+/, `w=${width}&h=${height}`);
    }
  } catch (error) {
    console.error(`Error fetching image for query "${query}":`, error);
  }

  // Return a fallback image if no result is found
  return `https://via.placeholder.com/${width}x${height}`;
};
