import React, { useState, useEffect, useCallback } from 'react';
import { User } from './types';
import searchRecommendation from './RecommendationClass';
import { connect } from 'react-redux';
import { RootState } from './redux/store';
import { fetchApiRequest } from './redux/userSaga';

import "./App.css"
import UsersList from './components/UserList/UserList';

interface AppProps {
  users: User[],
  fetchUsers: () => void
}

const App: React.FC<AppProps> = ({
  users,
  fetchUsers
}: AppProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [selectedUserId, setSelectedUserIndex] = useState<number | null>(null)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [openUserList, setOpenUserList] = useState<boolean>(true)

  const recommendedUsers = searchRecommendation.query(searchTerm, users)

  const onSelectUser = useCallback((user: User) => {
    setSearchTerm(user.name)
    setSelectedUserIndex(null)
    setOpenUserList(false)
  }, [setSearchTerm, setOpenUserList, setSelectedUserIndex])

  const navigate = useCallback((e) => {
    switch (e.key) {
      case "ArrowUp": {
        if (selectedUserId !== null && selectedUserId - 1 > -1) {
          setSelectedUserIndex(selectedUserId - 1)
        } else {
          setSelectedUserIndex(0)
        }

        e.preventDefault()
        return
      }
      case "ArrowDown": {
        if (selectedUserId === null) {
          setSelectedUserIndex(0)
          return
        }

        if (selectedUserId + 1 < recommendedUsers.length) {
          setSelectedUserIndex(selectedUserId + 1)
        }

        e.preventDefault()
        return
      }
      case "Enter": {

        if (selectedUser) {
          onSelectUser(selectedUser)
          e.preventDefault()
        }

        return
      }
      default: 
        return
    }
  }, [selectedUserId, setSelectedUserIndex, recommendedUsers, selectedUser, onSelectUser])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  useEffect(() => {
    if (selectedUserId === null) {
      setSelectedUser(null)
      return
    }

    setSelectedUser(recommendedUsers[selectedUserId])
  }, [selectedUserId, recommendedUsers])

  return (
    <div className="App">
      <div className="search-input-container">
        <div className="field">
          <div className="control">
            <input
              className="input is-medium"
              type="text"
              placeholder="Search users"
              onChange={e => {
                setSearchTerm(e.target.value)
                setSelectedUserIndex(null)
                setSelectedUser(null)
                setOpenUserList(true)
              }}
              value={searchTerm}
              onKeyDown={navigate}
            />
          </div>
        </div>
        { openUserList && recommendedUsers.length ?
            <UsersList
              users={recommendedUsers}
              selectedUser={selectedUser}
              onSelect={onSelectUser}
            />:
            null
        }
      </div>
      <a rel="noopener noreferrer" className="github-link" target="_blank" href="https://github.com/manojsinghnegiwd">
        <b>Checkout my github</b>
      </a>
    </div>
  );
}

export default connect(
  ({ userReducer }: RootState) => ({ users: userReducer.users }),
  (dispatch) => ({
    fetchUsers: () => dispatch(fetchApiRequest())
  })
)(App);
