import React from "react";
import {useState, useEffect} from "react";
import {useParams, useLocation, Link} from "react-router-dom";
import { readDeck,  deleteDeck } from "../utils/api";
import NavBar from "./NavBar";

function DeckScreen() {
    const [deck, setDeck] = useState({name: '', description:'', id:0, cards: []})
    const abortController = new AbortController();
    const params = useParams();
    const location = useLocation();

    async function loadDeck() {
        const deckFromAPI = await readDeck(params.deckId, abortController.signal);
        setDeck(deckFromAPI);
    }

    const deleteHandler = async (id) => {
        if (window.confirm("Delete this deck? \n \n You will not be able to recover it.")){
            await deleteDeck(id, abortController.signal)
            loadDeck();
        } 
    }

    useEffect(() => {
        loadDeck();
      }, []);
      

    const navPaths = [
        {name:"Home", link:"/"}, 
        {name: deck.name}
    ]

    return (
        <div>
            <NavBar paths={navPaths}></NavBar>
            <h2>{deck.name} </h2>
            <p>{deck.description}</p>
            <div className="mb-4">
                <Link to={location.pathname+"/edit"}><button className="btn btn-secondary mr-2">Edit</button></Link>
                <Link to={location.pathname+"/study"}><button className="btn btn-primary mr-2">Study</button></Link>
                <button className="btn btn-primary"> + Add Cards</button>
                <button className="btn btn-danger float-right" onClick={()=> deleteHandler(deck.id)}>Delete</button>
            </div>
            <div>
                <h3>Cards</h3>
                {
                    
                    deck.cards.map( (card) => {
                        return <div className="card container">
                            <div className="row">
                                <p className="col-sm">{card.front}</p>
                                <p className="col-sm">{card.back}</p>
                            </div>
                            <div className="d-flex flex-row-reverse">

                                <button className="btn btn-danger m-2">Delete</button>
                                <button className="btn btn-secondary m-2">Edit</button>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    );
}

export default DeckScreen;
