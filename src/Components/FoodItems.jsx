import useHttp from "../hooks/useHttp";
import MealItem from "./MealItem";
import Error from "./Error";
const requestConfig = {};
export default function FoodItems() {
    const {data : mealItems, error, isLoading} = useHttp('http://localhost:3000/meals', requestConfig, []);
    
    if(isLoading) {
        return <p className="center">Fetching meals ...</p>
    }

    if(error) {
        console.log(error);
        return <Error title="Failed to fetch meals" message={error}></Error>;
    }
    return (
        <ul id="meals">
            {mealItems.map((meal) => (
                <MealItem meal={meal} key={meal.id}></MealItem>
            ))}
            
        </ul>
    )
}