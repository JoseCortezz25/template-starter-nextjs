import { EyeIcon, EyeOffIcon } from 'lucide-react';

interface EyePasswordProps {
  onToggle: () => void;
  isVisible: boolean;
}

export const EyePassword = ({ onToggle, isVisible }: EyePasswordProps) => {
  if (isVisible) {
    return (
      <button
        type="button"
        className="input-text__show-password"
        onClick={onToggle}
      >
        <EyeOffIcon />
      </button>
    );
  }

  return (
    <button
      type="button"
      className="input-text__show-password"
      onClick={onToggle}
    >
      <EyeIcon />
    </button>
  );
};
