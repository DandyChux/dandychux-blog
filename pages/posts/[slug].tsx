import { GetStaticProps, GetStaticPaths } from 'next';
import { useEffect } from 'react';
import fs from 'fs';
import matter from 'gray-matter';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import path from 'path';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';

import { getPost, getAllPosts } from '../../utils/mdxUtils';
import { ParsedUrlQuery } from 'querystring';
import { useMdxComponentsContext } from '../../context/mdxContext';
// import components & types
import { IPOST } from '../../types/post';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Thumbnail from '../../components/Thumbnail';
import Prerequisites from '../../components/Prerequisites';
import Stacks from '../../components/Stacks';

type Props = {
    source: MDXRemoteSerializeResult;
    frontMatter: Omit<IPOST, 'slug'>;
};

const components = {
    a: Link,
    Header,
    Footer,
    Thumbnail,
    Prerequisites,
    Stacks,
}

const PostPage: React.FC<Props> = ({ source, frontMatter }: Props) => {

    // get setters
    const { setPrerequisites, setStacks } = useMdxComponentsContext();

    useEffect(() => {
        // set the prerequisites
        setPrerequisites(frontMatter.prerequisites);
        // set stacks
        setStacks(frontMatter.stacks);
    }, [
        setPrerequisites,
        setStacks,
        frontMatter.prerequisites,
        frontMatter.stacks
    ]);

    return (
        <>
            <article className="post-content">
                <div>
                    <Thumbnail title={frontMatter.title} src={frontMatter.thumbnail} />
                </div>

                <h1>{frontMatter.title}</h1>

                <p>{frontMatter.description}</p>

                <MDXRemote components={components} {...source}  />
            </article>
        </>
    )
}

export default PostPage

interface Iparams extends ParsedUrlQuery {
    slug: string
}

export const getStaticProps: GetStaticProps = async (context) => {
    const { slug } = context.params as Iparams;
    // get the slug
    const { content, data } = getPost(slug);
    // serialize the data on the server side
    const mdxSource = await serialize(content, { scope: data });
    return {
        props: {
            source: mdxSource,
            frontMatter: data
        }
    }
}

export const getStaticPaths: GetStaticPaths = () => {
    // only get the slug from posts
    const posts = getAllPosts(['slug']);

    // map through to return post paths
    const paths = posts.map((post) => ({
        params: {
            slug: post.slug
        }
    }));

    return {
        paths, 
        fallback: false //* Generates 404 Error for all post paths that are not generated at bulid time
    }
}