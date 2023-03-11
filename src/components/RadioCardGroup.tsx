import {
    Box,
    BoxProps,
    Circle,
    Icon,
    Stack,
    StackProps,
    useId,
    useRadio,
    useRadioGroup,
    UseRadioProps,
    useStyleConfig,
} from "@chakra-ui/react";
import {
    Children,
    cloneElement,
    isValidElement,
    ReactElement,
    useMemo,
} from "react";
import { FaCheck } from "react-icons/fa";

interface RadioCardGroupProps<T> extends Omit<StackProps, "onChange"> {
    name?: string;
    value?: T;
    defaultValue?: string;
    onChange?: (value: T) => void;
}

export const RadioCardGroup = <T extends string>(
    props: RadioCardGroupProps<T>
) => {
    const { children, name, defaultValue, value, onChange, ...rest } = props;
    const { getRootProps, getRadioProps } = useRadioGroup({
        name,
        defaultValue,
        value,
        onChange,
    });

    const cards = useMemo(
        () =>
            Children.toArray(children)
                .filter<ReactElement<RadioCardProps>>(isValidElement)
                .map((card) => {
                    return cloneElement(card, {
                        radioProps: getRadioProps({
                            value: card.props.value,
                        }),
                    });
                }),
        [children, getRadioProps]
    );

    return <Stack {...getRootProps(rest)}>{cards}</Stack>;
};

interface RadioCardProps extends BoxProps {
    value: string;
    radioProps?: UseRadioProps;
}

export const RadioCard = (props: RadioCardProps) => {
    const { radioProps, children, ...rest } = props;
    const { getInputProps, getCheckboxProps, getLabelProps, state } =
        useRadio(radioProps);
    const id = useId(undefined, "radio-button");

    const styles = useStyleConfig("RadioCard", props);
    const inputProps = getInputProps();
    const checkboxProps = getCheckboxProps();
    const labelProps = getLabelProps();
    return (
        <Box
            as="label"
            cursor="pointer"
            {...labelProps}
            sx={{
                ".focus-visible + [data-focus]": {
                    boxShadow: "outline",
                    zIndex: 1,
                },
            }}
        >
            <input {...inputProps} aria-labelledby={id} />
            <Box sx={styles} {...checkboxProps} {...rest}>
                <Stack direction="row">
                    <Box flex="1">{children}</Box>
                    {state.isChecked ? (
                        <Circle bg="accent" size="4">
                            <Icon
                                as={FaCheck}
                                boxSize="2.5"
                                color={{
                                    light: "white",
                                    dark: "black",
                                }}
                            />
                        </Circle>
                    ) : (
                        <Circle borderWidth="2px" size="4" />
                    )}
                </Stack>
            </Box>
        </Box>
    );
};
