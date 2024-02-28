import { useEffect, useState } from "react"
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";

export default function Food(props)
{

    const [eatenQuantity,setEatenQuantity]=useState(100);
    const [food,setFood]=useState({});
    const [foodInitial,setFoodInitial]=useState({});

    // console.log(food);
  
    let loggedData=useContext(UserContext);

    function trackFoodItem()
    {
      let trackedItem={
        userId:loggedData.loggedUser.id,
        foodId:food._id,
        details:{
          protiens:food.protiens,
          carbohydrates:food.carbohydrates,
          fat:food.fat,
          fiber:food.fiber,
          calories:food.calories
        },
        quantity:eatenQuantity
      }
    // console.log(trackedItem);

     fetch("http://localhost:8000/track",{
      method:"POST",
      body:JSON.stringify(trackedItem),
      headers:{
        "Authorization":"Bearer"+" "+loggedData.loggedUser.token,
        "Content-Type":"application/json"
      }
     })
     .then((response)=>response.json())
     .then((data)=>{
      
     })
     .catch((err)=>{
      console.log(err);
     })

    }

    useEffect(()=>{
        setFood(props.food);
        setFoodInitial(props.food);
    },[props.food])

    function calculateMacros(event)
    {
      

      if(event.target.value.length!==0)
      {
         
         let quantity=Number(event.target.value);
         setEatenQuantity(quantity)

            let copyFood={...food};

            copyFood.protiens=( foodInitial.protiens*quantity)/100;
            copyFood.carbohydrates=( foodInitial.carbohydrates*quantity)/100;
            copyFood.fat=( foodInitial.fat*quantity)/100;
            copyFood.fiber=( foodInitial.fiber*quantity)/100;
            copyFood.calories=( foodInitial.calories*quantity)/100;

          setFood(copyFood);
      }
     
    }

    return (
        <div className="food">

        <div className="food-img">
           <img className="food-image" src={food.imageUrl} alt="foodimage"/>
        </div>

        <h3>{food.name}({food.calories} KCal for {eatenQuantity}G)</h3>
        <div className="nutrient">
          <p className="n-title">Protien</p>
          <p className="n-vale">{food.protiens}g</p>
        </div>

        <div className="nutrient">
          <p className="n-title">Carbs</p>
          <p className="n-vale">{food.carbohydrates}g</p>
        </div>

        <div className="nutrient">
          <p className="n-title">Fats</p>
          <p className="n-vale">{food.fat}g</p>
        </div>

        <div className="nutrient">
          <p className="n-title">Fiber</p>
          <p className="n-vale">{food.fiber}g</p>
        </div>

        <div className="track-control">

        <input type="number" onChange={calculateMacros}
         className="inp" placeholder="Quantity in gms"/>

        <button className="btn" onClick={trackFoodItem}>Track</button>

        </div>

       

      </div>
    )
}