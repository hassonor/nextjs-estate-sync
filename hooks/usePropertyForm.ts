import {useCallback} from 'react';
import updateProperty from '@/app/actions/updateProperty';
import {IProperty} from '@/interfaces/property.interface';

export const usePropertyForm = (property: IProperty, selectedImages: File[]) => {
    const updatePropertyById = updateProperty.bind(null, property._id!);

    const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        // Manually append selected images to the form data
        selectedImages.forEach(image => {
            formData.append('newImages', image);
        });

        await updatePropertyById(formData);
    }, [selectedImages, updatePropertyById]);

    return {handleSubmit};
};
