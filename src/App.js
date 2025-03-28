import { useState } from "react";
import "./index.css";

export default function App() {
  //here we lifte items state from foem to APP component App is acommon parent to both Form and PAcking list component
  const[items, setItems] =useState([]);

  function handleAddItem(item){
    setItems((items) => [...items, item]);  /// updating items array with new item without mutating array cuz React does'nt suppory mtating state ie here we cant use items=> items.puush(item)
  }

  function handleDeleteItem(id){
    console.log(id);  /// Kust For DEbugging
    setItems((items) => items.filter(item => item.id !== id));
  }

  function handleToggle(id){
    setItems((items) => items.map(item=> item.id === id ? {...item, packed: !item.packed} : item));
  }

  function handleClearList(){
    console.log('clicked');
    setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form  onAddItems={handleAddItem}/>
      <PakingList  items={items} onDeleteItem={handleDeleteItem} onToggleItem={handleToggle} onClearList={handleClearList}/>
      <Stats items={items} />
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

function Form({onAddItems}) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
 
  function handleSubmit(e) {
    e.preventDefault();

    if(!description) return;

    const newItems = { description, quantity, packed: false, id: Date.now() };
    console.log(newItems);
     
    onAddItems(newItems);

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3> What do you need for your 😍 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
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

function PakingList({items , onDeleteItem, onToggleItem, onClearList}) {
  const[sortBy, setSortBy] =useState("input");

  let sortedItems;
  console.log(sortBy);

  if(sortBy === "input") sortedItems=items;


  if(sortBy === "description") 
    sortedItems=items
  .slice()
  .sort((a,b) => a.description.localeCompare(b.description));


  if(sortBy === "packed")
     sortedItems=items
  .slice()
  .sort((a,b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item item ={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          //  OnClearList={OnClearList}
            key={item.id}
          />
        ))}
      </ul>
      
      <div className="actions">
      <select value={sortBy} onChange={(e)=> setSortBy(e.target.value)}>
     <option value='input' > Sort by Input </option>
     <option value='description'> Sort by Description </option>
     <option value='packed'> Sort by Packed </option>
     </select>

     <button onClick={onClearList}> Clear List </button>

     </div>
    </div>
  )
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input type='checkbox' value={item.packed} onChange={()=> onToggleItem(item.id)} />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>

      <button onClick={() => onDeleteItem(item.id)}> X </button>
    </li>
  );
}

function Stats({items}) {
  const numItems=items.length;
  const packedItem= items.slice().filter(item => item.packed).length;
  const bookPrecentag= Math.trunc((packedItem/numItems)*100);
  return (
    <div className="stats">
      <footer>
        <em> You have booked {numItems} items form the list, and you already packed  {packedItem}({bookPrecentag}%) </em>
      </footer>
    </div>
  );
}
