"use client"
import React, { useEffect, useState } from "react";
import { checkSession } from "@/app/api/route";
import Navbar from "@/app/components/Navbar";
import PostUpload from "@/app/components/PostUpload";
import ProfileFeed from "@/app/components/ProfileFeed";
import ProfileForm from "../components/ProfileForm";

export default function ProfilePage() {
    const [sessionUser, setSessionUser] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        const fetchSession = async () => {
            await checkSession(setSessionUser);
        };
        fetchSession();
    }, []);

    const posts = [
        { name: "NAME ARTIST", time: "2 days ago", account: "Account" },
        { name: "NAME ARTIST", time: "4 days ago", account: "Account" }
    ];

    const handleNewPost = () => {
        console.log("Post clicked");
    };

    return (
        <div>
            <Navbar session={sessionUser} />
            <div className="max-w-3xl mx-auto p-4">
                {/* Profile Header */}
                <div className="bg-gray-700 rounded-t-lg p-4 relative">
                    <div className="absolute top-4 right-4 flex space-x-2">
                        <button
                            onClick={() => {
                                setIsLogin(true);
                                setIsOpen(true);
                            }}
                            className="text-teal-300 text-sm flex items-center space-x-1 border border-teal-300 px-3 py-1 rounded">
                            <span>Edit Profile</span>
                        </button>
                    </div>
                    <div className="flex items-center space-x-4 mt-8">
                        <div className="w-20 h-20 rounded-full bg-yellow-400 flex items-center justify-center text-3xl font-bold text-white">
                            {/* ใช้ภาพ avatar ได้จริงในโปรเจกต์ */}
                            <span>👨</span>
                        </div>
                        <div className="text-white">
                            <h1 className="text-2xl font-semibold">{sessionUser ? sessionUser.name : 'Name'}</h1>
                            <p className="text-sm">Role: {sessionUser ? sessionUser.role : 'Role'}</p>
                            <div className="text-xs mt-1 text-gray-300">
                                <span>0 Followers</span> · <span>0 Followings</span>
                            </div>
                            <p className="mt-2 text-gray-400 text-sm">Details</p>
                        </div>
                    </div>
                </div>

               

                {/* Upload Post */}
                <PostUpload onPost={handleNewPost} />

                {/* Post Feed */}
                <ProfileFeed posts={posts} />

                {/* Profile Form Modal */}
                <ProfileForm isOpen={isOpen} setIsOpen={setIsOpen} isLogin={isLogin} />
            </div>
        </div>
    );
}
