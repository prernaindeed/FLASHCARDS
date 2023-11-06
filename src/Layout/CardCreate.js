import React from "react";
import {useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import { readDeck, createCard } from "../utils/api";
import NavBar from "./NavBar";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";


function CardCreate() {
  const [deck, setDeck] = useState({})
  const [front, setFront] = useState("")
  const [back, setBack] = useState("")

  const params = useParams();
  const history = useHistory();
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
    
  const onCardCreate = async (e) => {
    e.preventDefault();
    await createCard(params.deckId, {front, back}, abortController.signal);
    setFront("")
    setBack("")
  }

  return (
    <div>
        <NavBar paths={navPaths}></NavBar>
      <h2>Add Card</h2>
      <form onSubmit={onCardCreate}>
        <div className="form-group">
            <label htmlFor="front">Front:</label>
            <br/>
            <textarea style={{'width':'100%'}} placeholder="Front side of the card" type="text" id="front" name="front" value={front} onChange={(e) => setFront(e.target.value)} />
        </div>
        <br/>
        <div className="form-group">
            <label htmlFor="back">Back:</label>
            <br/>
            <textarea style={{'width':'100%'}} placeholder="Back side of the card" id="back" type="text" name="back" value={back} onChange={(e) => setBack(e.target.value)} />
        </div>
        <Link to={"/decks/"+ params.deckId}><button class="btn btn-secondary">Done</button></Link>
        {'  '}
        <button type="submit" class="btn btn-primary">Submit</button>
        
      </form>
    </div>
  );
}

export default CardCreate;
