import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = "Идет обработка обученной моделью...", 
  size = 'medium',
  className = ''
}) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  return (
    <div className={`flex flex-col items-center justify-center gap-6 w-full h-full ${className}`}>
      {/* Анимированный спиннер */}
      <div className="relative flex items-center justify-center">
        {/* Внешний круг */}
        <div className={`${sizeClasses[size]} border-4 border-[#E5E7EB] rounded-full`}></div>
        {/* Вращающийся круг */}
        <div 
          className={`${sizeClasses[size]} border-4 border-transparent border-t-[#8B5CF6] border-r-[#8B5CF6] rounded-full absolute top-0 left-0 animate-spin`}
        ></div>
        {/* Внутренний пульсирующий круг */}
        <div 
          className={`${size === 'large' ? 'w-6 h-6' : size === 'medium' ? 'w-4 h-4' : 'w-2 h-2'} bg-[#8B5CF6] rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse`}
        ></div>
      </div>
      
      {/* Текст загрузки */}
      <div className="text-center max-w-sm">
        <p className="text-[#1F2937] font-medium text-lg mb-2 leading-tight">
          {message}
        </p>
        <p className="text-[#6B7280] text-sm">
          Пожалуйста, подождите...
        </p>
      </div>
      
      {/* Анимированные точки */}
      <div className="flex gap-1 justify-center">
        <div className="w-2 h-2 bg-[#8B5CF6] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-[#8B5CF6] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bg-[#8B5CF6] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
