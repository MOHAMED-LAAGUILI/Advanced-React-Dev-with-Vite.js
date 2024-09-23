import { useState, useEffect } from "react";
import custome_Axios from "./axios/custome_Axios";

export default function List_api() {
  // Hooks
  const [todos, setTodos] = useState([]);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);

  
 // fetch Api method 1
  const URL_Api_Data = "https://jsonplaceholder.typicode.com/todos?start=0&_limit=10";
 
  const fetch_Data_with_FetchApi = async () => {
    const response = await fetch(URL_Api_Data);
    const data = await response.json();
    //  console.log(data);
    setTodos(data);
    
  };

  // Fetch with Axios method 2
  const fetch_Data_with_Axios = async () => {
    const [todosResponse, usersResponse, commentsResponse] = await Promise.all([
      custome_Axios.get("/todos?start=0&_limit=10"),
      custome_Axios.get("/users?start=0&_limit=10"),
      custome_Axios.get("/comments?start=0&_limit=10"),
      
   /*   custome_Axios.delete("/comments?start=0&_limit=10",{
   data:{id:1}
  }),

  */
    ]);
  
    console.log(todosResponse.data, usersResponse.data, commentsResponse.data);

    setTodos(todosResponse.data);
    setUsers(usersResponse.data);
    setComments(commentsResponse.data);
  };

  // Declaring
  useEffect(() => {
  fetch_Data_with_FetchApi();
   fetch_Data_with_Axios();
  }, []);

  return (
    <>
      <div className="container">
        <h1 className="text-center">Todo List</h1>
        <ul className="list-group">
          {todos.map((item, index) => (
            <li key={index} className="list-group-item">
             <span className="badge bg-danger"> {index} </span>
              <input type="checkbox" className="form-check-input me-1" />
              <span
                className={`text-decoration-${
                  item.completed ? "line-through badge bg-success" : "none badge bg-primary"
                }`}
              >
               
                {item.title}
              </span>
            </li>
          ))}
        </ul>

        <h1 className="text-center">users List</h1>
        <ul className="list-group">
          {users.map((item, index) => (
            <li key={index} className="list-group-item">
              <p>Index    : {index}</p>
              <p>ID       : {item.id}</p>
              <p>Name     : {item.name}</p>
              <p>Username : {item.username}</p>
              <p>E-mail   : {item.email}</p>
              <p>Address  : {item.address.city} - {item.address.street} - {item.address.zipcode}</p>

            </li>
          ))}
        </ul>

        <h1 className="text-center">Comment List</h1>
        <ul className="list-group">
          {comments.map((item, index) => (
            <li key={index} className="list-group-item">
              <p>Index    : {index}</p>
              <p>Post ID  : {item.postId}</p>
              <p>ID       : {item.id}</p>
              <p>Name     : {item.name}</p>
              <p>Body     : {item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}