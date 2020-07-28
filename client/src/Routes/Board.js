import React from 'react';
import Cookies from "universal-cookie"
import Box from '@material-ui/core/Box';
import ListGroup from 'react-bootstrap/ListGroup'
import Badge from 'react-bootstrap/Badge'

const cookies = new Cookies()

export default class Board extends React.Component {

    Content = () => {
        alert("DATA")
    }

    render() {
        return (
      <div className="auth-inner Container">
        <h1>{cookies.get("board")}</h1>
        <Box width='12%' height="90%" display="inline-block">
            <ListGroup as="ul">
                <ListGroup.Item as="li" active>Name list</ListGroup.Item>
                <ListGroup.Item as="li" action onClick={this.Content}>Card 1 <Badge variant="danger" style={{float : 'right'}}>Urgent</Badge></ListGroup.Item>
                <ListGroup.Item action onClick={this.Content}>Card 2</ListGroup.Item>
            </ListGroup>
        </Box>{' '}
        <Box width='12%' height="90%" display="inline-block">
            <ListGroup as="ul">
                <ListGroup.Item as="li" active>Name list</ListGroup.Item>
                <ListGroup.Item as="li" action onClick={this.Content}>Card 1</ListGroup.Item>
                <ListGroup.Item action onClick={this.Content}>Card 2</ListGroup.Item>
            </ListGroup>
        </Box>{' '}
      </div>
        );
    }
}