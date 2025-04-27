import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Skeleton, 
  Grid, 
  Box, 
  Divider,
  LinearProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { PendingActions, Payments as PaymentsIcon, HourglassEmpty } from '@mui/icons-material';

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '16px',
  boxShadow: '0 8px 32px rgba(0,0,0,0.05)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 40px rgba(0,0,0,0.1)'
  }
}));

const StatusBadge = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  padding: '4px 12px',
  borderRadius: '20px',
  backgroundColor: theme.palette.warning.light,
  color: theme.palette.warning.dark,
  fontSize: '0.75rem',
  fontWeight: 600
}));

const PaymentSkeleton = () => (
  <Grid container spacing={2} sx={{ mb: 2 }}>
    <Grid item xs={12} sm={6}>
      <Skeleton variant="rectangular" width="100%" height={80} sx={{ borderRadius: 2 }} />
    </Grid>
    <Grid item xs={12} sm={6}>
      <Skeleton variant="rectangular" width="100%" height={80} sx={{ borderRadius: 2 }} />
    </Grid>
  </Grid>
);

export const Payments = () => {
  const [loading, setLoading] = React.useState(true);
  const [payments, setPayments] = React.useState([]);

  // Simulate data loading
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setPayments([
        {
          id: 1,
          amount: 1250.75,
          currency: 'USD',
          description: 'Sumanapala BOC',
          date: '2023-06-15',
          client: 'Acme Corp'
        },
        {
          id: 2,
          amount: 875.50,
          currency: 'EUR',
          description: 'Karunarathna Commercial',
          date: '2023-06-18',
          client: 'Global Solutions'
        }
      ]);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        mb: 3,
        gap: 2
      }}>
        <PaymentsIcon color="primary" sx={{ fontSize: 32 }} />
        <Typography variant="h5" component="h2" fontWeight="600">
          Pending Payments
        </Typography>
        <StatusBadge sx={{ ml: 'auto' }}>
          <HourglassEmpty sx={{ fontSize: 16, mr: 1 }} />
          Awaiting Approval
        </StatusBadge>
      </Box>

      {loading ? (
        <>
          <PaymentSkeleton />
          <PaymentSkeleton />
        </>
      ) : payments.length === 0 ? (
        <Box sx={{ 
          textAlign: 'center', 
          py: 8,
          borderRadius: 2,
          backgroundColor: 'action.hover'
        }}>
          <PendingActions sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            No pending payments
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            All payments have been processed
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {payments.map((payment) => (
            <Grid item xs={12} md={6} key={payment.id}>
              <StyledCard>
                <CardContent>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    mb: 1
                  }}>
                    <Typography variant="body2" color="text.secondary">
                      {payment.date}
                    </Typography>
                    <Typography variant="body2" fontWeight="600" color="primary">
                      {payment.currency} {payment.amount.toLocaleString()}
                    </Typography>
                  </Box>
                  
                  <Typography variant="h6" component="h3" sx={{ mb: 1 }}>
                    {payment.description}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Client: {payment.client}
                  </Typography>
                  
                  <Divider sx={{ my: 1 }} />
                  
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mt: 2
                  }}>
                    <StatusBadge>
                      <HourglassEmpty sx={{ fontSize: 16, mr: 1 }} />
                      Processing
                    </StatusBadge>
                    
                    <Box sx={{ width: '60%' }}>
                      <LinearProgress 
                        variant="determinate" 
                        value={65} 
                        color="warning"
                        sx={{ height: 6, borderRadius: 3 }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        Estimated completion: 2-3 business days
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};