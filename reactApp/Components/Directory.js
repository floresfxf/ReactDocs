import React from 'react';
import { Link, Redirect} from 'react-router-dom';
import {List, ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import {blue500, yellow600} from 'material-ui/styles/colors';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import RaisedButton from 'material-ui/RaisedButton';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class Directory extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      fakeUser: {
        _id: '597797018cccf651b76f25ac',
        name: 'Frankie',
        password: 'Frankie1!',
        email: 'fflores@colgate.edu',
      },
      user: {},
      documents: [],
      value: 1,
      isOpen: false,
      docName: '',
      docPass: '',
      newDocId: '',
      loggedIn: true,
    }
  }

  componentDidMount(){
    console.log('user id in component did mount', this.props.store.get('userId'), this.props.store.get('userId'));
    this.setState({user: this.props.store.get('user')})
    this.ownedByAll()
  }

  logout(){
    fetch('http://localhost:3000/logout')
    .then((response) => {
      return response.json()
    })
    .then((resp) => {
      if (resp.success){
        this.props.store.delete('userId');
        this.setState({
          loggedIn: false,
        })
      }
    })
    .catch((err)=>console.log(err))
  }

  logged(){
    fetch('http://localhost:3000/isLoggedIn', {credentials: 'include'})
    .then((response) => {
      return response.json()
    })
    .then((resp) => {
      console.log("pulled resp", resp);
    })
    .catch((err)=>console.log(err))
  }

  filter(event, value){
    switch(value) {
      case 1:
      this.ownedByAll();
      break;
      case 2:
      this.ownedByMe();
      break;
      case 3:
      this.dateSortNew();
      break;
      case 4:
      this.dateSortOld();
      break;
      default:
      this.ownedByAll();
    }
    this.setState({value: value, isOpen: false})
  }
  dateSortNew(){
    let documents = [...this.state.documents]
    documents.sort(function(a,b){
      return new Date(parseInt(b.dateCreated)) - new Date(parseInt(a.dateCreated));
    });
    this.setState({documents: documents});
  }
  dateSortOld(){
    let documents = [...this.state.documents]
    documents.sort(function(a,b){
      return new Date(parseInt(a.dateCreated)) - new Date(parseInt(b.dateCreated));
    });
    this.setState({documents: documents});
  }


  ownedByAll(){
    //   console.log('');
    fetch('http://localhost:3000/documents/all/'+ this.state.user._id)
    .then((response) => {
      return response.json()
    })
    .then((resp) => {
      console.log("pulled resp", resp);
      this.setState({documents: resp.documents})
    })
    .catch((err)=>console.log(err))
  }


  ownedByMe(){
    fetch('http://localhost:3000/documents/owned/'+ this.state.user._id)
    .then((response) => {
      return response.json()
    })
    .then((resp) => {
      console.log("pulled resp", resp);
      this.setState({documents: resp.documents})
    })
    .catch((err)=>console.log(err))
  }
  handleTouchTap(event){
    // This prevents ghost click.
    event.preventDefault();
    this.setState({
      isOpen: true,
      anchorEl: event.currentTarget,
      value: event.currentTarget.value,
      ModalOpen: false,
    });
  };
  modalOpen(){
    this.setState({modalOpen: true});
  };
  modalClose(){
    this.setState({modalOpen: false});
  };
  handleRequestClose(){
    this.setState({
      isOpen: false,
    });
  };

  formSubmit(e){
    e.preventDefault();
    alert('Submitted form!');
    this.modalClose();
  }

  titleChange(e){
    this.setState({
      docName: e.target.value
    })
  }

  passChange(e){
    this.setState({
      docPass: e.target.value
    })
  }

  newDocument(){
    //   this.props.store.get('userId')
    console.log('this.state.user is ', this.state.user);
    fetch('http://localhost:3000/documents/new/' + this.state.user._id, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: this.state.docName,
            password: this.state.docPass,
            //   collaborators: newCollaborators

        })
    })
    .then((response) => {
        return response.json()
    })
    .then((resp) => {
      this.setState({
        newDocId: resp.document._id,
        // newPassword: resp.document.password
      })
    })
    .catch((err)=>console.log(err))
  }
  render() {

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.modalClose.bind(this)}
      />,
      <FlatButton
        type="submit"
        label="Submit"
        primary={true}
      />,
    ];
    // console.log(this.state.newDocId);
    if (this.state.newDocId){
      return (

        <Redirect to={"/editor/"+this.state.newDocId} />
      )
    }
    return (
      <div>

          <h1 style={{textAlign: 'center', fontSize: '40px', paddingTop: '20px'}} >Document Directory</h1>
          <h2 style={{textAlign: 'center'}} >Open document to edit or create a new one!</h2>
          <h3>{`logged in as ${this.state.user.email} with id ${this.state.user._id}`}</h3>
          <div>

          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <div>
              <FloatingActionButton onTouchTap={this.modalOpen.bind(this)}>
                <ContentAdd />
              </FloatingActionButton>
              <Dialog
                title="Create a New Document"
                // actions={actions}
                modal={false}
                open={this.state.modalOpen}
                onRequestClose={this.modalClose.bind(this)}
                >
                  <form className="commentForm" onSubmit={this.newDocument.bind(this)}>
                      <input
                        type="text"
                        placeholder="Your Document Name"
                        value={this.state.docName}
                        onChange={this.titleChange.bind(this)}
                      />
                      <input
                        type="text"
                        placeholder="Password for Document"
                        value={this.state.docPass}
                        onChange={this.passChange.bind(this)}
                      />

                    <div style={{ textAlign: 'right', padding: 8, margin: '24px -24px -24px -24px' }}>
                      {actions}
                    </div>
                </form>

              </Dialog>
            </div>
            <div>


              <RaisedButton
                onTouchTap={this.handleTouchTap.bind(this)}
                label="Filter"
              />
              <Popover
                open={this.state.isOpen}
                anchorEl={this.state.anchorEl}
                anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                targetOrigin={{horizontal: 'left', vertical: 'center'}}
                onRequestClose={this.handleRequestClose.bind(this)}
                animation={PopoverAnimationVertical}
                useLayerForClickAway={true}
                >
                  <Menu onChange={this.filter.bind(this)}>
                    <MenuItem value={1} primaryText="All Documents"/>
                    <MenuItem value={2} primaryText="Owned By Me" />
                    <MenuItem value={3} primaryText="Date Created" />
                    <MenuItem value={4} primaryText="Oldest" />
                  </Menu>
                </Popover>
              </div>
            </div>

            {this.state.documents.map((doc, i)=>
              <div>
                <List>
                  <Link to={'/editor/'+doc._id }>
                  <ListItem
                    key={i}
                    leftAvatar={<Avatar icon={<ActionAssignment />} backgroundColor={blue500} />}
                    rightIcon={<ActionInfo />}
                    primaryText={doc.title}
                    // onMouseDown={(e)=>this}
                    secondaryText={new Date(parseInt(doc.dateCreated)).toLocaleString()}
                  />
                  </Link>
                </List>
                <Divider />
              </div>

            )}

          </div>
          <button onMouseDown={this.logout.bind(this)}>Logout</button>
          <button onMouseDown={this.logged.bind(this)}>Test to Check if logged in</button>
        </div>
      )
    }
  };


  export default Directory;
