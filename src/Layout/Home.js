import React from "react";
import {useState, useEffect} from "react";
import {listDecks, deleteDeck} from "../utils/api"
import {Link} from "react-router-dom";
import DeckCard from "./DeckCard";


function Home() {
  
  const [decks, setDecks] = useState([])
  const abortController = new AbortController();
  
  async function loadDecks() {
    const decksFromAPI = await listDecks(abortController.signal);
    setDecks(decksFromAPI);
  }

  useEffect(() => {
    loadDecks();
  }, []);

  const deleteHandler = async (id) => {
      if (window.confirm("Delete this deck? \n \n You will not be able to recover it.")){
          await deleteDeck(id, abortController.signal)
          loadDecks();
      } 
  }
  
  return (
    <div>
      <Link to="/decks/new"><button className="btn btn-secondary"> + Create Deck</button> </Link>
      {
        decks.map(d => <DeckCard deck={d} onDelete={deleteHandler}></DeckCard>)
      }
    </div>
  );
}

export default Home;
