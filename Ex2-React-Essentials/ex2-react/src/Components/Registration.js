import React, {Component} from 'react';
import {Button} from '@material-ui/core';

const formInput = {
    display: 'block',
    marginTop: '10px',
    height: '28px',
    width: '140%',
    justifyContent:'center', 
    alignItems:'center',
}
class Registration extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: props.formInputs.name,
            location: props.formInputs.location,
            date: props.formInputs.date,
        }

        this.save = this.save.bind(this)
        this.inputChanged = this.inputChanged.bind(this)
    }

    /* is invoked immediately after updating occurs. 
    This method is not called for the initial render. */
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.formInputs !== prevProps.formInputs) {
            this.setState({
                name: this.props.formInputs.name,
                location: this.props.formInputs.location,
                date: this.props.formInputs.date,
            })
        }
    }

    inputChanged(e) {
        e.preventDefault();
        const name = e.target.name
        const val = e.target.value
        this.setState({ [name]: val })
    }
    
    save(e) {
        e.preventDefault()
        if ( this.state.date === '' || this.state.name === '' || this.state.location === '') {
            alert("can't save empty form!");
            return;
        }

        const newClient = {
            date: this.state.date,
            name: this.state.name,
            location: this.state.location
        }

        this.setState({ name: '', date: '', location: '' })

        if (this.props.edit) {
            this.props.onEdit(newClient, this.props.formInputs.id)
        } else {
            newClient.id = null
            this.props.onAdd(newClient)
        }
    }

    render() {
        return (
            <div style={{marginLeft: '60%', marginTop: '-10%', display: 'block', position: 'absolute', zIndex: 0}}>
                <input style={formInput} type={'date'} name={'date'} value={this.state.date} onChange={this.inputChanged}/>
                <input style={formInput} type={'text'} name={'name'} value={this.state.name} onChange={this.inputChanged}/>
                <input style={formInput} type={'text'} name={'location'} value={this.state.location} onChange={this.inputChanged}/>
                <Button style={{width: '70%', marginTop: '10%', marginLeft: '37%'}} id={'save'} onClick={this.save} variant="contained" color="secondary">SAVE</Button>
            </div>  
        ) 
    }     
}

export default Registration;