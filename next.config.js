/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

import path from 'path';

module.exports = {
  nextConfig,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}
