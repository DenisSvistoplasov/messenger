import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import { auth } from '@/firebase';
import { useEffect } from 'react';
import { useAppSelector } from '@/hooks/reduxHooks';
import { selectAuth } from '@/store/authSlice';

const Home = () => {


  return (
    <div>Hello world</div>
  );
};

export default Home;