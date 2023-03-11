import { Heading, Box, Flex } from "@chakra-ui/react";
import "@natscale/react-calendar/dist/main.css";
import { AnimatePresence } from "framer-motion";
import { useState, useCallback, useEffect } from "react";
import { Logo } from "../Logo";
import StepOne, { TimeSlot } from "./Booking/StepOne";
import { ClassOptions, ClassOptionType, StepTwo } from "./Booking/StepTwo";
import "react-phone-input-2/lib/style.css";
import { useForm } from "react-hook-form";
import BImage from "../../images/rose.jpg";
import StepThree from "./Booking/StepThree";
import { supabase } from "../../supabaseClient";
import { AdminIntroEmail, welcomeEmail } from "../emails";
import BookingConfirmation from "./Booking/BookingConfirmation";

const Booking = () => {
    const { register, handleSubmit } = useForm<any>();
    const [date, setDate] = useState<Date>();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedDateSlots, setSelectedDateSlots] = useState<
        TimeSlot[] | undefined
    >();
    const [selectedSlot, setSelectedSlot] = useState<TimeSlot | undefined>();
    const [selectedClass, setSelectedClass] = useState<ClassOptionType>();
    const [phoneNumber, setPhoneNumber] = useState<string>();
    const [currentStep, setCurrentStep] = useState(0);

    const onSubmit = handleSubmit(async (formData: any) => {
        setIsLoading(true);
        console.log({
            date: date?.toDateString(),
            selectedSlot,
            selectedClass: selectedClass?.value,
            formData,
            phoneNumber,
        });

        // Process  after Data is received on the BE
        // 1. Send email to user with booking details & payment link
        // 2. Send email to admin with booking details
        // 3. Redirect user to confirmation page which asks them to check their email

        const StripePaymentLink = (classType: ClassOptions) => {
            if (classType === ClassOptions.Choreographed) {
                return "https://buy.stripe.com/test_3cseYQ7DcePldCU5kl";
            } else if (classType === ClassOptions.Partner) {
                return "https://buy.stripe.com/test_28o1805v4cHddCU28a";
            } else {
                return "";
            }
        };

        const PaymentMessage = (classType: ClassOptions) => {
            if (classType === ClassOptions.Choreographed) {
                return "$450";
            } else if (classType === ClassOptions.Partner) {
                return "$350";
            } else {
                return "";
            }
        };

        const ToClientIntroEmail = {
            sender: "booking@fdva.com",
            recipient: formData.email,
            subject: `Confirm your ${selectedClass?.label} booking! 💃 `,
            html_body: welcomeEmail(
                formData.name,
                (selectedClass && PaymentMessage(selectedClass.value)) || "",
                (selectedClass && StripePaymentLink(selectedClass.value)) || ""
            ),
        };

        const { error } = await supabase.rpc("send_email", {
            message: ToClientIntroEmail,
        });

        if (error) {
            alert("Email server error. Please try again later or contact us.");
        } else {
            const ToAdminIntroEmail = {
                sender: "admin@fdva.com",
                recipient: "weschen1996@gmail.com",
                subject: `New ${selectedClass?.label} booking! 💃 ${formData.name} `,
                html_body: AdminIntroEmail(formData.name, {
                    date: date?.toDateString() || "",
                    ...selectedSlot,
                    selectedClass: selectedClass?.value || "",
                    ...formData,
                    phoneNumber: phoneNumber || "",
                }),
            };
            const { error } = await supabase.rpc("send_email", {
                message: ToAdminIntroEmail,
            });
            if (error) {
                alert(
                    "Email server error. Please try again later or contact us."
                );
            } else {
                setCurrentStep(10);
                setIsLoading(false);
            }
        }
    });

    const onChange = useCallback(
        (val: any) => {
            setDate(val);
        },
        [setDate]
    );

    useEffect(() => {
        setIsLoading(true);
        setSelectedSlot(undefined);

        if (!date) return;

        const startOfDay = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate()
        ).toISOString();
        const endOfDay = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate() + 1
        ).toISOString();

        const url = `https://www.googleapis.com/calendar/v3/calendars/${process.env.REACT_APP_CALENDAR_ID}/events?`;

        const searchParams = new URLSearchParams({
            key: process.env.REACT_APP_CALENDAR_API_KEY || "",
            showDeleted: "false",
            timeMin: startOfDay,
            timeMax: endOfDay,
        });

        const generateTimeSlots = async () =>
            await fetch(url + searchParams, {
                method: "GET",
            }).then((res) => res.json());

        generateTimeSlots().then((data) => {
            console.log(data);
            const allTimeSlots = data.items
                .filter((timeSlot: any) => timeSlot.status !== "cancelled")
                .map((timeSlot: any, index: number) => {
                    // console.log(timeSlot);
                    return {
                        time: new Date(
                            timeSlot.start.dateTime
                        ).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                        }),
                        id: timeSlot.id,
                    };
                });

            const canceledTimeSlots = data.items.filter(
                (timeSlot: any) => timeSlot.status === "cancelled"
            );

            // console.log(canceledTimeSlots);
            // canceledTimeSlots have an id whose first 10 digits  matches the id of the time slot in allTimeSlots
            // we need to remove the canceled time slots from allTimeSlots

            const updatedTimeSlots = allTimeSlots.filter((timeSlot: any) => {
                const canceledTimeSlot = canceledTimeSlots.find(
                    (canceledTimeSlot: any) => {
                        return (
                            canceledTimeSlot.id.slice(0, 10) ===
                            timeSlot.id.slice(0, 10)
                        );
                    }
                );
                return !canceledTimeSlot;
            });

            setSelectedDateSlots([...updatedTimeSlots]);
            setIsLoading(false);
        });
    }, [date]);

    const handleSlotSelect = (slot: TimeSlot) => {
        setSelectedSlot(slot);
    };

    const handleClassTypeSelect = (classType: ClassOptionType) => {
        setSelectedClass(classType);
    };

    const handleBackStep = () => {
        if (currentStep === 0) return;
        setCurrentStep(currentStep - 1);
    };

    const handleForwardStep = () => {
        if (currentStep === 2) return;
        setCurrentStep(currentStep + 1);
    };

    return (
        <Box
            mt="-64px"
            minHeight="100vh"
            height="100%"
            p={{
                base: "1rem",
                md: "2rem",
            }}
            display={"flex"}
            flexDirection={"column"}
            backgroundImage={BImage}
            backgroundSize="cover"
        >
            <NoNavHeader
                header={currentStep > 5 ? "Confirmation" : "Booking"}
            />

            <AnimatePresence initial={false} exitBeforeEnter>
                {currentStep === 0 && (
                    <StepOne
                        date={date}
                        handleForwardStep={handleForwardStep}
                        handleSlotSelect={handleSlotSelect}
                        isLoading={isLoading}
                        key="step-0"
                        onChange={onChange}
                        selectedDateSlots={selectedDateSlots}
                        selectedSlot={selectedSlot}
                    />
                )}
                {currentStep === 1 && (
                    <StepTwo
                        date={date}
                        handleBackStep={handleBackStep}
                        handleClassTypeSelect={handleClassTypeSelect}
                        handleForwardStep={handleForwardStep}
                        key="step-1"
                        selectedClass={selectedClass}
                        selectedSlot={selectedSlot}
                    />
                )}
                {currentStep === 2 && (
                    <StepThree
                        handleBackStep={handleBackStep}
                        key="step-2"
                        selectedClass={selectedClass}
                        register={register}
                        onSubmit={onSubmit}
                        phoneNumber={phoneNumber}
                        setPhoneNumber={setPhoneNumber}
                        isLoading={isLoading}
                    />
                )}
                {currentStep === 10 && <BookingConfirmation key="step-10" />}
            </AnimatePresence>
        </Box>
    );
};

export default Booking;

type NoNavHeaderProps = {
    header: string;
};
const NoNavHeader = ({ header }: NoNavHeaderProps) => {
    return (
        <Flex
            flexDir={{
                base: "column",
                md: "row-reverse",
            }}
            textAlign="center"
            justifyContent="space-evenly"
            alignItems={"center"}
        >
            <Logo stayBig />
            <Heading mb={4} textAlign={"center"}>
                {header}
            </Heading>
        </Flex>
    );
};
