// React Library 
const React = require('react');
const Message = require('./Message.jsx');

// MsgList Component
const MsgList = (props) => {
    if (!props.user) {
        return (
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th scope="col" className="w-10"> #(msg number) </th>
                            <th scope="col" className="w-20"> Email </th>
                            <th scope="col" className="w-50"> Message </th>
                        </tr>
                    </thead>
        
                    <tbody>
                        {props.messages.map( (message, index) => 
                            <Message key={message._id} message={message} index={index}
                            user={props.user} />
                        )}
                    </tbody>
                </table>
         ); // end of return
    } else {
        if (props.user == 'admin@admin.com') {
            return (
                <div>
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th scope="col" className="w-10"> #(msg number) </th>
                                <th scope="col" className="w-20"> Email </th>
                                <th scope="col" className="w-50"> Message </th>
                            </tr>
                        </thead>
            
                        <tbody>
                            {props.messages.map( (message, index) => 
                                <Message key={message._id} message={message} index={index}
                                user={props.user} />
                            )}
                        </tbody>
                    </table>
                    <button onClick={props.deleteAllCallback} type="delete" className="btn btn-primary">
                    Delete All
                    </button>
                </div>
             ); // end of return
        } else {
            return (
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th scope="col" className="w-10"> #(msg number) </th>
                            <th scope="col" className="w-20"> Email </th>
                            <th scope="col" className="w-50"> Message </th>
                            <th scope="col" className="w-10"> </th>
                            <th scope="col" className="w-10"> </th>
                        </tr>
                    </thead>
        
                    <tbody>
                        {props.messages.map( (message, index) => 
                            <Message key={message._id} message={message} index={index}
                            deleteMsgCallback={props.deleteMsgCallback}
                            updateMsgCallback={props.updateMsgCallback}
                            user={props.user}/>
                            )}
                    </tbody>
                </table>
            ); // end of return
        }
    }
} // end of component

module.exports = MsgList;