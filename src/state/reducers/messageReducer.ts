import { Reducer } from "redux";
import { ActionType } from "../actions/ActionType";
import { IMessageAction } from "../actions/IAction";
import { IMessage } from "../state/IMessage";
import { IMessagesState } from "../state/IMessagesState";

export const initialMessage: IMessage = {
    id: "0",
    author: "Max",
    country: "Germany",
    text: "You can make a change. Stay awesome as you are!",
};

export const messageReducer: Reducer<IMessagesState, IMessageAction> = (
    state = {
        currentMessage: initialMessage,
        refreshing: false,
        lastUpdate: new Date(0), // epoch
    },
    action
) => {
    switch (action.type) {
        case ActionType.SubmitMessageRequested:
            return {
                ...state,
                currentMessage: action.payload,
                refreshing: false,
            };
        case ActionType.FetchMessagesSucceeded:
            return {
                ...state,
                currentMessage: action.payload.message,
                lastUpdate: action.payload.now,
                refreshing: false,
            };
        case ActionType.FetchMessagesRequested:
            return {
                ...state,
                refreshing: true,
            };
        case ActionType.FetchMessagesFailedTimeoutExceeded:
            return {
                ...state,
                refreshing: false,
            };
        default:
            return state;
    }
};
