import axiosClient from "./axiosClient";
const reviewApi = {
  getListReviewOfBook(bookId) {
    const url = `api/v1/books/${bookId}/reviews`;
    return axiosClient.get(url);
  },
  addReview(book, text, rating, images) {
    const data = new FormData();
    if (text) {
      data.append("text", text);
    }
    data.append("rating", rating);
    images.length > 0 &&
      images.forEach((item) => {
        data.append("images", item);
      });

    return axiosClient.post(`api/v1/books/${book}/reviews/add`, data);
  },
};
export default reviewApi;
