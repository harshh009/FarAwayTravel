import { useState } from "react";
import "./index.css";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 2, description: "Chrager", quantity: 12, packed: false },
];

export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PakingList />
      <Stats />
    </div>
  );
}

function Logo() {
  return (
    <div>
      <h1>Far Away</h1>
    </div>
  );
}

function Form() {
  const [description, setDescription] = useState("input ");
  const [quantity, setQuantity] = useState(5);

  function handleSubmit(e) {
    e.preventDefault();
    const newItems = { description, quantity, packed: false, id: Date.now() };
    console.log(newItems);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3> What do you need for your 😍 trip?</h3>
      <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
        {/* <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option> */}
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Items.."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></input>

      <button>Add</button>
    </form>
  );
}

function PakingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((i) => (
          <Item
            description={i.description}
            quantity={i.quantity}
            packed={i.packed}
            key={i.id}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ description, quantity, packed }) {
  return (
    <l1>
      <span style={packed ? { textDecoration: "line-through" } : {}}>
        {quantity} {description}
      </span>

      <button>X</button>
    </l1>
  );
}

function Stats() {
  return (
    <div className="stats">
      <footer>
        <em> You have booked X items form the list</em>
      </footer>
    </div>
  );
}
