import React from "react";
import styled from "@emotion/styled";
import BedIcon from "@/assets/icons/bed-icon.svg";
import HAIcon from "@/assets/icons/ha-icon.svg";
import SecurityIcon from "@/assets/icons/security-icon.svg";
import OtherIcon from "@/assets/icons/other-icon.svg";

type Props = {
    title: string;
    options: {
        furniture?: string;
        appliances?: string;
        prevention?: string;
        etc?: string;
    };
};

const OptionsSection = ({ title, options }: Props) => {
    return (
        <Container>
            <Title>{title}</Title>
            <OptionsContainer>
                {/* 가구 옵션 */}
                <Options>
                    <OptionIcon>
                        <BedIcon />
                    </OptionIcon>
                    <Divider />
                    <OptionParagraph>
                        <OptionTitle>가구 옵션</OptionTitle>
                        <OptionContent>{options.furniture || ""}</OptionContent>
                    </OptionParagraph>
                </Options>
                {/* 가전 옵션 */}
                <Options>
                    <OptionIcon>
                        <HAIcon />
                    </OptionIcon>
                    <Divider />
                    <OptionParagraph>
                        <OptionTitle>가전 옵션</OptionTitle>
                        <OptionContent>
                            {options.appliances || ""}
                        </OptionContent>
                    </OptionParagraph>
                </Options>
                {/* 방범 옵션 */}
                <Options>
                    <OptionIcon>
                        <SecurityIcon />
                    </OptionIcon>
                    <Divider />
                    <OptionParagraph>
                        <OptionTitle>방범 옵션</OptionTitle>
                        <OptionContent>
                            {options.prevention || ""}
                        </OptionContent>
                    </OptionParagraph>
                </Options>
                {/* 기타 옵션 */}
                <Options>
                    <OptionIcon>
                        <OtherIcon />
                    </OptionIcon>
                    <Divider />
                    <OptionParagraph>
                        <OptionTitle>기타 옵션</OptionTitle>
                        <OptionContent>{options.etc || ""}</OptionContent>
                    </OptionParagraph>
                </Options>
            </OptionsContainer>
        </Container>
    );
};

const Container = styled.section`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 24px;
    padding: 28px 24px;
    width: 100%;
    height: auto;
    background-color: ${({ theme }) => theme.color.white.hue0};
    border-top: 1px solid ${({ theme }) => theme.color.gray.hue0};
    border-bottom: 1px solid ${({ theme }) => theme.color.gray.hue0};
`;

const Title = styled.h1`
    font-size: 1.375rem;
    font-weight: ${({ theme }) => theme.font.Pretendard.semibold};
    color: ${({ theme }) => theme.color.black.hue0};
`;

const OptionsContainer = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 16px;
`;

const Options = styled.li`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 20px;
    width: 100%;
    min-height: 70px;
    padding: 12px 16px;
`;

const OptionIcon = styled.div`
    width: 40px;
    height: 40px;
`;

const Divider = styled.hr`
    width: 0;
    height: 16px;
    border: 0.5px solid ${({ theme }) => theme.color.black.hue2};
`;

const OptionParagraph = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 8px;
    width: 100%;
    height: auto;
`;

const OptionTitle = styled.span`
    font-size: 1rem;
    font-weight: ${({ theme }) => theme.font.Pretendard.semibold};
    color: ${({ theme }) => theme.color.black.hue1};
`;

const OptionContent = styled.span`
    font-size: 1rem;
    font-weight: ${({ theme }) => theme.font.Pretendard.medium};
    color: ${({ theme }) => theme.color.black.hue2};
`;

export default OptionsSection;
