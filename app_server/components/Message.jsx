const React = require('react');

class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editClicked: false,
            msg: "",
            newMsg: "",
            messageid: ""
        };
        this.edit = this.edit.bind(this);
        this.cancel = this.cancel.bind(this);
        this.updateMessage = this.updateMessage.bind(this);
        this.deleteMessage = this.deleteMessage.bind(this);
        this.handleText = this.handleText.bind(this);
    } 

    handleText(event) {
        this.setState({
            newMsg: event.target.value
        });
    }  

    edit(){
        this.setState({
            editClicked: true
        });
    }

    cancel() {
        this.setState({
            editClicked: false
        });
    }

    updateMessage(event) {
        let msg = this.state.newMsg;

        if (!msg){
            return console.error('Msg cannot be empty');
        }

        msg = msg.trim();
 
        this.props.updateMsgCallback(this.props.message._id, msg);
        
        this.setState({
            editClicked: false
        });
    }


    deleteMessage(event) {
        this.props.deleteMsgCallback(this.props.message._id);
    }

    render() {
        if (!this.props.user || this.props.user === 'admin@admin.com'){
            return(
                <tr key={this.props.message._id}>
                    <td>{this.props.index+1}</td>
                    <td>{this.props.message.name}</td>
                    <td>{this.props.message.msg}</td>
                </tr>
           );
        } else if (this.props.user == this.props.message.name) {
            if (!this.state.editClicked) {
                return(
                    <tr key={this.props.message._id}>
                        <td>{this.props.index+1}</td>
                        <td>{this.props.message.name}</td>
                        <td>{this.props.message.msg}</td>
                        <td>
                        <div className="text-center"> 
                        <button onClick={this.edit} type="edit" className="btn btn-primary">
                            Edit
                        </button>
                        </div>
                        </td>
                        <td>
                        <div className="text-center"> 
                        <button onClick={this.deleteMessage} type="delete" className="btn btn-primary">
                            Delete
                        </button>
                        </div>
                        </td>
                    </tr>
                );
            } else {
                return(
                    <tr key={this.props.message._id}>
                        <td>{this.props.index+1}</td>
                        <td>{this.props.message.name}</td>
                        <td>
                            <input id="newMsg" type="text" className="form-control"
                            placeholder={this.props.message.msg} value={this.state.newMsg}
                            onChange={this.handleText}/>   
                        </td>
                        <td>
                        <div className="text-center"> 
                        <button onClick={this.updateMessage} type="update" className="btn btn-primary">
                            Update
                        </button>
                        </div>
                        </td>
                        <td>
                        <div className="text-center"> 
                        <button onClick={this.cancel} type="cancel" className="btn btn-primary">
                            Cancel
                        </button>
                        </div>
                        </td>
                    </tr>
                );
            }
        } else {
            return(
                <tr key={this.props.message._id}>
                    <td>{this.props.index+1}</td>
                    <td>{this.props.message.name}</td>
                    <td>{this.props.message.msg}</td>
                    <td></td>
                    <td></td>
                </tr>
           );
        }
    }
} // end of component

module.exports = Message;