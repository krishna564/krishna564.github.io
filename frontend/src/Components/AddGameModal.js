import React, { Component } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";
import InputForm from "./InputForm";

class AddGameModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {},
        }
    }

    handleChange =  (e, name) => {
        const { data } = this.state
        this.setState({
            data: { ...data, [name]: e.target.value }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { data } = this.state
        const { submit, onClose } = this.props
        submit(data)
        onClose()
    }

    render() {
        const { isOpen, onClose } = this.props
        const { data } = this.state
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
export default AddGameModal