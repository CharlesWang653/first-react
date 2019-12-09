
const initState = {data:[], isLoading:false, err:""};
const sort = (type, data) => {
  switch(type.field){
    case "FirstName": 
      if(type.AorD){
        let newArr = [...data];
        newArr.sort((a, b) => {
          return a.firstName > b.firstName ? 1 : -1;
        });
        return newArr;
      }else{
        let newArr = [...data];
        newArr.sort((a, b) => {
          return a.firstName < b.firstName ? 1 : -1;
        });
        return newArr;
      }
    case "LastName": 
      if(type.AorD){
        let newArr = [...data];
        newArr.sort((a, b) => {
          return a.lastName > b.lastName ? 1 : -1;
        });
        return newArr;
      }else{
        let newArr = [...data];
        newArr.sort((a, b) => {
          return a.lastName < b.lastName ? 1 : -1;
        });
        return newArr;
      }
    case "Sex": 
      if(type.AorD){
        let newArr = [...data];
        newArr.sort((a, b) => {
          return a.Sex > b.Sex ? 1 : -1;
        });
        return newArr;
      }else{
        let newArr = [...data];
        newArr.sort((a, b) => {
          return a.Sex < b.Sex ? 1 : -1;
        });
        return newArr;
      }
    case "Age": 
      if(type.AorD){
        let newArr = [...data];
        newArr.sort((a, b) => {
          return a.Age - b.Age;
        });
        return newArr;
      }else{
        let newArr = [...data];
        newArr.sort((a, b) => {
          return b.Age - a.Age;
        });
        return newArr;
      }
  }
}
const search = (word, data) => {
  return data.filter((user) => {
    return ((user.firstName.search(word) !== -1)||(user.lastName.search(word) !== -1)||(user.Sex.search(word) !== -1)||(user.Age.toString().search(word) !== -1))
  });
}
const userListReducer = (state = initState, action) => {
  switch(action.type){
    case "GET_LIST_START":
      return {
        ...state,
        isLoading: true
      }
    case "GET_LIST_SUCCESS":
      return {
        ...state,
        isLoading: false,
        data: action.data
      }
    case "GET_LIST_FAIL":
      return {
        ...state,
        isLoading: false,
        err: action.err
      }
    case "SORT":
      let arr = sort(action.WhichAndHow, state.data);
      return {
        ...state,
        data: arr
      }
    case "SEARCH":
      let newarr = search(action.word, state.data);
      return {
        ...state,
        data: newarr
      }
    case "CLEAR":
          return initState;
    default:
      return state;
  }
}

export default userListReducer;