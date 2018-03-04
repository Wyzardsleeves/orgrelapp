import React, { Component } from 'react';
import axios from 'axios'
import icon from '../user-icon.svg'
import Modal from 'react-modal';
//import Staff from './Staff'

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
      modalIsOpen: false
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillMount(){
    this.getFromApi();
  }

  //Modal functions --------------------------------------
  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  //Core Orgrel functions ---------------------------------

  //Input for both addMinion and updateUser
  handleInput = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

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
  addMinion(){
    console.log("The add is working");
    //modal function will go here
    axios.post(baseUrl,
      {
        first_name: "Bloody",
        last_name: "Freddy",
        description: "Youtube sensation that can be found on Soundcloud",
        title: "Software Engineer",
      }
    )
    .then(function (response) {
      console.log(response);
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
    axios.delete(baseUrl + e.id);
    console.log("delete works on " + e.first_name + " " + e.last_name);
  }

  render() {
    return (

      <div className="orgrel">
        <h2>
          Staff
        </h2>

        {/*More modal BS*/}
        <button onClick={this.openModal}>Open Modal</button>

        <Modal isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <h2 ref={subtitle => this.subtitle = subtitle}>Form</h2>
          <form>
            <div className="modal-entry">
              First Name: <input className='input' type="text"
              name="first_name" placeholder='First Name'
              value={this.state.first_name} onChange={this.handleInput} />
            </div>
            <div className="modal-entry">
                Last Name: <input />
            </div>
            <div className="modal-entry">
                Title: <input />
            </div>
            <div className="modal-entry">
                Description: <input />
            </div>

            <button>Submit</button>
          </form>
          <button onClick={this.closeModal}>Cancel</button>
        </Modal>
        {/*Modal ends here*/}

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
                  <i className="ion-plus-round" onClick={() => this.addMinion()}></i>
                  <i className="ion-edit" onClick={() => this.updateUser(staff)}></i>
                  <i className="ion-close-round" onClick={() => this.deleteUser(staff)}></i>
                </div>
                {
                /*
                <i className="ion-plus-round" onClick={this.addMinion}></i>
                <i className="ion-edit" onClick={this.updateUser></i>
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
