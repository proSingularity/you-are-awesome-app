import React, { Component, ReactNode } from "react";
import {
    RefreshControl,
    SafeAreaView,
    ScrollView,
    StyleSheet,
} from "react-native";
import { connect } from "react-redux";
import { requestFetchMessages } from "../state/action-creators/requestFetchPosts";
import { MapStateToProps } from "../state/state/MapStateToProps";

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
    },
    scrollView: {
        flex: 1,
    },
});

interface Props {
    requestFetchMessages: (now: Date) => void;
    refreshing: boolean;
    children: ReactNode;
}

class RefreshMessagesView extends Component<Props> {
    public componentDidMount() {
        this.props.requestFetchMessages(new Date());
    }

    public render() {
        const { refreshing, children, requestFetchMessages } = this.props;
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView
                    contentContainerStyle={styles.scrollView}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={() => requestFetchMessages(new Date())}
                        />
                    }
                >
                    {children}
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const mapStateToProps: MapStateToProps<Pick<Props, "refreshing">> = (
    state
) => ({
    refreshing: state.messages.refreshing,
});

const mapDispatchToProps: Pick<Props, "requestFetchMessages"> = {
    requestFetchMessages,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RefreshMessagesView);
