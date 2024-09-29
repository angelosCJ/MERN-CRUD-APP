import { useState ,useEffect} from 'react';
import './App.css';
import axios from 'axios';


function App() {
  const [foodName, setFoodName] = useState('');
  const [days,setDays] = useState<number | string>(0);
  const [foodList,setFoodList] = useState<any[]>([]);
  const [newFoodName, setNewFoodName] = useState('');

  const addList = async () =>{
    try {
      await axios.post("http://localhost:8800/insert",{foodName:foodName,days:days});
      console.log("Successful post"); 
    } catch (error) {
      console.log("Failed to post"); 
    }
  }


  const readData = () => {
    axios.get("http://localhost:8800/read").then((response) => {
      console.log("Response Data: ", response.data); // Log the full response
      response.data.forEach((item: any, index: number) => {
        console.log(`Item ${index}:`, item); // Log each item separately to inspect its structure
      });
      setFoodList(response.data);
    }).catch((error) => {
      console.log("Error fetching data:", error);
    });
  };
  
  const updateFood = (id:any) =>{
    axios.put("http://localhost:8800/update",{id:id, newFoodName: newFoodName})
  }

  const deleteFood = (id:any) =>{
    axios.delete(`http://localhost:8800/delete/${id}`);
  }

  useEffect(() => {
   readData();
  }, []);

  return (
      <div className='App'>
        <h1>CRUD APPLICATION WITH MERN STACK</h1>
        <label htmlFor="">Food name</label>
        <input type="text" onChange={(e)=>{setFoodName(e.target.value)}}/>
        <label htmlFor="">days since you  ate</label>
        <input type="number" onChange={(e) => setDays(Number(e.target.value))}/>
        <button onClick={addList} >Add To List</button>
        <h1>Food List</h1>
        <div className='data-list' >
        {foodList.map((val: any, index: number) => {
        return (   
       <div key={index}  > 
       <div className="content">
       <h1> FoodName: {val.foodName} </h1>
       <h1> Days: {val.daysSinceIAte} </h1>
       <input type="text" placeholder='update name and days'
        onChange={(e)=>{setNewFoodName(e.target.value)}}/> 
       <button onClick={()=> updateFood(val._id)} >Update</button>
       <button onClick={()=> deleteFood(val._id)} >Delete</button>
       </div>
      </div>
  );
})}
 </div>
</div>
     
    
  )
}

export default App
