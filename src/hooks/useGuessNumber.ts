import { useMutation } from 'react-query';

/**
 * POST the image file drawn by the user to the machine learning server
 * @param imageFile - The image file to be uploaded
 */
const guessNumber = async (imageFile: File | null) => {
  if (!imageFile) return {};

  const formData = new FormData();
  formData.append('imageFile', imageFile);

  const response = await fetch(
    'https://calcorbin-ml-projects.fly.dev/api/machine_learning_projects/predict-digit/',
    {
      method: 'POST',
      body: formData,
    }
  );
  return response.json();
};

export default function useGuessNumber(imageFile: File | null) {
  return useMutation(() => guessNumber(imageFile));
}
