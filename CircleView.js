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

    _highlight = () => {
        this.circle && this.circle.setNativeProps({
            backgroundColor: CIRCLE_HIGHLIGHT_COLOR
        })
    }

    _unHighlight = () => {
        this.circle && this.circle.setNativeProps({
            backgroundColor: CIRCLE_COLOR
        })
    }

    _updatePosition = () => {
        this.circle && this.circle.setNativeProps(this._circleStyles);
    }

    _handleStartShouldSetPanResponder = (event, gestureState) => {
        return true;
    }

    _handleMoveShouldSetPanResponder = (event, gestureState) => {
        return true;
    }

    _handlePanResponderGrant = (event, gestureState) => {
        this._highlight();
    }

    _handlePanResponderMove = (event, gestureState) => {
        this.setState({
            stateID: gestureState.stateID,
            moveX: gestureState.moveX,
            moveY: gestureState.moveY,
            x0: gestureState.x0,
            y0: gestureState.y0,
            dx: gestureState.dx,
            dy: gestureState.dy,
            vx: gestureState.vx,
            vy: gestureState.vy,
            numberActiveTouches: gestureState.numberActiveTouches
        });
        this._circleStyles.style.left = this._previousLeft + gestureState.dx;
        this._circleStyles.style.top = this._previousTop + gestureState.dy;
    }

    _handlePanResponderEnd = (event, gestureState) => {
        this._unHighlight();
        this._previousLeft += gestureState.dx;
        this._previousTop += gestureState.dy''
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

const styles = StyleSheet.create({
    circle: {
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        borderRadius: CIRCLE_SIZE/2,
        backgroundCoor: CIRCLE_COLOR,
        position: "absolute",
        top: 0,
        left: 0
    },
    container: {
        flex: 1,
        paddingTop: 64
    }
});
CircleView.propTypes = {};

export default CircleView;
