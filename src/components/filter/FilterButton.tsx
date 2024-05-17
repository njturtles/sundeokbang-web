import React from "react";
import styled from "@emotion/styled";
import { useSetRecoilState } from "recoil";
import { overlayAtom } from "@/stores/overlay";

type Props = {
    selected?: boolean;
    children: React.ReactNode;
};

const FilterButton = ({ selected, children }: Props) => {
    const setOverlay = useSetRecoilState(overlayAtom);
    return (
        <ButtonContainer
            selected={selected || false}
            onClick={() => setOverlay(true)}
        >
            {children}
        </ButtonContainer>
    );
};

const ButtonContainer = styled.button<{ selected: boolean }>`
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: auto;
    height: 40px;
    padding: 10px 20px;
    margin-right: 4px;
    background-color: ${({ theme }) => theme.color.white.hue2};
    border: 1px solid ${({ theme }) => theme.color.gray.hue2};
    border-radius: 20px;
    font-size: 1rem;
    font-weight: ${({ theme }) => theme.font.Pretendard.medium};
    color: ${({ theme }) => theme.color.black.hue2};
    ${({ theme, selected }) =>
        selected &&
        `
        background-color: ${theme.color.primary.hue1};
        border: none;
        box-shadow: 0px 2px 6px 0px rgba(186, 88, 48, 0.2);
        font-weight: ${theme.font.Pretendard.bold};
        color: ${theme.color.white.hue3};
    `}
`;

export default FilterButton;
