import { useRef, useCallback } from "react";
import { notification } from "antd";

interface UseAvatarUploadProps {
  onAvatarChange: (avatar: string | null) => void;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_WIDTH = 300;
const QUALITY = 0.8;

export const useAvatarUpload = ({ onAvatarChange }: UseAvatarUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const compressImage = useCallback((file: File): Promise<string> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      const img = new Image();
      
      img.onload = () => {
        const ratio = Math.min(MAX_WIDTH / img.width, MAX_WIDTH / img.height);
        canvas.width = img.width * ratio;
        canvas.height = img.height * ratio;
        
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', QUALITY));
      };
      
      img.src = URL.createObjectURL(file);
    });
  }, []);

  const validateFile = useCallback((file: File): boolean => {
    if (!file.type.startsWith('image/')) {
      notification.error({
        message: "Ошибка загрузки",
        description: "Пожалуйста, выберите файл изображения",
        placement: "topRight",
      });
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      notification.error({
        message: "Ошибка загрузки",
        description: "Размер файла не должен превышать 5MB",
        placement: "topRight",
      });
      return false;
    }

    return true;
  }, []);

  const handleAvatarClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleAvatarChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!validateFile(file)) return;

    try {
      const compressedImage = await compressImage(file);
      onAvatarChange(compressedImage);
      
      notification.success({
        message: "Фото загружено",
        description: "Фотография успешно добавлена",
        placement: "topRight",
        duration: 2,
      });
    } catch {
      notification.error({
        message: "Ошибка обработки",
        description: "Не удалось обработать изображение",
        placement: "topRight",
      });
    }
  }, [compressImage, validateFile, onAvatarChange]);

  const handleAvatarRemove = useCallback(() => {
    onAvatarChange(null);
  }, [onAvatarChange]);

  return {
    fileInputRef,
    handleAvatarClick,
    handleAvatarChange,
    handleAvatarRemove,
  };
};
