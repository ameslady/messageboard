// React Library 
const React = require('react');

// Stateful MsgBoard Component
class NewMsg extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: "", msg: "" };
        this.handleText = this.handleText.bind(this);
        this.addMessage = this.addMessage.bind(this);
    }
    // Ensures the components state stays in sync with the 
    // Form DOM Elemenets states
    handleText(event) {
        if(event.target.id === 'name') {
            this.setState({
                name: event.target.value
            });
        } else {
            this.setState({
                msg: event.target.value
            });
        }
    }   
    //
    addMessage(event) {
        event.preventDefault();

        // save state to local
        //let name = this.state.name;
        let msg = this.state.msg;

        // make sure neither field is empty
        if (!msg){
            return console.error('Msg cannot be empty');
        }

        // trim any whitespace
        msg = msg.trim();

        // pass control to MsgBoard so it can make the API call and update message
        this.props.addMsgCallback({ name: this.props.user, msg: msg });
    }
    
    
    render() {
        return (
            <form onSubmit={this.addMessage}>
                <div className="form-group">
                    <div className="row">
                        <label htmlFor="msg" className="col-7 col-form-label">
                            Enter Message:
                        </label>
                    </div>
                    <div className="row">
                        <div className="col-7">
                            <input id="msg" type="text" className="form-control"
                            placeholder="Your Message" value={this.state.msg}
                            onChange={this.handleText} />    
                        </div>
                        <div className="col-2">
                            <button type="submit" className="btn btn-primary">
                                Post
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

module.exports = NewMsg;