import React from "react";
import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import { readDeck, readCard, updateCard } from "../utils/api";
import NavBar from "./NavBar";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import CardForm from "./CardForm";


function CardEdit() {
  const [deck, setDeck] = useState({})
  const [card, setCard] = useState({})

  const params = useParams();
  const history = useHistory();
  const location = useLocation();

  const navPaths = [
    {name:"Home", link:"/"}, 
    {name: `Deck ${deck.name}`, link:location},
    {name: "Edit Card"}]

  const abortController = new AbortController();

  useEffect(() => {
      async function loadDeck() {
        const deckFromAPI = await readDeck(params.deckId, abortController.signal);
        setDeck(deckFromAPI);
      }
      loadDeck();
    }, []);
    
    useEffect(() => {
        async function loadCard() {
          const cardFromAPI = await readCard(params.cardId, abortController.signal);
          setCard(cardFromAPI);
        }
        loadCard();
      }, []);
      
  const onCardEdit = async (card) => {
    await updateCard(card, abortController.signal);
    history.push("/decks/"+ params.deckId)
  }

  return (
    <div>
        <NavBar paths={navPaths}></NavBar>
      <h2>Edit Card</h2>
      <CardForm onSubmit={onCardEdit} card={card} />
    </div>
  );
}

export default CardEdit;
