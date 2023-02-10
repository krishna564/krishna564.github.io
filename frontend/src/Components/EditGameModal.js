import React, { Component } from "react";
import { Modal, ModalBody, ModalHeader } from "react-bootstrap";
import InputForm from "./InputForm";

class EditGameModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {},
        }
    }

    componentDidMount(){
        const { isEdit, data } = this.props
        this.setState({
            data: data
        })
    }

    componentDidUpdate(prevProps){
        const { data: prevData } = prevProps
        const { data } = this.props
        if( prevData !== data) {
            this.setState({
                data: data
            })
        }
    }

    handleChange =  (e, name) => {
        const { data } = this.state
        this.setState({
            data: { ...data, [name]: e.target.value }
        })
    }

    handleSubmit = (e) => {
        // e.preventDefault()
        const { data } = this.state
        const { onClose, update } = this.props
        update(data.id, data)
        onClose()
    }

    render() {
        const { isOpen, onClose } = this.props
        const { data } = this.state
        console.log(data, 'zzz')
        return(
            <React.Fragment>
                <Modal show={isOpen} onHide={onClose}>
                    <ModalHeader closeButton>
                        Add Game
                    </ModalHeader>
                    <ModalBody>
                        <InputForm handleChange={this.handleChange} handleSubmit={this.handleSubmit} data={data} />
                    </ModalBody>
                </Modal>
            </React.Fragment>
        )
    }
}

export default EditGameModal