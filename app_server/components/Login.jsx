// React Library 
const React = require('react');

// Stateful Login Component
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { email: "", password: "" };
        this.login = this.login.bind(this);
        this.handleText = this.handleText.bind(this);
        this.register = this.register.bind(this);
    }
    // logs user in
    login(event) {
        event.preventDefault();

        // pass control to MsgBoard and send
        // the end and password the user entered
        this.props.loginCallback({
            email: this.state.email,
            password: this.state.password
        });
    } 
    // Ensures the components state stays in sync with the 
    // Form DOM Elements states
    handleText(event) {
        if(event.target.id === 'email') {
            this.setState({
                email: event.target.value
            });
        } else {
            this.setState({
                password: event.target.value
            });
        }
    }
    // pass control to MsgBoard to deal with this
    register(event) {
        this.props.registerCallback()
    }

    render() {
        let loginFailText;

        if (this.props.loginFail) {
            loginFailText = <p className="card-text pt-1 text-danger">Failed Login Attempt.
            &nbsp;{ this.props.loginAttempts } attempts remaining. </p>
        }
        return (
            <div className="card" style={{padding: '20px'}}>
                <form onSubmit={this.login}>
                    <div className="form-group">
                        <label className="card-title" style={{fontSize: '20px'}}>Log in to post a Message:</label>
                            <div className="row">
                                <label htmlFor="email" className="col-4 col-form-label">
                                    Email:
                                </label>
                                <label htmlFor="password" className="col-4 col-form-label">
                                    Password:
                                </label>
                            </div>
                            <div className="row">
                                <div className="col-4">
                                    <input id="email" type="text" className="form-control"
                                    placeholder="Your Email" value={this.state.email}
                                    onChange={this.handleText} />
                                </div>
                                <div className="col-4">
                                    <input id="password" type="password" className="form-control"
                                    placeholder="Your Password" value={this.state.password}
                                    onChange={this.handleText} />    
                                </div>
                                <div className="col-2">
                                    <button type="submit" className="btn btn-primary">
                                        Log In
                                    </button>
                                </div>
                            </div>
                    </div>
                </form>
                {loginFailText}
                
                <form>
                    <div className="form-group"> 
                        <div className="row">
                            <label htmlFor="register" className="col-2 col-form-label">
                                Registered?
                            </label>   
                        </div>
                        <div className="row">
                            <div className="col-2">
                                <button onClick={this.register} className="btn btn-primary">
                                    Register
                                </button>
                            </div>
                        </div>
                    </div>   
                </form>
            </div>
        );
    }
}

module.exports = Login;