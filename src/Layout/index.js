import React from "react";
import Header from "./Header";
import Home from "./Home";
import CreateDeck from "./CreateDeck";
import NotFound from "./NotFound";
import StudyScreen from "./StudyScreen";

import {Route} from "react-router-dom"
import DeckScreen from "./DeckScreen";
import EditDeck from "./EditDeck";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Route path="/" exact={true}>
          <Home />
        </Route>
        <Route path="/decks/new" exact={true}>
          <CreateDeck />
        </Route>
        <Route path="/decks/:deckId" exact={true}>
          <DeckScreen />
        </Route>
        <Route path="/decks/:deckId/edit" exact={true}>
          <EditDeck />
        </Route>
        <Route path="/decks/:deckId/study">
          <StudyScreen />
        </Route>
        <Route path="/no">
          <NotFound />
        </Route>
      </div>
    </>
  );
}

export default Layout;
