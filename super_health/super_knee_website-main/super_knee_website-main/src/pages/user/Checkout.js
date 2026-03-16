import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
  Divider,
  Radio,

  Stack,

  IconButton,
  Avatar,

  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Drawer,

  GlobalStyles,
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  styled,
  stepConnectorClasses
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { motion, AnimatePresence } from "framer-motion";

// Icons
import RoomIcon from "@mui/icons-material/Room";

import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PaymentIcon from "@mui/icons-material/Payment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";

import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SecurityIcon from "@mui/icons-material/Security";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CloseIcon from "@mui/icons-material/Close";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import Check from "@mui/icons-material/Check";

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

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function Checkout() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [showQR, setShowQR] = useState(false);
  const [isAddressDrawerOpen, setIsAddressDrawerOpen] = useState(false);
  const [isCouponDrawerOpen, setIsCouponDrawerOpen] = useState(false);
  const [couponCode, setCouponCode] = useState("");

  const [showExitDialog, setShowExitDialog] = useState(false);
  const [cardDetails, setCardDetails] = useState({ number: "", expiry: "", cvv: "", name: "" });
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discount, setDiscount] = useState(0);
  
  const [address, setAddress] = useState({
    name: "Thatipally Kumar",
    company: "goexpert",
    address: "panjaguta metro station, panjaguta",
    city: "Hyderabad",
    state: "Telangana",
    country: "India",
    pincode: "500073",
    phone: "+916302759527",
    email: "thatipallyvinodkumar167@gmail.com"
  });

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (savedCart.length === 0) {
      navigate("/cart");
    }
    setCartItems(savedCart);
    
    // Auto-fill user info if logged in
    const userStr = localStorage.getItem("user");
    if (userStr && userStr !== "undefined" && userStr !== "null") {
      try {
        const user = JSON.parse(userStr);
        if (user.name) {
          setAddress(prev => ({ 
            ...prev, 
            name: user.name, 
            email: user.email,
            phone: user.phone || prev.phone
          }));
        }
      } catch (e) {
        console.error("User storage parse error", e);
      }
    }

    const savedCoupon = JSON.parse(localStorage.getItem("appliedCoupon") || "null");
    if (savedCoupon) {
      setAppliedCoupon(savedCoupon);
      setDiscount(savedCoupon.amount);
      setCouponCode(savedCoupon.code);
    }

    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "Cancel order? All progress will be lost.";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [navigate]);

  const handleBackClick = () => {
    setShowExitDialog(true);
  };

  const handleExitAnyway = () => {
    navigate("/cart");
  };

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const deliveryFee = 0; 
  const handlingFee = 15;
  const totalPrice = subtotal + deliveryFee + handlingFee - discount ;

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
      setCouponCode(code);
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

  const handlePayment = async () => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");

    // Guest Check: Redirect to login if absolutely no session data found
    if (!token && !userStr) {
      alert("🔐 Please login to place an order.");
      navigate("/login/user", { state: { from: "/checkout" } });
      return;
    }

    // Note: If userStr exists but token is missing, we'll let the API call proceed 
    // and handle any 401 errors if they happen.
    if (!token || token === "null" || token === "undefined") {
        alert("🔐 Your session is missing or expired. Please login again.");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login/user");
        setLoading(false);
        return;
    }

    setLoading(true);

    try {
      const orderRes = await api.post("/payment/create-order", {
        items: cartItems.map(item => ({
          productId: item.productId,
          name: item.name,
          quantity: item.quantity,
          price: item.price
        })),
        totalAmount: totalPrice,
        shippingAddress: address,
        paymentMethod: paymentMethod === "partial_cod" ? "Partial COD" : "Online"
      });

      const orderData = orderRes.data;

      // Simulation Mode: If it's a test order (e.g. key mismatch or missing), simulate success
      if (orderData.isTest) {
        console.log("🛠️ Test Mode: Simulating secure payment verification...");
        // Wait 1.5s to feel dynamic
        setTimeout(async () => {
          try {
            const verifyRes = await api.post("/payment/verify-payment", {
              razorpay_order_id: orderData.orderId,
              razorpay_payment_id: "pay_simulated_" + Date.now(),
              razorpay_signature: "simulated_sig",
            });

            if (verifyRes.data && verifyRes.data.order) {
              localStorage.removeItem("cart");
              window.dispatchEvent(new Event("cartUpdate"));
              setLoading(false);
              navigate("/order-success", { state: { order: verifyRes.data.order } });
            }
          } catch (err) {
            setLoading(false);
            navigate("/payment-fail", { state: { error: "Test verification failed." } });
          }
        }, 2000);
        return;
      }

      const res = await loadRazorpayScript();
      if (!res) {
        alert("Payment SDK failed to load. Please refresh.");
        setLoading(false);
        return;
      }

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID || "rzp_test_51PK6as7L9m0P4y",
        amount: (paymentMethod === "partial_cod" ? 578 : totalPrice) * 100,
        currency: "INR",
        name: "Varalife",
        description: `Order Payment - ${paymentMethod}`,
        order_id: orderData.orderId,
        handler: async function (response) {
          try {
            const verifyRes = await api.post("/payment/verify-payment", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyRes.data && verifyRes.data.order) {
              localStorage.removeItem("cart");
              window.dispatchEvent(new Event("cartUpdate"));
              navigate("/order-success", { state: { order: verifyRes.data.order } });
            }
          } catch (err) {
            console.error("Verification error:", err);
            navigate("/payment-fail", { state: { error: "Payment verification failed. Please check with your bank." } });
          }
        },
        modal: {
          ondismiss: function() {
            setLoading(false);
          }
        },
        prefill: {
          name: address.name,
          email: address.email,
          contact: address.phone,
        },
        theme: {
          color: "#00b259",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Order creation error:", error);
      setLoading(false);
      
      if (error.response?.status === 401) {
        alert("🔐 Your session has expired. Please login again to complete your order.");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login/user");
      } else {
        navigate("/payment-fail", { state: { error: error.response?.data?.message || "Unable to create order. Please try again later." } });
      }
    }
  };

  const PaymentItem = ({ id, title, subtitle, icon, logos, badge, amount, children }) => (
    <Box 
      onClick={() => setPaymentMethod(id)}
      sx={{ 
        p: 2.5, 
        cursor: "pointer", 
        bgcolor: paymentMethod === id ? "white" : "white",
        border: "1px solid",
        borderColor: paymentMethod === id ? "#00b259" : "#eee",
        borderRadius: 4,
        mb: 2,
        boxShadow: paymentMethod === id ? "0 8px 24px rgba(0, 178, 89, 0.08)" : "none",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": { borderColor: "#00b259" }
      }}
    >
      <Stack direction="row" alignItems="center" spacing={2}>
        <Radio checked={paymentMethod === id} sx={{ color: "#00b259", '&.Mui-checked': { color: '#00b259' } }} />
        {icon}
        <Box sx={{ flex: 1 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="body1" fontWeight="800" sx={{ color: "#333" }}>{title}</Typography>
            {badge && <Chip label={badge} size="small" sx={{ height: 16, fontSize: '9px', bgcolor: "#FFEBEB", color: "#D32F2F", fontWeight: "900" }} />}
          </Stack>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>{subtitle}</Typography>
        </Box>
        {amount && (
          <Typography variant="subtitle2" fontWeight="900" color="#333">₹{amount}</Typography>
        )}
      </Stack>
      
      <AnimatePresence>
        {paymentMethod === id && (
          <Box 
            component={motion.div} 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: "auto" }} 
            exit={{ opacity: 0, height: 0 }}
            sx={{ overflow: "hidden" }}
          >
            <Box sx={{ mt: 2, pt: 2, borderTop: "1px dashed #eee" }}>
              {children}
            </Box>
          </Box>
        )}
      </AnimatePresence>
    </Box>
  );

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f6fbff", pt: { xs: 10, md: 10 }, pb: 10 }}>
      <GlobalStyles styles={{
        'body::-webkit-scrollbar': { display: 'none' },
        'body': { msOverflowStyle: 'none', scrollbarWidth: 'none' },
        '*::-webkit-scrollbar': { display: 'none' },
        '*': { msOverflowStyle: 'none', scrollbarWidth: 'none' }
      }} />
      {/* Premium Navigation Header */}
      <Paper elevation={0} sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1100, borderBottom: "1px solid #eee", px: { xs: 1, md: 2 }, py: 0.5, bgcolor: "white" }}>
         <Container maxWidth="lg" sx={{ px: { xs: 0, sm: 2 } }}>
           <Grid container alignItems="center" sx={{ minHeight: '64px' }}>
              {/* Left Column: Back & Title */}
              <Grid item xs={3} md={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <IconButton onClick={handleBackClick} sx={{ color: "#333", p: { xs: 0.5, md: 1 } }}>
                     <ArrowBackIcon />
                  </IconButton>
                  <Typography variant="h6" fontWeight="900" sx={{ fontSize: { xs: '0.9rem', md: '1.1rem' }, display: { xs: 'none', sm: 'block' }, whiteSpace: 'nowrap' }}>
                    Finalize Order
                  </Typography>
                </Box>
              </Grid>

              {/* Middle Column: Stepper (Centered) */}
              <Grid item xs={6} md={4}>
                <Box sx={{ width: '100%', maxWidth: '280px', mx: 'auto' }}>
                  <Stepper activeStep={1} alternativeLabel connector={<QontoConnector />} sx={{ '& .MuiStepLabel-label': { fontSize: '10px', fontWeight: 'bold', mt: '4px !important' } }}>
                    <Step>
                      <StepLabel StepIconComponent={QontoStepIcon}>Review</StepLabel>
                    </Step>
                    <Step>
                      <StepLabel StepIconComponent={QontoStepIcon}>Payment</StepLabel>
                    </Step>
                  </Stepper>
                </Box>
              </Grid>

              {/* Right Column: Badges (Hidden on mobile if needed) */}
              <Grid item xs={3} md={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Stack direction="row" spacing={1} sx={{ display: { xs: 'none', lg: 'flex' } }}>
                   <BadgeSmall icon={<SecurityIcon sx={{ fontSize: 16 }} />} text="Secure" />
                   <BadgeSmall icon={<LocalShippingIcon sx={{ fontSize: 16 }} />} text="Fast" />
                </Stack>
              </Grid>
           </Grid>
         </Container>
      </Paper>

      {/* Dynamic Blinkit Style Header */}
      <Box sx={{ bgcolor: "white", py: 1.5, px: 2, mb: 3, borderBottom: "1px solid #eee" }}>
         <Container maxWidth="lg">
           <Stack direction="row" alignItems="center" spacing={2}>
              <Box sx={{ bgcolor: "rgba(0,178,89,0.1)", p: 1, borderRadius: 2 }}>
                <AccessTimeIcon sx={{ color: "#00b259" }} />
              </Box>
              <Box>
                <Typography variant="body2" fontWeight="800">Delivering in 35 mins</Typography>
                <Typography variant="caption" color="text.secondary">To {address.name}'s Home ({address.city})</Typography>
              </Box>
           </Stack>
         </Container>
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            <Stack spacing={3}>
              {/* Delivery Address Card */}
              <Paper sx={{ p: 3, borderRadius: 4, border: "1px solid #e0e0e0", boxShadow: "none", bgcolor: "white" }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1.5}>
                  <Typography variant="subtitle1" fontWeight="900" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <RoomIcon sx={{ color: "#00b259" }} /> Delivery Address
                  </Typography>
                  <Button 
                    sx={{ color: "#00b259", fontWeight: "900", textTransform: "none", fontSize: "0.85rem" }}
                    onClick={() => setIsAddressDrawerOpen(true)}
                  >
                    Change
                  </Button>
                </Stack>
                <Box>
                  <Typography variant="body1" component="div" fontWeight="800" sx={{ display: 'flex', alignItems: 'center' }}>
                    {address.name} 
                    <Chip label="Home" size="small" sx={{ height: 18, fontSize: '9px', ml: 1, bgcolor: "#f0f0f0", fontWeight: 'bold' }} />
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, lineHeight: 1.6 }}>{address.address}, {address.city} - {address.pincode}</Typography>
                  <Typography variant="body2" fontWeight="700" sx={{ mt: 1 }}>{address.phone}</Typography>
                </Box>
              </Paper>

              {/* Delivery Slot Selector */}
              <Paper sx={{ p: 3, borderRadius: 4, border: "1px solid #e0e0e0", boxShadow: "none" }}>
                <Typography variant="subtitle1" fontWeight="900" mb={2} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AccessTimeIcon sx={{ color: "#00b259" }} /> Choose Delivery Slot
                </Typography>
                <Stack 
                  direction="row" 
                  spacing={2} 
                  sx={{ 
                    overflowX: 'auto', 
                    pb: 1,
                    '&::-webkit-scrollbar': { display: 'none' },
                    msOverflowStyle: 'none',
                    scrollbarWidth: 'none'
                  }}
                >
                   {[
                     { day: "Today", time: "35-45 mins", active: true },
                     { day: "Tomorrow", time: "9 AM - 12 PM", active: false },
                     { day: "Tomorrow", time: "6 PM - 9 PM", active: false }
                   ].map((slot, i) => (
                     <Box 
                      key={i} 
                      sx={{ 
                        minWidth: 120, p: 2, borderRadius: 4, border: "2px solid", 
                        borderColor: slot.active ? "#00b259" : "#eee",
                        bgcolor: slot.active ? "rgba(0, 178, 89, 0.04)" : "white",
                        textAlign: "center", cursor: "pointer",
                        transition: "all 0.2s"
                      }}
                     >
                       <Typography variant="body2" fontWeight="900" display="block" sx={{ color: slot.active ? "#00b259" : "#333" }}>{slot.day}</Typography>
                       <Typography variant="caption" fontWeight="600" color="text.secondary">{slot.time}</Typography>
                     </Box>
                   ))}
                </Stack>
              </Paper>

              {/* Payment Methods */}
              <Typography variant="subtitle1" fontWeight="900" sx={{ ml: 1 }}>Payment Methods</Typography>
              <Box>
                <PaymentItem 
                  id="upi"
                  title="UPI Apps"
                  subtitle="Instantly pay via any UPI app"
                  icon={<AccountBalanceWalletIcon sx={{ color: "#673ab7" }} />}
                >
                  <Box sx={{ textAlign: "center", mb: 2 }}>
                    <Typography variant="caption" fontWeight="bold" color="text.secondary" display="block" mb={2}>Popular UPI Apps</Typography>
                     <Stack direction="row" spacing={3} justifyContent="center" flexWrap="wrap" sx={{ py: 1 }}>
                        <UpiLogo src="https://play-lh.googleusercontent.com/6iyA2zVz5PyyMjK5SIxdUhrb7oh9cYVXJ93q6DZkmx07Er1o90PXYeo6mzL4VC2Gj9s=w240-h480-rw" name="PhonePe" />
                        <UpiLogo src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/1280px-Google_Pay_Logo.svg.png" name="GPay" />
                        <UpiLogo src="https://cdn.iconscout.com/icon/free/png-256/free-paytm-226448.png" name="Paytm" />
                        <UpiLogo src="data:image/webp;base64,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" name="BHIM" />
                        <UpiLogo src="data:image/png;base64,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" name="Amazon" />
                     </Stack>
                  </Box>
                  <Button 
                    fullWidth variant="outlined" startIcon={<QrCodeScannerIcon />} onClick={() => setShowQR(!showQR)}
                    sx={{ py: 1.2, borderRadius: 3, textTransform: "none", color: "#00b259", borderColor: "#00b259", fontWeight: "800" }}
                  >
                    Generate QR Code
                  </Button>
                  <AnimatePresence>
                    {showQR && (
                      <Box component={motion.div} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} sx={{ textAlign: "center", mt: 2, p: 2, bgcolor: "#f9f9f9", borderRadius: 4 }}>
                        <Box component="img" src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Varalife" sx={{ width: 140, height: 140, border: "5px solid #fff", borderRadius: 2 }} />
                        <Typography variant="caption" display="block" sx={{ mt: 1, fontWeight: "700" }}>Scan with any app to pay ₹{totalPrice}</Typography>
                      </Box>
                    )}
                  </AnimatePresence>
                </PaymentItem>

                <PaymentItem 
                  id="cards"
                  title="Debit / Credit Cards"
                  subtitle="Securely use your Visa, Master or Rupay card"
                  icon={<PaymentIcon sx={{ color: "#ff9800" }} />}
                >
                  <Box sx={{ mb: 3 }}>
                     <VisualCard details={cardDetails} />
                  </Box>
                  <Stack spacing={2}>
                    <TextField 
                      fullWidth size="small" label="Card Number" 
                      value={cardDetails.number}
                      onChange={(e) => setCardDetails({...cardDetails, number: e.target.value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim().substring(0, 19)})}
                      placeholder="0000 0000 0000 0000"
                    />
                    <Stack direction="row" spacing={2}>
                      <TextField 
                        fullWidth size="small" label="Expiry (MM/YY)" 
                        value={cardDetails.expiry}
                        onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value.substring(0, 5)})}
                        placeholder="MM/YY"
                      />
                      <TextField 
                        fullWidth size="small" label="CVV" 
                        value={cardDetails.cvv}
                        type="password"
                        onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value.substring(0, 3)})}
                        placeholder="***"
                      />
                    </Stack>
                    <TextField 
                      fullWidth size="small" label="Name on Card" 
                      value={cardDetails.name}
                      onChange={(e) => setCardDetails({...cardDetails, name: e.target.value.toUpperCase()})}
                      placeholder="AS WRITTEN ON CARD"
                    />
                  </Stack>
                </PaymentItem>

                <PaymentItem 
                  id="netbanking"
                  title="Netbanking"
                  subtitle="Select from popular Indian banks"
                  icon={<VerifiedUserIcon sx={{ color: "#2196f3" }} />}
                >
                   <Stack direction="row" spacing={3} flexWrap="wrap" justifyContent="center" sx={{ py: 1 }}>
                      {[
                        { name: 'SBI', logo: 'https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/sbi_9b9a6d.svg' },
                        { name: 'HDFC', logo: 'https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/hdfc_4df8cd.svg' },
                        { name: 'ICICI', logo: 'https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/icici_2729b8.svg' },
                        { name: 'Axis', logo: 'https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/axis_12368c.svg' }
                      ].map(bank => (
                        <Stack key={bank.name} alignItems="center" spacing={0.5} sx={{ cursor: 'pointer', opacity: 0.8, '&:hover': { opacity: 1 } }}>
                          <Avatar variant="rounded" src={bank.logo} sx={{ width: 44, height: 44, bgcolor: "white", border: "1px solid #eee", p: 0 }} />
                          <Typography variant="caption" fontWeight="800" fontSize="10px" color="text.secondary">{bank.name}</Typography>
                        </Stack>
                      ))}
                      <Stack alignItems="center" spacing={0.5} sx={{ cursor: 'pointer' }}>
                        <Avatar variant="rounded" sx={{ width: 44, height: 44, bgcolor: "#f5f5f5", border: "1px solid #eee" }}>
                           <MoreHorizIcon />
                        </Avatar>
                        <Typography variant="caption" fontWeight="800" fontSize="10px" color="text.secondary">More</Typography>
                      </Stack>
                   </Stack>
                </PaymentItem>

                <PaymentItem 
                  id="partial_cod"
                  title="Partial Cash on Delivery"
                  subtitle="Pay split amount at delivery"
                  badge="POPULAR"
                  amount="578 Now"
                  icon={<LocalShippingIcon sx={{ color: "#e91e63" }} />}
                >
                   <Box sx={{ p: 2, bgcolor: "#fff8f8", borderRadius: 3, border: "1px dashed #ffcdd2" }}>
                      <Typography variant="body2" fontWeight="700" color="#c62828" mb={1}>How this works:</Typography>
                      <Typography variant="caption" color="text.secondary" display="block">1. Pay ₹578 now as confirmation fee.</Typography>
                      <Typography variant="caption" color="text.secondary" display="block">2. Remaining ₹{(totalPrice - 578).toLocaleString()} at delivery.</Typography>
                   </Box>
                </PaymentItem>
              </Box>
            </Stack>
          </Grid>

          {/* Right Summary Sidebar */}
          <Grid item xs={12} md={5}>
            <Box sx={{ position: "sticky", top: 100 }}>
              <Paper sx={{ p: 4, borderRadius: 5, border: "1px solid #e0e0e0", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
                <Typography variant="subtitle1" fontWeight="900" mb={3}>Payment Details</Typography>
                
                <Stack spacing={2}>
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="body2" color="text.secondary" fontWeight="600">Items Total</Typography>
                    <Typography variant="body2" fontWeight="800">₹{subtotal.toLocaleString()}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="body2" color="text.secondary" fontWeight="600">Delivery Fee</Typography>
                    <Typography variant="body2" color="#00b259" fontWeight="900">{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="body2" color="text.secondary" fontWeight="600">Handling Charges</Typography>
                    <Typography variant="body2" fontWeight="800">₹{handlingFee}</Typography>
                  </Box>
                  {discount > 0 && (
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="body2" color="#D32F2F" fontWeight="600">Coupon Savings</Typography>
                      <Typography variant="body2" color="#D32F2F" fontWeight="900">-₹{discount.toLocaleString()}</Typography>
                    </Box>
                  )}
                  
                  <Divider sx={{ my: 1, borderStyle: 'dashed' }} />

                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="h6" fontWeight="900">Amount to Pay</Typography>
                    <Typography variant="h6" fontWeight="1000">₹{totalPrice.toLocaleString()}</Typography>
                  </Box>
                </Stack>

                <Box sx={{ mt: 3, p: 2, bgcolor: "#f0faf5", borderRadius: 3, textAlign: "center", border: "1px solid #d0f0e0" }}>
                   <Typography variant="caption" fontWeight="900" color="#00b259">
                     🎉 Hooray! You're saving ₹{(discount + 120).toLocaleString()} with this order!
                   </Typography>
                </Box>

                <Button
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  onClick={handlePayment}
                  sx={{
                    mt: 3,
                    py: 2.2,
                    borderRadius: 4,
                    bgcolor: "#00b259",
                    "&:hover": { bgcolor: "#00964b" },
                    fontWeight: "900",
                    fontSize: "1.05rem",
                    textTransform: "none",
                    boxShadow: "0 8px 30px rgba(0, 178, 89, 0.3)"
                  }}
                >
                  {loading ? "Confirming..." : paymentMethod === "partial_cod" ? "Pay ₹578 to Secure Order" : `Pay ₹${totalPrice.toLocaleString()}`}
                </Button>

                <Stack direction="row" spacing={1} justifyContent="center" alignItems="center" sx={{ mt: 3, opacity: 0.6 }}>
                   <SecurityIcon sx={{ fontSize: 14 }} />
                   <Typography variant="caption" fontWeight="800">100% SECURE & ENCRYPTED</Typography>
                </Stack>
              </Paper>

                <Paper 
                  onClick={() => setIsCouponDrawerOpen(true)}
                  sx={{ mt: 2, p: 2.5, borderRadius: 5, border: appliedCoupon ? "1px solid #00b259" : "1px dashed #00b259", cursor: "pointer", bgcolor: appliedCoupon ? "#f1fdf5" : "#fff", transition: '0.2s', '&:hover': { bgcolor: '#f0faf5' } }}
                >
                  <Stack direction="row" spacing={2} alignItems="center">
                     <Avatar sx={{ bgcolor: appliedCoupon ? "#00b259" : "rgba(0, 178, 89, 0.1)", color: appliedCoupon ? "white" : "#00b259", width: 44, height: 44 }}>
                        <LocalActivityIcon />
                     </Avatar>
                     <Box sx={{ flex: 1 }}>
                       <Typography variant="subtitle2" fontWeight="900">{appliedCoupon ? `Applied: ${appliedCoupon.code}` : "Apply Offers"}</Typography>
                       <Typography variant="caption" color="text.secondary" fontWeight="600">
                         {appliedCoupon ? `You saved ₹${appliedCoupon.amount}!` : "Check for bank offers & coupons"}
                       </Typography>
                     </Box>
                     {appliedCoupon ? (
                        <Button size="small" onClick={(e) => { e.stopPropagation(); removeCoupon(); }} sx={{ color: '#ff4d4d', fontWeight: 'bold' }}>Remove</Button>
                     ) : (
                        <ArrowBackIcon sx={{ transform: 'rotate(180deg)', color: "#00b259", fontSize: 20 }} />
                     )}
                  </Stack>
                </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
      
      {/* Footer Trust Signals */}
      <Container sx={{ mt: 6, pb: 4 }}>
         <Grid container spacing={4} justifyContent="center" sx={{ opacity: 0.6 }}>
            {[
              { title: "Genuine Products", icon: <CheckCircleIcon sx={{ fontSize: 18 }} /> },
              { title: "Safe Checkout", icon: <SecurityIcon sx={{ fontSize: 18 }} /> },
              { title: "Free Returns", icon: <LocalShippingIcon sx={{ fontSize: 18 }} /> }
            ].map((item, i) => (
              <Grid item key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                 {item.icon}
                 <Typography variant="caption" fontWeight="900">{item.title}</Typography>
              </Grid>
            ))}
         </Grid>
      </Container>

      {/* Floating Address Drawer */}
      <Drawer
        anchor="right"
        open={isAddressDrawerOpen}
        onClose={() => setIsAddressDrawerOpen(false)}
        PaperProps={{ sx: { width: { xs: '100%', sm: 450 }, p: 4 } }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h5" fontWeight="900">Edit Address</Typography>
          <IconButton onClick={() => setIsAddressDrawerOpen(false)}><CloseIcon /></IconButton>
        </Stack>

        <Stack spacing={3}>
           <TextField fullWidth label="Full Name" name="name" value={address.name} onChange={handleAddressChange} />
           <TextField fullWidth label="Phone Number" name="phone" value={address.phone} onChange={handleAddressChange} />
           <TextField fullWidth multiline rows={3} label="House No / Area / Landmark" name="address" value={address.address} onChange={handleAddressChange} />
           <Grid container spacing={2}>
              <Grid item xs={6}>
                 <TextField fullWidth label="City" name="city" value={address.city} onChange={handleAddressChange} />
              </Grid>
              <Grid item xs={6}>
                 <TextField fullWidth label="Pincode" name="pincode" value={address.pincode} onChange={handleAddressChange} />
              </Grid>
           </Grid>
           <Button 
            fullWidth variant="contained" size="large" 
            onClick={() => setIsAddressDrawerOpen(false)}
            sx={{ bgcolor: "#00b259", "&:hover": { bgcolor: "#00964b" }, borderRadius: 4, py: 2, fontWeight: "900", mt: 4 }}
           >
             Save Address
           </Button>
        </Stack>
      </Drawer>

      {/* Floating Coupon Drawer */}
      <Drawer
        anchor="right"
        open={isCouponDrawerOpen}
        onClose={() => setIsCouponDrawerOpen(false)}
        PaperProps={{ sx: { width: { xs: '100%', sm: 450 }, p: 4, bgcolor: "#F8F9FA" } }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h5" fontWeight="900">Apply Coupon</Typography>
          <IconButton onClick={() => setIsCouponDrawerOpen(false)}><CloseIcon /></IconButton>
        </Stack>

        <Paper sx={{ p: 2, borderRadius: 3, mb: 4, display: 'flex', gap: 1 }}>
           <TextField 
            fullWidth size="small" placeholder="Enter coupon code" 
            value={couponCode} onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
           />
           <Button 
            variant="contained" 
            onClick={() => setIsCouponDrawerOpen(false)}
            sx={{ bgcolor: "#00b259", borderRadius: 3, px: 3, textTransform: "none", fontWeight: "bold" }}
           >
             Apply
           </Button>
        </Paper>

        <Typography variant="subtitle2" fontWeight="900" mb={2}>Available Offers</Typography>
        <Stack spacing={2}>
           {[
             { code: "WELCOME10", desc: "Get 10% OFF on your first order", saving: "₹" + (subtotal * 0.1).toFixed(0) },
             { code: "VARALIFE50", desc: "Flat ₹50 OFF on orders above ₹500", saving: "₹50" }
           ].map((offer) => (
             <Paper 
              key={offer.code}
              onClick={() => handleApplyCoupon(offer.code)}
              sx={{ p: 2.5, borderRadius: 4, border: "1px dashed #00b259", cursor: 'pointer', transition: '0.2s', '&:hover': { transform: 'scale(1.02)', bgcolor: 'white' } }}
             >
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                   <Box>
                      <Typography variant="subtitle1" fontWeight="1000" color="#00b259">{offer.code}</Typography>
                      <Typography variant="caption" color="text.secondary">{offer.desc}</Typography>
                   </Box>
                   <Typography variant="subtitle2" fontWeight="900" color="#00b259">{offer.saving} Off</Typography>
                </Stack>
             </Paper>
           ))}
        </Stack>
      </Drawer>

      {/* Exit Dialog */}
      <Dialog 
        open={showExitDialog} 
        onClose={() => setShowExitDialog(false)}
        PaperProps={{ sx: { borderRadius: 6, p: 2, minWidth: 320 } }}
      >
        <DialogTitle sx={{ textAlign: "center", pt: 3 }}>
          <Avatar sx={{ bgcolor: "#FFF4E5", color: "#FFA117", mx: "auto", mb: 2, width: 64, height: 64 }}>
            <WarningAmberIcon sx={{ fontSize: 36 }} />
          </Avatar>
          <Typography variant="h5" fontWeight="1000">Exit Checkout?</Typography>
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center" }}>
          <Typography variant="body1" color="text.secondary" sx={{ px: 2, fontWeight: 500 }}>
            Your item will be waiting in the cart, but you might lose your delivery slot.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ flexDirection: "column", gap: 1, p: 4 }}>
          <Button 
            fullWidth variant="contained" onClick={() => setShowExitDialog(false)}
            sx={{ bgcolor: "#00b259", "&:hover": { bgcolor: "#00964b" }, borderRadius: 4, py: 1.5, fontWeight: "900", textTransform: "none" }}
          >
            Stay
          </Button>
          <Button 
            fullWidth variant="text" onClick={handleExitAnyway}
            sx={{ color: "#999", fontWeight: "700", textTransform: "none" }}
          >
            Exit anyway
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

// Support Components
function BadgeSmall({ icon, text }) {
  return (
    <Stack direction="row" alignItems="center" spacing={0.5} sx={{ bgcolor: "#f5f5f5", px: 1.5, py: 0.5, borderRadius: 2 }}>
       <Box sx={{ color: "#666" }}>{icon}</Box>
       <Typography variant="caption" fontWeight="800" color="#666">{text}</Typography>
    </Stack>
  );
}

function UpiLogo({ src, name }) {
  return (
    <Stack 
      alignItems="center" 
      spacing={0.5} 
      sx={{ 
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        '&:hover': { transform: 'translateY(-4px)' },
        '&:hover .MuiAvatar-root': { 
          borderColor: '#00b259',
          boxShadow: '0 4px 12px rgba(0, 178, 89, 0.15)'
        }
      }}
    >
      <Avatar 
        variant="rounded" 
        src={src} 
        imgProps={{ style: { objectFit: 'contain', padding: '8px' } }}
        sx={{ 
          width: 48, 
          height: 48, 
          bgcolor: "white", 
          border: "1px solid #eee", 
          p: 0, 
          fontSize: '12px', 
          fontWeight: 'bold', 
          color: '#666',
          transition: 'all 0.2s ease-in-out'
        }}
      >
        {name.charAt(0)}
      </Avatar>
      <Typography variant="caption" fontWeight="800" color="text.secondary" sx={{ fontSize: '10px' }}>{name}</Typography>
    </Stack>
  );
}

function VisualCard({ details }) {
  return (
    <Box 
      sx={{ 
        width: "100%", maxWidth: 350, height: 200, mx: "auto",
        background: "linear-gradient(135deg, #1e1e24 0%, #44414d 100%)",
        borderRadius: 5, p: 3, position: "relative", color: "white",
        boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
        display: "flex", flexDirection: "column", justifyContent: "space-between"
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="start">
        <Typography variant="subtitle1" fontWeight="1000" sx={{ letterSpacing: 2 }}>VISA</Typography>
        <Box sx={{ width: 45, height: 35, bgcolor: "#f1c40f", borderRadius: 1.5, opacity: 0.8 }} />
      </Stack>
      <Box>
        <Typography variant="h6" sx={{ letterSpacing: 4, mb: 1.5, fontWeight: 700 }}>
          {details.number || "•••• •••• •••• ••••"}
        </Typography>
        <Stack direction="row" justifyContent="space-between" alignItems="end">
           <Box>
              <Typography variant="caption" sx={{ opacity: 0.6, fontSize: '9px', display: 'block' }}>CARD HOLDER</Typography>
              <Typography variant="subtitle2" fontWeight="800" sx={{ letterSpacing: 1 }}>{details.name || "YOUR NAME"}</Typography>
           </Box>
           <Box sx={{ textAlign: 'right' }}>
              <Typography variant="caption" sx={{ opacity: 0.6, fontSize: '9px', display: 'block' }}>EXPIRES</Typography>
              <Typography variant="subtitle2" fontWeight="800">{details.expiry || "MM/YY"}</Typography>
           </Box>
        </Stack>
      </Box>
    </Box>
  );
}

