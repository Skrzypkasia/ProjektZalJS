import React, { Component} from 'react'
import GithubWrapper from './gitHubWrapper'

export default class Inputgist extends Component {
    state = {
        inputText: '',
        inputError: ''

    }
    m_handleInputChange = (event) => { 
        
        this.setState({inputText: event.target.value})

    }
    m_validateInput = (event) => {
      this.setState({inputError: event.target.value.length > 3 ? '' :'Name must be longer'})

        
    }
    m_handleSubmit =() =>{
       let ghWrapper = new GithubWrapper();
       let gistPayload ={
            "description": this.state.inputText,
            "public":true,
            "files": {
                "JustFile": {
                    "content": "gist lore"
                }
            }
        }
        ghWrapper.createGist(gistPayload).then((result) =>{console.log(result)}).catch(error => { console.log(error.response)})

    }
    
    render() {
        return (
            <div>
                <form onSubmit={this.m_handleSubmit}>
                    <label>
                        <input type="text" onChange={this.m_handleInputChange} value={this.state.inputText} onBlur={this.m_validateInput}/>
                    </label>
                    <div> {this.state.inputError}</div>
                    <button>Submit!</button>
                </form>
            </div>
        )
    }
}