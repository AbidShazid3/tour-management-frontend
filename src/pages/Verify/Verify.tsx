import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { Button } from "@/components/ui/button";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Dot } from "lucide-react";
import { useSendOtpMutation, useVerifyOtpMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";

const FormSchema = z.object({
    pin: z.string().min(6, {
        message: "Your one-time password must be 6 characters.",
    }),
})

const Verify = () => {
    const location = useLocation();
    const [email] = useState(location.state);
    const [confirm, setConfirm] = useState(false);
    const navigate = useNavigate();
    const [sendOtp] = useSendOtpMutation();
    const [verifyOtp] = useVerifyOtpMutation();
    const [timer, setTimer] = useState(120)

    useEffect(() => {
        if (!email) {
            navigate('/')
        }
    }, [email, navigate]);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            pin: "",
        },
    })

    const handleConfirm = async () => {
        const toastId = toast.loading('Sending OTP')
        setConfirm(true);
        // try {
        //     const res = await sendOtp({ email: email }).unwrap();
        //     if (res.success) {
        //         toast.success("OTP send", {id: toastId});
        //         setConfirm(true);
        //     }
        // } catch (error) {
        //     console.log(error);
        // }
    }

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        const toastId = toast.loading('Verifying OTP')
        const userInfo = {
            email,
            otp: data.pin
        }
        try {
            const res = await verifyOtp(userInfo).unwrap();
            if (res.success) {
                toast.success("OTP verified", { id: toastId });
                setConfirm(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const timerId = setInterval(() => {
            if (email && confirm) {
                setTimer((prev) => prev - 1)
            }
        }, 1000)
    }, [email, confirm]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            {
                confirm ?
                    (<Card className="w-full max-w-sm">
                        <CardHeader className="text-center">
                            <CardTitle className="text-xl">Verify your email address</CardTitle>
                            <CardDescription>
                                Please enter the 6-digit code we sent to <br /> <span className="text-primary">{email}</span>
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center justify-center">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-2">
                                    <FormField
                                        control={form.control}
                                        name="pin"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>One-Time otp code</FormLabel>
                                                <FormControl>
                                                    <InputOTP maxLength={6} {...field}>
                                                        <InputOTPGroup>
                                                            <InputOTPSlot index={0} />
                                                        </InputOTPGroup>
                                                        <InputOTPGroup>
                                                            <InputOTPSlot index={1} />
                                                        </InputOTPGroup>
                                                        <InputOTPGroup>
                                                            <InputOTPSlot index={2} />
                                                        </InputOTPGroup>
                                                        <Dot />
                                                        <InputOTPGroup>
                                                            <InputOTPSlot index={3} />
                                                        </InputOTPGroup>
                                                        <InputOTPGroup>
                                                            <InputOTPSlot index={4} />
                                                        </InputOTPGroup>
                                                        <InputOTPGroup>
                                                            <InputOTPSlot index={5} />
                                                        </InputOTPGroup>
                                                    </InputOTP>
                                                </FormControl>
                                                <FormDescription className="flex justify-end">
                                                    <Button variant='link'>Resend OTP</Button>
                                                    {timer}
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit" className="w-full cursor-pointer">Submit</Button>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>)
                    :
                    (<Card className="w-full max-w-sm">
                        <CardHeader className="text-center space-y-1">
                            <CardTitle className="text-xl">Verify your email address</CardTitle>
                            <CardDescription>
                                <p>We will send you an OTP at</p>
                                <p className="text-primary mt-1">{email}</p>
                            </CardDescription>
                            <CardFooter className="flex items-center justify-center">
                                <Button onClick={handleConfirm} className="cursor-pointer">Confirm</Button>
                            </CardFooter>
                        </CardHeader>
                    </Card>)
            }


        </div>
    );
};

export default Verify;