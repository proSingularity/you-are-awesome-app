import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Button, Dialog, Paragraph } from "react-native-paper";

interface Props {
    onDismiss: () => void;
}

const ReportThankYouDialog: FC<Props> = ({ onDismiss }) => {
    const { t } = useTranslation();
    return (
        <Dialog visible={true} onDismiss={onDismiss}>
            <Dialog.Title>{t("reportThankYouTitle")}</Dialog.Title>
            <Dialog.Content>
                <Paragraph>{t("reportThankYouText")}</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={onDismiss}>{t(`reportThankYouButton`)}</Button>
            </Dialog.Actions>
        </Dialog>
    );
};
export default ReportThankYouDialog;
