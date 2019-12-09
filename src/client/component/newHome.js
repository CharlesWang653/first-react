import React from 'react';
import {connect} from "react-redux";
import * as actions from "../redux/action-creator/actions";
import MaterialTable from 'material-table';
import {Edit, Delete, Add} from '@material-ui/icons';
import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

class NewHome extends React.Component {
  constructor(props){
    super(props);
    this.state = {columns: [
      { title: 'FirstName', field: 'firstName' },
      { title: 'LastName', field: 'lastName' },
      { title: 'Age', field: 'Age', type: 'numeric' },
      { title: 'Sex', field: 'Sex' },
    ],  data: this.props.userList.data}
  }
  componentDidMount() {
    this.props.clear();
    this.props.getList();
  }
  render() {
    console.log(this.props.userList);
    return (
      <div>
        {(this.props.userList.err || this.props.user.err) && <div>connection failed!</div>}
        <MaterialTable
          title="UserList"
          icons={tableIcons}
          columns={this.state.columns}
          data={this.props.userList.data}
          actions={[
            {
              icon: Edit,
              tooltip: 'edit User',
              onClick: (event, rowData) => {this.props.getUser(rowData._id)}
            },
            {
              icon: Delete,
              tooltip: 'Delete User',
              onClick: (event, rowData) => {this.props.deleteOneUser(rowData._id)}
            },
            {
              icon: Add,
              tooltip: 'Add User',
              isFreeAction: true,
              onClick: (event) => {this.props.history.push("/create")}
            }
          ]}
        />
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
    },
    clear: () => {
      dispatch(actions.clear());
    }
  }
}
export default connect(mapStatetoProps,mapDispatchtoProps)(NewHome);