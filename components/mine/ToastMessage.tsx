import { ToastDescription, ToastTitle, Toast } from "../ui/toast";
import { Pressable } from "../ui/pressable";
import { Icon } from "../ui/icon";
import { X } from "lucide-react-native";
import clsx from "clsx";
import { VStack } from "../ui/vstack";

type Props = {
    id: string
    title: string
    description?: string
    action?: "error" | "success"
    onClose: () => void
}

export function ToastMessage({ id, title, description, action, onClose }: Props) {
    return (
        <Toast nativeID={`toast-${id}`} action={action} className={clsx(action === "success" ? "bg-green-500" : "bg-red-500", "mt-10")}>
            <VStack space="xs" className="w-full">
                <Pressable className="self-end" onPress={onClose}>
                    <Icon as={X} className="text-gray-50 text-md" />
                </Pressable>
                <ToastTitle className="text-white font-heading">
                    {title}
                </ToastTitle>
                {description && <ToastDescription className="text-white font-body">{description}</ToastDescription>}
            </VStack>
        </Toast>
    )
}