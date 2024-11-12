'use client'
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import {
  Keypair,
  SystemProgram,
  Transaction,
} from '@solana/web3.js';
import {
  ExtensionType,
  TOKEN_2022_PROGRAM_ID,
  createInitializeMintInstruction,
  getMintLen,
  createInitializeMetadataPointerInstruction,
  TYPE_SIZE,
  LENGTH_SIZE,
  getAssociatedTokenAddressSync,
  createAssociatedTokenAccountInstruction,
  createMintToInstruction,
} from '@solana/spl-token';
import {
  createInitializeInstruction,
  pack,
  TokenMetadata,
} from '@solana/spl-token-metadata';

export default function CreateToken() {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [name, setName] = useState<string>('');
  const [symbol, setSymbol] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [decimal, setDecimal] = useState<number>(0);
  const [supply, setSupply] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createToken = async () => {
    setLoading(true);
    setError(null);

    try {
      const mintKeypair = Keypair.generate();
      const metadata: TokenMetadata = {
        mint: mintKeypair.publicKey,
        name,
        symbol,
        uri: imageUrl,
        additionalMetadata: [],
      };
      const mintLen = getMintLen([ExtensionType.MetadataPointer]);
      const metadataLen = TYPE_SIZE + LENGTH_SIZE + pack(metadata).length;

      const lamports = await connection.getMinimumBalanceForRentExemption(
        mintLen + metadataLen
      );

      if (!wallet.publicKey) {
        throw new Error('Wallet is not connected');
      }

      const transaction = new Transaction().add(
        SystemProgram.createAccount({
          fromPubkey: wallet.publicKey,
          newAccountPubkey: mintKeypair.publicKey,
          space: mintLen,
          lamports,
          programId: TOKEN_2022_PROGRAM_ID,
        }),
        createInitializeMetadataPointerInstruction(
          mintKeypair.publicKey,
          wallet.publicKey,
          mintKeypair.publicKey,
          TOKEN_2022_PROGRAM_ID
        ),
        createInitializeMintInstruction(
          mintKeypair.publicKey,
          decimal,
          wallet.publicKey,
          wallet.publicKey,
          TOKEN_2022_PROGRAM_ID
        ),
        createInitializeInstruction({
          programId: TOKEN_2022_PROGRAM_ID,
          mint: mintKeypair.publicKey,
          metadata: mintKeypair.publicKey,
          name: metadata.name,
          symbol: metadata.symbol,
          uri: metadata.uri,
          mintAuthority: wallet.publicKey,
          updateAuthority: wallet.publicKey,
        })
      );

      transaction.feePayer = wallet.publicKey;
      transaction.recentBlockhash = (await connection.getLatestBlockhash())
        .blockhash;
      transaction.partialSign(mintKeypair);

      const response1 = await wallet.sendTransaction(transaction, connection);
      console.log('response1- ', response1);

      const associatedToken = getAssociatedTokenAddressSync(
        mintKeypair.publicKey,
        wallet.publicKey,
        false,
        TOKEN_2022_PROGRAM_ID
      );

      const transaction2 = new Transaction().add(
        createAssociatedTokenAccountInstruction(
          wallet.publicKey,
          associatedToken,
          wallet.publicKey,
          mintKeypair.publicKey,
          TOKEN_2022_PROGRAM_ID
        )
      );

      const response2 = await wallet.sendTransaction(transaction2, connection);
      console.log('response2- ', response2);

      const transaction3 = new Transaction().add(
        createMintToInstruction(
          mintKeypair.publicKey,
          associatedToken,
          wallet.publicKey,
          supply,
          [],
          TOKEN_2022_PROGRAM_ID
        )
      );

      const response3 = await wallet.sendTransaction(transaction3, connection);
      console.log('response3- ', response3);
      setLoading(false);
      alert('Token minted successfully!');
    } catch (err) {
      setLoading(false);
      setError((err as Error).message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-blue-50 m-20 md:m-28 p-6 shadow rounded-xl"
    >
      <div className="flex flex-col items-center justify-center space-y-2">
        <h1 className="text-4xl font-bold">Solana Token Creator</h1>
        <p className="font-semibold text-lg text-gray-400">
          Create your own Solana SPL token in just a few clicks without any coding
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
        <div className="space-y-2">
          <Label htmlFor="tokenName" className="p-1">
            Name:
          </Label>
          <Input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name of your token"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tokenSymbol" className="p-1">
            Symbol:
          </Label>
          <Input
            onChange={(e) => setSymbol(e.target.value)}
            type="text"
            placeholder="Symbol of your token"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="supply" className="p-1">
            Supply:
          </Label>
          <Input
            onChange={(e) => setSupply(parseInt(e.target.value))}
            type="number"
            placeholder="Total supply"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="decimals" className="p-1">
            Decimals:
          </Label>
          <Input
            onChange={(e) => setDecimal(parseInt(e.target.value))}
            type="number"
            placeholder="Number of decimals"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ImageUrl" className="p-1">
            ImageUrl:
          </Label>
          <Input
            onChange={(e) => setImageUrl(e.target.value)}
            type="text"
            placeholder="Your token image URL"
          />
        </div>
      </div>
      <div className="flex justify-center">
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="bg-red-500 text-white p-4 rounded-lg mb-4"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>
        <Button
          onClick={createToken}
          disabled={!wallet.publicKey || loading}
          className={`p-6 bg-blue-500 ${
            wallet.publicKey && !loading
              ? 'hover:bg-blue-400'
              : 'hover:bg-gray-300 cursor-not-allowed'
          }`}
        >
          {wallet.publicKey ? (
            loading ? (
              <div>Creating Token...</div>
            ) : (
              <div>Create Token</div>
            )
          ) : (
            <div>Connect Wallet</div>
          )}
        </Button>
      </div>
    </motion.div>
  );
}