import { TitleProps } from "@/app/common/interfaces";

export const Title = ({ text, size = 'small' }: TitleProps) => {
  const sizeClasses = {
    small: 'text-sm',
    medium: 'text-base', 
    large: 'text-2xl'
  };

  return (
    <h1 className={`${sizeClasses[size]} font-bold uppercase text-blue-600`}>
      {text}
    </h1>
  );
};
