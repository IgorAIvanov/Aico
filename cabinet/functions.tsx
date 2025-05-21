import "@shoelace-style/shoelace/dist/components/input/input.js";

export default function Functions() {
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
            <tr>
              <td>1</td>
              <td><sl-input></sl-input></td>
              <td>This is function 1</td>
              <td>2023-10-01</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Function 2</td>
              <td>This is function 2</td>
              <td>2023-10-02</td>
            </tr>
            </tbody>
        </table>
    </div>
  )

}