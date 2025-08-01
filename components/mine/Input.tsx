import { ComponentProps, useState } from "react";
import { Input as GluestackInput, InputField } from "../ui/input"
import { FormControl, FormControlError, FormControlErrorText } from "../ui/form-control";
import { Icon } from "../ui/icon";
import { EyeIcon, EyeClosedIcon } from "lucide-react-native";
import clsx from "clsx";
import { TouchableOpacity } from "react-native";

type Props = ComponentProps<typeof InputField> & {
    eyeIcon?: boolean;
    errorMessage?: string | null
    isInvalid?: boolean
    isReadOnly?: boolean
};

export function Input({ isReadOnly = false, errorMessage = null, isInvalid = false, eyeIcon = false, ...rest }: Props) {

    const invalid = !!errorMessage || isInvalid //isInvalid é um bool do proprio input que identifica quando há erro no input; é a propria validação dele; deve atualizar o estado stateValidity do input no HTMLInput e o validationMessage com a mensagem definida no rules -> required
    const [eyeVisibleState, setEyeVisibleState] = useState(false);

    function handleMakePasswordVisible() {
        setEyeVisibleState(!eyeVisibleState);
    }

    return (
        <FormControl isInvalid={invalid} className="w-full">
            <GluestackInput
                className={clsx("border-gray-700 bg-gray-600 h-14 rounded-md", isReadOnly ? "opacity-50" : "opacity-1", "data-[invalid=true]:border-red-500", "data-[focus=true]:border-green-400")}
                isReadOnly={isReadOnly}
            >
                <InputField
                    secureTextEntry={eyeIcon && eyeVisibleState === false ? true : false}
                    className="font-body px-4 text-white placeholder:color-gray-300"
                    {...rest}
                />
                {
                    eyeIcon && (
                        <TouchableOpacity onPress={handleMakePasswordVisible}>
                            {eyeVisibleState === false ? (
                                <Icon as={EyeIcon} className="text-gray-300 mr-2" />
                            ) : (
                                <Icon as={EyeClosedIcon} className="text-gray-300 mr-2" />
                            )}
                        </TouchableOpacity>
                    )
                }
            </GluestackInput>
            <FormControlError>
                <FormControlErrorText className="text-red-500">
                    {errorMessage}
                </FormControlErrorText>
            </FormControlError>
        </FormControl>
    )
}