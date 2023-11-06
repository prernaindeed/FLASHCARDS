import React from "react";
import {useState} from "react";
import { useHistory } from "react-router-dom";

function CardDisplay({cards}) {
    const history = useHistory()
    const [currentIndex, setCurrentIndex] = useState(1)
    const [isFront, setIsFront] = useState(true)
    
    const cardContent = isFront ? cards[currentIndex-1].front : cards[currentIndex-1].back

    const flipHandler = () => setIsFront(!isFront)
    const nextHandler = () => {
        if (currentIndex < cards.length){
            setCurrentIndex(currentIndex + 1);
            setIsFront(true);
        } else {
            (window.confirm("Restart cards? \n \n Click 'cancel' to return to home page.") ? setCurrentIndex(1) : history.push("/"))
        }
    }
   
    return (
        <div className="card mt-4 p-3">
            <h3>Card {currentIndex} of {cards.length}</h3>
            <p>{cardContent}</p>
            <div>
                <button className="btn btn-secondary mr-2" onClick={flipHandler}>Flip</button>
                { !isFront ? <button className="btn btn-primary" onClick={nextHandler}>Next</button> : <></> }
            </div>
        </div>
    );
}

export default CardDisplay;