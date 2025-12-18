export default function BookList(props) {

    const generateRows = () => {
        if (props.data != null) {
            return props.data.map(book => (
                <tr key={book.id} bgcolor={book.stock >= 30 ? 'green' : 'red'} >
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.description}</td>
                    <td>{book.price}</td>
                    <td>{book.isbn}</td>
                    <td>{book.stock}</td>
                    <td>
                        <button onClick={() => alert(JSON.stringify(book))}>Debug</button>
                    </td>
                </tr>
            ))
        }
        else {
            return null;
        }
    }
    
    return (
        <table border="1">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>ISBN</th>
                    <th>Stock</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>{generateRows()}</tbody>
        </table>
    )
}