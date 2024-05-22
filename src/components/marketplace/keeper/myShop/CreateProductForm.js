import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import ProductService from '../../../../services/ProductService';
import './CreateProductForm.css';

const CreateProductForm = () => {
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      stockAvailability: 0,
      categoryId: 0,
      tags: [''],
      images: []
    }
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tags'
  });

  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages((prevImages) => [...prevImages, ...files]);
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('description', data.description);
      formData.append('price', data.price);
      formData.append('stockAvailability', data.stockAvailability);
      formData.append('categoryId', data.categoryId);
      data.tags.forEach((tag, index) => {
        formData.append(`tags[${index}]`, tag);
      });
      selectedImages.forEach((image, index) => {
        formData.append(`images`, image);
        data.images.push(image);
      });

      await ProductService.createProduct(data);
      alert('Product created successfully');
      reset(); // Clear the form
      setSelectedImages([]); // Clear selected images
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Failed to create product');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="create-product-form">
      <div>
        <label>Name:</label>
        <input {...register('Name', { required: true })} />
      </div>
      <div>
        <label>Description:</label>
        <textarea {...register('Description', { required: true })} />
      </div>
      <div>
        <label>Price:</label>
        <input type="number" {...register('Price', { required: true, min: 0 })} />
      </div>
      <div>
        <label>Stock Availability:</label>
        <input type="number" {...register('StockAvailability', { required: true, min: 0 })} />
      </div>
      <div>
        <label>Category ID:</label>
        <input type="number" {...register('CategoryId', { required: true, min: 0 })} />
      </div>
      <div>
        <label>Tags:</label>
        {fields.map((field, index) => (
          <div key={field.id}>
            <input {...register(`tags.${index}`)} />
            <button type="button" onClick={() => remove(index)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={() => append('')}>Add Tag</button>
      </div>
      <div>
        <label>Images:</label>
        <input type="file" multiple onChange={handleImageChange} />
        <div className="image-preview">
          {selectedImages.map((image, index) => (
            <img key={index} src={URL.createObjectURL(image)} alt={`preview ${index}`} />
          ))}
        </div>
      </div>
      <button type="submit">Create Product</button>
    </form>
  );
};

export default CreateProductForm;
