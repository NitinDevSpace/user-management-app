import React from 'react';

const UserCardLandscape = ({ user, onFollowToggle }) => {
    const { imageUrl, name, email, phone, dob, followersCount, followingCount } = user;

    const calculateAge = (dob) => {
        const birthDate = new Date(dob);
        const ageDiff = Date.now() - birthDate.getTime();
        const ageDate = new Date(ageDiff);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    };

    return (
        <div className="flex items-center border p-4 rounded-lg shadow-md">
            {imageUrl && <img src={imageUrl} alt={name} className="w-24 h-24 rounded-full mr-4" />}
            <div className="flex-grow">
                <h2 className="text-xl font-bold">{name}</h2>
                <p>Email: {email}</p>
                <p>Phone: {phone}</p>
                <p>DOB: {new Date(dob).toLocaleDateString()}</p>
                <p>Age: {calculateAge(dob)}</p>
                <p>Followers: {followersCount}</p>
                <p>Following: {followingCount}</p>
            </div>
            <button 
                onClick={onFollowToggle} 
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Follow/Unfollow
            </button>
        </div>
    );
};

export default UserCardLandscape;