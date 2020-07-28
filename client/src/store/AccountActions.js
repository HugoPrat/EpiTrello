import axios from 'axios'

export const registerAction = async (query) => {
  const response = await axios({
    method: 'post',
    url: 'https://epitrello-server.herokuapp.com/account/register',
    data: {
      email: query.email,
      password: query.password,
      pseudo: query.pseudo
    }
  });
  const data = response.data
  if (data.user && data.user.uid) {
      return data.user.uid;
    } else {
      alert(data.message);
      return "";
    }
  };

export const loginAction = async (query) => {
  const response = await axios({
    method: 'post',
    url: 'https://epitrello-server.herokuapp.com/account/login',
    data: {
      email: query.email,
      password: query.password,
    }
  });
  const data = response.data
  if (data.user && data.user.uid) {
      return data.user.uid;
    } else {
      alert(data.message);
      return "";
    }
}

export const logOut = async () => {
  const response = await fetch("https://epitrello-server.herokuapp.com/account/logout")
  const data = await response.json()
  console.log(data)
}