import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Stack,
  IconButton,
  Button,
  Divider,
  Chip,
  Avatar,
  GlobalStyles,
  
  useMediaQuery,
  useTheme,
  Breadcrumbs,
  Link as MuiLink,
  TextField,
  Drawer,
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  styled,
  stepConnectorClasses
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";

// Icons
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";

import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import CloseIcon from "@mui/icons-material/Close";
import Check from "@mui/icons-material/Check";

// Image from assets
import emptyCartImg from "../assets/empty-cart.png";

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#00b259',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#00b259',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#e0e0e0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#e0e0e0',
  display: 'flex',
  height: 22,
  alignItems: 'center',
  ...(ownerState.active && {
    color: '#00b259',
  }),
  ...(ownerState.completed && {
    color: '#00b259',
  }),
  '& .QontoStepIcon-completedIcon': {
    color: '#fff',
    zIndex: 1,
    fontSize: 18,
    backgroundColor: '#00b259',
    borderRadius: '50%',
    padding: '2px',
  },
  '& .QontoStepIcon-circle': {
    width: 24,
    height: 24,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: 'bold',
    backgroundColor: ownerState.active ? '#00b259' : '#e0e0e0',
    color: '#fff',
    transition: 'all 0.3s ease',
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className, icon } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle">{icon}</div>
      )}
    </QontoStepIconRoot>
  );
}


export default function Cart() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [cartItems, setCartItems] = useState([]);
  const [isCouponDrawerOpen, setIsCouponDrawerOpen] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    loadCart();
    window.addEventListener("cartUpdate", loadCart);
    return () => window.removeEventListener("cartUpdate", loadCart);
  }, []);

  const loadCart = () => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(savedCart);
    const savedCoupon = JSON.parse(localStorage.getItem("appliedCoupon") || "null");
    if (savedCoupon) {
      setAppliedCoupon(savedCoupon);
      setDiscount(savedCoupon.amount);
    }
  };

  const updateLocalStorage = (items) => {
    localStorage.setItem("cart", JSON.stringify(items));
    window.dispatchEvent(new Event("cartUpdate"));
  };

  const increment = (id) => {
    const newItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(newItems);
    updateLocalStorage(newItems);
  };

  const decrement = (id) => {
    const newItems = cartItems.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(newItems);
    updateLocalStorage(newItems);
  };

  const removeItem = (id) => {
    const newItems = cartItems.filter((item) => item.id !== id);
    setCartItems(newItems);
    updateLocalStorage(newItems);
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 500 ? 0 : 40;
  const taxes = Math.round((subtotal - discount) * 0.05); // 5% GST on discounted price
  const grandTotal = subtotal + deliveryFee + taxes - discount;

  const handleApplyCoupon = (code) => {
    let amount = 0;
    if (code === "WELCOME10") {
      amount = Math.round(subtotal * 0.1);
    } else if (code === "VARALIFE50") {
      amount = 50;
    }

    if (amount > 0) {
      const couponObj = { code, amount };
      setDiscount(amount);
      setAppliedCoupon(couponObj);
      localStorage.setItem("appliedCoupon", JSON.stringify(couponObj));
    }
    setIsCouponDrawerOpen(false);
  };

  const removeCoupon = () => {
    setDiscount(0);
    setAppliedCoupon(null);
    setCouponCode("");
    localStorage.removeItem("appliedCoupon");
  };

  if (cartItems.length === 0) {
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: "#f8f9fa", py: 10, display: 'flex', alignItems: 'center' }}>
        <GlobalStyles styles={{ 'body::-webkit-scrollbar': { display: 'none' } }} />
        <Container maxWidth="sm">
          <Paper 
            component={motion.div}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            sx={{ p: { xs: 3, md: 5 }, textAlign: 'center', borderRadius: 8, boxShadow: '0 20px 60px rgba(0,0,0,0.05)' }}
          >
            <Box 
              component="img" 
              src={emptyCartImg} 
              sx={{ width: '100%', maxWidth: 300, mb: 4, filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))' }} 
            />
            <Typography variant={isMobile ? "h5" : "h4"} fontWeight="900" gutterBottom>Your Shop Is Waiting!</Typography>
            <Typography variant="body1" color="text.secondary" mb={4}>
              "The best time to start your health journey was yesterday. The second best time is now."
            </Typography>
            <Button 
              variant="contained" 
              size="large"
              onClick={() => navigate("/shop")}
              sx={{ 
                px: 6, py: 2, borderRadius: 5, bgcolor: '#00b259', fontWeight: 'bold', fontSize: '1.1rem',
                '&:hover': { bgcolor: '#009a4d' }, textTransform: 'none'
              }}
            >
              Explore Products
            </Button>
          </Paper>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f6fbff", pt: { xs: 8, md: 10 }, pb: { xs: 15, md: 10 }, overflowX: 'hidden' }}>
      <GlobalStyles styles={{ 'body::-webkit-scrollbar': { display: 'none' } }} />
      


 <Container maxWidth="lg">
        {/* Breadcrumbs - Hidden on Mobile */}
        {!isMobile && (
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ mb: 3 }}>
            <MuiLink underline="hover" color="inherit" component={Link} to="/" sx={{ fontSize: '0.85rem' }}>Home</MuiLink>
            <MuiLink underline="hover" color="inherit" component={Link} to="/shop" sx={{ fontSize: '0.85rem' }}>Shop</MuiLink>
            <Typography color="text.primary" sx={{ fontSize: '0.85rem', fontWeight: 700 }}>Cart</Typography>
          </Breadcrumbs>
        )}

      {/* Checkout Progress Stepper */}
      <Box sx={{ maxWidth: '400px', mx: 'auto', mb: 4, mt: 2 }}>
        <Stepper activeStep={0} alternativeLabel connector={<QontoConnector />}>
          <Step>
            <StepLabel StepIconComponent={QontoStepIcon}>Review</StepLabel>
          </Step>
          <Step>
            <StepLabel StepIconComponent={QontoStepIcon}>Payment</StepLabel>
          </Step>
        </Stepper>
      </Box>

     
 <Box
  sx={{
    width: "100%",
    maxWidth: "1200px",
    mx: "auto",
    px: { xs: 1, sm: 2, md: 0 }
  }}
