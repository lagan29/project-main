export function usePayments() {
  const loadRazorpay = () =>
    new Promise<boolean>((resolve) => {
      if ((window as any).Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const initiatePayment = async (amount: number) => {
    try {
      const loaded = await loadRazorpay();

      if (!loaded) {
        alert("Razorpay SDK failed to load.");
        return;
      }

      const res = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
      });

      const order = await res.json();

      if (!res.ok) {
        alert(order.error || "Failed to create payment order.");
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Femora",
        description: "Order Payment",
        order_id: order.id,
        handler: function (response: any) {
          console.log("Payment success:", response);
          alert("Payment successful");
        },
        theme: {
          color: "#1e1b4b",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      alert("Payment failed");
    }
  };

  return { initiatePayment };
}