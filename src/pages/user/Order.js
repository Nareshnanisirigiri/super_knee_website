import React, { useEffect, useState } from "react";
import api from "../../api";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Box,
} from "@mui/material";

function Order() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/payment/user-orders");
 // Fixed API endpoint

      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={4}
        textAlign="center"
      >
        My Orders
      </Typography>

      <Grid container spacing={3}>
        {orders.length === 0 ? (
          <Typography>No Orders Found</Typography>
        ) : (
          orders.map((order) => (
            <Grid item xs={12} md={6} key={order._id}>
              <Card elevation={5}>
                <CardContent>

                  <Typography variant="h6" color="primary" gutterBottom>
                    Order ID: {order.razorpayOrderId || order._id}
                  </Typography>

                  <Box sx={{ mb: 2 }}>
                    {order.items && order.items.map((item, i) => (
                      <Typography key={i} variant="body2">
                        • {item.name} (x{item.quantity})
                      </Typography>
                    ))}
                    {!order.items && (
                      <Typography>Product: {order.productName}</Typography>
                    )}
                  </Box>

                  <Typography fontWeight="bold">
                    Total: ₹{order.totalAmount || order.price}
                  </Typography>

                  <Box mt={2}>
                    <Chip
                      label={order.orderStatus || order.status}
                      color={order.paymentStatus === "Completed" ? "success" : "warning"}
                    />
                  </Box>

                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
}

export default Order;