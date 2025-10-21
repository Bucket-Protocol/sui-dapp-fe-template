import { useState } from 'react';
import { useCurrentAccount, useSignAndExecuteTransaction, useSuiClient } from '@mysten/dapp-kit';
import { SuiTransactionBlockResponse } from '@mysten/sui/client';
import { Transaction } from '@mysten/sui/transactions';

import { ERROR_MESSAGE } from '@/consts/errors';
import { NETWORK } from '@/consts/network';

export type UseMutationOptions = {
  waitForTransaction?: boolean;
  disabled?: boolean;
};

export type UseMutationParams<T> = {
  mutationKey: string;
  getTransaction: (variables: T) => Transaction | Promise<Transaction>;
  isSponsored?: boolean | ((variables: T) => boolean);
  errorMessagePrefix?: string;
  errorMessageOverride?: string;
} & UseMutationOptions;

const useMutation = <T>({
  getTransaction,
  waitForTransaction = true,
  disabled = false,
  errorMessagePrefix = ERROR_MESSAGE.ACTION_FAILED_WITH_ERROR.DEFAULT,
  errorMessageOverride,
}: {
  getTransaction: (variables: T) => Transaction | Promise<Transaction>;
  waitForTransaction?: boolean;
  disabled?: boolean;
  errorMessagePrefix?: string;
  errorMessageOverride?: string;
}) => {
  const account = useCurrentAccount();
  const client = useSuiClient();

  const { mutateAsync: signAndExecuteTransaction } = useSignAndExecuteTransaction({
    execute: async ({ bytes, signature }) => {
      const response = await client.executeTransactionBlock({
        transactionBlock: bytes,
        signature: signature,
        options: {
          showRawEffects: true,
        },
      });
      if (waitForTransaction) {
        await client.waitForTransaction({ digest: response.digest });
      }
      return response;
    },
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const execute = async ({
    variables,
    onSuccess,
    onFailure,
  }: {
    variables: T;
    onSuccess: (response: SuiTransactionBlockResponse) => void;
    onFailure: (e: Error) => void;
  }) => {
    if (disabled || isLoading) {
      return;
    }
    if (!account) {
      onFailure?.(new Error(ERROR_MESSAGE.WALLET_NOT_CONNECTED));
      return;
    }
    setIsLoading(true);

    try {
      const tx = await getTransaction(variables);

      tx.setSender(account.address);

      const response = await signAndExecuteTransaction({
        transaction: tx,
        chain: `sui:${NETWORK}`,
      });
      if (response.effects?.status.error) {
        onFailure?.(new Error(errorMessagePrefix + (errorMessageOverride ?? response.effects?.status.error)));
      } else {
        onSuccess?.(response);
      }
    } catch (e) {
      if (e instanceof Error) {
        if (
          !e.message.includes('User rejection') &&
          !e.message.includes('User rejected') &&
          !e.message.includes('Rejected from user') &&
          !e.message.includes('User rejected the request')
        ) {
          onFailure?.(new Error(errorMessagePrefix + (errorMessageOverride ?? e.message)));
        }
      }
    } finally {
      setIsLoading(false);
    }
  };
  return {
    isLoading,
    execute,
  };
};

export default useMutation;
