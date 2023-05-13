import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const { push } = useRouter();
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          <code className="font-mono font-bold">Stripe検証中</code>
        </p>
        <button
          onClick={async () => {
            const response = await fetch('/api/checkout', {
              method: 'post',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                customer_id: process.env.NEXT_PUBLIC_USER_ID!, // ここに顧客IDを値に設定しましょう
                price_id: process.env.NEXT_PUBLIC_PRODUCT_ID!, // ここに商品IDを値に設定しましょう
              }),
            }).then((data) => data.json());
            push(response.checkout_url);
          }}
        >
          商品購入ボタン
        </button>
      </div>
    </main>
  );
}
