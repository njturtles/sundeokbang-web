import React from "react";
import styled from "@emotion/styled";
import { useSetRecoilState } from "recoil";
import { overlayAtom } from "@/stores/overlay";

type Props = {
    selected?: boolean;
    label: string;
    children: React.ReactNode;
};

const FilterButton = ({ selected, children, label }: Props) => {
    const setOverlay = useSetRecoilState(overlayAtom);
    return (
        <ButtonContainer
            selected={selected || false}
            onClick={() => setOverlay(true)}
            label={label}
        >
            {children}
        </ButtonContainer>
    );
};

const ButtonContainer = styled.button<{ selected: boolean; label: string }>`
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 8px;
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
        font-weight: ${theme.font.Pretendard.medium};
        color: ${theme.color.white.hue3};
    `}
    &:before {
        content: "${({ label }) => label}:";
    }
`;

export default FilterButton;
