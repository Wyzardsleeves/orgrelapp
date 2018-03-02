import React, { Component } from 'react';
import axios from 'axios'
import icon from '../user-icon.svg'

const baseUrl = 'https://orgrel-api.herokuapp.com/api/v1/users/';

class Orgrel extends Component {
  constructor(props){
    super(props);
    this.state = {
      users: []
    }
  };

  componentWillMount(){
    this.getFromApi();
  }

  getFromApi(){
    axios.get(baseUrl)
      .then((response) => {
        this.setState({users: response.data.data}, function(){
          console.log(this.state.users);
        });
      })
      .catch(function (error){
        console.log(error);
      });
  }

  addMinion(){

  }

  updateUser(){

  }

  deleteUser(e){
    axios.delete(baseUrl + e.id);
    //console.log("delete works on " + e.first_name + " " + e.last_name);
  }

  render() {
    return (
      <div className="orgrel">
        <div>
          <h2>Staff</h2>
        </div>
        <div className="orgrel-content">
          <ul className="staff-section">
            {this.state.users.map((staff) =>
              <li className="staff-entry" key={staff.id}>
                <div className="staff-portrait">
                  <img src={icon} alt="user-portrait" />
                </div>
                <div className="staff-info">
                  <h4>{staff.last_name}, {staff.first_name}</h4>
                  <h5>{staff.title}</h5>
                  <p>{staff.description}</p>
                </div>
                <div className="icon-options">
                  <i className="ion-plus-round"></i>
                  <i className="ion-edit"></i>
                  <i className="ion-close-round" onClick={() => this.deleteUser(staff)}></i>
                </div>
                {/*
                <i className="ion-plus-round" onClick={this.addMinion()}></i>
                <i className="ion-edit" onClick={this.updateUser()></i>
                <i className="ion-close-round" onClick={this.deleteUser()></i>
                */}
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default Orgrel;
