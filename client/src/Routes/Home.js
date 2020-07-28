import React from 'react';
import Cookies from "universal-cookie"
import Box from '@material-ui/core/Box';
import { getBoards, addBoard, deleteBoard, editBoard } from "../store/WorkSpaceActions"
import "../css/Home.css"

import { Button, FormControl, InputGroup, Card } from "react-bootstrap";
import Popup from "reactjs-popup";

const cookies = new Cookies()

export default class Home extends React.Component {

  state = {
    AddBoardName: "",
    editBoard: "",
  }

  HandleAdd = async() => {
    var res = await addBoard({uid: cookies.get("uid"), boardName: this.state.AddBoardName})
    if (res && res.statusText === "OK") {
      this.RenderBoards();
      this.setState({AddBoardName: ""})
    }
  }

  HandleRemove = async (boardID) => {
    var res = await deleteBoard({uidBoard: boardID, uidUser: cookies.get('uid'),})
    if (res && res.statusText === "OK") {
      this.RenderBoards();
    }
  }

  HandleEdit = async (data) => {
    var res = await editBoard({uidBoard: data.id, uidUser: cookies.get("uid"), oldName: data.name, newName: this.state.editBoard})
    if (res && res.statusText === "OK") {
      this.RenderBoards();
    }
  }

  RenderBoards = () => {
    getBoards(cookies.get("uid"))
      .then(data => this.setState({data}))
  }

  RedirectBoard = (boardID) => {
    cookies.set("board", boardID, { path: '/'})
    this.props.history.push('/board')
  }

   change = (e) => {
       this.setState({ [e.target.id]: e.target.value })
   }

  render() {

    return (
      <div className="auth-inner Container">
        <Box width='100%' height="90%">
          {this.state && this.state.data && (
            <div>
              {this.state.data.boards.data.map(buff => (
                <Card key={buff.boardName} className='Tile' bg='secondary' text='white'>
                  <Card.Header onClick={() => this.RedirectBoard(buff.boardID)}>{buff.boardName}</Card.Header>
                  <Card.Body>
                    <Popup trigger={<Button variant="info">edit</Button>} position="top center">
                      <div className="form-group">
                        <InputGroup className="mb-3">
                          <FormControl
                            onChange={this.change}
                            id="editBoard"
                            placeholder="New name"
                            aria-label="New name"
                            aria-describedby="basic-addon2"
                            value={this.state.editBoard}
                          />
                          <InputGroup.Append>
                            <Button disabled={!this.state.editBoard} variant="outline-secondary" onClick={() => this.HandleEdit({id: buff.boardID, name: buff.boardName})}>Ok</Button>
                          </InputGroup.Append>
                        </InputGroup>
                      </div>
                    </Popup>{' '}
                    <Button variant="danger" onClick={() => this.HandleRemove(buff.boardID)}>X</Button>
                  </Card.Body>
                </Card>
              ))}
            </div>
          )}
        </Box>
          <Button variant="primary" size="lg" onClick={this.RenderBoards.bind(this)} >REFRESH</Button>{' '}
          <Popup trigger={<Button variant="success" size="lg">ADD</Button>} position="top center">
            <div className="form-group">
              <InputGroup className="mb-3">
                <FormControl
                  onChange={this.change}
                  id="AddBoardName"
                  placeholder="Enter a name"
                  aria-label="Enter a name"
                  aria-describedby="basic-addon2"
                  value={this.state.AddBoardName}
                />
                <InputGroup.Append>
                  <Button disabled={!this.state.AddBoardName} variant="outline-secondary" onClick={this.HandleAdd.bind(this)}>Ok</Button>
                </InputGroup.Append>
              </InputGroup>
            </div>
          </Popup>{' '}
      </div>
    );}
  }