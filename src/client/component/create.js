import React from "react";
import {connect} from "react-redux";
import * as actions from "../redux/action-creator/actions";
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';

import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
class Create extends React.Component {
  constructor(props){
    super(props);
    this.state = {user:{firstName:"",lastName:"",Age:"",Sex:" ",password:"", confirm:""},
      firstNamePass: false, lastNamePass: false, AgePass: false, SexPass: false, passwordPass: false, confirmPass: false, showPassword:false};
  }
  handleFirstName = (e) => {
    if(e.target.value.length === 0){
      this.setState({user:{...this.state.user,firstName: e.target.value},firstNamePass:false})
    }else{
      this.setState({user:{...this.state.user,firstName: e.target.value},firstNamePass:true});
    }
  }
  handleLastName = (e) => {
    if(e.target.value.length === 0){
      this.setState({user:{...this.state.user,lastName: e.target.value},lastNamePass:false})
    }else{
      this.setState({user:{...this.state.user,lastName: e.target.value},lastNamePass:true});
    }
  }
  handleAge = (e) => {
    if(Number(e.target.value) > 0 && Number(e.target.value) <= 120){
      this.setState({user:{...this.state.user,Age: e.target.value},AgePass:true})
    }else{
      this.setState({user:{...this.state.user,Age: e.target.value},AgePass:false});
    }
  }
  handleSex = (e) => {
    console.log(e.target.value);
    if(e.target.value !== "Male" && e.target.value !== "Female" ){
      this.setState({user:{...this.state.user,Sex: e.target.value},SexPass:false});
    }else{
      this.setState({user:{...this.state.user,Sex: e.target.value},SexPass:true});
    }
  }
  handlePassword = (e) => {
    if(e.target.value.length >= 8 && e.target.value.length <= 12){
      this.setState({user:{...this.state.user,password: e.target.value},passwordPass:true})
    }else{
      this.setState({user:{...this.state.user,password: e.target.value},passwordPass:false});
    }
  }
  handleClickShowPassword = (e) => {
    this.setState({showPassword: !this.state.showPassword});
  }
  handleConfirm = (e) => {
    if(e.target.value === this.state.user.password){
      this.setState({user:{...this.state.user,confirm: e.target.value},confirmPass:true})
    }else{
      this.setState({user:{...this.state.user,confirm: e.target.value},confirmPass:false});
    }
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.createOneUser(this.state.user,this.props.history);
  }
  render() {
    const {firstNamePass, lastNamePass, AgePass, SexPass, passwordPass, confirmPass} = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <FormControl>
            <InputLabel htmlFor="component-helper">Firstname</InputLabel>
            <Input
              id="component-helper"
              value={this.state.user.firstName}
              onChange={this.handleFirstName}
              aria-describedby="component-helper-text"
            />
            {!this.state.firstNamePass&&<FormHelperText>please input a valid firstname</FormHelperText>}
          </FormControl>
          <br/>
          <FormControl>
            <InputLabel htmlFor="component-helper">Lastname</InputLabel>
            <Input
              id="component-helper"
              value={this.state.user.lastName}
              onChange={this.handleLastName}
              aria-describedby="component-helper-text"
            />
            {!this.state.lastNamePass&&<FormHelperText className="component-error-text">please input a valid lastname</FormHelperText>}
          </FormControl>
          <br/>
          <FormControl>
            <InputLabel htmlFor="component-helper">Age</InputLabel>
            <Input
              id="component-helper"
              value={this.state.user.Age}
              onChange={this.handleAge}
              aria-describedby="component-helper-text"
            />
            {!this.state.AgePass&&<FormHelperText className="component-error-text">please input a valid age</FormHelperText>}
          </FormControl>
          <br/><br/>
          <FormControl>
            <InputLabel id="demo-simple-select-label">Sex</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={this.state.user.Sex}
              onChange={this.handleSex}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
          </FormControl>
          <br/>
          <FormControl>
            <InputLabel htmlFor="component-helper">Password</InputLabel>
            <Input
              id="component-helper"
              type={this.state.showPassword ? 'text' : 'password'}
              value={this.state.user.password}
              onChange={this.handlePassword}
              aria-describedby="component-helper-text"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={this.handleClickShowPassword}
                  >
                    {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {!this.state.passwordPass&&<FormHelperText className="component-error-text">please enter a valid password between 8 to 12 character</FormHelperText>}
          </FormControl>
          <br/>
          <FormControl>
            <InputLabel htmlFor="component-helper">Confirm Password</InputLabel>
            <Input
              id="component-helper"
              type={this.state.showPassword ? 'text' : 'password'}
              value={this.state.user.confirm}
              onChange={this.handleConfirm}
              aria-describedby="component-helper-text"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={this.handleClickShowPassword}
                  >
                    {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {!this.state.confirmPass&&<FormHelperText className="component-error-text">please enter the same password</FormHelperText>}
          </FormControl>
          <br/><br/>
          <Button variant="contained" type="submit" disabled={!(firstNamePass && lastNamePass && AgePass && SexPass && passwordPass && confirmPass)}>
            Submit
          </Button>
        </form>
      </div>
    );
  }
}
const mapStatetoProps = (state) => {
  return {
    userList: state.userListReducer,
    user: state.userReducer
  }
}
const mapDispatchtoProps = (dispatch) => {
  return {
    getList: () => {
      dispatch(actions.getList());
    },
    getUser: (id) => {
      dispatch(actions.getOneUser(id));
    },
    deleteOneUser: (id) => {
      dispatch(actions.deleteOneUser(id));
    },
    createOneUser: (user,url) => {
      dispatch(actions.createOneUser(user,url));
    },
    updateOneUser: (id, user) => {
      dispatch(actions.updateOneUser(id, user));
    }
  }
}
export default connect(mapStatetoProps,mapDispatchtoProps)(Create);