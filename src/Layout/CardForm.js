import React from "react";
import {useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";


function CardForm({onSubmit, card}) {
  const [front, setFront] = useState(card.front)
  const [back, setBack] = useState(card.back)

  useEffect(()=>{
    setFront(card.front)
    setBack(card.back)
  }, [card])

  const params = useParams();

  const onFormSubmit = (e) =>{
    e.preventDefault();
    onSubmit({...card, front, back})
    setFront("")
    setBack("")
  }

  return (
    <div>
      <form onSubmit={onFormSubmit}>
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
        <Link to={"/decks/"+ params.deckId}><button class="btn btn-secondary">Cancel</button></Link>
        {'  '}
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default CardForm;
