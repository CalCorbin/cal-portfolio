import { useMutation } from 'react-query';

const guessNumber = async (imageFile: string) => {
  const response = await fetch(
    'http://127.0.0.1:8000/api/machine_learning_projects/predict-digit/',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageFile }),
    }
  );
  return response.json();
};

export default function useGuessNumber(imageFile: string) {
  return useMutation(() => guessNumber(imageFile));
}
