import { Button } from "@/components/ui/button";
import { Link, useSearchParams } from "react-router";


const Fail = () => {
    const [searchParams] = useSearchParams();

    const transactionId = searchParams.get("transactionId");
    const message = searchParams.get("message");
    const amount = searchParams.get("amount");
    const status = searchParams.get("status");


    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
            <h1 className="text-2xl font-bold text-green-600 mb-4">
                ❌ Payment Failed
            </h1>
            <div className="bg-accent shadow-md rounded-lg p-4 max-w-sm mx-auto space-y-2">
                <p>
                    <strong>Transaction ID:</strong> {transactionId}
                </p>
                <p>
                    <strong>Message:</strong> {message}
                </p>
                <p>
                    <strong>Amount:</strong> {amount} ৳
                </p>
                <p>
                    <strong>Status:</strong>{" "}
                    <span
                        className={`font-semibold ${status === "success" ? "text-green-500" : "text-red-500"
                            }`}
                    >
                        {status}
                    </span>
                </p>
            </div>
            <Button variant={"outline"} asChild className="mt-5 hover:text-green-600">
                <Link to={'/'}>Back to Home</Link>
            </Button>
        </div>
    );
};

export default Fail;