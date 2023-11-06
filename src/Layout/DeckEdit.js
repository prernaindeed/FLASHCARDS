import React from "react";
import {useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import { updateDeck, readDeck } from "../utils/api";
import NavBar from "./NavBar";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";


function DeckEdit() {
  const [deck, setDeck] = useState({})
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  const params = useParams();
  const history = useHistory();
  const location = useLocation();

  const navPaths = [
    {name:"Home", link:"/"}, 
    {name: name, link:location},
    {name: "Edit Deck"}]

  const abortController = new AbortController();

  useEffect(() => {
      async function loadDeck() {
        const deckFromAPI = await readDeck(params.deckId, abortController.signal);
        setDeck(deckFromAPI);
        setName(deckFromAPI.name);
        setDescription(deckFromAPI.description);
      }
      loadDeck();
    }, []);
    
  
  const onDeckEdit = async (e) => {
    e.preventDefault();
    await updateDeck({...deck, name,description}, abortController.signal);
    history.push("/decks/"+ params.deckId)
  }

  return (
    <div>
        <NavBar paths={navPaths}></NavBar>
      <h2>Edit Deck</h2>
      <form onSubmit={onDeckEdit}>
        <div className="form-group">
            <label htmlFor="name">Name:</label>
            <br/>
            <input style={{'width':'100%'}} placeholder="Deck Name" type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <br/>
        <div className="form-group">
            <label htmlFor="description">Description:</label>
            <br/>
            <textarea style={{'width':'100%'}} placeholder="Brief description of the deck" id="description" type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <Link to={"/decks/"+ params.deckId}><button class="btn btn-secondary">Cancel</button></Link>
        {'  '}
        <button type="submit" class="btn btn-primary">Submit</button>
        
      </form>
    </div>
  );
}

export default DeckEdit;
