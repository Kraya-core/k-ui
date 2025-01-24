import React from "react";
import Button from "../components/Button";
import { toLoweercase } from "../utils/toLowercase";

function App() {
  return (
    <div>
      <h1>Hello 2</h1>
      <Button>Heyy</Button>
      <p>{toLoweercase("HHELLO")}</p>
    </div>
  );
}

export default App;
