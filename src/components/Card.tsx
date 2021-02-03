import React from "react";
import {View} from "react-native";

interface CardProps {
    width: number,
    height: number,
    backgroundColor: string
}

const Card = ({width, height, backgroundColor}: CardProps) => {
    return (
    <View style={{ height, width, backgroundColor}} />
    )
}
export default Card;