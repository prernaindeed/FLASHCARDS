import React from "react";
import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import { readDeck, createCard } from "../utils/api";
import NavBar from "./NavBar";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import CardForm from "./CardForm";


function CardCreate() {
  const [deck, setDeck] = useState({})
  const params = useParams();
  const location = useLocation();

  const navPaths = [
    {name:"Home", link:"/"}, 
    {name: `${deck.name}`, link:location},
    {name: "Add Card"}]

  const abortController = new AbortController();

  useEffect(() => {
      async function loadDeck() {
        const deckFromAPI = await readDeck(params.deckId, abortController.signal);
        setDeck(deckFromAPI);
      }
      loadDeck();
    }, []);
    
  const onCardCreate = async (card) => {
    await createCard(params.deckId, card, abortController.signal);
  }

  return (
    <div>
        <NavBar paths={navPaths}></NavBar>
      <h2>Add Card</h2>
      <CardForm onSubmit={onCardCreate} card={{}}/>
    </div>
  );
}

export default CardCreate;
