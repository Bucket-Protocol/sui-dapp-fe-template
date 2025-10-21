import { Dispatch, JSXElementConstructor, ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import { LuExternalLink, LuSearch, LuX } from 'react-icons/lu';

import { Coin } from '@/types';
import { TOKEN_INFO } from '@/consts/tokens';
import useGetBalances from '@/hooks/queries/general/useGetBalances';
import useSortAndFilterTokens from '@/hooks/useSortAndFilterTokens';
import { formatLongString, formatTokenAmount } from '@/libs/format';
import { cn, isReactNode } from '@/libs/utils';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/Dialog';
import ScrollbarContainer from '@/components/ui/ScrollbarContainer';
import TokenImage from '@/components/shared/TokenImage';

const SelectTokenModal = <T extends Coin>({
  isModalOpen,
  setModalOpen,
  title = 'Select a Token',
  tokens,
  promotedTokens = [],
  setToken,
  showSearchbar = true,
  highlightNew = false,
  tokenInfoColumnComponent,
  sortFn,
}: {
  isModalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  title?: string;
  tokens: readonly T[];
  promotedTokens?: readonly T[];
  setToken?: Dispatch<T>;
  showSearchbar?: boolean;
  highlightNew?: boolean;
  tokenInfoColumnComponent?: ReactNode | JSXElementConstructor<{ token: T }>;
  sortFn?: ((a: T, b: T) => number) | null;
}) => {
  const { data: balances } = useGetBalances();

  const [input, setInput] = useState('');

  const filteredTokenList = useSortAndFilterTokens({ tokens, promotedTokens, input, highlightNew, sortFn });

  const TokenInfoColumnComponent: JSXElementConstructor<{ token: T }> = isReactNode(tokenInfoColumnComponent)
    ? () => tokenInfoColumnComponent as ReactNode
    : (tokenInfoColumnComponent as JSXElementConstructor<{ token: T }>);

  useEffect(() => setInput(''), [isModalOpen]);

  const handleSelectToken = (token: T) => {
    setToken?.(token);
    setModalOpen(false);
  };
  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={setModalOpen}
    >
      <DialogContent
        className={cn(
          'relative block w-full max-w-[480px] p-4 pt-6',
          showSearchbar ? 'h-[474px] md:h-[586px]' : 'h-auto',
        )}
        withClose={false}
      >
        <div className={cn('flex h-full flex-col gap-4', !showSearchbar && 'max-h-[364px] md:max-h-[478px]')}>
          <div className="flex shrink-0 items-center justify-between gap-3">
            <DialogTitle className="text-lg">{title}</DialogTitle>
            <button
              type="button"
              className="-my-[100%] flex h-8 w-8 items-center justify-center rounded-full bg-white/10 duration-400 hover:bg-white/20"
              onClick={() => setModalOpen(false)}
            >
              <LuX size={20} />
            </button>
          </div>
          {showSearchbar && (
            <div className="flex h-12.5 shrink-0 items-center gap-2 rounded-lg bg-white/5 px-4">
              <LuSearch className="h-auto w-5 text-white/50" />
              <input
                className="grow bg-transparent !leading-5 placeholder:text-white/50"
                placeholder="Search by token name"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
          )}
          {!filteredTokenList.length ? (
            <div className="my-auto text-center text-sm text-white/50">No tokens found</div>
          ) : (
            <ScrollbarContainer className="-mb-4 -mr-3 grow overflow-y-auto pb-3 pr-3 [&_.os-scrollbar-vertical]:pb-6">
              {filteredTokenList.map((token) => (
                <button
                  key={token}
                  type="button"
                  className="flex w-full gap-2 rounded-lg px-2 py-2.5 text-left duration-400 hover:bg-white/8"
                  onClick={() => handleSelectToken(token)}
                >
                  <TokenImage
                    className="self-center"
                    token={token}
                    size={32}
                  />
                  <div className="flex grow flex-col items-start">
                    <div className="flex items-center gap-1">
                      <div className="line-clamp-1 overflow-hidden !leading-[18px]">{TOKEN_INFO[token].symbol}</div>
                      {highlightNew && TOKEN_INFO[token].isNew && (
                        <div
                          className="flex h-[18px] items-center justify-center rounded-[18px] px-2 text-sm font-medium"
                          style={{
                            backgroundImage:
                              'radial-gradient(100.51% 132.71% at 46.96% 34.38%, rgb(242, 188, 49, 0.7) 0%, rgb(110, 78, 16, 0.7) 100%)',
                          }}
                        >
                          New
                        </div>
                      )}
                    </div>
                    <div className="line-clamp-1 overflow-hidden text-sm !leading-[18px] text-white/50">
                      {TOKEN_INFO[token].name}
                    </div>
                  </div>
                  {tokenInfoColumnComponent === undefined ? (
                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-1.5 text-sm !leading-[18px] text-white/50 duration-400 hover:text-white/80">
                        {formatLongString(TOKEN_INFO[token].coinType)}
                        <Link
                          href={`https://suivision.xyz/coin/${TOKEN_INFO[token].coinType}`}
                          target="_blank"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <LuExternalLink className="h-auto w-3" />
                        </Link>
                      </div>
                      {!!balances[token] && (
                        <div className="text-sm tabular-nums !leading-[18px]">{formatTokenAmount(balances[token])}</div>
                      )}
                    </div>
                  ) : (
                    <TokenInfoColumnComponent token={token} />
                  )}
                </button>
              ))}
            </ScrollbarContainer>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SelectTokenModal;
