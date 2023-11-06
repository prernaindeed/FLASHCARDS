import React from "react";
import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import { createDeck } from "../utils/api";
import NavBar from "./NavBar";

const navPaths = [
    {name:"Home", link:"/"}, 
    {name: "Create Deck"}]

function CreateDeck() {
  
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  const abortController = new AbortController();
  
  const onDeckCreate = (e) => {
    e.preventDefault();
    createDeck({name,description}, abortController.signal);
    setName("");
    setDescription("");
  }

  return (
    <div>
        <NavBar paths={navPaths}></NavBar>
      <h2>Create Deck</h2>
      <form onSubmit={onDeckCreate}>
        <div className="form-group">
            <label htmlFor="name">Name:</label>
            <br/>
            <input placeholder="Deck Name" type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <br/>
        <div className="form-group">
            <label htmlFor="description">Description:</label>
            <br/>
            <textarea placeholder="Brief description of the deck" id="description" type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <Link to="/"><button class="btn btn-secondary">Cancel</button></Link>
        {'  '}
        <button type="submit" class="btn btn-primary">Submit</button>
        
      </form>
    </div>
  );
}

export default CreateDeck;
