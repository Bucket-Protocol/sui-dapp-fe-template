import { useState } from 'react';
import { useCurrentAccount, useCurrentClient, useDAppKit } from '@mysten/dapp-kit-react';
import type { SuiClientTypes } from '@mysten/sui/client';
import { Transaction } from '@mysten/sui/transactions';

import { ERROR_MESSAGE } from '@/consts/errors';

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

type TransactionResult = SuiClientTypes.TransactionResult<{
  effects: true;
  transaction: true;
  bcs: true;
}>;

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
  const dAppKit = useDAppKit();
  const account = useCurrentAccount();
  const client = useCurrentClient();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const execute = async ({
    variables,
    onSuccess,
    onFailure,
  }: {
    variables: T;
    onSuccess: (response: TransactionResult) => void;
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

      const result = await dAppKit.signAndExecuteTransaction({ transaction: tx });

      if (result.$kind === 'FailedTransaction') {
        onFailure?.(new Error(errorMessagePrefix + (errorMessageOverride ?? 'Transaction failed')));
      } else if (!result.Transaction.status.success) {
        onFailure?.(
          new Error(
            errorMessagePrefix +
              (errorMessageOverride ?? result.Transaction.status.error?.message ?? 'Transaction failed'),
          ),
        );
      } else {
        if (waitForTransaction) {
          await client.waitForTransaction({ digest: result.Transaction.digest });
        }
        onSuccess?.(result);
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
