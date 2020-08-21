import React from "react";
import { User } from "../../types";
import UserItem from "../UserItem/UserItem";

interface UsersListProps {
    users: User[],
    selectedUser: User | null,
    onSelect: (selectedUser: User) => void
}

const UsersList: React.FC<UsersListProps> = ({
    users,
    selectedUser,
    onSelect
}: UsersListProps) => {
    return (
        <div className="search-results-container">
            {
                users.map(
                    (user: User) => {

                        let selected = false

                        if (selectedUser) {
                            selected = user.id === selectedUser.id
                        }

                        return (
                            <UserItem
                                key={user.id}
                                user={user}
                                selected={selected}
                                onClick={() => onSelect(user)}
                            />
                        )
                    }
                )
            }
        </div>
    )
}

export default UsersList
