import React, { useEffect, useState } from 'react';
import axios from '../api/api';
import UserCardLandscape from '../components/UserCardLandscape';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/users');
                setUsers(response.data);
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

    if (loading) {
        return <div>Loading...</div>;
    }

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