import { GetStaticProps, GetStaticPaths } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';

// import components & types
import { IPOST } from '../../types/post';

type Props = {
    source: MDXRemoteSerializeResult;
    fontMatter: Omit<IPOST, 'slug'>;
};