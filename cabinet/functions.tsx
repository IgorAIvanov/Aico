import "@shoelace-style/shoelace/dist/components/input/input.js";
import { useEffect, useState } from "hono/jsx";

export default function Functions() {

   const [functions, setFunctions] = useState([]);

   useEffect(() => {
     fetch("http://localhost:8000/api/services/functions")
       .then((response) => response.json())
       .then((data) => setFunctions(data))
       .catch((error) => console.error("Error fetching functions:", error));
   }, []);

  return (
    <div>
        <h1 align="center">This is functions content</h1>
        <table>
          <thead>
            <tr>  
              <th>id</th>
              <th>name</th>
              <th>description</th>
              <th>created_at</th>
            </tr>
          </thead>
          <tbody>
            {functions.map((func) => (
              <tr key={func.id}>
                <td>{func.id}</td>
                <td>{func.name}</td>
                <td>{func.description}</td>
                
              </tr>
            ))}
            
            </tbody>
        </table>
    </div>
  )

}