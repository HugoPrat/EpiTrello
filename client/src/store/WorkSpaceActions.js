import axios from 'axios'

export const getBoards = async (uid) => {
  const response = await fetch("https://epitrello-server.herokuapp.com/workspace/getBoards?uidUser="+uid)
  const data = await response.json()
  return data;
}

export const addBoard = async (query) => {
  const response = await axios({
    method: 'post',
    url: 'https://epitrello-server.herokuapp.com/workspace/createBoard',
    data: {
      uidUser: query.uid,
      boardName: query.boardName,
    }
  });
  return response;
}

export const editBoard = async (query) => {
  const response = await axios({
    method: 'post',
      url: 'https://epitrello-server.herokuapp.com/workspace/editBoardName',
    data: {
      uidBoard: query.uidBoard,
      uidUser: query.uidUser,
      oldName: query.oldName,
      newName: query.newName,
    }
  });
  return response;
}

export const deleteBoard = async (query) => {
  const response = await axios({
    method: 'post',
      url: 'https://epitrello-server.herokuapp.com/workspace/deleteBoard',
    data: {
      uidBoard: query.uidBoard,
      uidUser: query.uidUser,
    }
  });
  return response;
}