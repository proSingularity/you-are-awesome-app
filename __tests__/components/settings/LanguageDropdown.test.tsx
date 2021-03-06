import React from "react";
import "react-native";
import { Provider } from "react-redux";
// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";
import createMockStore from "redux-mock-store";
import LanguageDropdown from "../../../src/components/settings/LanguageDropdown";
import { IState } from "../../../src/state/state/IState";
import { Pick2 } from "../../../src/utils/ts/Pick2";
import TestLocalizationProvider from "../../helpers/TestLocalizationProvider";

it("renders correctly", () => {
    const store = createMockStore<Pick2<IState, "app", "language">>([])({
        app: {
            language: null,
        },
    });

    const tree = renderer
        .create(
            <Provider store={store}>
                <TestLocalizationProvider>
                    <LanguageDropdown />
                </TestLocalizationProvider>
            </Provider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
