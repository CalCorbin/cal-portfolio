import { useMutation } from 'react-query';

/**
 * POST the image file drawn by the user to the machine learning server
 * @param imageFile - The image file to be uploaded
 */
const guessNumber = async (imageFile: File | null) => {
  if (!imageFile) return {};

  const formData = new FormData();
  formData.append('imageFile', imageFile);

  const server =
    process.env.NODE_ENV === 'develospment'
      ? 'http://127.0.0.1:8000'
      : 'http://django-env.eba-hkmtp5gp.us-west-2.elasticbeanstalk.com/';

  const response = await fetch(
    `${server}/api/machine_learning_projects/predict-digit/`,
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
