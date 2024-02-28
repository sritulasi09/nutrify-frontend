import { useEffect, useRef, useState } from "react"
import {UserContext} from "../contexts/UserContext"
import { useContext } from "react"
import Header from './Header'

export default function Diet()
{

     let loggedData=useContext(UserContext)

     const [items,setItems]=useState([]);

     const [date,setDate]=useState(new Date())  

     let [total,setTotal]=useState({
        totalCalories:0,
        totalProtien:0,
        totalCarbs:0,
        totalFats:0,
        totalFiber:0
     })

    useEffect(()=>{
        fetch(`http://localhost:8000/track/${loggedData.loggedUser.id}/${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`,{
            method:"GET",
            headers:{
                "Authorization":"Bearer"+" "+loggedData.loggedUser.token
            }
        })
        .then((response)=>response.json())
        .then((data)=>{
         
            setItems(data);
        })
        .catch((err)=>{
            console.log(err);
        })
    },[date])

    useEffect(()=>{
        calculateTotal();
    },[items])


    function calculateTotal()
    {
         let totalCopy={
            totalCalories:0,
            totalProtien:0,
            totalCarbs:0,
            totalFats:0,
            totalFiber:0
         };
         items.forEach((item)=>{

            totalCopy.totalCalories+=item.details.calories;
                    totalCopy.totalProtien+=item.details.protiens;
                    totalCopy.totalCarbs+=item.details.carbohydrates;
                    totalCopy.totalFats+=item.details.fat;
                    totalCopy.totalFiber+=item.details.fiber;
 
         })

         setTotal(totalCopy);
    }

    return (

        
        <section className="container diet-container" >

            <Header/>
            <input className="date" type="date" onChange={(event)=>{
                setDate(new Date(event.target.value))
            }}/>

            
       {
  items.length !== 0 ? (
    items.map((item) => {
      return (
        <div className="item" key={item._id}>
          <h3>{item.foodId.name} ({item.details.calories}KCal for {item.quantity}g)</h3>
          <p>Proteins {item.details.protiens}</p>
          <p>Carbs {item.details.carbohydrates}g</p>
          <p>Fats {item.details.fat}g</p> 
          <p>Fiber {item.details.fiber}g</p>
        </div>
      );
    })
  ) : (
    <h3 className="text">no items found  :(</h3>
  )
}


        {
            total.totalCalories!==0?(
                
                <div className="item">
                    <h3>Total Nutrition Intake of the Day</h3>
                          <h3>{total.totalCalories}KCal</h3>
                          <p>Proteins {total.totalProtien} </p>
                          <p>Carbs {total.totalCarbs}g</p>
                          <p>Fats {total.totalFats}g  </p> 
                          <p>Fiber {total.totalFiber}g</p>
                        
                        </div>
            ):null
        }
           

        </section>
        
    )
}