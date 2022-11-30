import { useMutation } from 'react-query';

/**
 * POST the image file drawn by the user to the machine learning server
 * @param imageFile - The image file to be uploaded
 */
/* istanbul ignore next */
const guessNumber = async (imageFile: File | null) => {
  if (!imageFile) return {};

  const formData = new FormData();
  formData.append('imageFile', imageFile);

  const server =
    process.env.NODE_ENV === 'development'
      ? 'http://127.0.0.1:8000'
      : 'https://calcoapi.com';

  const response = await fetch(
    `${server}/api/machine_learning_projects/predict-digit/`,
    {
      method: 'POST',
      body: formData,
    }
  );
  return response.json();
};

/* istanbul ignore next */
export default function useGuessNumber(imageFile: File | null) {
  return useMutation(() => guessNumber(imageFile));
}
