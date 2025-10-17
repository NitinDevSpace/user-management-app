import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserCardLandscape = ({ user, onFollowToggle }) => {
    const { id, imageUrl, name, email, phone, dob, followersCount, followingCount, isFollowing } = user;

    const [localIsFollowing, setLocalIsFollowing] = useState(isFollowing);
    const [localFollowersCount, setLocalFollowersCount] = useState(followersCount);
    const [localImageUrl, setLocalImageUrl] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (imageUrl instanceof File) {
            const url = URL.createObjectURL(imageUrl);
            setLocalImageUrl(url);
            return () => URL.revokeObjectURL(url);
        } else if (imageUrl) {
            setLocalImageUrl(imageUrl);
        } else {
            setLocalImageUrl('');
        }
    }, [imageUrl]);

    const calculateAge = (dob) => {
        const birthDate = new Date(dob);
        const ageDiff = Date.now() - birthDate.getTime();
        const ageDate = new Date(ageDiff);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    };

    const handleFollowToggle = () => {
        if (localIsFollowing) {
            setLocalFollowersCount(prev => prev - 1);
        } else {
            setLocalFollowersCount(prev => prev + 1);
        }
        setLocalIsFollowing(!localIsFollowing);
        onFollowToggle(id);
    };

    const handleEditUser = () => {
        navigate(`/edit-user/${id}`);
    };

    return (
        <div className="flex items-center border p-4 rounded-lg shadow-md">
            {localImageUrl ? (
                <img src={localImageUrl} alt={name} className="w-32 h-20 rounded mr-4 object-cover" />
            ) : (
                <div className="w-32 h-20 rounded mr-4 bg-gray-300" />
            )}
            <div className="flex-grow flex flex-col">
                <h2 className="text-xl font-bold">{name}</h2>
                <p>Email: {email}</p>
                <p>Phone: {phone}</p>
                <p>DOB: {new Date(dob).toLocaleDateString()}</p>
                <p>Age: {calculateAge(dob)}</p>
                <p>Followers: {localFollowersCount}</p>
                <p>Following: {followingCount}</p>
            </div>
            <div className="flex flex-col space-y-2 ml-4">
                <button 
                    onClick={handleFollowToggle} 
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    {localIsFollowing ? 'Unfollow' : 'Follow'}
                </button>
                <button 
                    onClick={handleEditUser}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    Edit User
                </button>
            </div>
        </div>
    );
};

export default UserCardLandscape;