import React, { useEffect, useState } from 'react';
import axios from '../api/api';
import UserCardLandscape from '../components/UserCardLandscape';
import { useNavigate } from 'react-router-dom';

const hardcodedUsers = [
    { id: 1, name: 'User One', isFollowing: false, followersCount: 10, imageUrl: '/demo.png' },
    { id: 2, name: 'User Two', isFollowing: true, followersCount: 20, imageUrl: '/demo.png' },
    { id: 3, name: 'User Three', isFollowing: false, followersCount: 5, imageUrl: '/demo.png' },
    { id: 4, name: 'User Four', isFollowing: true, followersCount: 15, imageUrl: '/demo.png' },
    { id: 5, name: 'User Five', isFollowing: false, followersCount: 8, imageUrl: '/demo.png' },
    { id: 6, name: 'User Six', isFollowing: true, followersCount: 12, imageUrl: '/demo.png' },
    { id: 7, name: 'User Seven', isFollowing: false, followersCount: 7, imageUrl: '/demo.png' },
    { id: 8, name: 'User Eight', isFollowing: true, followersCount: 9, imageUrl: '/demo.png' },
    { id: 9, name: 'User Nine', isFollowing: false, followersCount: 11, imageUrl: '/demo.png' },
    { id: 10, name: 'User Ten', isFollowing: true, followersCount: 14, imageUrl: '/demo.png' },
];

const Dashboard = () => {
    const [users, setUsers] = useState(hardcodedUsers);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/users');
                const fetchedUsers = response.data;

                // Merge fetched users with hardcoded users without duplicates
                const mergedUsersMap = new Map();
                // Add hardcoded users first
                hardcodedUsers.forEach(user => {
                    mergedUsersMap.set(user.id, user);
                });
                // Add/overwrite with fetched users
                fetchedUsers.forEach(user => {
                    mergedUsersMap.set(user.id, user);
                });

                setUsers(Array.from(mergedUsersMap.values()));
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleFollowToggle = async (userId) => {
        const userIndex = users.findIndex(user => user.id === userId);
        if (userIndex === -1) return;

        const user = users[userIndex];
        const isCurrentlyFollowing = user.isFollowing;

        try {
            if (isCurrentlyFollowing) {
                await axios.post(`/users/${userId}/unfollow`);
            } else {
                await axios.post(`/users/${userId}/follow`);
            }

            const updatedUsers = [...users];
            updatedUsers[userIndex] = {
                ...user,
                isFollowing: !isCurrentlyFollowing,
                followersCount: isCurrentlyFollowing ? user.followersCount - 1 : user.followersCount + 1,
            };
            setUsers(updatedUsers);
        } catch (error) {
            console.error(`Error toggling follow status for user ${userId}:`, error);
        }
    };

    const handleAddUserClick = () => {
        navigate('/create-user');
    };

  

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">User Dashboard</h1>
                <button 
                    onClick={handleAddUserClick} 
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Add User
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {users.map(user => (
                    <UserCardLandscape 
                        key={user.id} 
                        user={user} 
                        onFollowToggle={handleFollowToggle} 
                    />
                ))}
            </div>
        </div>
    );
};

export default Dashboard;