import * as FAnalytics from "expo-firebase-analytics";
import { CONFIG } from "../config";

const analyticsDisabled = !CONFIG.featureFlags.analytics;

/**
 * Feature-flagged Adapter for Expo Firebase Analytics
 * Docs:
 * https://firebase.google.com/docs/reference/android/com/google/firebase/analytics/FirebaseAnalytics#logEvent(java.lang.String,%20android.os.Bundle)
 *
 */
export class Analytics {
    static async setAnalyticsCollectionEnabled(enabled: boolean) {
        if (analyticsDisabled) return;
        await FAnalytics.setAnalyticsCollectionEnabled(enabled);
    }

    static async resetAnalyticsData() {
        if (analyticsDisabled) return;
        await FAnalytics.resetAnalyticsData();
    }

    static async logToggleAnalytics(enabled: boolean) {
        if (analyticsDisabled) return;
        await FAnalytics.logEvent("toggle_analytics", { enabled });
    }

    // TODO #348 improve with count. Hypothesis: the higher the contributions count, the more likely are further contributions
    static async logContribution(contributions: number = -1) {
        if (analyticsDisabled) return;
        await FAnalytics.logEvent("share", {
            type: "contribution",
            contributions,
        });
    }

    static async logDebug() {
        if (analyticsDisabled) return;
        await FAnalytics.logEvent("debug", {
            debugProps1: 123,
            debugProp2: "hallo",
        });
    }

    static async logFormPartiallyFilled(
        formName: string,
        otherFormLinesFilled: number
    ) {
        if (analyticsDisabled) return;
        await FAnalytics.logEvent("form_fill", {
            formName,
            otherFormLinesFilled,
        });
    }

    /** NOTE: value must be a flat object, else it will be tracked as a useless [object Object] */
    static async logButtonPress(type: string, value: object) {
        if (analyticsDisabled) return;
        await FAnalytics.logEvent("button_press", { type, ...value });
    }

    static async logLike(messageId: string) {
        await Analytics.logButtonPress("like", { messageId });
    }

    static async logPushNotifications(enabled: boolean) {
        await Analytics.logButtonPress("push_notifications", { enabled });
    }

    static async logDarkMode(enabled: boolean) {
        await Analytics.logButtonPress("dark_mode", { enabled });
    }

    static async logLinkFollow(linkText: string) {
        await Analytics.logButtonPress("link", { linkText });
    }

    static async logDelete(itemsDeleted: number, itemsLeft: number) {
        await Analytics.logButtonPress("items_deleted", {
            itemsDeleted,
            itemsLeft,
            deletedAll: itemsLeft === 0,
        });
    }

    static async logCancel(purpose: string) {
        await Analytics.logButtonPress("cancel", { purpose });
    }
}