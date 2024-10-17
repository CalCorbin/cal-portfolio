const BackButton = () => {
  return (
    <button data-testid="back-button" onClick={() => window.history.back()}>
      Back
    </button>
  );
};

export default BackButton;
