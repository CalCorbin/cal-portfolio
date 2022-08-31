import { useMutation } from 'react-query';

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
