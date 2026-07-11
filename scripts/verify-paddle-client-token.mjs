const isProductionDeployment = process.env.VERCEL_ENV === 'production';
const clientToken = process.env.VITE_PADDLE_CLIENT_TOKEN?.trim();

if (isProductionDeployment && !clientToken) {
  console.error('Production deployment requires VITE_PADDLE_CLIENT_TOKEN for /pay checkout.');
  process.exit(1);
}
