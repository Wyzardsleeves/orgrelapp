import React, { Component } from 'react';
import axios from 'axios'
import icon from '../user-icon.svg'
import Modal from 'react-modal';
//import update from 'immutability-helper'

//Modal BS
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

//URL of Rails API
const baseUrl = 'https://orgrel-api.herokuapp.com/api/v1/users/';

class Orgrel extends Component {
  constructor(props){
    super(props);
    this.state = {
      users: [],
      modalIsOpen: false,
      job: null
    };
    //this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillMount(){
    Modal.setAppElement('body');
    this.getFromApi();
    this.addUser;
    this.updateUser;
    this.handleInput;
    this.openModal;
  }

  //Modal functions --------------------------------------
  openModal() {
    this.setState({modalIsOpen: true});
  }
  openModalUpdate() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  //Core Orgrel functions ---------------------------------

  //Fetch data from api
  getFromApi(){
    axios.get(baseUrl)
      .then((response) => {
        this.setState({users: response.data.data}, function(){
          console.log(this.state.users);
        });
      })
      .catch(function (error){
        console.log(error.response);
      });
  }

  //Add data as child (theoretically)
  addUser(a, b, c, d){
    //event.preventDefault();
    console.log("The add is working");
    //-------- end of modal crap
    axios.post(baseUrl,
      {
        first_name: a,
        last_name: b,
        description: c,
        title: d
      }
    )
    .then(function (response) {
      console.log(response);
      this.closeModal();
    })
    .catch(function (err) {
      console.log(err.response);
    });
  }

  /* Working addMinion original
  addMinion(){
    console.log("The add is working");
    axios.post(baseUrl, {
      first_name: "Bloody",
      last_name: "Freddy",
      description: "Youtube sensation that can be found on Soundcloud",
      title: "Software Engineer",
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (err) {
      console.log(err.response);
    });
  }
  */

  //Update existing user
  updateUser(e){
    //e.preventDefault();
    let currentId = String(e.id);
    console.log("The edit is working, the 'e' is returning " + currentId);
    //a modal field will go here
    axios.put(baseUrl + currentId,
      {
        first_name: '',
        last_name: '',
        description: '',
        title: ''
      }
    )
    .then((response) => {
      console.log(response);
    })
    .catch(error => console.log(error))
  }

  /* working updateUser original
  updateUser(e){
    let currentId = String(e.id);
    console.log("The edit is working, the 'e' is returning " + currentId);
    //a modal field will go here
    axios.put(baseUrl + currentId,
      {
        first_name: "Amy",
        last_name: "Rose",
        description: "Loves sonic, chocolate, Tails(sorta), Cream (BFF) and beating eggman",
        title: "Project Manager"
      }
    )
    .then((response) => {
      console.log(response);
    })
    .catch(error => console.log(error))
  }
  */

  //Deletes current user
  deleteUser(e){
    //e.preventDefault();
    console.log("delete works on " + e.first_name + " " + e.last_name);
    axios.delete(baseUrl + e.id)
    .then((response) => {
      console.log(this.state.users);
    })
    .catch(function (err) {
      console.log(err.response);
    });
  }

  render() {
    return (

      <div className="orgrel">
        <h2>
          Staff
        </h2>

        {/*More modal BS*/}
        <Modal isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <h2 ref={subtitle => this.subtitle = subtitle}>New Form</h2>
          <form onSubmit={() => this.handleInput()}>
            <div className="modal-entry">
              First Name: <input className='input' type="text"
              name="first_name" placeholder='First name here'
              ref="first_name" />
            </div>
            <div className="modal-entry">
              Last Name: <input className='input' type="text"
              name="last_name" placeholder='Last name here'
              ref="last_name" />
            </div>
            <div className="modal-entry">
              Title: <input className='input' type="text"
              name="title" placeholder='Insert position here'
              ref="title" />
            </div>
            <div className="modal-entry">
              Description: <textarea className='input' type="textarea"
              name="description" placeholder='Summary here'
              ref="description" />
            </div>
              <input type="button" value="Submit" onClick={() => this.addUser(this.refs.first_name.value, this.refs.last_name.value, this.refs.title.value, this.refs.description.value)} />
          </form>
          <button onClick={this.closeModal}>Cancel</button>
        </Modal>

        {/*Main page*/}
        <div className="orgrel-content">
          <ul className="staff-section">
            {this.state.users.map((staff) =>
              <li className="staff-entry" key={staff.id}>
                <div className="staff-portrait">
                  <img src={icon} alt="user-portrait-icon" />
                </div>
                <div className="staff-info">
                  <h4>{staff.last_name}, {staff.first_name}</h4>
                  <h5>{staff.title}</h5>
                  <p>{staff.description}</p>
                </div>
                <div className="icon-options">
                  <i className="ion-plus-round" onClick={() => this.openModal()}></i>
                  <i className="ion-edit" onClick={() => this.openModal(staff)}></i>
                  {/*
                    <i className="ion-plus-round" onClick={() => this.addUser()}></i>
                    <i className="ion-edit" onClick={() => this.updateUser(staff)}></i>
                  */}
                  <i className="ion-close-round" onClick={() => this.deleteUser(staff)}></i>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default Orgrel;
