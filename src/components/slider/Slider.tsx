import { useTheme, ClassNames } from "@emotion/react";
import React from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

type Props = {
    defaultValue: number[];
    onInput: (e: number[]) => void;
    min?: number;
    max?: number;
    step?: number;
};

const Slider = ({ defaultValue, onInput, min, max, step }: Props) => {
    const theme = useTheme();
    return (
        <ClassNames>
            {({ css }) => (
                <RangeSlider
                    defaultValue={defaultValue}
                    onInput={onInput}
                    rangeSlideDisabled={true}
                    min={min || 0}
                    max={max || 100}
                    step={step || 1}
                    className={css`
                        div.range-slider__thumb {
                            background-color: ${theme.color.primary.hue1};
                        }

                        div.range-slider__range {
                            background-color: ${theme.color.primary.hue2};
                        }
                    `}
                />
            )}
        </ClassNames>
    );
};

export default Slider;
