
import { storage } from "./firebase"; // Import the storage initialized in firebase.js
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

/**
 * Uploads an image file to Firebase Storage.
 * @param {File} file - The image file to be uploaded.
 * @returns {Promise<string>} - A promise that resolves to the download URL of the uploaded image.
 */
export const uploadImageFile = async (file) => {
  try {
    const storageRef = ref(storage, `images/${file.name}`);
    const response = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(response.ref);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

/**
 * Uploads a video file to Firebase Storage.
 * @param {File} file - The video file to be uploaded.
 * @returns {Promise<string>} - A promise that resolves to the download URL of the uploaded video.
 */
export const uploadVideoFile = async (file) => {
  try {
    const storageRef = ref(storage, `videos/${file.name}`);
    const response = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(response.ref);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading video:", error);
    throw error;
  }
};
