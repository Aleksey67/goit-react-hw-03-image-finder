import axios from "axios";
const apiKey = '14339474-abbb7cf0e0c5448f64ec8df4a';

export const searchPhotos = (text, page) => {
  return axios.get(
    `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${text}&page=${page}&per_page=12&key=${apiKey}`
  );
};
