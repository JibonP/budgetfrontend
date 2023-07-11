import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Button } from "react-bootstrap";

function Show() {
  const { id } = useParams();
  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    fetchTransaction();
  }, []);

  async function fetchTransaction() {
    try {
      const response = await axios.get(
        `http://localhost:3001/transactions/${id}`
      );
      setTransaction(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  if (!transaction) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Transaction Details</h2>
      <p>Item Name: {transaction.item_name}</p>
      <p>Amount: {transaction.amount}</p>
      <p>Date: {transaction.date}</p>
      <p>From: {transaction.from}</p>
      <p>Category: {transaction.category}</p>
      <Button as={Link} to={`/edit/${id}`} variant="primary">
        Edit
      </Button>
    </div>
  );
}

export default Show;
