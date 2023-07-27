import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Navbar from '../NavBar/Navbar'

export default function InvoiceList() {

  const [invoices, setInvoices] = useState([])
  useEffect(() => {
    const token = localStorage.getItem('token')
    fetch('http://127.0.0.1:8000/api/invoices/',
    {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`,
      },
    }
    )
      .then((res) => res.json())
      .then((results) => {
        setInvoices(results)
        results.forEach((element) => {
          element.totalAmount = element.items.reduce(
            (total, item) =>
              Number(total) + Number(item.rate) * Number(item.quantity),
            0,
          )
        })
        // console.log(invoices)
      })
  }, [])
  const deleteItem = (invoicesId) => {
    const token = localStorage.getItem('token')
    fetch('http://127.0.0.1:8000/api/invoices/del/' + invoicesId,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`,
        },
      })
      .then((results) => {
        if (results.ok) {
          // console.log('invoice deleted')
          setInvoices((prevInvoices) => prevInvoices.filter((invoice) => invoice.id !== invoicesId));
        }
      })

  }

  return (
    <div className="container">
      <Navbar />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Invoice No</th>
            <th scope="col">Client</th>
            <th scope="col">Date</th>
            <th scope="col">Total Amount</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {invoices &&
            invoices.map((i, index) => (
              <tr key={i.id}>
                <th>{index + 1}</th>
                <td>{i.client_name}</td>
                <td>{new Date(i.date).toDateString()}</td>

                <td>{i.totalAmount}</td>
                <td>
                  {/* {console.log(i.id)} */}
                  <div className="btn-group">
                    <a href={i.id} className="btn btn-warning">
                      Items
                    </a>
                    <button className="btn btn-primary" type="button" onClick={() => deleteItem(i.id)}>
                      Delete
                    </button>
                  </div>
                </td>


              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}
