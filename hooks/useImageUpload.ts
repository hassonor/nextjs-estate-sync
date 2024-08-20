import {useState} from 'react';

export const useImageUpload = () => {
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const newFiles = Array.from(files);
            setSelectedImages([...selectedImages, ...newFiles]);

            // Generate previews
            const newPreviews = newFiles.map(file => URL.createObjectURL(file));
            setImagePreviews([...imagePreviews, ...newPreviews]);

            // Clear the file input after selection to allow re-selecting the same file
            e.target.value = '';
        }
    };

    const handleRemoveSelectedImage = (index: number) => {
        setSelectedImages(prev => prev.filter((_, i) => i !== index));
        setImagePreviews(prev => prev.filter((_, i) => i !== index));
    };

    return {
        selectedImages,
        imagePreviews,
        handleImageChange,
        handleRemoveSelectedImage,
    };
};
