import { useParams } from 'react-router-dom';
import {
  Box,
  CircularProgress,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useInvoiceByPublicToken } from '../hooks/useInvoiceByPublicToken';

const InvoicePreviewPage = () => {
  const { publicToken } = useParams<{ publicToken: string }>();

  const { data: invoice, isLoading, isError, error } = useInvoiceByPublicToken(publicToken);

  return (
    <>
      {invoice && (
        <Box
          sx={{
            width: '100%',
            maxWidth: 1200,
            mx: 'auto',
            p: 6,
            bgcolor: '#f5f5f5',
            overflowX: 'hidden',
          }}
        >
          <Paper sx={{ p: 6, borderRadius: 2, boxShadow: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
              <Typography variant="h3">Invoice</Typography>
              <Typography variant="h6">{invoice.invoiceNumber}</Typography>
            </Box>

            <Divider sx={{ mb: 4 }} />

            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1">
                <strong>Client:</strong> {invoice.client.name}
              </Typography>
              <Typography variant="body2">
                <strong>Address:</strong>{' '}
                {invoice.client.address ? invoice.client.address : 'Not provided'}
              </Typography>
              <Typography variant="body2">
                <strong>Email:</strong>{' '}
                {invoice.client.email ? invoice.client.email : 'Not provided'}
              </Typography>
              <Typography variant="body2">
                <strong>Phone:</strong>{' '}
                {invoice.client.phone ? invoice.client.phone : 'Not provided'}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
              <Box>
                <Typography variant="body2">
                  <strong>Issue Date:</strong> {invoice.issueDate}
                </Typography>
                <Typography variant="body2">
                  <strong>Due Date:</strong> {invoice.dueDate}
                </Typography>
              </Box>
            </Box>

            <TableContainer component={Paper} sx={{ mb: 4 }}>
              <Table sx={{ minWidth: 750 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Description</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Unit Price</TableCell>
                    <TableCell align="right">Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {invoice.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.description}</TableCell>
                      <TableCell align="right">{item.quantity}</TableCell>
                      <TableCell align="right">{item.unitPrice.toFixed(2)}</TableCell>
                      <TableCell align="right">
                        {(item.quantity * item.unitPrice).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="body1">
                <strong>Net:</strong> {invoice.totalNet.toFixed(2)}
              </Typography>
              <Typography variant="body1">
                <strong>VAT:</strong> {invoice.totalVat.toFixed(2)}
              </Typography>
              <Typography variant="h5">
                <strong>Total:</strong> {invoice.totalGross.toFixed(2)}
              </Typography>
            </Box>
          </Paper>
        </Box>
      )}

      {isLoading && (
        <div className="flex flex-1 justify-center items-center">
          <CircularProgress />
        </div>
      )}

      {isError && (
        <div className="flex flex-1 justify-center items-center">
          <h2 className="font-bold">{error.message}</h2>
        </div>
      )}
    </>
  );
};

export default InvoicePreviewPage;
