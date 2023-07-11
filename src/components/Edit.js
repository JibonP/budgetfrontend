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
  }, [id]);

  async function fetchTransaction() {
    try {
      const url =
        process.env.NODE_ENV === "production"
          ? `https://budgetbackend.onrender.com/transactions/${id}`
          : `http://localhost:3001/transactions/${id}`;
      const response = await axios.get(url);
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
      const url =
        process.env.NODE_ENV === "production"
          ? `https://budgetbackend.onrender.com/transactions/${id}`
          : `http://localhost:3001/transactions/${id}`;
      const response = await axios.put(url, {
        item_name,
        amount,
        date,
        from,
        category,
      });
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
        {/* Form fields go here */}

        <Button variant="primary" type="submit">
          Update
        </Button>
      </Form>
    </Container>
  );
}

export default Edit;
