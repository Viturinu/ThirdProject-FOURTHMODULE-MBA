import { ComponentProps } from "react";
import { Input as GluestackInput, InputField } from "../ui/input"
import { FormControl, FormControlError, FormControlErrorText } from "../ui/form-control";
import { Config } from "tailwindcss"
import clsx from "clsx";

type Props = ComponentProps<typeof InputField> & {
    errorMessage?: string | null
    isInvalid?: boolean
    isReadOnly?: boolean
};

export function Input({ isReadOnly = false, errorMessage = null, isInvalid = false, ...rest }: Props) {

    const invalid = !!errorMessage || isInvalid //isInvalid é um bool do proprio input que identifica quando há erro no input; é a propria validação dele; deve atualizar o estado stateValidity do input no HTMLInput e o validationMessage com a mensagem definida no rules -> required

    return (
        <FormControl isInvalid={invalid} className="w-full">
            <GluestackInput
                className={clsx("border-gray-700 bg-gray-600 h-14 rounded-md", isReadOnly ? "opacity-50" : "opacity-1", "data-[invalid=true]:border-red-500", "data-[focus=true]:border-green-400")}
                isReadOnly={isReadOnly}
            >
                <InputField className="font-body px-4 text-white placeholder:color-gray-300" {...rest} />
            </GluestackInput>
            <FormControlError>
                <FormControlErrorText className="text-red-500">
                    {errorMessage}
                </FormControlErrorText>
            </FormControlError>
        </FormControl>
    )
}