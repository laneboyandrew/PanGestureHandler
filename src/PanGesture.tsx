import React from "react";
import {Dimensions, View} from "react-native";
import Card from "./components";
import {PanGestureHandler} from "react-native-gesture-handler";
import Animated, {
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withDecay
} from "react-native-reanimated";
import {clamp} from "react-native-redash";

const CARD_WIDTH = 150
const CARD_HEIGHT = 150

const {width, height} = Dimensions.get('window');

const Gesture = () => {
    const boundX = width - CARD_WIDTH;
    const boundY = height - CARD_HEIGHT;
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const onGestureEvent = useAnimatedGestureHandler({
        onStart: (event, context) => {
            context.offsetX = translateX.value;
            context.offsetY = translateY.value;
        },
        onActive: (event, context) => {
            translateX.value = clamp(context.offsetX + event.translationX, 0, boundX);
            translateY.value = clamp(context.offsetY + event.translationY, 0, boundY);
        },
        onEnd: (event, context) => {
            translateX.value = withDecay({
                velocity: event.velocityX,
                clamp: [0, boundX]
            });
            translateY.value = withDecay({
                velocity: event.velocityY,
                clamp: [0, boundY]
            });
        },
    });
    const style = useAnimatedStyle(() => {
        return {
            transform: [
                {translateX: translateX.value},
                {translateY: translateY.value}
            ]
        }
    })
    return (
        <View>
            <PanGestureHandler {...{onGestureEvent}}>
                <Animated.View {...{style}}>
                    <Card
                        width={CARD_WIDTH}
                        height={150}
                        backgroundColor='green'
                    />
                </Animated.View>
            </PanGestureHandler>
        </View>
    )
}
export default Gesture;