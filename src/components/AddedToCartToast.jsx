// import React from 'react';
// import { Box, Typography, Stack } from '@mui/material';
// import { motion } from 'framer-motion';

// const AddedToCartToast = ({ image, message = "Added to bag" }) => {
//   return (
//     <Box
//       component={motion.div}
//       initial={{ opacity: 0, x: 20, y: 10, scale: 0.9 }}
//       animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
//       exit={{ opacity: 0, x: 20, scale: 0.9 }}
//       transition={{ duration: 0.3, ease: "easeOut" }}
//       sx={{
//         display: 'flex',
//         alignItems: 'center',
//         bgcolor: '#1c222e', // Deep dark navy
//         color: 'white',
//         p: 1,
//         pl: 1,
//         borderRadius: '4px',
//         boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
//         gap: 1.5,
//         minWidth: '220px',
//         border: '1px solid rgba(255,255,255,0.05)'
//       }}
//     >
//       <Box 
//         component="img" 
//         src={image} 
//         alt="product"
//         sx={{ 
//           width: 48, 
//           height: 48, 
//           borderRadius: '2px', 
//           objectFit: 'cover'
//         }} 
//       />
//       <Typography 
//         variant="body2" 
//         fontWeight="600"
//         sx={{ 
//           fontSize: '14px', 
//           lineHeight: 1.2,
//           letterSpacing: '0.2px'
//         }}
//       >
//         {message}
//       </Typography>
//     </Box>
//   );
// };

// export default AddedToCartToast;




import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const AddedToCartToast = ({ image, message = "Added to bag" }) => {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, x: 20, y: 10, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 20, scale: 0.9 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      sx={{
        display: 'flex',
        alignItems: 'center',
        bgcolor: '#1c222e',
        color: 'white',
        p: 1,
        pl: 1,
        borderRadius: '4px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
        gap: 1.5,
        minWidth: '220px',
        border: '1px solid rgba(255,255,255,0.05)'
      }}
    >
      <Box 
        component="img" 
        src={image} 
        alt="product"
        sx={{ 
          width: 48, 
          height: 48, 
          borderRadius: '2px', 
          objectFit: 'cover'
        }} 
      />
      <Typography 
        variant="body2" 
        fontWeight="600"
        sx={{ 
          fontSize: '14px',
          lineHeight: 1.2,
          letterSpacing: '0.2px'
        }}
      >
        {message}
      </Typography>
    </Box>
  );
};

export default AddedToCartToast;