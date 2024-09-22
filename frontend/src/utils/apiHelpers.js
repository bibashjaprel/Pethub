  import axios from 'axios'
  export const getAdoptionRequests = async () => {
    const response = await axios.get('/api/adoption-requests');
    const data = await response.json();
    return data;
  };

  export const getAdoptionApplications = async () => {
    const response = await axios.get('/api/adoption-applications');
    const data = await response.json();
    return data;
  };

  export const clearToken = () => {
    localStorage.removeItem('token');
  };


  // users
  export const getUsers = async () => {
    try{
      const response = await axios.get('http://localhost:5000/api/v1/user/users');
      console.log(response)
      if(response.status == 200){
      console.log('something went wrong while fetching the data')
     }

     return response.data;

    }catch(error){
      console.error("Error fetching the users: ", error)
    }
  };


export const deleteUser = async (req, res) => {
  try{
    const response = await axios.delete('http://localhost:5000/api/v1/user/delete/')
    return response.data;
  }catch(error){
    console.log(`error while deleteing user : ${error}`)
  }
}
