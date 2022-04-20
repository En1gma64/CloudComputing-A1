import React, { Component } from 'react'

class Admin extends Component {



    render() {

        //get further information

        return (
            <div className="container">
                            <div className="card card-body bg-light mb-3">
                                <div className="row">
                                    <div className="col-2">
                                        <span className="mx-auto">ID: {this.props.id}</span>
                                    </div>
                                    <div className="col-lg-6 col-md-4 col-8">
                                        <h3>Name: {this.props.username}</h3>
                                        <p>Email: {this.props.email}</p>
                                        <p>Account Type: {this.props.role}</p>
                                    </div>
                                    {/* <div className="col-md-4 d-none d-lg-block">
                                        <ul className="list-group">
                                            <a href="#">
                                                <li className="list-group-item board">
                                                    <i className="fa fa-flag-checkered pr-1">Person Profile </i>
                                                </li>
                                            </a>
                                            <a href="#">
                                                <li className="list-group-item update">
                                                    <i className="fa fa-edit pr-1">Update Person Info</i>
                                                </li>
                                            </a>
                                            <a href="">
                                                <li className="list-group-item delete">
                                                    <i className="fa fa-minus-circle pr-1">Delete Person</i>
                                                </li>
                                            </a>
                                        </ul>
                                    </div> */}
                                </div>
                            </div>
                        </div>
        )
    }
}
export default Admin;