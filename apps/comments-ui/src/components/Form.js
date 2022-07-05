import React from 'react';
import AppContext from '../AppContext';
import TotalComments from './TotalComments';
import Comment from './Comment';
import Pagination from './Pagination';

class Form extends React.Component {
    static contextType = AppContext;

    constructor(props) {
        super(props);
        this.state = {
            message: ''
        };

        this.submitForm = this.submitForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async submitForm(event) {
        event.preventDefault();
        const message = this.state.message;

        if (message.length === 0) {
            alert('Please enter a message');
            return;
        }

        try {
            // Todo: send comment to server

            // Clear message on success
            this.setState({message: ''});
        } catch (e) {
            // eslint-disable-next-line no-console
            console.error(e);
        }
    }

    handleChange(event) {
        this.setState({message: event.target.value});
    }

    getInitials() {
        if (!this.context.member || !this.context.member.name) {
            return '';
        }
        const parts = this.context.member.name.split(' ');

        if (parts.length === 0) {
            return '';
        }

        if (parts.length === 1) {
            return parts[0].substring(0, 1);
        }

        return parts[0].substring(0, 1) + parts[parts.length - 1].substring(0, 1);
    }

    render() {
        return (
            <form onSubmit={this.submitForm} className="comment-form">
                <div className="flex justify-between items-center mb-3">
                    <h1 className="text-2xl font-sans font-medium">Members discussion</h1>
                    <TotalComments />
                </div>
                <Pagination />
                <div>
                    <Comment />
                    <Comment />
                </div>
                <div>
                    <div>
                        <figure>
                            <div>
                                { this.getInitials() }
                            </div>
                            { this.context.member ? <img src={this.context.member.avatar_image} width="60" height="60" alt="Avatar"/> : '' }
                        </figure>
                        <div>
                            <div>
                                {this.context.member ? this.context.member.name : ''}
                            </div>
                            <span>
                                Add a bio
                            </span>
                        </div>
                    </div>
                    <textarea className="w-full resize-none rounded-md border p-2 font-sans" value={this.state.message} onChange={this.handleChange} placeholder="What are your thoughts?" />
                    <button type="submit" className="bg-black p-2 text-white rounded w-full mt-2 text-md font-sans">Comment</button>
                </div>
            </form>
        );
    }
}
  
export default Form;
