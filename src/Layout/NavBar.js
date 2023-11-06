
import React from "react";
import { Link } from "react-router-dom";

function NavBar({paths}) {
  return (
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            {paths.map(
                p => p.link ? <li class="breadcrumb-item"><Link to={p.link}>{p.name}</Link></li> : <li class="breadcrumb-item active" aria-current="page">{p.name}</li>
            )}
        </ol>
        </nav>
  );
}

export default NavBar;
