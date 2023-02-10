import axios from "axios"
import React, { Component } from "react"
import moment from 'moment'
import { Button, ButtonGroup, Form } from "react-bootstrap"
import AddGameModal from "./AddGameModal"
import EditGameModal from "./EditGameModal"
import { Input, FormGroup } from "reactstrap"
import './list.css'

class List extends Component{
    constructor(props){
        super(props)
        this.state = {
            games : {},
            isOpen: false,
            isOpenEdit: false,
            data: {},
            q:'',
        }
    }

    componentDidMount() {
        this.getAll()
    }

    getAll = () => {
        axios.get("http://127.0.0.1:8000/game/list").then((res) => {
            this.setState({
                games: res.data,
            })
        }).catch((err) => {
            console.log(err)
        })
    }

    handleSubmit = (data) => {
        axios.post("http://127.0.0.1:8000/game/create", data).then((res) => {
            console.log(res)
            const { data } = res
            this.setState({
                games: data
            })
        }).catch((err) => {
            console.log(err)
        })
    }

    handleDelete = (id) => {
        axios.delete("http://127.0.0.1:8000/game/delete/"+id).then((res) => {
            this.setState(({
                games: res.data
            }))
        }).catch((err) => {
            console.log(err)
        })
    }

    handleUpdate = (id, data) => {
        axios.put("http://127.0.0.1:8000/game/update/"+id, data).then((res) => {
            this.setState(({
                games: res.data
            }))
        }).catch((err) => {
            console.log(err)
        })
    }

    open = () => {
        const { isOpen } = this.state
        this.setState({
            isOpen: !isOpen,
        })
    }

    openEditModal = (i) => {
        const { isOpenEdit, games } = this.state
        this.setState({
            data: games[i],
            isOpenEdit: !isOpenEdit
        })
    }

    onClose = () => {
        const {isOpen} = this.state
        this.setState({
            isOpen: !isOpen,
        })
    }

    onCloseEdit = () => {
        const { isOpenEdit } = this.state
        this.setState({
            isOpenEdit: !isOpenEdit,
        })
    }

    handleSearchChange = (e) => {
        this.setState({
            q: e.target.value,
        })
    }

    handleSearch = (e) => {
        e.preventDefault()
        const { q } = this.state
        axios.get("http://127.0.0.1:8000/game/get/"+q).then((res) => {
            this.setState(({
                games: res.data
            }))
        }).catch((err) => {
            console.log(err)
        })
    }

    render(){
        const { games, isOpen, data, isOpenEdit, q } = this.state
        return(
            <div>
                <Form className="list-games-search" onSubmit={(e) => this.handleSearch(e)}>
                    <Input 
                        type="text" 
                        name="search" 
                        value={q} 
                        onChange={(e) => this.handleSearchChange(e)} 
                        placeholder='Search' 
                        className="list-games-search-input"
                    />
                    <Button 
                        className="btn-primary list-games-search-button"
                        onClick={(e) => this.handleSearch(e)}
                    >Search</Button>
                </Form>
                {games.length > 0 ? (
                    <table className="list-games">
                        <thead className="list-games-header">
                            <th>Name</th>
                            <th>URL</th>
                            <th>Author</th>
                            <th>Published Date</th>
                            <th>Actions</th>
                        </thead>
                        <tbody className="list-games-body">
                            {games.map((game, i) => (
                                <tr key={i} className="list-games-item">
                                    <td className="list-games-name">{game.name}</td>
                                    <td className="list-games-url">{game.url}</td>
                                    <td className="list-games-author">{game.author}</td>
                                    <td className="list-games-date">{moment(game.published_date).format("Do MMM YY")}</td>
                                    <td className="list-games-actions">
                                        <Button onClick={() => this.openEditModal(i)} className="list-games-edit">Edit</Button>
                                        <Button onClick={() => this.handleDelete(game.id)} className="list-games-delete">Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div>No Games are Present</div>
                )}
                <Button className="btn-primary create-game" onClick={() => this.open()}>Create Game</Button>
                <AddGameModal 
                    isOpen={isOpen} 
                    onClose={this.onClose} 
                    submit={this.handleSubmit} 
                />
                <EditGameModal
                    isOpen={isOpenEdit}
                    onClose={this.onCloseEdit}
                    update={this.handleUpdate}
                    data={data}
                />
            </div>
        )
    }
}

export default List