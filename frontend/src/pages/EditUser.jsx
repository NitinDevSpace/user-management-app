import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import api from '../api/api';
import firebase from '../utils/firebase';

const EditUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, setValue } = useForm();
    const [user, setUser] = useState(null);
    const [image, setImage] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const response = await api.get(`/users/${id}`);
            setUser(response.data);
            setValue('name', response.data.name);
            setValue('email', response.data.email);
            setValue('phone', response.data.phone);
            setValue('dob', response.data.dob.split('T')[0]);
            setValue('bio', response.data.bio);
        };
        fetchUser();
    }, [id, setValue]);

    const onSubmit = async (data) => {
        let imageUrl = user.imageUrl;
        if (image) {
            imageUrl = await firebase.uploadImage(image);
        }
        await api.put(`/users/${id}`, { ...data, imageUrl });
        navigate('/dashboard');
    };

    if (!user) return <div>Loading...</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Edit User</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <input type="text" placeholder="Name" {...register('name')} className="input" />
                <input type="email" placeholder="Email" {...register('email')} className="input" />
                <input type="text" placeholder="Phone" {...register('phone')} className="input" />
                <input type="date" {...register('dob')} className="input" />
                <textarea placeholder="Bio" {...register('bio')} className="input" />
                <input type="file" onChange={(e) => setImage(e.target.files[0])} className="input" />
                <button type="submit" className="btn">Update User</button>
            </form>
        </div>
    );
};

export default EditUser;