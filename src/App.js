import "./index.css";
import { v4 as uuidv4 } from "uuid";
import useInView from "react-cool-inview";
import { useState } from "react";

function createItems() {
  return Array.from({ length: 20 }).map((_, i) => {
    return {
      id: uuidv4(),
      num: ++count,
    };
  });
}

let count = -20;

export default function App() {
  const [items, setItems] = useState(createItems);
  const { observe, inView, scrollDirection } = useInView({
    rootMargin: "0px 0px 200px 0px",
    async onEnter({ observe, unobserve }) {
      console.log("unobserve");
      unobserve();

      await new Promise((res) => {
        // Simulating data coming in from API
        setTimeout(() => {
          console.log("setItems");
          setItems([...items, ...createItems()]);
          res();
        }, 200);
      });

      console.log("observe");
      observe();
    },
  });

  console.log(inView, scrollDirection);

  return (
    <div className="App">
      {items.map((item, i) => {
        return (
          <pre ref={i === items.length - 1 ? observe : null} key={item.id}>
            {JSON.stringify(item, undefined, 2)}
          </pre>
        );
      })}
    </div>
  );
}
