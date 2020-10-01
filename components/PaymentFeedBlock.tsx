import React, { useState, useEffect, useRef } from 'react';
import { Card, Box, Label, Flex, IconButton, Input, Text } from 'theme-ui';
import fetchJson from '../lib/fetchJson';
import NumberFormat from 'react-number-format';

export default (props) => {
  const [payments, setPayments] = useState<Array<object>>([]);

  const fetchPayments = async () => {
    try {
      const response = await fetchJson('/api/list_payments', {
        method: 'GET',
      });
      setPayments(response.payments);
    } catch (e) {
      // TODO: handle errors (in this entire function)
      console.error(e);
      return;
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <Card sx={{ py: 4 }}>
      {payments.length > 0 && (
        <>
          {payments.map((p: any) => {
            // debugger;
            console.dir(p);
            return (
              <Flex sx={{ justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <Text variant="paymentMessage">{p.message}</Text>
                <Card variant="moneyCard">$5</Card>
              </Flex>
            );
          })}
        </>
      )}
    </Card>
  );
};