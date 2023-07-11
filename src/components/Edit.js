import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";

function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState(null);
  const [item_name, setItemName] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState("");
  const [from, setFrom] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchTransaction();
  }, [id]); // Add id as a dependency

  async function fetchTransaction() {
    try {
      const response = await axios.get(
        `http://localhost:3001/transactions/${id}`
      );
      setTransaction(response.data);
      setItemName(response.data.item_name);
      setAmount(response.data.amount);
      setDate(response.data.date);
      setFrom(response.data.from);
      setCategory(response.data.category);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUpdateTransaction() {
    try {
      const response = await axios.put(
        `http://localhost:3001/transactions/${id}`,
        {
          item_name,
          amount,
          date,
          from,
          category,
        }
      );
      navigate(`/transactions/${response.data.id}`);
    } catch (error) {
      console.log(error);
    }
  }

  if (!transaction) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <h2 className="mt-4">Edit Transaction</h2>
      <Form onSubmit={handleUpdateTransaction}>
        <Form.Group controlId="itemName">
          <Form.Label>Item Name:</Form.Label>
          <Form.Control
            type="text"
            value={item_name}
            onChange={(e) => setItemName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="amount">
          <Form.Label>Amount:</Form.Label>
          <Form.Control
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </Form.Group>
        <Form.Group controlId="date">
          <Form.Label>Date:</Form.Label>
          <Form.Control
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="from">
          <Form.Label>From:</Form.Label>
          <Form.Control
            type="text"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="category">
          <Form.Label>Category:</Form.Label>
          <Form.Control
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Update
        </Button>
      </Form>
    </Container>
  );
}

export default Edit;
