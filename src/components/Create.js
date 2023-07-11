import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import "./Create.css";

function Create() {
  const navigate = useNavigate();
  const [item_name, setItemName] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState("");
  const [from, setFrom] = useState("");
  const [category, setCategory] = useState("");
  const [isDeposit, setIsDeposit] = useState(true);
  const [showAlert, setShowAlert] = useState(false);

  async function handleCreateTransaction() {
    try {
      const url =
        process.env.NODE_ENV === "production"
          ? `https://budgetbackend.onrender.com/transactions`
          : `http://localhost:3001/transactions`;
      const response = await axios.post(url, {
        item_name,
        amount: isDeposit ? amount : -amount,
        date,
        from,
        category,
      });
      navigate(`/transactions/${response.data.id}`);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container>
      <h2 className="mt-4">Add a new item</h2>
      {showAlert && (
        <div className="alert alert-success fade-in" role="alert">
          Item created successfully!
        </div>
      )}
      <Form onSubmit={handleCreateTransaction}>
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
        <Form.Group controlId="isDeposit">
          <Form.Check
            type="checkbox"
            checked={isDeposit}
            label="Deposit"
            onChange={(e) => setIsDeposit(e.target.checked)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          CREATE NEW ITEM
        </Button>
      </Form>
    </Container>
  );
}

export default Create;
