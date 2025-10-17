import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { uploadImage } from '../utils/firebase';
import api from '../api/api';

const CreateUser = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        let imageUrl = null;
        if (data.image[0]) {
            imageUrl = await uploadImage(data.image[0]);
        }

        const userData = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            dob: data.dob,
            bio: data.bio,
            imageUrl: imageUrl,
        };

        await api.post('/users', userData);
        navigate('/dashboard');
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4">Create User</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <input
                    type="text"
                    placeholder="Name"
                    {...register('name', { required: 'Name is required' })}
                    className="w-full p-2 border border-gray-300 rounded"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                <input
                    type="email"
                    placeholder="Email"
                    {...register('email', { required: 'Email is required' })}
                    className="w-full p-2 border border-gray-300 rounded"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                <input
                    type="text"
                    placeholder="Phone"
                    {...register('phone')}
                    className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                    type="date"
                    {...register('dob', { required: 'Date of birth is required' })}
                    className="w-full p-2 border border-gray-300 rounded"
                />
                {errors.dob && <p className="text-red-500 text-sm">{errors.dob.message}</p>}
                <textarea
                    placeholder="Bio"
                    {...register('bio')}
                    className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                    type="file"
                    {...register('image')}
                    className="w-full p-2 border border-gray-300 rounded"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded"
                >
                    Create User
                </button>
            </form>
        </div>
    );
};

export default CreateUser;