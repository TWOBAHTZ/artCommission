"use client"
// import ProfileCard from "@/app/components/ProfileCard";
import PostUpload from "@/app/components/PostUpload";
import ProfileFeed from "@/app/components/ProfileFeed";
import Navbar from "@/app/components/Navbar";
import React, {useContext, useEffect, useState} from "react";
import {checkSession} from "@/app/api/route";
import SignForm from "../components/SignForm";
import ProfileForm from "../components/ProfileForm";
import {SessionContext} from "@/app/api/checkUser/route";
import ProfileCard from "@/app/components/ProfileCard";

export default function ProfilePage() {
    const [isOpen, setIsOpen] = useState(false);
    const [isClose, setIsClose] = useState(false);
    const {sessionUser} = useContext(SessionContext);

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
                {/* Profile Header moved to ProfileCard */}
                <ProfileCard
                    user={sessionUser}
                    onEditClick={() => {
                        setIsClose(true);
                        setIsOpen(true);
                    }}
                />
                {/* Upload Post */}
                <PostUpload onPost={handleNewPost} />

                {/* Post Feed */}
                <ProfileFeed posts={posts} />

                {/* Profile Form Modal */}
                <ProfileForm isOpen={isOpen} setIsOpen={setIsOpen} isClose={isClose} />
            </div>
        </div>
    );
}
