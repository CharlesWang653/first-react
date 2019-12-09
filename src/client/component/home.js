import React from "react";
import {connect} from "react-redux";
import * as actions from "../redux/action-creator/actions";
class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {firstNameSort: true, lastNameSort: true, AgeSort: true, SexSort: true, search:"",curpage: 1,
      firstNameShow:false, lastNameShow:false, AgeShow:false, SexShow:false};
  }
  componentDidMount() {
    this.props.getListAndjump("/");
    this.setState({data:this.props.userList.data});
  }
  handleFirstnameClick = () => {
    this.props.sort("FirstName",this.state.firstNameSort);
    this.setState({firstNameSort: !this.state.firstNameSort,firstNameShow:true, lastNameShow:false, AgeShow:false, SexShow:false});
  }
  handleLastnameClick = () => {
    this.props.sort("LastName",this.state.lastNameSort);
    this.setState({lastNameSort: !this.state.lastNameSort,firstNameShow:false, lastNameShow:true, AgeShow:false, SexShow:false});
  }
  handleAgeClick = () => {
    this.props.sort("Age",this.state.AgeSort);
    this.setState({AgeSort: !this.state.AgeSort,firstNameShow:false, lastNameShow:false, AgeShow:true, SexShow:false});
  }
  handleSexClick = () => {
    this.props.sort("Sex",this.state.SexSort);
    this.setState({SexSort: !this.state.SexSort,firstNameShow:false, lastNameShow:false, AgeShow:false, SexShow:true});
  }
  handleSearch = (e) => {
    this.setState({search:e.target.value});
    this.props.search(e.target.value);
    if(e.target.value === ""){
      this.props.getList();
    }
  }
  render() {
    console.log(this.state);
    const {firstNameShow,lastNameShow,SexShow,AgeShow} = this.state;
    const {firstNameSort,lastNameSort,SexSort,AgeSort} = this.state;
    return (
      <div>
        <div>Search:</div>
        <input type="text" onChange={this.handleSearch} value={this.state.search}/>
        <table>
          <thead>
            <tr>
              <th onClick={this.handleFirstnameClick}>First name{firstNameShow && (firstNameSort?<span>&uarr;</span>:<span>&darr;</span>)}</th>
              <th onClick={this.handleLastnameClick}>Last name{lastNameShow && (lastNameSort?<span>&uarr;</span>:<span>&darr;</span>)}</th>
              <th onClick={this.handleAgeClick}>Age{AgeShow && (AgeSort?<span>&uarr;</span>:<span>&darr;</span>)}</th>
              <th onClick={this.handleSexClick}>Sex{SexShow && (SexSort?<span>&uarr;</span>:<span>&darr;</span>)}</th>
            </tr>
          </thead>
          <tbody>
            {this.props.userList.data.filter((user,index) => {
              if(index >= (this.state.curpage - 1) * 5 && index <this.state.curpage * 5){
                return true;
              }else{
                return false;
              }
            })
            .map((user,index) => {
              return (
                <tr key={user._id}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.Age}</td>
                  <td>{user.Sex}</td>
                  <td><button onClick={() => {this.props.getUser(user._id);}}>edit</button></td>
                  <td><button onClick={() => {this.props.deleteOneUser(user._id)}}>delete</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div>
          <button onClick={() => this.setState({curpage:1})}>&lt;&lt;</button>
          <button onClick={() => this.setState({curpage:this.state.curpage-1})} disabled={(this.state.curpage - 1 <= 0)}>&lt;</button>
          <button onClick={() => this.setState({curpage:this.state.curpage})}>{this.state.curpage}</button>
          {(this.state.curpage + 1 <= Math.ceil(this.props.userList.data.length/5))&&
            <button onClick={() => this.setState({curpage:this.state.curpage+1})}>{this.state.curpage + 1}</button>}
          {(this.state.curpage + 2 < Math.ceil(this.props.userList.data.length/5))&&
            <button onClick={() => this.setState({curpage:this.state.curpage+2})}>{this.state.curpage + 2}</button>}
          <button>...</button>
          <button onClick={() => this.setState({curpage:this.state.curpage+1})} disabled={!(this.state.curpage + 1 <= Math.ceil(this.props.userList.data.length/5))}>&gt;</button>
          <button onClick={() => this.setState({curpage:Math.ceil(this.props.userList.data.length/5)})}>&gt;&gt;</button>
        </div>
        <button onClick={() => {this.props.history.push(`/create`);}}>create user</button>
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
    createOneUser: (user) => {
      dispatch(actions.createOneUser(user));
    },
    updateOneUser: (id, user) => {
      dispatch(actions.updateOneUser(id, user));
    },
    sort: (field, AorD) => {
      dispatch(actions.sort(field, AorD));
    },
    search: (text) => {
      dispatch(actions.search(text));
    }
  }
}
export default connect(mapStatetoProps,mapDispatchtoProps)(Home);