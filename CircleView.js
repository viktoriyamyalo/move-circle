"use strict";

import React, {Component} from 'react';
import { StyleSheet, PanResponder, View, Text } from "react-native";

const CIRCLE_SIZE = 40;
const CIRCLE_COLOR = "blue";
const CIRCLE_HIGHLIGHT_COLOR = "green";

class CircleView extends Component {
    _panResponder = {};
    _previousLeft = 0;
    _previousTop = 0;
    _circleStyles = {};
    circle = null;
    state = {
        numberActiveTouches: 0,
        moveX: 0,
        moveY: 0,
        x0: 0,
        y0: 0,
        dx: 0,
        dy: 0,
        vx: 0,
        vy: 0
    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
            onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
            onPanResponderGrant: this._handlePanResponderGrant,
            onPanResponderMove: this._handlePanResponderMove,
            onPanResponderRelease: this._handlePanResponderEnd,
            onPanResponderTerminate: this._handlePanResponderEnd
        });
        this._previousLeft = 20;
        this._previousTop = 84;
        this._circleStyles = {
            style: {
                left: this._previousLeft,
                top: this._previousTop
            }
        }
    }
    componentDidMount() {
        this._updatePosition();
    }

    render() {
        const { numberActiveTouches, dx, dy, vx, vy } = this.state;
        return (
            <View style={styles.container}>
                <View
                    ref={ circle => {
                this.circle = circle;
                }}
                    style={styles.circle}
                    {...this._panResponder.panHandlers}
                    />
                <Text>
                    {numberActiveTouches} touches,
                    dx: {dx},
                    dy: {dy},
                    vx: {vx},
                    vy: {vy}
                </Text>
            </View>
        );
    }
}

CircleView.propTypes = {};

export default CircleView;
