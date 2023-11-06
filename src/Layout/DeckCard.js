import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function DeckCard({deck, onDelete}) {
    return (
        <div className="card mt-4 p-3" >
            <span><h3 className="float-left">{deck.name}</h3> <p className="float-right">{deck.cards.length} cards</p></span>
            <p>{deck.description}</p>
            <div>
                <Link to={`/decks/${deck.id}`}><button className="mr-2 btn btn-secondary">View</button></Link>
                <Link to={`/decks/${deck.id}/study`}><button className="btn btn-primary">Study</button></Link>
                <button className="btn btn-danger float-right" onClick={()=> onDelete(deck.id)}>Delete</button>
            </div>
        </div>

    );
}

export default DeckCard;
