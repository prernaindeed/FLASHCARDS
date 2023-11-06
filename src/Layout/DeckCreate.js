import React from "react";
import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import { createDeck } from "../utils/api";
import NavBar from "./NavBar";
import { useHistory } from "react-router-dom";

const navPaths = [
    {name:"Home", link:"/"}, 
    {name: "Create Deck"}]

function DeckCreate() {
  
  const history = useHistory()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  const abortController = new AbortController();
  
  const onDeckCreate = async (e) => {
    e.preventDefault();
    const deck = await createDeck({name,description}, abortController.signal);
    setName("");
    setDescription("");
    history.push(`/decks/${deck.id}`)
  }

  return (
    <div>
        <NavBar paths={navPaths}></NavBar>
      <h2>Create Deck</h2>
      <form onSubmit={onDeckCreate}>
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
        <Link to="/"><button class="btn btn-secondary">Cancel</button></Link>
        {'  '}
        <button type="submit" class="btn btn-primary">Submit</button>
        
      </form>
    </div>
  );
}

export default DeckCreate;
