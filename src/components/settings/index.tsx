import createConfirmProvider from "../confirm";
import SettingsForm from "./form";

export const [Settings, showSettings] = createConfirmProvider(SettingsForm, {
    dialogTitle: "Settings",
    dialogModalClose: true,
    contentClassName:
        "h-full w-full max-h-full max-w-full data-[state=open]:animate-slide-from-right rounded-none sm:rounded-md sm:max-h-[55vh] sm:w-[90vw] sm:max-w-[500px] sm:data-[state=open]:animate-content-show",
});
