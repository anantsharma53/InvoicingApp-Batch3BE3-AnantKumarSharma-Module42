import React, { useState, useEffect } from 'react';

export default function ItemList({ invoice, items }) {
  const [itemList, setItemList] = useState(items);
  useEffect(() => {
    setItemList(items);
  }, [items]); 
  // console.log(itemList)
  const deleteItem=(itemId)=>{
    fetch('http://127.0.0.1:8000/api/invoices/'+invoice.id+'/items/'+itemId,
    {
      method:'DELETE',
      headers:{
        'Content-Type': 'application/json',
      },
    })
    .then((response)=>{
      if(response.ok){
        // console.log('Item deleted' )
        setItemList((prevItems) => prevItems.filter((item) => item.id !== itemId));
      }
    })
    
  }
  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Sl No</th>
            <th scope="col">Description</th>
            <th scope="col">Rate</th>
            <th scope="col">Quantity</th>
            <th scope="col">Total</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {itemList &&
            itemList.map((item,index) => (
              
              <tr key={item.id}>
                {/* {console.log(item)} */}
                
                <th>{index+1}</th>
                {/* item.id for edit or get item record no in database */}
                <td>{item.desc}</td>
                <th>{item.rate}</th>
                <td>{item.quantity}</td>
                <td>{(item.rate * item.quantity).toFixed(2)}</td>
                <td>
                  <button className="btn btn-primary" type="button" onClick={()=>deleteItem(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}
