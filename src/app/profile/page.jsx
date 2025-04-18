"use client";
import PostUpload from "@/app/components/PostUpload";
import ProfileFeed from "@/app/components/ProfileFeed";
import Navbar from "@/app/components/Navbar";
import React, { useContext, useState, useEffect } from "react";
import ProfileForm from "../components/ProfileForm";
import ProfileCard from "@/app/components/ProfileCard"; // นำเข้า ProfileCard
import { SessionContext } from "@/app/api/checkUser/route";
import { getProfile } from "../api/route"; // นำเข้า getProfile ฟังก์ชันที่คุณสร้างไว้

export default function ProfilePage() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(false);


    const { sessionUser: localSessionUser } = useContext(SessionContext);
    const [apiUserData, setApiUserData] = useState(null);

    const posts = [
        { name: "NAME ARTIST", time: "2 days ago", account: "Account" },
        { name: "NAME ARTIST", time: "4 days ago", account: "Account" },
    ];

    const handleNewPost = () => {
        console.log("Post clicked");
    };

    useEffect(() => {
        console.log("***********************")
        const fetchProfile = async () => {
            const result = await getProfile();
            if (!result.error) {
                setApiUserData(result.user);
            }
        };
        fetchProfile();
    }, []);

    console.log("Local Session User:", localSessionUser);
    console.log("API User Data:", apiUserData);
    return (
        <div>
            <Navbar session={localSessionUser} />
            <div className="max-w-3xl mx-auto p-4">
                <ProfileCard userData={apiUserData || localSessionUser} />
                <PostUpload onPost={handleNewPost} />
                <ProfileFeed posts={posts} />
                <ProfileForm isOpen={isOpen} setIsOpen={setIsOpen} isLogin={isLogin} />
            </div>
        </div>
    );
}