import React, { Component } from "react";
import { Input, Label, Form, FormGroup } from "reactstrap";
import moment from "moment";

class InputForm extends Component {
    render(){
        const { handleChange, handleSubmit, data } = this.props
        const date  = moment(data.published_date).format("dd-mm-yyyy")
        console.log(date)
        return (
            <Form onSubmit={(e) => handleSubmit(e)}>
                <FormGroup>
                    <Label for="name">Name</Label>
                    <Input 
                        type="text"
                        name="name" 
                        value={data.name} 
                        onChange={(e) => handleChange(e, "name")} 
                        required />
                </FormGroup>
                <FormGroup>
                    <Label for="url">URL</Label>
                    <Input 
                        type="text" 
                        name="url" 
                        value={data.url} 
                        onChange={(e) => handleChange(e, "url")} 
                        required/>
                </FormGroup>
                <FormGroup>
                    <Label for="author">Author</Label>
                    <Input 
                        type="text" 
                        name="author" 
                        value={data.author} 
                        onChange={(e) => handleChange(e, "author")} 
                        required/>
                </FormGroup>
                <FormGroup>
                    <Label for="published_date">Published Date</Label>
                    <Input 
                        type="date" 
                        name="published_date" 
                        value = {moment(data.published_date).format("YYYY-MM-DD")} 
                        onChange={(e) => handleChange(e, "published_date")} 
                        required/>
                </FormGroup>
                <FormGroup>
                    <Label for="submit">Add Game</Label>
                    <Input type="submit" onClick={(e) => handleSubmit(e)} />
                </FormGroup>
            </Form>
        )
    }
}

export default InputForm