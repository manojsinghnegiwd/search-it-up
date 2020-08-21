import React, { useRef, useEffect } from "react";
import { User } from "../../types";

import "./UserItem.css"

interface UserItemProps {
    user: User,
    selected: boolean,
    onClick: () => void
}

const UserItem: React.FC<UserItemProps> = ({
    user,
    selected,
    onClick
}: UserItemProps) => {

    const itemRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (selected && itemRef.current) {
            itemRef.current.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "start",
            })
        }
    }, [itemRef, selected])

    return (
        <div onClick={onClick} ref={itemRef} className={`card ${selected ? "selected" : ""} animate__animated animate__fadeIn`}>
            <div className="card-content">
                <div className="content">
                    <a rel="noopener noreferrer" href={`http://${user.website}`} target="_blank">@{user.username}</a>
                    <p>{user.name}</p>
                </div>
            </div>
        </div>
    )
}

export default UserItem
