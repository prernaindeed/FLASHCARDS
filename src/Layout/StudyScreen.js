import React from "react";
import {useState, useEffect} from "react";
import {useParams, useLocation} from "react-router-dom";
import { readDeck } from "../utils/api";
import NavBar from "./NavBar";
import CardDisplay from "./CardDisplay"

function StudyScreen() {
    
    
    const [deck, setDeck] = useState({name: '', description:'', id:0, cards: []})
    const abortController = new AbortController();
    const params = useParams();
    const location = useLocation();

    useEffect(() => {
        async function loadDeck() {
          const deckFromAPI = await readDeck(params.deckId, abortController.signal);
          setDeck(deckFromAPI);
        }
        loadDeck();
      }, []);
      

    const navPaths = [
        {name:"Home", link:"/"}, 
        {name: deck.name, link:location},
        {name: "Study"}
    ]

    return (
        <div>
            <NavBar paths={navPaths}></NavBar>
            <h2>Study: {deck.name} </h2>
            {deck.cards.length < 3 ? 
                <div>
                    <h3>Not Enough Cards</h3>
                    <p> You need at least 3 cards to Study. There are {deck.cards.length} cards in this deck</p>
                    <button className="btn btn-primary"> + Add Cards</button>
                </div> : <CardDisplay cards={deck.cards}/>}
        </div>
    );
}

export default StudyScreen;
