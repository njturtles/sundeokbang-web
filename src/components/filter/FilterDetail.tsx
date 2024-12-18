import React, { useState } from "react";
import styled from "@emotion/styled";
import CloseIcon from "@/assets/icons/close-icon.svg";
import { useRecoilState, useSetRecoilState } from "recoil";
import { overlayAtom } from "@/stores/overlay";
import Slider from "../slider/Slider";
import { formatToWon } from "@/utils/formatter";
import { filterAtom } from "@/stores/filter";
import { depositLimit, monthlyLimit } from "@/constants/filter";

interface LocalValue {
    deposit: number[];
    cost: number[];
}

const FilterDetail = () => {
    const setOverlay = useSetRecoilState(overlayAtom);
    const [filter, setFilter] = useRecoilState(filterAtom);
    const [localValue, setLocalValue] = useState<LocalValue>({
        deposit: filter.deposit,
        cost: filter.cost,
    });

    const applyHandler = () => {
        setFilter(localValue);
        setOverlay(false);
    };

    const resetHandler = () => {
        setLocalValue({ deposit: depositLimit, cost: monthlyLimit });
        setFilter({ deposit: depositLimit, cost: monthlyLimit });
        setOverlay(false);
    };

    return (
        <Container>
            <CloseButton
                onClick={() => {
                    setLocalValue(filter);
                    setOverlay(false);
                }}
            >
                <CloseIcon width={24} height={24} />
            </CloseButton>
            <DepositContainer>
                <Title>보증금</Title>
                <Deposit>
                    {formatToWon(localValue.deposit, depositLimit)}
                </Deposit>
                <Slider
                    defaultValue={localValue.deposit}
                    min={depositLimit[0]}
                    max={depositLimit[1]}
                    step={100000}
                    onInput={(e: number[]) =>
                        setLocalValue((prev) => ({
                            ...prev,
                            deposit: e,
                        }))
                    }
                />
            </DepositContainer>
            <CostContainer>
                <Title>월세</Title>
                <Cost>{formatToWon(localValue.cost, monthlyLimit)}</Cost>
                <Slider
                    defaultValue={localValue.cost}
                    min={monthlyLimit[0]}
                    max={monthlyLimit[1]}
                    step={100000}
                    onInput={(e: number[]) =>
                        setLocalValue((prev) => ({ ...prev, cost: e }))
                    }
                />
            </CostContainer>
            <ButtonContainer>
                <ApplyButton onClick={applyHandler}>적용</ApplyButton>
                <ResetButton onClick={resetHandler}>초기화</ResetButton>
            </ButtonContainer>
        </Container>
    );
};

const Container = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 24px;
    width: 100%;
    height: 470px;
    padding: 25px 20px;
    border: none;
    border-radius: 16px 16px 0 0;
    background-color: ${({ theme }) => theme.color.white.hue0};
    box-shadow: 0px -10px 24px -2px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.button`
    position: absolute;
    right: 20px;
    top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border: none;
    outline: none;
    background-color: transparent;
`;

const Title = styled.span`
    font-size: 1.25rem;
    font-weight: ${({ theme }) => theme.font.Pretendard.semibold};
    color: ${({ theme }) => theme.color.black.hue0};
`;

const DepositContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 10px;
    width: 100%;
    height: auto;
    padding: 10px;
`;

const Deposit = styled.span`
    font-size: 1rem;
    font-weight: ${({ theme }) => theme.font.Pretendard.bold};
    color: ${({ theme }) => theme.color.primary.hue1};
    margin-bottom: 16px;
`;

const CostContainer = styled(DepositContainer)``;
const Cost = styled(Deposit)``;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    width: 100%;
    height: auto;
    padding-top: 32px;
`;

const ApplyButton = styled.button`
    width: 100%;
    height: 60px;
    border: none;
    border-radius: 16px;
    outline: none;
    background-color: ${({ theme }) => theme.color.primary.hue1};
    font-size: 1.25rem;
    font-weight: ${({ theme }) => theme.font.Pretendard.bold};
    color: ${({ theme }) => theme.color.white.hue0};
`;

const ResetButton = styled(ApplyButton)`
    border: 1px solid ${({ theme }) => theme.color.primary.hue1};
    background-color: ${({ theme }) => theme.color.white.hue0};
    color: ${({ theme }) => theme.color.primary.hue1};
`;

export default FilterDetail;