>
        <Typography variant={isMobile ? "h5" : "h4"} fontWeight="1000" mb={4} sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: { xs: 1, md: 2 } }}>
          Shopping Cart <Chip label={`${cartItems.length} Items`} sx={{ bgcolor: '#e8f5e9', color: '#00b259', fontWeight: 'bold' }} />
        </Typography>

        <Grid container spacing={4} sx={{ px: { xs: 1, md: 2 } }}>
          <Grid item xs={12} md={7.5}>
            <Stack spacing={3}>
              <AnimatePresence>
                {cartItems.map((item) => (
                  <Paper 
                    key={item.id}
                    component={motion.div}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    sx={{ p: { xs: 2, md: 3 }, borderRadius: 6, border: '1px solid #edf2f7', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}
                  >
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={3} sm={2.5}>
                        <Box sx={{ width: '100%', pt: '100%', position: 'relative', bgcolor: '#f1f1f1', borderRadius: 4, overflow: 'hidden' }}>
                          <Box component="img" src={item.image} sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain', p: 1 }} />
                        </Box>
                      </Grid>
                      <Grid item xs={9} sm={6.5}>
                        <Typography variant="subtitle1" fontWeight="800" sx={{ lineHeight: 1.2, mb: 0.5 }}>{item.name}</Typography>
                        <Stack direction="row" spacing={1} alignItems="center" mb={1.5}>
                          <Chip label="Super Health" size="small" sx={{ height: 20, fontSize: '0.65rem', fontWeight: 800 }} />
                          <Typography variant="caption" sx={{ color: 'green', fontWeight: 700 }}>In Stock</Typography>
                        </Stack>
                        
                        <Stack direction="row" alignItems="center" spacing={1.5}>
                          <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#f8f9fa', borderRadius: 3, p: 0.5, border: '1px solid #eee' }}>
                            <IconButton size="small" onClick={() => decrement(item.id)} sx={{ color: '#00b259' }}><RemoveRoundedIcon fontSize="small" /></IconButton>
                            <Typography sx={{ px: 2, fontWeight: 800 }}>{item.quantity}</Typography>
                            <IconButton size="small" onClick={() => increment(item.id)} sx={{ color: '#00b259' }}><AddRoundedIcon fontSize="small" /></IconButton>
                          </Box>
                          {!isMobile && <Divider orientation="vertical" flexItem sx={{ height: 20, my: 'auto' }} />}
                          <Button startIcon={<DeleteOutlineRoundedIcon />} onClick={() => removeItem(item.id)} sx={{ color: '#ff4d4d', textTransform: 'none', fontWeight: 700, fontSize: '0.8rem', minWidth: 'auto' }}>Remove</Button>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={3} sx={{ textAlign: { xs: 'left', sm: 'right' }, mt: { xs: 1.5, sm: 0 }, pl: { xs: 0, sm: 0 } }}>
                        <Box sx={{ display: 'flex', flexDirection: { xs: 'row', sm: 'column' }, alignItems: { xs: 'center', sm: 'flex-end' }, justifyContent: 'space-between' }}>
                          <Box>
                            <Typography variant="h6" fontWeight="900" color="#1a1a1a">₹{(item.price * item.quantity).toLocaleString()}</Typography>
                            <Typography variant="caption" color="text.secondary">₹{item.price.toLocaleString()} / unit</Typography>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>
                ))}
              </AnimatePresence>
            </Stack>

            <Box sx={{ mt: 5, p: { xs: 1.5, md: 4 }, borderRadius: 6, bgcolor: 'rgba(0, 178, 89, 0.05)', border: '1px dashed #00b259' }}>
              <Grid container spacing={1}>
                <Grid item xs={6} sm={3}><Stack alignItems="center" spacing={1}><LocalShippingOutlinedIcon sx={{ color: '#00b259', fontSize: 20 }} /><Typography variant="caption" sx={{ fontSize: '0.65rem' }} fontWeight="800" textAlign="center">Free Delivery</Typography></Stack></Grid>
                <Grid item xs={6} sm={3}><Stack alignItems="center" spacing={1}><VerifiedUserOutlinedIcon sx={{ color: '#00b259', fontSize: 20 }} /><Typography variant="caption" sx={{ fontSize: '0.65rem' }} fontWeight="800" textAlign="center">Secure Payments</Typography></Stack></Grid>
                <Grid item xs={6} sm={3}><Stack alignItems="center" spacing={1}><Inventory2OutlinedIcon sx={{ color: '#00b259', fontSize: 20 }} /><Typography variant="caption" sx={{ fontSize: '0.65rem' }} fontWeight="800" textAlign="center">Easy Returns</Typography></Stack></Grid>
                <Grid item xs={6} sm={3}><Stack alignItems="center" spacing={1}><SellOutlinedIcon sx={{ color: '#00b259', fontSize: 20 }} /><Typography variant="caption" sx={{ fontSize: '0.65rem' }} fontWeight="800" textAlign="center">Best Prices</Typography></Stack></Grid>
              </Grid>
            </Box>
          </Grid>

          <Grid item xs={12} md={4.5}>
            <Box sx={{ position: { md: 'sticky' }, top: 100 }}>
              <Paper sx={{ p: 2.5, borderRadius: 6, mb: 3, border: '1px solid #edf2f7' }}>
                <Typography variant="subtitle2" fontWeight="900" mb={2}>Offers & Rewards</Typography>
                {!appliedCoupon ? (
                  <Box onClick={() => setIsCouponDrawerOpen(true)} sx={{ px: 2, py: 1.5, bgcolor: '#f1fdf5', borderRadius: 4, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #e1f5e8' }}>
                    <Stack direction="row" spacing={1.5} alignItems="center"><SellOutlinedIcon sx={{ color: '#00b259', fontSize: 20 }} /><Typography variant="body2" fontWeight="700">Apply Coupon Code</Typography></Stack>
                    <ArrowForwardIosRoundedIcon sx={{ fontSize: 14, color: '#00b259' }} />
                  </Box>
                ) : (
                  <Box sx={{ px: 2, py: 1.5, bgcolor: '#e8f5e9', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px dashed #00b259' }}>
                    <Stack direction="row" spacing={1.5} alignItems="center"><Chip label={appliedCoupon.code} size="small" color="success" sx={{ fontWeight: 900 }} /><Typography variant="body2" fontWeight="700">Saved ₹{appliedCoupon.amount}!</Typography></Stack>
                    <Button size="small" onClick={removeCoupon} sx={{ color: '#ff4d4d', minWidth: 'auto', fontWeight: 'bold' }}>Remove</Button>
                  </Box>
                )}
              </Paper>

              <Paper sx={{ p: 3, borderRadius: 7, border: '1px solid #edf2f7', boxShadow: '0 10px 40px rgba(0,0,0,0.04)' }}>
                <Typography variant="h6" fontWeight="1000" mb={3}>Payment Details</Typography>
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}><Typography variant="body2" color="text.secondary" fontWeight="600">Items Total</Typography><Typography variant="body2" fontWeight="700">₹{subtotal.toLocaleString()}</Typography></Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}><Typography variant="body2" color="text.secondary" fontWeight="600">Delivery Fee</Typography><Typography variant="body2" fontWeight="700" color={deliveryFee === 0 ? 'green' : 'inherit'}>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</Typography></Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}><Typography variant="body2" color="text.secondary" fontWeight="600">Taxes & Charges (5%)</Typography><Typography variant="body2" fontWeight="700">₹{taxes.toLocaleString()}</Typography></Box>
                  {discount > 0 && <Box sx={{ display: 'flex', justifyContent: 'space-between' }}><Typography variant="body2" color="green" fontWeight="600">Coupon Discount</Typography><Typography variant="body2" fontWeight="700" color="green">- ₹{discount.toLocaleString()}</Typography></Box>}
                  <Divider sx={{ my: 1, borderStyle: 'dashed' }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}><Typography variant="h6" fontWeight="1000">Grand Total</Typography><Typography variant="h6" fontWeight="1000" color="#00b259">₹{grandTotal.toLocaleString()}</Typography></Box>
                </Stack>
                <Button fullWidth variant="contained" size="large" onClick={() => navigate("/checkout")} sx={{ mt: 3, py: 2, borderRadius: 5, bgcolor: '#00b259', fontWeight: '1000', textTransform: 'none', display: { xs: 'none', md: 'block' } }}>Proceed to Checkout</Button>
              </Paper>
            </Box>
          </Grid>
        </Grid>
</Box>
        {/* Suggested Section */}
      

        {/* Sticky Mobile Checkout Bar */}
        {isMobile && (
          <Paper elevation={10} sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1100, p: 2, bgcolor: 'white', borderRadius: '24px 24px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 -4px 20px rgba(0,0,0,0.1)' }}>
            <Box><Typography variant="caption" fontWeight="bold" color="text.secondary">Total Payable</Typography><Typography variant="h6" fontWeight="900" color="#00b259">₹{grandTotal.toLocaleString()}</Typography></Box>
            <Button variant="contained" onClick={() => navigate("/checkout")} sx={{ px: 4, py: 1.5, borderRadius: 4, bgcolor: '#00b259', fontWeight: 'bold', fontSize: '1rem', textTransform: 'none' }}>Checkout</Button>
          </Paper>
        )}
      </Container>

      <Drawer anchor="right" open={isCouponDrawerOpen} onClose={() => setIsCouponDrawerOpen(false)} PaperProps={{ sx: { width: { xs: '100%', sm: 420 }, p: 4, bgcolor: "#F8F9FA" } }}>
         <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}><Typography variant="h5" fontWeight="900">Apply Coupon</Typography><IconButton onClick={() => setIsCouponDrawerOpen(false)}><CloseIcon /></IconButton></Stack>
         <Paper sx={{ p: 2, borderRadius: 3, mb: 4, display: 'flex', gap: 1, border: '1px solid #eee' }}><TextField fullWidth size="small" placeholder="Enter code" value={couponCode} onChange={(e) => setCouponCode(e.target.value.toUpperCase())} /><Button variant="contained" onClick={() => handleApplyCoupon(couponCode)} sx={{ bgcolor: "#00b259", borderRadius: 3, fontWeight: "bold" }}>Apply</Button></Paper>
         <Typography variant="subtitle2" fontWeight="900" mb={2}>Available Offers</Typography>
         <Stack spacing={2}>
           {[{ code: "WELCOME10", desc: "10% OFF", icon: <SellOutlinedIcon /> }, { code: "VARALIFE50", desc: "₹50 OFF", icon: <Inventory2OutlinedIcon /> }].map((offer) => (
             <Paper key={offer.code} onClick={() => handleApplyCoupon(offer.code)} sx={{ p: 2, borderRadius: 4, border: "1px dashed #00b259", cursor: 'pointer' }}>
                <Stack direction="row" spacing={2} alignItems="center"><Avatar sx={{ bgcolor: 'rgba(0, 178, 89, 0.1)', color: '#00b259' }}>{offer.icon}</Avatar><Box sx={{ flex: 1 }}><Typography variant="subtitle1" fontWeight="1000" color="#00b259">{offer.code}</Typography><Typography variant="caption" color="text.secondary">{offer.desc}</Typography></Box><ArrowForwardIosRoundedIcon sx={{ fontSize: 14 }} /></Stack>
             </Paper>
           ))}
         </Stack>
      </Drawer>
    </Box>
  );
}
